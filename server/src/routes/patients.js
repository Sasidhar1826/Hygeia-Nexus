import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";
import Patient from "../models/Patient.js";

const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patients
// @access  Private (Doctor, Admin)
router.get(
  "/",
  protect,
  authorizeRoles("doctor", "admin"),
  async (req, res) => {
    try {
      const patients = await Patient.find().populate("primaryDoctor");

      res.json(patients);
    } catch (error) {
      console.error("Get patients error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   GET /api/patients/:id
// @desc    Get patient by ID
// @access  Private (Doctor, Admin, or the patient themselves)
router.get("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate({
      path: "primaryDoctor",
      select: "name email specialty department",
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is authorized to view this patient
    // Allow if user is admin, doctor, or the patient themselves
    const isAdmin = req.user.userType === "admin";
    const isDoctor = req.user.userType === "doctor";
    const isPatient = patient._id.toString() === req.user._id.toString();

    if (!isAdmin && !isDoctor && !isPatient) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this patient" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Get patient error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/patients/:id
// @desc    Update patient
// @access  Private (Admin, doctor, or the patient themselves)
router.put("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Check if user is authorized to update this patient
    const isAdmin = req.user.userType === "admin";
    const isDoctor = req.user.userType === "doctor";
    const isOwnProfile = patient._id.toString() === req.user._id.toString();

    if (!isAdmin && !isDoctor && !isOwnProfile) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this patient" });
    }

    // Update fields
    const {
      name,
      email,
      gender,
      phone,
      address,
      profileImage,
      dateOfBirth,
      bloodGroup,
      height,
      weight,
      allergies,
      chronicDiseases,
      emergencyContact,
      insurance,
      primaryDoctor,
      medicalHistory,
      currentMedications,
    } = req.body;

    // Basic user info - patient can update
    if (name) patient.name = name;
    if (gender) patient.gender = gender;
    if (phone) patient.phone = phone;
    if (address) patient.address = address;
    if (profileImage) patient.profileImage = profileImage;
    if (dateOfBirth) patient.dateOfBirth = dateOfBirth;

    // Only admin can update email
    if (email && isAdmin) patient.email = email;

    // Patient medical info
    if (bloodGroup) patient.bloodGroup = bloodGroup;
    if (height) patient.height = height;
    if (weight) patient.weight = weight;
    if (allergies) patient.allergies = allergies;
    if (chronicDiseases) patient.chronicDiseases = chronicDiseases;
    if (emergencyContact) patient.emergencyContact = emergencyContact;
    if (insurance) patient.insurance = insurance;

    // Medical info - only doctor/admin can update
    if ((isAdmin || isDoctor) && primaryDoctor)
      patient.primaryDoctor = primaryDoctor;
    if ((isAdmin || isDoctor) && medicalHistory)
      patient.medicalHistory = medicalHistory;
    if ((isAdmin || isDoctor) && currentMedications)
      patient.currentMedications = currentMedications;

    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (error) {
    console.error("Update patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/patients/:id
// @desc    Delete patient
// @access  Private (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Delete the patient
    await patient.deleteOne();

    res.json({ message: "Patient removed" });
  } catch (error) {
    console.error("Delete patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/patients
// @desc    Create a new patient
// @access  Private (Admin only)
router.post("/", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      phone,
      dateOfBirth,
      bloodGroup,
      height,
      weight,
      allergies,
      chronicDiseases,
      emergencyContact,
      insurance,
      primaryDoctor,
      medicalHistory,
      currentMedications,
      address,
      profileImage,
    } = req.body;

    // Check if patient with this email already exists
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res
        .status(400)
        .json({ message: "Patient with this email already exists" });
    }

    // Create new patient
    const patient = await Patient.create({
      name,
      email,
      password,
      gender,
      phone,
      dateOfBirth,
      bloodGroup,
      height,
      weight,
      allergies,
      chronicDiseases,
      emergencyContact,
      insurance,
      primaryDoctor,
      medicalHistory,
      currentMedications,
      address,
      profileImage,
      userType: "patient", // Explicitly set the userType
    });

    res.status(201).json(patient);
  } catch (error) {
    console.error("Create patient error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
