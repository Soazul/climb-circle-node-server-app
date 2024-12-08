import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    username: { type: String, ref: "User", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    location: String,
    description: String,
    climbType: {
        type: String,
        enum: ["Overhang", "Slab", "Cave", ""]
    },
    angle: Number,
    photo: String,
    likes: Array,
    }, {collection: "posts"}
);

export default postSchema;