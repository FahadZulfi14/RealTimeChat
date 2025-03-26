import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    picture: {
        secure_url: {
            type: String,
            required: false
        },
        public_id: {
            type: String,
            required: false 
        }
    }
}, { timestamps: true });

export const User = mongoose.model("User", userModel);
