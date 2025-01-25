// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { Admin } from "../models/admin.model.js";
import { Services } from "../models/services.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";

const adminEmail = "admin@admin.com";
const adminPassword = "sarathi123";

// Admin login
export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required.", success: false });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(400).json({ message: "Invalid email or password.", success: false });
    }

    const token = jwt.sign({ userId: "adminId" }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });

    res.status(200).json({ message: `Welcome back, Admin`, success: true });
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
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Fetch admin dashboard data
export const getAdminDashboardData = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing.", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the admin is authorized
    if (decoded.userId !== "adminId") {
      return res.status(403).json({ message: "Forbidden. Access denied.", success: false });
    }

    const workersCount = await User.countDocuments({ role: "worker" });
    const recruitersCount = await User.countDocuments({ role: "recruiter" });
    const allUsers = await User.find({}, "fullname email phoneNumber role createdAt");
    const allServices = await Services.find({}, "name description website location createdAt");

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
      message: "Admin dashboard data retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard data",
      error: error.message,
    });
  }
};

// Fetch admin dashboard stats
export const getAdminDashboardStats = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing.", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the admin is authorized
    if (decoded.userId !== "adminId") {
      return res.status(403).json({ message: "Forbidden. Access denied.", success: false });
    }

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

    const formattedUserStats = userStats.map((entry) => ({
      month: `${entry._id.month}/${entry._id.year}`,
      registrations: entry.registrations,
    }));

    const workersCount = await User.countDocuments({ role: "worker" });
    const recruitersCount = await User.countDocuments({ role: "recruiter" });
    const totalServices = await Services.countDocuments();

    const applicants = applicantStats.length > 0 ? applicantStats[0] : { selected: 0, pending: 0, rejected: 0 };

    res.status(200).json({
      success: true,
      message: "Admin dashboard stats retrieved successfully",
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
