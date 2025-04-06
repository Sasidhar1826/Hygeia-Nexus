import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token in the header
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

// Add a response interceptor to standardize response data
api.interceptors.response.use(
  (response) => {
    // Handle different response formats and normalize them
    if (response.config.url.includes("/appointments")) {
      // Appointments endpoint special handling
      if (response.data && typeof response.data === "object") {
        // Check if it's a paginated or wrapped response
        if (!Array.isArray(response.data) && response.data.data) {
          // If it's wrapped in a data property, extract it
          response.data = response.data.data;
        }

        // If the data is an array, normalize each appointment
        if (Array.isArray(response.data)) {
          response.data = response.data
            .map((appointment) => {
              if (!appointment) return null;

              // Handle doctor references
              if (appointment.doctor) {
                if (typeof appointment.doctor === "string") {
                  // If doctor is just an ID string, create a minimal object
                  appointment.doctor = {
                    _id: appointment.doctor,
                    name: "Doctor information not available",
                  };
                } else if (
                  typeof appointment.doctor === "object" &&
                  !appointment.doctor.name
                ) {
                  // If doctor object exists but has no name
                  appointment.doctor.name =
                    appointment.doctor.name ||
                    "Doctor information not available";
                }
              }

              // Handle patient references
              if (appointment.patient) {
                if (typeof appointment.patient === "string") {
                  // If patient is just an ID string, create a minimal object
                  appointment.patient = {
                    _id: appointment.patient,
                    name: "Patient information not available",
                  };
                } else if (
                  typeof appointment.patient === "object" &&
                  !appointment.patient.name
                ) {
                  // If patient object exists but has no name
                  appointment.patient.name =
                    appointment.patient.name ||
                    "Patient information not available";
                }
              }

              return appointment;
            })
            .filter((appointment) => appointment !== null);
        }
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const login = async (email, password, role) => {
  try {
    console.log("API Login attempt with:", { email, role });

    // Support both legacy 'role' parameter and new 'userType' parameter
    // The backend will handle both and prioritize userType if both are provided
    const payload = {
      email,
      password,
    };

    // Add userType and/or role to the payload if provided
    if (role) {
      console.log(`Role specified for login: ${role}`);
      payload.userType = role; // Use userType parameter as the server expects it
      payload.role = role; // Keep using 'role' for backward compatibility with frontend
    }

    console.log("Login payload:", { ...payload, password: "REDACTED" });

    // Special case for admin login
    if (role === "admin") {
      console.log(`Attempting admin login with email: ${email}`);
    }

    const response = await api.post("/auth/login", payload);

    console.log("Login response from server:", {
      ...response.data,
      token: response.data.token ? "TOKEN_EXISTS" : "NO_TOKEN",
    });

    // Ensure role and userType are consistent
    if (response.data) {
      if (!response.data.role && response.data.userType) {
        response.data.role = response.data.userType;
      }
      if (!response.data.userType && response.data.role) {
        response.data.userType = response.data.role;
      }
    }

    return response.data;
  } catch (error) {
    console.error("Login API error:", error.response?.data || error);
    if (role === "admin") {
      console.error("Admin login failed:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error.response?.data || error;
  }
};

export const register = async (userData) => {
  try {
    console.log("Registering user with data:", {
      ...userData,
      password: userData.password ? "REDACTED" : undefined,
    });
    console.log("API URL:", API_URL);
    console.log("Full endpoint URL:", `${API_URL}/auth/register`);

    // Ensure userType and role consistency
    if (userData.role && !userData.userType) {
      userData.userType = userData.role;
    } else if (userData.userType && !userData.role) {
      userData.role = userData.userType;
    }

    const response = await api.post("/auth/register", userData);

    console.log("Registration response:", {
      ...response.data,
      token: response.data.token ? "TOKEN_EXISTS" : "NO_TOKEN",
    });

    // Ensure consistent role and userType in response
    if (response.data) {
      if (!response.data.role && response.data.userType) {
        response.data.role = response.data.userType;
      }
      if (!response.data.userType && response.data.role) {
        response.data.userType = response.data.role;
      }
    }

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error response:", error.response);
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const response = await api.put("/auth/profile", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Doctors API calls
export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors");

    // Check response format and normalize
    if (
      response.data &&
      response.data.hasOwnProperty("data") &&
      Array.isArray(response.data.data)
    ) {
      // New format with {message, data}
      return response.data;
    } else if (Array.isArray(response.data)) {
      // Direct array format
      return response.data;
    } else {
      console.warn("Unexpected doctors response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return []; // Return empty array instead of throwing to prevent UI errors
  }
};

export const createDoctor = async (doctorData) => {
  try {
    // Validate required fields based on the Doctor model
    if (!doctorData.specialty) {
      throw new Error("Specialty is required");
    }

    if (!doctorData.department) {
      throw new Error("Department is required");
    }

    if (!doctorData.licenseNumber) {
      throw new Error("License number is required");
    }

    // Create a clone of the data to avoid modifying the original
    const processedData = { ...doctorData };

    // Ensure department is properly passed as an ObjectId string
    // The backend expects a valid MongoDB ObjectId
    if (
      processedData.department &&
      typeof processedData.department === "string"
    ) {
      // Ensure it's a valid ObjectId format (24 hex characters)
      if (!/^[0-9a-fA-F]{24}$/.test(processedData.department)) {
        throw new Error(
          "Invalid department ID format. Must be a valid ObjectId."
        );
      }
    }

    const response = await api.post("/doctors", processedData);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error.response?.data || error;
  }
};

// Alias for createDoctor for backward compatibility
export const addDoctor = createDoctor;

export const deleteDoctor = async (id) => {
  try {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error.response?.data || error;
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDoctorsByDepartment = async (departmentId) => {
  try {
    const response = await api.get(`/doctors/department/${departmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateDoctor = async (id, data) => {
  try {
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDoctorSlots = async (id, date) => {
  try {
    const response = await api.get(`/doctors/${id}/slots`, {
      params: { date },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Appointments API calls
export const createAppointment = async (appointmentData) => {
  try {
    // Validate required fields
    const requiredFields = ["doctor", "appointmentDate", "startTime", "reason"];

    for (const field of requiredFields) {
      if (!appointmentData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Make sure patient ID is included
    if (!appointmentData.patient) {
      console.warn(
        "No patient ID provided in appointment data, this might cause issues"
      );
    }

    // Add validation for doctor ID format
    if (
      appointmentData.doctor &&
      !/^[0-9a-fA-F]{24}$/.test(appointmentData.doctor)
    ) {
      throw new Error("Invalid doctor ID format");
    }

    // Add validation for patient ID format if present
    if (
      appointmentData.patient &&
      !/^[0-9a-fA-F]{24}$/.test(appointmentData.patient)
    ) {
      throw new Error("Invalid patient ID format");
    }

    // Log what we're sending to the API for debugging
    console.log("Creating appointment with data:", {
      ...appointmentData,
      // Hide any sensitive data
      notes: appointmentData.notes ? "(content)" : undefined,
    });

    const response = await api.post("/appointments", appointmentData);

    // Log success
    console.log("Appointment created successfully:", {
      id: response.data._id,
      status: response.data.status,
    });

    return response.data;
  } catch (error) {
    console.error("Create appointment error:", error);
    throw error.response?.data || error;
  }
};

export const getAppointments = async (params = {}) => {
  try {
    // Log the parameters being sent to help with debugging
    console.log("getAppointments params:", params);

    // Set 'paramsSerializer' option to handle array parameters correctly
    const response = await api.get("/appointments", {
      params,
      paramsSerializer: {
        // This ensures that array parameters are properly serialized
        // e.g., status: ['pending', 'confirmed'] becomes status[]=pending&status[]=confirmed
        indexes: null, // 'null' means we want traditional format like status[]=value
      },
    });

    // Log the response for debugging
    console.log("getAppointments response:", {
      status: response.status,
      dataCount: Array.isArray(response.data)
        ? response.data.length
        : response.data &&
          typeof response.data === "object" &&
          response.data.data
        ? response.data.data.length
        : "not an array",
    });

    // Handle both array response and object response with data property
    let appointments;
    if (Array.isArray(response.data)) {
      appointments = response.data;
    } else if (
      response.data &&
      typeof response.data === "object" &&
      response.data.data
    ) {
      // Some API versions might return { data: [...] }
      appointments = response.data.data;
    } else {
      // Fallback for unexpected response format
      console.warn("Unexpected appointment data format:", response.data);
      appointments = Array.isArray(response.data) ? response.data : [];
    }

    // Ensure all appointments have proper structure for doctor and patient
    appointments = appointments
      .map((appointment) => {
        if (!appointment) return null;

        // Create fallback values for doctor
        let doctor = appointment.doctor;
        if (doctor) {
          if (typeof doctor === "string") {
            doctor = { _id: doctor, name: "Doctor information not available" };
          } else if (typeof doctor === "object" && !doctor.name) {
            doctor = {
              ...doctor,
              name: doctor.name || "Doctor information not available",
              specialty: doctor.specialty || "General",
            };
          }
        }

        // Create fallback values for patient
        let patient = appointment.patient;
        if (patient) {
          if (typeof patient === "string") {
            patient = {
              _id: patient,
              name: "Patient information not available",
            };
          } else if (typeof patient === "object" && !patient.name) {
            patient = {
              ...patient,
              name: patient.name || "Patient information not available",
            };
          }
        }

        return {
          ...appointment,
          doctor,
          patient,
        };
      })
      .filter((appointment) => appointment !== null);

    return appointments;
  } catch (error) {
    console.error("getAppointments error:", error);
    throw error.response?.data || error;
  }
};

export const getAppointmentById = async (id, forcePopulate = false) => {
  try {
    const params = forcePopulate ? { populate: true } : {};
    const response = await api.get(`/appointments/${id}`, { params });

    // Handle both direct response and wrapped response
    if (response.data && typeof response.data === "object") {
      // If response is wrapped in an object with a data property
      if (response.data.data && !response.data._id) {
        return response.data.data;
      }
      // Direct object response
      return response.data;
    }
    return response.data;
  } catch (error) {
    console.error("getAppointmentById error:", error);
    throw error.response?.data || error;
  }
};

/**
 * Refetches an appointment with fully populated data if the doctor or patient is missing
 * @param {Object} appointment - The potentially incomplete appointment
 * @returns {Promise<Object>} - The fully populated appointment
 */
export const refetchAppointmentIfNeeded = async (appointment) => {
  // If we don't have an appointment, nothing to refetch
  if (!appointment || !appointment._id) {
    return appointment;
  }

  // Check if we need to refetch (doctor or patient reference exists but name is missing)
  const needsRefetch =
    (appointment.doctor &&
      (typeof appointment.doctor === "string" ||
        (typeof appointment.doctor === "object" &&
          !appointment.doctor.name))) ||
    (appointment.patient &&
      (typeof appointment.patient === "string" ||
        (typeof appointment.patient === "object" &&
          !appointment.patient.name)));

  if (needsRefetch) {
    console.log(
      `Refetching appointment ${appointment._id} with full population`
    );
    try {
      const fullAppointment = await getAppointmentById(appointment._id, true);
      return fullAppointment;
    } catch (error) {
      console.error(`Error refetching appointment ${appointment._id}:`, error);
      return appointment; // Return original if refetch fails
    }
  }

  // No need to refetch
  return appointment;
};

export const updateAppointment = async (id, appointmentData) => {
  try {
    // Validate input
    if (!id) {
      throw new Error("Appointment ID is required");
    }

    if (!appointmentData || Object.keys(appointmentData).length === 0) {
      throw new Error("No appointment data provided for update");
    }

    console.log(`[DEBUG] Starting updateAppointment for appointment ${id}`);
    console.log(
      `[DEBUG] Update payload:`,
      JSON.stringify(
        {
          ...appointmentData,
          notes: appointmentData.notes ? "[REDACTED]" : undefined,
        },
        null,
        2
      )
    );

    // First fetch the current appointment to get its current status
    let currentAppointment = null;
    if (appointmentData.status) {
      try {
        console.log(
          `[DEBUG] Fetching current appointment data for ${id} to validate status transition`
        );
        const response = await api.get(`/appointments/${id}`);
        currentAppointment = response.data;
        console.log("[DEBUG] Current appointment before update:", {
          id,
          currentStatus: currentAppointment.status,
          newStatus: appointmentData.status,
          storedOldStatus: currentAppointment._oldStatus,
        });

        // If status is the same, remove it to avoid unnecessary validation
        if (currentAppointment.status === appointmentData.status) {
          console.log(
            `[DEBUG] Status unchanged (${appointmentData.status}), removing status from update payload`
          );
          const { status, ...restOfData } = appointmentData;
          appointmentData = restOfData;
        } else {
          console.log(
            `[DEBUG] Status changing from ${currentAppointment.status} to ${appointmentData.status}`
          );

          // Define valid transitions to check client-side before making the API call
          const validTransitions = {
            pending: ["confirmed", "rejected", "cancelled"],
            confirmed: ["completed", "cancelled", "no-show"],
            rejected: [],
            cancelled: [],
            completed: [],
            "no-show": [],
          };

          // Client-side validation for status transitions
          if (
            !validTransitions[currentAppointment.status]?.includes(
              appointmentData.status
            )
          ) {
            console.error(
              `[DEBUG] INVALID STATUS TRANSITION from ${currentAppointment.status} to ${appointmentData.status}`
            );
            console.error(
              `[DEBUG] Valid transitions are: ${JSON.stringify(
                validTransitions[currentAppointment.status]
              )}`
            );

            // Better error message with valid transitions
            const error = new Error(
              `Invalid status transition from '${currentAppointment.status}' to '${appointmentData.status}'`
            );
            error.code = "INVALID_STATUS_TRANSITION";
            error.validTransitions =
              validTransitions[currentAppointment.status];
            error.currentStatus = currentAppointment.status;
            error.targetStatus = appointmentData.status;
            throw error;
          }

          console.log(`[DEBUG] Status transition validation passed`);

          // Add _oldStatus to help the server with validation
          appointmentData._oldStatus = currentAppointment.status;
          console.log(
            `[DEBUG] Added _oldStatus=${currentAppointment.status} to payload`
          );
        }
      } catch (error) {
        if (error.code === "INVALID_STATUS_TRANSITION") {
          // Re-throw transition errors to be handled by the caller with all context
          throw error;
        }

        console.warn("[DEBUG] Could not validate status transition:", error);
        // Continue with the update attempt if we couldn't validate
      }
    }

    console.log(`[DEBUG] Sending update request to API`);

    // Send the update request with better error handling
    let response;
    try {
      response = await api.put(`/appointments/${id}`, appointmentData);
      console.log(`[DEBUG] API response status: ${response.status}`);
    } catch (apiError) {
      console.error("[DEBUG] API error during appointment update:", apiError);

      // Enhanced error handling for API errors
      if (apiError.response) {
        console.error(
          `[DEBUG] Server responded with status ${apiError.response.status}`
        );
        console.error("[DEBUG] Response data:", apiError.response.data);

        // Check for specific error codes
        if (apiError.response.data?.code === "INVALID_STATUS_TRANSITION") {
          const error = new Error(
            `Invalid status transition: ${apiError.response.data.message}`
          );
          error.code = "INVALID_STATUS_TRANSITION";
          error.validTransitions = apiError.response.data.validTransitions;
          error.currentStatus = currentAppointment?.status;
          error.targetStatus = appointmentData.status;
          throw error;
        }

        if (apiError.response.data?.code === "VALIDATION_ERROR") {
          const errorMsg = `Validation error: ${JSON.stringify(
            apiError.response.data.errors
          )}`;
          console.error(`[DEBUG] ${errorMsg}`);
          const error = new Error(errorMsg);
          error.code = "VALIDATION_ERROR";
          error.fields = apiError.response.data.errors;
          throw error;
        }

        throw apiError.response.data || apiError;
      }

      throw apiError;
    }

    // Handle different response formats
    let updatedAppointment;
    if (response.data && typeof response.data === "object") {
      if (response.data.data && !response.data._id) {
        updatedAppointment = response.data.data;
      } else {
        updatedAppointment = response.data;
      }
    } else {
      updatedAppointment = response.data;
    }

    // Verify we actually got the updated appointment
    if (!updatedAppointment || !updatedAppointment._id) {
      console.warn(
        "[DEBUG] Received invalid appointment data in response:",
        updatedAppointment
      );
      throw new Error("Server returned invalid appointment data");
    }

    // Log success
    console.log("[DEBUG] Appointment updated successfully:", {
      id: updatedAppointment._id || id,
      status: updatedAppointment.status || "unknown",
      updatedAt: updatedAppointment.updatedAt,
    });

    return updatedAppointment;
  } catch (error) {
    console.error("[DEBUG] Error updating appointment:", error);

    // Create a more detailed error object for the frontend
    const enhancedError = new Error(
      error.message || "Failed to update appointment"
    );
    enhancedError.originalError = error;
    enhancedError.code = error.code || "UPDATE_FAILED";
    enhancedError.details = error.response?.data || {};
    enhancedError.validTransitions = error.validTransitions;
    enhancedError.currentStatus = error.currentStatus;
    enhancedError.targetStatus = error.targetStatus;

    throw enhancedError;
  }
};

export const updateAppointmentStatus = async (id, status) => {
  try {
    // Note: This is a legacy method maintained for backward compatibility
    // Prefer using the specific action methods instead
    console.warn(
      "updateAppointmentStatus is deprecated, please use specific action methods instead"
    );

    if (!id) {
      throw new Error("Appointment ID is required");
    }

    if (!status) {
      throw new Error("Status is required");
    }

    console.log(`Attempting to update appointment ${id} status to ${status}`);

    // First fetch the current appointment to validate the transition
    let currentAppointment;
    try {
      const response = await api.get(`/appointments/${id}`);
      currentAppointment = response.data;

      console.log(
        `Current status: ${currentAppointment.status}, Target status: ${status}`
      );

      // If status is unchanged, return the current appointment
      if (currentAppointment.status === status) {
        console.log(`Status already set to ${status}, skipping update`);
        return currentAppointment;
      }

      // Define valid transitions to check client-side
      const validTransitions = {
        pending: ["confirmed", "rejected", "cancelled"],
        confirmed: ["completed", "cancelled", "no-show"],
        rejected: [],
        cancelled: [],
        completed: [],
        "no-show": [],
      };

      // Validate the transition client-side before attempting the API call
      if (!validTransitions[currentAppointment.status]?.includes(status)) {
        const error = `Invalid status transition from '${currentAppointment.status}' to '${status}'`;
        console.error(error);
        console.error(
          `Valid transitions are: ${JSON.stringify(
            validTransitions[currentAppointment.status]
          )}`
        );
        throw new Error(error);
      }
    } catch (error) {
      if (error.message?.includes("Invalid status transition")) {
        throw error; // Re-throw transition errors
      }
      console.warn("Could not validate status transition:", error);
      // Continue with the update attempt if we couldn't validate
    }

    const response = await api.put(`/appointments/${id}/status`, { status });
    console.log(`Status update API response:`, {
      status: response.status,
      responseStatus: response.data?.status || "unknown",
    });

    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);

    // Enhanced error handling
    if (error.response?.data) {
      console.error("Server response:", error.response.data);

      // Check for specific status transition errors
      if (
        error.response.data.message &&
        error.response.data.message.includes("Invalid status transition")
      ) {
        const enhancedError = new Error(error.response.data.message);
        enhancedError.code = "INVALID_STATUS_TRANSITION";
        enhancedError.validTransitions = error.response.data.validTransitions;
        throw enhancedError;
      }
    }

    throw error.response?.data || error;
  }
};

export const acceptAppointment = async (id, notes = "") => {
  try {
    console.log(`Accepting appointment: ${id}`);
    const response = await api.put(`/appointments/${id}/accept`, { notes });
    console.log("Appointment accepted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error accepting appointment:", error);
    throw error.response?.data || error;
  }
};

export const rejectAppointment = async (id, rejectionReason) => {
  try {
    if (!rejectionReason) {
      throw new Error("Rejection reason is required");
    }
    console.log(`Rejecting appointment: ${id}`);
    const response = await api.put(`/appointments/${id}/reject`, {
      rejectionReason,
    });
    console.log("Appointment rejected:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    throw error.response?.data || error;
  }
};

export const cancelAppointment = async (id, cancellationReason = "") => {
  try {
    console.log(`Cancelling appointment: ${id}`);
    const response = await api.put(`/appointments/${id}/cancel`, {
      cancellationReason,
    });
    console.log("Appointment cancelled:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error.response?.data || error;
  }
};

export const completeAppointment = async (id, notes = "") => {
  try {
    console.log(`Completing appointment: ${id}`);
    const response = await api.put(`/appointments/${id}/complete`, { notes });
    console.log("Appointment completed:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error completing appointment:", error);
    throw error.response?.data || error;
  }
};

export const markAppointmentNoShow = async (id, notes = "") => {
  try {
    console.log(`Marking appointment as no-show: ${id}`);
    const response = await api.put(`/appointments/${id}/no-show`, { notes });
    console.log("Appointment marked as no-show:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error marking appointment as no-show:", error);
    throw error.response?.data || error;
  }
};

export const addAppointmentNote = async (id, notes) => {
  try {
    const response = await api.put(`/appointments/${id}/notes`, { notes });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const fixAppointmentReferences = async (action = "fix") => {
  try {
    console.log(`Attempting to ${action} appointments with broken references`);
    const response = await api.post("/appointments/fix-references", { action });
    console.log("Fix references response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fixing appointment references:", error);
    throw error.response?.data || error;
  }
};

export const deleteAppointment = async (id) => {
  try {
    if (!id) {
      throw new Error("Appointment ID is required");
    }

    console.log(`Deleting appointment with ID: ${id}`);
    const response = await api.delete(`/appointments/${id}`);
    console.log("Appointment deleted successfully");
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error.response?.data || error;
  }
};

// Departments API calls
export const getDepartments = async () => {
  try {
    const response = await api.get("/departments");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDepartmentById = async (id) => {
  try {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createDepartment = async (departmentData) => {
  try {
    const response = await api.post("/departments", departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Patients API calls
export const getPatients = async () => {
  try {
    const response = await api.get("/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error.response?.data || error;
  }
};

export const getPatientById = async (id) => {
  try {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Medical Records API calls
export const getMedicalRecords = async (patientId) => {
  try {
    const response = await api.get("/medical-records", {
      params: { patient: patientId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createMedicalRecord = async (recordData) => {
  try {
    const response = await api.post("/medical-records", recordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMedicalRecordById = async (id) => {
  try {
    const response = await api.get(`/medical-records/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Lab tests API calls
export const getLabs = async (params = {}) => {
  try {
    const response = await api.get("/labs", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getLabReports = async (params = {}) => {
  try {
    const response = await api.get("/labs/reports", { params });
    // Check if the response has the expected structure
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.warn("Unexpected lab reports response format:", response.data);
      return response.data.data || [];
    }
  } catch (error) {
    console.error("Error fetching lab reports:", error);
    throw error.response?.data || error;
  }
};

export const getLabById = async (id) => {
  try {
    const response = await api.get(`/labs/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createLab = async (labData) => {
  try {
    const response = await api.post("/labs", labData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateLab = async (id, labData) => {
  try {
    const response = await api.put(`/labs/${id}`, labData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Pharmacy/Medication API calls
export const getMedications = async (params = {}) => {
  try {
    const response = await api.get("/pharmacy/medications", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMedicationById = async (id) => {
  try {
    const response = await api.get(`/pharmacy/medications/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createMedication = async (medicationData) => {
  try {
    const response = await api.post("/pharmacy/medications", medicationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateMedication = async (id, medicationData) => {
  try {
    const response = await api.put(
      `/pharmacy/medications/${id}`,
      medicationData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Prescription API calls
export const getPrescriptions = async (params = {}) => {
  try {
    const response = await api.get("/pharmacy/prescriptions", { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPrescriptionById = async (id) => {
  try {
    const response = await api.get(`/pharmacy/prescriptions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createPrescription = async (prescriptionData) => {
  try {
    const response = await api.post(
      "/pharmacy/prescriptions",
      prescriptionData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updatePrescription = async (id, prescriptionData) => {
  try {
    const response = await api.put(
      `/pharmacy/prescriptions/${id}`,
      prescriptionData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const refillPrescription = async (id, notes) => {
  try {
    const response = await api.put(`/pharmacy/prescriptions/${id}/refill`, {
      pharmacistNotes: notes,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Users API calls
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Patient Management
export const updatePatient = async (id, patientData) => {
  try {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error.response?.data || error;
  }
};

export const deletePatient = async (id) => {
  try {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// AI Diagnostics API calls
export const analyzeSymptomsAI = async (symptoms) => {
  try {
    const response = await api.post("/ai/analyze-symptoms", { symptoms });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMedicalChatResponse = async (message, chatHistory) => {
  try {
    const response = await api.post("/ai/chat", { message, chatHistory });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getPatientSummary = async (patientId) => {
  try {
    const response = await api.get(`/ai/patient-summary/${patientId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Lab Technician Management
export const getLabTechnicians = async () => {
  try {
    const response = await api.get("/lab-technicians");
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const addLabTechnician = async (technicianData) => {
  try {
    const response = await api.post("/lab-technicians", technicianData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateLabTechnician = async (id, technicianData) => {
  try {
    const response = await api.put(`/lab-technicians/${id}`, technicianData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteLabTechnician = async (id) => {
  try {
    const response = await api.delete(`/lab-technicians/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Updated to add patients directly to the patients collection
export const addPatient = async (patientData) => {
  try {
    const response = await api.post("/patients", patientData);
    return response.data;
  } catch (error) {
    console.error("Error adding patient:", error);
    throw error.response?.data || error;
  }
};

export const diagnoseAppointment = async (id) => {
  try {
    if (!id) {
      throw new Error("Appointment ID is required for diagnosis");
    }

    console.log(`Diagnosing appointment issues for ID: ${id}`);
    const response = await api.get(`/appointments/${id}/diagnose`);

    console.log("Appointment diagnostic results:", {
      id,
      currentStatus: response.data.diagnostic.currentStatus,
      storedOldStatus: response.data.diagnostic.storedOldStatus,
      hasReferenceIssues:
        response.data.diagnostic.references.hasBrokenReferences,
      statusTransitions: response.data.diagnostic.statusTransitions,
    });

    return response.data;
  } catch (error) {
    console.error("Error diagnosing appointment:", error);
    throw error.response?.data || error;
  }
};

// Export all API functions
export default {
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
  acceptAppointment,
  rejectAppointment,
  cancelAppointment,
  completeAppointment,
  markAppointmentNoShow,
  addAppointmentNote,
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getPatients,
  getPatientById,
  getMedicalRecords,
  createMedicalRecord,
  getMedicalRecordById,
  getLabs,
  getLabReports,
  getLabById,
  createLab,
  updateLab,
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  getPrescriptions,
  getPrescriptionById,
  createPrescription,
  updatePrescription,
  refillPrescription,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updatePatient,
  deletePatient,
  // AI Diagnostics
  analyzeSymptomsAI,
  getMedicalChatResponse,
  getPatientSummary,
  // Lab Technician Management
  getLabTechnicians,
  addLabTechnician,
  updateLabTechnician,
  deleteLabTechnician,
  addPatient,
  updateAppointment,
  fixAppointmentReferences,
  refetchAppointmentIfNeeded,
  diagnoseAppointment,
  deleteAppointment,
};
