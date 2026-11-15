import React, { useState } from 'react';
import {
  ShoppingBag, X, Plus, Minus, Trash2, ArrowRight, Tag,
  Zap, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Check
} from 'lucide-react';
import { CartItem, Product, Coupon } from '../../types';
import { SUPERMARKET_COUPONS } from '../../data/supermarketData';

interface SmartCartModalProps {
  cart: CartItem[];
  allProducts: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
  onProceedToCheckout: (appliedCoupon: Coupon | null, deliverySlot: string) => void;
}

export const SmartCartModal: React.FC<SmartCartModalProps> = ({
  cart,
  allProducts,
  onUpdateQuantity,
  onRemoveItem,
  onAddToCart,
  onClose,
  onProceedToCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [deliverySlot, setDeliverySlot] = useState<string>('Express Delivery (In 2 Hours)');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.finalPrice * item.quantity, 0);
  const originalTotal = cart.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const productSavings = originalTotal - subtotal;

  // Delivery fee calculation (Free above ₹499)
  const freeDeliveryThreshold = 499;
  const deliveryFee = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 40;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'flat') {
      couponDiscount = appliedCoupon.discount;
    } else {
      couponDiscount = Math.min(appliedCoupon.maxDiscount, Math.round((subtotal * appliedCoupon.discount) / 100));
    }
  }

  const grandTotal = Math.max(0, subtotal - couponDiscount + deliveryFee);
  const totalSavings = productSavings + couponDiscount;

  // Smart Cart Gap Recommendations
  const cartCategories = new Set(cart.map(c => c.product.category));
  const suggestedGaps: Product[] = [];

  if (!cartCategories.has('Salt & Sugar')) {
    const salt = allProducts.find(p => p.id === 'prod-ssg-01');
    if (salt) suggestedGaps.push(salt);
  }
  if (!cartCategories.has('Dairy & Eggs')) {
    const milk = allProducts.find(p => p.id === 'prod-de-01');
    if (milk) suggestedGaps.push(milk);
  }
  if (!cartCategories.has('Cooking Oils & Ghee')) {
    const oil = allProducts.find(p => p.id === 'prod-og-01');
    if (oil) suggestedGaps.push(oil);
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const found = SUPERMARKET_COUPONS.find(c => c.code.toUpperCase() === couponCode.trim().toUpperCase());
    if (!found) {
      setCouponError('Invalid coupon code. Try SUPER100 or FRESH50');
      return;
    }
    if (subtotal < found.minOrder) {
      setCouponError(`Minimum cart order of ₹${found.minOrder} required for ${found.code}`);
      return;
    }
    setAppliedCoupon(found);
    setCouponCode('');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-end animate-in fade-in duration-200">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Cart Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Smart Supermarket Basket</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  {cart.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              </h3>
              <p className="text-xs text-slate-400">Fresh daily essentials & automated pantry gap detection</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter Banner */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800/80 text-xs">
          {deliveryFee === 0 ? (
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Congratulations! You unlocked FREE Express 2-Hour Delivery!</span>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between font-semibold text-slate-300 mb-1">
                <span>Add ₹{amountNeededForFreeDelivery} more for <strong>FREE Delivery</strong></span>
                <span className="font-mono text-emerald-400">₹{subtotal} / ₹{freeDeliveryThreshold}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Cart Content */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-slate-800/80 flex items-center justify-center text-slate-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Your Supermarket Cart is Empty</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Discover 28 categories of fresh groceries, grains, dairy and daily household items.
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 py-2.5 px-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer transition-colors"
              >
                Browse Supermarket Aisle
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between gap-3 group hover:border-slate-700 transition-all"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover rounded-xl bg-slate-900 border border-slate-800 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {item.product.brand}
                    </span>
                    <h5 className="text-xs font-bold text-white truncate">
                      {item.product.name}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span>{item.product.unit}</span>
                      <span>•</span>
                      <span className="font-mono text-white font-bold">₹{item.product.finalPrice}</span>
                      {item.product.mrp > item.product.finalPrice && (
                        <span className="line-through text-slate-500 font-mono text-[10px]">
                          ₹{item.product.mrp}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-400" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span className="px-2 font-mono font-extrabold text-white text-xs">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Smart Cart Gap Recommendations */}
          {suggestedGaps.length > 0 && cart.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sparkles className="w-4 h-4" />
                <span>Smart AI Detection: Missing Daily Essentials</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {suggestedGaps.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-slate-900 shrink-0" />
                      <div className="truncate">
                        <span className="font-bold text-white block truncate">{p.name}</span>
                        <span className="text-slate-400 text-[10px]">{p.unit} • ₹{p.finalPrice}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="py-1 px-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[11px] font-bold transition-colors cursor-pointer shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Delivery Slot Selection */}
          {cart.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">Preferred Delivery Slot:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  'Express Delivery (In 2 Hours)',
                  'Today Evening (6 PM - 9 PM)',
                  'Tomorrow Morning (7 AM - 10 AM)',
                  'Tomorrow Evening (5 PM - 8 PM)'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setDeliverySlot(slot)}
                    className={`p-2.5 rounded-xl text-left font-medium transition-all cursor-pointer border ${
                      deliverySlot === slot
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="block font-bold">{slot.split(' (')[0]}</span>
                    <span className="text-[10px] text-slate-400">
                      {slot.includes('(') ? `(${slot.split(' (')[1]}` : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apply Supermarket Coupon / Promo:</span>
              </label>

              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-emerald-300 font-mono">{appliedCoupon.code}</span>
                      <p className="text-[10px] text-slate-400">{appliedCoupon.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-rose-400 hover:text-rose-300 font-bold text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter code (e.g. SUPER100, FRESH50)"
                    className="flex-1 py-2 px-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Cart Bottom Summary & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3 shrink-0">
            {/* Bill Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Items Total MRP:</span>
                <span className="font-mono line-through">₹{originalTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Product Discount Savings:</span>
                <span className="font-mono">-₹{productSavings}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-medium">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span className="font-mono">-₹{couponDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Delivery Charges:</span>
                <span className="font-mono font-semibold">
                  {deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${deliveryFee}`}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-white">
                <div>
                  <span className="text-sm font-bold block">Grand Total:</span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    You saved ₹{totalSavings} on this order!
                  </span>
                </div>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">
                  ₹{grandTotal}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => onProceedToCheckout(appliedCoupon, deliverySlot)}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
