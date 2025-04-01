const express = require("express");
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  payInvoice,
  getPatientBillingHistory,
} = require("../controllers/billing.controller");

const router = express.Router();

router.route("/invoices").get(getInvoices).post(createInvoice);

router
  .route("/invoices/:id")
  .get(getInvoiceById)
  .put(updateInvoice)
  .delete(deleteInvoice);

router.put("/invoices/:id/pay", payInvoice);
router.get("/patient/:patientId", getPatientBillingHistory);

module.exports = router;
