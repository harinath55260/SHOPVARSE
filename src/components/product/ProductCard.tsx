import React, { useState } from 'react';
import {
  Heart, ShoppingCart, Eye, Plus, Minus, Check, Star,
  Zap, Box, ShieldCheck, AlertCircle
} from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  quantityInCart?: number;
  isWishlisted?: boolean;
  onAddToCart: (product: Product) => void;
  onUpdateQuantity?: (productId: string, quantity: number) => void;
  onToggleWishlist?: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onOpen3D?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart = 0,
  isWishlisted = false,
  onAddToCart,
  onUpdateQuantity,
  onToggleWishlist,
  onQuickView,
  onOpen3D
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, quantityInCart + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, quantityInCart - 1);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 cursor-pointer overflow-hidden"
    >
      {/* Badges Overlay */}
      <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discountPercentage > 0 && (
          <span className="px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            {product.discountPercentage}% OFF
          </span>
        )}
        {product.badge && (
          <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            {product.badge}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-2xl backdrop-blur-md border transition-all cursor-pointer ${
          isWishlisted
            ? 'bg-rose-500/20 border-rose-500/40 text-rose-500 scale-110'
            : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900'
        }`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
      </button>

      {/* Product Image Box */}
      <div className="relative w-full aspect-square rounded-2xl bg-slate-950 overflow-hidden mb-3 border border-slate-800/80 flex items-center justify-center group-hover:border-slate-700 transition-colors">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* 3D Quick View Pill (Hover on desktop, icon badge on mobile) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onOpen3D) onOpen3D(product);
            else onQuickView(product);
          }}
          className={`hidden sm:flex absolute bottom-3 inset-x-3 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-emerald-400 text-xs font-bold items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer shadow-lg ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>Interactive 3D View</span>
        </div>

        {/* Mobile-only 3D View Badge */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onOpen3D) onOpen3D(product);
            else onQuickView(product);
          }}
          className="sm:hidden absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[10px] font-bold flex items-center gap-1 shadow-md"
          title="Inspect in 3D"
        >
          <Box className="w-3 h-3" />
          <span>3D</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1">
        {/* Brand & Weight */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 mb-1">
          <span className="font-semibold text-emerald-400 uppercase tracking-wider truncate">
            {product.brand}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 font-mono text-[10px] shrink-0 font-medium">
            {product.unit}
          </span>
        </div>

        {/* Product Title */}
        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug mb-2 min-h-[2.5rem]">
          {product.name}
        </h4>

        {/* Rating & Delivery Badge */}
        <div className="flex items-center justify-between text-xs mb-3 text-slate-400">
          <div className="flex items-center gap-1 font-semibold text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
          </div>
          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
            <Zap className="w-3 h-3 text-emerald-400" />
            {product.deliveryEstimate.split(' ')[0]} {product.deliveryEstimate.split(' ')[1]}
          </span>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 border-t border-slate-800/80 mt-auto flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-white font-mono">
                ₹{product.finalPrice}
              </span>
              {product.mrp > product.finalPrice && (
                <span className="text-[11px] text-slate-500 line-through font-mono">
                  ₹{product.mrp}
                </span>
              )}
            </div>
            {product.mrp > product.finalPrice && (
              <span className="text-[10px] text-emerald-400 font-bold block">
                Save ₹{product.mrp - product.finalPrice}
              </span>
            )}
          </div>

          {/* Add to Cart / Quantity Stepper Button */}
          {quantityInCart > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center bg-emerald-500 text-slate-950 rounded-xl p-1 font-bold text-xs shadow-md shadow-emerald-500/20"
            >
              <button
                onClick={handleDecrement}
                className="p-1 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono font-extrabold text-xs">{quantityInCart}</span>
              <button
                onClick={handleIncrement}
                className="p-1 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className={`py-2 px-3 sm:px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                justAdded
                  ? 'bg-emerald-400 text-slate-950 scale-105'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Added!</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
