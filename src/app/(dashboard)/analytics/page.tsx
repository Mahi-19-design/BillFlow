"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  CreditCard,
  PieChart as PieIcon,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/currency";

const REVENUE_TREND_DATA = [
  { month: "Jun", revenue: 54000, mrr: 45000 },
  { month: "Jul", revenue: 68000, mrr: 58000 },
  { month: "Aug", revenue: 89000, mrr: 75000 },
  { month: "Sep", revenue: 112000, mrr: 98000 },
  { month: "Oct", revenue: 138000, mrr: 122000 },
  { month: "Nov", revenue: 165000, mrr: 148500 },
];

const PLAN_DISTRIBUTION = [
  { name: "Pro Cloud", value: 16, color: "#2563eb" },
  { name: "Starter Cloud", value: 8, color: "#60a5fa" },
  { name: "Enterprise Annual", value: 4, color: "#1e40af" },
];

const PAYMENT_METHODS_DATA = [
  { method: "UPI", count: 48, fill: "#10b981" },
  { method: "Bank Transfer", count: 28, fill: "#3b82f6" },
  { method: "Card (Sim)", count: 18, fill: "#8b5cf6" },
  { method: "Cash", count: 6, fill: "#f59e0b" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Revenue & Subscription Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deep financial intelligence, recurring subscriber retention, and cash-flow health.
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          Last 6 Months (Trailing)
        </div>
      </div>

      {/* KPI Highlight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Current MRR
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatCurrency(148500)}
          </p>
          <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% annualized growth
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Annual Run Rate (ARR)
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatCurrency(1782000)}
          </p>
          <div className="mt-2 text-xs text-slate-500">
            Normalized 12-month projection
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            ARPU (Avg Revenue / User)
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {formatCurrency(5303)}
          </p>
          <div className="mt-2 text-xs text-blue-600 font-medium">
            Across 28 active accounts
          </div>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Subscription Retention
          </p>
          <p className="text-2xl font-black text-slate-900 mt-1">96.4%</p>
          <div className="mt-2 text-xs text-emerald-600 font-medium">
            Under 3.6% monthly churn
          </div>
        </Card>
      </div>

      {/* Main Revenue Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>Revenue & MRR Progression</CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Monthly collected payments vs normalized recurring contract value.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> MRR
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Total Revenue
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_TREND_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₹${v / 1000}k`}
              />
              <Tooltip
                formatter={(val: any) => [formatCurrency(Number(val) || 0), ""]}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderColor: "#1e293b",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
              <Area
                type="monotone"
                dataKey="mrr"
                stroke="#2563eb"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorMrr)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Two Column Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plan Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Subscriptions by Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center justify-around gap-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PLAN_DISTRIBUTION}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                  >
                    {PLAN_DISTRIBUTION.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 shrink-0">
                {PLAN_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-3 h-3 rounded-sm shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-slate-700">{item.name}</span>
                    <span className="text-slate-400 font-bold ml-auto">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Transactions by Method</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PAYMENT_METHODS_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="method" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
