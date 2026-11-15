import React, { useState, useEffect } from 'react';
import {
  Flame, Clock, Sparkles, Tag, ArrowRight, Zap,
  Percent, Gift, ShoppingBag, Check
} from 'lucide-react';
import { Product, FestivalOffer } from '../../types';
import { FESTIVAL_OFFERS } from '../../data/supermarketData';
import { ProductCard } from '../product/ProductCard';

interface DealsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpen3D: (product: Product) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onOpen3D
}) => {
  const [dealTab, setDealTab] = useState<'flash' | 'under50' | 'under100' | 'festival'>('flash');
  
  // Countdown Timer simulation
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtered Products
  const flashDeals = products.filter(p => p.discountPercentage >= 15);
  const under50Products = products.filter(p => p.finalPrice <= 50);
  const under100Products = products.filter(p => p.finalPrice > 50 && p.finalPrice <= 100);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
      
      {/* Festival Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-6 sm:p-8 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mega Festival Mela • Limited Period</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Maha Supermarket Savings Festival
            </h3>
            <p className="text-sm text-white/90 leading-relaxed">
              Stock up on Desi Ghee, Basmati Rice, Dry Fruits, Chocolates & Sweets with up to 40% OFF + Flat ₹100 instant discount with code <strong className="underline decoration-white font-mono">SUPER100</strong>.
            </p>
          </div>

          {/* Flash Timer Box */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center gap-2 shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 text-amber-200">
              <Clock className="w-3.5 h-3.5" />
              Deals Ending In:
            </span>
            <div className="flex items-center gap-2 font-mono font-extrabold text-xl sm:text-2xl text-white">
              <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                {String(timeLeft.hours).padStart(2, '0')}
                <span className="text-[10px] block text-white/60 font-sans font-normal">HRS</span>
              </div>
              <span>:</span>
              <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
                {String(timeLeft.minutes).padStart(2, '0')}
                <span className="text-[10px] block text-white/60 font-sans font-normal">MIN</span>
              </div>
              <span>:</span>
              <div className="bg-black/40 px-3 py-1.5 rounded-xl border border-white/10 text-amber-300">
                {String(timeLeft.seconds).padStart(2, '0')}
                <span className="text-[10px] block text-white/60 font-sans font-normal">SEC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Category Selector Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />
            <span>Today's Super Deals & Discounts</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Handpicked grocery markdowns refreshed every 12 hours</p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold">
          <button
            onClick={() => setDealTab('flash')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
              dealTab === 'flash' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Flash Deals (15%+ OFF)</span>
          </button>

          <button
            onClick={() => setDealTab('under50')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              dealTab === 'under50' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Under ₹50 Store
          </button>

          <button
            onClick={() => setDealTab('under100')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              dealTab === 'under100' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Under ₹100 Store
          </button>
        </div>
      </div>

      {/* Products Grid based on tab */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {(dealTab === 'flash' ? flashDeals : dealTab === 'under50' ? under50Products : under100Products)
          .slice(0, 10)
          .map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onOpen3D={onOpen3D}
            />
          ))}
      </div>
    </section>
  );
};
