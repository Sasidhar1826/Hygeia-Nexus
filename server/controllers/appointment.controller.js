const Appointment = require("../models/appointment.model");
const Patient = require("../models/patient.model");
const User = require("../models/user.model");

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const { startDate, endDate, doctor, patient, status, type } = req.query;

    // Build query
    const query = {};

    if (startDate && endDate) {
      query.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (doctor) {
      query.doctor = doctor;
    }

    if (patient) {
      query.patient = patient;
    }

    if (status) {
      query.status = status;
    }

    if (type) {
      query.type = type;
    }

    const appointments = await Appointment.find(query)
      .populate("patient", "firstName lastName")
      .populate("doctor", "name department")
      .sort({ startTime: 1 });

    res.json(appointments);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate(
        "patient",
        "firstName lastName dateOfBirth gender contactNumber email"
      )
      .populate("doctor", "name department");

    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.error("Get appointment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const {
      patient,
      doctor,
      startTime,
      endTime,
      type,
      reason,
      isTelemedicine,
    } = req.body;

    // Check for conflicts
    const conflictingAppointments = await Appointment.find({
      doctor,
      $or: [
        {
          startTime: { $lt: new Date(endTime) },
          endTime: { $gt: new Date(startTime) },
        },
      ],
      status: { $nin: ["cancelled", "no-show"] },
    });

    if (conflictingAppointments.length > 0) {
      return res.status(400).json({
        message: "The doctor already has an appointment during this time slot",
      });
    }

    const appointment = new Appointment({
      patient,
      doctor,
      startTime,
      endTime,
      type,
      reason,
      isTelemedicine,
      status: "scheduled",
    });

    if (isTelemedicine) {
      appointment.meetingLink = `https://meet.hospital.com/${appointment._id}`;
    }

    const createdAppointment = await appointment.save();

    res.status(201).json(createdAppointment);
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      // If changing time, check for conflicts
      if (req.body.startTime && req.body.endTime) {
        const conflictingAppointments = await Appointment.find({
          doctor: req.body.doctor || appointment.doctor,
          _id: { $ne: appointment._id },
          $or: [
            {
              startTime: { $lt: new Date(req.body.endTime) },
              endTime: { $gt: new Date(req.body.startTime) },
            },
          ],
          status: { $nin: ["cancelled", "no-show"] },
        });

        if (conflictingAppointments.length > 0) {
          return res.status(400).json({
            message:
              "The doctor already has an appointment during this time slot",
          });
        }
      }

      Object.assign(appointment, req.body);

      // Update meeting link if changing to telemedicine
      if (req.body.isTelemedicine === true && !appointment.meetingLink) {
        appointment.meetingLink = `https://meet.hospital.com/${appointment._id}`;
      }

      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.error("Update appointment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
      // Instead of deleting, mark as cancelled
      appointment.status = "cancelled";
      await appointment.save();
      res.json({ message: "Appointment cancelled" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.error("Delete appointment error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
