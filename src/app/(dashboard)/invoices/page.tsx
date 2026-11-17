"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Download,
  CreditCard,
  Search,
  ExternalLink,
  Calendar,
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

const DEMO_INVOICES = [
  {
    id: "inv-1",
    invoiceNumber: "INV-2026-0042",
    customer: "TechNova Solutions Pvt Ltd",
    subtotal: 21185.59,
    taxRate: 18,
    taxAmount: 3813.41,
    total: 24999.0,
    issueDate: "2026-11-15",
    dueDate: "2026-11-30",
    status: "paid",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV-2026-0041",
    customer: "Zion Media Dynamics",
    subtotal: 12288.14,
    taxRate: 18,
    taxAmount: 2211.86,
    total: 14500.0,
    issueDate: "2026-11-14",
    dueDate: "2026-11-28",
    status: "pending",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV-2026-0040",
    customer: "Apex Cloud Services",
    subtotal: 27118.64,
    taxRate: 18,
    taxAmount: 4881.36,
    total: 32000.0,
    issueDate: "2026-10-10",
    dueDate: "2026-10-25",
    status: "overdue",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV-2026-0039",
    customer: "GreenRoots Organics",
    subtotal: 7203.39,
    taxRate: 18,
    taxAmount: 1296.61,
    total: 8500.0,
    issueDate: "2026-11-08",
    dueDate: "2026-11-22",
    status: "draft",
  },
];

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredInvoices = DEMO_INVOICES.filter((inv) => {
    const matchesTab = activeTab === "all" || inv.status === activeTab;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Invoices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Create professional tax invoices, track payment progress, and export PDFs.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Invoice
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice number or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto justify-end">
            {["all", "draft", "pending", "paid", "overdue"].map((tab) => (
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

      {/* Invoices Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Issue / Due Date</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Tax (18%)</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell>
                  <span className="font-bold text-slate-900 text-sm font-mono">
                    {inv.invoiceNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-semibold text-slate-800 text-sm">
                    {inv.customer}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  <div className="flex flex-col">
                    <span>Issued: {inv.issueDate}</span>
                    <span className="text-slate-400">Due: {inv.dueDate}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-slate-600">
                  {formatCurrency(inv.subtotal)}
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  {formatCurrency(inv.taxAmount)}
                </TableCell>
                <TableCell className="font-bold text-slate-900 text-sm">
                  {formatCurrency(inv.total)}
                </TableCell>
                <TableCell>
                  <Badge variant={inv.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      title="Download PDF"
                      leftIcon={<Download className="w-3.5 h-3.5" />}
                    >
                      PDF
                    </Button>
                    {inv.status !== "paid" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                        title="Simulate Payment"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Quick Create Invoice Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Invoice"
        description="Draft an itemized invoice for a customer or recurring subscription."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
          className="space-y-4"
        >
          <Select
            label="Customer"
            options={[
              { value: "cust-1", label: "TechNova Solutions Pvt Ltd" },
              { value: "cust-2", label: "Zion Media Dynamics" },
              { value: "cust-3", label: "Apex Cloud Services" },
            ]}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Invoice Number" defaultValue="INV-2026-0043" required />
            <Input label="Due Date" type="date" defaultValue="2026-11-30" required />
          </div>
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Line Items
            </h5>
            <div className="grid grid-cols-12 gap-2">
              <div className="col-span-6">
                <Input placeholder="Service or Product name" defaultValue="Cloud Infrastructure Monthly" />
              </div>
              <div className="col-span-2">
                <Input type="number" defaultValue="1" placeholder="Qty" />
              </div>
              <div className="col-span-4">
                <Input type="number" defaultValue="24999" placeholder="Price" />
              </div>
            </div>
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
              Generate Invoice
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

