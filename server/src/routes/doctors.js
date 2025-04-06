import express from "express";
import {
  getDoctors,
  getDoctorById,
  getDoctorsByDepartment,
  updateDoctor,
  createDoctorReview,
  getDoctorSlots,
  createDoctor,
} from "../controllers/doctorController.js";
import { protect, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.get("/department/:departmentId", getDoctorsByDepartment);
router.get("/:id/slots", getDoctorSlots);

// Private routes
router.post("/", protect, authorizeRoles("admin"), createDoctor);
router.put("/:id", protect, updateDoctor);
router.post(
  "/:id/reviews",
  protect,
  authorizeRoles("patient"),
  createDoctorReview
);

export default router;
