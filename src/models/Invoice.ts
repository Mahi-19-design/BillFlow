import mongoose, { Schema, Model } from "mongoose";
import { IInvoice } from "@/types/models";

const InvoiceLineItemSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, "Line item description is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: [0, "Unit price cannot be negative"],
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount cannot be negative"],
    },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
      index: true,
    },
    subscriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      default: null,
      index: true,
    },
    lineItems: {
      type: [InvoiceLineItemSchema],
      required: true,
      validate: {
        validator: (items: unknown[]) => items.length > 0,
        message: "Invoice must have at least one line item",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: [0, "Subtotal cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },
    taxRate: {
      type: Number,
      default: 18,
      min: [0, "Tax rate cannot be negative"],
    },
    taxAmount: {
      type: Number,
      required: true,
      min: [0, "Tax amount cannot be negative"],
    },
    total: {
      type: Number,
      required: true,
      min: [0, "Total cannot be negative"],
    },
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "pending", "paid", "overdue"],
        message: "Status must be draft, pending, paid, or overdue",
      },
      default: "pending",
      index: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Invoice: Model<IInvoice> =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);

