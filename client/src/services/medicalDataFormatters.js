/**
 * Helper functions for formatting medical data consistently across the application
 */

/**
 * Format lab reports for display
 * @param {Array} reports - Raw lab reports from the API
 * @returns {Array} - Formatted lab reports
 */
export const getFormattedLabReports = (reports = []) => {
  if (!reports || !Array.isArray(reports)) {
    console.warn("Invalid lab reports data:", reports);
    return [];
  }

  return reports.map((report) => ({
    id: report._id || report.id,
    testName: report.testName || "Unknown Test",
    date: report.date || report.createdAt || new Date().toISOString(),
    status: report.status || "completed",
    doctor: report.doctor?.name || report.doctorName || "Unknown Doctor",
    patient: report.patient?.name || report.patientName || "Unknown Patient",
    results: report.results || [],
    summary: report.summary || "",
    department: report.department?.name || report.departmentName || "General",
    type: report.type || "Lab Test",
    technician:
      report.technician?.name || report.technicianName || "Unknown Technician",
    reportUrl: report.reportUrl || "",
    normalRanges: report.normalRanges || {},
  }));
};

/**
 * Format medical records for display
 * @param {Array} records - Raw medical records from the API
 * @returns {Array} - Formatted medical records
 */
export const getFormattedMedicalRecords = (records = []) => {
  if (!records || !Array.isArray(records)) {
    console.warn("Invalid medical records data:", records);
    return [];
  }

  return records.map((record) => ({
    id: record._id || record.id,
    type: record.type || "Check-up",
    date: record.date || record.createdAt || new Date().toISOString(),
    doctor: record.doctor?.name || record.doctorName || "Unknown Doctor",
    patient: record.patient?.name || record.patientName || "Unknown Patient",
    diagnosis: record.diagnosis || [],
    symptoms: record.symptoms || [],
    notes: record.notes || "",
    treatment: record.treatment || "",
    medications: record.medications || [],
    followUp: record.followUp || null,
    department: record.department?.name || record.departmentName || "General",
    attachments: record.attachments || [],
  }));
};

/**
 * Format medications for display
 * @param {Array} medications - Raw medications from the API
 * @returns {Array} - Formatted medications
 */
export const getFormattedMedications = (medications = []) => {
  if (!medications || !Array.isArray(medications)) {
    console.warn("Invalid medications data:", medications);
    return [];
  }

  return medications.map((med) => ({
    id: med._id || med.id,
    name: med.name || "Unknown Medication",
    dosage: med.dosage || "",
    frequency: med.frequency || "",
    duration: med.duration || "",
    startDate: med.startDate || new Date().toISOString(),
    endDate: med.endDate || null,
    instructions: med.instructions || "",
    prescribedBy: med.prescribedBy?.name || med.doctorName || "Unknown Doctor",
    prescribedDate:
      med.prescribedDate || med.createdAt || new Date().toISOString(),
    status: med.status || "active",
    refills: med.refills || 0,
    sideEffects: med.sideEffects || [],
    category: med.category || "General",
  }));
};

/**
 * Format a date in a consistent way for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date (e.g., "Jan 15, 2023")
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

/**
 * Calculate age from a birth date
 * @param {string} birthDateString - ISO date string of birth date
 * @returns {number} - Age in years
 */
export const calculateAge = (birthDateString) => {
  if (!birthDateString) return "N/A";

  try {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  } catch (error) {
    console.error("Error calculating age:", error);
    return "N/A";
  }
};
