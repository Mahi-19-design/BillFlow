"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { formatCurrency } from "@/lib/currency";

const DEMO_CUSTOMERS = [
  {
    id: "cust-1",
    name: "TechNova Solutions Pvt Ltd",
    email: "billing@technova.in",
    phone: "+91 98765 43210",
    city: "Bangalore",
    state: "Karnataka",
    subscriptionsCount: 2,
    totalPaid: 245000,
    outstanding: 0,
    status: "active",
  },
  {
    id: "cust-2",
    name: "Zion Media Dynamics",
    email: "accounts@zionmedia.co",
    phone: "+91 91234 56789",
    city: "Mumbai",
    state: "Maharashtra",
    subscriptionsCount: 1,
    totalPaid: 114500,
    outstanding: 14500,
    status: "active",
  },
  {
    id: "cust-3",
    name: "Apex Cloud Services",
    email: "finance@apexcloud.io",
    phone: "+91 99887 76655",
    city: "Hyderabad",
    state: "Telangana",
    subscriptionsCount: 1,
    totalPaid: 320000,
    outstanding: 32000,
    status: "active",
  },
  {
    id: "cust-4",
    name: "GreenRoots Organics",
    email: "hello@greenroots.org",
    phone: "+91 94567 89012",
    city: "Pune",
    state: "Maharashtra",
    subscriptionsCount: 0,
    totalPaid: 18500,
    outstanding: 0,
    status: "inactive",
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = DEMO_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Customers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your client accounts, contact details, and billing relationships.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Customer
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Filter className="w-3.5 h-3.5" />}
            >
              Filter
            </Button>
            <span className="text-xs text-slate-500 font-medium">
              Showing {filteredCustomers.length} of {DEMO_CUSTOMERS.length}
            </span>
          </div>
        </div>
      </Card>

      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Subscriptions</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 text-sm">
                        {customer.name}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        {customer.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {customer.city}, {customer.state}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                    {customer.subscriptionsCount} Active
                  </span>
                </TableCell>
                <TableCell className="font-semibold text-slate-900 text-sm">
                  {formatCurrency(customer.totalPaid)}
                </TableCell>
                <TableCell>
                  {customer.outstanding > 0 ? (
                    <span className="text-rose-600 font-semibold text-sm">
                      {formatCurrency(customer.outstanding)}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">₹0.00</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={customer.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Customer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Customer"
        description="Register a new client account for subscriptions and invoices."
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name / Company" placeholder="e.g. Acme Corp" required />
            <Input label="Email Address" type="email" placeholder="billing@acme.com" required />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Phone Number" placeholder="+91 98765 43210" />
            <Input label="Country" defaultValue="India" />
          </div>
          <Input label="Billing Address" placeholder="Suite 400, Financial District" required />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input label="City" placeholder="Bangalore" required />
            <Input label="State" placeholder="Karnataka" required />
            <Input label="Postal Code" placeholder="560100" required />
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
              Save Customer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

