import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    medications: [
      {
        medication: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medication",
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
        frequency: {
          type: String,
          required: true,
        },
        duration: {
          type: String,
          required: true,
        },
        instructions: {
          type: String,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    notes: {
      type: String,
    },
    pharmacistNotes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "filled", "completed", "cancelled", "expired"],
      default: "active",
    },
    refillCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    filledAt: {
      type: Date,
    },
    expiresAt: {
      type: Date,
      default: function () {
        // Default expiry is 6 months from issuance
        const expiryDate = new Date(this.issuedAt);
        expiryDate.setMonth(expiryDate.getMonth() + 6);
        return expiryDate;
      },
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;
