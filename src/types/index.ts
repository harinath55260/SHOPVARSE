export type UserRole = 'customer' | 'seller' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  isBlocked?: boolean;
  provider?: 'google' | 'email';
}

// 28 Supermarket Categories
export type SupermarketCategory =
  | 'Rice & Grains'
  | 'Pulses & Dal'
  | 'Masala & Spices'
  | 'Cooking Oils & Ghee'
  | 'Dairy & Eggs'
  | 'Biscuits & Cookies'
  | 'Snacks'
  | 'Beverages'
  | 'Chocolates & Sweets'
  | 'Instant & Ready Foods'
  | 'Sauces & Spreads'
  | 'Home Cleaning'
  | 'Personal Care'
  | 'Oral Care'
  | 'Paper & Household'
  | 'Laundry'
  | 'Kitchen Essentials'
  | 'Home Essentials'
  | 'Stationery'
  | 'Baby Care'
  | 'Beauty & Grooming'
  | 'Pet Care'
  | 'Packaged Foods'
  | 'Dry Fruits & Nuts'
  | 'Frozen Foods'
  | 'Breakfast Items'
  | 'Bakery'
  | 'Salt & Sugar';

// Supermarket 3D Procedural Archetype
export type Model3DType =
  | 'grain_sack'
  | 'pouch_dal'
  | 'spice_jar'
  | 'oil_bottle'
  | 'milk_carton'
  | 'cookie_pack'
  | 'chips_bag'
  | 'beverage_can'
  | 'chocolate_bar'
  | 'noodle_pack'
  | 'sauce_bottle'
  | 'cleaning_bottle'
  | 'soap_bar'
  | 'toothpaste_tube'
  | 'paper_roll'
  | 'detergent_box'
  | 'kitchen_box'
  | 'home_bucket'
  | 'stationery_set'
  | 'baby_diaper'
  | 'beauty_lotion'
  | 'pet_food'
  | 'cereal_box'
  | 'dry_fruit_pouch'
  | 'frozen_box'
  | 'bread_loaf'
  | 'salt_pack';

export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: SupermarketCategory;
  subcategory: string;
  price: number;
  mrp: number;
  discountPercentage: number;
  finalPrice: number;
  unit: string; // e.g. "1 kg", "500 g", "1 L", "Pack of 4"
  stock: number;
  inStock: boolean;
  images: string[];
  description: string;
  ingredients?: string;
  expiryDate?: string;
  rating: number;
  reviewCount: number;
  sellerId: string;
  sellerName: string;
  deliveryEstimate: string; // e.g. "In 2 Hours", "Tomorrow by 9 AM"
  sku: string;
  barcode: string;
  offer?: string;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  model3D: Model3DType;
  specifications: Record<string, string>;
  colorVariants?: ColorVariant[];
  tags?: string[];
  searchKeywords?: string[];
  nutritionalInfo?: Record<string, string>;
  shelfLife?: string;
  manufacturingDate?: string;
  countryOfOrigin?: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPaused?: boolean;
  approvalStatus?: 'approved' | 'pending' | 'flagged';
  lowStockThreshold?: number;
  createdAt: string;
  badge?: string; // e.g. "Best Seller", "Organic", "Festival Deal"
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentStatus = 'Paid' | 'Pending' | 'Failed' | 'Refunded';

export type PaymentMethod = 'UPI' | 'Card' | 'NetBanking' | 'COD' | 'Wallet';

export interface OrderTimelineItem {
  status: OrderStatus;
  date: string;
  description: string;
  completed: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  brand: string;
  unit: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark?: string;
  };
  deliverySlot?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponDiscount: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  courierPartner?: string;
  trackingNumber?: string;
  timeline: OrderTimelineItem[];
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  images?: string[];
}

export interface ProductQuestion {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  question: string;
  answer?: string;
  answeredBy?: string;
  createdAt: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'flat';
  minOrder: number;
  maxDiscount: number;
  description: string;
  expiresAt: string;
  categoryRestriction?: SupermarketCategory;
}

export interface PayoutRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  amount: number;
  requestedAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  bankAccount: string;
  ifscOrUpi: string;
  transactionRef?: string;
  notes?: string;
}

export interface SellerProfile {
  id: string;
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  commissionRate: number;
  isVerified: boolean;
  isSuspended: boolean;
  joinedAt: string;
  totalSales: number;
  rating: number;
}

export interface SmartShoppingList {
  id: string;
  name: string;
  icon: string;
  category: string;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
    estimatedPrice: number;
  }[];
}

export interface FestivalOffer {
  id: string;
  name: string;
  tagline: string;
  discountText: string;
  bannerColor: string;
  categories: SupermarketCategory[];
  endsInHours: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'deal' | 'stock' | 'system';
}

export type SupportedLanguage = 'en' | 'te' | 'hi' | 'ta';

export type ThemeMode = 'dark' | 'light';

export type PerformanceMode = 'high' | 'balanced' | 'lite';

export type ViewMode = '2d' | '3d';
