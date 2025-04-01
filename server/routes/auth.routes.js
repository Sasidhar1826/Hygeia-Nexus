const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);
router.put("/me", verifyToken, updateProfile);

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "doctor", // Default role
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return user data (excluding password) and token
    res.status(201).json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Patient Registration route
router.post("/patient-register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      aadhaarNumber,
      bloodGroup,
      allergies,
      existingConditions,
      address,
    } = req.body;

    console.log("Patient registration data received:", {
      email,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      phoneNumber,
      aadhaarNumber,
      bloodGroup,
      allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
      existingConditions,
      address,
    });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role patient
    const user = new User({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "patient",
      gender,
      dateOfBirth,
      phoneNumber: phoneNumber,
      address: {
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        zipCode: address?.pincode || "",
        country: "India",
      },
    });

    // Save user to database
    const savedUser = await user.save();

    // Create patient record with additional fields
    const patient = new Patient({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      contactNumber: phoneNumber,
      email,
      address: {
        street: address?.street || "",
        city: address?.city || "",
        state: address?.state || "",
        zipCode: address?.pincode || "",
        country: "India",
      },
      bloodGroup,
      aadhaarNumber,
      allergies: allergies ? allergies.split(",").map((a) => a.trim()) : [],
      medicalHistory: existingConditions
        ? [
            {
              condition: existingConditions,
              diagnosedDate: new Date(),
              notes: "Self-reported during registration",
            },
          ]
        : [],
    });

    // Save patient to database
    await patient.save();

    console.log("Patient registered successfully:", {
      userId: savedUser._id,
      patientId: patient._id,
      name: savedUser.name,
      email: savedUser.email,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return user data and token
    res.status(201).json({
      token,
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    console.error("Patient registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Test route to list all patients
router.get("/patients-list", async (req, res) => {
  try {
    // Get all patients with their details
    const patients = await Patient.find().select("-__v");

    // Return patient data
    res.json({
      count: patients.length,
      patients: patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Test route to list users by role
router.get("/users-by-role/:role", async (req, res) => {
  try {
    const { role } = req.params;

    // Validate role parameter
    const validRoles = ["patient", "doctor", "admin", "labtechnician"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    // Get all users with the specified role
    const users = await User.find({ role }).select("-password -__v");

    // Return user data
    res.json({
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error(`Error fetching ${req.params.role} users:`, error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return user data (excluding password) and token
    res.json({
      token,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Auth routes are working!" });
});

// Add token validation endpoint to verify tokens without accessing protected resources
router.get("/validate-token", verifyToken, (req, res) => {
  // If middleware passes, token is valid
  res.status(200).json({
    valid: true,
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = router;
