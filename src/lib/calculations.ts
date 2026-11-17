import { roundToTwo } from "./currency";

export interface LineItemComputation {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceCalculations {
  computedLineItems: LineItemComputation[];
  subtotal: number;
  discount: number;
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

/**
 * Calculates itemized invoice amounts safely with 2-decimal precision.
 */
export function computeInvoiceTotals(
  rawItems: { description: string; quantity: number; unitPrice: number }[],
  discount = 0,
  taxRate = 18
): InvoiceCalculations {
  const safeDiscount = Math.max(0, roundToTwo(discount || 0));
  const safeTaxRate = Math.max(0, roundToTwo(taxRate || 0));

  let subtotal = 0;
  const computedLineItems: LineItemComputation[] = rawItems.map((item) => {
    const qty = Math.max(1, Math.round(item.quantity));
    const price = Math.max(0, roundToTwo(item.unitPrice));
    const amount = roundToTwo(qty * price);
    subtotal += amount;
    return {
      description: item.description.trim(),
      quantity: qty,
      unitPrice: price,
      amount,
    };
  });

  subtotal = roundToTwo(subtotal);
  const taxableAmount = Math.max(0, roundToTwo(subtotal - safeDiscount));
  const taxAmount = roundToTwo((taxableAmount * safeTaxRate) / 100);
  const total = roundToTwo(taxableAmount + taxAmount);

  return {
    computedLineItems,
    subtotal,
    discount: safeDiscount,
    taxableAmount,
    taxRate: safeTaxRate,
    taxAmount,
    total,
  };
}

/**
 * Normalizes subscription billing amount to standard Monthly Recurring Revenue (MRR).
 */
export function calculateNormalizedMrr(
  amount: number,
  interval: "monthly" | "yearly" | "one-time",
  status: "active" | "paused" | "cancelled" | "past_due"
): number {
  if (status !== "active") return 0;

  switch (interval) {
    case "monthly":
      return roundToTwo(amount);
    case "yearly":
      return roundToTwo(amount / 12);
    case "one-time":
    default:
      return 0; // One-time purchases are excluded from recurring MRR
  }
}

/**
 * Generates an automated, unique professional invoice number (e.g. INV-2026-0042).
 */
export function generateInvoiceNumber(sequence: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequence).padStart(4, "0");
  return `INV-${year}-${padded}`;
}

/**
 * Generates an automated simulated transaction reference (e.g. TXN-SIM-78A39F01).
 */
export function generateTransactionReference(): string {
  const randomHex = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `TXN-SIM-${randomHex}`;
}

