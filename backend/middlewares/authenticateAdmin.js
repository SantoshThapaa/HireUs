import jwt from "jsonwebtoken";

export const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token; // Extract token from cookies
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Token missing.", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the token
    if (decoded.userId !== "adminId") {
      return res.status(403).json({ message: "Forbidden. Access denied.", success: false });
    }

    req.user = { role: "admin" }; // Add role to the request object
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(403).json({ message: "Invalid or expired token.", success: false });
  }
};
