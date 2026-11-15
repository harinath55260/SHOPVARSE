import React, { useState } from 'react';
import {
  ListPlus, X, Plus, Trash2, ShoppingBag, Check,
  Sparkles, CheckCircle2, ArrowRight
} from 'lucide-react';
import { SmartShoppingList, Product, CartItem } from '../../types';
import { SMART_SHOPPING_LISTS } from '../../data/supermarketData';

interface SmartShoppingListsModalProps {
  allProducts: Product[];
  onClose: () => void;
  onAddMultipleToCart: (items: { product: Product; quantity: number }[]) => void;
}

export const SmartShoppingListsModal: React.FC<SmartShoppingListsModalProps> = ({
  allProducts,
  onClose,
  onAddMultipleToCart
}) => {
  const [lists, setLists] = useState<SmartShoppingList[]>(SMART_SHOPPING_LISTS);
  const [selectedListId, setSelectedListId] = useState<string>(lists[0].id);
  const [addedListId, setAddedListId] = useState<string | null>(null);

  const selectedList = lists.find(l => l.id === selectedListId) || lists[0];

  const handleAddAllToCart = (list: SmartShoppingList) => {
    const bundle: { product: Product; quantity: number }[] = [];
    list.items.forEach(item => {
      const prod = allProducts.find(p => p.id === item.productId);
      if (prod) {
        bundle.push({ product: prod, quantity: item.quantity });
      }
    });

    if (bundle.length > 0) {
      onAddMultipleToCart(bundle);
      setAddedListId(list.id);
      setTimeout(() => setAddedListId(null), 1800);
    }
  };

  const handleRemoveItemFromList = (productId: string) => {
    setLists(prev => prev.map(l => {
      if (l.id !== selectedListId) return l;
      return {
        ...l,
        items: l.items.filter(i => i.productId !== productId)
      };
    }));
  };

  const currentTotal = selectedList.items.reduce((sum, item) => sum + item.estimatedPrice * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ListPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>Smart Grocery Bundles & Shopping Lists</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  1-Click Pantry Restock
                </span>
              </h3>
              <p className="text-xs text-slate-400">Pre-curated and custom grocery checklists with bulk order dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
          
          {/* List Selector Column (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Select Curated Checklist:
            </span>
            {lists.map((l) => (
              <button
                key={l.id}
                onClick={() => setSelectedListId(l.id)}
                className={`w-full p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex items-center gap-3 ${
                  selectedListId === l.id
                    ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-lg'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="text-xl">{l.icon}</span>
                <div className="flex-1 truncate">
                  <h4 className="text-xs font-bold text-white truncate">{l.name}</h4>
                  <span className="text-[10px] text-slate-400">{l.items.length} items • {l.category}</span>
                </div>
              </button>
            ))}
          </div>

          {/* List Details (8 cols) */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedList.icon}</span>
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedList.name}</h4>
                    <span className="text-xs text-emerald-400">{selectedList.items.length} items configured</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Total:</span>
                  <span className="text-xl font-extrabold text-white font-mono">₹{currentTotal}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {selectedList.items.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="truncate flex-1">
                      <span className="font-bold text-white block truncate">{item.productName}</span>
                      <span className="text-[11px] text-slate-400">
                        Qty: {item.quantity} x {item.unit} • ₹{item.estimatedPrice * item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemoveItemFromList(item.productId)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 cursor-pointer"
                      title="Remove from list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => handleAddAllToCart(selectedList)}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg shadow-emerald-500/20"
              >
                {addedListId === selectedList.id ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>All Items Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-slate-950" />
                    <span>Add Entire List to Cart (₹{currentTotal})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
