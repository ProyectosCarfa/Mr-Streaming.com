/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FavoritesViewProps {
  products: Product[];
  favoriteIds: string[];
  onToggleFavorite: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, selectedDuration: number) => void;
  onNavigateTab: (tab: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  products,
  favoriteIds,
  onToggleFavorite,
  onViewDetails,
  onAddToCart,
  onNavigateTab,
}) => {
  const favoriteProducts = products.filter(p => favoriteIds.includes(p.id));

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* HEADER */}
      <div className="rounded-3xl border border-purple-500/15 bg-gradient-to-r from-[#14052a] to-[#04020a] p-8 text-center md:text-left relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-rose-500/5 blur-3xl animate-pulse" />
        <span className="text-xs font-mono font-bold tracking-widest text-rose-400 uppercase bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
          Tus Favoritos
        </span>
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-3">
          Suscripciones Favoritas
        </h2>
        <p className="mx-auto md:mx-0 mt-1.5 max-w-lg text-xs leading-relaxed text-slate-400">
          Guarda tus perfiles o cuentas completas preferidas aquí para monitorear sus precios y adquirirlos al instante cuando lo necesites.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        /* Empty state list */
        <div className="text-center py-20 border border-purple-500/10 bg-[#070410] rounded-2xl">
          <Heart className="h-14 w-14 text-rose-500/30 mx-auto mb-4" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Sin favoritos guardados</h3>
          <p className="max-w-xs text-xs text-slate-400 mt-1.5 mx-auto leading-relaxed">
            Presiona el icono de corazón en cualquiera de nuestras cuentas de streaming premium para archivarlas en esta sección exclusiva.
          </p>
          <button
            id="fav-browse-btn"
            onClick={() => onNavigateTab('productos')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-xs font-bold transition-all cursor-pointer"
          >
            <span>Ver Catálogo de cuentas</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        /* Products list grid */
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {favoriteProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onViewDetails}
              onAddToCart={onAddToCart}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};
