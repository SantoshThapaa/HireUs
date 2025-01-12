import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['worker','recruiter'],
        required:true
    },
    profile: {
        profilePhoto: {
            type: String
        },
        resume: {
            type: String
        },
        resumeOriginalName: {
            type: String
        },
        bio: {
            type: String
        },
        experience: {
            type: Number,
            default: 0  // Ensure this is set to a number
        },
        skills: [String]
    }
}, { timestamps: true });

export const User = mongoose.model('User',userSchema);