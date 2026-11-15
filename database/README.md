# ShopVerse 3D V2 — PostgreSQL Database Architecture (Prisma)

This directory contains the production-grade PostgreSQL database schema definitions, initial migration DDL, singleton client connection setup, and database seeding logic for **ShopVerse 3D V2**.

---

## 🏗️ Architecture Overview

The database is architected for high-concurrency spatial and AI-augmented multi-vendor e-commerce:

```
                  ┌──────────────┐
                  │    Users     │
                  └──────┬───────┘
                         │
     ┌───────────────────┼──────────────────────────────┐
     │ 1:N               │ 1:N                          │ 1:N
┌────▼───────┐    ┌──────▼───────┐              ┌───────▼────────┐
│ Addresses  │    │    Orders    │              │ Product Reviews│
└────────────┘    └──────┬───────┘              └────────────────┘
                         │
        ┌────────────────┼──────────────────┐
        │ 1:N            │ 1:1              │ 1:N
 ┌──────▼──────┐   ┌─────▼───────┐    ┌─────▼──────────┐
 │ Order Items │   │  Payments   │    │ Order Timeline │
 └──────┬──────┘   └─────────────┘    └────────────────┘
        │ N:1
 ┌──────▼────────┐         ┌────────────────────┐
 │   Products    ├─────────┤    Categories      │
 └──────┬────────┘  N:1    └────────────────────┘
        │
        ├─ 1:N ── Product Images
        ├─ 1:N ── Color Variants
        ├─ 1:N ── Flash Deals
        ├─ M:N ── Product Bundles
        └─ 1:N ── Cart / Wishlists
```

---

## 📂 Directory Structure

```
/database
├── schema.prisma                  # Enterprise Prisma Schema for PostgreSQL
├── client.ts                      # Singleton PrismaClient with connection pooling
├── seed.ts                        # Seeding script for categories, products, orders & deals
├── README.md                      # Architecture, indexing & migration documentation
└── migrations/
    └── 0_init/
        └── migration.sql          # Raw PostgreSQL DDL migration script
```

---

## 📊 Core Entities & Models

### 1. Identity & Access (`users`, `addresses`)
- **`User`**: Multi-role support (`CUSTOMER`, `SELLER`, `ADMIN`, `SUPPORT_AGENT`). Tracks account status (`isBlocked`), profile avatars, contact info, and timestamps.
- **`Address`**: Normalized address entity with geospatial coordinates (`latitude`, `longitude`) for precision routing and default flag.

### 2. Catalog & 3D Spatial Hardware (`products`, `categories`, `product_images`, `product_color_variants`)
- **`Category`**: Self-referencing tree structure (`parentId`) supporting nested hierarchies, icon markers, and slugs.
- **`Product`**: High-precision decimal pricing (`Decimal(12, 2)`), stock levels, real-time flags (`inStock`, `fastDelivery`, `isFeatured`, `isTrending`), 3D Model type (`PHONE`, `LAPTOP`, `HEADPHONES`, `WATCH`, `SHOES`, `CONTROLLER`, `CUSTOM`), asset links, and technical specifications (`JSONB`).
- **`ProductImage`**: Ordered gallery images with primary banner designation.
- **`ProductColorVariant`**: Hardware finishes (hex code, finish label, inventory status).

### 3. Transactions & Fulfillment (`orders`, `order_items`, `order_timelines`, `payments`)
- **`Order`**: Immutable address snapshot (`shippingAddressSnapshot`), tracking numbers, tax breakdown (CGST/SGST itemization), status lifecycle (`ORDER_PLACED` -> `CONFIRMED` -> `PACKED` -> `SHIPPED` -> `OUT_FOR_DELIVERY` -> `DELIVERED`).
- **`OrderItem`**: Historical product snapshot (preserves name, unit price, slug, color, specs even if product catalog updates).
- **`OrderTimeline`**: Time-stamped tracking events with logistics hub locations.
- **`Payment`**: Multi-gateway support (`Razorpay`, `Stripe`, `UPI`, `COD`), transaction IDs, idempotency support, and webhook payload storage.

### 4. Deals, Bundles & Loyalty (`coupons`, `flash_deals`, `product_bundles`, `user_rewards`, `reward_transactions`)
- **`Coupon`**: Percentage and flat discount codes with usage limits, expiry, and minimum order values.
- **`FlashDeal`**: Limited-time countdown sales with velocity claim meters.
- **`ProductBundle`**: Frequently Bought Together accessories combos with bundle-level discounts.
- **`UserReward` & `RewardTransaction`**: Points balance ledger (1 Pt = ₹1), Silver/Gold/Platinum tiers, and referral codes.

### 5. Support, Customer Care & Auditing (`support_tickets`, `support_ticket_replies`, `notifications`, `audit_logs`)
- **`SupportTicket`**: Categorized helpdesk tickets (`ORDER_STATUS`, `RETURN_REFUND`, `THREE_D_AR_FEATURE`, `PAYMENT_ISSUE`, `TECHNICAL_SUPPORT`).
- **`SupportTicketReply`**: Bidirectional threaded chat (`USER`, `SUPPORT`, `AI`).
- **`Notification`**: In-app notifications with read status and deep-links.
- **`AuditLog`**: Security compliance log for administrative modifications.

---

## ⚡ Performance & Indexing Highlights

- **B-Tree Indexes**: Placed on all foreign keys (`userId`, `productId`, `orderId`, `categoryId`, `sellerId`).
- **Lookups**: Unique indexed lookups for `slug`, `email`, `orderNumber`, `trackingNumber`, `transactionId`, `referralCode`, `ticketNumber`.
- **Compound Indexes**:
  - `[isFeatured, isTrending]` for instant homepage highlights.
  - `[isActive, endsAt]` on `flash_deals` for rapid expiration queries.
  - `[userId, productId]` unique constraint on `reviews` ensuring 1 review per customer per hardware item.
  - `[userId, productId, selectedColor]` on `cart_items` for cart merging.

---

## 🚀 Getting Started & Migrations

### 1. Set Connection String in `.env`
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/shopverse3d?schema=public"
```

### 2. Generate Prisma Client
```bash
npx prisma generate --schema=database/schema.prisma
```

### 3. Run Migrations
```bash
npx prisma migrate dev --name init --schema=database/schema.prisma
```

Or apply raw SQL migration directly via `psql`:
```bash
psql -U postgres -d shopverse3d -f database/migrations/0_init/migration.sql
```

### 4. Seed the Database
```bash
npx tsx database/seed.ts
```
