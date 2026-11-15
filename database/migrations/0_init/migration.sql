-- =============================================================================
-- ShopVerse 3D V2 — PostgreSQL Initial Migration DDL
-- Generated from /database/schema.prisma
-- =============================================================================

-- 1. Create Enums
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN', 'SUPPORT_AGENT');
CREATE TYPE "AddressType" AS ENUM ('HOME', 'WORK', 'OTHER');
CREATE TYPE "Model3DType" AS ENUM ('PHONE', 'LAPTOP', 'HEADPHONES', 'WATCH', 'SHOES', 'CONTROLLER', 'CUSTOM');
CREATE TYPE "OrderStatus" AS ENUM ('ORDER_PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RETURNED');
CREATE TYPE "PaymentMethod" AS ENUM ('UPI', 'CARD', 'NETBANKING', 'COD', 'WALLET');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE "CouponType" AS ENUM ('PERCENT', 'FLAT');
CREATE TYPE "RewardTier" AS ENUM ('SILVER', 'GOLD', 'PLATINUM');
CREATE TYPE "RewardTxType" AS ENUM ('EARNED', 'REDEEMED', 'EXPIRED', 'ADJUSTED');
CREATE TYPE "TicketCategory" AS ENUM ('ORDER_STATUS', 'RETURN_REFUND', 'THREE_D_AR_FEATURE', 'PAYMENT_ISSUE', 'TECHNICAL_SUPPORT');
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED');
CREATE TYPE "ReplySender" AS ENUM ('USER', 'SUPPORT', 'AI');
CREATE TYPE "NotificationType" AS ENUM ('ORDER', 'DEAL', 'PRICE_DROP', 'STOCK', 'SYSTEM');

-- 2. Users Table
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "avatar" TEXT,
    "provider" TEXT DEFAULT 'email',
    "providerId" TEXT,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "emailVerified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- 3. Addresses Table
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "flat" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "landmark" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "addressType" "AddressType" NOT NULL DEFAULT 'HOME',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- 4. Categories Table (Hierarchical)
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT,
    "iconName" TEXT NOT NULL DEFAULT 'Sparkles',
    "imageUrl" TEXT,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- 5. Products Table
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" DECIMAL(12,2) NOT NULL,
    "originalPrice" DECIMAL(12,2) NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "fastDelivery" BOOLEAN NOT NULL DEFAULT false,
    "emiStartsAt" DECIMAL(10,2),
    "model3D" "Model3DType" NOT NULL DEFAULT 'CUSTOM',
    "model3DUrl" TEXT,
    "specifications" JSONB NOT NULL DEFAULT '{}',
    "rating" DECIMAL(3,2) NOT NULL DEFAULT 0.0,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isTrending" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sellerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- 6. Product Images Table
CREATE TABLE "product_images" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- 7. Product Color Variants Table
CREATE TABLE "product_color_variants" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_color_variants_pkey" PRIMARY KEY ("id")
);

-- 8. Reviews Table
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "verifiedPurchase" BOOLEAN NOT NULL DEFAULT false,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "images" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- 9. Cart Items Table
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "selectedColor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- 10. Wishlist Items Table
CREATE TABLE "wishlist_items" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "folder" TEXT DEFAULT 'Favorites',
    "notes" TEXT,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- 11. Coupons Table
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL,
    "type" "CouponType" NOT NULL DEFAULT 'PERCENT',
    "minOrder" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "maxDiscount" DECIMAL(10,2),
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- 12. Orders Table
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "addressId" TEXT,
    "shippingAddressSnapshot" JSONB NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'ORDER_PLACED',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'UPI',
    "subtotal" DECIMAL(12,2) NOT NULL,
    "discount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "deliveryFee" DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "couponId" TEXT,
    "trackingNumber" TEXT,
    "carrier" TEXT DEFAULT 'BlueDart Air Express',
    "estimatedDelivery" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- 13. Order Items Table
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "productSlug" TEXT NOT NULL,
    "productImage" TEXT,
    "selectedColor" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "totalPrice" DECIMAL(12,2) NOT NULL,
    "specificationsSnapshot" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- 14. Order Timelines Table
CREATE TABLE "order_timelines" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_timelines_pkey" PRIMARY KEY ("id")
);

