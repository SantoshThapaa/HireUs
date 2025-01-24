import mongoose from 'mongoose';

export const generateCV = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate CV with the available data
    const { fullname, email, phoneNumber, profile } = user;
    const { profilePhoto, resume, resumeOriginalName, experience = "0", skills = [] } = profile;
    const { age = "N/A", bio = "No bio available" } = profile;

    const doc = new jsPDF();
    doc.text(`Name: ${fullname}`, 10, 10);
    doc.text(`Email: ${email}`, 10, 20);
    doc.text(`Phone: ${phoneNumber}`, 10, 30);
    doc.text(`Age: ${age}`, 10, 40);
    doc.text(`Bio: ${bio}`, 10, 50);
    doc.text(`Experience: ${experience} years`, 10, 60);
    doc.text(`Skills: ${skills.join(", ") || "N/A"}`, 10, 70);

    const outputPath = path.join(__dirname, "../output/generatedCV.pdf");
    doc.save(outputPath);

    return res.status(200).json({ success: true, cvPath: `/output/generatedCV.pdf` });
  } catch (error) {
    console.error("Error generating CV:", error);
    return res.status(500).json({ message: "Something went wrong", success: false });
  }
};
