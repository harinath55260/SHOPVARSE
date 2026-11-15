import React from 'react';
import {
  ShoppingBag, ShieldCheck, Truck, RotateCcw, Award,
  Phone, Mail, MapPin, Heart, ArrowUpRight, Smartphone
} from 'lucide-react';
import { SUPERMARKET_CATEGORIES } from '../../data/supermarketData';

interface SupermarketFooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenSeller: () => void;
  onOpenAdmin: () => void;
  onOpenAndroidModal?: () => void;
}

export const SupermarketFooter: React.FC<SupermarketFooterProps> = ({
  onSelectCategory,
  onOpenSeller,
  onOpenAdmin,
  onOpenAndroidModal
}) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-16 pb-24 md:pb-12">
      
      {/* 4 Guarantees Strip */}
      <div className="border-b border-slate-800/80 py-8 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Express 2-Hour Delivery</h5>
              <p className="text-[11px] text-slate-500">Slot-based doorstep dispatch</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">FSSAI Certified Fresh</h5>
              <p className="text-[11px] text-slate-500">100% genuine farm & brand staples</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Zero-Hassle Returns</h5>
              <p className="text-[11px] text-slate-500">Instant refund if not fresh</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-white text-xs">Best Price Guarantee</h5>
              <p className="text-[11px] text-slate-500">Direct mandi & wholesale rates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
              <ShoppingBag className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="text-base font-black text-white tracking-tight">SUPER MART 3D</span>
          </div>

          <p className="text-slate-400 leading-relaxed max-w-sm">
            Next-generation 3D supermarket and grocery shopping platform. Walk through virtual store aisles, consult our Gemini-powered AI groceries advisor, and receive fresh kitchen staples at your doorstep in under 2 hours.
          </p>

          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI Central Food License: <strong>#10020088001234</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Available across Bengaluru, Hyderabad, Mumbai, Delhi NCR, Chennai & Pune</span>
            </div>
          </div>
        </div>

        {/* 28 Categories Quick List */}
        <div>
          <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Top Aisles
          </h5>
          <ul className="space-y-2">
            {SUPERMARKET_CATEGORIES.slice(0, 7).map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => onSelectCategory(c.id)}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care & Policies */}
        <div>
          <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Customer Care
          </h5>
          <ul className="space-y-2">
            <li><a href="#orders" className="hover:text-emerald-400 transition-colors">Track Your Order</a></li>
            <li><a href="#shipping" className="hover:text-emerald-400 transition-colors">Express Delivery Timings</a></li>
            <li><a href="#returns" className="hover:text-emerald-400 transition-colors">Grocery Return & Refund Policy</a></li>
            <li><a href="#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</a></li>
            <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Customer Support 24x7</a></li>
          </ul>
        </div>

        {/* Seller & Admin Portals */}
        <div>
          <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-3">
            Vendor & Partners
          </h5>
          <ul className="space-y-2">
            {onOpenAndroidModal && (
              <li>
                <button
                  onClick={onOpenAndroidModal}
                  className="text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer flex items-center gap-1.5 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors"
                >
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download Android App</span>
                </button>
              </li>
            )}
            <li>
              <button onClick={onOpenSeller} className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer flex items-center gap-1">
                <span>Seller Hub Dashboard</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button onClick={onOpenAdmin} className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer flex items-center gap-1">
                <span>Master Admin Console</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </li>
            <li><span className="text-slate-500">Wholesale & B2B Inquiries</span></li>
            <li><span className="text-slate-500">Green Logistics & EV Fleet</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Copyright */}
      <div className="border-t border-slate-800/60 py-6 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          © 2026 SUPER MART 3D Inc. All rights reserved. Strictly groceries and daily supermarket staples.
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span>UPI / RuPay / Visa / Mastercard / NetBanking Accepted</span>
        </div>
      </div>
    </footer>
  );
};
