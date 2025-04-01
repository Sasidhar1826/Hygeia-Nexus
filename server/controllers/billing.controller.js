const Billing = require("../models/billing.model");
const Patient = require("../models/patient.model");

// @desc    Get all invoices
// @route   GET /api/billing/invoices
// @access  Private
const getInvoices = async (req, res) => {
  try {
    const { patient, status, startDate, endDate } = req.query;

    // Build query
    const query = {};

    if (patient) {
      query.patient = patient;
    }

    if (status) {
      query.status = status;
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const invoices = await Billing.find(query)
      .populate("patient", "firstName lastName")
      .sort({ date: -1 });

    res.json(invoices);
  } catch (error) {
    console.error("Get invoices error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get invoice by ID
// @route   GET /api/billing/invoices/:id
// @access  Private
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id)
      .populate(
        "patient",
        "firstName lastName dateOfBirth gender contactNumber email address"
      )
      .populate("items.reference");

    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Get invoice error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Create a new invoice
// @route   POST /api/billing/invoices
// @access  Private
const createInvoice = async (req, res) => {
  try {
    // Generate invoice number
    const invoiceCount = await Billing.countDocuments();
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(invoiceCount + 1)
      .toString()
      .padStart(5, "0")}`;

    const invoiceData = {
      ...req.body,
      invoiceNumber,
    };

    const invoice = new Billing(invoiceData);
    const createdInvoice = await invoice.save();

    res.status(201).json(createdInvoice);
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update an invoice
// @route   PUT /api/billing/invoices/:id
// @access  Private
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id);

    if (invoice) {
      // Don't allow changing invoice number
      const { invoiceNumber, ...updateData } = req.body;

      Object.assign(invoice, updateData);
      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Delete an invoice
// @route   DELETE /api/billing/invoices/:id
// @access  Private
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Billing.findById(req.params.id);

    if (invoice) {
      // Instead of deleting, mark as cancelled
      invoice.status = "cancelled";
      await invoice.save();
      res.json({ message: "Invoice cancelled" });
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Mark invoice as paid
// @route   PUT /api/billing/invoices/:id/pay
// @access  Private
const payInvoice = async (req, res) => {
  try {
    const { paymentMethod, paymentDate } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({ message: "Payment method is required" });
    }

    const invoice = await Billing.findById(req.params.id);

    if (invoice) {
      invoice.status = "paid";
      invoice.paymentMethod = paymentMethod;
      invoice.paymentDate = paymentDate || new Date();

      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: "Invoice not found" });
    }
  } catch (error) {
    console.error("Pay invoice error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get patient billing history
// @route   GET /api/billing/patient/:patientId
// @access  Private
const getPatientBillingHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const invoices = await Billing.find({ patient: patientId }).sort({
      date: -1,
    });

    res.json(invoices);
  } catch (error) {
    console.error("Get patient billing history error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  payInvoice,
  getPatientBillingHistory,
};
