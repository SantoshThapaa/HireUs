import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, location, jobType, experience, position, servicesId}= req.body;
        const userId = req.id;

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !servicesId){
            return res.status(400).json({
                message: "Please fill in all fields",
                success:false
            })
        };
        const job = await Job.create({
            title,
            description, 
            requirements: requirements.split(","), 
            salary: Number(salary), 
            location, 
            jobType, 
            experienceLevel: experience, 
            position, 
            services: servicesId,
            created_by: userId
        });
        return res.status(201).json({
            message: "Job posted successfully",
            job,
            success:true,
        })
    }catch(error){
        console.log(error);
    }
}
//worker
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i"} },//small corrector or large it is sensitive
                { description: { $regex: keyword, $options: "i"}},
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "services",
        }).sort({createdAt: -1 });
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
        console.log(error);
    }
}
//worker
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if(!job){
            return res.status(404).json({
                message: "No jobs found",
                success:false
            })
        };
        return res.status(200).json({
            job,
            success:true
        });
    }catch(error){
        console.error(error);
    }
}
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