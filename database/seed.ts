// =============================================================================
// ShopVerse 3D V2 — Database Seeder Script (TypeScript / Prisma)
// Seeds initial Categories, Hardware Products, Users, Deals, and Orders
// =============================================================================

import { PrismaClient, UserRole, Model3DType, OrderStatus, PaymentMethod, PaymentStatus, CouponType, RewardTier } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database seeding for ShopVerse 3D V2...');

  // 1. Clean existing records (in dependency order)
  console.log('🧹 Cleaning existing tables...');
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.supportTicketReply.deleteMany();
  await prisma.supportTicket.deleteMany();
  await prisma.rewardTransaction.deleteMany();
  await prisma.userReward.deleteMany();
  await prisma.productBundleItem.deleteMany();
  await prisma.productBundle.deleteMany();
  await prisma.flashDeal.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderTimeline.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productColorVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.coupon.deleteMany();

  // 2. Create Users (Admin, Sellers, Customers)
  console.log('👤 Seeding Users & Roles...');
  const adminUser = await prisma.user.create({
    data: {
      id: 'usr-admin-1',
      name: 'Priya Sharma (Chief Admin)',
      email: 'admin@shopverse.in',
      role: UserRole.ADMIN,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    }
  });

  const sellerUser = await prisma.user.create({
    data: {
      id: 'usr-seller-apex',
      name: 'Apex Tech Retailers Pvt Ltd',
      email: 'partner@apexretail.in',
      role: UserRole.SELLER,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    }
  });

  const customerUser = await prisma.user.create({
    data: {
      id: 'usr-customer-1',
      name: 'Vikramaditya Rao',
      email: 'vikram.rao@shopverse.in',
      phone: '+91 98765 43210',
      role: UserRole.CUSTOMER,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    }
  });

  // 3. User Address
  const customerAddress = await prisma.address.create({
    data: {
      id: 'addr-cust-1',
      userId: customerUser.id,
      fullName: 'Vikramaditya Rao',
      phone: '+91 98765 43210',
      flat: 'Penthouse 14B, Skyview Towers',
      street: 'Hitech City Main Rd, Madhapur',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500081',
      isDefault: true,
    }
  });

  // 4. User Loyalty Points & Rewards
  await prisma.userReward.create({
    data: {
      userId: customerUser.id,
      pointsBalance: 850,
      tier: RewardTier.GOLD,
      referralCode: 'SHOPVERSE-GOLD-99',
      referralCount: 4,
      history: {
        create: [
          { points: 400, reason: 'Titanium Flagship Purchase', type: 'EARNED' },
          { points: 250, reason: 'Verified 3D Product Review', type: 'EARNED' },
          { points: 200, reason: 'Friend Referral (Ananya K.)', type: 'EARNED' }
        ]
      }
    }
  });

  // 5. Seed Categories
  console.log('📂 Seeding Hardware Categories...');
  const catMobiles = await prisma.category.create({
    data: { id: 'mobiles', name: 'Mobiles', slug: 'mobiles', tagline: 'Flagship & Foldables', iconName: 'Smartphone' }
  });
  const catElectronics = await prisma.category.create({
    data: { id: 'electronics', name: 'Electronics', slug: 'electronics', tagline: 'Pro Performance', iconName: 'Laptop' }
  });
  const catAudio = await prisma.category.create({
    data: { id: 'audio', name: 'Audio', slug: 'audio', tagline: 'Spatial Acoustic', iconName: 'Headphones' }
  });
  const catWearables = await prisma.category.create({
    data: { id: 'wearables', name: 'Wearables', slug: 'wearables', tagline: 'Smart Health & Style', iconName: 'Watch' }
  });
  const catGaming = await prisma.category.create({
    data: { id: 'gaming', name: 'Gaming', slug: 'gaming', tagline: 'Zero Latency Gear', iconName: 'Gamepad2' }
  });
  const catFootwear = await prisma.category.create({
    data: { id: 'shoes', name: 'Footwear', slug: 'footwear', tagline: 'Aerodynamic Kicks', iconName: 'Footprints' }
  });

  // 6. Seed Featured Hardware Products
  console.log('📦 Seeding Hardware Products with 3D Models & Specs...');

  const phoneProduct = await prisma.product.create({
    data: {
      id: 'prod-phone-1',
      name: 'Aether Titan X 5G',
      slug: 'aether-titan-x-5g',
      brand: 'Aether',
      categoryId: catMobiles.id,
      sellerId: sellerUser.id,
      price: 74999,
      originalPrice: 89999,
      discountPercentage: 17,
      stock: 45,
      inStock: true,
      fastDelivery: true,
      emiStartsAt: 3650,
      model3D: Model3DType.PHONE,
      rating: 4.8,
      reviewCount: 342,
      isFeatured: true,
      isTrending: true,
      description: 'Forged in aerospace grade-5 titanium with a 120Hz LTPO ProMotion AMOLED curved display, Neural X9 chipset, and cinematic quad-lens 200MP camera system.',
      specifications: {
        Display: '6.8" Quad HD+ Dynamic AMOLED (120Hz)',
        Processor: 'Octa-Core Neural X9 (4nm)',
        RAM: '16GB LPDDR5X',
        Storage: '512GB UFS 4.0',
        Camera: '200MP Main + 50MP Periscope + 48MP Ultra-Wide',
        Battery: '5,400 mAh with 100W HyperCharge',
        Warranty: '2 Years Comprehensive Manufacturer Warranty'
      },
      images: {
        create: [
          { url: '/src/assets/images/product_phone_flagship_1790136464517.jpg', isPrimary: true, orderIndex: 0 },
          { url: '/src/assets/images/hero_3d_storefront_1790136450762.jpg', isPrimary: false, orderIndex: 1 }
        ]
      },
      colorVariants: {
        create: [
          { name: 'Titanium Graphite', hex: '#2A2D34' },
          { name: 'Arctic Platinum', hex: '#D8DEE9' },
          { name: 'Cosmic Cyan', hex: '#0EA5E9' },
          { name: 'Obsidian Gold', hex: '#D4AF37' }
        ]
      }
    }
  });

  const laptopProduct = await prisma.product.create({
    data: {
      id: 'prod-laptop-1',
      name: 'Zephyr Pro 16 Creator Studio',
      slug: 'zephyr-pro-16-creator-studio',
      brand: 'Zephyr',
      categoryId: catElectronics.id,
      sellerId: sellerUser.id,
      price: 184999,
      originalPrice: 209999,
      discountPercentage: 12,
      stock: 18,
      inStock: true,
      fastDelivery: true,
      emiStartsAt: 8900,
      model3D: Model3DType.LAPTOP,
      rating: 4.9,
      reviewCount: 189,
      isFeatured: true,
      isTrending: true,
      description: 'Ultra-thin CNC aluminum unibody packed with RTX 5070 GPU, Liquid Retina XDR 3.2K mini-LED display, vapor chamber cooling, and 99.9Wh flight-legal battery.',
      specifications: {
        Display: '16.2" Mini-LED 3.2K (165Hz ProMotion, 1600 nits)',
        Processor: 'AMD Ryzen AI 9 HX 370 (12 cores / 24 threads)',
        Graphics: 'NVIDIA GeForce RTX 5070 12GB GDDR7',
        RAM: '64GB Unified DDR5',
        Storage: '2TB PCIe Gen5 NVMe SSD',
        Battery: '99.9 Wh with 240W GaN Fast Charger'
      },
      images: {
        create: [
          { url: '/src/assets/images/product_laptop_creator_1790136477759.jpg', isPrimary: true, orderIndex: 0 }
        ]
      },
      colorVariants: {
        create: [
          { name: 'Space Carbon', hex: '#1C1E24' },
          { name: 'Mercury Silver', hex: '#E5E9F0' }
        ]
      }
    }
  });

  const audioProduct = await prisma.product.create({
    data: {
      id: 'prod-audio-1',
      name: 'Vortex Spatial ANC Master',
      slug: 'vortex-spatial-anc-master',
      brand: 'Vortex',
      categoryId: catAudio.id,
      sellerId: sellerUser.id,
      price: 24999,
      originalPrice: 29999,
      discountPercentage: 17,
      stock: 60,
      inStock: true,
      fastDelivery: true,
      emiStartsAt: 1250,
      model3D: Model3DType.HEADPHONES,
      rating: 4.7,
      reviewCount: 420,
      isFeatured: true,
      isTrending: false,
      description: '45mm custom beryllium dynamic acoustic drivers delivering spatial lossless head-tracking audio, hybrid ANC up to 48dB noise reduction, and breathable memory foam.',
      specifications: {
        Drivers: '45mm Custom Beryllium Acoustic Chambers',
        NoiseCancellation: 'Active Hybrid ANC (-48dB depth)',
        BatteryLife: '60 Hours ANC Off / 48 Hours ANC On',
        Codecs: 'LDAC, aptX Lossless, AAC, SBC'
      },
      images: {
        create: [
          { url: '/src/assets/images/product_headphones_anc_1790136491799.jpg', isPrimary: true, orderIndex: 0 }
        ]
      },
      colorVariants: {
        create: [
          { name: 'Matte Midnight', hex: '#111827' },
          { name: 'Pure White', hex: '#F9FAFB' },
          { name: 'Champagne Gold', hex: '#C5A880' }
        ]
      }
    }
  });

  // 7. Flash Deals
  console.log('⚡ Seeding Flash Deals...');
  await prisma.flashDeal.create({
    data: {
      productId: phoneProduct.id,
      dealPrice: 69999,
      originalPrice: 89999,
      discountPercentage: 22,
      stockLeft: 7,
      totalStock: 50,
      endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  });

  // 8. Promotional Coupons
  console.log('🏷️ Seeding Coupons...');
  const couponSave10 = await prisma.coupon.create({
    data: {
      code: 'SHOPVERSE10',
      discount: 10,
      type: CouponType.PERCENT,
      minOrder: 10000,
      maxDiscount: 5000,
      description: '10% instant discount on premium hardware purchases',
      expiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }
  });

  // 9. Verified Reviews
  console.log('⭐ Seeding Verified Reviews...');
  await prisma.review.create({
    data: {
      userId: customerUser.id,
      productId: phoneProduct.id,
      rating: 5,
      title: 'Remarkable build quality and 3D preview was spot-on!',
      comment: 'The titanium finish looks even better in person than in the Three.js 3D inspection tool. The camera handles low-light shots cleanly.',
      verifiedPurchase: true,
      helpfulCount: 42
    }
  });

  // 10. Sample Order, Order Items & Payment
  console.log('💳 Seeding Order & Payment Records...');
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-2026-8841',
      userId: customerUser.id,
      addressId: customerAddress.id,
      shippingAddressSnapshot: {
        fullName: 'Vikramaditya Rao',
        phone: '+91 98765 43210',
        flat: 'Penthouse 14B, Skyview Towers',
        street: 'Hitech City Main Rd, Madhapur',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500081'
      },
      status: OrderStatus.SHIPPED,
      paymentStatus: PaymentStatus.PAID,
      paymentMethod: PaymentMethod.UPI,
      subtotal: 74999,
      discount: 5000,
      taxAmount: 12599.82, // 18% GST (9% CGST + 9% SGST)
      deliveryFee: 0,
      totalAmount: 69999,
      couponId: couponSave10.id,
      trackingNumber: 'TRK-IN-98214490',
      carrier: 'BlueDart Air Express',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      items: {
        create: [
          {
            productId: phoneProduct.id,
            productName: phoneProduct.name,
            productSlug: phoneProduct.slug,
            productImage: '/src/assets/images/product_phone_flagship_1790136464517.jpg',
            selectedColor: 'Titanium Graphite',
            quantity: 1,
            unitPrice: 74999,
            totalPrice: 74999
          }
        ]
      },
      timeline: {
        create: [
          { status: OrderStatus.ORDER_PLACED, description: 'Order authorized & payment confirmed via UPI', completed: true },
          { status: OrderStatus.CONFIRMED, description: 'Order verified by Apex Tech Retail fulfillment team', completed: true },
          { status: OrderStatus.PACKED, description: 'Electrostatic protective packaging applied & sealed', completed: true },
          { status: OrderStatus.SHIPPED, description: 'Handed over to BlueDart Air Express Hub (RGIA Hyderabad)', location: 'Hyderabad Airport Cargo Terminal', completed: true }
        ]
      },
      payments: {
        create: [
          {
            transactionId: 'TXN-UPI-992817421',
            gatewayProvider: 'Razorpay',
            paymentMethod: PaymentMethod.UPI,
            status: PaymentStatus.PAID,
            amount: 69999,
            currency: 'INR',
            paidAt: new Date()
          }
        ]
      }
    }
  });

  // 11. Support Ticket
  console.log('🎫 Seeding Support Tickets...');
  await prisma.supportTicket.create({
    data: {
      ticketNumber: 'TKT-101',
      userId: customerUser.id,
      orderId: order.id,
      category: 'THREE_D_AR_FEATURE',
      subject: 'Requesting USDZ download for Apple Vision Pro',
      description: 'Can we export the interactive 3D model files directly for spatial computing testing?',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      replies: {
        create: [
          {
            sender: 'USER',
            message: 'Looking forward to testing the spatial models on VisionOS.'
          },
          {
            sender: 'SUPPORT',
            message: 'Hi Vikram, our WebGL models are optimized for browser Three.js rendering and WebXR. Direct USDZ packaging is scheduled for our next feature drop!'
          }
        ]
      }
    }
  });

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
