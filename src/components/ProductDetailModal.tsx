/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Star, Check, ShieldCheck, Clock, ShieldAlert, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, duration: number, finalPrice: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const handleAddToCartAndClose = () => {
    onAddToCart(product, 1, product.price);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Soft backdrop click away */}
        <motion.div
          id="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal content element */}
        <motion.div
          id="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-purple-500/30 bg-[#06040d] text-white shadow-2xl shadow-purple-950/20"
        >
          {/* Scanline pattern for authentic robotic overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40 z-10" />

          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 rounded-full bg-slate-500/15 p-2 text-slate-400 hover:bg-slate-500/25 hover:text-white cursor-pointer border border-white/5"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Hero Header with Custom Color Block & Floating Mascot */}
          <div className={`relative bg-gradient-to-tr ${product.bannerColor} px-6 py-12 md:px-10 overflow-hidden border-b border-purple-500/20`}>
            {product.image && (
              <div className="absolute right-0 bottom-0 h-full w-1/3 overflow-hidden pointer-events-none z-0">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-contain object-right-bottom scale-110 drop-shadow-[0_0_20px_rgba(168,85,247,0.5)]"
                />
              </div>
            )}
            <div className="relative z-10 max-w-lg">
              <span className="text-[10px] font-mono font-bold tracking-widest text-purple-350 uppercase px-3 py-1 rounded-full bg-black/40 border border-purple-500/30">
                INFO COMPLETA • SOPORTE 100% GARANTIZADO
              </span>
              <h2 className="mt-4 text-2xl font-black md:text-4xl tracking-tight text-white drop-shadow-md uppercase">
                {product.name}
              </h2>
              <p className="mt-2 text-xs md:text-sm text-slate-100 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10 relative">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-5 animate-fadeIn">
              {/* Left Column (3/5) - Specifications, Rules, General Info */}
              <div className="md:col-span-3 space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-purple-400 uppercase mb-2">
                    /// SOBRE LA CUENTA
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {product.detailedInfo}
                  </p>
                </div>

                {/* Features List */}
                <div>
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-purple-400 uppercase mb-3">
                    /// CARACTERÍSTICAS DEL SERVICIO
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm text-slate-300">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-black">
                          ⚡
                        </span>
                        <span className="text-slate-200">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Security Rules */}
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
                  <div className="flex items-center gap-2 text-rose-400 mb-2">
                    <ShieldAlert className="h-5 w-5 shrink-0" />
                    <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider">
                      RESTRICCIONES DEL SERVIDOR (CRÍTICO)
                    </h4>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-rose-300/90 list-disc list-inside">
                    {product.rules.map((rule, i) => (
                      <li key={i}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column (2/5) - Robotic specifications layout, No Pricing selection */}
              <div className="md:col-span-2 space-y-6">
                <div className="border border-purple-500/15 bg-[#0a0614] rounded-2xl p-5 space-y-4">
                  <h4 className="text-[11px] font-mono font-bold tracking-wider text-purple-400 uppercase border-b border-purple-500/10 pb-2">
                    DETALLES DE ENTREGA
                  </h4>

                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-mono">DISPONIBILIDAD</span>
                      <span className="text-emerald-400 font-bold font-mono">INMEDIATA</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-mono">SOPORTE POSTVENTA</span>
                      <span className="text-purple-400 font-bold font-mono">GARANTÍA ACTIVA</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-mono">DISPOSITIVOS</span>
                      <span className="text-slate-300 font-bold font-mono">TV / CELULAR / PC</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 font-mono">TIPO DE SERVICIO</span>
                      <span className="text-purple-300 font-bold font-mono">PREMIUM COMPROMETIDO</span>
                    </div>
                  </div>
                </div>

                {/* Mascot Banner inside control column */}
                <div className="rounded-2xl border border-purple-500/10 bg-[#0d0922]/50 p-4 flex flex-col items-center text-center space-y-2">
                  <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 font-bold">
                    🚀
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-widest font-black">GARANTÍA INTEGRAL</span>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    El soporte de MR STREAMING restablece de inmediato accesos premium ante cualquier contratiempo.
                  </p>
                </div>

                {/* Action button without pricing */}
                <div className="border-t border-slate-500/15 pt-4">
                  <button
                    id="add-cart-detail-btn"
                    onClick={handleAddToCartAndClose}
                    className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-purple-900/40 font-mono focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d091f] cursor-pointer transition-all duration-300"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Solicitar Acceso ⚡</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
