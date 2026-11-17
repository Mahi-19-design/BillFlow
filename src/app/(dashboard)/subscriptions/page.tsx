"use client";

import React, { useState } from "react";
import {
  Repeat,
  Plus,
  Play,
  Pause,
  XCircle,
  Calendar,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { formatCurrency } from "@/lib/currency";

const DEMO_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    customer: "TechNova Solutions Pvt Ltd",
    product: "CloudScale Platform",
    plan: "Pro Cloud",
    amount: 14999,
    interval: "monthly",
    status: "active",
    startDate: "2026-01-15",
    nextBillingDate: "2026-12-15",
  },
  {
    id: "sub-2",
    customer: "PixelCraft Agency",
    product: "CloudScale Platform",
    plan: "Enterprise Annual",
    amount: 149999,
    interval: "yearly",
    status: "active",
    startDate: "2025-11-01",
    nextBillingDate: "2027-11-01",
  },
  {
    id: "sub-3",
    customer: "Zion Media Dynamics",
    product: "DevOps Advisory & Support",
    plan: "Monthly Retainer",
    amount: 45000,
    interval: "monthly",
    status: "paused",
    startDate: "2026-03-01",
    nextBillingDate: "Paused",
  },
  {
    id: "sub-4",
    customer: "Apex Cloud Services",
    product: "CloudScale Platform",
    plan: "Starter Cloud",
    amount: 4999,
    interval: "monthly",
    status: "past_due",
    startDate: "2026-05-10",
    nextBillingDate: "2026-11-10",
  },
  {
    id: "sub-5",
    customer: "GreenRoots Organics",
    product: "CloudScale Platform",
    plan: "Starter Cloud",
    amount: 4999,
    interval: "monthly",
    status: "cancelled",
    startDate: "2026-02-01",
    nextBillingDate: "Terminated",
  },
];

export default function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSubs = DEMO_SUBSCRIPTIONS.filter((sub) => {
    if (activeTab === "all") return true;
    return sub.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Subscriptions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor recurring contracts, automated renewals, and subscriber lifecycle states.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          New Subscription
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
        {["all", "active", "paused", "past_due", "cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Subscriptions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product & Plan</TableHead>
              <TableHead>Billing Amount</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Next Renewal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubs.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <span className="font-semibold text-slate-900 text-sm">
                    {sub.customer}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800 text-xs">
                      {sub.product}
                    </span>
                    <span className="text-slate-500 text-[11px]">{sub.plan}</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-sm">
                  {formatCurrency(sub.amount)}
                </TableCell>
                <TableCell>
                  <span className="capitalize text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {sub.interval}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={sub.status} />
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {sub.nextBillingDate}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {sub.status === "active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700"
                        title="Pause subscription"
                      >
                        <Pause className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    {sub.status === "paused" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-600 hover:text-emerald-700"
                        title="Resume subscription"
                      >
                        <Play className="w-3.5 h-3.5" />
                      </Button>
                    )}
                    {sub.status !== "cancelled" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:text-rose-700"
                        title="Cancel subscription"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* New Subscription Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Subscription"
        description="Bind a customer account to a product tier and establish billing intervals."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
          className="space-y-4"
        >
          <Select
            label="Select Customer"
            options={[
              { value: "cust-1", label: "TechNova Solutions Pvt Ltd" },
              { value: "cust-2", label: "Zion Media Dynamics" },
              { value: "cust-3", label: "Apex Cloud Services" },
            ]}
          />
          <Select
            label="Product"
            options={[
              { value: "prod-1", label: "CloudScale Platform" },
              { value: "prod-2", label: "DevOps Advisory & Support" },
            ]}
          />
          <Select
            label="Pricing Plan"
            options={[
              { value: "plan-1", label: "Pro Cloud — ₹14,999/mo" },
              { value: "plan-2", label: "Enterprise Annual — ₹1,49,999/yr" },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Start Date" type="date" defaultValue="2026-11-17" required />
            <Input label="First Billing Date" type="date" defaultValue="2026-11-17" required />
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" variant="primary">
              Activate Subscription
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

