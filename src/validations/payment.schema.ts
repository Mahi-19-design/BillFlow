import { z } from "zod";

export const paymentSchema = z.object({
  invoiceId: z.string().min(1, "Invoice ID is required"),
  amount: z.coerce.number().positive("Payment amount must be greater than 0"),
  paymentMethod: z.enum(["bank_transfer", "upi", "cash", "card"], {
    errorMap: () => ({
      message: "Method must be bank_transfer, upi, cash, or card",
    }),
  }),
  paymentDate: z.coerce.date().default(() => new Date()),
  status: z.enum(["successful", "pending", "failed"]).default("successful"),
  notes: z.string().optional().or(z.literal("")),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(["successful", "pending", "failed"]),
  notes: z.string().optional(),
});

export type PaymentInput = z.infer<typeof paymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;

