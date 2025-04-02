/**
 * API Service Manager
 *
 * This module determines whether to use the mock API or real API implementation
 * based on the VITE_USE_MOCK_API environment variable.
 */

import mockApi from "./mockApi";
import realApi from "./realApi";

// Check the environment variable to determine which API to use
const useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

// Export the appropriate API implementation
const api = useMockApi ? mockApi : realApi;

// Log which API implementation is being used (in development)
if (import.meta.env.DEV) {
  console.log(`Using ${useMockApi ? "mock" : "real"} API implementation`);
}

export default api;

// Export individual service groups for more granular imports if needed
export const authService = api;
export const patientService = api;
export const doctorService = api;
export const appointmentService = api;
export const departmentService = api;
export const labService = api;
