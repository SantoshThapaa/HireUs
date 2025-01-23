import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {  forgotPassword, login, logout,  register,  resetPassword,  updateProfile, verifyEmail } from "../controllers/user.controller.js";
import { singleUpload } from "../middlewares/multer.js";
import { generateCV } from "../controllers/generateCV.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/verifyemail").post(verifyEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:id/:token").post(resetPassword);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/logout").get(logout);
router.route("/generate-cv/:userId").get(generateCV);

export default router;