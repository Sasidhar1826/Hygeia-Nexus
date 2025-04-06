import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    dosageForm: {
      type: String,
      required: true,
      enum: [
        "tablet",
        "capsule",
        "liquid",
        "injection",
        "cream",
        "ointment",
        "patch",
        "inhaler",
        "other",
      ],
    },
    strength: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "analgesic",
        "antibiotic",
        "antihistamine",
        "antihypertensive",
        "antidepressant",
        "antidiabetic",
        "antiinflammatory",
        "antiviral",
        "cardiovascular",
        "dermatological",
        "gastrointestinal",
        "hormone",
        "respiratory",
        "vitamin",
        "other",
      ],
    },
    requiresPrescription: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for faster searching
medicationSchema.index({ name: "text", category: 1 });

const Medication = mongoose.model("Medication", medicationSchema);

export default Medication;
