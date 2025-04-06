import express from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import { protect, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getDepartments);
router.get("/:id", getDepartmentById);

// Admin-only routes
router.post("/", protect, authorizeRoles("admin"), createDepartment);
router.put("/:id", protect, authorizeRoles("admin"), updateDepartment);
router.delete("/:id", protect, authorizeRoles("admin"), deleteDepartment);

export default router;
