import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String},
    password: {type: String, required: true},
    oldPassword: {type: String, required: false},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    profilePicture: {type: String, default: "https://www.nicepng.com/png/detail/914-9144016_avatar-pictures-anime-male-hair-reference.png"},
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema);
export default User