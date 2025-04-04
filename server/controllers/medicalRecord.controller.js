const MedicalRecord = require("../models/medicalRecord.model");
const Patient = require("../models/patient.model");

// @desc    Get all medical records
// @route   GET /api/medical-records
// @access  Private
const getMedicalRecords = async (req, res) => {
  try {
    const { patient, doctor, recordType, startDate, endDate } = req.query;

    // Build query
    const query = {};

    if (patient) {
      query.patient = patient;
    }

    if (doctor) {
      query.doctor = doctor;
    }

    if (recordType) {
      query.recordType = recordType;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const medicalRecords = await MedicalRecord.find(query)
      .populate("patient", "firstName lastName")
      .populate("doctor", "name department")
      .sort({ date: -1 });

    res.json(medicalRecords);
  } catch (error) {
    console.error("Get medical records error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get medical record by ID
// @route   GET /api/medical-records/:id
// @access  Private
const getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate("patient", "firstName lastName dateOfBirth gender")
      .populate("doctor", "name department")
      .populate("relatedAppointment");

    if (medicalRecord) {
      res.json(medicalRecord);
    } else {
      res.status(404).json({ message: "Medical record not found" });
    }
  } catch (error) {
    console.error("Get medical record error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new medical record
// @route   POST /api/medical-records
// @access  Private
const createMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = new MedicalRecord(req.body);
    const createdMedicalRecord = await medicalRecord.save();

    res.status(201).json(createdMedicalRecord);
  } catch (error) {
    console.error("Create medical record error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a medical record
// @route   PUT /api/medical-records/:id
// @access  Private
const updateMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);

    if (medicalRecord) {
      Object.assign(medicalRecord, req.body);
      const updatedMedicalRecord = await medicalRecord.save();
      res.json(updatedMedicalRecord);
    } else {
      res.status(404).json({ message: "Medical record not found" });
    }
  } catch (error) {
    console.error("Update medical record error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete a medical record
// @route   DELETE /api/medical-records/:id
// @access  Private
const deleteMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);

    if (medicalRecord) {
      await medicalRecord.remove();
      res.json({ message: "Medical record removed" });
    } else {
      res.status(404).json({ message: "Medical record not found" });
    }
  } catch (error) {
    console.error("Delete medical record error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get patient medical history
// @route   GET /api/medical-records/patient/:patientId
// @access  Private
const getPatientMedicalHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const medicalRecords = await MedicalRecord.find({ patient: patientId })
      .populate("doctor", "name department")
      .sort({ date: -1 });

    res.json(medicalRecords);
  } catch (error) {
    console.error("Get patient medical history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getPatientMedicalHistory,
};
