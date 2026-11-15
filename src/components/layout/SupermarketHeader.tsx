import React, { useState } from 'react';
import {
  ShoppingBag, Search, Mic, Box, Bot, Heart, MapPin,
  ChevronDown, Globe, Sparkles, Scale, ListPlus, Store,
  ShieldCheck, Zap, Menu, X, Cpu, Smartphone, User as UserIcon, LogOut, Lock
} from 'lucide-react';
import { SupermarketCategory, SupportedLanguage, PerformanceMode, User } from '../../types';
import { SUPERMARKET_CATEGORIES } from '../../data/supermarketData';
import { TRANSLATIONS } from '../../i18n/translations';

interface SupermarketHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenAI: () => void;
  onOpen3DStore: () => void;
  onOpenLists: () => void;
  onOpenCompare: () => void;
  onOpenSeller: () => void;
  onOpenAdmin: () => void;
  onOpenAndroidModal?: () => void;
  currentUser?: User | null;
  onOpenAuth?: () => void;
  onLogout?: () => void;
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  perfMode: PerformanceMode;
  onPerfModeChange: (mode: PerformanceMode) => void;
}

export const SupermarketHeader: React.FC<SupermarketHeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenAI,
  onOpen3DStore,
  onOpenLists,
  onOpenCompare,
  onOpenSeller,
  onOpenAdmin,
  onOpenAndroidModal,
  currentUser,
  onOpenAuth,
  onLogout,
  language,
  onLanguageChange,
  perfMode,
  onPerfModeChange
}) => {
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPerfOpen, setIsPerfOpen] = useState(false);
  const [selectedPincode, setSelectedPincode] = useState('560103, Bengaluru');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      
      {/* Top Micro Utility Ribbon */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-slate-900/80 border-b border-slate-800/50 text-[11px] text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Zap className="w-3 h-3" />
            <span>{t.fastDeliveryBadge}</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>100% Genuine Certified Supermarket Inventory</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Performance Mode Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsPerfOpen(!isPerfOpen)}
              className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span className="capitalize">{perfMode} 3D Mode</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            {isPerfOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
                {(['high', 'balanced', 'lite'] as PerformanceMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      onPerfModeChange(mode);
                      setIsPerfOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer ${
                      perfMode === mode ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
            >
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-2.5 h-2.5" />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'te', label: 'తెలుగు' },
                  { code: 'hi', label: 'हिन्दी' },
                  { code: 'ta', label: 'தமிழ்' }
                ].map((item) => (
                  <button
                    key={item.code}
                    onClick={() => {
                      onLanguageChange(item.code as SupportedLanguage);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                      language === item.code ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-slate-600">|</span>
          {onOpenAndroidModal && (
            <button
              onClick={onOpenAndroidModal}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer transition-colors bg-emerald-950/70 hover:bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30"
              title="SuperMart 3D Android App details and APK download"
            >
              <Smartphone className="w-3 h-3" />
              <span>Android App</span>
            </button>
          )}
          <button
            onClick={onOpenSeller}
            className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Store className="w-3 h-3" />
            <span>Seller Portal</span>
          </button>
          <button
            onClick={onOpenAdmin}
            className="hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3" />
            <span>Admin Panel</span>
          </button>

          <span className="text-slate-600">|</span>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-semibold text-slate-200">
                <span className={`w-2 h-2 rounded-full ${
                  currentUser.role === 'admin' ? 'bg-cyan-400 animate-pulse' : currentUser.role === 'seller' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                <span className={`text-[9px] uppercase font-mono px-1.5 py-0.2 rounded font-bold ${
                  currentUser.role === 'admin' ? 'bg-cyan-500/20 text-cyan-300' : currentUser.role === 'seller' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {currentUser.role}
                </span>
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-rose-400 cursor-pointer transition-colors p-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 font-semibold cursor-pointer transition-colors"
            >
              <UserIcon className="w-3 h-3 text-emerald-400" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Primary Header */}
      <div className="px-4 sm:px-6 py-3 max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span>{t.brand}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  3D AI
                </span>
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">General Store & Supermarket</p>
            </div>
          </button>

          {/* Delivery Pincode Selector */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block leading-none">Deliver to:</span>
              <span className="font-bold text-slate-200 text-[11px] truncate max-w-[120px] block">
                {selectedPincode}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search & 28 Categories */}
        <div className="flex-1 max-w-xl hidden md:flex items-center gap-2">
          {/* Categories Dropdown Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
              className="px-3 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 cursor-pointer transition-colors whitespace-nowrap"
            >
              <span>{selectedCategory === 'all' ? '28 Categories' : selectedCategory}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isCatDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 max-h-[460px] overflow-y-auto bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-2 z-50 grid grid-cols-1 gap-1">
                <button
                  onClick={() => {
                    onSelectCategory('all');
                    setIsCatDropdownOpen(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-left text-xs font-bold transition-colors cursor-pointer ${
                    selectedCategory === 'all' ? 'bg-emerald-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  All Supermarket Aisles (100+ Products)
                </button>
                {SUPERMARKET_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCategory(c.id);
                      setIsCatDropdownOpen(false);
                    }}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                      selectedCategory === c.id ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-base">{c.icon}</span>
                    <span className="truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full py-2.5 pl-10 pr-10 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right: 3D Store, AI Advisor, Smart Lists & Cart */}
        <div className="flex items-center gap-2">
          
          {/* Enter 3D Supermarket Button */}
          <button
            onClick={onOpen3DStore}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-emerald-500/20"
          >
            <Box className="w-4 h-4 fill-slate-950" />
            <span>3D Virtual Store</span>
          </button>

          {/* AI Groceries Advisor Trigger */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/30 text-emerald-400 font-bold text-xs cursor-pointer transition-all hover:border-emerald-400"
            title="Open AI Supermarket Assistant"
          >
            <Bot className="w-4 h-4 animate-pulse text-emerald-400" />
            <span className="hidden lg:inline">AI Advisor</span>
          </button>

          {/* Smart Lists */}
          <button
            onClick={onOpenLists}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs cursor-pointer transition-colors"
            title="Curated Grocery Checklists"
          >
            <ListPlus className="w-4 h-4 text-amber-400" />
            <span>Pantry Lists</span>
          </button>

          {/* Compare Products */}
          <button
            onClick={onOpenCompare}
            className="hidden xl:flex items-center gap-1.5 px-3 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs cursor-pointer transition-colors"
            title="Side by Side Product Comparison"
          >
            <Scale className="w-4 h-4 text-cyan-400" />
            <span>Compare</span>
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => onSelectCategory('wishlist')}
            className="relative p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Smart Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 py-2 px-3 sm:px-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs cursor-pointer transition-all shadow-md shadow-emerald-500/20"
          >
            <ShoppingBag className="w-4 h-4 fill-slate-950" />
            <span className="font-mono font-extrabold text-xs">{cartCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Search & 3D Store Bar */}
      <div className="md:hidden px-4 pb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search groceries & staples..."
            className="w-full py-2 pl-9 pr-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <button
          onClick={onOpen3DStore}
          className="p-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1 shrink-0"
        >
          <Box className="w-4 h-4" />
          <span>3D Store</span>
        </button>

        {onOpenAndroidModal && (
          <button
            onClick={onOpenAndroidModal}
            className="p-2 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-400 hover:text-white font-bold text-xs flex items-center gap-1 shrink-0"
            title="Download SuperMart 3D Android App"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden xs:inline">App</span>
          </button>
        )}
      </div>
    </header>
  );
};
