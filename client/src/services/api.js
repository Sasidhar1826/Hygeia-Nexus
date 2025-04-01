import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

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
};

// Medical record services
export const medicalRecordService = {
  getAll: (params) => api.get("/medical-records", { params }),
  getById: (id) => api.get(`/medical-records/${id}`),
  getByPatient: (patientId) => api.get(`/medical-records/patient/${patientId}`),
  create: (data) => api.post("/medical-records", data),
  update: (id, data) => api.put(`/medical-records/${id}`, data),
  delete: (id) => api.delete(`/medical-records/${id}`),
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
};

export default api;
