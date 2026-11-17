import mongoose, { Schema, Model } from "mongoose";
import { IPayment } from "@/types/models";

const PaymentSchema = new Schema<IPayment>(
  {
    invoiceId: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: [true, "Invoice reference is required"],
      index: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
      index: true,
    },
    amount: {
      type: Number,
      required: [true, "Payment amount is required"],
      min: [0.01, "Payment amount must be greater than 0"],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ["bank_transfer", "upi", "cash", "card"],
        message: "Payment method must be bank_transfer, upi, cash, or card",
      },
      required: [true, "Payment method is required"],
      index: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      index: true,
    },
    status: {
      type: String,
      enum: {
        values: ["successful", "pending", "failed"],
        message: "Status must be successful, pending, or failed",
      },
      default: "successful",
      index: true,
    },
    transactionReference: {
      type: String,
      required: [true, "Transaction reference is required"],
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

