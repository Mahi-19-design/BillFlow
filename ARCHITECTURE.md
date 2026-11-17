# BillFlow — Architecture & Technical Specifications

## 1. System Overview
**BillFlow** is a billing and subscription management SaaS engineered for freelancers, startups, and small businesses. It operates as a single business workspace platform providing full visibility and control over customers, product catalogs, multi-tier pricing plans, recurring subscriptions, invoices, and simulated payment collections.

---

## 2. Technology Stack & Key Dependencies

- **Frontend & App Framework**: Next.js 14+ (App Router), React 18/19, TypeScript
- **Styling & UI**: Tailwind CSS, Lucide React (feather-style modern icons), clsx, tailwind-merge
- **Data Visualizations**: Recharts (responsive SVG charts for revenue trends, subscription breakdowns)
- **PDF Generation**: jsPDF + jspdf-autotable (client-side & server-side friendly professional invoice generation)
- **Database & ODM**: MongoDB with Mongoose
- **Validation**: Zod (isomorphic runtime validation on client forms and Next.js route handlers)
- **AI Integrations (Phase 9)**: Groq SDK / OpenAI-compatible endpoint for business summaries and invoice descriptions

---

## 3. Directory & Folder Structure (App Router)

```
nextjs-project/
├── .env.example
├── .gitignore
├── DEVELOPMENT_PROGRESS.md
├── ARCHITECTURE.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
├── public/
│   └── brand/
│       └── logo.svg
└── src/
    ├── app/
    │   ├── layout.tsx                     # Root layout with Inter font, toast/notifications, metadata
    │   ├── page.tsx                       # Dashboard / Overview redirect or main view
    │   ├── globals.css                    # Tailwind directives & theme custom utilities
    │   │
    │   ├── (dashboard)/                   # Shared dashboard shell route group
    │   │   ├── layout.tsx                 # Persistent collapsible Sidebar + Topbar header
    │   │   ├── page.tsx                   # Overview Dashboard (MRR, revenue, charts, activity)
    │   │   ├── customers/
    │   │   │   ├── page.tsx               # Customers list, filter, search, create modal
    │   │   │   └── [id]/
    │   │   │       └── page.tsx           # Customer 360° detail (subscriptions, invoices, payments)
    │   │   ├── products/
    │   │   │   └── page.tsx               # Products & Pricing Plans manager (tabs/cards, modals)
    │   │   ├── subscriptions/
    │   │   │   ├── page.tsx               # Subscriptions table, filter, lifecycle actions
    │   │   │   └── [id]/
    │   │   │       └── page.tsx           # Subscription detail & history timeline
    │   │   ├── invoices/
    │   │   │   ├── page.tsx               # Invoices table, status badges, PDF download
    │   │   │   ├── create/
    │   │   │   │   └── page.tsx           # Multi-line invoice builder with tax & discount
    │   │   │   └── [id]/
    │   │   │       └── page.tsx           # Invoice preview & payment recording
    │   │   ├── payments/
    │   │   │   └── page.tsx               # Simulated transactions ledger, filters, record modal
    │   │   ├── analytics/
    │   │   │   └── page.tsx               # Deep-dive financial & subscription metrics
    │   │   └── settings/
    │   │       └── page.tsx               # Workspace profile, currency (₹ default), tax rates
    │   │
    │   └── api/                           # Backend Route Handlers
    │       ├── customers/
    │       │   ├── route.ts               # GET (list/search/page), POST (create)
    │       │   └── [id]/
    │       │       └── route.ts           # GET (detail), PUT (update), DELETE (with safety check)
    │       ├── products/
    │       │   ├── route.ts               # GET (list), POST (create)
    │       │   └── [id]/
    │       │       └── route.ts           # PUT (update), DELETE
    │       ├── pricing-plans/
    │       │   ├── route.ts               # GET (list by product), POST (create)
    │       │   └── [id]/
    │       │       └── route.ts           # PUT, DELETE
    │       ├── subscriptions/
    │       │   ├── route.ts               # GET, POST
    │       │   └── [id]/
    │       │       ├── route.ts           # GET, PUT (update status: pause/resume/cancel/tier)
    │       │       └── renew/
    │       │           └── route.ts       # POST (simulate renewal & invoice generation)
    │       ├── invoices/
    │       │   ├── route.ts               # GET, POST (create manual or from subscription)
    │       │   └── [id]/
    │       │       ├── route.ts           # GET, PUT (draft update), DELETE
    │       │       └── pdf/
    │       │           └── route.ts       # Server-side PDF export or stream
    │       ├── payments/
    │       │   ├── route.ts               # GET, POST (record simulated payment & reconcile invoice)
    │       │   └── [id]/
    │       │       └── route.ts           # GET, PUT (status update)
    │       ├── analytics/
    │       │   └── route.ts               # Aggregation pipeline for MRR, revenue, churn, statuses
    │       └── ai/
    │           ├── invoice-description/
    │           │   └── route.ts           # LLM prompt for line-item descriptions
    │           ├── assistant/
    │           │   └── route.ts           # RAG-style query on DB data
    │           └── summary/
    │               └── route.ts           # Monthly business executive summary
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.tsx                # Collapsible deep navy sidebar with active states
    │   │   ├── Topbar.tsx                 # Header with breadcrumbs, quick search, notification pill
    │   │   └── MobileNav.tsx              # Responsive sheet/drawer for mobile
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Select.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Badge.tsx                  # Status pill (active, paused, draft, paid, overdue, etc.)
    │   │   ├── Card.tsx
    │   │   ├── Table.tsx                  # Reusable sortable/paginated table
    │   │   ├── EmptyState.tsx
    │   │   ├── LoadingSpinner.tsx
    │   │   └── Toast.tsx
    │   ├── dashboard/
    │   │   ├── MetricCard.tsx             # Stat display with change indicators
    │   │   ├── RevenueChart.tsx           # Monthly area/bar chart
    │   │   ├── SubscriptionGrowthChart.tsx# Multi-line subscription trend
    │   │   ├── StatusPieChart.tsx         # Payment & invoice status breakdowns
    │   │   └── RecentActivityList.tsx     # Feed of recent payments & subscriptions
    │   ├── invoices/
    │   │   ├── InvoiceLineItems.tsx       # Dynamic line items row adder & math
    │   │   ├── InvoicePreview.tsx         # Styled print-ready invoice template
    │   │   └── PDFDownloadButton.tsx      # jsPDF client generator
    │   └── payments/
    │       └── RecordPaymentModal.tsx     # Simulated checkout / payment dialog
    │
    ├── lib/
    │   ├── db.ts                          # Cached Mongoose connection helper
    │   ├── currency.ts                    # Formatter for INR (₹) and multi-currency formatting
    │   ├── calculations.ts                # Server-safe monetary math (subtotal, tax, discounts, totals)
    │   ├── pdf-generator.ts               # jsPDF invoice layout engine
    │   └── utils.ts                       # Classnames merger & string formatting
    │
    ├── models/                            # Mongoose Schemas & Models
    │   ├── Customer.ts
    │   ├── Product.ts
    │   ├── PricingPlan.ts
    │   ├── Subscription.ts
    │   ├── Invoice.ts
    │   └── Payment.ts
    │
    ├── types/                             # TypeScript definitions & interfaces
    │   ├── customer.ts
    │   ├── product.ts
    │   ├── subscription.ts
    │   ├── invoice.ts
    │   ├── payment.ts
    │   └── analytics.ts
    │
    └── validations/                       # Zod Validation Schemas
        ├── customer.schema.ts
        ├── product.schema.ts
        ├── subscription.schema.ts
        ├── invoice.schema.ts
        └── payment.schema.ts
```

