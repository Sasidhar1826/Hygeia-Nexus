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
    console.log("Basic lab reports fetched:", basicReports);

    // Process the report data to make it more suitable for the enhanced LabReportCard
    const enhancedReports = basicReports.map((report) => {
      let components = report.components || [];
      let patientInfo = null;

      // Ensure results is properly formatted - handle string or object
      let formattedResults = report.results;

      // If results is a string, make sure it's treated properly as HTML
      if (typeof report.results === "string") {
        // Convert the string to HTML-safe content with proper formatting
        formattedResults = report.results
          .replace(/\n/g, "<br>")
          .replace(/\s\s/g, "&nbsp;&nbsp;");
      }
      // If results is an object, ensure values are properly formatted as strings
      else if (typeof report.results === "object" && report.results !== null) {
        const processedResults = {};

        Object.entries(report.results).forEach(([key, value]) => {
          // Normalize the key to be more readable
          const formattedKey = key
            .replace(/([A-Z])/g, " $1") // Add space before capital letters
            .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
            .trim();

          // Extract numeric value and unit if possible
          let processedValue = value;
          if (typeof value === "string") {
            // Try to separate numeric value from units
            const match = value.match(/^([\d.]+)\s*(.*)$/);
            if (match) {
              const [_, numValue, unit] = match;
              // Format as number with unit
              processedValue = `${parseFloat(numValue)} ${unit}`.trim();
            }
          }

          processedResults[formattedKey] = processedValue;
        });

        formattedResults = processedResults;
      }

      // Check if we have patient info
      if (report.patient) {
        if (typeof report.patient === "object") {
          patientInfo = report.patient;
        } else {
          // Try to get patient info from mockApi
          try {
            const patient = mockApi.getUserById(report.patient);
            patientInfo = patient
              ? {
                  _id: patient._id,
                  name:
                    patient.name ||
                    `${patient.firstName || ""} ${
                      patient.lastName || ""
                    }`.trim(),
                }
              : null;
          } catch (e) {
            console.error(
              `Error fetching patient info for report ${report._id}:`,
              e
            );
          }
        }
      }

      // Determine if the report has abnormal results
      let hasAbnormalResults =
        report.hasAbnormalResults || components.some((c) => c.flagged === true);

      // If we have results object but no explicit abnormal flag, try to detect based on test names
      if (!hasAbnormalResults && typeof formattedResults === "object") {
        // Check common lab values against reference ranges
        for (const [key, value] of Object.entries(formattedResults)) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) continue;

          // Check for normal ranges of common tests
          if (
            (key.includes("Glucose") && (numValue < 70 || numValue > 100)) ||
            (key.includes("HbA1c") && numValue > 5.7) ||
            (key.includes("Cholesterol") && numValue > 200) ||
            (key.includes("LDL") && numValue > 100) ||
            (key.includes("HDL") && numValue < 40) ||
            (key.includes("Triglycerides") && numValue > 150) ||
            (key.includes("Blood Pressure") && numValue > 120)
          ) {
            hasAbnormalResults = true;
            break;
          }
        }
      }

      // Build the enhanced report
      return {
        ...report,
        components,
        hasAbnormalResults,
        patientName: patientInfo?.name || report.patientName || "Unknown",
        patientId: patientInfo?._id || report.patientId || report.patient,
        results: formattedResults, // Use our properly formatted results
      };
    });

    console.log("Enhanced lab reports:", enhancedReports);
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
