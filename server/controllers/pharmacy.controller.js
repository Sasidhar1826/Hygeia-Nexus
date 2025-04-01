const Medication = require("../models/medication.model");

// @desc    Get all medications
// @route   GET /api/pharmacy/medications
// @access  Private
const getMedications = async (req, res) => {
  try {
    const { search, category, stockStatus } = req.query;

    // Build query
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (stockStatus) {
      if (stockStatus === "out-of-stock") {
        query.stock = 0;
      } else if (stockStatus === "low") {
        query.stock = { $gt: 0, $lte: "$reorderLevel" };
      } else if (stockStatus === "normal") {
        query.stock = { $gt: "$reorderLevel" };
      }
    }

    const medications = await Medication.find(query).sort({ name: 1 });

    res.json(medications);
  } catch (error) {
    console.error("Get medications error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get medication by ID
// @route   GET /api/pharmacy/medications/:id
// @access  Private
const getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      res.json(medication);
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    console.error("Get medication error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new medication
// @route   POST /api/pharmacy/medications
// @access  Private
const createMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    const createdMedication = await medication.save();

    res.status(201).json(createdMedication);
  } catch (error) {
    console.error("Create medication error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a medication
// @route   PUT /api/pharmacy/medications/:id
// @access  Private
const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      Object.assign(medication, req.body);
      const updatedMedication = await medication.save();
      res.json(updatedMedication);
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    console.error("Update medication error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a medication
// @route   DELETE /api/pharmacy/medications/:id
// @access  Private
const deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication) {
      // Instead of deleting, mark as inactive
      medication.isActive = false;
      await medication.save();
      res.json({ message: "Medication deactivated" });
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    console.error("Delete medication error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get low stock medications
// @route   GET /api/pharmacy/low-stock
// @access  Private
const getLowStockMedications = async (req, res) => {
  try {
    const medications = await Medication.find({
      isActive: true,
      $expr: { $lte: ["$stock", "$reorderLevel"] },
    }).sort({ stock: 1 });

    res.json(medications);
  } catch (error) {
    console.error("Get low stock medications error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update medication stock
// @route   PUT /api/pharmacy/medications/:id/stock
// @access  Private
const updateMedicationStock = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({ message: "Quantity is required" });
    }

    const medication = await Medication.findById(req.params.id);

    if (medication) {
      medication.stock += parseInt(quantity);

      // Ensure stock doesn't go below 0
      if (medication.stock < 0) {
        medication.stock = 0;
      }

      const updatedMedication = await medication.save();
      res.json(updatedMedication);
    } else {
      res.status(404).json({ message: "Medication not found" });
    }
  } catch (error) {
    console.error("Update medication stock error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  getLowStockMedications,
  updateMedicationStock,
};
