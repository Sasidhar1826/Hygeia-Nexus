const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment.model");
const User = require("../models/user.model");
const {
  verifyToken,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// Get all appointments (filtered by user role)
router.get("/", verifyToken, async (req, res) => {
  try {
    const { status, date, doctor, patient } = req.query;

    let query = {};

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by date if provided
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);

      query.appointmentDate = { $gte: startDate, $lte: endDate };
    }

    // Apply role-based filters
    if (req.user.role === "doctor") {
      // Doctors can only see their own appointments
      query.doctor = req.user._id;
    } else if (req.user.role === "patient") {
      // Patients can only see their own appointments
      query.patient = req.user._id;
    } else if (req.user.role === "admin" || req.user.role === "receptionist") {
      // Admins and receptionists can filter by doctor or patient
      if (doctor) {
        query.doctor = doctor;
      }

      if (patient) {
        query.patient = patient;
      }
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "name")
      .populate("doctor", "name specialization")
      .populate("department", "name")
      .sort({ appointmentDate: 1, startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get appointment by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email contactNumber")
      .populate("doctor", "name specialization")
      .populate("department", "name");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user has permission to view this appointment
    if (
      req.user.role !== "admin" &&
      req.user.role !== "receptionist" &&
      req.user._id.toString() !== appointment.doctor.toString() &&
      req.user._id.toString() !== appointment.patient.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new appointment
router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      doctor,
      department,
      appointmentDate,
      startTime,
      endTime,
      reason,
      notes,
    } = req.body;

    // Validate required fields
    if (
      !doctor ||
      !department ||
      !appointmentDate ||
      !startTime ||
      !endTime ||
      !reason
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the selected time slot is available
    const conflictingAppointments = await Appointment.find({
      doctor,
      appointmentDate: new Date(appointmentDate),
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
      status: { $ne: "cancelled" },
    });

    if (conflictingAppointments.length > 0) {
      return res.status(400).json({
        message: "The selected time slot is not available",
      });
    }

    // Create new appointment
    const appointment = new Appointment({
      patient: req.user._id, // Current user is the patient
      doctor,
      department,
      appointmentDate: new Date(appointmentDate),
      startTime,
      endTime,
      reason,
      notes,
    });

    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update appointment status
router.patch("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["scheduled", "completed", "cancelled", "no-show"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user has permission to update this appointment
    if (
      req.user.role !== "admin" &&
      req.user.role !== "receptionist" &&
      req.user._id.toString() !== appointment.doctor.toString() &&
      (status !== "cancelled" ||
        req.user._id.toString() !== appointment.patient.toString())
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update status" });
    }

    appointment.status = status;

    // Add notes about who changed the status
    if (appointment.notes) {
      appointment.notes += `\n${
        status === "completed" ? "Marked as completed by " : "Cancelled by "
      }${req.user.role} on ${new Date().toISOString()}`;
    } else {
      appointment.notes = `${
        status === "completed" ? "Marked as completed by " : "Cancelled by "
      }${req.user.role} on ${new Date().toISOString()}`;
    }

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error("Error updating appointment status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update appointment payment status
router.patch("/:id/payment", verifyToken, async (req, res) => {
  try {
    const { paymentStatus, paymentAmount } = req.body;

    if (!["pending", "paid", "refunded"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Only admins, receptionists, or the patient themselves can update payment
    if (
      req.user.role !== "admin" &&
      req.user.role !== "receptionist" &&
      req.user._id.toString() !== appointment.patient.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update payment" });
    }

    appointment.paymentStatus = paymentStatus;

    if (paymentAmount) {
      appointment.paymentAmount = paymentAmount;
    }

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
