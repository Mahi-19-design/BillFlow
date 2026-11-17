import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").max(120),
  description: z.string().optional().or(z.literal("")),
  category: z.enum(["Software", "Service", "Support"]).default("Software"),
  isActive: z.boolean().default(true),
});

export const updateProductSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

