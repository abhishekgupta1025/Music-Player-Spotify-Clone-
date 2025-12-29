    import mongoose from "mongoose";

    const songSchema = new mongoose.Schema({
        name: { type: String, required: true },
        desc: { type: String, required: true },
        album: { type: String, required: true },
        image: { type: String, required: true }, // URL
        file: { type: String, required: true },  // Audio URL
        duration: { type: String, required: true }
    });
  
    const songModel = mongoose.models.song || mongoose.model("song", songSchema);// Use the existing User model if it exists, otherwise create a new one
    export default songModel;