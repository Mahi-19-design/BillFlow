"use client";

import React, { useState } from "react";
import {
  Settings,
  Building,
  CreditCard,
  FileSpreadsheet,
  Save,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Workspace Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure your company profile, currency preferences, and default invoice standards.
          </p>
        </div>
        {isSaved && (
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Settings saved successfully
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-500" />
              <CardTitle>Business Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Legal Business Name"
                defaultValue="BillFlow Technologies Pvt Ltd"
                required
              />
              <Input
                label="GSTIN / Tax Identification #"
                defaultValue="29AAAAA0000A1Z5"
                placeholder="29AAAAA0000A1Z5"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Billing Contact Email"
                type="email"
                defaultValue="finance@billflow.io"
                required
              />
              <Input
                label="Support Phone"
                defaultValue="+91 80 4123 4567"
              />
            </div>
            <Input
              label="Registered Office Address"
              defaultValue="#104, Outer Ring Road, Tech Corridor, Bangalore, Karnataka, 560103"
            />
          </CardContent>
        </Card>

        {/* Currency & Financial Standards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-slate-500" />
              <CardTitle>Currency & Regional Defaults</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Base Currency"
                defaultValue="INR"
                options={[
                  { value: "INR", label: "INR (₹) — Indian Rupee (Default)" },
                  { value: "USD", label: "USD ($) — US Dollar" },
                  { value: "EUR", label: "EUR (€) — Euro" },
                  { value: "GBP", label: "GBP (£) — British Pound" },
                ]}
              />
              <Select
                label="Date & Locale Format"
                defaultValue="en-IN"
                options={[
                  { value: "en-IN", label: "DD/MM/YYYY (Indian Standard)" },
                  { value: "en-US", label: "MM/DD/YYYY (US Standard)" },
                  { value: "iso", label: "YYYY-MM-DD (ISO 8601)" },
                ]}
              />
            </div>
            <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-center gap-2.5 text-xs text-blue-800">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                All recurring subscription models, invoices, and simulations default to INR (₹)
                with 2-decimal arithmetic precision.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Standards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-slate-500" />
              <CardTitle>Invoice Standards</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Invoice Number Prefix"
                defaultValue="INV-2026-"
                helperText="Appended with sequential numbering"
              />
              <Input
                label="Default GST / Tax Rate (%)"
                type="number"
                defaultValue="18"
                helperText="Applied automatically"
              />
              <Input
                label="Default Due Period (Days)"
                type="number"
                defaultValue="15"
                helperText="Due 15 days from issue date"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="md" leftIcon={<Save className="w-4 h-4" />}>
            Save Workspace Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

