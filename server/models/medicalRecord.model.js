const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recordType: {
      type: String,
      enum: ["diagnosis", "lab report", "imaging", "prescription", "note"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    attachments: [
      {
        name: String,
        fileType: String,
        url: String,
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    details: {
      type: Map,
      of: String,
    },
    relatedAppointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    isConfidential: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying of records by patient
medicalRecordSchema.index({ patient: 1, date: -1 });

// Index for efficient querying of records by doctor
medicalRecordSchema.index({ doctor: 1, date: -1 });

// Index for efficient querying of records by type
medicalRecordSchema.index({ recordType: 1, date: -1 });

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

module.exports = MedicalRecord;
