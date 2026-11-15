import React, { useState, useEffect } from 'react';
import {
  SupermarketCategory, Product, CartItem, Order, Coupon,
  SellerProfile, SupportedLanguage, PerformanceMode, User
} from './types';
import {
  SUPERMARKET_PRODUCTS,
  SUPERMARKET_CATEGORIES,
  SUPERMARKET_SELLERS,
  SUPERMARKET_COUPONS
} from './data/supermarketData';
import { TRANSLATIONS } from './i18n/translations';

// Components
import { SupermarketHeader } from './components/layout/SupermarketHeader';
import { SupermarketFooter } from './components/layout/SupermarketFooter';
import { Hero3DCanvas } from './components/3d/Hero3DCanvas';
import { Supermarket3DStore } from './components/3d/Supermarket3DStore';
import { ProductCard } from './components/product/ProductCard';
import { ProductDetailsModal } from './components/product/ProductDetailsModal';
import { SupermarketAIAssistant } from './components/ai/SupermarketAIAssistant';
import { SmartCartModal } from './components/cart/SmartCartModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { DealsSection } from './components/deals/DealsSection';
import { ProductComparisonModal } from './components/ai/ProductComparisonModal';
import { SmartShoppingListsModal } from './components/lists/SmartShoppingListsModal';
import { SupermarketSellerDashboard } from './components/dashboard/SupermarketSellerDashboard';
import { SupermarketAdminDashboard } from './components/dashboard/SupermarketAdminDashboard';
import { AndroidAppModal } from './components/common/AndroidAppModal';
import { PWAInstallBanner } from './components/pwa/PWAInstallBanner';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { AuthModal } from './components/auth/AuthModal';

import {
  Sparkles, ArrowRight, Box, ShieldCheck, Zap, Layers, RefreshCw,
  ShoppingBag, Search, Filter, SlidersHorizontal, Check, Star,
  Heart, Truck, RotateCcw, Package, HelpCircle, X, Smartphone
} from 'lucide-react';

