import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
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
    appointmentDate: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "rejected",
        "cancelled",
        "completed",
        "no-show",
      ],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["in-person", "telemedicine"],
      default: "in-person",
    },
    reason: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    symptoms: [String],
    attachments: [
      {
        name: String,
        url: String,
        type: String,
      },
    ],
    followUp: {
      required: Boolean,
      date: Date,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
    meetingLink: {
      type: String,
    },
    statusHistory: [
      {
        status: String,
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "statusHistory.userType",
        },
        userType: {
          type: String,
          enum: ["Doctor", "Patient", "Admin"],
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        notes: String,
      },
    ],
    rejectionReason: {
      type: String,
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

appointmentSchema.pre("save", function (next) {
  if (this.isNew) {
    return next();
  }

  const validTransitions = {
    pending: ["confirmed", "rejected", "cancelled"],
    confirmed: ["completed", "cancelled", "no-show"],
    rejected: [],
    cancelled: [],
    completed: [],
    "no-show": [],
  };

  if (this.isModified("status")) {
    const oldStatus = this._oldStatus || "pending";
    const newStatus = this.status;

    console.log(
      `Appointment status transition: from '${oldStatus}' to '${newStatus}'`
    );
    console.log(
      `Valid transitions for '${oldStatus}' are: ${JSON.stringify(
        validTransitions[oldStatus]
      )}`
    );

    if (oldStatus === newStatus) {
      console.log(`Status unchanged, skipping transition validation`);
      return next();
    }

    if (!validTransitions[oldStatus].includes(newStatus)) {
      console.error(
        `Invalid status transition from '${oldStatus}' to '${newStatus}'`
      );
      return next(
        new Error(
          `Invalid status transition from '${oldStatus}' to '${newStatus}'`
        )
      );
    }
  }

  next();
});

appointmentSchema.pre("init", function (doc) {
  doc._oldStatus = doc.status;
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
