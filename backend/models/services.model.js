import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        address: {
            type: String, 
        },
        latitude: {
            type: Number, 
        },
        longitude: {
            type: Number, 
        },
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export const Services = mongoose.model("Services", servicesSchema);
