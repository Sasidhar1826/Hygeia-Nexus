import mockApi from "./mockApi";

// Helper function to get the appropriate unit for a lab parameter
export function getUnitForParameter(parameterName) {
  const units = {
    Glucose: "mg/dL",
    HbA1c: "%",
    Cholesterol: "mg/dL",
    "LDL Cholesterol": "mg/dL",
    "HDL Cholesterol": "mg/dL",
    Triglycerides: "mg/dL",
    "White Blood Cells": "thousand/μL",
    "Red Blood Cells": "million/μL",
    Hemoglobin: "g/dL",
    Hematocrit: "%",
    Platelets: "thousand/μL",
    Sodium: "mmol/L",
    Potassium: "mmol/L",
    Chloride: "mmol/L",
    CO2: "mmol/L",
    BUN: "mg/dL",
    Creatinine: "mg/dL",
    Calcium: "mg/dL",
    Protein: "g/dL",
    Albumin: "g/dL",
    Bilirubin: "mg/dL",
    "Alkaline Phosphatase": "U/L",
    AST: "U/L",
    ALT: "U/L",
    pH: "",
    "Specific Gravity": "",
  };

  return units[parameterName] || "";
}

// Get a user by ID
export function getUserById(userId) {
  // Simple function to find a user from the mockUsers array
  // In a real system, this would be an API call
  if (!userId) return null;

  // Try to use the findUserByEmailOrId function from mockApi if it exists
  if (typeof mockApi.findUserByEmailOrId === "function") {
    return mockApi.findUserByEmailOrId(userId);
  }

  // Otherwise, try to find it from getUsersByRole
  const allUsers = [
    ...(mockApi.getUsersByRole ? mockApi.getUsersByRole("doctor") : []),
    ...(mockApi.getUsersByRole ? mockApi.getUsersByRole("patient") : []),
    ...(mockApi.getUsersByRole ? mockApi.getUsersByRole("admin") : []),
    ...(mockApi.getUsersByRole ? mockApi.getUsersByRole("labtechnician") : []),
  ];

  return allUsers.find((user) => user._id === userId) || null;
}

// Format lab reports for display in the enhanced UI
export async function getFormattedLabReports(patientId) {
  try {
    const basicReports = await mockApi.getLabReports({ patient: patientId });

    // Process the report data to make it more suitable for the enhanced LabReportCard
    const enhancedReports = basicReports.map((report) => {
      const components = [];

      // Convert the results object to a components array with proper formatting
      if (report.results && typeof report.results === "object") {
        Object.entries(report.results).forEach(([key, value]) => {
          // Determine if this result should be flagged as abnormal
          let flagged = false;

          // Simple flagging logic for common parameters
          if (key === "Glucose" && parseFloat(value) > 120) flagged = true;
          if (key === "HbA1c" && parseFloat(value) > 6.5) flagged = true;
          if (key === "Cholesterol" && parseFloat(value) > 200) flagged = true;
          if (key === "LDL Cholesterol" && parseFloat(value) > 130)
            flagged = true;
          if (key === "HDL Cholesterol" && parseFloat(value) < 40)
            flagged = true;
          if (key === "Triglycerides" && parseFloat(value) > 150)
            flagged = true;

          // Add to components array
          components.push({
            name: key,
            value,
            unit: getUnitForParameter(key),
            flagged,
          });
        });
      }

      return {
        ...report,
        components,
      };
    });

    return enhancedReports;
  } catch (error) {
    console.error("Error fetching formatted lab reports:", error);
    return [];
  }
}

// Format medical records for display in the enhanced UI
export async function getFormattedMedicalRecords(patientId) {
  try {
    // First get the patient information
    const patient = await mockApi.getPatientById(patientId);

    if (!patient) {
      throw new Error(`Patient with ID ${patientId} not found`);
    }

    // Get medical records data
    let medicalRecords = [];
    if (typeof mockApi.getMedicalRecords === "function") {
      medicalRecords = await mockApi.getMedicalRecords({ patientId });
    } else if (patient.medicalRecords) {
      // If the patient object already has medical records, use those
      medicalRecords = patient.medicalRecords;
    }

    // Enrich the medical records with related information
    const enhancedRecords = medicalRecords.map((record) => {
      // Try to get doctor info
      const doctorId = record.doctorId || record.doctor?._id;
      let doctorInfo = null;

      if (doctorId) {
        doctorInfo = getUserById(doctorId);
      }

      // Format the record
      return {
        ...record,
        id: record.id || record._id,
        doctorId: doctorInfo
          ? {
              _id: doctorInfo._id,
              name:
                doctorInfo.name ||
                `${doctorInfo.firstName || ""} ${
                  doctorInfo.lastName || ""
                }`.trim() ||
                "Unknown Doctor",
              specialty: doctorInfo.specialty,
            }
          : record.doctor || record.doctorId,
        recordType: record.recordType || record.type || "Visit",
      };
    });

    return enhancedRecords;
  } catch (error) {
    console.error("Error fetching formatted medical records:", error);
    return [];
  }
}

export default {
  getFormattedLabReports,
  getFormattedMedicalRecords,
  getUnitForParameter,
  getUserById,
};
