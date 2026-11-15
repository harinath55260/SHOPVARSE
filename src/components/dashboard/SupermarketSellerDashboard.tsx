import React, { useState } from 'react';
import {
  Store, Package, TrendingUp, DollarSign, AlertTriangle, Plus,
  Edit2, Trash2, CheckCircle2, Clock, Printer, ArrowUpRight,
  ShieldCheck, RefreshCw, X, Box, Tag
} from 'lucide-react';
import { Product, SellerProfile, PayoutRequest, SupermarketCategory } from '../../types';
import { SUPERMARKET_CATEGORIES } from '../../data/supermarketData';

interface SupermarketSellerDashboardProps {
  seller: SellerProfile;
  products: Product[];
  onClose: () => void;
  onAddProduct: (product: Partial<Product>) => void;
  onUpdateStock: (productId: string, newStock: number) => void;
  onDeleteProduct: (productId: string) => void;
}

export const SupermarketSellerDashboard: React.FC<SupermarketSellerDashboardProps> = ({
  seller,
  products,
  onClose,
  onAddProduct,
  onUpdateStock,
  onDeleteProduct
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'payouts' | 'add'>('inventory');
  
  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    brand: '',
    category: 'Rice & Grains' as SupermarketCategory,
    subcategory: 'Grains',
    mrp: 100,
    price: 85,
    unit: '1 kg',
    stock: 50,
    sku: '',
    ingredients: '',
    expiryDate: '12 Months',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80',
    model3D: 'grain_sack' as const
  });

  const sellerProducts = products.filter(p => p.sellerId === seller.id || p.sellerName === seller.storeName);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.brand) return;

    onAddProduct({
      name: newProd.name,
      brand: newProd.brand,
      category: newProd.category,
      subcategory: newProd.subcategory,
      mrp: Number(newProd.mrp),
      price: Number(newProd.price),
      finalPrice: Number(newProd.price),
      discountPercentage: Math.round(((newProd.mrp - newProd.price) / newProd.mrp) * 100),
      unit: newProd.unit,
      stock: Number(newProd.stock),
      inStock: Number(newProd.stock) > 0,
      availability: 'In Stock',
      sku: newProd.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      barcode: `890${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      ingredients: newProd.ingredients,
      expiryDate: newProd.expiryDate,
      deliveryEstimate: 'Express in 2 hours',
      model3D: newProd.model3D,
      images: [newProd.image],
      sellerId: seller.id,
      sellerName: seller.storeName,
      rating: 4.8,
      reviewCount: 1,
      createdAt: new Date().toISOString()
    });

    setActiveTab('inventory');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[94vh]">
        
        {/* Top Hub Bar */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>{seller.storeName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Verified Vendor
                </span>
              </h3>
              <p className="text-xs text-slate-400">{seller.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick KPI Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 pb-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Total Net GMV</span>
            <span className="text-xl font-extrabold text-white font-mono">₹{seller.totalSales.toLocaleString()}</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Active Grocery Catalog</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono">{sellerProducts.length} Items</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Take-Rate Commission</span>
            <span className="text-xl font-extrabold text-cyan-400 font-mono">{seller.commissionRate}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400 block">Vendor Rating</span>
            <span className="text-xl font-extrabold text-amber-400 font-mono">★ {seller.rating} / 5.0</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 flex border-b border-slate-800 text-xs font-bold gap-4">
          {(['inventory', 'add', 'orders', 'payouts'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 capitalize transition-all cursor-pointer border-b-2 ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab === 'add' ? '+ List New Supermarket Product' : tab}
            </button>
          ))}
        </div>

        {/* Tab Panes */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* INVENTORY TAB */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Live Shelf Stock & Batches</h4>
                <button
                  onClick={() => setActiveTab('add')}
                  className="py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </button>
              </div>

              <div className="border border-slate-800 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="p-3">Product / SKU</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Unit Pack</th>
                      <th className="p-3">Price / MRP</th>
                      <th className="p-3">In-Stock Qty</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {sellerProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 flex items-center gap-2.5">
                          <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded-lg bg-slate-950" />
                          <div>
                            <span className="font-bold text-white block">{p.name}</span>
                            <span className="font-mono text-[10px] text-slate-500">{p.sku}</span>
                          </div>
                        </td>
                        <td className="p-3 text-emerald-400 font-medium">{p.category}</td>
                        <td className="p-3 font-mono">{p.unit}</td>
                        <td className="p-3">
                          <span className="font-mono font-bold text-white">₹{p.finalPrice}</span>
                          <span className="text-slate-500 text-[10px] line-through ml-1 font-mono">₹{p.mrp}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold ${p.stock < 10 ? 'text-rose-400' : 'text-white'}`}>
                              {p.stock}
                            </span>
                            <button
                              onClick={() => onUpdateStock(p.id, p.stock + 20)}
                              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-[10px] font-bold text-slate-300 cursor-pointer transition-colors"
                              title="Restock +20 units"
                            >
                              +20 Restock
                            </button>
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg cursor-pointer"
                            title="Remove listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADD PRODUCT FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-2xl mx-auto">
              <h4 className="text-sm font-bold text-white pb-2 border-b border-slate-800">
                Register New Supermarket SKU
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Fortune Chakki Fresh Atta"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Brand Name</label>
                  <input
                    type="text"
                    required
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    placeholder="e.g. Fortune"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Select from 28 Categories</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as SupermarketCategory })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  >
                    {SUPERMARKET_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Net Weight / Pack Size</label>
                  <input
                    type="text"
                    required
                    value={newProd.unit}
                    onChange={(e) => setNewProd({ ...newProd, unit: e.target.value })}
                    placeholder="e.g. 1 kg, 500 g, 1 L, Pack of 4"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProd.mrp}
                    onChange={(e) => setNewProd({ ...newProd, mrp: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Initial Stock Count</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">3D Procedural Archetype</label>
                  <select
                    value={newProd.model3D}
                    onChange={(e) => setNewProd({ ...newProd, model3D: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="grain_sack">Grain Sack (Rice, Atta)</option>
                    <option value="pouch_dal">Pouch (Dal, Pulses)</option>
                    <option value="oil_bottle">Oil Bottle / Liquid Bottle</option>
                    <option value="milk_carton">Milk Carton</option>
                    <option value="cookie_pack">Cookie Pack</option>
                    <option value="chips_bag">Chips Foil Bag</option>
                    <option value="beverage_can">Beverage Can</option>
                    <option value="sauce_bottle">Sauce Bottle</option>
                    <option value="cleaning_bottle">Cleaner Spray Bottle</option>
                    <option value="bread_loaf">Bread Loaf</option>
                    <option value="salt_pack">Salt / Sugar Pouch</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish to SuperMart Catalog</span>
                </button>
              </div>
            </form>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-3 text-xs text-slate-300">
              <h4 className="text-sm font-bold text-white mb-2">Fulfillment Packing Slips & Manifests</h4>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Order #SM3D-882194</span>
                  <span className="text-slate-400 text-[11px]">2 items (India Gate Rice 5kg, Tata Salt 1kg)</span>
                </div>
                <button
                  onClick={() => window.print()}
                  className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dispatch Label</span>
                </button>
              </div>
            </div>
          )}

          {/* PAYOUTS TAB */}
          {activeTab === 'payouts' && (
            <div className="space-y-4 max-w-xl text-xs text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 block">Available Withdrawable Merchant Balance</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">₹42,850</span>
                <p className="text-[11px] text-slate-400">
                  Transferred via IMPS / UPI directly to {seller.email}
                </p>
              </div>
              <button
                onClick={() => alert('Payout request of ₹42,850 submitted for verification.')}
                className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
              >
                Request Instant Payout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
