/**
 * Currency and monetary utility functions for BillFlow.
 * Defaults to Indian Rupee (₹ - INR) with 2-decimal safe rounding.
 */

export const DEFAULT_CURRENCY = "INR";
export const DEFAULT_CURRENCY_SYMBOL = "₹";

export function formatCurrency(
  amount: number | undefined | null,
  currency: string = DEFAULT_CURRENCY
): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${DEFAULT_CURRENCY_SYMBOL}0.00`;
  }

  // Safe rounding to 2 decimals
  const rounded = Math.round(amount * 100) / 100;

  if (currency === "INR") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rounded);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

export function roundToTwo(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

