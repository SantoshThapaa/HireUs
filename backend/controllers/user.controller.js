import { User } from "../models/user.model.js";
import axios from "axios";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { sendVerificationCode, WelcomeEmail } from "../middlewares/Email.js";
import { generateTokenAndSetCookies } from "../middlewares/GenerateToken.js";

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

    const file = req.file; // The uploaded file (resume)
    let cloudResponse = null;

    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "auto", 
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day expiry

    // Create new user
    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse ? cloudResponse.secure_url : null,
        resume: cloudResponse ? cloudResponse.secure_url : null,
        resumeOriginalName: file ? file.originalname : null,
      },
      verificationCode: verificationToken,
      verificationCodeExpiresAt, // Ensure this is correctly added here
    });

    // Save the new user
    await newUser.save();

    // Send verification code email
    await sendVerificationCode(newUser.email, verificationToken);

    // Generate token and set cookies (for session management, optional)
    generateTokenAndSetCookies(res, newUser._id);

    // Return success response
    return res.status(201).json({
      message: "Account created successfully. Please verify your email.",
      success: true,
      verificationCode: verificationToken, // You can remove this in production
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Something went wrong", success: false });
  }
};


// Email Verification Controller
export const verifyEmail = async (req, res) => {
  try {
    const { code } = req.body;

    // Validate code
    if (!code) {
      return res.status(400).json({ success: false, message: "Code is required" });
    }

    // Find user with matching verification code and check expiration
    const user = await User.findOne({
      verificationCode: code,
      verificationCodeExpiresAt: { $gt: Date.now() }, // Check if token is still valid
    });

    // If user not found or code is expired
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or Expired Code" });
    }

    // Mark the user as verified
    user.isVerified = true;

    // Clear the verificationCode and verificationCodeExpiresAt after successful verification
    user.verificationCode = undefined;
    user.verificationCodeExpiresAt = undefined;

    // Save the updated user without validation for undefined fields
    await user.save({ validateBeforeSave: false });

    // Send success response
    res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT || "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      text: `Click the following link to reset your password: http://localhost:5173/reset-password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          message: "Failed to send email",
          success: false,
        });
      }

      return res.status(200).json({
        message: "Password reset link sent to your email",
        success: true,
      });
    });
  } catch (error) {
    console.error("Error in forgot-password:", error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password } = req.body;

    // Validate password
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    }

    // Validate token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(400).json({
          message: "Invalid or expired token",
          success: false,
        });
      }

      // Validate user existence
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
        });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({
        message: "Password reset successfully",
        success: true,
      });
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
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

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}

export const updateProfile = async (req, res) => {
  try {
    const {
      fullname,
      age,
      longitude,
      latitude,
      email,
      phoneNumber,
      skills,
      bio,
      experience,
    } = req.body;
    console.log(req.body);
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
    // console.log(location, user.profile.location, "location");
    if (age !== undefined) user.profile.age = age; // Update age (ensure null or undefined check)
    if (longitude && latitude)
      user.profile.location = {
        longitude,
        latitude,
      }; // Save fetched latitude and longitude
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");
    if (experience) user.profile.experience = experience;

    // If a new resume or profile photo is uploaded, update the URL
    if (cloudResponse) {
      user.profile.profilePhoto = cloudResponse.secure_url; // Profile photo URL
      user.profile.resume = cloudResponse.secure_url; // Resume URL
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong.", success: false });
  }
};
