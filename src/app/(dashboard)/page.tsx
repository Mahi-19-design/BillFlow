"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  Repeat,
  CreditCard,
  FileText,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/currency";
import { formatDate } from "@/lib/utils";

// Demo stats for Phase 1 UI preview
const DEMO_METRICS = [
  {
    title: "Monthly Recurring Revenue",
    value: 148500,
    change: "+12.4%",
    positive: true,
    icon: TrendingUp,
    color: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    title: "Total Collected Revenue",
    value: 842000,
    change: "+8.1%",
    positive: true,
    icon: CreditCard,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    title: "Active Subscriptions",
    value: "28",
    change: "+3 this month",
    positive: true,
    icon: Repeat,
    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    title: "Pending & Overdue",
    value: 45000,
    change: "3 overdue invoices",
    positive: false,
    icon: AlertCircle,
    color: "text-rose-600 bg-rose-50 border-rose-100",
  },
];

const DEMO_RECENT_INVOICES = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0042",
    customer: "TechNova Solutions Pvt Ltd",
    amount: 24999,
    date: "2026-11-15",
    status: "paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0041",
    customer: "Zion Media Dynamics",
    amount: 14500,
    date: "2026-11-14",
    status: "pending",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0040",
    customer: "Apex Cloud Services",
    amount: 32000,
    date: "2026-11-10",
    status: "overdue",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0039",
    customer: "GreenRoots Organics",
    amount: 8500,
    date: "2026-11-08",
    status: "draft",
  },
];

const DEMO_RECENT_SUBSCRIPTIONS = [
  {
    id: "sub-1",
    customer: "TechNova Solutions",
    plan: "Enterprise Cloud (Monthly)",
    amount: 24999,
    status: "active",
    renewal: "15 Dec 2026",
  },
  {
    id: "sub-2",
    customer: "PixelCraft Agency",
    plan: "Growth SaaS Plan (Yearly)",
    amount: 49999,
    status: "active",
    renewal: "01 Nov 2027",
  },
  {
    id: "sub-3",
    customer: "OmniSoft Labs",
    plan: "Starter API Tier (Monthly)",
    amount: 4999,
    status: "paused",
    renewal: "Paused",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 rounded-2xl text-white shadow-sm border border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30 mb-2">
            Workspace Active
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Financial & Subscription Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time billing analytics, active recurring contracts, and cash flow simulations.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/customers">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white"
              leftIcon={<Users className="w-3.5 h-3.5" />}
            >
              Customers
            </Button>
          </Link>
          <Link href="/invoices">
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DEMO_METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {typeof metric.value === "number"
                      ? formatCurrency(metric.value)
                      : metric.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${metric.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                <span
                  className={`font-semibold flex items-center ${metric.positive ? "text-emerald-600" : "text-rose-600"
                    }`}
                >
                  {metric.change}
                </span>
                <span className="text-slate-400">vs last period</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two-Column Activity Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Recent Invoices</CardTitle>
              <Link
                href="/invoices"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {DEMO_RECENT_INVOICES.map((inv) => (
                <div
                  key={inv.id}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">
                      {inv.invoiceNumber}
                    </span>
                    <span className="text-xs text-slate-500">{inv.customer}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {formatCurrency(inv.amount)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {inv.date}
                      </div>
                    </div>
                    <Badge variant={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between w-full">
              <CardTitle>Active Subscriptions</CardTitle>
              <Link
                href="/subscriptions"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Manage <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {DEMO_RECENT_SUBSCRIPTIONS.map((sub) => (
                <div
                  key={sub.id}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">
                      {sub.customer}
                    </span>
                    <span className="text-xs text-slate-500">{sub.plan}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-900">
                        {formatCurrency(sub.amount)}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Next: {sub.renewal}
                      </div>
                    </div>
                    <Badge variant={sub.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
