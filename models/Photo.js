import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    caption: {
        type: String,
        default: "",
    },
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;
git init
git remote add origin https://github.com/DavidMalkhasyan/pixcraft-backend.git
git add .
git commit -m "🎉 Initial commit"
git branch -M main
git push -u origin main



