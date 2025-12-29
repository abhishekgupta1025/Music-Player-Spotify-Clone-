/* 1. Global State */
window.allSongs = [];
let currentAudio = new Audio();
let currentIndex = 0;
let repeatMode = false;
const songContainer = document.getElementById('song-list-container');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('searchresults');

/* 1. Play vs Pause (The Toggle) */
const playPause = () => {
    // Check the native property .paused
    if (currentAudio.paused) {
        currentAudio.play();
        // Change Icon to 'Pause'
        document.getElementById('play-icon').innerText = 'pause';
    } else {
        currentAudio.pause();
        // Change Icon to 'Play Arrow'
        document.getElementById('play-icon').innerText = 'play_arrow';
    }
}

const searchSongs = (songs) => {
    // 1. Clear current list
    searchResults.innerHTML = '';
    console.log(`Rendering ${songs.length} songs.`);

    // 2. Loop and build HTML
    songs.forEach(song => {
        const searchSongCard = `
        <div class="shrink-0 pl-2 flex items-center rounded-2xl w-full cursor-pointer hover:bg-gray-800" onclick="playSong('${song._id}')">
            <div>
                <img src="${song.image}" class="h-12 w-12 rounded-lg">
            </div>
            <div>
                <div class="text-white font-bold m-2 truncate">${song.name}</div>
                <div class="text-[#a7a7a7] text-sm m-2 truncate">${song.desc}</div>
            </div>
        </div>
        `;
        searchResults.innerHTML += searchSongCard;
    });
}

const renderSongs = (songs) => {
    // 1. Clear current list

    const Container = document.getElementById('song-list-container');

    if(!Container) return;

    Container.innerHTML = '';
    console.log(`Rendering ${songs.length} songs.`);

    // 2. Loop and build HTML
    songs.forEach(song => {
        const songCard = `
            <div class="shrink-0 w-36 cursor-pointer" onclick="playSong('${song._id}')">
                <div>
                    <img src="${song.image}" class="h-36 w-full object-cover rounded-lg">
                </div>
                <div class="text-white font-bold mt-2 truncate">${song.name}</div>
                <div class="text-[#a7a7a7] text-sm truncate">${song.desc}</div>
            </div>
        `;
        Container.innerHTML += songCard;
    });
}

const getSongs = async() => {
    try {
        const response = await fetch('http://localhost:4000/api/song/list');
        const data = await response.json();
        console.log("Fetch Data:", data);

        if(data.success){
            window.allSongs = data.songs;
            renderSongs(window.allSongs);
        }
        
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // NEW: Search Logic
    if (searchInput) {

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase(); // what you typed
            
            // Filter the global list
            const filteredSongs = window.allSongs.filter(song => 
                song.name.toLowerCase().includes(query) || 
                song.desc.toLowerCase().includes(query)
            );
            
            // Show only the matches
            searchSongs(filteredSongs);
        });
    }

    getSongs();
});

const makehome = () => {
    const originalhome = `<div
                class="first py-3 rounded-t-xl flex gap-2 sticky top-0 bg-[#121212] z-10 transition-colors duration-200">
                <div
                    class="rounded-full px-3 py-1 bg-[#2A2A2A] text-white text-sm font-bold hover:bg-[#3E3E3E] cursor-pointer transition-colors">
                    All</div>
                <div
                    class="rounded-full px-3 py-1 bg-[#2A2A2A] text-white text-sm font-bold hover:bg-[#3E3E3E] cursor-pointer transition-colors">
                    Music</div>
                <div
                    class="rounded-full px-3 py-1 bg-[#2A2A2A] text-white text-sm font-bold hover:bg-[#3E3E3E] cursor-pointer transition-colors">
                    Podcasts</div>
            </div>

            <div class="second flex gap-5 items-center justify-center">
                <div class="1 bg-[#3A3651] w-[35%]">
                    <div class="flex items-center">
                        <img src="public/album_popoff.png" alt="Pop Off, Punk On" class="w-12 h-12 rounded-sm">
                        <div class="text-white font-bold text-sm">Pop Off, Punk On</div>
                    </div>
                </div>
                <div class="2 bg-[#3A3651] w-[35%]">
                    <div class="flex items-center">
                        <img src="public/album_popoff.png" alt="Pop Off, Punk On" class="w-12 h-12 rounded-sm">
                        <div class="text-white font-bold text-sm">Pop Off, Punk On</div>
                    </div>
                </div>
            </div>

            <div class="third flex justify-between items-end px-4 my-4">
                <div class="text-white text-2xl font-bold hover:underline cursor-pointer">Popular Songs</div>
                <button>
                    <div class="text-[#b3b3b3] text-sm font-bold hover:text-white hover:underline cursor-pointer">Show
                        all</div>
                </button>
            </div>
            <div id="song-list-container"
                class="four flex gap-5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                justify-center">
                </div>
                `;
    searchResults.innerHTML = originalhome;

    getSongs();
}


/* 2. Fetch Function */
// const getSongs = async () => {
//     try {
//         console.log("Syncing library...");
//         await fetch('http://localhost:4000/api/song/scan'); // Auto-scan on refresh

//         console.log("Fetching songs...");
//         const response = await fetch('http://localhost:4000/api/song/list');
//         const data = await response.json();
//         console.log("Fetch Data:", data);

//         if (data.success) {
//             window.allSongs = data.songs;
//             songContainer.innerHTML = '';

