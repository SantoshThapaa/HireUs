import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { bookmarkJob, getAdminJobs, getAllJobs, getJobById, postJob, saveJobForLater } from "../controllers/job.controller.js";
import { recommendEmployees } from "../controllers/application.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.get('/jobs/:id/recommendations', recommendEmployees);
// Bookmark a job
router.post("/bookmark", bookmarkJob);

// Save a job for later
router.post("/save-for-later", saveJobForLater);


export default router;