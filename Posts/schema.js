import mongoose, { Mongoose } from "mongoose";
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
    eventDate: Date,
    cost: Number,
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    postType: {
        type: String,
        enum: ["Climb", "Event", "Sponsorship", "Merch", ""]
    }
    }, {collection: "posts"}
);

export default postSchema;