import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getServices, getServicesById, registerServices, updateServices } from "../controllers/services.controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerServices);
router.route("/get").get(isAuthenticated,getServices);
router.route("/get/:id").get(isAuthenticated, getServicesById);
router.route("/update/:id").put(isAuthenticated, singleUpload,updateServices);

export default router;