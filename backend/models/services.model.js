import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})

export const Services = mongoose.model("Services", servicesSchema);