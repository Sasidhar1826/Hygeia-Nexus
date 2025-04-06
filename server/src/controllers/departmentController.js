import Department from "../models/Department.js";
import mongoose from "mongoose";

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    // Check if any departments exist
    if (!departments || departments.length === 0) {
      return res.status(200).json({
        message: "No departments found",
        departments: [],
      });
    }

    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Public
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    console.error("Error fetching department:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Private/Admin
export const createDepartment = async (req, res) => {
  try {
    const {
      name,
      description,
      headOfDepartment,
      services,
      location,
      contactInfo,
    } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = await Department.create({
      name,
      description,
      headOfDepartment,
      services,
      location,
      contactInfo,
    });

    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private/Admin
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error("Error updating department:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private/Admin
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);

    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    res.status(500).json({ message: "Server error" });
  }
};
