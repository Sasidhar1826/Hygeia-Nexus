import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a department name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    image: {
      type: String,
      default: "",
    },
    headOfDepartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    services: [String],
    location: {
      building: String,
      floor: String,
      roomNumber: String,
    },
    contactInfo: {
      email: String,
      phone: String,
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

const Department = mongoose.model("Department", departmentSchema);

export default Department;
