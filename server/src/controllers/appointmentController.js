import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";

/**
 * Check if an appointment has broken references
 * @param {Object} appointment - The appointment to check
 * @returns {Object} - An object with details about any broken references
 */
const checkBrokenReferences = async (appointment) => {
  const issues = [];
  let doctorExists = false;
  let patientExists = false;

  // Check if doctor reference exists and is valid
  if (appointment.doctor) {
    try {
      const doctor = await Doctor.findById(appointment.doctor);
      doctorExists = !!doctor;
      if (!doctorExists) {
        issues.push("Doctor reference is broken");
      }
    } catch (err) {
      issues.push(`Error checking doctor reference: ${err.message}`);
    }
  } else {
    issues.push("Doctor reference is missing");
  }

  // Check if patient reference exists and is valid
  if (appointment.patient) {
    try {
      const patient = await Patient.findById(appointment.patient);
      patientExists = !!patient;
      if (!patientExists) {
        issues.push("Patient reference is broken");
      }
    } catch (err) {
      issues.push(`Error checking patient reference: ${err.message}`);
    }
  } else {
    issues.push("Patient reference is missing");
  }

  return {
    hasBrokenReferences: issues.length > 0,
    doctorExists,
    patientExists,
    issues,
  };
};

/**
 * Helper function to ensure consistent doctor and patient data
 * This helps handle missing or broken references in a graceful way
 */
