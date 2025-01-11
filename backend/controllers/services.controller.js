import { Services } from "../models/services.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerServices = async(req, res) => {
    try { 
        const { servicesName } = req.body;
        if(!servicesName){
            return res.status(400).json({
                message: 'Services name are required',
                success:false
            });
        }
        let services = await Services.findOne({name: servicesName});
        if(services){
            return res.status(400).json({
                message:"You can't register same services",
                success:false
            })
        };
        services = await Services.create({
            name: servicesName,
            userId: req.id
        });

        return res.status(201).json({
            message:"Services registered successfully.",
            services,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
export const getServices = async(req, res) =>{
    try {
        const userId = req.id; //logged in userId
        const services = await Services.find({userId});
        if(!services) {
            return res.status(404).json({
                message: 'No services found',
                success: false
            })
        }
        return res.status(200).json({
            services,
            success: true
        })
    } catch(error){
        console.log(error);
    }
}
// get company by id
export const getServicesById = async(req, res) =>{
    try {
        const servicesId = req.params.id;
        const services = await Services.findById(servicesId);
        if(!services) {
            return res.status(404).json({
                message: 'No services found',
                success: false
            })
        }
        return res.status(200).json({
            services,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const updateServices = async (req, res) =>{
    try{
        const { name, description, website,location } = req.body;
        const file = req.file;
        //cloudinary
        const fileUri =getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = {name, description, website, location, logo};

        const services = await Services.findByIdAndUpdate(req.params.id, updateData, {new: true});

        if(!services){
            return  res.status(404).json({
                message: 'No services found',
                success: false
            })
        }
        return res.status(200).json({
            message: 'Services updated successfully',
            success: true
        })
    }catch(error){
        console.log(error);
    }
}