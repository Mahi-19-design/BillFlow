import mongoose, { Schema, Model } from "mongoose";
import { IPricingPlan } from "@/types/models";

const PricingPlanSchema = new Schema<IPricingPlan>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Plan price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },
    billingInterval: {
      type: String,
      enum: {
        values: ["monthly", "yearly", "one-time"],
        message: "Interval must be monthly, yearly, or one-time",
      },
      required: [true, "Billing interval is required"],
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PricingPlan: Model<IPricingPlan> =
  mongoose.models.PricingPlan ||
  mongoose.model<IPricingPlan>("PricingPlan", PricingPlanSchema);

