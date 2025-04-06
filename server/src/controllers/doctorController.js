import Doctor from "../models/Doctor.js";
import mongoose from "mongoose";

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("department");

    // Check if any doctors exist
    if (!doctors || doctors.length === 0) {
      return res.status(200).json({
        message: "No doctors found",
        data: [],
      });
    }

    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create new doctor
// @route   POST /api/doctors
// @access  Private/Admin
export const createDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      gender,
      profileImage,
      specialty,
      department,
      consultationFee,
      bio,
      education,
      experience,
      licenseNumber,
      isActive,
      // Additional fields
      address,
      dateOfBirth,
      qualifications,
      languages,
    } = req.body;

    // Check if doctor with this email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor with this email already exists",
      });
    }

    // Validate department ID format if provided
    if (department) {
      // Check if department is a valid ObjectId string
      if (
        typeof department === "string" &&
        !mongoose.Types.ObjectId.isValid(department)
      ) {
        return res.status(400).json({
          message: "Invalid department ID format. Must be a valid ObjectId.",
          error: "Invalid department ID format",
        });
      }
    }

    // Create new doctor
    const doctor = await Doctor.create({
      name,
      email,
      password,
      phone: phone || "",
      gender: gender || undefined,
      profileImage: profileImage || "",
      specialty,
      department,
      consultationFee: consultationFee || 0,
      bio: bio || "",
      education: education || "",
      experience: experience || 0,
      licenseNumber,
      isActive: isActive !== undefined ? isActive : true,
      address: address || {},
      dateOfBirth: dateOfBirth || undefined,
      qualifications: qualifications || [],
      languages: languages || [],
    });

    // Return the created doctor with populated fields
    const createdDoctor = await Doctor.findById(doctor._id).populate(
      "department"
    );

    res.status(201).json(createdDoctor);
  } catch (error) {
    console.error("Create doctor error:", error);
    // Check for Mongoose validation errors and provide more specific messages
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Failed to create doctor",
        error: validationErrors.join(", "),
      });
    }

    // Handle specific MongoDB errors
    if (error.name === "CastError" && error.path === "department") {
      return res.status(400).json({
        message: "Failed to create doctor",
        error: "Invalid department ID format. Must be a valid ObjectId.",
      });
    }

    res.status(500).json({
      message: "Failed to create doctor",
      error: error.message,
    });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
export const getDoctorById = async (req, res) => {
  try {
    // Validate ID format before attempting to fetch
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid doctor ID format" });
    }

    const doctor = await Doctor.findById(req.params.id).populate("department");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json(doctor);
  } catch (error) {
    console.error("Get doctor error:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Doctor not found - invalid ID" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get doctors by department
// @route   GET /api/doctors/department/:departmentId
// @access  Public
export const getDoctorsByDepartment = async (req, res) => {
  try {
    // Validate department ID format
    if (!req.params.departmentId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid department ID format" });
    }

    const doctors = await Doctor.find({
      department: req.params.departmentId,
    }).populate("department");

    // Check if any doctors exist in this department
    if (!doctors || doctors.length === 0) {
      return res.status(200).json({
        message: "No doctors found in this department",
        data: [],
      });
    }

    res.json(doctors);
  } catch (error) {
    console.error("Get doctors by department error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update doctor profile
// @route   PUT /api/doctors/:id
// @access  Private (Admin or the doctor)
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if authorized (admin or the doctor himself)
    // You'll need to adjust this based on your authentication middleware
    if (
      req.user.userType !== "admin" &&
      req.user._id.toString() !== req.params.id
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Don't update password through this endpoint
    if (req.body.password) {
      delete req.body.password;
    }

    // Handle department ID validation
    if (
      req.body.department &&
      !mongoose.Types.ObjectId.isValid(req.body.department)
    ) {
      return res.status(400).json({
        message: "Failed to update doctor",
        error: "Invalid department ID format. Must be a valid ObjectId.",
      });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("department");

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Update doctor error:", error);

    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Failed to update doctor",
        error: validationErrors.join(", "),
      });
    }

    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    await doctor.deleteOne();

    res.json({ message: "Doctor removed" });
  } catch (error) {
    console.error("Delete doctor error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Create a review for a doctor
// @route   POST /api/doctors/:id/reviews
// @access  Private (Patients only)
export const createDoctorReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if patient has already reviewed this doctor
    const alreadyReviewed = doctor.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this doctor" });
    }

    const review = {
      user: req.user._id,
      rating: Number(rating),
      comment,
    };

    doctor.reviews.push(review);

    // Update doctor ratings
    doctor.ratings =
      doctor.reviews.reduce((acc, item) => item.rating + acc, 0) /
      doctor.reviews.length;

    await doctor.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("Create doctor review error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get doctor available slots
// @route   GET /api/doctors/:id/slots
// @access  Public
export const getDoctorSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Get day of the week from date
    const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Get available hours for that day
    const availableHoursForDay = doctor.availableHours.find(
      (day) => day.day === dayOfWeek
    );

    if (!availableHoursForDay) {
      return res
        .status(404)
        .json({ message: "No available slots for this day" });
    }

    // In a real app, you would check appointments to exclude booked slots
    // Here is a basic implementation that returns all available hours
    const startTime = new Date(`${date}T${availableHoursForDay.startTime}`);
    const endTime = new Date(`${date}T${availableHoursForDay.endTime}`);

    const slots = [];
    let currentSlot = new Date(startTime);

    // Generate 30-minute slots
    while (currentSlot < endTime) {
      const slotEnd = new Date(currentSlot);
      slotEnd.setMinutes(slotEnd.getMinutes() + 30);

      if (slotEnd <= endTime) {
        slots.push({
          startTime: currentSlot.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          endTime: slotEnd.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        });
      }

      currentSlot = slotEnd;
    }

    res.json(slots);
  } catch (error) {
    console.error("Get doctor slots error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
