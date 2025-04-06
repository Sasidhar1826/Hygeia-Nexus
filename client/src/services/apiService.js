import * as apiMethods from "./api";
import realApi from "./api";

// Always use real API
const api = realApi;

console.log("Using REAL API");

// Re-export all individual methods for direct imports
export const {
  login,
  register,
  getCurrentUser,
  updateUserProfile,
  getDoctors,
  getDoctorById,
  getDoctorsByDepartment,
  updateDoctor,
  createDoctor,
  addDoctor,
  deleteDoctor,
  getDoctorSlots,
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  cancelAppointment,
  addAppointmentNote,
  deleteAppointment,
  // ... all other methods
} = apiMethods;

export default api;
