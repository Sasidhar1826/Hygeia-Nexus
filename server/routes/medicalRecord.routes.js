const express = require("express");
const {
  getMedicalRecords,
  getMedicalRecordById,
  createMedicalRecord,
  updateMedicalRecord,
  deleteMedicalRecord,
  getPatientMedicalHistory,
} = require("../controllers/medicalRecord.controller");

const router = express.Router();

router.route("/").get(getMedicalRecords).post(createMedicalRecord);

router
  .route("/:id")
  .get(getMedicalRecordById)
  .put(updateMedicalRecord)
  .delete(deleteMedicalRecord);

router.get("/patient/:patientId", getPatientMedicalHistory);

module.exports = router;
