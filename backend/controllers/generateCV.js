import mongoose from 'mongoose';
import { jsPDF } from 'jspdf';
import path from 'path';
import fs from 'fs';
import { User } from '../models/user.model.js';

// Get the current directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// In your backend code
export const generateCV = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Query the user by _id
    const user = await User.findById(userId); // Mongoose will use _id automatically
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate the CV using user data
    const { fullname, email, phoneNumber, profile } = user;
    const { profilePhoto, resume, resumeOriginalName, experience = '0', skills = [] } = profile;
    const { age = 'N/A', bio = 'No bio available' } = profile;

    // Create a new PDF document
    const doc = new jsPDF();
    doc.text(`Name: ${fullname}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phoneNumber}`, 10, 30);
    doc.text(`Age: ${age}`, 10, 40);
    doc.text(`Bio: ${bio}`, 10, 50);
    doc.text(`Experience: ${experience} years`, 10, 60);
    doc.text(`Skills: ${skills.join(', ') || 'N/A'}`, 10, 70);

    // Set the response type and content disposition to prompt the download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generatedCV.pdf');

    // Send the PDF file directly in the response
    doc.save('generatedCV.pdf', { returnPromise: true }).then(() => {
      const pdfOutput = doc.output();
      res.send(pdfOutput);
    });
  } catch (error) {
    console.error('Error generating CV:', error);
    return res.status(500).json({ message: 'Something went wrong', success: false });
  }
};
