const express = require("express");
const {
  getMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
  getLowStockMedications,
  updateMedicationStock,
} = require("../controllers/pharmacy.controller");

const router = express.Router();

router.route("/medications").get(getMedications).post(createMedication);

router
  .route("/medications/:id")
  .get(getMedicationById)
  .put(updateMedication)
  .delete(deleteMedication);

router.put("/medications/:id/stock", updateMedicationStock);
router.get("/low-stock", getLowStockMedications);

module.exports = router;
