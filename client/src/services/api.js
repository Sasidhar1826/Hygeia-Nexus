import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Initialize token if it exists in localStorage
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log API errors for debugging
    console.error("API Error:", error.response?.data || error.message);

    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized API request - clearing auth data");
      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Only redirect if not on login page already to prevent redirect loops
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth services
const login = async (email, password, role = "") => {
  try {
    const response = await api.post("/auth/login", { email, password, role });
    const { token } = response.data;

    // Set token in headers for all future requests
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

const signup = async (userData) => {
  // Use patient-specific registration endpoint for patients
  if (userData.role === "patient") {
    const response = await api.post("/auth/patient-register", userData);
    return response.data;
  }
  // Use regular signup for other user types
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Add auth methods directly to api object
api.login = login;
api.signup = signup;
api.logout = logout;
api.getCurrentUser = getCurrentUser;

// Patient services
export const patientService = {
  getAll: (params) => api.get("/patients", { params }),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post("/patients", data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};

// Appointment services
export const appointmentService = {
  getAll: (params) => api.get("/appointments", { params }),
  getById: (id) => api.get(`/appointments/${id}`),
  create: (data) => api.post("/appointments", data),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
  updateStatus: (id, status) =>
    api.put(`/appointments/${id}/status`, { status }),
  updatePaymentStatus: (id, paymentStatus) =>
    api.put(`/appointments/${id}/payment`, { paymentStatus }),
};

// Medical record services
export const medicalRecordService = {
  getAll: (params) => api.get("/medical-records", { params }),
  getById: (id) => api.get(`/medical-records/${id}`),
  getByPatient: (patientId) => api.get(`/medical-records/patient/${patientId}`),
  create: (data) => api.post("/medical-records", data),
  update: (id, data) => api.put(`/medical-records/${id}`, data),
  delete: (id) => api.delete(`/medical-records/${id}`),
  uploadAttachment: (recordId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/medical-records/${recordId}/attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

// Pharmacy services
export const pharmacyService = {
  getMedications: (params) => api.get("/pharmacy/medications", { params }),
  getMedicationById: (id) => api.get(`/pharmacy/medications/${id}`),
  createMedication: (data) => api.post("/pharmacy/medications", data),
  updateMedication: (id, data) => api.put(`/pharmacy/medications/${id}`, data),
  deleteMedication: (id) => api.delete(`/pharmacy/medications/${id}`),
  getPrescriptions: (params) => api.get("/pharmacy/prescriptions", { params }),
  getPrescriptionById: (id) => api.get(`/pharmacy/prescriptions/${id}`),
  createPrescription: (data) => api.post("/pharmacy/prescriptions", data),
  updatePrescription: (id, data) =>
    api.put(`/pharmacy/prescriptions/${id}`, data),
  deletePrescription: (id) => api.delete(`/pharmacy/prescriptions/${id}`),
  updateMedicationStock: (id, stock) =>
    api.put(`/pharmacy/medications/${id}/stock`, { stock }),
  getLowStockMedications: () => api.get(`/pharmacy/low-stock`),
};

// Billing services
export const billingService = {
  getInvoices: (params) => api.get("/billing/invoices", { params }),
  getInvoiceById: (id) => api.get(`/billing/invoices/${id}`),
  createInvoice: (data) => api.post("/billing/invoices", data),
  updateInvoice: (id, data) => api.put(`/billing/invoices/${id}`, data),
  deleteInvoice: (id) => api.delete(`/billing/invoices/${id}`),
  processPayment: (invoiceId, paymentData) =>
    api.post(`/billing/invoices/${invoiceId}/payment`, paymentData),
  getPatientBillingHistory: (patientId) =>
    api.get(`/billing/patient/${patientId}`),
};

// Department services
export const departmentService = {
  getAll: () => api.get("/departments"),
  getById: (id) => api.get(`/departments/${id}`),
  create: (data) => api.post("/departments", data),
  update: (id, data) => api.put(`/departments/${id}`, data),
  delete: (id) => api.delete(`/departments/${id}`),
};

// Doctor services
export const doctorService = {
  getAll: (params) => api.get("/doctors", { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  create: (data) => api.post("/doctors", data),
  update: (id, data) => api.put(`/doctors/${id}`, data),
  delete: (id) => api.delete(`/doctors/${id}`),
  getByDepartment: (departmentId) =>
    api.get(`/doctors/department/${departmentId}`),
};

// Lab services
export const labService = {
  getReports: (params) => api.get("/lab-reports", { params }),
  getReportById: (id) => api.get(`/lab-reports/${id}`),
  createReport: (data) => api.post("/lab-reports", data),
  updateReport: (id, data) => api.put(`/lab-reports/${id}`, data),
  deleteReport: (id) => api.delete(`/lab-reports/${id}`),
  getPatientReports: (patientId) =>
    api.get(`/lab-reports/patient/${patientId}`),
};

export default api;
