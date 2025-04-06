import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
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
    },
    profileImage: {
      type: String,
      default: "",
    },

    // Admin specific information
    staffId: {
      type: String,
      required: [true, "Please add a staff ID"],
      unique: true,
    },
    position: {
      type: String,
      default: "System Administrator",
    },
    permissions: {
      manageUsers: {
        type: Boolean,
        default: true,
      },
      manageDoctors: {
        type: Boolean,
        default: true,
      },
      managePatients: {
        type: Boolean,
        default: true,
      },
      manageDepartments: {
        type: Boolean,
        default: true,
      },
      manageAppointments: {
        type: Boolean,
        default: true,
      },
      manageBilling: {
        type: Boolean,
        default: true,
      },
      viewReports: {
        type: Boolean,
        default: true,
      },
      systemSettings: {
        type: Boolean,
        default: true,
      },
    },
    lastLoginIP: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
adminSchema.pre("save", async function (next) {
  // Only hash the password if it's modified (or new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    console.log(`Hashing password for admin: ${this.email}`);
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("Password hashed successfully");
    next();
  } catch (error) {
    console.error("Error hashing password:", error);
    next(error);
  }
});

// Match admin entered password to hashed password in database
adminSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    console.log(`Matching password for admin: ${this.email}`);
    console.log(
      `Password exists: ${!!this.password}, Length: ${this.password?.length}`
    );
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log(`Password match result: ${isMatch}`);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
