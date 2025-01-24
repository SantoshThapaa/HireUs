import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";  // Import the User model

export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // Get the user ID from the request
        const jobId = req.params.id; // Get the job ID from the URL parameters
        if (!jobId) {
            return res.status(400).json({
                message: 'Job ID is required',
                success: false
            });
        };

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: 'You have already applied for this job',
                success: false
            });
        };

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        // Retrieve the user's experience (assuming the user model has an 'experience' field)
        const user = await User.findById(userId);  // Query the User model for user details
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        // Check if the user's experience meets the required experience for the job
        if (user.experience < job.experienceLevel) {
            return res.status(400).json({
                message: `You must have at least ${job.experienceLevel} years of experience to apply for this job.`,
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        });
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: 'Application submitted successfully',
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred',
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'services',
                options: { sort: { createdAt: -1 } }
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//Admin will see how much has applied for job
// admin will see how much has applied for the job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        });

        if (!job) {
            return res.status(404).json({
                message: 'Job not found',
                success: false
            });
        }

        // Fetch the salary from the job and include it in the response
        const jobSalary = job.salary;

        return res.status(200).json({
            job,
            jobSalary, // Send the salary information
            success: true
        });
    } catch (error) {
        console.log(error);
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}

// Function to calculate the distance between two coordinates using the Haversine formula
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(deltaLat / 2) ** 2 +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

export const recommendEmployees = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        let jobLatitude = job.location.latitude;
        let jobLongitude = job.location.longitude;

        if (!jobLatitude || !jobLongitude) {
            if (!job.location || !job.location.address) {
                return res.status(400).json({ message: "Job location address is missing.", success: false });
            }

            const { address } = job.location;
            const coordinates = await getCoordinatesFromAddress(address);
            jobLatitude = coordinates.latitude;
            jobLongitude = coordinates.longitude;
        }

        const applications = await Application.find({ job: jobId }).populate("applicant", "fullname email phoneNumber profile.experience profile.age profile.location");

        if (applications.length === 0) {
            return res.status(404).json({ message: "No applications found", success: false });
        }

        const filteredApplicants = applications.filter((application) => {
            const applicant = application.applicant;
            if (!applicant.profile.location || !applicant.profile.location.latitude || !applicant.profile.location.longitude) {
                return false;
            }

            const applicantLatitude = applicant.profile.location.latitude;
            const applicantLongitude = applicant.profile.location.longitude;
            const distance = calculateDistance(jobLatitude, jobLongitude, applicantLatitude, applicantLongitude);

            return applicant.profile.experience >= job.experienceLevel && distance <= 50;
        });

        if (filteredApplicants.length === 0) {
            return res.status(200).json({ message: "No recommended applicants found", success: true, recommendedApplicants: [] });
        }

        const sortedApplicants = filteredApplicants.sort((a, b) => {
            const experienceA = a.applicant.profile.experience;
            const experienceB = b.applicant.profile.experience;
            if (experienceA === experienceB) {
                return a.applicant.profile.age - b.applicant.profile.age;
            }
            return experienceB - experienceA;
        });

        const recommendedApplicants = sortedApplicants.map((application) => ({
            fullname: application.applicant.fullname,
            email: application.applicant.email,
            phoneNumber: application.applicant.phoneNumber,
            experience: application.applicant.profile.experience,
            age: application.applicant.profile.age,
            distance: calculateDistance(jobLatitude, jobLongitude, application.applicant.profile.location.latitude, application.applicant.profile.location.longitude).toFixed(2),
        }));

        return res.status(200).json({
            message: "Recommended applicants based on experience, proximity, and age.",
            success: true,
            recommendedApplicants,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message || "An error occurred", success: false });
    }
};





export const getAllApplication = async (req, res) => {
    try {
        const services = await Application.find();
        res.status(200).json({
            success: true,
            services,
        });
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch services",
            error: error.message,
        });
    }
};


