"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  ShieldAlert,
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

const DEMO_PAYMENTS = [
  {
    id: "pay-1",
    reference: "TXN-SIM-94812",
    invoiceNumber: "INV-2026-0042",
    customer: "TechNova Solutions Pvt Ltd",
    amount: 24999,
    method: "upi",
    date: "2026-11-15 14:32",
    status: "successful",
  },
  {
    id: "pay-2",
    reference: "TXN-SIM-83719",
    invoiceNumber: "INV-2026-0038",
    customer: "Apex Cloud Services",
    amount: 15000,
    method: "bank_transfer",
    date: "2026-11-12 11:20",
    status: "successful",
  },
  {
    id: "pay-3",
    reference: "TXN-SIM-72618",
    invoiceNumber: "INV-2026-0041",
    customer: "Zion Media Dynamics",
    amount: 14500,
    method: "card",
    date: "2026-11-14 16:45",
    status: "pending",
  },
  {
    id: "pay-4",
    reference: "TXN-SIM-61524",
    invoiceNumber: "INV-2026-0035",
    customer: "GreenRoots Organics",
    amount: 8500,
    method: "card",
    date: "2026-11-09 09:12",
    status: "failed",
  },
];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPayments = DEMO_PAYMENTS.filter((pay) => {
    const matchesTab = activeTab === "all" || pay.status === activeTab;
    const matchesSearch =
      pay.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Simulation Notice Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="font-semibold">Simulated Gateway Environment:</strong> All
          transactions here are processed in sandbox simulation mode. No real credit cards,
          CVVs, or bank credentials are ever captured or stored.
        </div>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Payments Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit simulated payment collections, reconcile invoice receipts, and check transaction logs.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Record Payment
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference, invoice #, customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto justify-end">
            {["all", "successful", "pending", "failed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Payments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Ref</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((pay) => (
              <TableRow key={pay.id}>
                <TableCell>
                  <span className="font-mono font-bold text-slate-900 text-xs">
                    {pay.reference}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-mono font-medium text-blue-600 text-xs">
                    {pay.invoiceNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-slate-800 text-sm">
                    {pay.customer}
                  </span>
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-sm">
                  {formatCurrency(pay.amount)}
                </TableCell>
                <TableCell>
                  <span className="capitalize text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {pay.method.replace("_", " ")}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  {pay.date}
                </TableCell>
                <TableCell>
                  <Badge variant={pay.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Record Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record Simulated Payment"
        description="Simulate receiving a full or partial payment against an invoice."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
          className="space-y-4"
        >
          <Select
            label="Target Invoice"
            options={[
              { value: "inv-2", label: "INV-2026-0041 — Zion Media (Due: ₹14,500)" },
              { value: "inv-3", label: "INV-2026-0040 — Apex Cloud (Due: ₹32,000)" },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Payment Amount (₹)" type="number" defaultValue="14500" required />
            <Select
              label="Simulated Payment Method"
              options={[
                { value: "upi", label: "UPI (Simulated Instant)" },
                { value: "bank_transfer", label: "NEFT / RTGS Bank Transfer" },
                { value: "card", label: "Card (Simulated Token)" },
                { value: "cash", label: "Cash / Direct Cheque" },
              ]}
            />
          </div>
          <Select
            label="Simulation Outcome"
            options={[
              { value: "successful", label: "Successful (Auto-reconciles invoice)" },
              { value: "pending", label: "Pending (Pending clearance)" },
              { value: "failed", label: "Failed (Simulated decline/timeout)" },
            ]}
          />
          <Input label="Transaction Notes" placeholder="e.g. Cleared via HDFC Bank Ref #9921" />
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
              Confirm Payment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