export default function App() {
  // Global Data State
  const [products, setProducts] = useState<Product[]>(SUPERMARKET_PRODUCTS);
  const [sellers, setSellers] = useState<SellerProfile[]>(SUPERMARKET_SELLERS);
  const [orders, setOrders] = useState<Order[]>([]);

  // Filter & Search State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating' | 'discount'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sm3d_cart');
      return saved ? JSON.parse(saved) : [
        { product: SUPERMARKET_PRODUCTS[0], quantity: 1 },
        { product: SUPERMARKET_PRODUCTS[2], quantity: 2 }
      ];
    } catch {
      return [];
    }
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sm3d_wishlist');
      return saved ? JSON.parse(saved) : ['prod-ssg-01', 'prod-de-01'];
    } catch {
      return [];
    }
  });

  // Multilingual & Performance Mode State
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [perfMode, setPerfMode] = useState<PerformanceMode>('balanced');
  const t = TRANSLATIONS[language];

  // Modal / View States
  const [is3DStoreOpen, setIs3DStoreOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [isListsOpen, setIsListsOpen] = useState<boolean>(false);
  const [isSellerOpen, setIsSellerOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState<boolean>(false);
  const [isAndroidAppOpen, setIsAndroidAppOpen] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<string>('home');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [deliverySlot, setDeliverySlot] = useState<string>('Express Delivery (In 2 Hours)');

  // User Authentication & RBAC Session State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('sm3d_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authRequiredRole, setAuthRequiredRole] = useState<'admin' | 'seller' | null>(null);

  // Validate active session token against server
  useEffect(() => {
    const token = localStorage.getItem('sm3d_auth_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Session expired');
        })
        .then(data => {
          if (data.user) {
            setCurrentUser(data.user);
            localStorage.setItem('sm3d_current_user', JSON.stringify(data.user));
          }
        })
        .catch(() => {
          localStorage.removeItem('sm3d_auth_token');
          localStorage.removeItem('sm3d_current_user');
          setCurrentUser(null);
        });
    }
  }, []);

  const handleOpenAdmin = () => {
    if (currentUser?.role === 'admin') {
      setIsAdminOpen(true);
    } else {
      setAuthRequiredRole('admin');
      setIsAuthOpen(true);
    }
  };

  const handleOpenSeller = () => {
    if (currentUser?.role === 'seller' || currentUser?.role === 'admin') {
      setIsSellerOpen(true);
    } else {
      setAuthRequiredRole('seller');
      setIsAuthOpen(true);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('sm3d_auth_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch {}
    }
    localStorage.removeItem('sm3d_auth_token');
    localStorage.removeItem('sm3d_current_user');
    setCurrentUser(null);
    setIsAdminOpen(false);
    setIsSellerOpen(false);
  };

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('sm3d_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sm3d_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddMultipleToCart = (items: { product: Product; quantity: number }[]) => {
    setCart(prev => {
      const updated = [...prev];
      items.forEach(newItem => {
        const existingIdx = updated.findIndex(i => i.product.id === newItem.product.id);
        if (existingIdx >= 0) {
          updated[existingIdx].quantity += newItem.quantity;
        } else {
          updated.push({ product: newItem.product, quantity: newItem.quantity });
        }
      });
      return updated;
    });
  };

  const handleUpdateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev =>
      prev.includes(product.id) ? prev.filter(id => id !== product.id) : [...prev, product.id]
    );
  };

  // Checkout Handlers
  const handleProceedToCheckout = (coupon: Coupon | null, slot: string) => {
    setAppliedCoupon(coupon);
    setDeliverySlot(slot);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Seller Actions
  const handleSellerAddProduct = (newProdData: Partial<Product>) => {
    const name = newProdData.name || 'New Supermarket Item';
    const p: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newProdData.description || 'Premium quality daily grocery item packaged for guaranteed freshness.',
      specifications: newProdData.specifications || { 'Shelf Life': '6 Months', 'Quality': 'Grade A' },
      brand: newProdData.brand || 'Fresh Mart',
      category: newProdData.category || 'Rice & Grains',
      subcategory: newProdData.subcategory || 'Staples',
      price: newProdData.price || 99,
      mrp: newProdData.mrp || 120,
      finalPrice: newProdData.price || 99,
      discountPercentage: newProdData.discountPercentage || 15,
      unit: newProdData.unit || '1 kg',
      inStock: true,
      stock: newProdData.stock || 50,
      availability: 'In Stock',
      deliveryEstimate: 'Express in 2 hours',
      model3D: newProdData.model3D || 'grain_sack',
      images: newProdData.images || ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80'],
      sellerId: sellers[0].id,
      sellerName: sellers[0].storeName,
      sku: newProdData.sku || `SKU-${Date.now().toString().slice(-4)}`,
      barcode: `890${Date.now().toString().slice(-10)}`,
      rating: 4.8,
      reviewCount: 1,
      createdAt: new Date().toISOString()
    };
    setProducts(prev => [p, ...prev]);
  };

  const handleSellerUpdateStock = (productId: string, newStock: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, stock: newStock, inStock: newStock > 0 } : p))
    );
  };

  const handleSellerDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAdminToggleFeature = (productId: string) => {
    setProducts(prev =>
      prev.map(p => (p.id === productId ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  // Filtered Products Calculation
  const filteredProducts = products.filter(p => {
    // Category filter
    if (selectedCategory === 'wishlist') {
      if (!wishlistIds.includes(p.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (p.category !== selectedCategory) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matches =
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(q)));
      if (!matches) return false;
    }

    // In stock filter
    if (inStockOnly && p.stock <= 0) return false;

    // Price range filter
    if (p.finalPrice > maxPriceFilter) return false;

    return true;
  });

  // Sort Filtered Products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.finalPrice - b.finalPrice;
    if (sortBy === 'price_high') return b.finalPrice - a.finalPrice;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return b.discountPercentage - a.discountPercentage;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* 1. Global Navigation Header */}
      <SupermarketHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={cartTotalCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
        onOpen3DStore={() => setIs3DStoreOpen(true)}
        onOpenLists={() => setIsListsOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSeller={handleOpenSeller}
        onOpenAdmin={handleOpenAdmin}
        onOpenAndroidModal={() => setIsAndroidAppOpen(true)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        language={language}
        onLanguageChange={setLanguage}
        perfMode={perfMode}
        onPerfModeChange={setPerfMode}
      />

      {/* PWA & Android App Prompt Banner */}
      <PWAInstallBanner onOpenAppModal={() => setIsAndroidAppOpen(true)} />

      {/* 2. Hero Section with 3D Canvas Centerpiece */}
      <section className="relative min-h-[560px] flex items-center justify-center overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-[#0a0f1d] to-[#090D16]">
        {/* 3D Background Interactive Canvas */}
        <Hero3DCanvas />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-16 text-center space-y-6 pointer-events-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-emerald-500/10 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Next-Gen 3D Supermarket • Express 2-Hour Delivery</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIs3DStoreOpen(true)}
              className="py-3.5 px-7 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-2.5 cursor-pointer transition-all shadow-xl shadow-emerald-500/25 hover:scale-105"
            >
              <Box className="w-4 h-4 fill-slate-950" />
              <span>{t.store3D}</span>
            </button>

            <button
              onClick={() => setIsAIOpen(true)}
              className="py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 text-emerald-300 font-extrabold text-sm flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md hover:border-emerald-400"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.aiShopping}</span>
            </button>

            <button
              onClick={() => setIsAndroidAppOpen(true)}
              className="py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 font-extrabold text-sm flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md hover:border-emerald-400"
              title="Install SuperMart 3D Android Application"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Android App</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('catalog-aisle');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="py-3.5 px-6 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-sm flex items-center gap-1.5 cursor-pointer transition-colors backdrop-blur-md"
            >
              <span>{t.exploreCategories}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Quick Supermarket Highlights */}
          <div className="pt-6 grid grid-cols-3 max-w-lg mx-auto gap-4 text-[11px] text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>2-Hour Delivery</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>FSSAI Certified</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Easy Return</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 28 Supermarket Categories Carousel / Ribbon */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto border-b border-slate-800/80 w-full overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">
              Browse 28 Supermarket Aisles
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-bold">
              100% Grocery Items
            </span>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer"
            >
              View All 28 Aisles
            </button>
          )}
        </div>

        {/* Categories Horizontal Scroll Strip */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 border ${
              selectedCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 border-emerald-500 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🛒</span>
            <span>All Aisles ({products.length})</span>
          </button>

          {SUPERMARKET_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-medium whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 border ${
                selectedCategory === c.id
                  ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-500 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="text-sm">{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Today's Deals & Festival Mela */}
      <DealsSection
        products={products}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setSelectedProduct(prod)}
        onOpen3D={(prod) => setSelectedProduct(prod)}
      />

      {/* 5. Main Product Catalog & Filter Aisle */}
      <section id="catalog-aisle" className="py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        
        {/* Section Header & Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
              <span>
                {selectedCategory === 'all'
                  ? 'All Supermarket Groceries & Pantry'
                  : selectedCategory === 'wishlist'
                  ? 'Your Wishlisted Items'
                  : selectedCategory}
              </span>
              <span className="text-xs font-mono font-normal text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {sortedProducts.length} items
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              100% farm-fresh, food-grade certified packaged kitchen essentials
            </p>
          </div>

          {/* Quick Filters / Sorters */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* In Stock Only Checkbox */}
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-emerald-500"
              />
              <span>In Stock Only</span>
            </label>

            {/* Price Cap Slider */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-slate-400">Max:</span>
              <span className="font-mono font-bold text-emerald-400">₹{maxPriceFilter}</span>
              <input
                type="range"
                min="50"
                max="1200"
                step="50"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-20 accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-semibold focus:outline-none focus:border-emerald-500"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-slate-900/40 rounded-3xl border border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-slate-800/80 flex items-center justify-center mx-auto text-slate-500">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-white">No Groceries Found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No supermarket products matched your current filters or query. Try resetting filters or searching for "Rice", "Atta", "Salt", or "Oil".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                setMaxPriceFilter(1000);
              }}
              className="py-2 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sortedProducts.map((prod) => {
              const cartItem = cart.find(i => i.product.id === prod.id);
              return (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  quantityInCart={cartItem?.quantity || 0}
                  isWishlisted={wishlistIds.includes(prod.id)}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setSelectedProduct(p)}
                  onOpen3D={(p) => setSelectedProduct(p)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* 6. Footer */}
      <SupermarketFooter
        onSelectCategory={setSelectedCategory}
        onOpenSeller={handleOpenSeller}
        onOpenAdmin={handleOpenAdmin}
        onOpenAndroidModal={() => setIsAndroidAppOpen(true)}
      />

      {/* --- ALL MODALS & INTERACTIVE OVERLAYS --- */}

      {/* Mobile Bottom Navigation & Quick Floating Cart */}
      <MobileBottomNav
        activeTab={mobileTab}
        setActiveTab={setMobileTab}
        cartCount={cartTotalCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpen3DStore={() => setIs3DStoreOpen(true)}
        onOpenAIAssistant={() => setIsAIOpen(true)}
        onOpenAndroidModal={() => setIsAndroidAppOpen(true)}
        onOpenDeals={() => {
          setSelectedCategory('all');
          const dealsEl = document.getElementById('deals-section');
          if (dealsEl) {
            dealsEl.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Android App & PWA Installation Modal */}
      <AndroidAppModal
        isOpen={isAndroidAppOpen}
        onClose={() => setIsAndroidAppOpen(false)}
      />

      {/* A. 3D Virtual Supermarket Walkthrough Modal */}
      {is3DStoreOpen && (
        <Supermarket3DStore
          products={products}
          onClose={() => setIs3DStoreOpen(false)}
          onSelectProduct={(p) => {
            setSelectedProduct(p);
          }}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          cartCount={cartTotalCount}
          onOpenCart={() => setIsCartOpen(true)}
          performanceMode={perfMode}
        />
      )}

      {/* B. Product Details Modal (with 360 Viewer, Exploded View, Nutrition & Reviews) */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onToggleWishlist={handleToggleWishlist}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
        />
      )}

      {/* C. AI Groceries Advisor Drawer / Modal */}
      {isAIOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-[85vh] shadow-2xl">
            <SupermarketAIAssistant
              products={products}
              cart={cart}
              onAddToCart={handleAddToCart}
              onAddMultipleToCart={handleAddMultipleToCart}
              onClose={() => setIsAIOpen(false)}
            />
          </div>
        </div>
      )}

      {/* D. Smart Basket / Cart Modal */}
      {isCartOpen && (
        <SmartCartModal
          cart={cart}
          allProducts={products}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onClose={() => setIsCartOpen(false)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {/* E. 4-Step Checkout & Order Confirmation */}
      {isCheckoutOpen && (
        <CheckoutModal
          cart={cart}
          appliedCoupon={appliedCoupon}
          deliverySlot={deliverySlot}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* F. Product Comparison Modal */}
      {isCompareOpen && (
        <ProductComparisonModal
          products={products}
          onClose={() => setIsCompareOpen(false)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
        />
      )}

      {/* G. Smart Shopping Lists Modal */}
      {isListsOpen && (
        <SmartShoppingListsModal
          allProducts={products}
          onClose={() => setIsListsOpen(false)}
          onAddMultipleToCart={handleAddMultipleToCart}
        />
      )}

      {/* H. Seller Portal Dashboard */}
      {isSellerOpen && (
        <SupermarketSellerDashboard
          seller={sellers[0]}
          products={products}
          onClose={() => setIsSellerOpen(false)}
          onAddProduct={handleSellerAddProduct}
          onUpdateStock={handleSellerUpdateStock}
          onDeleteProduct={handleSellerDeleteProduct}
        />
      )}

      {/* I. Master Admin Console */}
      {isAdminOpen && (
        <SupermarketAdminDashboard
          products={products}
          sellers={sellers}
          onClose={() => setIsAdminOpen(false)}
          onToggleFeature={handleAdminToggleFeature}
          onDeleteProduct={handleSellerDeleteProduct}
        />
      )}

      {/* J. Authentication & Access Control Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthRequiredRole(null);
        }}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          localStorage.setItem('sm3d_current_user', JSON.stringify(user));
          setIsAuthOpen(false);
          if (authRequiredRole === 'admin') {
            if (user.role === 'admin') {
              setIsAdminOpen(true);
            } else {
              alert(`Access Restricted: Your account has role "${user.role.toUpperCase()}". Administrator credentials are required to access the Master Admin Console.`);
            }
          } else if (authRequiredRole === 'seller') {
            if (user.role === 'seller' || user.role === 'admin') {
              setIsSellerOpen(true);
            } else {
              alert(`Access Restricted: Your account has role "${user.role.toUpperCase()}". Merchant/Seller credentials are required to access the Seller Portal.`);
            }
          }
          setAuthRequiredRole(null);
        }}
      />
    </div>
  );
}
