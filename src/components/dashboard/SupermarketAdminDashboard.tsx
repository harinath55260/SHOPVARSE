import React, { useState } from 'react';
import {
  ShieldAlert, Users, Store, Package, ShoppingBag, DollarSign,
  TrendingUp, Sliders, Tag, Plus, Check, X, Star, AlertTriangle
} from 'lucide-react';
import { Product, SellerProfile, Coupon, SupermarketCategory } from '../../types';
import { SUPERMARKET_CATEGORIES, SUPERMARKET_COUPONS } from '../../data/supermarketData';

interface SupermarketAdminDashboardProps {
  products: Product[];
  sellers: SellerProfile[];
  onClose: () => void;
  onToggleFeature: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

export const SupermarketAdminDashboard: React.FC<SupermarketAdminDashboardProps> = ({
  products,
  sellers,
  onClose,
  onToggleFeature,
  onDeleteProduct
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'sellers' | 'coupons'>('overview');
  const [commissionRate, setCommissionRate] = useState<number>(8.0);
  const [coupons, setCoupons] = useState<Coupon[]>(SUPERMARKET_COUPONS);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  const totalGMV = sellers.reduce((sum, s) => sum + s.totalSales, 0);
  const lowStockCount = products.filter(p => p.stock <= 10).length;

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    const c: Coupon = {
      code: newCouponCode.toUpperCase(),
      discount: Number(newCouponDiscount),
      type: 'percent',
      minOrder: 499,
      maxDiscount: 200,
      description: `${newCouponDiscount}% Instant Discount on all groceries`,
      expiresAt: '2026-12-31'
    };
    setCoupons([...coupons, c]);
    setNewCouponCode('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Super Mart 3D Master Administration Console</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                  Root Access
                </span>
              </h3>
              <p className="text-xs text-slate-400">Governance across 28 categories, multi-seller marketplace & GMV take-rates</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-6 pb-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Marketplace GMV</span>
            <span className="text-xl font-extrabold text-white font-mono">₹{totalGMV.toLocaleString()}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Catalog</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">{products.length} SKUs</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Registered Sellers</span>
            <span className="text-xl font-extrabold text-cyan-400 font-mono">{sellers.length} Vendors</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Supermarket Categories</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">28 Aisles</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Low Stock Alerts</span>
            <span className="text-xl font-extrabold text-rose-400 font-mono">{lowStockCount} Items</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 flex border-b border-slate-800 text-xs font-bold gap-4">
          {(['overview', 'categories', 'sellers', 'coupons'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 capitalize transition-all cursor-pointer border-b-2 ${
                activeTab === tab
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'categories' ? '28 Category Analytics' : tab}
            </button>
          ))}
        </div>

        {/* Tab Panes */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Take Rate Slider */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="w-4 h-4 text-cyan-400" />
                      <span>Marketplace Platform Take-Rate Commission</span>
                    </h4>
                    <p className="text-xs text-slate-400">Universal platform margin deducted from merchant payouts</p>
                  </div>
                  <span className="text-2xl font-extrabold text-cyan-400 font-mono">{commissionRate}%</span>
                </div>

                <input
                  type="range"
                  min="2"
                  max="20"
                  step="0.5"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Moderation Catalog List */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white">Catalog Moderation & Hero Showcase</h4>
                <div className="border border-slate-800 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold p-3 border-b border-slate-800">
                      <tr>
                        <th className="p-3">Product Name</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Seller</th>
                        <th className="p-3 text-right">Hero Showcase</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {products.slice(0, 10).map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-3 font-bold text-white">{p.name}</td>
                          <td className="p-3 text-emerald-400">{p.category}</td>
                          <td className="p-3 font-mono">₹{p.finalPrice}</td>
                          <td className="p-3 text-slate-400">{p.sellerName}</td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => onToggleFeature(p.id)}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                                p.isFeatured
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              {p.isFeatured ? '★ Featured Hero' : 'Promote to Hero'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 28 CATEGORIES ANALYTICS TAB */}
          {activeTab === 'categories' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUPERMARKET_CATEGORIES.map((c) => {
                const count = products.filter(p => p.category === c.id).length;
                return (
                  <div key={c.id} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                    <span className="text-2xl">{c.icon}</span>
                    <div className="truncate">
                      <span className="font-bold text-white text-xs block truncate">{c.name}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{count || c.itemCount} SKUs Active</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* SELLERS TAB */}
          {activeTab === 'sellers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sellers.map((s) => (
                <div key={s.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{s.storeName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{s.tagline}</p>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 font-mono">
                    <span>Total Sales: ₹{s.totalSales.toLocaleString()}</span>
                    <span className="text-amber-400 font-bold">★ {s.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* COUPONS TAB */}
          {activeTab === 'coupons' && (
            <div className="space-y-4">
              <form onSubmit={handleCreateCoupon} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-3 text-xs">
                <input
                  type="text"
                  placeholder="Coupon Code (e.g. MEGA25)"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400 flex-1"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-24 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                >
                  Issue Coupon
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {coupons.map((c, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white font-mono text-sm block">{c.code}</span>
                      <span className="text-[11px] text-slate-400">{c.description}</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-xs">
                      {c.discount}{c.type === 'percent' ? '%' : '₹'} OFF
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
