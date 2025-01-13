import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register User Controller
export const register = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, password, role } = req.body;
      if (!fullname || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
          message: "Something is missing",
          success: false,
        });
      }
  
      const file = req.file;  // The uploaded file (resume)
      let cloudResponse = null;
  
      if (file) {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "auto", // Let Cloudinary auto-detect the file type
        });
      }
  
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists with this email.",
          success: false,
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
          profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
          resume: cloudResponse ? cloudResponse.secure_url : null,  // Save resume URL
          resumeOriginalName: file ? file.originalname : null,  // Save original resume name
        },
      });
  
      return res.status(201).json({
        message: "Account created successfully.",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong", success: false });
    }
  };

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req,res)=> {
    try {
        return res.status(200).cookie("token","", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    }catch (error){
        console.log(error);
    }
}

// Update Profile Controller
export const updateProfile = async (req, res) => {
    try {
      const { fullname, email, phoneNumber, skills, bio, experience } = req.body;
      const file = req.file;
      let cloudResponse = null;
  
      // If a file is provided, upload it to Cloudinary
      if (file) {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "auto", // Automatically determine the resource type
        });
      }
  
      const userId = req.id; // Get user ID from authenticated user
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(400).json({
          message: "User not found.",
          success: false,
        });
      }
  
      // Update user profile fields
      if (fullname) user.fullname = fullname;
      if (email) user.email = email;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (bio) user.profile.bio = bio;
      if (skills) user.profile.skills = skills.split(",");
      if (experience) user.profile.experience = experience;
  
      // If a new resume or profile photo is uploaded, update the URL
      if (cloudResponse) {
        user.profile.profilePhoto = cloudResponse.secure_url;  // Profile photo URL
        user.profile.resume = cloudResponse.secure_url;  // Resume URL
        user.profile.resumeOriginalName = file.originalname;  // Save the original file name
      }
  
      await user.save();
  
      return res.status(200).json({
        message: "Profile updated successfully.",
        user,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Something went wrong.", success: false });
    }
  };

