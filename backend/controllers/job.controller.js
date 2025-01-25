import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { 
            title, 
            description, 
            requirements, 
            salary, 
            location, 
            latitude, 
            longitude, 
            jobType, 
            experience, 
            position, 
            servicesId 
        } = req.body;
        const userId = req.id;

        // Validate required fields
        if (
            !title || 
            !description || 
            !requirements || 
            !salary || 
            !location || 
            !latitude || 
            !longitude || 
            !jobType || 
            !experience || 
            !position || 
            !servicesId
        ) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false,
            });
        }

        // Log the incoming request data for debugging
        console.log("Job Data: ", {
            title, description, requirements, salary, location, latitude, longitude, jobType, experience, position, servicesId
        });

        // Create a new job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Split requirements into an array
            salary: Number(salary),
            location: {
                address: location,
                latitude: parseFloat(latitude), // Ensure latitude is a number
                longitude: parseFloat(longitude), // Ensure longitude is a number
            },
            jobType,
            experienceLevel: experience,
            position,
            services: servicesId,
            created_by: userId,
        });

        // Log job creation
        console.log("Job Created:", job);

        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while posting the job",
            success: false,
            error: error.message,
        });
    }
};



//worker
// worker - Get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Allow search by keyword
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate({
                path: "services",
                select: "name description" // Populate service info as needed
            })
            .sort({ createdAt: -1 }); // Sort jobs by creation date

        if (!jobs.length) {
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            });
        }
        console.log("jobs",jobs);
        return res.status(200).json({
            jobs,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs",
            success: false,
            error: error.message,
        });
    }
};


// Bookmark Job - Adds the job to the user's bookmarked list
export const bookmarkJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // Find the user and update their bookmarkedJobs list
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Add job to the bookmarkedJobs if not already bookmarked
        if (user.bookmarkedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job already bookmarked",
                success: false,
            });
        }

        user.bookmarkedJobs.push(jobId);
        await user.save();

        return res.status(200).json({
            message: "Job bookmarked successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// Save Job for Later - Adds the job to the user's savedJobs list
export const saveJobForLater = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.id;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // Find the user and update their savedJobs list
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Add job to the savedJobs if not already saved
        if (user.savedJobs.includes(jobId)) {
            return res.status(400).json({
                message: "Job already saved for later",
                success: false,
            });
        }

        user.savedJobs.push(jobId);
        await user.save();

        return res.status(200).json({
            message: "Job saved for later successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
//worker
// worker - Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate("applications"); // Populate applications to see applicants

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "An error occurred while fetching the job",
            success: false,
            error: error.message,
        });
    }
};

 
//admin created job for
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by: adminId}).populate({
            path: "services",
            createdAt: -1
        });
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        });
    } catch(error){
        console.error(error);
    }
}