import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const labTechnicianSchema = new mongoose.Schema(
  {
    // Base user information
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
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profileImage: {
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

    // Lab Technician specific information
    licenseNumber: {
      type: String,
      required: [true, "Please add a license number"],
      unique: true,
    },
    specialization: {
      type: String,
      required: [true, "Please add a specialization"],
    },
    qualification: {
      type: String,
      required: [true, "Please add qualification"],
    },
    experience: {
      type: Number,
      default: 0,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    certifications: [String],
    workingHours: {
      startTime: String,
      endTime: String,
      workingDays: [String],
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

// Encrypt password using bcrypt
labTechnicianSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match technician entered password to hashed password in database
labTechnicianSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const LabTechnician = mongoose.model("LabTechnician", labTechnicianSchema);

export default LabTechnician;
