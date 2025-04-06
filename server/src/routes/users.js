import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private
router.get("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    // Fetch users from all collections
    const doctors = await Doctor.find().select("-password");
    const patients = await Patient.find().select("-password");
    const admins = await Admin.find().select("-password");
    const labTechnicians = await LabTechnician.find().select("-password");

    // Add userType to each user for frontend identification
    const formattedDoctors = doctors.map((doc) => ({
      ...doc.toObject(),
      userType: "doctor",
    }));

    const formattedPatients = patients.map((patient) => ({
      ...patient.toObject(),
      userType: "patient",
    }));

    const formattedAdmins = admins.map((admin) => ({
      ...admin.toObject(),
      userType: "admin",
    }));

    const formattedLabTechnicians = labTechnicians.map((tech) => ({
      ...tech.toObject(),
      userType: "labtechnician",
    }));

    // Combine all users
    const allUsers = [
      ...formattedDoctors,
      ...formattedPatients,
      ...formattedAdmins,
      ...formattedLabTechnicians,
    ];

    res.json(allUsers);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    // Try to find the user in each collection
    let user = await Doctor.findById(req.params.id).select("-password");
    let userType = "doctor";

    if (!user) {
      user = await Patient.findById(req.params.id).select("-password");
      userType = "patient";
    }

    if (!user) {
      user = await Admin.findById(req.params.id).select("-password");
      userType = "admin";
    }

    if (!user) {
      user = await LabTechnician.findById(req.params.id).select("-password");
      userType = "labtechnician";
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the requesting user is an admin or the user themselves
    if (
      req.user.userType !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this user profile" });
    }

    // Add userType to the response for frontend identification
    const userWithType = {
      ...user.toObject(),
      userType,
    };

    res.json(userWithType);
  } catch (error) {
    console.error("Get user error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Determine which collection to update based on userType
    const { userType } = req.body;
    let Model;

    if (userType === "doctor") {
      Model = Doctor;
    } else if (userType === "patient") {
      Model = Patient;
    } else if (userType === "admin") {
      Model = Admin;
    } else if (userType === "labtechnician") {
      Model = LabTechnician;
    } else {
      // If userType is not provided, try to infer from logged-in user
      if (req.user.userType === "doctor") {
        Model = Doctor;
      } else if (req.user.userType === "patient") {
        Model = Patient;
      } else if (req.user.userType === "admin") {
        Model = Admin;
      } else if (req.user.userType === "labtechnician") {
        Model = LabTechnician;
      } else {
        return res.status(400).json({ message: "Invalid user type" });
      }
    }

    const user = await Model.findById(req.params.id);

    // Check if the requesting user is an admin or the user themselves
    if (
      req.user.userType !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this user profile" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a safe update object to prevent unintended field overrides
    const updateFields = {};

    // Basic fields that can be updated by any user (self) or admin
    const basicFields = [
      "name",
      "gender",
      "phone",
      "address",
      "profileImage",
      "dateOfBirth",
    ];

    basicFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateFields[field] = req.body[field];
      }
    });

    // Fields that only admins can update
    if (req.user.userType === "admin") {
      // Email is sensitive, only admin can update
      if (req.body.email !== undefined) {
        updateFields.email = req.body.email;
      }

      // isActive status can only be toggled by admin
      if (req.body.isActive !== undefined) {
        updateFields.isActive = req.body.isActive;
      }

      // Role/model specific fields
      if (userType === "doctor") {
        const doctorFields = [
          "specialty",
          "department",
          "licenseNumber",
          "consultationFee",
          "qualifications",
          "experience",
        ];
        doctorFields.forEach((field) => {
          if (req.body[field] !== undefined) {
            updateFields[field] = req.body[field];
          }
        });
      } else if (userType === "patient") {
        const patientFields = [
          "bloodGroup",
          "height",
          "weight",
          "allergies",
          "existingConditions",
          "primaryDoctor",
        ];
        patientFields.forEach((field) => {
          if (req.body[field] !== undefined) {
            updateFields[field] = req.body[field];
          }
        });
      } else if (userType === "labtechnician") {
        const techFields = [
          "specialization",
          "qualification",
          "experience",
          "licenseNumber",
          "department",
        ];
        techFields.forEach((field) => {
          if (req.body[field] !== undefined) {
            updateFields[field] = req.body[field];
          }
        });
      } else if (userType === "admin") {
        const adminFields = [
          "staffId",
          "position",
          "permissions",
          "isSuperAdmin",
        ];
        adminFields.forEach((field) => {
          if (req.body[field] !== undefined) {
            // Extra validation for super admin status
            if (
              field === "isSuperAdmin" &&
              !user.isSuperAdmin &&
              req.body.isSuperAdmin
            ) {
              // Only existing super admins can promote others to super admin
              const requestingAdminIsSuperAdmin = req.user.isSuperAdmin;
              if (!requestingAdminIsSuperAdmin) {
                return res.status(403).json({
                  message:
                    "Only super admins can promote users to super admin status",
                });
              }
            }
            updateFields[field] = req.body[field];
          }
        });
      }
    }

    // Password is handled separately and requires special treatment
    // Never update password through this endpoint for security
    if (req.body.password) {
      return res.status(400).json({
        message:
          "Password cannot be updated through this endpoint for security reasons",
      });
    }

    // Update user with safe update object
    const updatedUser = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found after update" });
    }

    // Add userType to the response for frontend identification
    const responseUser = {
      ...updatedUser.toObject(),
      userType: userType || req.user.userType,
    };

    // Don't include the password in the response
    delete responseUser.password;

    res.json(responseUser);
  } catch (error) {
    console.error("Update user error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation error",
        errors: validationErrors,
      });
    }

    // Handle duplicate key errors (like email)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate value error",
        error: `The ${Object.keys(error.keyValue)[0]} is already in use`,
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    // Try to find the user in each collection
    let user = await Doctor.findById(req.params.id);
    let Model = Doctor;

    if (!user) {
      user = await Patient.findById(req.params.id);
      Model = Patient;
    }

    if (!user) {
      user = await Admin.findById(req.params.id);
      Model = Admin;
    }

    if (!user) {
      user = await LabTechnician.findById(req.params.id);
      Model = LabTechnician;
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await Model.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
