import { Types } from "mongoose";

export interface ICustomer {
  _id?: Types.ObjectId | string;
  name: string;
  email: string;
  phone?: string;
  billingAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IProduct {
  _id?: Types.ObjectId | string;
  name: string;
  description?: string;
  category: "Software" | "Service" | "Support" | string;
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IPricingPlan {
  _id?: Types.ObjectId | string;
  productId: Types.ObjectId | string | IProduct;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingInterval: "monthly" | "yearly" | "one-time";
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ISubscriptionHistory {
  action: "created" | "activated" | "paused" | "resumed" | "cancelled" | "plan_changed";
  timestamp: Date | string;
  details?: string;
  previousPlanId?: Types.ObjectId | string;
  newPlanId?: Types.ObjectId | string;
}

export interface ISubscription {
  _id?: Types.ObjectId | string;
  customerId: Types.ObjectId | string | ICustomer;
  productId: Types.ObjectId | string | IProduct;
  pricingPlanId: Types.ObjectId | string | IPricingPlan;
  startDate: Date | string;
  nextBillingDate: Date | string;
  endDate?: Date | string | null;
  status: "active" | "paused" | "cancelled" | "past_due";
  billingAmount: number;
  billingInterval: "monthly" | "yearly" | "one-time";
  subscriptionHistory: ISubscriptionHistory[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IInvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface IInvoice {
  _id?: Types.ObjectId | string;
  invoiceNumber: string;
  customerId: Types.ObjectId | string | ICustomer;
  subscriptionId?: Types.ObjectId | string | ISubscription | null;
  lineItems: IInvoiceLineItem[];
  subtotal: number;
  discount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  issueDate: Date | string;
  dueDate: Date | string;
  status: "draft" | "pending" | "paid" | "overdue";
  notes?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface IPayment {
  _id?: Types.ObjectId | string;
  invoiceId: Types.ObjectId | string | IInvoice;
  customerId: Types.ObjectId | string | ICustomer;
  amount: number;
  paymentMethod: "bank_transfer" | "upi" | "cash" | "card";
  paymentDate: Date | string;
  status: "successful" | "pending" | "failed";
  transactionReference: string;
  notes?: string;
  createdAt?: Date | string;
}

