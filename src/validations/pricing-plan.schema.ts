import { z } from "zod";

export const pricingPlanSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  name: z.string().min(2, "Plan name must be at least 2 characters").max(100),
  description: z.string().optional().or(z.literal("")),
  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),
  currency: z.string().default("INR"),
  billingInterval: z.enum(["monthly", "yearly", "one-time"], {
    errorMap: () => ({ message: "Interval must be monthly, yearly, or one-time" }),
  }),
  isActive: z.boolean().default(true),
});

export const updatePricingPlanSchema = pricingPlanSchema.partial();

export type PricingPlanInput = z.infer<typeof pricingPlanSchema>;
export type UpdatePricingPlanInput = z.infer<typeof updatePricingPlanSchema>;

