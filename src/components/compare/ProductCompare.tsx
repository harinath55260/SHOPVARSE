import React from 'react';
import { X, Star, ShoppingBag, Plus, ArrowLeft } from 'lucide-react';
import { Product } from '../../types';

interface ProductCompareProps {
  compareProducts: Product[];
  allProducts: Product[];
  onRemoveCompare: (productId: string) => void;
  onAddCompare: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
}

export const ProductCompare: React.FC<ProductCompareProps> = ({
  compareProducts,
  allProducts,
  onRemoveCompare,
  onAddCompare,
  onAddToCart,
  onBack
}) => {
  const specKeys = [
    'Display',
    'Processor',
    'RAM',
    'Storage',
    'Battery',
    'Camera',
    'OS',
    'Warranty'
  ];

  const availableToAdd = allProducts.filter(
    (p) => !compareProducts.some((cp) => cp.id === p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Side-by-Side Hardware Comparison
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare technical architecture, thermal benchmarks, and commercial prices.
          </p>
        </div>
      </div>

      {compareProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800">
          <p className="text-base font-bold text-white mb-2">No Products Selected for Comparison</p>
          <p className="text-xs text-slate-400 mb-6">Select products from the marketplace or choose below to compare.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {allProducts.slice(0, 3).map((p) => (
              <button
                key={p.id}
                onClick={() => onAddCompare(p)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-cyan-300 cursor-pointer"
              >
                + Compare {p.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[700px] border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60">
            {/* Header Row: Product Overviews */}
            <div className="grid grid-cols-5 p-4 border-b border-slate-800 bg-slate-950/80">
              <div className="p-3 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-end">
                Feature / Spec
              </div>

              {compareProducts.map((p) => (
                <div key={p.id} className="p-3 text-center relative border-l border-slate-800/80">
                  <button
                    onClick={() => onRemoveCompare(p.id)}
                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-rose-400 rounded-lg cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="w-20 h-20 mx-auto rounded-xl bg-slate-900 overflow-hidden mb-2">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">{p.brand}</span>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{p.name}</h4>
                  <div className="flex items-center justify-center gap-1 mt-1 text-amber-400 text-xs font-bold tabular-nums">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{p.rating}</span>
                  </div>
                  <p className="text-sm font-extrabold text-white mt-1 tabular-nums">
                    ₹{p.price.toLocaleString('en-IN')}
                  </p>

                  <button
                    onClick={() => onAddToCart(p)}
                    className="mt-3 w-full py-1.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              ))}

              {/* Slot to add another product if less than 4 */}
              {compareProducts.length < 4 && (
                <div className="p-6 border-l border-slate-800/80 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-2">
                    <Plus className="w-5 h-5 text-cyan-400" />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 mb-2">Add another device</span>
                  <select
                    onChange={(e) => {
                      const match = allProducts.find((p) => p.id === e.target.value);
                      if (match) onAddCompare(match);
                    }}
                    value=""
                    className="bg-slate-950 border border-slate-800 text-xs text-white rounded-lg px-2 py-1 max-w-[140px]"
                  >
                    <option value="">Select device...</option>
                    {availableToAdd.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Spec Rows */}
            {specKeys.map((key, idx) => (
              <div
                key={key}
                className={`grid grid-cols-5 text-xs ${
                  idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/30'
                } border-b border-slate-800/60`}
              >
                <div className="p-3.5 font-bold text-slate-400 flex items-center">{key}</div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="p-3.5 border-l border-slate-800/60 text-slate-200 font-medium">
                    {p.specifications[key] || 'Standard spec'}
                  </div>
                ))}
                {compareProducts.length < 4 && <div className="border-l border-slate-800/60" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
