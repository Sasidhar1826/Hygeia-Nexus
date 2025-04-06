import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const patientSchema = new mongoose.Schema(
  {
    // Basic information
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    contactNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dateOfBirth: {
      type: Date,
    },
    profileImage: {
      type: String,
      default: "",
    },

    // Contact and identification
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    aadhaarNumber: {
      type: String,
      trim: true,
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },

    // Medical information
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    allergies: [String],
    existingConditions: [String],
    chronicDiseases: [String],

    // Insurance
    insurance: {
      provider: String,
      policyNumber: String,
      expiryDate: Date,
    },

    // Medical relationships
    primaryDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },

    // Medical history
    medicalHistory: [
      {
        condition: String,
        diagnosedDate: Date,
        treatment: String,
        notes: String,
      },
    ],
    currentMedications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        startDate: Date,
        endDate: Date,
      },
    ],

    // Status and system fields
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match patient entered password to hashed password in database
patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
