import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  acceptAppointment,
  rejectAppointment,
  cancelAppointment,
  completeAppointment,
  markNoShow,
  addAppointmentNote,
  updateAppointmentStatus,
  updateAppointment,
  diagnoseAppointment,
} from "../controllers/appointmentController.js";
import { protect, authorizeRoles } from "../middleware/auth.js";
import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Admin-only route to fix broken references
router.post("/fix-references", authorizeRoles("admin"), async (req, res) => {
  try {
    // Find appointments with broken references
    const brokenAppointments = await Appointment.find({
      $or: [
        { doctor: { $exists: true, $eq: null } },
        { patient: { $exists: true, $eq: null } },
      ],
    });

    console.log(
      `Found ${brokenAppointments.length} appointments with broken references`
    );

    let fixed = 0;
    let deleted = 0;
    const unfixable = [];
    const details = [];

    // Get the option from the request body
    const { action = "fix" } = req.body; // default to "fix"

    // Go through each broken appointment
    for (const appointment of brokenAppointments) {
      let shouldUpdate = false;
      let shouldDelete = false;
      const detail = {
        id: appointment._id,
        date: appointment.appointmentDate,
        time: `${appointment.startTime} - ${appointment.endTime}`,
        status: appointment.status,
        issues: [],
      };

      // Check if patient reference is broken
      if (appointment._doc.patient && appointment.patient === null) {
        detail.issues.push("Missing patient reference");
        // Try to find patient in database
        const patientExists = await Patient.findById(appointment._doc.patient);

        if (patientExists) {
          // Patient exists but reference is broken
          appointment.patient = appointment._doc.patient;
          detail.issues.push("Fixed patient reference");
          shouldUpdate = true;
        } else if (action === "delete") {
          // If patient doesn't exist and action is delete
          shouldDelete = true;
          detail.issues.push("Patient doesn't exist, appointment deleted");
        } else {
          // Set patient to undefined
          appointment.patient = undefined;
          detail.issues.push("Removed invalid patient reference");
          shouldUpdate = true;
        }
      }

      // Check if doctor reference is broken
      if (appointment._doc.doctor && appointment.doctor === null) {
        detail.issues.push("Missing doctor reference");
        // Try to find doctor in database
        const doctorExists = await Doctor.findById(appointment._doc.doctor);

        if (doctorExists) {
          // Doctor exists but reference is broken
          appointment.doctor = appointment._doc.doctor;
          detail.issues.push("Fixed doctor reference");
          shouldUpdate = true;
        } else if (action === "delete") {
          // If doctor doesn't exist and action is delete
          shouldDelete = true;
          detail.issues.push("Doctor doesn't exist, appointment deleted");
        } else {
          // Set doctor to undefined
          appointment.doctor = undefined;
          detail.issues.push("Removed invalid doctor reference");
          shouldUpdate = true;
        }
      }

      if (shouldDelete) {
        try {
          await Appointment.deleteOne({ _id: appointment._id });
          deleted++;
        } catch (error) {
          detail.issues.push(`Error deleting: ${error.message}`);
          unfixable.push(appointment._id);
        }
      } else if (shouldUpdate) {
        try {
          await appointment.save();
          fixed++;
        } catch (error) {
          detail.issues.push(`Error saving: ${error.message}`);
          unfixable.push(appointment._id);
        }
      }

      details.push(detail);
    }

    res.json({
      message: `Fixed ${fixed} appointments, deleted ${deleted} appointments with broken references`,
      total: brokenAppointments.length,
      unfixable: unfixable.length > 0 ? unfixable : undefined,
      details,
    });
  } catch (error) {
    console.error("Error fixing appointment references:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Base routes
router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.put("/:id", updateAppointment); // New general-purpose update route

// Appointment lifecycle routes
router.put("/:id/accept", authorizeRoles("doctor", "admin"), acceptAppointment);
router.put("/:id/reject", authorizeRoles("doctor", "admin"), rejectAppointment);
router.put("/:id/cancel", cancelAppointment); // Both patients and doctors can cancel
router.put(
  "/:id/complete",
  authorizeRoles("doctor", "admin"),
  completeAppointment
);
router.put("/:id/no-show", authorizeRoles("doctor", "admin"), markNoShow);

// Additional routes
router.put("/:id/notes", authorizeRoles("doctor", "admin"), addAppointmentNote);

// Legacy route, kept for backward compatibility
router.put(
  "/:id/status",
  authorizeRoles("doctor", "admin"),
  updateAppointmentStatus
);

// Diagnostic route for admins
router.get("/:id/diagnose", diagnoseAppointment);

// @route   GET /api/appointments
// @desc    Get appointments (filtered by role)
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    let appointments;
    const query = { status: req.query.status || { $ne: null } };
    const dateFilter = {};

    // Add date range filter if provided
    if (req.query.startDate) {
      dateFilter.$gte = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      dateFilter.$lte = new Date(req.query.endDate);
    }

    if (Object.keys(dateFilter).length > 0) {
      query.appointmentDate = dateFilter;
    }

    // If user is admin, get all appointments
    if (req.user.role === "admin") {
      // Add specific filters for admin if needed
      if (req.query.doctor) {
        query.doctor = req.query.doctor;
      }

      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      appointments = await Appointment.find(query)
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
        .sort({ appointmentDate: 1, startTime: 1 });
    }
    // If user is doctor, get their appointments
    else if (req.user.userType === "doctor") {
      // Doctor ID is now the user ID directly
      query.doctor = req.user._id;

      // Add specific patient filter if needed
      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      appointments = await Appointment.find(query)
        .populate("patient", "name email profileImage")
        .sort({ appointmentDate: 1, startTime: 1 });
    }
    // If user is patient, get their appointments
    else if (req.user.userType === "patient") {
      // Patient ID is now the user ID directly
      query.patient = req.user._id;

      // Add specific doctor filter if needed
      if (req.query.doctor) {
        query.doctor = req.query.doctor;
      }

      appointments = await Appointment.find(query)
        .populate("doctor", "name email profileImage specialty")
        .sort({ appointmentDate: 1, startTime: 1 });
    }

    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  // Note: This route is a duplicate of the controller-based one above.
  // The controller-based implementation should be used instead.
  // This is left here for reference but will be skipped due to route order.
});

// Helper function to calculate end time (30 minutes after start time)
const calculateEndTime = (startTime) => {
  const [hours, minutes] = startTime.split(":").map(Number);
  let endHours = hours;
  let endMinutes = minutes + 30;

  if (endMinutes >= 60) {
    endHours = (endHours + 1) % 24;
    endMinutes = endMinutes - 60;
  }

  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
};

export default router;
