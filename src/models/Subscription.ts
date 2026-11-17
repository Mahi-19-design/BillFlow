import mongoose, { Schema, Model } from "mongoose";
import { ISubscription } from "@/types/models";

const SubscriptionHistorySchema = new Schema(
  {
    action: {
      type: String,
      enum: ["created", "activated", "paused", "resumed", "cancelled", "plan_changed"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    details: {
      type: String,
      trim: true,
    },
    previousPlanId: {
      type: Schema.Types.ObjectId,
      ref: "PricingPlan",
    },
    newPlanId: {
      type: Schema.Types.ObjectId,
      ref: "PricingPlan",
    },
  },
  { _id: false }
);

const SubscriptionSchema = new Schema<ISubscription>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer reference is required"],
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
      index: true,
    },
    pricingPlanId: {
      type: Schema.Types.ObjectId,
      ref: "PricingPlan",
      required: [true, "Pricing plan reference is required"],
      index: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    nextBillingDate: {
      type: Date,
      required: [true, "Next billing date is required"],
      index: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: {
        values: ["active", "paused", "cancelled", "past_due"],
        message: "Status must be active, paused, cancelled, or past_due",
      },
      default: "active",
      index: true,
    },
    billingAmount: {
      type: Number,
      required: [true, "Billing amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    billingInterval: {
      type: String,
      enum: ["monthly", "yearly", "one-time"],
      required: true,
    },
    subscriptionHistory: [SubscriptionHistorySchema],
  },
  {
    timestamps: true,
  }
);

export const Subscription: Model<ISubscription> =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

