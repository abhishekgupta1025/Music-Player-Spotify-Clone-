import songModel from "../models/songModel.js";
import fs from 'fs';
import path from 'path';
import { parseFile } from 'music-metadata';

const listSong = async (req, res) => { //this is just for displaying of the songs available
    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        res.json({ success: false });
    }
}

// ... existing addSong / listSong ...

// NEW: Scan Function
const scanLibrary = async (req, res) => {
    try {
        const songsDir = path.join('src', 'uploads', 'songs');//makes the path to the songs directory 

        // 1. Get all
        // files in the folder
        if (!fs.existsSync(songsDir)) fs.mkdirSync(songsDir, { recursive: true });
        const files = fs.readdirSync(songsDir);
        const mp3Files = files.filter(file => file.endsWith('.mp3'));

        let addedCount = 0;

        // 2. Loop through each file
        for (const file of mp3Files) {
            const songUrl = `http://localhost:4000/uploads/songs/${file}`;
            let songEntry = await songModel.findOne({ file: songUrl }); // checks if the song is already in the database

            // If song exists AND has a custom image (not default), then we can skip it.
            // If it has 'default.png', we want to proceed to try and find a real image.
            if (songEntry && !songEntry.image.includes("default.png")) {
                continue;
            }

            // 3. Read Metadata
            const filePath = path.join(songsDir, file);
            const metadata = await parseFile(filePath);

            // 4. Extract Image
            let imageUrl = "http://localhost:4000/uploads/images/default.png"; // Default fallback

            if (metadata.common.picture && metadata.common.picture.length > 0) {//Does this song have a picture attached? AND is the picture list not empty?
                const picture = metadata.common.picture[0];
                const extension = picture.format === 'image/jpeg' ? '.jpg' : '.png';
                const imageFileName = file.replace(/\.[^/.]+$/, "") + extension; // Remove extension and add new one

                const imagesDir = path.join('src', 'uploads', 'images');
                if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });// it creates the images directory if its not present 

                const imagePath = path.join(imagesDir, imageFileName);
                fs.writeFileSync(imagePath, picture.data);

                imageUrl = `http://localhost:4000/uploads/images/${imageFileName}`;
            }

            // 5. Create Entry
            const durationSec = metadata.format.duration || 0;
            const min = Math.floor(durationSec / 60);
            const sec = Math.floor(durationSec % 60);

            if (songEntry) {
                // Update existing
                songEntry.image = imageUrl;
                songEntry.name = metadata.common.title || songEntry.name;
                songEntry.desc = metadata.common.artist || songEntry.desc;
                songEntry.album = metadata.common.album || songEntry.album;
                await songEntry.save();
            } else {
                // Create new
                const newSong = new songModel({
                    name: metadata.common.title || file.replace('.mp3', ''),
                    desc: metadata.common.artist || "Unknown Artist",
                    album: metadata.common.album || "Unknown Album",
                    image: imageUrl,
                    file: songUrl,
                    duration: `${min}:${sec < 10 ? '0' + sec : sec}`
                });
                await newSong.save();
                addedCount++;
            }
        }

        // 3. Remove Deleted Songs (Cleanup)
        const allSongs = await songModel.find({});
        let deletedCount = 0;
        for (const song of allSongs) {
            // Extract filename from URL: http://localhost:4000/uploads/songs/MySong.mp3 -> MySong.mp3
            const songUrl = song.file;
            const songFileName = songUrl.split('/').pop();

            // If the file is NOT in the folder anymore, delete it from DB
            if (!mp3Files.includes(songFileName)) {
                await songModel.findByIdAndDelete(song._id);
                // Optional: Delete associated image if it's not the default
                const imageFileName = song.image.split('/').pop();
                if (imageFileName !== 'default.png') {
                    const imagePath = path.join('src', 'uploads', 'images', imageFileName);
                    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
                }
                deletedCount++;
            }
        }

        res.json({ success: true, message: `Scan Complete. Added ${addedCount}, Removed ${deletedCount}.` });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error scanning library" });
    }
}

export { listSong, scanLibrary };