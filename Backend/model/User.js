import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    },
    profileImage: {
        type: String,
        default: "",
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;