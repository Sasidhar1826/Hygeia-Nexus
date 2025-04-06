import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";

// Helper function to generate JWT token
const generateToken = (id, userType) => {
  return jwt.sign({ id, userType }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    // Support both role and userType parameters for backward compatibility
    const { name, email, password, userType, role, ...otherData } = req.body;

    // Use userType if provided, otherwise fall back to role
    let userRole = userType || role || "";

    console.log(
      `Registration attempt for ${email} with role type: ${userRole}`
    );

    // Normalize role/userType to expected values
    if (userRole.toLowerCase() === "patient") {
      userRole = "patient";
    } else if (userRole.toLowerCase() === "doctor") {
      userRole = "doctor";
    } else if (userRole.toLowerCase() === "admin") {
      userRole = "admin";
    } else if (
      userRole.toLowerCase() === "labtechnician" ||
      userRole.toLowerCase() === "lab technician" ||
      userRole.toLowerCase() === "lab_technician"
    ) {
      userRole = "labtechnician";
    }

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please add all required fields: name, email, password",
      });
    }

    // Check if email already exists in any of the user models
    const doctorExists = await Doctor.findOne({ email });
    const patientExists = await Patient.findOne({ email });
    const adminExists = await Admin.findOne({ email });
    const technicianExists = await LabTechnician.findOne({ email });

    if (doctorExists || patientExists || adminExists || technicianExists) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    let user;

    // Create user based on the specified role/userType
    switch (userRole.toLowerCase()) {
      case "doctor":
        // Validate doctor-specific required fields
        if (!otherData.specialty || !otherData.licenseNumber) {
          return res.status(400).json({
            message:
              "Doctor registration requires specialty and license number",
          });
        }

        user = await Doctor.create({
          name,
          email,
          password,
          ...otherData,
        });
        break;

      case "patient":
        user = await Patient.create({
          name,
          email,
          password,
          ...otherData,
        });
        break;

      case "admin":
        // Validate admin-specific required fields
        if (!otherData.staffId) {
          return res.status(400).json({
            message: "Admin registration requires staff ID",
          });
        }

        user = await Admin.create({
          name,
          email,
          password,
          ...otherData,
        });
        break;

      case "labtechnician":
      case "lab technician":
      case "lab_technician":
        // Normalize to consistent format
        userRole = "labtechnician";

        // Validate labtechnician-specific required fields
        if (!otherData.licenseNumber || !otherData.specialization) {
          return res.status(400).json({
            message:
              "Lab technician registration requires license number and specialization",
          });
        }

        user = await LabTechnician.create({
          name,
          email,
          password,
          ...otherData,
        });
        break;

      default:
        console.error(`Invalid role type in registration: "${userRole}"`);
        return res.status(400).json({
          message: `Invalid user type: '${userRole}'. Must be one of: 'doctor', 'patient', 'admin', 'labtechnician'`,
        });
    }

    console.log(`User registered successfully: ${email} as ${userRole}`);

    // Generate token for the new user
    const token = generateToken(user._id, userRole);

    // Return user data and token
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: userRole,
      role: userRole, // For backwards compatibility
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Registration failed",
        error: validationErrors.join(", "),
      });
    }

    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    // Support both role and userType parameters for backward compatibility
    const { email, password, userType, role } = req.body;

    console.log("Login attempt:", {
      email,
      userType: userType || "not provided",
      role: role || "not provided",
    });

    // Use userType if provided, otherwise fall back to role
    let userRole = userType || role;

    // Normalize role/userType values if provided
    if (userRole) {
      if (userRole.toLowerCase() === "patient") {
        userRole = "patient";
      } else if (userRole.toLowerCase() === "doctor") {
        userRole = "doctor";
      } else if (userRole.toLowerCase() === "admin") {
        userRole = "admin";
      } else if (
        userRole.toLowerCase() === "labtechnician" ||
        userRole.toLowerCase() === "lab technician" ||
        userRole.toLowerCase() === "lab_technician"
      ) {
        userRole = "labtechnician";
      }
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    let user;
    let userCollection;

    // Find user based on the specified role/userType
    if (userRole) {
      // If user role is specified, search in the corresponding collection
      console.log(
        `Role specified: ${userRole}, searching in ${userRole} collection`
      );

      switch (userRole) {
        case "doctor":
          user = await Doctor.findOne({ email }).select("+password");
          userCollection = "Doctor";
          break;
        case "patient":
          user = await Patient.findOne({ email }).select("+password");
          userCollection = "Patient";
          break;
        case "admin":
          console.log(`Looking for admin with email: ${email}`);
          user = await Admin.findOne({ email }).select("+password");
          console.log(`Admin search result: ${user ? "Found" : "Not found"}`);
          if (user) {
            console.log(`Admin found: ${user._id}, isActive: ${user.isActive}`);
            console.log(`Password field exists: ${!!user.password}`);
          }
          userCollection = "Admin";
          break;
        case "labtechnician":
          user = await LabTechnician.findOne({ email }).select("+password");
          userCollection = "LabTechnician";
          break;
        default:
          console.error(`Invalid user type in login: "${userRole}"`);
          return res.status(400).json({
            message: `Invalid user type: '${userRole}'. Must be one of: 'doctor', 'patient', 'admin', 'labtechnician'`,
          });
      }
    } else {
      // If no role specified, try to find in all collections
      console.log("No role specified, searching all collections");
      user = await Doctor.findOne({ email }).select("+password");
      if (user) {
        userRole = "doctor";
        userCollection = "Doctor";
      } else {
        user = await Patient.findOne({ email }).select("+password");
        if (user) {
          userRole = "patient";
          userCollection = "Patient";
        } else {
          console.log(`Checking Admin collection for email: ${email}`);
          user = await Admin.findOne({ email }).select("+password");
          if (user) {
            console.log(`Admin found in collection search: ${user._id}`);
            userRole = "admin";
            userCollection = "Admin";
          } else {
            console.log(`Admin not found, checking LabTechnician collection`);
            user = await LabTechnician.findOne({ email }).select("+password");
            if (user) {
              userRole = "labtechnician";
              userCollection = "LabTechnician";
            }
          }
        }
      }
    }

    // Check if user exists
    if (!user) {
      console.log(
        `Login failed: No user found with email ${email} ${
          userRole ? `and role ${userRole}` : ""
        }`
      );
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log(`User found in ${userCollection} collection`);

    // Check if password matches
    console.log(`Attempting password match for ${email}`);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password match result: ${isMatch}`);

    if (!isMatch) {
      console.log(`Login failed: Invalid password for ${email}`);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if user is active
    if (user.isActive === false) {
      console.log(`Login failed: Account deactivated for ${email}`);
      return res.status(401).json({
        message: "Your account has been deactivated. Please contact admin.",
      });
    }

    // Update last login time
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Generate token
    const token = generateToken(user._id, userRole);

    console.log(`Login successful: ${email} as ${userRole}`);

    // Return user data with token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: userRole,
      role: userRole, // For backwards compatibility
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    let user;
    const userType = req.user.userType;

    // Fetch user details based on userType
    switch (userType) {
      case "doctor":
        user = await Doctor.findById(req.user.id).populate("department");
        break;
      case "patient":
        user = await Patient.findById(req.user.id).populate("primaryDoctor");
        break;
      case "admin":
        user = await Admin.findById(req.user.id);
        break;
      case "labtechnician":
        user = await LabTechnician.findById(req.user.id).populate("department");
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data (excluding password)
    res.json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res
      .status(500)
      .json({ message: "Failed to get user profile", error: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    let user;
    const userType = req.user.userType;
    const { password, email, ...updateData } = req.body;

    // Don't allow email changes through this endpoint for security
    if (email) {
      return res
        .status(400)
        .json({ message: "Email cannot be changed through this endpoint" });
    }

    // Update user based on userType
    switch (userType) {
      case "doctor":
        user = await Doctor.findByIdAndUpdate(req.user.id, updateData, {
          new: true,
          runValidators: true,
        }).populate("department");
        break;
      case "patient":
        user = await Patient.findByIdAndUpdate(req.user.id, updateData, {
          new: true,
          runValidators: true,
        }).populate("primaryDoctor");
        break;
      case "admin":
        user = await Admin.findByIdAndUpdate(req.user.id, updateData, {
          new: true,
          runValidators: true,
        });
        break;
      case "labtechnician":
        user = await LabTechnician.findByIdAndUpdate(req.user.id, updateData, {
          new: true,
          runValidators: true,
        }).populate("department");
        break;
      default:
        return res.status(400).json({ message: "Invalid user type" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle password update separately if provided
    if (password) {
      user.password = password;
      await user.save();
    }

    res.json(user);
  } catch (error) {
    console.error("Update profile error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Profile update failed",
        error: validationErrors.join(", "),
      });
    }

    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};