const getPopulatedAppointment = async (appointment, populationOptions = {}) => {
  try {
    if (!appointment) return null;

    // Convert to plain object for manipulation
    const appointmentObj = appointment.toObject
      ? appointment.toObject()
      : { ...appointment };

    // Default options
    const options = {
      forceFull: false, // Force reloading even if already populated
      includeAll: false, // Include all fields instead of just basic ones
      ...populationOptions,
    };

    // Ensure doctor data is populated if it exists
    if (appointmentObj.doctor) {
      try {
        // If doctor is just an ID (not populated yet)
        // OR if forceFull is true (reload even if already populated)
        if (
          options.forceFull ||
          typeof appointmentObj.doctor === "string" ||
          (appointmentObj.doctor._id && !appointmentObj.doctor.name)
        ) {
          const doctorId =
            typeof appointmentObj.doctor === "string"
              ? appointmentObj.doctor
              : appointmentObj.doctor._id;

          const doctor = await Doctor.findById(doctorId);
          if (doctor) {
            // Select fields based on includeAll option
            if (options.includeAll) {
              // Include all fields
              appointmentObj.doctor = doctor.toObject();
            } else {
              // Include basic fields
              appointmentObj.doctor = {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                phone: doctor.phone,
                profileImage: doctor.profileImage,
                specialty: doctor.specialty,
                department: doctor.department,
                consultationFee: doctor.consultationFee,
              };
            }
          } else {
            // Doctor not found, provide placeholder
            appointmentObj.doctor = {
              _id: doctorId,
              name: "Unknown Doctor",
              email: "unknown@example.com",
              specialty: "General",
            };
            console.warn(`Doctor with ID ${doctorId} not found`);
          }
        }
      } catch (err) {
        console.error(
          `Error populating doctor for appointment ${appointmentObj._id}:`,
          err
        );
        appointmentObj.doctor = {
          _id: appointmentObj.doctor._id || appointmentObj.doctor,
          name: "Unknown Doctor",
          specialty: "General",
        };
      }
    }

    // Ensure patient data is populated if it exists
    if (appointmentObj.patient) {
      try {
        // If patient is just an ID (not populated yet)
        // OR if forceFull is true (reload even if already populated)
        if (
          options.forceFull ||
          typeof appointmentObj.patient === "string" ||
          (appointmentObj.patient._id && !appointmentObj.patient.name)
        ) {
          const patientId =
            typeof appointmentObj.patient === "string"
              ? appointmentObj.patient
              : appointmentObj.patient._id;

          const patient = await Patient.findById(patientId);
          if (patient) {
            // Select fields based on includeAll option
            if (options.includeAll) {
              // Include all fields
              appointmentObj.patient = patient.toObject();
            } else {
              // Include basic fields
              appointmentObj.patient = {
                _id: patient._id,
                name: patient.name,
                email: patient.email,
                phone: patient.contactNumber || patient.phone,
                profileImage: patient.profileImage,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                bloodGroup: patient.bloodGroup,
                address: patient.address,
              };
            }
          } else {
            // Patient not found, provide placeholder
            appointmentObj.patient = {
              _id: patientId,
              name: "Unknown Patient",
              email: "unknown@example.com",
            };
            console.warn(`Patient with ID ${patientId} not found`);
          }
        }
      } catch (err) {
        console.error(
          `Error populating patient for appointment ${appointmentObj._id}:`,
          err
        );
        appointmentObj.patient = {
          _id: appointmentObj.patient._id || appointmentObj.patient,
          name: "Unknown Patient",
        };
      }
    }

    return appointmentObj;
  } catch (error) {
    console.error("Error in getPopulatedAppointment:", error);
    return appointment; // Return original as fallback
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private (Patient only)
export const createAppointment = async (req, res) => {
  try {
    const {
      doctor,
      appointmentDate,
      startTime,
      endTime,
      type,
      reason,
      symptoms,
      attachments,
      patient: patientId, // Get patient ID from request body if present
    } = req.body;

    // Log what patient info we have for debugging
    console.log("Creating appointment:", {
      requestUserID: req.user?._id,
      requestUserType: req.user?.userType,
      patientIdFromBody: patientId,
    });

    let patientToUse;

    // Determine the patient ID based on user role and request data
    if (req.user.userType === "patient") {
      // If the user is a patient, use their ID directly
      patientToUse = req.user._id;
      console.log("Using authenticated patient ID:", patientToUse);
    } else if (
      (req.user.userType === "admin" || req.user.userType === "doctor") &&
      patientId
    ) {
      // If admin/doctor is creating appointment for a patient, use provided ID
      patientToUse = patientId;
      console.log(
        "Admin/Doctor creating appointment for patient:",
        patientToUse
      );
    } else {
      // No valid patient ID available
      return res.status(400).json({ message: "Patient ID is required" });
    }

    // Verify patient exists in database
    const patientExists = await Patient.findById(patientToUse);
    if (!patientExists) {
      return res.status(400).json({
        message: "Patient profile not found",
        detail: `No patient found with ID: ${patientToUse}`,
      });
    }

    // Check if doctor exists (if doctor ID is provided)
    let doctorExists = null;
    if (doctor) {
      doctorExists = await Doctor.findById(doctor);
      if (!doctorExists) {
        return res.status(400).json({ message: "Doctor not found" });
      }
    }

    // Prepare status history entry
    const statusHistoryEntry = {
      status: "pending",
      changedBy: req.user._id,
      userType:
        req.user.userType === "doctor"
          ? "Doctor"
          : req.user.userType === "patient"
          ? "Patient"
          : "Admin",
      notes: "Appointment created",
    };

    // Create new appointment with the determined patient ID
    const appointment = await Appointment.create({
      patient: patientToUse,
      doctor: doctor, // Doctor may be null/undefined if not assigned yet
      appointmentDate,
      startTime,
      endTime,
      type,
      reason,
      symptoms,
      attachments,
      status: "pending", // All new appointments start as pending
      statusHistory: [statusHistoryEntry],
      amount: doctorExists?.consultationFee || 0,
    });

    // If it's a telemedicine appointment, generate a meeting link
    if (type === "telemedicine") {
      // In a real app, you would generate a unique meeting link
      appointment.meetingLink = `https://meet.hygienianexus.com/${appointment._id}`;
      await appointment.save();
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Accept an appointment (Doctor only)
// @route   PUT /api/appointments/:id/accept
// @access  Private (Doctor only)
export const acceptAppointment = async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized (must be the doctor assigned to this appointment)
    if (req.user.userType !== "doctor" && req.user.userType !== "admin") {
      return res.status(403).json({
        message:
          "Not authorized - Only doctors or admins can accept appointments",
      });
    }

    if (
      req.user.userType === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized - You are not the doctor assigned to this appointment",
      });
    }

    // Check if appointment is in a valid state to be accepted
    if (appointment.status !== "pending") {
      return res.status(400).json({
        message: `Appointment cannot be accepted because it is already ${appointment.status}`,
      });
    }

    // Create status history entry
    const statusHistoryEntry = {
      status: "confirmed",
      changedBy: req.user._id,
      userType: req.user.userType === "doctor" ? "Doctor" : "Admin",
      timestamp: new Date(),
      notes: req.body.notes || "Appointment confirmed by doctor",
    };

    // Update appointment
    appointment.status = "confirmed";
    appointment.statusHistory.push(statusHistoryEntry);

    // If doctor provided notes, add them
    if (req.body.notes) {
      appointment.notes = req.body.notes;
    }

    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(appointment._id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Accept appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Reject an appointment (Doctor only)
// @route   PUT /api/appointments/:id/reject
// @access  Private (Doctor only)
export const rejectAppointment = async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized (must be the doctor assigned to this appointment)
    if (req.user.userType !== "doctor" && req.user.userType !== "admin") {
      return res.status(403).json({
        message:
          "Not authorized - Only doctors or admins can reject appointments",
      });
    }

    if (
      req.user.userType === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized - You are not the doctor assigned to this appointment",
      });
    }

    // Check if appointment is in a valid state to be rejected
    if (appointment.status !== "pending") {
      return res.status(400).json({
        message: `Appointment cannot be rejected because it is already ${appointment.status}`,
      });
    }

    // Require rejection reason
    if (!req.body.rejectionReason) {
      return res.status(400).json({ message: "Rejection reason is required" });
    }

    // Create status history entry
    const statusHistoryEntry = {
      status: "rejected",
      changedBy: req.user._id,
      userType: req.user.userType === "doctor" ? "Doctor" : "Admin",
      timestamp: new Date(),
      notes: req.body.rejectionReason,
    };

    // Update appointment
    appointment.status = "rejected";
    appointment.rejectionReason = req.body.rejectionReason;
    appointment.statusHistory.push(statusHistoryEntry);

    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(appointment._id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Reject appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Cancel an appointment (Patient, Doctor, or Admin)
// @route   PUT /api/appointments/:id/cancel
// @access  Private
export const cancelAppointment = async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized
    let isAuthorized = false;
    let userRole = "";

    if (req.user.userType === "admin") {
      isAuthorized = true;
      userRole = "Admin";
    } else if (
      req.user.userType === "doctor" &&
      appointment.doctor.toString() === req.user._id.toString()
    ) {
      isAuthorized = true;
      userRole = "Doctor";
    } else if (
      req.user.userType === "patient" &&
      appointment.patient.toString() === req.user._id.toString()
    ) {
      isAuthorized = true;
      userRole = "Patient";
    }

    if (!isAuthorized) {
      return res.status(403).json({
        message: "Not authorized to cancel this appointment",
      });
    }

    // Check if appointment is in a valid state to be cancelled
    if (
      appointment.status !== "pending" &&
      appointment.status !== "confirmed"
    ) {
      return res.status(400).json({
        message: `Appointment cannot be cancelled because it is already ${appointment.status}`,
      });
    }

    // For confirmed appointments, additional validation if needed
    if (appointment.status === "confirmed") {
      // Additional logic for confirmed appointments could go here
      // e.g., check cancellation window, apply cancellation fee, etc.
    }

    // Create status history entry
    const statusHistoryEntry = {
      status: "cancelled",
      changedBy: req.user._id,
      userType: userRole,
      timestamp: new Date(),
      notes:
        req.body.cancellationReason || `Cancelled by ${userRole.toLowerCase()}`,
    };

    // Update appointment
    appointment.status = "cancelled";
    if (req.body.cancellationReason) {
      appointment.cancellationReason = req.body.cancellationReason;
    }
    appointment.statusHistory.push(statusHistoryEntry);

    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(appointment._id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Cancel appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark appointment as completed (Doctor only)
// @route   PUT /api/appointments/:id/complete
// @access  Private (Doctor only)
export const completeAppointment = async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized (must be the doctor assigned to this appointment)
    if (req.user.userType !== "doctor" && req.user.userType !== "admin") {
      return res.status(403).json({
        message:
          "Not authorized - Only doctors or admins can complete appointments",
      });
    }

    if (
      req.user.userType === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized - You are not the doctor assigned to this appointment",
      });
    }

    // Check if appointment is in a valid state to be completed
    if (appointment.status !== "confirmed") {
      return res.status(400).json({
        message: `Appointment cannot be completed because it is ${appointment.status} (must be confirmed)`,
      });
    }

    // Create status history entry
    const statusHistoryEntry = {
      status: "completed",
      changedBy: req.user._id,
      userType: req.user.userType === "doctor" ? "Doctor" : "Admin",
      timestamp: new Date(),
      notes: req.body.notes || "Appointment marked as completed",
    };

    // Update appointment
    appointment.status = "completed";
    appointment.statusHistory.push(statusHistoryEntry);

    // Add notes if provided
    if (req.body.notes) {
      appointment.notes = req.body.notes;
    }

    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(appointment._id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Complete appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Mark appointment as no-show (Doctor only)
// @route   PUT /api/appointments/:id/no-show
// @access  Private (Doctor only)
export const markNoShow = async (req, res) => {
  try {
    // Validate ID format
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized (must be the doctor assigned to this appointment)
    if (req.user.userType !== "doctor" && req.user.userType !== "admin") {
      return res.status(403).json({
        message: "Not authorized - Only doctors or admins can mark as no-show",
      });
    }

    if (
      req.user.userType === "doctor" &&
      appointment.doctor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized - You are not the doctor assigned to this appointment",
      });
    }

    // Check if appointment is in a valid state to be marked as no-show
    if (appointment.status !== "confirmed") {
      return res.status(400).json({
        message: `Appointment cannot be marked as no-show because it is ${appointment.status} (must be confirmed)`,
      });
    }

    // Create status history entry
    const statusHistoryEntry = {
      status: "no-show",
      changedBy: req.user._id,
      userType: req.user.userType === "doctor" ? "Doctor" : "Admin",
      timestamp: new Date(),
      notes: req.body.notes || "Patient did not show up for appointment",
    };

    // Update appointment
    appointment.status = "no-show";
    appointment.statusHistory.push(statusHistoryEntry);

    // Add notes if provided
    if (req.body.notes) {
      appointment.notes = req.body.notes;
    }

    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(appointment._id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("No-show appointment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Admin, Doctor, Patient)
export const getAppointments = async (req, res) => {
  try {
    console.log("Appointments query:", req.query);

    let appointments = [];
    let query = {};
    let brokenReferenceCount = 0;

    // Handle query parameters for filtering
    const { patient, doctor, startDate, endDate } = req.query;

    if (patient) {
      query.patient = patient;
    }

    if (doctor) {
      query.doctor = doctor;
    }

    // Handle date range filtering
    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate) {
        query.appointmentDate.$gte = new Date(startDate);
      }
      if (endDate) {
        query.appointmentDate.$lte = new Date(endDate);
      }
    }

    // Handle status filtering - supporting multiple formats:
    // 1. Express query parser may convert status[] to an array automatically
    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        query.status = { $in: req.query.status };
      } else {
        query.status = req.query.status;
      }
    }

    // 2. Express may not parse status[] as array, so check for status[] format explicitly
    else if (req.query["status[]"]) {
      if (Array.isArray(req.query["status[]"])) {
        query.status = { $in: req.query["status[]"] };
      } else {
        // If it's a single value with square brackets notation, still treat as array
        query.status = { $in: [req.query["status[]"]] };
      }
    }

    // 3. Check for indexed array notation (status[0], status[1], etc.)
    const statusFromIndexedParams = [];
    Object.keys(req.query).forEach((key) => {
      const match = key.match(/^status\[(\d+)\]$/);
      if (match) {
        statusFromIndexedParams.push(req.query[key]);
      }
    });

    if (statusFromIndexedParams.length > 0) {
      query.status = { $in: statusFromIndexedParams };
    }

    console.log("MongoDB query:", JSON.stringify(query));

    // First, get all appointments without population to check for existence
    let rawAppointments;

    try {
      if (req.user.userType === "admin") {
        // Admin can see all appointments
        rawAppointments = await Appointment.find(query).sort({
          appointmentDate: -1,
          startTime: 1,
        });
      } else if (req.user.userType === "doctor") {
        // Doctor can see their appointments only
        query.doctor = req.user._id;
        rawAppointments = await Appointment.find(query).sort({
          appointmentDate: -1,
          startTime: 1,
        });
      } else if (req.user.userType === "patient") {
        // Patient can see their appointments only
        query.patient = req.user._id;
        rawAppointments = await Appointment.find(query).sort({
          appointmentDate: -1,
          startTime: 1,
        });
      } else {
        return res.status(403).json({ message: "Not authorized" });
      }

      console.log(
        `Found ${rawAppointments.length} appointments matching query`
      );

      // Check for broken references if debug parameter is provided
      if (req.query.debug === "true" && req.user.userType === "admin") {
        console.log("Running reference validation check for appointments...");
        for (const appointment of rawAppointments) {
          const referenceCheck = await checkBrokenReferences(appointment);
          if (referenceCheck.hasBrokenReferences) {
            brokenReferenceCount++;
            console.warn(
              `Appointment ${appointment._id} has broken references:`,
              {
                appointmentDate: appointment.appointmentDate,
                status: appointment.status,
                issues: referenceCheck.issues,
              }
            );
          }
        }
        console.log(
          `Found ${brokenReferenceCount} appointments with broken references out of ${rawAppointments.length} total`
        );
      }
    } catch (error) {
      console.error("Error fetching raw appointments:", error);
      return res.status(500).json({
        message: "Error fetching appointments",
        error: error.message,
      });
    }

    // Process each appointment individually to handle reference errors
    for (const appointment of rawAppointments) {
      try {
        const populatedAppointment = await getPopulatedAppointment(appointment);
        if (populatedAppointment) {
          appointments.push(populatedAppointment);
        }
      } catch (error) {
        console.error(
          `Error processing appointment ${appointment._id}:`,
          error
        );
        // Still include the appointment with placeholders to avoid missing data
        try {
          const basicAppointment = appointment.toObject();

          // Add placeholder for doctor if needed
          if (basicAppointment.doctor) {
            basicAppointment.doctor = {
              _id:
                typeof basicAppointment.doctor === "object"
                  ? basicAppointment.doctor._id
                  : basicAppointment.doctor,
              name: "Unknown Doctor",
              specialty: "General",
            };
          }

          // Add placeholder for patient if needed
          if (basicAppointment.patient) {
            basicAppointment.patient = {
              _id:
                typeof basicAppointment.patient === "object"
                  ? basicAppointment.patient._id
                  : basicAppointment.patient,
              name: "Unknown Patient",
            };
          }

          appointments.push(basicAppointment);
        } catch (err) {
          console.error(`Failed to process appointment as fallback:`, err);
        }
      }
    }

    // Return empty array if no appointments found
    if (appointments.length === 0) {
      return res.json([]);
    }

    // Return the appointments directly as an array, not wrapped in an object
    return res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private (Admin, Doctor who owns the appointment, Patient who owns the appointment)
export const getAppointmentById = async (req, res) => {
  try {
    // Validate ID format before attempting to fetch
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid appointment ID format" });
    }

    // First find the appointment without population
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Convert to plain object for manipulation
    const appointmentObj = appointment.toObject();

    // Check if user is authorized to view this appointment
    let isAuthorized = false;

    // Admin can access any appointment
    if (req.user.userType === "admin") {
      isAuthorized = true;
    }
    // Doctor can access their own appointments
    else if (
      req.user.userType === "doctor" &&
      appointmentObj.doctor &&
      appointmentObj.doctor.toString() === req.user._id.toString()
    ) {
      isAuthorized = true;
    }
    // Patient can access their own appointments
    else if (
      req.user.userType === "patient" &&
      appointmentObj.patient &&
      appointmentObj.patient.toString() === req.user._id.toString()
    ) {
      isAuthorized = true;
    }

    if (!isAuthorized) {
      return res.status(403).json({
        message: "Not authorized to view this appointment",
      });
    }

    // Check for broken references if requested
    if (req.query.debug === "true" && req.user.userType === "admin") {
      const referenceCheck = await checkBrokenReferences(appointment);
      if (referenceCheck.hasBrokenReferences) {
        console.warn(`Appointment ${appointment._id} has broken references:`, {
          issues: referenceCheck.issues,
        });
      }
    }

    // Use the helper function to get populated data
    // If populate=true in query params, we'll do a more comprehensive population
    const populationOptions =
      req.query.populate === "true"
        ? {
            forceFull: true,
            includeAll: true,
          }
        : {};

    const updatedAppointment = await getPopulatedAppointment(
      appointment,
      populationOptions
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Get appointment error:", error);
    if (error.kind === "ObjectId") {
      return res
        .status(404)
        .json({ message: "Appointment not found - invalid ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private (Admin only, with full fields. Doctors and patients with limited fields)
export const updateAppointment = async (req, res) => {
  const DEBUG = true; // Enable verbose debugging
  const debugLog = (...args) =>
    DEBUG && console.log("[DEBUG updateAppointment]", ...args);

  debugLog(`Starting update for appointment ${req.params.id}`);
  debugLog(`Request body:`, JSON.stringify(req.body, null, 2));
  debugLog(`User role: ${req.user.userType}, User ID: ${req.user._id}`);

  try {
    const {
      status,
      notes,
      patient,
      doctor,
      appointmentDate,
      startTime,
      endTime,
      reason,
    } = req.body;

    // Find the appointment
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      debugLog(`Appointment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Appointment not found" });
    }

    debugLog(`Found appointment: ${appointment._id}`);
    debugLog(`Current appointment data:`, {
      status: appointment.status,
      doctor: appointment.doctor,
      patient: appointment.patient,
      appointmentDate: appointment.appointmentDate,
      _oldStatus: appointment._oldStatus,
    });

    // Store the current status to check for changes
    const currentStatus = appointment.status;

    // Log status update attempt
    if (status) {
      debugLog(
        `Status in request: ${status}, Current status: ${currentStatus}`
      );

      if (status !== currentStatus) {
        debugLog(`Status change requested: ${currentStatus} -> ${status}`);

        // Define valid transitions
        const validTransitions = {
          pending: ["confirmed", "rejected", "cancelled"],
          confirmed: ["completed", "cancelled", "no-show"],
          rejected: [],
          cancelled: [],
          completed: [],
          "no-show": [],
        };

        debugLog(
          `Valid transitions for '${currentStatus}': ${JSON.stringify(
            validTransitions[currentStatus]
          )}`
        );

        // Check if this is a valid transition
        if (!validTransitions[currentStatus].includes(status)) {
          debugLog(`INVALID TRANSITION: ${currentStatus} -> ${status}`);
          return res.status(400).json({
            message: `Invalid status transition from '${currentStatus}' to '${status}'`,
            validTransitions: validTransitions[currentStatus],
            code: "INVALID_STATUS_TRANSITION",
          });
        }

        debugLog(`Status transition validation passed`);
      } else {
        debugLog(`Status unchanged (${status}), will skip status update`);
      }
    }

    // Check permissions based on role
    const isAdmin = req.user.userType === "admin";
    const isDoctor =
      req.user.userType === "doctor" &&
      appointment.doctor &&
      appointment.doctor.toString() === req.user._id.toString();
    const isPatient =
      req.user.userType === "patient" &&
      appointment.patient &&
      appointment.patient.toString() === req.user._id.toString();

    debugLog(
      `Permission check: isAdmin=${isAdmin}, isDoctor=${isDoctor}, isPatient=${isPatient}`
    );

    // If not admin, doctor of this appointment, or the patient, deny access
    if (!isAdmin && !isDoctor && !isPatient) {
      debugLog(
        `Permission denied for user ${req.user._id} (${req.user.userType})`
      );
      return res
        .status(403)
        .json({ message: "Not authorized to update this appointment" });
    }

    // Track what we're updating
    const updates = {};

    // Update fields based on user role
    if (isAdmin) {
      debugLog(`Admin user, checking admin-only field updates`);
      // Admins can update all fields
      if (patient) {
        debugLog(`Checking patient update: ${patient}`);
        const patientExists = await Patient.findById(patient);
        if (!patientExists) {
          debugLog(`Patient not found: ${patient}`);
          return res.status(400).json({ message: "Patient not found" });
        }
        appointment.patient = patient;
        updates.patient = patient;
      }

      if (doctor) {
        debugLog(`Checking doctor update: ${doctor}`);
        const doctorExists = await Doctor.findById(doctor);
        if (!doctorExists) {
          debugLog(`Doctor not found: ${doctor}`);
          return res.status(400).json({ message: "Doctor not found" });
        }
        appointment.doctor = doctor;
        updates.doctor = doctor;
      }

      if (appointmentDate) {
        appointment.appointmentDate = appointmentDate;
        updates.appointmentDate = appointmentDate;
      }
      if (startTime) {
        appointment.startTime = startTime;
        updates.startTime = startTime;
      }
      if (endTime) {
        appointment.endTime = endTime;
        updates.endTime = endTime;
      }
      if (reason) {
        appointment.reason = reason;
        updates.reason = reason;
      }
    }

    // Doctors and patients can update limited fields
    if (isDoctor || isPatient || isAdmin) {
      debugLog(`User can update notes field`);
      if (notes) {
        appointment.notes = notes;
        updates.notes = "updated";
      }
    }

    // Status changes should be tracked in history
    if (status && appointment.status !== status) {
      debugLog(`Processing status change: ${appointment.status} -> ${status}`);
      const validStatuses = [
        "pending",
        "confirmed",
        "rejected",
        "cancelled",
        "completed",
        "no-show",
      ];

      if (!validStatuses.includes(status)) {
        debugLog(`Invalid status value: ${status}`);
        return res.status(400).json({
          message: `Invalid status. Must be one of: ${validStatuses.join(
            ", "
          )}`,
        });
      }

      // Create status history entry
      const statusHistoryEntry = {
        status: status,
        changedBy: req.user._id,
        userType: isAdmin ? "Admin" : isDoctor ? "Doctor" : "Patient",
        timestamp: new Date(),
        notes: notes || `Status updated to ${status}`,
      };

      debugLog(`Creating status history entry:`, statusHistoryEntry);

      // Force set the _oldStatus to ensure transition is valid
      debugLog(
        `Setting _oldStatus to ${currentStatus} (was ${appointment._oldStatus})`
      );
      appointment._oldStatus = currentStatus;

      // Update appointment status
      appointment.status = status;
      appointment.statusHistory.push(statusHistoryEntry);
      updates.status = status;
    } else if (status) {
      debugLog(`Status unchanged, not updating status history`);
    }

    // If no updates were made, return early
    if (Object.keys(updates).length === 0) {
      debugLog(`No updates to apply, returning current appointment`);
      const populatedAppointment = await getPopulatedAppointment(appointment);
      return res.json(populatedAppointment);
    }

    debugLog(`Applying updates:`, updates);
    debugLog(`Appointment before save:`, {
      status: appointment.status,
      _oldStatus: appointment._oldStatus,
      statusHistory: appointment.statusHistory.length,
    });

    // Save the updated appointment with better error handling
    try {
      await appointment.save();
      debugLog(`Appointment saved successfully`);
    } catch (saveError) {
      debugLog(`Error saving appointment:`, saveError);

      // Enhanced error handling for Mongoose validation errors
      if (saveError.name === "ValidationError") {
        const validationErrors = {};

        // Extract all validation errors
        for (const field in saveError.errors) {
          validationErrors[field] = saveError.errors[field].message;
        }

        debugLog(`Validation errors:`, validationErrors);

        return res.status(400).json({
          message: "Validation error",
          errors: validationErrors,
          code: "VALIDATION_ERROR",
        });
      }

      // Check for specific error messages related to status transitions
      if (
        saveError.message &&
        saveError.message.includes("Invalid status transition")
      ) {
        debugLog(`Status transition error:`, saveError.message);
        return res.status(400).json({
          message: saveError.message,
          code: "INVALID_STATUS_TRANSITION",
        });
      }

      // Re-throw the error to be caught by the outer try-catch
      throw saveError;
    }

    // Return updated appointment with populated fields using our helper function
    debugLog(`Fetching populated appointment data to return`);
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(req.params.id)
    );

    debugLog(`Returning updated appointment`);
    res.json(updatedAppointment);
  } catch (error) {
    console.error("Update appointment error:", error);
    debugLog(`Unhandled error:`, error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: DEBUG ? error.stack : undefined,
    });
  }
};

// @desc    Add note to appointment
// @route   PUT /api/appointments/:id/notes
// @access  Private (Admin, Doctor who owns the appointment)
export const addAppointmentNote = async (req, res) => {
  try {
    const { notes } = req.body;

    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check if user is authorized to add notes to this appointment
    if (req.user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });
      if (!doctor || appointment.doctor.toString() !== doctor._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }
    } else if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    appointment.notes = notes;
    await appointment.save();

    // Return updated appointment with populated fields using our helper function
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(req.params.id)
    );

    res.json(updatedAppointment);
  } catch (error) {
    console.error("Add appointment note error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update appointment status (legacy function)
// @route   PUT /api/appointments/:id/status
// @access  Private (Admin, Doctor)
export const updateAppointmentStatus = async (req, res) => {
  const DEBUG = true; // Enable verbose debugging
  const debugLog = (...args) =>
    DEBUG && console.log("[DEBUG updateAppointmentStatus]", ...args);

  debugLog(`Starting status update for appointment ${req.params.id}`);
  debugLog(`Request body:`, JSON.stringify(req.body, null, 2));
  debugLog(`User: ${req.user.userType} (${req.user._id})`);

  try {
    const { status } = req.body;

    if (!status) {
      debugLog(`Status is missing in request body`);
      return res.status(400).json({ message: "Status is required" });
    }

    // Validate status
    const validStatuses = [
      "pending",
      "confirmed",
      "rejected",
      "cancelled",
      "completed",
      "no-show",
    ];

    if (!validStatuses.includes(status)) {
      debugLog(`Invalid status value: ${status}`);
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    debugLog(`Looking up appointment with ID: ${req.params.id}`);
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      debugLog(`Appointment not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Appointment not found" });
    }

    debugLog(`Found appointment:`, {
      id: appointment._id,
      status: appointment.status,
      doctor: appointment.doctor,
      _oldStatus: appointment._oldStatus,
    });

    // Store current status before updating
    const currentStatus = appointment.status;

    // Check if this would be a no-op (same status)
    if (currentStatus === status) {
      debugLog(`Status unchanged (${currentStatus}), skipping update`);
      // Return the current appointment without changes
      const populatedAppointment = await getPopulatedAppointment(appointment);
      return res.json(populatedAppointment);
    }

    // Define valid transitions
    const validTransitions = {
      pending: ["confirmed", "rejected", "cancelled"],
      confirmed: ["completed", "cancelled", "no-show"],
      rejected: [],
      cancelled: [],
      completed: [],
      "no-show": [],
    };

    debugLog(`Validating transition: ${currentStatus} -> ${status}`);
    debugLog(
      `Valid transitions for '${currentStatus}': ${JSON.stringify(
        validTransitions[currentStatus]
      )}`
    );

    // Validate the transition
    if (!validTransitions[currentStatus].includes(status)) {
      debugLog(`INVALID TRANSITION ATTEMPT: ${currentStatus} -> ${status}`);
      return res.status(400).json({
        message: `Invalid status transition from '${currentStatus}' to '${status}'`,
        validTransitions: validTransitions[currentStatus],
        code: "INVALID_STATUS_TRANSITION",
      });
    }

    debugLog(`Creating status history entry for: ${status}`);
    // Create status history entry
    const statusHistoryEntry = {
      status: status,
      changedBy: req.user._id,
      userType: req.user.userType === "doctor" ? "Doctor" : "Admin",
      timestamp: new Date(),
      notes: req.body.notes || `Status updated to ${status} via legacy API`,
    };

    // Ensure we set the _oldStatus property to help with Mongoose validation
    debugLog(
      `Setting _oldStatus to ${currentStatus} (was ${appointment._oldStatus})`
    );
    appointment._oldStatus = currentStatus;

    // Update appointment
    appointment.status = status;
    appointment.statusHistory.push(statusHistoryEntry);

    debugLog(`Saving appointment with new status: ${status}`);
    debugLog(`Appointment before save:`, {
      status: appointment.status,
      _oldStatus: appointment._oldStatus,
      statusHistory: appointment.statusHistory.length,
    });

    try {
      await appointment.save();
      debugLog(`Appointment saved successfully`);
    } catch (saveError) {
      debugLog(`Error saving appointment:`, saveError);

      // Enhanced error handling for Mongoose validation errors
      if (saveError.name === "ValidationError") {
        const validationErrors = {};

        // Extract all validation errors
        for (const field in saveError.errors) {
          validationErrors[field] = saveError.errors[field].message;
        }

        debugLog(`Validation errors:`, validationErrors);

        return res.status(400).json({
          message: "Validation error",
          errors: validationErrors,
          code: "VALIDATION_ERROR",
        });
      }

      // Check for specific error messages related to status transitions
      if (
        saveError.message &&
        saveError.message.includes("Invalid status transition")
      ) {
        debugLog(`Status transition error:`, saveError.message);
        return res.status(400).json({
          message: saveError.message,
          code: "INVALID_STATUS_TRANSITION",
        });
      }

      // Re-throw the error to be caught by the outer try-catch
      throw saveError;
    }

    // Return updated appointment with populated fields using our helper function
    debugLog(`Fetching populated appointment data to return`);
    const updatedAppointment = await getPopulatedAppointment(
      await Appointment.findById(req.params.id)
    );

    debugLog(
      `Returning updated appointment with new status: ${updatedAppointment.status}`
    );
    res.json(updatedAppointment);
  } catch (error) {
    console.error("Update appointment status error:", error);
    debugLog(`Unhandled error:`, error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: DEBUG ? error.stack : undefined,
    });
  }
};

// @desc    Diagnose appointment issues
// @route   GET /api/appointments/:id/diagnose
// @access  Private (Admin only)
export const diagnoseAppointment = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.userType !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    // Find the appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check broken references
    const refCheck = await checkBrokenReferences(appointment);

    // Summarize status transitions
    const validTransitions = {
      pending: ["confirmed", "rejected", "cancelled"],
      confirmed: ["completed", "cancelled", "no-show"],
      rejected: [],
      cancelled: [],
      completed: [],
      "no-show": [],
    };

    // Check status history transitions for validity
    const statusHistory = appointment.statusHistory || [];
    const statusTransitions = [];

    for (let i = 1; i < statusHistory.length; i++) {
      const prevStatus = statusHistory[i - 1].status;
      const currStatus = statusHistory[i].status;
      const isValid = validTransitions[prevStatus]?.includes(currStatus);

      statusTransitions.push({
        from: prevStatus,
        to: currStatus,
        isValid,
        timestamp: statusHistory[i].timestamp,
        userType: statusHistory[i].userType,
      });
    }

    // Prepare a diagnostic report
    const diagnosticData = {
      appointmentId: appointment._id,
      currentStatus: appointment.status,
      storedOldStatus: appointment._oldStatus,
      references: refCheck,
      validTransitionsForCurrentStatus: validTransitions[appointment.status],
      statusHistory: appointment.statusHistory,
      statusTransitions,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
      metaData: {
        modifiedPaths: appointment.modifiedPaths
          ? appointment.modifiedPaths()
          : "unknown",
        isNew: appointment.isNew,
        isModified: appointment.isModified
          ? appointment.isModified("status")
          : "unknown",
      },
    };

    // Return the diagnostic data
    res.json({
      message: "Appointment diagnostic information",
      diagnostic: diagnosticData,
    });
  } catch (error) {
    console.error("Appointment diagnostic error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
