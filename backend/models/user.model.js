import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    verificationCode: {
        type: String,
        required: false,
    },
    verificationCodeExpiresAt: {
        type: Date,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['worker', 'recruiter'],
        required: true,
    },
    profile: {
        profilePhoto: {
            type: String,
        },
        age: {
            type: Number,
            min: 0,
            default: 18,
        },
        location: {
            latitude: {
                type: Number,
                required: false,
            },
            longitude: {
                type: Number,
                required: false,
            },
        },
        resume: {
            type: String,
        },
        resumeOriginalName: {
            type: String,
        },
        bio: {
            type: String,
        },
        experience: {
            type: Number,
            default: 0,
        },
        skills: [String],
        bookmarkedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job", // Reference to the Job model
            },
        ],
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job", // Reference to the Job model
            },
        ],
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
