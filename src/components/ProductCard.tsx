/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShoppingCart, Info, Heart } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, selectedDuration: number) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
}) => {
  // Setup color representations based on platform
  const getAccentClass = (accent: string) => {
    switch (accent) {
      case 'red': return 'text-red-500 hover:text-red-400 border-red-500/30 bg-red-500/10 focus:ring-red-500';
      case 'orange': return 'text-orange-500 hover:text-orange-400 border-orange-500/30 bg-orange-500/10 focus:ring-orange-500';
      case 'blue': return 'text-blue-500 hover:text-blue-400 border-blue-500/30 bg-blue-500/10 focus:ring-blue-500';
      case 'indigo': return 'text-indigo-500 hover:text-indigo-400 border-indigo-500/30 bg-indigo-500/10 focus:ring-indigo-500';
      case 'violet': return 'text-purple-500 hover:text-purple-400 border-purple-500/30 bg-purple-500/10 focus:ring-purple-500';
      case 'cyan': return 'text-cyan-500 hover:text-cyan-400 border-cyan-500/30 bg-cyan-500/10 focus:ring-cyan-500';
      case 'emerald': return 'text-emerald-500 hover:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 focus:ring-emerald-500';
      case 'sky': return 'text-sky-500 hover:text-sky-400 border-sky-500/30 bg-sky-500/10 focus:ring-sky-500';
      default: return 'text-purple-500 hover:text-purple-400 border-purple-500/30 bg-purple-500/10 focus:ring-purple-500';
    }
  };

  const getAccentBtnClass = (accent: string) => {
    switch (accent) {
      case 'red': return 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/40 focus:ring-red-500';
      case 'orange': return 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-900/40 focus:ring-orange-500';
      case 'blue': return 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/40 focus:ring-blue-500';
      case 'indigo': return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40 focus:ring-indigo-500';
      case 'violet': return 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40 focus:ring-purple-500';
      case 'cyan': return 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/40 focus:ring-cyan-500';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40 focus:ring-emerald-500';
      case 'sky': return 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-900/40 focus:ring-sky-500';
      default: return 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/40 focus:ring-purple-500';
    }
  };

  const tagColor = (tag?: string) => {
    if (!tag) return '';
    if (tag.includes('-%')) return 'bg-rose-500/25 border-rose-500/40 text-rose-400';
    if (tag === 'NUEVO') return 'bg-cyan-500/25 border-cyan-500/40 text-cyan-300';
    if (tag === 'HOT') return 'bg-amber-500/25 border-amber-500/40 text-amber-300';
    if (tag === 'MÁS VENDIDO') return 'bg-emerald-500/25 border-emerald-500/40 text-emerald-300';
    if (tag === 'TENDENCIA') return 'bg-purple-500/25 border-purple-500/40 text-purple-300';
    return 'bg-violet-500/20 border-violet-500/40 text-violet-300';
  };

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-purple-500/20 bg-[#0c0919]/90 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50"
    >
      {/* Background illumination */}
      <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-[60px] opacity-20 transition-all duration-300 group-hover:opacity-40 bg-gradient-to-r ${
        product.accentColor === 'red' ? 'from-red-600 to-transparent' :
        product.accentColor === 'orange' ? 'from-orange-500 to-transparent' :
        product.accentColor === 'blue' ? 'from-blue-500 to-transparent' :
        product.accentColor === 'indigo' ? 'from-indigo-500 to-transparent' :
        product.accentColor === 'cyan' ? 'from-cyan-500 to-transparent' :
        product.accentColor === 'emerald' ? 'from-emerald-500 to-transparent' :
        'from-purple-500 to-transparent'
      }`} />

      {/* Card Header & Badges */}
      <div className="p-5 flex-grow">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase bg-slate-400/10 px-2.5 py-1 rounded-full border border-slate-500/15">
            {product.category}
          </span>

          <div className="flex gap-2">
            {product.tag && (
              <span className={`text-[10px] font-mono tracking-wider font-bold uppercase border px-2.5 py-1 rounded-full ${tagColor(product.tag)}`}>
                {product.tag}
              </span>
            )}
            <button
              id={`fav-btn-${product.id}`}
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(product); }}
              className="relative z-30 rounded-full bg-slate-500/10 p-1.5 text-slate-400 transition-colors hover:bg-slate-500/20 hover:text-rose-500 focus:outline-none cursor-pointer"
            >
              <Heart className={`h-4.5 w-4.5 transition-transform duration-300 hover:scale-110 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            </button>
          </div>
        </div>

        {/* Customized Platform Banner with Flork Character */}
        <div className={`relative mb-4 flex h-44 flex-col justify-end overflow-hidden rounded-xl bg-gradient-to-tr ${product.bannerColor} p-4 text-white shadow-inner border border-purple-500/10`}>
          {/* Neon scanline accent for robotic feel */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-50" />
          
          {/* Flork character illustration backdrop */}
          {product.image && (
            <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden pointer-events-none z-0">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-contain object-right-bottom scale-110 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              />
            </div>
          )}

          <div className="absolute left-3 top-3 select-none text-[8px] font-mono opacity-60 bg-black/40 px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">
            SYS: {product.platform}_OK
          </div>

          <div className="relative z-10 w-[60%]">
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#ce37ff] uppercase block mb-1">
              Servicio {product.type}
            </span>
            <h3 className="text-md sm:text-base font-black leading-tight tracking-tight drop-shadow-md cursor-pointer uppercase font-sans" onClick={() => onViewDetails(product)}>
              {product.name}
            </h3>
          </div>
        </div>

        {/* Rating and Description */}
        <div className="mb-3 flex items-center gap-1.5 text-[10px]">
          <div className="flex items-center text-purple-400">
            <Star className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
            <span className="ml-1 font-bold">{product.rating}</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400 font-mono font-bold uppercase">CONEXIÓN DIRECTA</span>
          <span className="text-slate-500">|</span>
          <span className="text-indigo-400 font-mono text-[9px]">{product.deliveryTime || 'GARANTÍA TOTAL'}</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-1">
          {product.description}
        </p>
      </div>

      {/* Card Footer: Robotic Status Monitors & Actions (No pricing info) */}
      <div className="p-5 pt-0">
        <div className="mb-4 flex items-center justify-between border-t border-slate-500/10 pt-4 text-[10px] font-mono">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase">ESTADO DE CUENTA</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SOPORTE_ONLINE
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[9px] text-slate-500 uppercase">ENTREGA</span>
            <span className="text-purple-400 font-bold uppercase">INSTANTÁNEA</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            id={`info-btn-${product.id}`}
            onClick={() => onViewDetails(product)}
            className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090514] duration-300 cursor-pointer ${getAccentClass(product.accentColor)}`}
          >
            <Info className="h-4 w-4" />
            <span>Ver Más</span>
          </button>

          <button
            id={`add-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product, 1)} // Default 1 month directly from card
            className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black tracking-wider transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090514] duration-300 cursor-pointer ${getAccentBtnClass(product.accentColor)}`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Adquirir</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
