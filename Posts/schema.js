import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: String,
    location: String,
    description: String,
    climb_type: {
        type: String,
        enum: ["Overhang", "Slab", "Cave"]
    },
    angle: Number,
    grade: String,
    photo: String,
    likes: Array,
    }, {collection: "posts"}
);

export default postSchema;