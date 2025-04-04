const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const {
  verifyToken,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const { department, specialization } = req.query;

    const query = { role: "doctor", isActive: true };

    if (department) {
      query.department = department;
    }

    if (specialization) {
      query.specialization = specialization;
    }

    const doctors = await User.find(query)
      .select("-password")
      .populate("department", "name");

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get doctor by ID
router.get("/:id", async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
      isActive: true,
    })
      .select("-password")
      .populate("department", "name description");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get doctor's available slots
router.get("/:id/slots", async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: "doctor",
      isActive: true,
    }).select("availableSlots");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor.availableSlots);
  } catch (error) {
    console.error("Error fetching doctor slots:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update doctor profile (admin or the doctor themselves)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Only allow updates if user is admin or the doctor themselves
    if (req.user.role !== "admin" && req.user.id !== doctor._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      name,
      specialization,
      contactNumber,
      profileImage,
      bio,
      education,
      experience,
      consultationFee,
      availableSlots,
      department,
    } = req.body;

    if (name) doctor.name = name;
    if (specialization) doctor.specialization = specialization;
    if (contactNumber) doctor.contactNumber = contactNumber;
    if (profileImage) doctor.profileImage = profileImage;
    if (bio) doctor.bio = bio;
    if (education) doctor.education = education;
    if (experience) doctor.experience = experience;
    if (consultationFee) doctor.consultationFee = consultationFee;
    if (availableSlots) doctor.availableSlots = availableSlots;
    if (department) doctor.department = department;

    await doctor.save();

    // Return updated doctor without password
    const updatedDoctor = await User.findById(doctor._id)
      .select("-password")
      .populate("department", "name");

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
