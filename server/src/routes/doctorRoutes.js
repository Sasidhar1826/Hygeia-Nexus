import express from "express";
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsByDepartment,
  getDoctorSlots,
  createDoctorReview,
} from "../controllers/doctorController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.get("/department/:departmentId", getDoctorsByDepartment);
router.get("/:id/slots", getDoctorSlots);

// Private routes
router.post("/", protect, authorize("admin"), createDoctor);
router.put("/:id", protect, authorize("admin", "doctor"), updateDoctor);
router.delete("/:id", protect, authorize("admin"), deleteDoctor);
router.post("/:id/reviews", protect, authorize("patient"), createDoctorReview);

export default router;
