import express from "express";
import {
  adminlogin,
  adminlogout,
  // adminregister,
  getAdminDashboardData,
  getAdminDashboardStats,
  getAdminData,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Admin routes
// router.route("/adminregister").post(adminregister); 
router.route("/adminlogin").post(adminlogin); 
router.route("/adminlogout").get(adminlogout); 
router.route("/admindata").get(getAdminData); 
router.route("/dashboard").get(getAdminDashboardData); 
router.route("/admindashboard").get(getAdminDashboardStats);

export default router;