//             console.log(`Rendering ${data.songs.length} songs.`);

//             data.songs.forEach(song => {
//                 const songCard = `
//                     <div class="shrink-0 w-36 cursor-pointer" onclick="playSong('${song._id}')">
//                         <div>
//                             <img src="${song.image}" class="h-36 w-full object-cover rounded-lg">
//                         </div>
//                         <div class="text-white font-bold mt-2 truncate">${song.name}</div>
//                         <div class="text-[#a7a7a7] text-sm truncate">${song.desc}</div>
//                     </div>
//                 `;

//                 songContainer.innerHTML += songCard;

//             });
//         } else {
//             console.error("Fetch returned success: false");
//         }
//     } catch (error) {
//         console.error("Error fetching songs:", error);
//     }
// }

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    getSongs();
});

/* 3. Audio Player Logic */
const playSong = async (id) => {
    // Find song info from the global list
    const song = window.allSongs.find(item => item._id === id);

    // NEW: Update Global Index
    currentIndex = window.allSongs.findIndex(item => item._id === id);
    console.log("Playing:", song.name);
    console.log("Index:", currentIndex);
    console.log("Next:", window.allSongs[currentIndex + 1]);
    console.log("Previous:", window.allSongs[currentIndex - 1]);

    if (song) {
        currentAudio.src = song.file;
        await currentAudio.play();
        console.log("Playing:", song.name);

        // Update the Total Duration text right away
        document.getElementById('total-duration').innerText = song.duration;

        // Ensure the play icon is set to pause (since it is playing now)
        document.getElementById('play-icon').innerText = 'pause';
        const rightsideimage = document.getElementById('rightsideimage');
        const righttext = document.getElementById('righttext');
        const bottomtext = document.getElementById('bottomtext');
        const bottomsideimage = document.getElementById('bottomsideimage');
        const rightimage = `
            <div>
                <img src="${song.image}" class="w-full object-cover rounded-lg">
            </div>
        `;
        const bottomimage = `
            <div>
                <img src="${song.image}" class="w-16 object-cover rounded-lg">
            </div>
        `;
        rightsideimage.innerHTML = rightimage;
        righttext.innerHTML = song.name;
        bottomtext.innerHTML = song.name;
        bottomsideimage.innerHTML = bottomimage;

    }
}

const nextSong = () => {
    // If at end, loop to start (0), else go to next (+1)
    if (currentIndex < window.allSongs.length - 1) {
        playSong(window.allSongs[currentIndex + 1]._id);
    } else {
        playSong(window.allSongs[0]._id);
    }
}

const prevSong = () => {
    // If at start, go to last, else go to prev (-1)
    if (currentIndex > 0) {
        playSong(window.allSongs[currentIndex - 1]._id);
    } else {
        playSong(window.allSongs[window.allSongs.length - 1]._id);
    }
}

const repeatSong = () => {
    repeatMode = !repeatMode;
}

const setVolume = (event) => {
    // 1. Get the bar element
    const volumeBar = event.currentTarget;
    const width = volumeBar.offsetWidth;
    const clickX = event.offsetX;

    // 2. Calculate percentage (0.0 to 1.0)
    const volumePercent = clickX / width;

    // 3. Set Audio Volume
    // Clamp values between 0 and 1 just to be safe
    currentAudio.volume = Math.max(0, Math.min(1, volumePercent));

    // 4. Update Visuals (White Bar)
    // Assuming the white bar is the first child <div>
    volumeBar.firstElementChild.style.width = `${volumePercent * 100}%`;
}

const seekSong = (event) => {
    // 1. Get the width of the ENTIRE bar
    // event.target is the element we clicked on
    // .getBoundingClientRect() tells us the width in pixels
    // BUT since we might click the parent or child, it's safer to use 'event.currentTarget' if we put the handler on the parent

    // Simpler approach for your structure:
    const progressBar = document.getElementById('seek-bar').parentElement; // The gray background bar
    const barWidth = progressBar.offsetWidth;

    // 2. Get where we clicked (X coordinate relative to the bar)
    const clickX = event.offsetX;

    // 3. Calculate new time
    const duration = currentAudio.duration;

    // (Click Position / Total Width) * Total Duration = New Time
    currentAudio.currentTime = (clickX / barWidth) * duration;
}

const formatTime = (time) => {
    // Round down to remove milliseconds
    const totalSeconds = Math.floor(time);

    // Math logic
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // "seconds < 10 ? '0' + seconds" adds a leading zero (e.g., 2:05 instead of 2:5)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;//If you just returned ${minutes}:${seconds}, the result for 2 minutes and 5 seconds would be "2:5". That looks wrong. We want "2:05".
}

currentAudio.ontimeupdate = () => {
    // 1. Get current values
    const currentTime = currentAudio.currentTime; // e.g., 14.5 seconds
    const duration = currentAudio.duration;       // e.g., 240 seconds

    // 2. Calculate percentage
    const progressPercent = (currentTime / duration) * 100;

    // 3. Update the UI (The Green Bar width)
    // Assuming you gave the green bar an ID of 'seek-bar'
    document.getElementById('seek-bar').style.width = `${progressPercent}%`;

    // 4. Update the Text (0:14)
    document.getElementById('current-time').innerText = formatTime(currentTime);

    document.getElementById('total-duration').innerText = formatTime(duration);
}

