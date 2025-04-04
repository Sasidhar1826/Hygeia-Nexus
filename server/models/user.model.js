const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "doctor",
        "nurse",
        "receptionist",
        "pharmacist",
        "admin",
        "patient",
        "labtechnician",
      ],
      default: "patient",
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: function () {
        return this.role === "doctor";
      },
    },
    specialization: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    education: [
      {
        degree: String,
        institution: String,
        year: Number,
      },
    ],
    experience: [
      {
        position: String,
        hospital: String,
        from: Date,
        to: Date,
        current: Boolean,
      },
    ],
    consultationFee: {
      type: Number,
      default: 0,
    },
    availableSlots: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
        startTime: String,
        endTime: String,
        slotDuration: {
          type: Number,
          default: 30, // in minutes
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
    },
    aadhaarNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return v === "" || /^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Aadhaar number!`,
      },
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
    },
    allergies: [String],
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        notes: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
