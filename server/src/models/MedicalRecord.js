import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
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
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    symptoms: {
      type: [String],
      default: [],
    },
    treatment: {
      type: String,
    },
    prescriptions: [
      {
        medication: {
          type: String,
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
        },
        instructions: {
          type: String,
        },
      },
    ],
    labTests: [
      {
        name: {
          type: String,
          required: true,
        },
        result: {
          type: String,
        },
        date: {
          type: Date,
        },
        comments: {
          type: String,
        },
        status: {
          type: String,
          enum: ["ordered", "completed", "cancelled"],
          default: "ordered",
        },
      },
    ],
    vitalSigns: {
      bloodPressure: {
        systolic: {
          type: Number,
        },
        diastolic: {
          type: Number,
        },
      },
      heartRate: {
        type: Number,
      },
      respiratoryRate: {
        type: Number,
      },
      temperature: {
        type: Number,
      },
      oxygenSaturation: {
        type: Number,
      },
      height: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      bmi: {
        type: Number,
      },
    },
    notes: {
      type: String,
    },
    attachments: [
      {
        name: {
          type: String,
          required: true,
        },
        fileUrl: {
          type: String,
          required: true,
        },
        fileType: {
          type: String,
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    followUpRecommended: {
      type: Boolean,
      default: false,
    },
    followUpDate: {
      type: Date,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;
