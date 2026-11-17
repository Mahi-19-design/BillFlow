import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "active"
  | "paused"
  | "cancelled"
  | "past_due"
  | "draft"
  | "pending"
  | "paid"
  | "overdue"
  | "successful"
  | "failed"
  | "neutral"
  | "info";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant | string;
  dot?: boolean;
}

const variantStyles: Record<string, string> = {
  // Subscription / General Active
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
  successful: "bg-emerald-50 text-emerald-700 border-emerald-200",

  // Paused / Pending / Draft
  paused: "bg-amber-50 text-amber-700 border-amber-200",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  draft: "bg-slate-100 text-slate-700 border-slate-200",

  // Past Due / Overdue / Failed / Cancelled
  overdue: "bg-rose-50 text-rose-700 border-rose-200",
  past_due: "bg-rose-50 text-rose-700 border-rose-200",
  failed: "bg-rose-50 text-rose-700 border-rose-200",
  cancelled: "bg-slate-100 text-slate-600 border-slate-200",

  // Inactive
  inactive: "bg-slate-100 text-slate-500 border-slate-200",

  // Standard
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

const dotColors: Record<string, string> = {
  active: "bg-emerald-500",
  paid: "bg-emerald-500",
  successful: "bg-emerald-500",
  paused: "bg-amber-500",
  pending: "bg-amber-500",
  draft: "bg-slate-400",
  overdue: "bg-rose-500",
  past_due: "bg-rose-500",
  failed: "bg-rose-500",
  cancelled: "bg-slate-400",
  inactive: "bg-slate-400",
  neutral: "bg-slate-400",
  info: "bg-blue-500",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "neutral",
  dot = true,
  className,
  children,
  ...props
}) => {
  const normVariant = variant.toLowerCase().replace(" ", "_");
  const style = variantStyles[normVariant] || variantStyles.neutral;
  const dotColor = dotColors[normVariant] || dotColors.neutral;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize transition-colors",
        style,
        className
      )}
      {...props}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColor)} />}
      {children || variant.replace("_", " ")}
    </span>
  );
};

