"use client";

import React, { useState } from "react";
import {
  Package,
  Plus,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  Tag,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatCurrency } from "@/lib/currency";

const DEMO_PRODUCTS = [
  {
    id: "prod-1",
    name: "CloudScale Platform",
    description: "Enterprise multi-cloud billing infrastructure and compute management.",
    category: "Software",
    isActive: true,
    plans: [
      {
        id: "plan-1",
        name: "Starter Cloud",
        billingInterval: "monthly",
        price: 4999,
        currency: "INR",
        isActive: true,
      },
      {
        id: "plan-2",
        name: "Pro Cloud",
        billingInterval: "monthly",
        price: 14999,
        currency: "INR",
        isActive: true,
      },
      {
        id: "plan-3",
        name: "Enterprise Annual",
        billingInterval: "yearly",
        price: 149999,
        currency: "INR",
        isActive: true,
      },
    ],
  },
  {
    id: "prod-2",
    name: "DevOps Advisory & Support",
    description: "Dedicated site reliability engineering and 24/7 on-call incident response.",
    category: "Service",
    isActive: true,
    plans: [
      {
        id: "plan-4",
        name: "Monthly Retainer",
        billingInterval: "monthly",
        price: 45000,
        currency: "INR",
        isActive: true,
      },
      {
        id: "plan-5",
        name: "Architecture Review",
        billingInterval: "one-time",
        price: 75000,
        currency: "INR",
        isActive: true,
      },
    ],
  },
];

export default function ProductsPage() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Products & Pricing Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure software tiers, consultation packages, and recurring billing plans.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPlanModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Pricing Plan
          </Button>
          <Button
            onClick={() => setIsProductModalOpen(true)}
            leftIcon={<Package className="w-4 h-4" />}
          >
            Create Product
          </Button>
        </div>
      </div>

      {/* Products & Plans Showcase */}
      <div className="space-y-6">
        {DEMO_PRODUCTS.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="bg-slate-50/70">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {product.name}
                      </h3>
                      <Badge variant={product.isActive ? "active" : "inactive"}>
                        {product.isActive ? "Active" : "Archived"}
                      </Badge>
                      <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {product.description}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlanModalOpen(true)}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  New Plan
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-400" />
                Pricing Plans ({product.plans.length})
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-5 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {plan.billingInterval}
                        </span>
                        <Badge variant={plan.isActive ? "active" : "inactive"} />
                      </div>
                      <h5 className="font-bold text-slate-900 text-base">
                        {plan.name}
                      </h5>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-black text-slate-900">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">
                          /{plan.billingInterval === "one-time" ? "once" : plan.billingInterval === "yearly" ? "yr" : "mo"}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Product Modal */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title="Create New Product"
        description="Define a new software package, subscription tier, or recurring service."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsProductModalOpen(false);
          }}
          className="space-y-4"
        >
          <Input label="Product Name" placeholder="e.g. Enterprise Cloud Suite" required />
          <Input label="Description" placeholder="Summary of capabilities and deliverables" required />
          <Select
            label="Category"
            options={[
              { value: "Software", label: "Software / SaaS" },
              { value: "Service", label: "Consulting / Professional Service" },
              { value: "Support", label: "Technical Support / SLA" },
            ]}
          />
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsProductModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" variant="primary">
              Create Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Plan Modal */}
      <Modal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        title="Add Pricing Plan"
        description="Attach a new pricing interval and amount to an existing product."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsPlanModalOpen(false);
          }}
          className="space-y-4"
        >
          <Select
            label="Target Product"
            options={DEMO_PRODUCTS.map((p) => ({ value: p.id, label: p.name }))}
          />
          <Input label="Plan Name" placeholder="e.g. Pro Monthly Tier" required />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Price (INR ₹)" type="number" placeholder="4999" required />
            <Select
              label="Billing Interval"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
                { value: "one-time", label: "One-Time" },
              ]}
            />
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPlanModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" variant="primary">
              Save Plan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

