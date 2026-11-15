# ShopVerse 3D — Total Application & Architecture Documentation
**Version:** 2.0.0 · **Architecture:** Full-Stack React 19 + TypeScript + Express + Three.js WebGL + PostgreSQL Prisma  
**Platform Classification:** Next-Generation 3D Spatial E-Commerce Marketplace & Multi-Vendor Selling System  

---

## Table of Contents
1. [Executive Summary & System Overview](#1-executive-summary--system-overview)
2. [High-Level Architecture & Tech Stack](#2-high-level-architecture--tech-stack)
3. [Database Architecture & PostgreSQL Schema (Prisma)](#3-database-architecture--postgresql-schema-prisma)
4. [User Authentication & Direct Google OAuth System](#4-user-authentication--direct-google-oauth-system)
5. [Product Selling System & Store Owner Controls (Seller Hub)](#5-product-selling-system--store-owner-controls-seller-hub)
6. [Platform Master Owner Governance (Admin Console)](#6-platform-master-owner-governance-admin-console)
7. [Interactive 3D WebGL Canvas Engine & Spatial Mall](#7-interactive-3d-webgl-canvas-engine--spatial-mall)
8. [End-to-End E-Commerce Customer Journey](#8-end-to-end-e-commerce-customer-journey)
9. [REST API Specification Reference](#9-rest-api-specification-reference)
10. [Internationalization, Loyalty & AI Assistant](#10-internationalization-loyalty--ai-assistant)
11. [Installation, Environment & Deployment Guide](#11-installation-environment--deployment-guide)

---

## 1. Executive Summary & System Overview

**ShopVerse 3D** is a spatial e-commerce platform that replaces static 2D product photos with real-time, interactive 3D WebGL models. Shoppers can orbit, inspect materials, toggle color variations, and test hardware features before placing an order.

### Core Objectives
- **Zero-Friction 3D Inspection:** Instant rendering of complex hardware (smartphones, laptops, studio headphones, smartwatches, sneakers, controllers) using procedural Three.js geometry and PBR (Physically Based Rendering) shaders.
- **Dual-Tier Multi-Vendor Selling Engine:**
  - **Store Owner Controls (Seller Hub):** Complete autonomy for verified merchants to publish 3D inventory, pause/resume listings, conduct 1-click restocks, manage fulfillment pipelines, print tax-compliant packing slips, and withdraw earnings.
  - **Master Owner Governance (Admin Console):** Global economic policy configuration (take-rate commission cut, minimum payout rules), merchant onboarding & verification, catalog moderation, payout audit releases, and account security.
- **Enterprise-Grade Direct Google OAuth 2.0:** Secure single sign-on with Google Identity Services alongside email/password authentication.
- **Comprehensive E-Commerce Suite:** Cart, wishlist, coupon engine, 4-step multi-gateway checkout (UPI, Cards, NetBanking, EMI, COD), milestone tracking timelines, customer reviews, and loyalty rewards points.

---

## 2. High-Level Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                                │
│                                                                         │
│  ┌─────────────────────────┐  ┌──────────────────────────────────────┐  │
│  │    React 19 Frontend    │  │    Three.js WebGL Spatial Canvas     │  │
│  │   • Tailwind CSS v4     │  │   • 3D PBR Shaders & Dynamic Lights  │  │
│  │   • Lucide Icons        │  │   • OrbitControls, Mesh Swatches     │  │
│  │   • Canvas Confetti     │  │   • Exploded Wireframe View          │  │
│  └───────────┬─────────────┘  └──────────────────┬───────────────────┘  │
│              │                                   │                      │
│              └─────────────────┬─────────────────┘                      │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │ HTTP / JSON API (Port 3000)
┌────────────────────────────────▼────────────────────────────────────────┐
│                        EXPRESS + VITE SERVER                            │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │ • Vite Middleware (HMR & Asset Pipeline)                          │  │
│  │ • Express Router (/api/auth, /api/products, /api/orders, etc.)    │  │
│  │ • Google OAuth 2.0 Identity Token Verification                    │  │
│  │ • Google Gemini AI Assistant Integration                          │  │
│  └─────────────────────────────────┬─────────────────────────────────┘  │
└────────────────────────────────────┼────────────────────────────────────┘
                                     │ Prisma ORM / SQL
┌────────────────────────────────────▼────────────────────────────────────┐
│                      POSTGRESQL DATABASE CLOUD                          │
│                                                                         │
│   Users · Products · Orders · OrderItems · Reviews · Coupons · Payouts  │
└─────────────────────────────────────────────────────────────────────────┘
```

### Technology Matrix
| Layer | Technologies Used | Key Responsibilities |
|---|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite 8 | Reactive component tree, SPA routing, state persistence |
| **Styling & Design** | Tailwind CSS v4 (`@tailwindcss/vite`) | Dark cybernetic theme, responsive grid, zero-pill layout |
| **3D Rendering** | Three.js (`@types/three`), WebGL | 6 Procedural 3D device meshes, lighting, shadows, materials |
| **Full-Stack Backend** | Node.js, Express 4, `tsx` | RESTful API routes, auth controller, business logic |
| **Database ORM** | Prisma 5 / PostgreSQL | Relational schema definitions, migrations, relational integrity |
| **Identity & Auth** | Google OAuth 2.0 Client, Crypto Salt | Direct Google Sign-In, session persistence |
| **AI Integration** | `@google/genai` (Google Gemini API) | Spatial shopping concierge & natural language recommendation |

---

## 3. Database Architecture & PostgreSQL Schema (Prisma)

The relational schema is configured in `/database/schema.prisma` and mirrored in SQL migrations.

### Entity Relationship Model

```
+------------------+          +-------------------+          +--------------------+
|      User        | 1      * |      Product      | 1      * |       Order        |
|------------------|----------|-------------------|----------|--------------------|
| id (PK)          |          | id (PK)           |          | id (PK)            |
| email (Unique)   |          | name              |          | userId (FK)        |
| password         |          | brand             |          | customerName       |
| name             |          | category          |          | totalAmount        |
| role             |          | price             |          | orderStatus        |
| provider         |          | originalPrice     |          | paymentStatus      |
| providerId       |          | stock             |          | courierPartner     |
| isBlocked        |          | lowStockThreshold |          | trackingNumber     |
| createdAt        |          | model3D           |          | createdAt          |
+------------------+          | isPaused          |          +---------+----------+
                              | isFeatured        |                    | 1
                              | isTrending        |                    |
                              | sellerId (FK)     |                    | *
                              +---------+---------+          +---------+----------+
                                        | 1                  |     OrderItem      |
                                        |                    |--------------------|
                                        | *                  | id (PK)            |
                              +---------+---------+          | orderId (FK)       |
                              |      Review       |          | productId (FK)     |
                              |-------------------|          | quantity           |
                              | id (PK)           |          | price              |
                              | productId (FK)    |          | selectedColor      |
                              | userId (FK)       |          +--------------------+
                              | rating            |
                              | comment           |
                              +-------------------+
```

### Table Definitions

#### 1. `User` Table
- `id` (String, Primary Key): Unique CUID/UUID identifier.
- `email` (String, Unique): Customer or Merchant electronic address.
- `password` (String, Nullable): Salted/hashed credential (null for direct Google logins).
- `name` (String): Full display name.
- `role` (Enum: `CUSTOMER`, `SELLER`, `ADMIN`): Access tier determining UI views.
- `provider` (String: `email` or `google`): Identity provider source.
- `providerId` (String, Nullable): Google `sub` unique account identifier.
- `isBlocked` (Boolean): Account suspension status flag.
- `createdAt` / `updatedAt` (DateTime): Audit timestamps.

#### 2. `Product` Table
- `id` (String, Primary Key): Unique alphanumeric product code.
- `name` (String): Listing title.
- `brand` (String): Manufacturer or brand name.
- `category` (String): E.g., `Mobiles`, `Electronics`, `Audio`, `Wearables`, `Footwear`, `Gaming`.
- `sku` (String, Nullable): Store inventory Stock Keeping Unit.
- `price` (Float): Current active selling price.
- `originalPrice` (Float): MRP / list price for discount computation.
- `discountPercentage` (Int): Calculated markdown percentage.
- `stock` (Int): Available warehouse units.
- `lowStockThreshold` (Int): Alert trigger limit (default: 5 units).
- `inStock` (Boolean): Automatic binary flag derived from `stock > 0`.
- `model3D` (String): 3D Mesh procedural archetype (`phone`, `laptop`, `headphones`, `watch`, `shoes`, `controller`).
- `colorVariants` (JSON): Array of color swatches containing `{ name, hex }`.
- `specifications` (JSON): Key-value technical specifications map.
- `isPaused` (Boolean): Merchant soft-pause flag (hides from cart without deleting listing).
- `isFeatured` (Boolean): Platform admin hero mall carousel highlight.
- `isTrending` (Boolean): High-velocity sales badge flag.
- `approvalStatus` (String: `approved`, `pending`, `flagged`): Moderation tier.
- `sellerId` / `sellerName` (String): Originating merchant store association.

#### 3. `Order` & `OrderItem` Tables
- `Order.id` (String, Primary Key): Format `SV-XXXXXX`.
- `Order.totalAmount` (Float): Grand total including discounts and shipping.
- `Order.orderStatus` (Enum: `Confirmed`, `Packed`, `Shipped`, `Out for Delivery`, `Delivered`, `Cancelled`).
- `Order.paymentStatus` (Enum: `Paid`, `Pending`, `Refunded`).
- `Order.courierPartner` (String): Logistics carrier (e.g. *Delhivery Surface & Air Priority*, *BlueDart*).
- `Order.trackingNumber` (String): Unique AWB logistics code.
- `Order.timeline` (JSON): Milestone history array for real-time progress visualization.

---

## 4. User Authentication & Direct Google OAuth System

ShopVerse 3D includes a dual authentication mechanism:

```
                      ┌────────────────────────────┐
                      │    User Triggers Login     │
                      └─────────────┬──────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  │                                   │
      [Click Google Sign-In]               [Email & Password Form]
                  │                                   │
┌─────────────────▼─────────────────┐   ┌─────────────▼───────────────┐
│   Google Account Direct Modal     │   │ Password Strength Validation│
│ • One-Click Account Selection     │   │ • Uppercase, Number, Length │
│ • Profile: Name, Email, Avatar    │   │ • Role Selection:           │
│ • Direct OAuth Identity Token     │   │   Customer / Seller / Admin │
└─────────────────┬─────────────────┘   └─────────────┬───────────────┘
                  │                                   │
                  └─────────────────┬─────────────────┘
                                    │
                      ┌─────────────▼──────────────┐
                      │  Express Auth Controller   │
                      │  • /api/auth/google        │
                      │  • /api/auth/login         │
                      │  • /api/auth/register      │
                      └─────────────┬──────────────┘
                                    │
                      ┌─────────────▼──────────────┐
                      │ Session Stored & RBAC Set  │
                      │ • Profile Badge Updated    │
                      │ • Store / Admin View Open  │
                      └────────────────────────────┘
```

### Components
- **`GoogleAccountModal.tsx`:** Modern Google Identity selector displaying active Google Profiles with security badges and Google branding.
- **`AuthModal.tsx`:** Complete tabbed Sign-In / Sign-Up system featuring live password strength bar, instant validation, and role selector.
- **`UserProfileView.tsx`:** Account management suite showing Google-authenticated badge, role status, address book, and security settings.

---

## 5. Product Selling System & Store Owner Controls (Seller Hub)

Designed for independent merchants and hardware store owners (`SellerDashboard.tsx`).

### Key Features
1. **Catalog Management & Stock Control:**
   - **Pause / Resume Listing Switch:** Toggle products between *Live on Mall* and *Paused* without losing reviews, SEO ranking, or sales history.
   - **Quick Restock:** 1-click `+10` and `+25` unit inventory replenishments.
   - **Stock Health Indicators:** Visual thresholds for Normal, Low Stock (≤ 5 units), and Out of Stock.
2. **Product Editing Modal (`EditProductModal.tsx`):**
   - Live updates to Selling Price, MRP, Title, Brand, Category, Low-Stock Alert Level.
   - Custom 3D Color Swatch builder with HTML5 color picker.
   - 24-Hour Express Delivery guarantee toggle.
3. **Publish 3D Product Wizard:**
   - Configures procedural 3D mesh architecture (`phone`, `laptop`, `headphones`, `watch`, `shoes`, `controller`).
   - Generates unique SKU and computes EMI installment estimates.
4. **Logistics & Order Fulfillment Pipeline:**
   - Progression through `Confirmed` → `Packed` → `Shipped` → `Out for Delivery` → `Delivered`.
   - Courier assignment (*Delhivery*, *BlueDart*, *FedEx*, *DHL*) and tracking AWB input.
5. **Printable Packing Slip & Tax Manifest (`PackingSlipModal.tsx`):**
   - Formatted for `@media print` with Warehouse GSTIN, Customer Destination, Itemized 3D Variants, and Barcode references.
6. **Merchant Payout & Earnings Suite (`PayoutModal.tsx`):**
   - Real-time gross revenue, platform fee deductions (e.g. 8.5%), and withdrawable net earnings.
   - Payout requests to verified Bank Accounts (IMPS/NEFT) or UPI VPAs.
   - Historical audit settlement ledger.
7. **Storefront & Vacation Mode:**
   - Operating mode toggle to pause fulfillment without taking down listings.

---

## 6. Platform Master Owner Governance (Admin Console)

Designed for the marketplace operator (`AdminDashboard.tsx`).

### Governance Capabilities
1. **Global Platform Economics:**
   - **Dynamic Take-Rate Slider (0% to 25%):** Adjusts marketplace fee across transactions in real time.
   - Minimum withdrawal threshold configuration.
   - Global marketplace broadcast announcement banner.
2. **Merchant Storefront Governance:**
   - Merchant directory with verified badge assignment (*Verified 3D Merchant*).
   - Storefront suspension controls for fraud prevention.
   - Custom commission take-rate overrides per vendor (e.g. VIP 7% vs standard 8.5%).
3. **Catalog Moderation & Mall Curation:**
   - 1-click **Hero Showcase Feature** (highlights product in the 3D Mall carousel).
   - 1-click **Trending Badge** for high-demand items.
   - Content moderation and listing takedowns.
4. **Payout Auditing Queue:**
   - Review pending merchant payout requests.
   - Approve and release funds with banking transaction UTR codes or reject with audit notes.
5. **Promotional Coupons Engine:**
   - Issue percentage or flat-discount voucher codes with minimum order limits and expiry dates.
6. **Account & Access Governance:**
   - Role reassignment (`customer`, `seller`, `admin`).
   - Account suspensions with instant session revocation.

---

## 7. Interactive 3D WebGL Canvas Engine & Spatial Mall

### Three.js Scene Composition
Every product in ShopVerse 3D is rendered dynamically via Three.js in `ProductCanvas3D.tsx` and `Mall3DModal.tsx`:
- **Lighting Setup:**
  - Ambient Light (intensity: 0.8) for base illumination.
  - Directional Sun Light (intensity: 1.4, position: `[5, 10, 7]`) casting soft shadows.
  - Cyan & Purple Rim Accent Lights (intensity: 0.6) producing a cybernetic glow.
- **Procedural 3D Mesh Geometries:**
  1. `phone`: Rounded rectangular chassis, edge bevels, camera bump with 3 triple lenses, and glossy front display.
  2. `laptop`: Dual-part hinged model featuring lower keyboard deck, touchpad, and slim bezel screen.
  3. `headphones`: Curved torus headband, adjustable metal sliders, and padded acoustic earcups.
  4. `watch`: Chamfered cylindrical casing, bezel ring, crown dial, and textured silicone dual straps.
  5. `shoes`: Ergonomic sole profile, aerodynamic midsole, and multi-panel sneaker upper.
  6. `controller`: Ergonomic grip handles, thumbsticks, directional D-Pad, and action trigger bumpers.
- **Interactive Controls:**
  - Orbit rotation, smooth panning, and pinch-to-zoom.
  - Auto-rotation toggle (gentle turntable showcase).
  - Dynamic color variant switching: Replaces material color/roughness in real-time.
  - Exploded / Wireframe toggle: Reveals internal engineering and polygon topology.

---

## 8. End-to-End E-Commerce Customer Journey

```
[Home Page & 3D Hero Carousel]
             │
             ▼
[Interactive Marketplace / Catalog]  ───► [Compare Products Matrix]
             │
             ▼
[3D Quick View or Full Product Details]
  • 360° Three.js Model Rotation
  • Live Color Swatch Swapping
  • Customer Reviews & Star Ratings
             │
             ▼
[Cart & Promotional Coupon Application]
             │
             ▼
[4-Step Checkout Pipeline]
  1. Address Selection & Pincode Validation
  2. Delivery Speed (Standard vs 24h Express)
  3. Payment Gateway (UPI, Card, NetBanking, COD, EMI)
  4. Order Confirmation & Confetti Celebration
             │
             ▼
[Real-Time Order Tracking & Milestone Timeline]
```

---

## 9. REST API Specification Reference

### Authentication Endpoints
- `POST /api/auth/register`: Create user account (`name`, `email`, `password`, `role`).
- `POST /api/auth/login`: Authenticate existing email/password account.
- `POST /api/auth/google`: Process direct Google OAuth token and return user profile.
- `GET /api/auth/me`: Retrieve current active user session.

### Products & Inventory Endpoints
- `GET /api/products`: Retrieve all active products with search, category, and price filters.
- `GET /api/products/:id`: Get detailed single product by ID.
- `POST /api/products`: Publish a new 3D product listing (Merchant).
- `PUT /api/products/:id`: Update price, stock, variants, or pause status (Merchant/Admin).
- `DELETE /api/products/:id`: Remove listing from catalog (Merchant/Admin).

### Orders & Logistics Endpoints
- `GET /api/orders`: Retrieve orders (filtered by customer ID or merchant).
- `GET /api/orders/:id`: Get order details with timeline and tracking info.
- `POST /api/orders`: Place new customer order.
- `PUT /api/orders/:id`: Update order status, courier carrier, and tracking AWB.

### Reviews & Coupons Endpoints
- `GET /api/products/:id/reviews`: Retrieve customer reviews for a product.
- `POST /api/reviews`: Submit verified customer rating and feedback.
- `GET /api/coupons`: List active platform discount vouchers.
- `POST /api/coupons/apply`: Validate coupon code against subtotal.
- `POST /api/coupons`: Create new promotional coupon (Admin).
- `DELETE /api/coupons/:code`: Revoke coupon voucher (Admin).

### Admin Metrics Endpoint
- `GET /api/admin/stats`: Get GMV, total orders, active products, and customer counts.

---

## 10. Internationalization, Loyalty & AI Assistant

- **Trilingual Support (`/src/i18n`):** Full localization support for **English (EN)**, **Hindi (हिन्दी)**, and **Telugu (తెలుగు)**.
- **Loyalty Rewards Engine (`LoyaltyRewardsModal.tsx`):** Customers earn 10 points per ₹100 spent, redeemable for instant checkout discounts.
- **AI Shopping Assistant (`AIAssistantModal.tsx`):** Powered by the modern `@google/genai` TypeScript SDK (Gemini 2.5 Flash), providing smart hardware comparisons, budget advice, and compatibility checks.

---

## 11. Installation, Environment & Deployment Guide

### Prerequisites
- Node.js version 18.0 or higher.
- npm version 9.0 or higher.

### Environment Setup (`.env.example`)
```env
# Server Port
PORT=3000

# Google Gemini AI Assistant API Key
GEMINI_API_KEY=your_gemini_api_key_here

# PostgreSQL Database Connection URL
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/shopverse3d?schema=public
```

### Run Commands
```bash
# 1. Install all dependencies
npm install

# 2. Start Full-Stack Dev Server (Express + Vite on Port 3000)
npm run dev

# 3. Validate TypeScript Codebase
npm run lint

# 4. Compile Production Build
npm run build

# 5. Launch Production Server
npm start
```

---

*ShopVerse 3D — Spatial Hardware E-Commerce. Precision Engineered.*
