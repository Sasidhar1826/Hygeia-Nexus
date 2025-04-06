import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Routes imports
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import doctorRoutes from "./routes/doctors.js";
import patientRoutes from "./routes/patients.js";
import appointmentRoutes from "./routes/appointments.js";
import departmentRoutes from "./routes/departments.js";
import medicalRecordRoutes from "./routes/medicalRecords.js";
import labRoutes from "./routes/labs.js";
import pharmacyRoutes from "./routes/pharmacy.js";
import aiRoutes from "./routes/ai.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/medical-records", medicalRecordRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
