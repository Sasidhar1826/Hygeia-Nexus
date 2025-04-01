const express = require("express");
const router = express.Router();
const Department = require("../models/department.model");
const {
  verifyToken,
  adminMiddleware,
} = require("../middleware/auth.middleware");

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true });
    res.json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get department by ID
router.get("/:id", async (req, res) => {
  try {
    // Special case for "all" to return all departments
    if (req.params.id === "all") {
      const departments = await Department.find({ isActive: true });
      return res.json(departments);
    }

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create department (admin only)
router.post("/", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const { name, description, image } = req.body;

    // Check if department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department already exists" });
    }

    const department = new Department({
      name,
      description,
      image,
    });

    await department.save();
    res.status(201).json(department);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update department (admin only)
router.put("/:id", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;

    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (name) department.name = name;
    if (description) department.description = description;
    if (image) department.image = image;
    if (isActive !== undefined) department.isActive = isActive;

    await department.save();
    res.json(department);
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete department (admin only)
router.delete("/:id", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Soft delete by setting isActive to false
    department.isActive = false;
    await department.save();

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
