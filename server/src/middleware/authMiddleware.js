import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", {
      ...decoded,
      id: decoded.id ? "ID_EXISTS" : "NO_ID",
      userType: decoded.userType || "MISSING_USER_TYPE",
    });

    // Find user by ID based on their userType
    const { id, userType } = decoded;
    let user;

    if (!userType) {
      console.error("Token missing userType:", decoded);
      return res.status(401).json({
        message: "Not authorized, invalid token format (missing userType)",
      });
    }

    switch (userType) {
      case "doctor":
        user = await Doctor.findById(id).select("-password");
        break;
      case "patient":
        user = await Patient.findById(id).select("-password");
        break;
      case "admin":
        user = await Admin.findById(id).select("-password");
        break;
      case "labtechnician":
        user = await LabTechnician.findById(id).select("-password");
        break;
      default:
        console.error(`Invalid userType in token: ${userType}`);
        throw new Error(`Invalid user type: ${userType}`);
    }

    if (!user) {
      console.error(`User not found with ID: ${id} and type: ${userType}`);
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(401).json({
        message: "Your account has been deactivated. Please contact admin.",
      });
    }

    // Set user data in request object
    req.user = user;
    req.user.id = user._id; // For backward compatibility
    req.user.userType = userType;
    req.user.role = userType; // Add role for backward compatibility

    console.log(`Auth successful: ${userType} (${id}) - ${user.email}`);
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not authorized, token expired" });
    }
    res.status(401).json({ message: "Not authorized" });
  }
};

// Middleware to check if user has required role
export const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.userType || req.user.role;

    console.log("Authorize check:", {
      requiredRoles: roles,
      userType: req.user.userType,
      role: req.user.role,
    });

    if (!roles.includes(userRole)) {
      console.error(
        `Authorization failed: ${userRole} not in allowed roles: ${roles.join(
          ", "
        )}`
      );
      return res.status(403).json({
        message: `Unauthorized: ${userRole} role cannot access this resource`,
      });
    }
    next();
  };
};
