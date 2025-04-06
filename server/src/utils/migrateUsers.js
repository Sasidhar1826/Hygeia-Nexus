import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import bcrypt from "bcryptjs";

// Import models
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Admin from "../models/Admin.js";
import LabTechnician from "../models/LabTechnician.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(colors.cyan.underline("\nMongoDB Connected"));
    console.log(
      colors.yellow(
        "\nNOTE: This script has been updated to work with the new model structure."
      )
    );
    console.log(
      colors.yellow(
        "The User model has been removed. Each user type now has its own collection.\n"
      )
    );
    console.log(
      colors.yellow(
        "You can safely ignore this file or modify it for other migration needs.\n"
      )
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error(colors.red(`Error connecting to MongoDB: ${err.message}`));
    process.exit(1);
  });

// This function is for reference only and will not be executed
// since we have migrated to a structure without the User model
async function legacyMigrateUsers() {
  try {
    console.log(
      colors.yellow(
        "\nThis function is for reference only. User model has been removed.\n"
      )
    );
    console.log(
      colors.yellow(
        "Each user type (Doctor, Patient, Admin, LabTechnician) now has its own collection.\n"
      )
    );

    // Migration logic removed since we no longer need to migrate from the User model
    // The migration has already been completed with the restructuring of the models

    console.log(
      colors.cyan.underline("User model has been removed from the application.")
    );
    process.exit(0);
  } catch (error) {
    console.error(colors.red(`Operation failed: ${error.message}`));
    process.exit(1);
  }
}