---

## 4. Database Schema Design (Mongoose)

### 4.1. Customer
```typescript
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  billingAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'India' },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
// Indexes: email (unique), name (text)
```

### 4.2. Product
```typescript
{
  name: { type: String, required: true, trim: true },
  description: { type: String },
  category: { type: String, default: 'Software' }, // SaaS, Consulting, Service, Support
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
// Indexes: name, isActive
```

### 4.3. PricingPlan
```typescript
{
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
  name: { type: String, required: true }, // e.g. "Pro Monthly", "Enterprise Annual"
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'INR' },
  billingInterval: { type: String, enum: ['monthly', 'yearly', 'one-time'], required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 4.4. Subscription
```typescript
{
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  pricingPlanId: { type: Schema.Types.ObjectId, ref: 'PricingPlan', required: true },
  startDate: { type: Date, required: true },
  nextBillingDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'paused', 'cancelled', 'past_due'], default: 'active', index: true },
  billingAmount: { type: Number, required: true },
  billingInterval: { type: String, enum: ['monthly', 'yearly', 'one-time'], required: true },
  subscriptionHistory: [
    {
      action: { type: String, enum: ['created', 'activated', 'paused', 'resumed', 'cancelled', 'plan_changed'] },
      timestamp: { type: Date, default: Date.now },
      details: { type: String },
      previousPlanId: { type: Schema.Types.ObjectId, ref: 'PricingPlan' },
      newPlanId: { type: Schema.Types.ObjectId, ref: 'PricingPlan' }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 4.5. Invoice
```typescript
{
  invoiceNumber: { type: String, required: true, unique: true, index: true }, // e.g. "INV-2026-0001"
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription', required: false },
  lineItems: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      unitPrice: { type: Number, required: true, min: 0 },
      amount: { type: Number, required: true } // quantity * unitPrice
    }
  ],
  subtotal: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  taxRate: { type: Number, default: 18, min: 0 }, // e.g. 18% GST
  taxAmount: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
  issueDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['draft', 'pending', 'paid', 'overdue'], default: 'pending', index: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 4.6. Payment (Simulated)
```typescript
{
  invoiceId: { type: Schema.Types.ObjectId, ref: 'Invoice', required: true, index: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  amount: { type: Number, required: true, min: 0.01 },
  paymentMethod: { type: String, enum: ['bank_transfer', 'upi', 'cash', 'card'], required: true },
  paymentDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['successful', 'pending', 'failed'], default: 'successful', index: true },
  transactionReference: { type: String, required: true, unique: true }, // e.g. "TXN-SIM-XXXXXXXX"
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 5. Business Logic & Calculation Rules

1. **Monetary Precision**: All monetary values are handled in standard base units with round-to-2-decimal precision (`Math.round(val * 100) / 100`) to completely eliminate floating-point drift.
2. **Invoice Math**:
   - `lineItem.amount = lineItem.quantity * lineItem.unitPrice`
   - `subtotal = sum(lineItems.map(item => item.amount))`
   - `taxableAmount = max(0, subtotal - discount)`
   - `taxAmount = (taxableAmount * taxRate) / 100`
   - `total = taxableAmount + taxAmount`
3. **Monthly Recurring Revenue (MRR)**:
   - Sum of normalized monthly amounts for all subscriptions where `status === 'active'`.
   - Monthly plans: `billingAmount * 1`
   - Yearly plans: `billingAmount / 12`
   - One-time purchases: `0` (excluded from MRR).
   - Paused, cancelled, or past-due subscriptions: `0` (excluded from MRR).
4. **Payment Reconciliation**:
   - Total paid on an invoice = `sum(successful payments for that invoiceId)`.
   - If `totalPaid >= invoice.total`, invoice `status` automatically shifts to `paid`.
   - Partial payments are permitted; remaining balance = `invoice.total - totalPaid`.
   - Prevent recording a successful payment where `payment.amount > remainingBalance`.
   - Failed or pending payments do not reduce the balance and are excluded from collected revenue.
5. **Overdue Invoices**:
   - An invoice is considered `overdue` if `currentDate > dueDate` and `status !== 'paid'`.

---

## 6. API Error Handling Strategy
- Consistent JSON error response schema:
  ```json
  {
    "success": false,
    "error": {
      "code": "VALIDATION_ERROR | NOT_FOUND | CONFLICT | BAD_REQUEST | SERVER_ERROR",
      "message": "Human readable explanation",
      "details": []
    }
  }
  ```
- All endpoints validate inputs using Zod schemas before touching MongoDB.
- Safe deletion guards: A customer cannot be deleted if active subscriptions or unpaid invoices exist; a product/plan cannot be deleted if referenced by existing subscriptions (inactivation recommended).

---

## 7. Acceptance Criteria for Phase 0
- [x] Workspace audited and environment verified (Node.js v25.2.1, npm 11.6.2, Git master).
- [x] Clean directory structure mapped out.
- [x] All 6 relational Mongoose entities specified with validation rules, relationships, and indexing.
- [x] Business calculation rules strictly defined.
- [x] DEVELOPMENT_PROGRESS.md created and updated.
- [x] Architecture specifications documented.
- [x] Awaiting user review and authorization to begin Phase 1.

