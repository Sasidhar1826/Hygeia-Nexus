import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";

export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded in auth.js:", {
        ...decoded,
        id: decoded.id ? "ID_EXISTS" : "NO_ID",
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
          throw new Error("Invalid user type");
      }

      if (!user) {
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

      // Add role property for backward compatibility
      req.user.role = userType;

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      if (error.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ message: "Not authorized, invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Not authorized, token expired" });
      }
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Ensure userType is set in req.user
    const userType = req.user.userType || req.user.role;

    // Normalize labtechnician variations
    let normalizedUserType = userType;
    if (userType === "lab_technician" || userType === "lab technician") {
      normalizedUserType = "labtechnician";
    }

    // Check if the user's role is in the allowed roles list
    if (
      !roles.some((role) => {
        // Normalize role for comparison
        if (role === "lab_technician" || role === "lab technician") {
          return normalizedUserType === "labtechnician";
        }
        return role === normalizedUserType;
      })
    ) {
      return res.status(403).json({
        message: `User role '${userType}' is not authorized to access this resource. Requires one of: ${roles.join(
          ", "
        )}`,
      });
    }

    // For debugging
    console.log(
      `Authorization successful: ${userType} can access ${req.method} ${req.originalUrl}`
    );

    next();
  };
};
