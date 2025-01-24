import mongoose from 'mongoose';
import { jsPDF } from 'jspdf';
import axios from 'axios'; // For fetching images
import { User } from '../models/user.model.js';

// Function to fetch and convert image to Base64
const fetchImageAsBase64 = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    // Determine the file extension and construct the data URI
    const contentType = response.headers['content-type'] || 'image/jpeg';
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error fetching image:', error.message);
    return null;
  }
};

export const generateCV = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Fetch user data from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { fullname, email, phoneNumber, profile } = user;
    const { profilePhoto, experience = '0', skills = [], age = 'N/A', bio = 'No bio available' } = profile;

    // Fetch and prepare profile photo
    let profilePhotoBase64 = null;
    if (profilePhoto?.startsWith('http')) {
      profilePhotoBase64 = await fetchImageAsBase64(profilePhoto);
    }

    // Create the PDF document
    const doc = new jsPDF();

    // Add profile photo
    if (profilePhotoBase64) {
      doc.addImage(profilePhotoBase64, 'JPEG', 10, 10, 40, 40); // X, Y, Width, Height
    } else {
      console.log('No profile photo found or unable to fetch.');
    }

    // Add user details
    doc.text(`Name: ${fullname}`, 10, 60);
    doc.text(`Email: ${email}`, 10, 70);
    doc.text(`Phone: ${phoneNumber}`, 10, 80);
    doc.text(`Age: ${age}`, 10, 90);
    doc.text(`Bio: ${bio}`, 10, 100);
    doc.text(`Experience: ${experience} years`, 10, 110);
    doc.text(`Skills: ${skills.join(', ') || 'N/A'}`, 10, 120);

    // Prepare response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generatedCV.pdf');

    // Send the PDF as a response
    const pdfOutput = doc.output('arraybuffer');
    res.send(Buffer.from(pdfOutput));
  } catch (error) {
    console.error('Error generating CV:', error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};
