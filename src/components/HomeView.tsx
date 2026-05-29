/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, ShieldAlert, Zap, Compass, Users, ShieldCheck, Heart, User } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { motion } from 'motion/react';

interface HomeViewProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, selectedDuration: number) => void;
  favoriteIds: string[];
  onToggleFavorite: (product: Product) => void;
  onNavigateTab: (tab: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products,
  onViewDetails,
  onAddToCart,
  favoriteIds,
  onToggleFavorite,
  onNavigateTab,
}) => {
  // Filter 4 high rating trending streaming accounts
  const trendingProducts = products.filter(p => 
    p.tag === 'MÁS VENDIDO' || p.tag === 'HOT' || p.tag === 'TENDENCIA' || p.tag === 'NUEVO'
  ).slice(0, 4);

  return (
    <div className="space-y-16 py-4">
      {/* SECTION 1: EPIC CYBERPUNK HERO BANNER (Matches Screenshot 1 layout) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-[#12082b] via-[#05030e] to-[#1a0c35] p-6 sm:p-12 md:p-16 text-center md:text-left shadow-2xl shadow-indigo-950/20"
      >
        {/* Background grid image with elegant blending */}
        <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
          <img
            src="/src/assets/images/Fondo-Inicio.png"
            alt="Cyber Streaming Grid"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Elegant gradients to blend the image perfectly with the dark theme while keeping text highly readable */}
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05030e] via-transparent to-[#12082b]/50" />
        </div>

        {/* Abstract glowing visual spheres representing characters */}
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-purple-600/10 blur-[90px] pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-pink-500/5 blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 items-center">
          {/* Hero text */}
          <div className="md:col-span-7 relative z-10">
            {/* Beautiful highlighted box overlay background with gradient backdrop and subtle tech background image */}
            <div className="relative overflow-hidden bg-black/60 backdrop-blur-md border border-purple-500/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
              
              <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-mono font-black text-pink-400 uppercase tracking-widest leading-none">
                /// BIENVENIDO A MR STREAMING
              </div>

              <h1 className="relative z-10 text-3xl xs:text-4xl sm:text-5xl lg:text-5xl font-black tracking-tighter text-white leading-[0.95] select-none text-left">
                EL STREAMING <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-400 drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
                  MÁS ÉPICO
                </span> <br />
                DEL INTERNET
              </h1>

              <p className="relative z-10 text-xs sm:text-sm text-slate-300 font-medium max-w-md leading-relaxed text-left">
                Cuentas y perfiles premium 100% estables de <span className="text-white font-bold decoration-purple-500 decoration-wavy underline">Netflix, Prime, Disney+ y Max</span> con entrega instantánea y garantía de reemplazo rápida.
              </p>

              {/* CTAs */}
              <div className="relative z-10 flex flex-col xs:flex-row gap-4 pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => onNavigateTab('productos')}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 text-xs font-black tracking-wider text-white shadow-lg shadow-purple-950/40 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                >
                  <span>EXPLORAR AHORA &rarr;</span>
                </button>
                <button
                  id="hero-trends-btn"
                  onClick={() => onNavigateTab('productos')}
                  className="flex items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-[#140b2a]/60 hover:bg-purple-950/20 px-6 py-3 text-xs font-bold tracking-wider text-purple-300 transition-all duration-300 hover:border-purple-500/60 cursor-pointer"
                >
                  <span>VER TENDENCIAS</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="relative z-10 flex flex-wrap items-center gap-4 border-t border-slate-500/10 pt-4">
                <div className="flex -space-x-2.5">
                  <img className="h-7 w-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop" alt="User" />
                  <img className="h-7 w-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" alt="User" />
                  <img className="h-7 w-7 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop" alt="User" />
                </div>
                <div className="text-[11px] text-left">
                  <span className="text-white font-black block">+100K Usuarios felices</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="font-bold text-slate-400 text-[10px]">4.9 / 5.0 calificación general</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Graphic character card representation - simplified, no text/borders */}
          <div className="md:col-span-5 relative z-10 flex justify-center">
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80 overflow-hidden transform transition-all duration-500 hover:scale-[1.03]">
              <img
                src="/src/assets/images/flork_combo_1779850949784.png"
                alt="Flork Combo Epic"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center opacity-100"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: PRODUCTOS TENDENCIA GRID */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <span className="text-purple-500">★</span> Productos Tendencia
            </h2>
            <p className="text-xs text-slate-400">Las suscripciones de streaming más solicitadas por la comunidad gamer hoy.</p>
          </div>
          <button
            id="see-all-btn"
            onClick={() => onNavigateTab('productos')}
            className="text-xs font-black text-purple-400 hover:text-purple-300 border border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 px-4.5 py-2 rounded-xl cursor-pointer self-start sm:self-center uppercase tracking-wider"
          >
            Ver Todos
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trendingProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
              isFavorite={favoriteIds.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      </div>

      {/* SECTION 3: CATEGORÍAS DE MEMES Y STREAMING (Matches Screenshot 1 layout) */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            <span className="text-pink-500">✦</span> Universos de Contenido
          </h2>
          <p className="text-xs text-slate-400">Navega a través de nuestras categorías premium dedicadas.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { tag: 'GAMER ZONE', color: 'from-[#140c34]/95 to-black', desc: 'Suscripciones óptimas para consolas y PC', count: '100% Estables', bgImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=400&auto=format&fit=crop' },
            { tag: 'MEME WORLD', color: 'from-[#0d1c3a]/95 to-black', desc: 'Cuentas con alta risa garantizada', count: 'Full HD', bgImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=400&auto=format&fit=crop' },
            { tag: 'NEON ANIME', color: 'from-[#2e0938]/95 to-black', desc: 'Plataformas favoritas otaku y simulcast', count: 'Crunchyroll', bgImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop' },
            { tag: 'FUNNY CLIPS', color: 'from-[#2c1a0e]/95 to-black', desc: 'YouTube Premium y vídeos infinitos', count: 'Sin anuncios', bgImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=400&auto=format&fit=crop' },
            { tag: 'VIRAL UNIVERSE', color: 'from-[#1a1c22]/95 to-black', desc: 'Servicios de streaming combinados premium', count: 'Mejores Combos', bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop' },
          ].map((cat, i) => (
            <div
              key={i}
              className={`rounded-2xl border border-purple-500/15 bg-gradient-to-br ${cat.color} p-5 flex flex-col justify-between h-40 shadow-lg relative group overflow-hidden`}
            >
              {/* Cover background image with blend overlay */}
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity duration-500">
                <img 
                  src={cat.bgImage} 
                  alt={cat.tag} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-350 uppercase block mb-1">
                  {cat.count}
                </span>
                <h4 className="text-base font-black text-white tracking-tight">{cat.tag}</h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-300 relative z-10 font-medium">
                {cat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: BENEFITS FOUR-WHEELER (Matches Screenshot footer bar layout) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 rounded-3xl border border-purple-500/10 bg-[#070410] p-6 text-center sm:text-left shadow-inner">
        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400">
            <Zap className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Envío Instantáneo</h4>
            <p className="text-xs text-slate-400 mt-0.5">Acceso inmediato y credenciales automáticas a tu chat.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/25 text-pink-400">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Sin Límites</h4>
            <p className="text-xs text-slate-400 mt-0.5">Disfruta de streaming 24/7 en tus pantallas simultáneas.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Seguridad Total</h4>
            <p className="text-xs text-slate-400 mt-0.5">Tus datos, contraseñas y cuentas siempre protegidos.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/25 text-blue-400">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight">Soporte Épico</h4>
            <p className="text-xs text-slate-400 mt-0.5">Resolución de bloqueos y caídas por personal técnico.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StarsGradient = () => (
  <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.174-.384.721-.384.896 0l1.795 3.95 4.314.485c.422.048.589.566.27.859l-3.21 2.933.956 4.256c.094.417-.35.74-.717.525L12 14.162l-3.834 2.155c-.367.215-.811-.108-.717-.525l.956-4.256-3.21-2.933c-.319-.293-.152-.81.27-.859l4.314-.485 1.795-3.95z" />
  </svg>
);
