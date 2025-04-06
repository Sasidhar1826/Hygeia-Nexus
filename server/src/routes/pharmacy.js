import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";
import Prescription from "../models/Prescription.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Medication from "../models/Medication.js";

const router = express.Router();

// @route   GET /api/pharmacy/medications
// @desc    Get all medications
// @access  Private
router.get("/medications", protect, async (req, res) => {
  try {
    const query = {};

    if (req.query.name) {
      query.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.category) {
      query.category = req.query.category;
    }

    const medications = await Medication.find(query).sort({ name: 1 });

    res.json(medications);
  } catch (error) {
    console.error("Get medications error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/pharmacy/medications/:id
// @desc    Get medication by ID
// @access  Private
router.get("/medications/:id", protect, async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (!medication) {
      return res.status(404).json({ message: "Medication not found" });
    }

    res.json(medication);
  } catch (error) {
    console.error("Get medication error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Medication not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/pharmacy/medications
// @desc    Create medication
// @access  Private (Admin, Pharmacist)
router.post(
  "/medications",
  protect,
  authorizeRoles("admin", "pharmacist"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        dosageForm,
        strength,
        manufacturer,
        category,
        requiresPrescription,
        price,
        stock,
        imageUrl,
      } = req.body;

      // Check if medication already exists
      const existingMedication = await Medication.findOne({
        name,
        dosageForm,
        strength,
      });

      if (existingMedication) {
        return res.status(400).json({ message: "Medication already exists" });
      }

      const medication = await Medication.create({
        name,
        description,
        dosageForm,
        strength,
        manufacturer,
        category,
        requiresPrescription,
        price,
        stock,
        imageUrl,
      });

      res.status(201).json(medication);
    } catch (error) {
      console.error("Create medication error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   PUT /api/pharmacy/medications/:id
// @desc    Update medication
// @access  Private (Admin, Pharmacist)
router.put(
  "/medications/:id",
  protect,
  authorizeRoles("admin", "pharmacist"),
  async (req, res) => {
    try {
      const medication = await Medication.findById(req.params.id);

      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }

      const updatableFields = [
        "name",
        "description",
        "dosageForm",
        "strength",
        "manufacturer",
        "category",
        "requiresPrescription",
        "price",
        "stock",
        "imageUrl",
      ];

      updatableFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          medication[field] = req.body[field];
        }
      });

      const updatedMedication = await medication.save();

      res.json(updatedMedication);
    } catch (error) {
      console.error("Update medication error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   DELETE /api/pharmacy/medications/:id
// @desc    Delete medication
// @access  Private (Admin only)
router.delete(
  "/medications/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const medication = await Medication.findById(req.params.id);

      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }

      await medication.deleteOne();

      res.json({ message: "Medication removed" });
    } catch (error) {
      console.error("Delete medication error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   GET /api/pharmacy/prescriptions
// @desc    Get prescriptions (filtered by role)
// @access  Private
router.get("/prescriptions", protect, async (req, res) => {
  try {
    let prescriptions;
    const query = { status: req.query.status || { $ne: null } };

    // If user is admin or pharmacist, get all prescriptions
    if (req.user.userType === "admin" || req.user.userType === "pharmacist") {
      // Add specific filters if needed
      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      if (req.query.doctor) {
        query.doctor = req.query.doctor;
      }

      prescriptions = await Prescription.find(query)
        .populate("patient", "name email profileImage")
        .populate("doctor", "name email profileImage")
        .populate("medications.medication")
        .sort({ createdAt: -1 });
    }
    // If user is doctor, get prescriptions they created
    else if (req.user.userType === "doctor") {
      // Doctor ID is now the user's ID directly
      query.doctor = req.user._id;

      // Add patient filter if needed
      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      prescriptions = await Prescription.find(query)
        .populate("patient", "name email profileImage")
        .populate("medications.medication")
        .sort({ createdAt: -1 });
    }
    // If user is patient, get their prescriptions
    else if (req.user.userType === "patient") {
      // Patient ID is now the user's ID directly
      query.patient = req.user._id;

      prescriptions = await Prescription.find(query)
        .populate("doctor", "name email profileImage")
        .populate("medications.medication")
        .sort({ createdAt: -1 });
    }

    res.json(prescriptions);
  } catch (error) {
    console.error("Get prescriptions error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/pharmacy/prescriptions/:id
// @desc    Get prescription by ID
// @access  Private
router.get("/prescriptions/:id", protect, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name email profileImage")
      .populate("doctor", "name email profileImage specialty")
      .populate("medications.medication");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Check if user is authorized to view this prescription
    if (req.user.userType === "patient") {
      // Patient ID is now the user's ID directly
      if (prescription.patient._id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this prescription" });
      }
    } else if (req.user.userType === "doctor") {
      // Doctor ID is now the user's ID directly
      if (prescription.doctor._id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this prescription" });
      }
    }

    res.json(prescription);
  } catch (error) {
    console.error("Get prescription error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/pharmacy/prescriptions
// @desc    Create prescription
// @access  Private (Doctor, Admin)
router.post(
  "/prescriptions",
  protect,
  authorizeRoles("doctor", "admin"),
  async (req, res) => {
    try {
      const { patient, medications, notes } = req.body;

      // Check if required fields are provided
      if (!patient || !medications || medications.length === 0) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Check if patient exists
      const patientExists = await Patient.findById(patient);
      if (!patientExists) {
        return res.status(400).json({ message: "Patient not found" });
      }

      // Get doctor ID
      let doctorId;
      if (req.user.userType === "doctor") {
        // Doctor ID is now the user's ID directly
        doctorId = req.user._id;
      } else {
        // If admin, doctor ID must be provided
        if (!req.body.doctor) {
          return res.status(400).json({ message: "Doctor ID is required" });
        }

        doctorId = req.body.doctor;
      }

      // Create the prescription
      const prescription = await Prescription.create({
        patient,
        doctor: doctorId,
        medications,
        notes,
        status: "active",
        issuedAt: Date.now(),
      });

      res.status(201).json(prescription);
    } catch (error) {
      console.error("Create prescription error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   PUT /api/pharmacy/prescriptions/:id
// @desc    Update prescription
// @access  Private
router.put("/prescriptions/:id", protect, async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Different updates allowed based on role
    if (req.user.userType === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });

      if (!doctor || prescription.doctor.toString() !== doctor._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this prescription" });
      }

      // Doctors can update medications, notes, and status
      if (req.body.medications) prescription.medications = req.body.medications;
      if (req.body.notes) prescription.notes = req.body.notes;
      if (req.body.status) prescription.status = req.body.status;
    } else if (req.user.userType === "pharmacist") {
      // Pharmacists can update status and add notes
      if (req.body.status) prescription.status = req.body.status;
      if (req.body.pharmacistNotes)
        prescription.pharmacistNotes = req.body.pharmacistNotes;
      if (req.body.filledAt) prescription.filledAt = req.body.filledAt;
    } else if (req.user.userType === "admin") {
      // Admins can update any field
      const updatableFields = [
        "patient",
        "doctor",
        "medications",
        "notes",
        "pharmacistNotes",
        "status",
        "issuedAt",
        "filledAt",
        "refillCount",
      ];

      updatableFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          prescription[field] = req.body[field];
        }
      });
    }

    const updatedPrescription = await prescription.save();

    res.json(updatedPrescription);
  } catch (error) {
    console.error("Update prescription error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/pharmacy/prescriptions/:id/refill
// @desc    Refill prescription
// @access  Private (Pharmacist, Admin)
router.put(
  "/prescriptions/:id/refill",
  protect,
  authorizeRoles("pharmacist", "admin"),
  async (req, res) => {
    try {
      const prescription = await Prescription.findById(req.params.id);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      if (prescription.status !== "active") {
        return res
          .status(400)
          .json({ message: "Only active prescriptions can be refilled" });
      }

      // Check if refills are allowed
      if (prescription.refillCount <= 0) {
        return res.status(400).json({ message: "No refills remaining" });
      }

      // Update refill count
      prescription.refillCount -= 1;

      // If this was the last refill, update status
      if (prescription.refillCount <= 0) {
        prescription.status = "completed";
      }

      // Update filled date
      prescription.filledAt = Date.now();

      // Add pharmacist notes if provided
      if (req.body.pharmacistNotes) {
        prescription.pharmacistNotes = req.body.pharmacistNotes;
      }

      const updatedPrescription = await prescription.save();

      res.json(updatedPrescription);
    } catch (error) {
      console.error("Refill prescription error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   DELETE /api/pharmacy/prescriptions/:id
// @desc    Delete prescription
// @access  Private (Admin only)
router.delete(
  "/prescriptions/:id",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      const prescription = await Prescription.findById(req.params.id);

      if (!prescription) {
        return res.status(404).json({ message: "Prescription not found" });
      }

      await prescription.deleteOne();

      res.json({ message: "Prescription removed" });
    } catch (error) {
      console.error("Delete prescription error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

export default router;
