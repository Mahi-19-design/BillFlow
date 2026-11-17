import { NextResponse } from "next/server";
import { ZodError } from "zod";

export interface ApiResponseSuccess<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiResponseError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export function successResponse<T>(
  data: T,
  status = 200,
  meta?: Record<string, unknown>
) {
  const body: ApiResponseSuccess<T> = {
    success: true,
    data,
    ...(meta ? { meta } : {}),
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  code = "BAD_REQUEST",
  status = 400,
  details: unknown = null
) {
  const body: ApiResponseError = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(body, { status });
}

export function handleApiError(error: unknown) {
  console.error("[API Error]", error);

  // Zod validation errors
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join("."),
      message: err.message,
    }));
    return errorResponse(
      "Validation failed. Please check the submitted fields.",
      "VALIDATION_ERROR",
      422,
      formattedErrors
    );
  }

  // Mongoose duplicate key error (code 11000)
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    (error as { code: number }).code === 11000
  ) {
    const key = Object.keys(
      (error as { keyPattern?: Record<string, number> }).keyPattern || {}
    )[0] || "field";
    return errorResponse(
      `A record with this ${key} already exists.`,
      "DUPLICATE_KEY_ERROR",
      409
    );
  }

  // Mongoose invalid ObjectId CastError
  if (
    error &&
    typeof error === "object" &&
    "name" in error &&
    (error as { name: string }).name === "CastError"
  ) {
    return errorResponse("Invalid resource ID format.", "INVALID_ID", 400);
  }

  // General server error
  const message =
    error instanceof Error ? error.message : "An unexpected server error occurred.";
  return errorResponse(message, "INTERNAL_SERVER_ERROR", 500);
}

