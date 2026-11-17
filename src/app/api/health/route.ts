import { NextResponse } from "next/server";
import { connectDB, isDbConnected } from "@/lib/db";
import { successResponse, errorResponse } from "@/lib/api-response";
import { Customer } from "@/models/Customer";
import { Product } from "@/models/Product";
import { PricingPlan } from "@/models/PricingPlan";
import { Subscription } from "@/models/Subscription";
import { Invoice } from "@/models/Invoice";
import { Payment } from "@/models/Payment";

export async function GET() {
  try {
    await connectDB();

    const registeredModels = [
      Customer.modelName,
      Product.modelName,
      PricingPlan.modelName,
      Subscription.modelName,
      Invoice.modelName,
      Payment.modelName,
    ];

    return successResponse({
      status: "healthy",
      database: "connected",
      environment: process.env.NODE_ENV,
      registeredModels,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    return errorResponse(message, "DB_CONNECTION_ERROR", 503, {
      database: "disconnected",
      hint: "Ensure MongoDB is running or check your MONGODB_URI connection string.",
    });
  }
}

