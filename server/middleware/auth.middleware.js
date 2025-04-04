const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Authentication middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (jwtError) {
      console.error("JWT Verification error:", jwtError.message);
      return res.status(401).json({
        message: "Token is invalid",
        error: jwtError.message,
      });
    }

    // Find user by id
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isActive && user.isActive !== undefined) {
      return res.status(401).json({ message: "User account is inactive" });
    }

    // Add user to request object
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during authentication" });
  }
};

// Admin middleware to check if user is an admin
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Admin privileges required." });
  }
};

module.exports = { verifyToken, adminMiddleware };
