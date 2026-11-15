import React from 'react';
import { Home, Store, Sparkles, Tag, ShoppingBag, Smartphone } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpen3DStore: () => void;
  onOpenAIAssistant: () => void;
  onOpenAndroidModal: () => void;
  onOpenDeals: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpen3DStore,
  onOpenAIAssistant,
  onOpenAndroidModal,
  onOpenDeals
}) => {
  return (
    <>
      {/* Quick Floating Cart Banner on Mobile when cart has items */}
      {cartCount > 0 && (
        <div className="md:hidden fixed bottom-[68px] left-3 right-3 z-40 animate-slideUp">
          <button
            onClick={onOpenCart}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-2xl shadow-xl shadow-emerald-950/60 flex items-center justify-between transition active:scale-98 border border-emerald-300/40"
          >
            <div className="flex items-center gap-2">
              <span className="bg-slate-950/20 px-2 py-0.5 rounded-md text-xs font-black">
                {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
              <span className="text-sm font-extrabold tracking-tight">₹{cartTotal.toFixed(0)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-black tracking-wide uppercase">
              <span>View Cart</span>
              <span className="text-sm">→</span>
            </div>
          </button>
        </div>
      )}

      {/* Native-style Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-2 py-1.5 safe-area-pb">
        <div className="grid grid-cols-5 items-center justify-around">
          {/* Home */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'home' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Home</span>
          </button>

          {/* 3D Supermarket Store */}
          <button
            onClick={() => {
              setActiveTab('3d-store');
              onOpen3DStore();
            }}
            className="flex flex-col items-center justify-center py-1 text-cyan-400 hover:text-cyan-300 transition relative"
          >
            <div className="relative">
              <Store className="w-5 h-5" />
              <span className="absolute -top-1 -right-2 px-1 text-[8px] font-bold bg-cyan-500 text-slate-950 rounded-full">
                3D
              </span>
            </div>
            <span className="text-[10px] font-medium mt-0.5">3D Aisles</span>
          </button>

          {/* AI Groceries Assistant */}
          <button
            onClick={() => {
              setActiveTab('ai');
              onOpenAIAssistant();
            }}
            className="flex flex-col items-center justify-center py-1 text-emerald-400 hover:text-emerald-300 transition relative"
          >
            <div className="w-9 h-9 -mt-4 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-slate-950">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-bold text-emerald-400 mt-0.5">AI Smart</span>
          </button>

          {/* Deals */}
          <button
            onClick={() => {
              setActiveTab('deals');
              onOpenDeals();
            }}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'deals' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tag className="w-5 h-5" />
            <span className="text-[10px] font-medium mt-0.5">Deals</span>
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="flex flex-col items-center justify-center py-1 text-slate-400 hover:text-white transition relative"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium mt-0.5">Cart</span>
          </button>
        </div>
      </nav>
    </>
  );
};
