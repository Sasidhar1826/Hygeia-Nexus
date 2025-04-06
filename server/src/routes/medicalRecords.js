import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";
import MedicalRecord from "../models/MedicalRecord.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// @route   GET /api/medical-records
// @desc    Get medical records (filtered by patient for doctors/admins, or own records for patients)
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    let records;

    // If patient param is provided and user is doctor/admin, get that patient's records
    if (
      req.query.patient &&
      (req.user.role === "doctor" || req.user.role === "admin")
    ) {
      records = await MedicalRecord.find({ patient: req.query.patient })
        .populate({
          path: "patient",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is a doctor, get all records they created
    else if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor profile not found" });
      }

      records = await MedicalRecord.find({ doctor: doctor._id })
        .populate({
          path: "patient",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is admin, get all records
    else if (req.user.role === "admin") {
      records = await MedicalRecord.find()
        .populate({
          path: "patient",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is a patient, get their own records
    else {
      const patient = await Patient.findOne({ user: req.user._id });

      if (!patient) {
        return res.status(404).json({ message: "Patient profile not found" });
      }

      records = await MedicalRecord.find({ patient: patient._id })
        .populate({
          path: "doctor",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate("appointment")
        .sort({ createdAt: -1 });
    }

    res.json(records);
  } catch (error) {
    console.error("Get medical records error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/medical-records/:id
// @desc    Get medical record by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name email profileImage",
        },
      })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email profileImage",
        },
      })
      .populate("appointment");

    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    // Check if user is authorized to view this record
    if (req.user.role === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });

      if (
        !patient ||
        record.patient._id.toString() !== patient._id.toString()
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this record" });
      }

      // If the record is private and the user is not the doctor who created it
      if (record.isPrivate) {
        const doctor = await Doctor.findOne({ user: req.user._id });

        if (!doctor || record.doctor._id.toString() !== doctor._id.toString()) {
          return res.status(403).json({ message: "This record is private" });
        }
      }
    }

    res.json(record);
  } catch (error) {
    console.error("Get medical record error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Medical record not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/medical-records
// @desc    Create medical record
// @access  Private (Doctor, Admin)
router.post(
  "/",
  protect,
  authorizeRoles("doctor", "admin"),
  async (req, res) => {
    try {
      const {
        patient,
        appointment,
        diagnosis,
        symptoms,
        treatment,
        prescriptions,
        labTests,
        vitalSigns,
        notes,
        attachments,
        followUpRecommended,
        followUpDate,
        isPrivate,
      } = req.body;

      // Check if patient exists
      const patientExists = await Patient.findById(patient);
      if (!patientExists) {
        return res.status(400).json({ message: "Patient not found" });
      }

      // Get doctor ID if user is a doctor
      let doctorId;
      if (req.user.role === "doctor") {
        const doctor = await Doctor.findOne({ user: req.user._id });

        if (!doctor) {
          return res.status(404).json({ message: "Doctor profile not found" });
        }

        doctorId = doctor._id;
      } else {
        // If admin, doctor ID must be provided
        if (!req.body.doctor) {
          return res.status(400).json({ message: "Doctor ID is required" });
        }

        doctorId = req.body.doctor;
      }

      // Create the record
      const medicalRecord = await MedicalRecord.create({
        patient,
        doctor: doctorId,
        appointment,
        diagnosis,
        symptoms,
        treatment,
        prescriptions,
        labTests,
        vitalSigns,
        notes,
        attachments,
        followUpRecommended,
        followUpDate,
        isPrivate: isPrivate || false,
      });

      res.status(201).json(medicalRecord);
    } catch (error) {
      console.error("Create medical record error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   PUT /api/medical-records/:id
// @desc    Update medical record
// @access  Private (Doctor who created it, Admin)
router.put(
  "/:id",
  protect,
  authorizeRoles("doctor", "admin"),
  async (req, res) => {
    try {
      const record = await MedicalRecord.findById(req.params.id);

      if (!record) {
        return res.status(404).json({ message: "Medical record not found" });
      }

      // Check if user is authorized to update this record
      if (req.user.role === "doctor") {
        const doctor = await Doctor.findOne({ user: req.user._id });

        if (!doctor || record.doctor.toString() !== doctor._id.toString()) {
          return res
            .status(403)
            .json({ message: "Not authorized to update this record" });
        }
      }

      // Update fields
      const {
        diagnosis,
        symptoms,
        treatment,
        prescriptions,
        labTests,
        vitalSigns,
        notes,
        attachments,
        followUpRecommended,
        followUpDate,
        isPrivate,
      } = req.body;

      if (diagnosis) record.diagnosis = diagnosis;
      if (symptoms) record.symptoms = symptoms;
      if (treatment) record.treatment = treatment;
      if (prescriptions) record.prescriptions = prescriptions;
      if (labTests) record.labTests = labTests;
      if (vitalSigns) record.vitalSigns = vitalSigns;
      if (notes) record.notes = notes;
      if (attachments) record.attachments = attachments;
      if (followUpRecommended !== undefined)
        record.followUpRecommended = followUpRecommended;
      if (followUpDate) record.followUpDate = followUpDate;
      if (isPrivate !== undefined) record.isPrivate = isPrivate;

      const updatedRecord = await record.save();

      res.json(updatedRecord);
    } catch (error) {
      console.error("Update medical record error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   DELETE /api/medical-records/:id
// @desc    Delete medical record
// @access  Private (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    await record.deleteOne();

    res.json({ message: "Medical record removed" });
  } catch (error) {
    console.error("Delete medical record error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
