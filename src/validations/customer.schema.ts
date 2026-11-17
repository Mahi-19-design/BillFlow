import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal("")),
  billingAddress: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().default("India"),
  notes: z.string().optional().or(z.literal("")),
});

export const updateCustomerSchema = customerSchema.partial();

export type CustomerInput = z.infer<typeof customerSchema>;
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