-- 15. Payments Table
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "gatewayProvider" TEXT NOT NULL DEFAULT 'Razorpay',
    "gatewayOrderId" TEXT,
    "gatewayPaymentId" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'UPI',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "gatewayFee" DECIMAL(8,2),
    "gatewayResponse" JSONB NOT NULL DEFAULT '{}',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- 16. Flash Deals Table
CREATE TABLE "flash_deals" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "dealPrice" DECIMAL(12,2) NOT NULL,
    "originalPrice" DECIMAL(12,2) NOT NULL,
    "discountPercentage" INTEGER NOT NULL,
    "stockLeft" INTEGER NOT NULL,
    "totalStock" INTEGER NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flash_deals_pkey" PRIMARY KEY ("id")
);

-- 17. Product Bundles Table
CREATE TABLE "product_bundles" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "bundlePrice" DECIMAL(12,2) NOT NULL,
    "regularPrice" DECIMAL(12,2) NOT NULL,
    "discountPercentage" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_bundles_pkey" PRIMARY KEY ("id")
);

-- 18. Product Bundle Items Table
CREATE TABLE "product_bundle_items" (
    "id" TEXT NOT NULL,
    "bundleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_bundle_items_pkey" PRIMARY KEY ("id")
);

-- 19. User Rewards & Loyalty Table
CREATE TABLE "user_rewards" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pointsBalance" INTEGER NOT NULL DEFAULT 0,
    "tier" "RewardTier" NOT NULL DEFAULT 'SILVER',
    "referralCode" TEXT NOT NULL,
    "referralCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_rewards_pkey" PRIMARY KEY ("id")
);

-- 20. Reward Transactions Table
CREATE TABLE "reward_transactions" (
    "id" TEXT NOT NULL,
    "rewardAccountId" TEXT NOT NULL,
    "type" "RewardTxType" NOT NULL DEFAULT 'EARNED',
    "points" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reward_transactions_pkey" PRIMARY KEY ("id")
);

-- 21. Support Tickets Table
CREATE TABLE "support_tickets" (
    "id" TEXT NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT,
    "category" "TicketCategory" NOT NULL DEFAULT 'TECHNICAL_SUPPORT',
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "TicketPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "TicketStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id")
);

-- 22. Support Ticket Replies Table
CREATE TABLE "support_ticket_replies" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "sender" "ReplySender" NOT NULL DEFAULT 'USER',
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "support_ticket_replies_pkey" PRIMARY KEY ("id")
);

-- 23. Notifications Table
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'SYSTEM',
    "read" BOOLEAN NOT NULL DEFAULT false,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- 24. Audit Logs Table
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "adminId" TEXT,
    "adminName" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "details" JSONB NOT NULL DEFAULT '{}',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES & CONSTRAINTS
-- =============================================================================

-- Users
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_role_idx" ON "users"("role");
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- Addresses
CREATE INDEX "addresses_userId_idx" ON "addresses"("userId");
CREATE INDEX "addresses_pincode_idx" ON "addresses"("pincode");

-- Categories
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");
CREATE INDEX "categories_slug_idx" ON "categories"("slug");
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

-- Products
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");
CREATE INDEX "products_slug_idx" ON "products"("slug");
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");
CREATE INDEX "products_sellerId_idx" ON "products"("sellerId");
CREATE INDEX "products_price_idx" ON "products"("price");
CREATE INDEX "products_rating_idx" ON "products"("rating");
CREATE INDEX "products_isFeatured_isTrending_idx" ON "products"("isFeatured", "isTrending");
CREATE INDEX "products_brand_idx" ON "products"("brand");

-- Product Images
CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");

-- Color Variants
CREATE UNIQUE INDEX "product_color_variants_productId_name_key" ON "product_color_variants"("productId", "name");
CREATE INDEX "product_color_variants_productId_idx" ON "product_color_variants"("productId");

-- Reviews
CREATE UNIQUE INDEX "reviews_userId_productId_key" ON "reviews"("userId", "productId");
CREATE INDEX "reviews_productId_idx" ON "reviews"("productId");
CREATE INDEX "reviews_rating_idx" ON "reviews"("rating");

-- Cart & Wishlist
CREATE UNIQUE INDEX "cart_items_userId_productId_selectedColor_key" ON "cart_items"("userId", "productId", "selectedColor");
CREATE INDEX "cart_items_userId_idx" ON "cart_items"("userId");
CREATE UNIQUE INDEX "wishlist_items_userId_productId_key" ON "wishlist_items"("userId", "productId");
CREATE INDEX "wishlist_items_userId_idx" ON "wishlist_items"("userId");

