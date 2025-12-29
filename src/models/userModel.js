import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }], // Reference
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);// Use the existing User model if it exists, otherwise create a new one
export default userModel;