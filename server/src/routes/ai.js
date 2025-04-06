import express from "express";
import { protect } from "../middleware/auth.js";
import Patient from "../models/Patient.js";
import MedicalRecord from "../models/MedicalRecord.js";
import LabTest from "../models/LabTest.js";
import Prescription from "../models/Prescription.js";

const router = express.Router();

// @route   POST /api/ai/analyze-symptoms
// @desc    Analyze symptoms using AI
// @access  Private
router.post("/analyze-symptoms", protect, async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ message: "Please provide valid symptoms" });
    }

    // This is a simplified example. In a real implementation, you would:
    // 1. Use a medical AI API or ML model to analyze symptoms
    // 2. Return structured results

    // Mock response for demonstration
    const result = {
      title: "Possible condition based on symptoms",
      confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-99%
      details: [
        "Based on the symptoms provided, several possible conditions could be considered",
        "Further medical evaluation is recommended for a proper diagnosis",
        "Some symptoms may require immediate attention depending on severity",
      ],
      recommendations: [
        "Consult with a healthcare professional for proper diagnosis",
        "Monitor symptoms and note any changes in severity or frequency",
        "Consider laboratory tests to confirm or rule out potential conditions",
      ],
    };

    res.json(result);
  } catch (error) {
    console.error("AI symptom analysis error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   POST /api/ai/chat
// @desc    Get medical chat response
// @access  Private
router.post("/chat", protect, async (req, res) => {
  try {
    const { message, chatHistory } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Please provide a message" });
    }

    // In a real implementation, you would:
    // 1. Use an AI API like OpenAI, Google Gemini, or other LLM
    // 2. Send the message and chat history for context
    // 3. Process the response

    // Mock response for demonstration
    const aiResponse = {
      isUser: false,
      text: `This is a simulated AI response to: "${message}". In production, this would use a real AI service to provide medical information. Please note that any AI responses should be verified with healthcare professionals.`,
      source: "AI Medical Assistant",
    };

    res.json(aiResponse);
  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// @route   GET /api/ai/patient-summary/:id
// @desc    Get AI generated patient summary
// @access  Private
router.get("/patient-summary/:id", protect, async (req, res) => {
  try {
    const patientId = req.params.id;

    // Fetch patient data
    const patient = await Patient.findById(patientId).populate({
      path: "user",
      select: "name email gender dateOfBirth",
    });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Fetch medical records
    const medicalRecords = await MedicalRecord.find({ patient: patientId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch lab tests
    const labTests = await LabTest.find({ patient: patientId })
      .sort({ createdAt: -1 })
      .limit(5);

    // Fetch prescriptions
    const prescriptions = await Prescription.find({ patient: patientId })
      .sort({ createdAt: -1 })
      .limit(5);

    // In a real implementation, you would:
    // 1. Send this data to an AI model
    // 2. Get a generated summary back

    // Mock response for demonstration
    const summary = {
      overview: `Patient ${patient.user.name} (${
        patient.user.gender
      }, ${calculateAge(patient.user.dateOfBirth)} years old) has ${
        medicalRecords.length
      } recent medical records, ${labTests.length} lab tests, and ${
        prescriptions.length
      } prescriptions in their history.`,
      recentConditions:
        medicalRecords.length > 0
          ? medicalRecords.map((record) => record.diagnosis).slice(0, 3)
          : ["No recent conditions recorded"],
      keyMetrics: {
        bloodPressure: patient.bloodGroup || "Not recorded",
        height: patient.height ? `${patient.height} cm` : "Not recorded",
        weight: patient.weight ? `${patient.weight} kg` : "Not recorded",
      },
      recommendations: [
        "Regular follow-up appointments recommended",
        "Maintain consistent medication schedule",
        "Consider routine screenings based on age and risk factors",
      ],
    };

    res.json(summary);
  } catch (error) {
    console.error("AI patient summary error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Helper function to calculate age from date of birth
function calculateAge(dateOfBirth) {
  if (!dateOfBirth) return "Unknown";

  const dob = new Date(dateOfBirth);
  const ageDifMs = Date.now() - dob.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default router;
