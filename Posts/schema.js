import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    user: String,
    location: String,
    description: String,
    climbType: {
        type: String,
        enum: ["Overhang", "Slab", "Cave"]
    },
    angle: Number,
    photo: String,
    likes: Array,
    }, {collection: "posts"}
);

export default postSchema;