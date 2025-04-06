import express from "express";
import { protect, authorizeRoles } from "../middleware/auth.js";
import LabTest from "../models/LabTest.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import LabTechnician from "../models/LabTechnician.js";

const router = express.Router();

// @route   GET /api/labs/reports
// @desc    Get lab reports for a patient
// @access  Private
router.get("/reports", protect, async (req, res) => {
  try {
    // For admins, allow them to retrieve reports for any patient
    const isAdmin = req.user.userType === "admin";

    // Check if patient ID is provided via query parameter
    if (!req.query.patient && !isAdmin) {
      return res.status(200).json({
        message: "Patient ID is required",
        data: [],
      });
    }

    let patientId = req.query.patient;

    // If user is a patient, verify they're accessing their own data
    if (req.user.userType === "patient") {
      // Override patient ID to ensure patients can only access their own data
      patientId = req.user._id;
    }

    // Query for lab reports
    let query = { status: "completed" }; // Only get completed tests that have results

    // If not admin or specific patient requested, filter by patient
    if (patientId) {
      query.patient = patientId;
    }

    // Find all completed lab tests (these are the reports)
    const reports = await LabTest.find(query)
      .populate("doctor", "name email profileImage specialty")
      .populate("patient", "name email profileImage") // Include patient data for admin view
      .sort({ completedAt: -1 });

    // Return empty array with message if no reports found
    if (!reports || reports.length === 0) {
      return res.status(200).json({
        message: patientId
          ? "No lab reports found for this patient"
          : "No lab reports found",
        data: [],
      });
    }

    res.status(200).json({
      data: reports,
      message: "Lab reports retrieved successfully",
      count: reports.length,
    });
  } catch (error) {
    console.error("Get lab reports error:", error);
    // Return an empty array with error message to prevent client-side errors
    res.status(200).json({
      message: "Error fetching lab reports",
      error: error.message,
      data: [],
    });
  }
});

