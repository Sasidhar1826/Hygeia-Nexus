const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    items: [
      {
        description: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        unitPrice: {
          type: Number,
          required: true,
          min: 0,
        },
        amount: {
          type: Number,
          required: true,
          min: 0,
        },
        itemType: {
          type: String,
          enum: ["consultation", "procedure", "medication", "lab", "other"],
          required: true,
        },
        reference: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "items.referenceModel",
        },
        referenceModel: {
          type: String,
          enum: ["Appointment", "MedicalRecord", "Medication"],
        },
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    tax: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["draft", "sent", "paid", "overdue", "cancelled"],
      default: "draft",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "insurance", "bank_transfer", "other"],
    },
    paymentDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
    insuranceDetails: {
      provider: String,
      policyNumber: String,
      coveragePercentage: Number,
      approvalCode: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying of invoices by patient
billingSchema.index({ patient: 1, date: -1 });

// Index for efficient querying of invoices by status
billingSchema.index({ status: 1, dueDate: 1 });

// Index for efficient querying of invoices by invoice number
billingSchema.index({ invoiceNumber: 1 });

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
