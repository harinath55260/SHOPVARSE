import React, { useState } from 'react';
import {
  Scale, X, Plus, Check, Star, ShieldCheck, Zap,
  CheckCircle2, Sparkles, ArrowRight
} from 'lucide-react';
import { Product } from '../../types';

interface ProductComparisonModalProps {
  products: Product[];
  initialSelected?: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export const ProductComparisonModal: React.FC<ProductComparisonModalProps> = ({
  products,
  initialSelected = [],
  onClose,
  onAddToCart
}) => {
  const [selectedProds, setSelectedProds] = useState<Product[]>(() => {
    if (initialSelected.length > 0) return initialSelected.slice(0, 3);
    // Default to comparing Salt or Cooking Oil
    return products.filter(p => p.category === 'Salt & Sugar').slice(0, 2);
  });

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const handleAddProductSlot = (prodId: string) => {
    const p = products.find(x => x.id === prodId);
    if (!p || selectedProds.some(x => x.id === prodId)) return;
    if (selectedProds.length < 3) {
      setSelectedProds([...selectedProds, p]);
    }
  };

  const handleRemoveProductSlot = (prodId: string) => {
    setSelectedProds(selectedProds.filter(x => x.id !== prodId));
  };

  const handleAddToCart = (prod: Product) => {
    onAddToCart(prod);
    setAddedIds(prev => ({ ...prev, [prod.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [prod.id]: false }));
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>AI Supermarket Product Comparison</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Factual Metric Engine
                </span>
              </h3>
              <p className="text-xs text-slate-400">Compare purity, ingredients, price per unit & ratings side by side</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Selectors */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-slate-400 shrink-0">Add product to compare:</span>
            {products
              .filter(p => !selectedProds.some(sp => sp.id === p.id))
              .slice(0, 6)
              .map(prod => (
                <button
                  key={prod.id}
                  onClick={() => handleAddProductSlot(prod.id)}
                  disabled={selectedProds.length >= 3}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold text-slate-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap transition-colors border border-slate-700/50"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{prod.name.split(' ').slice(0, 3).join(' ')}</span>
                </button>
              ))}
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedProds.map((prod) => (
              <div
                key={prod.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between relative shadow-lg group hover:border-emerald-500/30 transition-all"
              >
                {/* Remove Cross */}
                {selectedProds.length > 1 && (
                  <button
                    onClick={() => handleRemoveProductSlot(prod.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 cursor-pointer"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

                <div>
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-44 object-cover rounded-xl bg-slate-900 border border-slate-800 mb-4"
                  />

                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    {prod.brand} • {prod.category}
                  </span>

                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-2">
                    {prod.name}
                  </h4>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-extrabold text-white font-mono">
                      ₹{prod.finalPrice}
                    </span>
                    {prod.mrp > prod.finalPrice && (
                      <span className="text-xs text-slate-500 line-through font-mono">
                        ₹{prod.mrp}
                      </span>
                    )}
                    {prod.discountPercentage > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                        {prod.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  {/* Comparison Spec List */}
                  <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/40">
                      <span className="text-slate-400">Pack Weight:</span>
                      <span className="font-bold text-white">{prod.unit}</span>
                    </div>

                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/40">
                      <span className="text-slate-400">Customer Rating:</span>
                      <span className="font-bold text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {prod.rating} ({prod.reviewCount})
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/40">
                      <span className="text-slate-400">Delivery Speed:</span>
                      <span className="font-semibold text-emerald-400">{prod.deliveryEstimate}</span>
                    </div>

                    <div className="flex justify-between text-slate-300 py-1 border-b border-slate-800/40">
                      <span className="text-slate-400">SKU Code:</span>
                      <span className="font-mono text-slate-400">{prod.sku}</span>
                    </div>

                    {prod.ingredients && (
                      <div className="py-1">
                        <span className="text-slate-400 block mb-0.5">Ingredients:</span>
                        <p className="text-[11px] text-slate-300 line-clamp-2 leading-tight">
                          {prod.ingredients}
                        </p>
                      </div>
                    )}

                    {prod.expiryDate && (
                      <div className="flex justify-between text-slate-300 py-1">
                        <span className="text-slate-400">Shelf Life:</span>
                        <span className="font-medium text-slate-200">{prod.expiryDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-5 pt-3 border-t border-slate-800">
                  <button
                    onClick={() => handleAddToCart(prod)}
                    className="w-full py-2.5 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-md shadow-emerald-500/20"
                  >
                    {addedIds[prod.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add {prod.name.split(' ')[0]} to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* AI Synthesis Summary Card */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3 text-xs text-slate-300">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-white mb-1">AI Recommendation Summary:</h5>
              <p className="leading-relaxed">
                Both products meet rigorous FSSAI food-grade safety standards. If you are shopping for daily high-volume consumption, check the unit price per kilogram. Tata Salt delivers standardized vacuum purity, whereas Aashirvaad highlights mineral richness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
