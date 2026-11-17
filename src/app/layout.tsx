import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BillFlow — Billing & Subscription Management SaaS",
  description:
    "Centralized billing, recurring subscription management, professional invoicing, and payment tracking for modern businesses.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}

