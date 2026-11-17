import { z } from "zod";

export const subscriptionSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
  productId: z.string().min(1, "Product ID is required"),
  pricingPlanId: z.string().min(1, "Pricing plan ID is required"),
  startDate: z.coerce.date().default(() => new Date()),
  nextBillingDate: z.coerce.date().optional(),
});

export const updateSubscriptionStatusSchema = z.object({
  status: z.enum(["active", "paused", "cancelled", "past_due"]),
  reason: z.string().optional(),
});

export const changeSubscriptionPlanSchema = z.object({
  newPricingPlanId: z.string().min(1, "New pricing plan ID is required"),
  reason: z.string().optional(),
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;
export type UpdateSubscriptionStatusInput = z.infer<typeof updateSubscriptionStatusSchema>;
export type ChangeSubscriptionPlanInput = z.infer<typeof changeSubscriptionPlanSchema>;

