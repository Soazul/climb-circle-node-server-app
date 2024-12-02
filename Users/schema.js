import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    role: {
        type: String,
        enum: ["Gym Owner", "Member"],
        default: "Member",
    }
    }, {collection: "users"}
);

export default userSchema;