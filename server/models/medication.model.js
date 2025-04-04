const mongoose = require("mongoose");

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genericName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "antibiotics",
        "analgesics",
        "antidepressants",
        "antidiabetics",
        "antihypertensives",
        "antihistamines",
        "antivirals",
        "cardiovascular",
        "gastrointestinal",
        "hormones",
        "respiratory",
        "vitamins",
        "other",
      ],
      required: true,
    },
    dosageForm: {
      type: String,
      enum: [
        "tablet",
        "capsule",
        "liquid",
        "injection",
        "cream",
        "ointment",
        "gel",
        "patch",
        "inhaler",
        "drops",
        "other",
      ],
      required: true,
    },
    strength: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    reorderLevel: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
    sideEffects: [String],
    contraindications: [String],
    requiresPrescription: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for stock status
medicationSchema.virtual("stockStatus").get(function () {
  if (this.stock === 0) {
    return "out-of-stock";
  } else if (this.stock <= this.reorderLevel) {
    return "low";
  } else {
    return "normal";
  }
});

// Index for efficient querying of medications by name
medicationSchema.index({ name: "text", genericName: "text" });

// Index for efficient querying of medications by category
medicationSchema.index({ category: 1 });

const Medication = mongoose.model("Medication", medicationSchema);

module.exports = Medication;
