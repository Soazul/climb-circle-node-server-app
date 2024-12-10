import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    role: {
        type: String,
        enum: ["Gym Owner", "Member"],
        default: "Member",
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        }
    ],
    likedPosts:[ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PostsModel"
        }
    ],
    placeId: { type: String, unique: true, default: null }
}, { collection: "users" }
);

export default userSchema;