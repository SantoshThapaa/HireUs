// auth.controller.js
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const googleLogin = async (req, res) => {
    try {
        const { code } = req.query;

        // Get access token from Google using the auth code
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        // Fetch user info from Google using the access token
        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { email, name, picture } = userRes.data;

        // Check if the user already exists in your database
        let user = await User.findOne({ email });
        if (!user) {
            user = await User({
                fullname: name,
                email,
                profile: { profilePhoto: picture }
            });
            await user.save(); // Save the user to the database if they don't exist
        }

        // Generate a JWT token for the user
        const { _id } = user;
        const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT
        });

        // Send the response with user data and JWT token
        return res.status(200).json({
            message: "Login Success",
            token,
            user
        });
    } catch (err) {
        console.error("Error during Google login:", err);
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message || err
        });
    }
};
