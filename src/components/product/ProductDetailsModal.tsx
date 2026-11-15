import React, { useState } from 'react';
import {
  X, Star, ShieldCheck, Zap, Truck, RotateCcw, Plus, Minus,
  Heart, ShoppingBag, Box, Check, MessageSquare, HelpCircle,
  Clock, Share2, Layers, Award, Sparkles, ArrowRight
} from 'lucide-react';
import { Product, CartItem } from '../../types';
import { Product3DViewer } from '../3d/Product3DViewer';

interface ProductDetailsModalProps {
  product: Product;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  onToggleWishlist?: (product: Product) => void;
  isWishlisted?: boolean;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted = false
}) => {
  const [selectedImg, setSelectedImg] = useState<string>(product.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'reviews' | 'seller'>('overview');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Frequently bought together bundle
  const bundleItem = allProducts.find(p => p.id !== product.id && p.category === product.category) || allProducts[0];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="font-bold text-emerald-400 uppercase tracking-wider">{product.category}</span>
            <span>/</span>
            <span className="text-slate-300 font-medium">{product.subcategory}</span>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-xs font-mono">{product.sku}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist && onToggleWishlist(product)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-500'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: 3D Viewer & Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Product3DViewer
              modelType={product.model3D}
              colorVariants={product.colorVariants}
              fallbackImage={selectedImg}
              productName={product.name}
            />

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border-2 transition-all cursor-pointer shrink-0 ${
                      selectedImg === img ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Safety Assurance Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">100% Genuine</span>
                  <span className="text-slate-400">Direct from Brands</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Super Express</span>
                  <span className="text-slate-400">{product.deliveryEstimate}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center gap-2.5">
                <RotateCcw className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Easy Returns</span>
                  <span className="text-slate-400">No Questions Asked</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Buy Box, Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand & Stock Status */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                  {product.brand}
                </span>

                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {product.availability} ({product.stock} units available)
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-slate-400 underline decoration-slate-700">
                  {product.reviewCount.toLocaleString()} Verified Customer Ratings
                </span>
              </div>

              {/* Weight & Net Quantity */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Net Weight / Pack Size:</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-white font-mono font-bold border border-slate-700">
                  {product.unit}
                </span>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ₹{product.finalPrice}
                  </span>
                  {product.mrp > product.finalPrice && (
                    <span className="text-base text-slate-500 line-through font-mono">
                      MRP ₹{product.mrp}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-emerald-400 font-bold">
                    You save ₹{product.mrp - product.finalPrice} inclusive of all taxes
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    ₹{(product.finalPrice / 10).toFixed(1)} / 100g
                  </span>
                </div>
              </div>

              {/* Delivery ETA banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-3 text-xs">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex-1">
                  <span className="font-bold text-white block">Earliest Delivery by {product.deliveryEstimate}</span>
                  <span className="text-slate-400 text-[11px]">Select your preferred delivery slot at checkout</span>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-slate-800 text-xs font-bold">
                {(['overview', 'ingredients', 'reviews', 'seller'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2.5 px-3 capitalize transition-all cursor-pointer border-b-2 ${
                      activeTab === tab
                        ? 'border-emerald-500 text-emerald-400'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Panes */}
              <div className="text-xs text-slate-300 leading-relaxed min-h-[100px]">
                {activeTab === 'overview' && (
                  <div className="space-y-3">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                      {Object.entries(product.specifications || {}).map(([key, val]) => (
                        <div key={key} className="bg-slate-950/60 p-2 rounded-xl border border-slate-800/60">
                          <span className="text-slate-400 text-[10px] block">{key}</span>
                          <span className="font-semibold text-white">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2">
                    <h5 className="font-bold text-white">Full Ingredient Declaration:</h5>
                    <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300">
                      {product.ingredients || 'Natural agricultural whole produce. Zero artificial colors or additives.'}
                    </p>
                    {product.expiryDate && (
                      <div className="flex items-center gap-2 text-xs pt-1 text-slate-400">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Best Before: <strong>{product.expiryDate}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-bold text-white">Recent Verified Buyer Feedback</span>
                      <span className="text-amber-400 font-bold">★ {product.rating} / 5.0</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-white">Pooja Sharma</span>
                        <span className="text-emerald-400 text-[10px] flex items-center gap-1 font-semibold">
                          <ShieldCheck className="w-3 h-3" /> Verified Purchase
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        "Delivered in less than 90 minutes. Packaging was intact, fresh seal preserved and excellent quality as always."
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'seller' && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white">{product.sellerName}</h5>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                        Super Seller
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Certified cold-chain and dry storage grocery fulfillment warehouse. FSSAI License Verified.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions: Quantity + Add to Cart + Buy Now */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-2xl p-1 text-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-extrabold text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (₹{product.finalPrice * quantity})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuy}
                  className="py-3 px-5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors border border-slate-700"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