-- Coupons
CREATE UNIQUE INDEX "coupons_code_key" ON "coupons"("code");
CREATE INDEX "coupons_code_idx" ON "coupons"("code");
CREATE INDEX "coupons_isActive_expiry_idx" ON "coupons"("isActive", "expiry");

-- Orders
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");
CREATE UNIQUE INDEX "orders_trackingNumber_key" ON "orders"("trackingNumber");
CREATE INDEX "orders_orderNumber_idx" ON "orders"("orderNumber");
CREATE INDEX "orders_userId_idx" ON "orders"("userId");
CREATE INDEX "orders_status_idx" ON "orders"("status");
CREATE INDEX "orders_paymentStatus_idx" ON "orders"("paymentStatus");
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

-- Order Items & Timeline
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");
CREATE INDEX "order_items_productId_idx" ON "order_items"("productId");
CREATE INDEX "order_timelines_orderId_idx" ON "order_timelines"("orderId");

-- Payments
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");
CREATE INDEX "payments_orderId_idx" ON "payments"("orderId");
CREATE INDEX "payments_transactionId_idx" ON "payments"("transactionId");
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- Deals & Bundles
CREATE INDEX "flash_deals_productId_idx" ON "flash_deals"("productId");
CREATE INDEX "flash_deals_isActive_endsAt_idx" ON "flash_deals"("isActive", "endsAt");
CREATE UNIQUE INDEX "product_bundle_items_bundleId_productId_key" ON "product_bundle_items"("bundleId", "productId");
CREATE INDEX "product_bundle_items_bundleId_idx" ON "product_bundle_items"("bundleId");
CREATE INDEX "product_bundle_items_productId_idx" ON "product_bundle_items"("productId");

-- Rewards
CREATE UNIQUE INDEX "user_rewards_userId_key" ON "user_rewards"("userId");
CREATE UNIQUE INDEX "user_rewards_referralCode_key" ON "user_rewards"("referralCode");
CREATE INDEX "user_rewards_userId_idx" ON "user_rewards"("userId");
CREATE INDEX "user_rewards_referralCode_idx" ON "user_rewards"("referralCode");
CREATE INDEX "reward_transactions_rewardAccountId_idx" ON "reward_transactions"("rewardAccountId");
CREATE INDEX "reward_transactions_type_idx" ON "reward_transactions"("type");

-- Support Tickets
CREATE UNIQUE INDEX "support_tickets_ticketNumber_key" ON "support_tickets"("ticketNumber");
CREATE INDEX "support_tickets_ticketNumber_idx" ON "support_tickets"("ticketNumber");
CREATE INDEX "support_tickets_userId_idx" ON "support_tickets"("userId");
CREATE INDEX "support_tickets_status_idx" ON "support_tickets"("status");
CREATE INDEX "support_tickets_priority_idx" ON "support_tickets"("priority");
CREATE INDEX "support_ticket_replies_ticketId_idx" ON "support_ticket_replies"("ticketId");

-- Notifications & Audit
CREATE INDEX "notifications_userId_idx" ON "notifications"("userId");
CREATE INDEX "notifications_read_idx" ON "notifications"("read");
CREATE INDEX "audit_logs_adminId_idx" ON "audit_logs"("adminId");
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- =============================================================================
-- FOREIGN KEY CONSTRAINTS
-- =============================================================================

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "products" ADD CONSTRAINT "products_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_color_variants" ADD CONSTRAINT "product_color_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "order_timelines" ADD CONSTRAINT "order_timelines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "flash_deals" ADD CONSTRAINT "flash_deals_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "product_bundle_items_bundleId_fkey" FOREIGN KEY ("bundleId") REFERENCES "product_bundles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_bundle_items" ADD CONSTRAINT "product_bundle_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_rewards" ADD CONSTRAINT "user_rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "reward_transactions" ADD CONSTRAINT "reward_transactions_rewardAccountId_fkey" FOREIGN KEY ("rewardAccountId") REFERENCES "user_rewards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "support_tickets" ADD CONSTRAINT "support_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "support_ticket_replies" ADD CONSTRAINT "support_ticket_replies_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "support_tickets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
