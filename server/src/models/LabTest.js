import mongoose from "mongoose";

const labTestSchema = new mongoose.Schema(
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
    assignedTechnician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabTechnician",
    },
    testName: {
      type: String,
      required: true,
    },
    testType: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
    },
    urgency: {
      type: String,
      enum: ["routine", "urgent", "emergency"],
      default: "routine",
    },
    status: {
      type: String,
      enum: ["ordered", "in_progress", "completed", "cancelled"],
      default: "ordered",
    },
    results: {
      type: String,
    },
    notes: {
      type: String,
    },
    orderedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
    },
    statusHistory: [
      {
        status: {
          type: String,
          enum: ["ordered", "in_progress", "completed", "cancelled"],
          required: true,
        },
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "statusHistory.userType",
        },
        userType: {
          type: String,
          enum: ["Doctor", "Admin", "LabTechnician"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        notes: String,
      },
    ],
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
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to add a status history entry when status changes
labTestSchema.pre("save", function (next) {
  // If this is a new document or status hasn't changed, skip
  if (this.isNew || !this.isModified("status")) {
    return next();
  }

  // Check if statusHistory array exists, if not create it
  if (!this.statusHistory) {
    this.statusHistory = [];
  }

  // Create a status history entry (will be completed by the controller)
  const statusEntry = {
    status: this.status,
    timestamp: new Date(),
  };

  // Add to status history
  this.statusHistory.push(statusEntry);

  // If status is completed and completedAt isn't set, set it
  if (this.status === "completed" && !this.completedAt) {
    this.completedAt = new Date();
  }

  next();
});

const LabTest = mongoose.model("LabTest", labTestSchema);

export default LabTest;
