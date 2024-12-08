import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    username: { type: String, ref: "User", required: true },
    location: String,
    description: String,
    climbType: {
        type: String,
        enum: ["Overhang", "Slab", "Cave", ""]
    },
    angle: Number,
    photo: String,
    eventDate: Date,
    cost: Number,
    likes: Array,
    postType: {
        type: String,
        enum: ["Climb", "Event", "Sponsorship", "Merch", ""]
    }
    }, {collection: "posts"}
);

export default postSchema;