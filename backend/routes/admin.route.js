import express from "express";
import {  adminlogin, adminlogout, adminregister, getAdminDashboardData, getAdminData} from "../controllers/admin.controller.js";
const router = express.Router();
// Admin routes
router.post("/adminregister", adminregister);
router.post("/adminlogin", adminlogin);
router.get("/adminlogout", adminlogout);
router.get("/admin/data", getAdminData); 
router.get("/dashboard", getAdminDashboardData);

export default router;
