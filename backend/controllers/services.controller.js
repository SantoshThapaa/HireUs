import { Services } from "../models/services.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerServices = async (req, res) => {
  try {
    const { servicesName } = req.body;
    if (!servicesName) {
      return res.status(400).json({
        message: "Services name is required",
        success: false,
      });
    }

    let services = await Services.findOne({ name: servicesName });
    if (services) {
      return res.status(400).json({
        message: "You can't register the same service",
        success: false,
      });
    }

    services = await Services.create({
      name: servicesName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Services registered successfully.",
      services,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while registering the services",
      success: false,
      error: error.message,
    });
  }
};

export const getServices = async (req, res) => {
  try {
    const userId = req.id; // Logged-in userId
    const services = await Services.find({ userId });
    if (!services.length) {
      return res.status(404).json({
        message: "No services found",
        success: false,
      });
    }
    return res.status(200).json({
      services,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching services",
      success: false,
      error: error.message,
    });
  }
};

export const getServicesById = async (req, res) => {
  try {
    const servicesId = req.params.id;
    const services = await Services.findById(servicesId);
    if (!services) {
      return res.status(404).json({
        message: "No services found",
        success: false,
      });
    }
    return res.status(200).json({
      services,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while fetching the service",
      success: false,
      error: error.message,
    });
  }
};

export const updateServices = async (req, res) => {
  try {
    const { name, description, website, logo, location, latitude, longitude } = req.body;
    console.log(req.body);
    const file = req.file;

    if (!name || !location) {
      return res.status(400).json({
        message: "Name and location are required",
        success: false,
      });
    }
    if (file) {
      // Cloudinary upload
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = {
      name,
      logo,
      description,
      website,
      location: {
        address: location, // Location as address (optional)
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      },
    };

    if (logo) {
      updateData.logo = logo;
    }

    const services = await Services.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!services) {
      return res.status(404).json({
        message: "Service not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Service updated successfully",
      success: true,
      data: services,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred while updating the service",
      success: false,
      error: error.message,
    });
  }
};