// @route   GET /api/labs
// @desc    Get lab tests (filtered by role)
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    let tests;
    const query = {};

    // Handle status filtering
    if (req.query.status) {
      if (Array.isArray(req.query.status)) {
        query.status = { $in: req.query.status };
      } else {
        query.status = req.query.status;
      }
    }

    // Handle date range filtering
    if (req.query.startDate || req.query.endDate) {
      query.createdAt = {};

      if (req.query.startDate) {
        query.createdAt.$gte = new Date(req.query.startDate);
      }

      if (req.query.endDate) {
        query.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    // If user is admin, get all lab tests with optional filters
    if (req.user.userType === "admin") {
      // Add specific filters for admin if needed
      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      if (req.query.doctor) {
        query.doctor = req.query.doctor;
      }

      tests = await LabTest.find(query)
        .populate("patient", "name email profileImage")
        .populate("doctor", "name email profileImage specialty")
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is doctor, get tests they ordered
    else if (req.user.userType === "doctor") {
      query.doctor = req.user._id;

      // Add specific patient filter if needed
      if (req.query.patient) {
        query.patient = req.query.patient;
      }

      tests = await LabTest.find(query)
        .populate("patient", "name email profileImage")
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is patient, get their lab tests
    else if (req.user.userType === "patient") {
      query.patient = req.user._id;

      tests = await LabTest.find(query)
        .populate("doctor", "name email profileImage specialty")
        .populate("appointment")
        .sort({ createdAt: -1 });
    }
    // If user is lab technician, get all tests that need processing
    else if (req.user.userType === "labtechnician") {
      // If no specific status is requested, default to unprocessed tests
      if (!query.status) {
        query.status = { $in: ["ordered", "in_progress"] };
      }

      tests = await LabTest.find(query)
        .populate("patient", "name email profileImage")
        .populate("doctor", "name email profileImage specialty")
        .populate("appointment")
        .sort({ createdAt: -1 });
    }

    // If no tests found, return empty array instead of null
    if (!tests) {
      tests = [];
    }

    res.json({
      data: tests,
      count: tests.length,
      message: "Lab tests retrieved successfully",
    });
  } catch (error) {
    console.error("Get lab tests error:", error);
    res.status(500).json({
      message: "Error fetching lab tests",
      error: error.message,
      data: [],
    });
  }
});

// @route   GET /api/labs/:id
// @desc    Get lab test by ID
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id)
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

    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    // Check if user is authorized to view this test
    if (req.user.userType === "patient") {
      const patient = await Patient.findOne({ user: req.user._id });

      if (!patient || test.patient._id.toString() !== patient._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this lab test" });
      }
    } else if (req.user.userType === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });

      if (!doctor || test.doctor._id.toString() !== doctor._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to view this lab test" });
      }
    }

    res.json(test);
  } catch (error) {
    console.error("Get lab test error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Lab test not found" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/labs
// @desc    Create lab test
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
        testName,
        testType,
        instructions,
        urgency,
        notes,
      } = req.body;

      // Check if required fields are provided
      if (!patient || !testName || !testType) {
        return res
          .status(400)
          .json({ message: "Please provide all required fields" });
      }

      // Check if patient exists
      const patientExists = await Patient.findById(patient);
      if (!patientExists) {
        return res.status(400).json({ message: "Patient not found" });
      }

      // Get doctor ID if user is a doctor
      let doctorId;
      if (req.user.userType === "doctor") {
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

      // Create the lab test
      const labTest = await LabTest.create({
        patient,
        doctor: doctorId,
        appointment,
        testName,
        testType,
        instructions,
        urgency: urgency || "routine",
        notes,
        status: "ordered",
        orderedAt: Date.now(),
      });

      res.status(201).json(labTest);
    } catch (error) {
      console.error("Create lab test error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// @route   PUT /api/labs/:id
// @desc    Update lab test
// @access  Private
router.put("/:id", protect, async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    // Different updates are allowed based on role
    if (req.user.userType === "doctor") {
      const doctor = await Doctor.findOne({ user: req.user._id });

      if (!doctor || test.doctor.toString() !== doctor._id.toString()) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this lab test" });
      }

      // Doctors can update instructions, notes, and cancel tests
      if (req.body.instructions) test.instructions = req.body.instructions;
      if (req.body.notes) test.notes = req.body.notes;
      if (req.body.status === "cancelled") test.status = "cancelled";
    } else if (req.user.userType === "labtechnician") {
      // Lab technicians can update results, status, and notes
      if (req.body.results) test.results = req.body.results;
      if (
        req.body.status &&
        ["in_progress", "completed"].includes(req.body.status)
      ) {
        test.status = req.body.status;
      }
      if (req.body.notes) test.notes = req.body.notes;
      if (req.body.completedAt) test.completedAt = req.body.completedAt;
      if (req.body.attachments) test.attachments = req.body.attachments;
    } else if (req.user.userType === "admin") {
      // Admins can update any field
      const updatableFields = [
        "patient",
        "doctor",
        "appointment",
        "testName",
        "testType",
        "instructions",
        "urgency",
        "notes",
        "status",
        "results",
        "orderedAt",
        "completedAt",
        "attachments",
      ];

      updatableFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          test[field] = req.body[field];
        }
      });
    }

    const updatedTest = await test.save();

    res.json(updatedTest);
  } catch (error) {
    console.error("Update lab test error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   DELETE /api/labs/:id
// @desc    Delete lab test
// @access  Private (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Lab test not found" });
    }

    await test.deleteOne();

    res.json({ message: "Lab test removed" });
  } catch (error) {
    console.error("Delete lab test error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   PUT /api/labs/:id/assign
// @desc    Assign a lab test to a lab technician (Admin only)
// @access  Private (Admin only)
router.put(
  "/:id/assign",
  protect,
  authorizeRoles("admin"),
  async (req, res) => {
    try {
      // Validate ID format
      if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid lab test ID format" });
      }

      const { technicianId } = req.body;

      if (!technicianId) {
        return res.status(400).json({
          message: "Lab technician ID is required",
        });
      }

      // Validate technician ID format
      if (!technicianId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
          message: "Invalid lab technician ID format",
        });
      }

      // Find the lab test
      const labTest = await LabTest.findById(req.params.id);

      if (!labTest) {
        return res.status(404).json({ message: "Lab test not found" });
      }

      // Verify the lab technician exists
      const labTechnician = await LabTechnician.findById(technicianId);

      if (!labTechnician) {
        return res.status(404).json({
          message: "Lab technician not found",
        });
      }

      // Update the lab test with the assigned technician
      labTest.assignedTechnician = technicianId;

      // If the test is in 'ordered' status, move it to 'in_progress'
      if (labTest.status === "ordered") {
        labTest.status = "in_progress";
      }

      // Add assignment note to the lab test
      if (!labTest.notes) {
        labTest.notes = `Assigned to lab technician by admin on ${
          new Date().toISOString().split("T")[0]
        }`;
      } else {
        labTest.notes = `${
          labTest.notes
        }\nAssigned to lab technician by admin on ${
          new Date().toISOString().split("T")[0]
        }`;
      }

      // Save the updated lab test
      await labTest.save();

      // Return the updated lab test with populated fields
      const updatedLabTest = await LabTest.findById(req.params.id)
        .populate("patient", "name email profileImage")
        .populate("doctor", "name email profileImage specialty")
        .populate("assignedTechnician", "name email specialization");

      res.status(200).json({
        message: "Lab test assigned successfully",
        data: updatedLabTest,
      });
    } catch (error) {
      console.error("Assign lab test error:", error);
      res.status(500).json({
        message: "Failed to assign lab test",
        error: error.message,
      });
    }
  }
);

export default router;
