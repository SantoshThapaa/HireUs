import mongoose from 'mongoose';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { User } from '../models/user.model.js';

// Function to fetch and convert image to Base64
const fetchImageAsBase64 = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
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

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    // Fetch user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const { fullname, email, phoneNumber, profile } = user;
    const { profilePhoto, experience = '0', skills = [], age = 'N/A', bio = 'No bio available' } = profile;

    let profilePhotoBase64 = null;
    if (profilePhoto?.startsWith('http')) {
      profilePhotoBase64 = await fetchImageAsBase64(profilePhoto);
    }

    const doc = new jsPDF();

    // Header Section
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(fullname, 10, 20);

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Email: ${email}`, 10, 30);
    doc.text(`Phone: ${phoneNumber}`, 10, 40);

    // Add Profile Photo
    if (profilePhotoBase64) {
      const centerX = 160; // Center X for circular profile
      const centerY = 20; // Center Y for circular profile
      const radius = 20;

      doc.setDrawColor(0); // Border color
      doc.circle(centerX, centerY, radius); // Draw circular border
      doc.addImage(profilePhotoBase64, 'JPEG', centerX - radius, centerY - radius, radius * 2, radius * 2);
    }

    // Section: About Me
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('About Me', 10, 60);
    doc.setLineWidth(0.5);
    doc.line(10, 62, 200, 62);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(bio, 10, 70);

    // Section: Experience
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Experience', 10, 90);
    doc.line(10, 92, 200, 92);

    doc.setFontSize(12);
    doc.text(`${experience} years of experience`, 10, 100);

    // Section: Skills
    doc.setFontSize(18);
    doc.text('Skills', 10, 120);
    doc.line(10, 122, 200, 122);

    doc.setFontSize(12);
    doc.text(skills.length > 0 ? skills.join(', ') : 'N/A', 10, 130);

    // Footer
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('Page 1 of 1', 105, 290, { align: 'center' });

    // Send PDF as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fullname}_CV.pdf`);
    res.send(Buffer.from(doc.output('arraybuffer')));
  } catch (error) {
    console.error('Error generating CV:', error.message);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};
