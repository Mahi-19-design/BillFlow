import { z } from "zod";

export const lineItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.coerce.number().min(0, "Unit price cannot be negative"),
});

export const invoiceSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  subscriptionId: z.string().optional().nullable(),
  invoiceNumber: z.string().optional(),
  lineItems: z
    .array(lineItemSchema)
    .min(1, "Invoice must contain at least one line item"),
  discount: z.coerce.number().min(0, "Discount cannot be negative").default(0),
  taxRate: z.coerce.number().min(0, "Tax rate cannot be negative").default(18),
  issueDate: z.coerce.date().default(() => new Date()),
  dueDate: z.coerce.date(),
  notes: z.string().optional().or(z.literal("")),
  status: z.enum(["draft", "pending", "paid", "overdue"]).default("pending"),
});

export const updateInvoiceSchema = invoiceSchema.partial();

export type LineItemInput = z.infer<typeof lineItemSchema>;
export type InvoiceInput = z.infer<typeof invoiceSchema>;
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>;

