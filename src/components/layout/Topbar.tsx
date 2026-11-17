"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Plus,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../ui/Button";

interface TopbarProps {
  onOpenMobileNav: () => void;
}

const ROUTE_NAMES: Record<string, string> = {
  "/": "Overview",
  "/customers": "Customers",
  "/products": "Products & Plans",
  "/subscriptions": "Subscriptions",
  "/invoices": "Invoices",
  "/invoices/create": "Create Invoice",
  "/payments": "Payments",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileNav }) => {
  const pathname = usePathname();
  const currentTitle = ROUTE_NAMES[pathname] || "Dashboard";

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
          aria-label="Open navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-slate-800 transition-colors">
            BillFlow
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">{currentTitle}</span>
        </nav>
      </div>

      {/* Center: Search input */}
      <div className="hidden lg:flex items-center max-w-xs w-full">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customers, invoices, plans..."
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right: Currency pill, Quick Actions & Notifications */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs font-medium border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>INR (₹) Sandbox</span>
        </div>

        <Link href="/invoices">
          <Button size="sm" variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
            <span className="hidden sm:inline">New</span> Invoice
          </Button>
        </Link>

        <button
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};

