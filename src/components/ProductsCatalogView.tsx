/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Grid, RefreshCw, X } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductsCatalogViewProps {
  products: Product[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product, selectedDuration: number) => void;
  favoriteIds: string[];
  onToggleFavorite: (product: Product) => void;
}

export const ProductsCatalogView: React.FC<ProductsCatalogViewProps> = ({
  products,
  searchTerm,
  onSearchChange,
  onViewDetails,
  onAddToCart,
  favoriteIds,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos los productos');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<string>('popular');

  // Categories list based on data
  const categories = useMemo(() => {
    const list = new Set(products.map(p => p.category));
    return ['Todos los productos', ...Array.from(list)];
  }, [products]);

  // Compute filtered and sorted products
  const processedProducts = useMemo(() => {
    return products
      .filter(p => {
        // Search term matching
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.platform.toLowerCase().includes(searchTerm.toLowerCase());

        // Category matching
        const matchesCategory = selectedCategory === 'Todos los productos' || p.category === selectedCategory;

        // Price matching
        const matchesPrice = p.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest') return a.price - b.price;
        if (sortBy === 'highest') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default is rating/popularity
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, searchTerm, selectedCategory, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Todos los productos');
    setMaxPrice(100);
    onSearchChange('');
    setSortBy('popular');
  };

  return (
    <div className="space-y-8 py-4">
      {/* SECTION 1: HEADER TEXT */}
      <div className="rounded-3xl border border-purple-500/15 bg-gradient-to-r from-[#12052a] to-[#04020a] p-8 text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl" />
        <h2 className="text-3xl font-black uppercase tracking-tight text-white">
          Catálogo de Cuentas Premium
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-400">
          Encuentra perfiles privados y membresías completas al costo más competitivo, estables, sin recortes de pantalla y listas para disfrutar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SIDEBAR FILTERS (Matches Screenshot 2 layout) */}
        <div className="space-y-6 lg:col-span-1 border border-purple-500/10 bg-[#070410] rounded-2xl p-6 h-fit shrink-0">
          <div className="flex items-center justify-between border-b border-slate-500/10 pb-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="h-4.5 w-4.5 text-purple-400" />
              Filtrar Catálogo
            </h3>
            {(selectedCategory !== 'Todos los productos' || maxPrice !== 100 || searchTerm !== '') && (
              <button
                id="reset-filters-btn"
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-pink-400 hover:text-pink-300 font-mono flex items-center gap-1 cursor-pointer"
              >
                <X className="h-3 w-3" />
                LIMPIAR
              </button>
            )}
          </div>

          {/* Categorías */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black tracking-widest text-slate-450 uppercase">Categorías</h4>
            <div className="flex flex-col gap-1.5">
              {categories.map(cat => {
                const count = products.filter(p => cat === 'Todos los productos' || p.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600/25 border-purple-500 text-white font-bold'
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtrar por precio */}
          <div className="space-y-4 pt-4 border-t border-slate-500/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black tracking-widest text-slate-450 uppercase">Precio Máximo</h4>
              <span className="text-sm font-mono font-bold text-purple-400">${maxPrice} USD</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="1"
              max="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg bg-slate-800 accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>$1 USD</span>
              <span>$100 USD</span>
            </div>
          </div>

          {/* Info guarantee banner */}
          <div className="rounded-xl border border-emerald-500/10 bg-emerald-950/10 p-3.5 text-center text-xs text-emerald-300/95">
            🔒 Compra 100% Protegida. Cuentas creadas bajo estricta normativa digital sin riesgos de bloqueos permanentes.
          </div>
        </div>

        {/* PRODUCTS CATALOG SECTION (3/4 col space) */}
        <div className="lg:col-span-3 space-y-6">
          {/* SEARCH & SORT PANEL */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between border border-purple-500/10 bg-[#070410] rounded-2xl p-4">
            {/* Realtime Search Field */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-450" />
              <input
                id="catalog-search"
                type="text"
                placeholder="Buscar servicio streaming..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-purple-500/15 bg-[#0e0921] text-white placeholder-slate-455 focus:outline-none focus:border-purple-500/50"
              />
              {searchTerm && (
                <button
                  id="clear-search"
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Stats */}
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-xs text-slate-400 font-mono">
                Mostrando <strong className="text-white">{processedProducts.length}</strong> de <strong className="text-white">{products.length}</strong> productos
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-slate-450" />
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#0e0921] border border-purple-500/15 text-xs text-slate-300 py-1.5 pl-2.5 pr-8 rounded-xl focus:outline-none focus:border-purple-500/40 cursor-pointer"
                >
                  <option value="popular">Más Populares</option>
                  <option value="lowest">Precio: Menor a Mayor</option>
                  <option value="highest">Precio: Mayor a Menor</option>
                  <option value="rating">Calificación</option>
                </select>
              </div>
            </div>
          </div>

          {/* EMPTY STATE */}
          {processedProducts.length === 0 ? (
            <div className="text-center py-16 border border-purple-500/10 bg-[#070410]/50 rounded-2xl">
              <RefreshCw className="h-10 w-10 text-pink-400 animate-spin mx-auto mb-3" />
              <h3 className="text-base font-black text-white uppercase">No se hallaron productos</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                No encontramos cuentas premium que coincidan con tus filtros activos de búsqueda. Intenta limpiando los filtros para ver la colección.
              </p>
              <button
                id="empty-reset-btn"
                onClick={handleResetFilters}
                className="mt-4 text-xs font-bold bg-[#1d143c] border border-purple-500/20 hover:bg-[#25194d] text-white px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Restaurar Catálogo
              </button>
            </div>
          ) : (
            /* PRODUCTS GRID */
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {processedProducts.map(product => (
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
          )}
        </div>
      </div>
    </div>
  );
};
