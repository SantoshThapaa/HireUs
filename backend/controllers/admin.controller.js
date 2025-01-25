import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js";
import { Services } from "../models/services.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";
import cloudinary from "cloudinary";
// import { getDataUri } from "../utils/dataUri.js";

// Admin registration
export const adminregister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required.", success: false });
    }

    const file = req.file;
    let cloudResponse = null;

    if (file) {
      try {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "auto",
        });
      } catch (cloudError) {
        console.error("Cloudinary upload failed:", cloudError);
        return res.status(500).json({ message: "Failed to upload profile image.", success: false });
      }
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      fullname,
      email,
      password: hashedPassword,
      profileImage: cloudResponse ? cloudResponse.secure_url : null,
    });

    return res.status(201).json({ message: "Admin registered successfully.", success: true, admin: newAdmin });
  } catch (error) {
    console.error("Error in adminregister:", error);
    res.status(500).json({ message: "Server error.", success: false });
  }
};

// Admin login
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required.", success: false });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password.", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password.", success: false });
    }

    const token = jwt.sign({ userId: admin._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ message: `Welcome back, ${admin.fullname}`, admin, success: true });
  } catch (error) {
    console.error("Error in adminlogin:", error);
    res.status(500).json({ message: "Server error.", success: false });
  }
};
// Admin logout
export const adminlogout = async (req, res) => {
    try {
      return res.status(200).cookie("token", "", { maxAge: 0 }).json({
        message: "Logged out successfully.",
        success: true
      })
    } catch (error) {
      console.log(error);
    }
  }
  
// Fetch admin data
export const getAdminData = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing.", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const adminData = await Admin.findById(decoded.userId).select("-password");

    if (!adminData) {
      return res.status(404).json({ message: "Admin not found.", success: false });
    }

    res.status(200).json({ admin: adminData, success: true });
  } catch (error) {
    console.error("Error in getAdminData:", error);
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized. Token invalid or expired.", success: false });
    }
    res.status(500).json({ message: "Server error.", success: false });
  }
};

export const getAdminDashboardData = async (req, res) => {
  try {
    // Fetch workers and recruiters count
    const workersCount = await User.countDocuments({ role: 'worker' });
    const recruitersCount = await User.countDocuments({ role: 'recruiter' });

    // Fetch all users (include phoneNumber and other fields)
    const allUsers = await User.find({}, 'fullname email phoneNumber role createdAt');

    // Fetch all services
    const allServices = await Services.find({}, 'name description website location createdAt');

    const response = {
      summary: {
        workersCount,
        recruitersCount,
        totalServices: allServices.length,
      },
      data: {
        users: allUsers,
        services: allServices,
      },
    };

    return res.status(200).json({
      success: true,
      message: 'Admin dashboard data retrieved successfully',
      data: response,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admin dashboard data',
      error: error.message,
    });
  }
};
export const getAdminDashboardStats = async (req, res) => {
  try {
    // Get the count of applicants with their statuses (selected, pending, rejected)
    const applicantStats = await Application.aggregate([
      {
        $group: {
          _id: null,
          selected: { $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] } },
        },
      },
    ]);

    // Get the count of users registered per month
    const userStats = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          registrations: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Format user registration data for the frontend (month/year combined as a string)
    const formattedUserStats = userStats.map((entry) => ({
      month: `${entry._id.month}/${entry._id.year}`,
      registrations: entry.registrations,
    }));

    // Get summary of the total counts (workers, recruiters, services)
    const workersCount = await User.countDocuments({ role: "worker" });
    const recruitersCount = await User.countDocuments({ role: "recruiter" });
    const totalServices = await Services.countDocuments();

    // Check applicant stats and format them to match expected structure
    const applicants = applicantStats.length > 0 ? applicantStats[0] : { selected: 0, pending: 0, rejected: 0 };

    // Send response
    res.status(200).json({
      success: true,
      message: "Admin dashboard data retrieved successfully",
      data: {
        applicants,
        userRegistrations: formattedUserStats,
        summary: {
          workersCount,
          recruitersCount,
          totalServices,
        },
      },
    });
  } catch (err) {
    console.error("Error fetching admin dashboard stats:", err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin dashboard data",
      error: err.message,
    });
  }
};



