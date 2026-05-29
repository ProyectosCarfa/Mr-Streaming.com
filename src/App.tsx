/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, User, Search, MapPin, Gamepad2, ShieldAlert, Sparkles, Send, Laptop, Smartphone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { PLAYGROUND_PRODUCTS, DEFAULT_USER_PROFILE, PLATFORMS_DETAILS } from './data';
import { Product, CartItem, UserProfile } from './types';
import { HomeView } from './components/HomeView';
import { ProductsCatalogView } from './components/ProductsCatalogView';
import { CartView } from './components/CartView';
import { ContactView } from './components/ContactView';
import { FavoritesView } from './components/FavoritesView';
import { ProfileView } from './components/ProfileView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Global States (synchronized with localStorage)
  const [activeTab, setActiveTab] = useState<string>(() => {
    return localStorage.getItem('mr_streaming_active_tab') || 'inicio';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mr_streaming_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mr_streaming_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mr_streaming_profile');
    return saved ? JSON.parse(saved) : DEFAULT_USER_PROFILE;
  });

  const [globalSearchTerm, setGlobalSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [activeLegalModal, setActiveLegalModal] = useState<'terminos' | 'privacidad' | 'cookies' | 'legal' | null>(null);

  // Auto-dismiss custom toast messages
  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  // Sync state changes with localStorage
  useEffect(() => {
    localStorage.setItem('mr_streaming_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('mr_streaming_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mr_streaming_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('mr_streaming_profile', JSON.stringify(profile));
  }, [profile]);

  // CARTS MANAGEMENT HANDLERS
  const handleAddToCart = (product: Product, duration: number, customPrice?: number) => {
    const finalPrice = customPrice !== undefined ? customPrice : product.price;
    const cartItemId = `${product.id}-${duration}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === cartItemId);
      if (existingIndex !== -1) {
        // Increment quantity if already exists
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        // Add new item
        return [...prevCart, {
          id: cartItemId,
          product,
          selectedDuration: duration,
          price: finalPrice,
          quantity: 1
        }];
      }
    });

    setToastMsg('Producto agregado al carrito.');
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // FAVORITES HANDLERS
  const handleToggleFavorite = (product: Product) => {
    setFavorites(prev => {
      if (prev.includes(product.id)) {
        setToastMsg('Eliminado de favoritos');
        return prev.filter(id => id !== product.id);
      } else {
        setToastMsg('Agregado a favoritos');
        return [...prev, product.id];
      }
    });
  };

  // Nav helper
  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black bg-cyber-grid text-white selection:bg-purple-600 selection:text-white relative">
      
      {/* BACKGROUND FLOATING ELEMENTS / STARS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />

      {/* FIXED NAVBAR ON TOP WITH MODE DEFAULT DARK LOOK AND ROBOTIC TECH BAR */}
      <nav className="sticky top-0 z-40 bg-black/95 backdrop-blur-md h-20 px-4 md:px-8 relative">
        {/* Slanted Cybernetic Border Overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[10px] pointer-events-none overflow-visible">
          <svg 
            className="w-full h-[10px] text-purple-500/35 overflow-visible" 
            preserveAspectRatio="none" 
            viewBox="0 0 1000 10" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base guide track */}
            <path 
              d="M0 8 H 250 L 280 2 H 1000" 
              stroke="rgba(139, 92, 246, 0.15)" 
              strokeWidth="1.5" 
            />
            {/* Glowing neon trace path */}
            <path 
              d="M0 8 H 250 L 280 2 H 1000" 
              stroke="url(#neon-gradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              className="drop-shadow-[0_0_4px_#cf5eff]"
            />
            {/* Tech Dots/Nodes */}
            <circle cx="250" cy="8" r="2.5" fill="#cf5eff" />
            <circle cx="280" cy="2" r="2.5" fill="#ff46b6" />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="25%" stopColor="#cf5eff" />
                <stop offset="28%" stopColor="#ff46b6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          
          {/* LOGO: MR STREAMING with premium custom brand logo */}
          <div 
            onClick={() => handleNavigateTab('inicio')} 
            className="flex items-center gap-2.5 cursor-pointer shrink-0 group"
          >
            <img 
              src="/src/assets/images/logo_mr_streaming_1779852538051.png" 
              alt="MR STREAMING Logo" 
              referrerPolicy="no-referrer"
              className="h-10 w-10 md:h-11 md:w-11 rounded-xl border border-purple-500/35 shadow-md shadow-purple-950/25 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-base md:text-lg font-black tracking-widest text-[#cf5eff] select-none uppercase">
                MR STREAMING
              </span>
              <span className="text-[8px] font-mono text-slate-400 tracking-wider">
                TIENDA DE STREAMING PREMIUM
              </span>
            </div>
          </div>

          {/* ACTIVE VIEW NAVIGATION TABS (Center) */}
          <div className="hidden lg:flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-slate-300">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'productos', label: 'Productos' },
              { id: 'favoritos', label: 'Favoritos' },
              { id: 'contacto', label: 'Contacto' },
              { id: 'perfil', label: 'Mi Perfil' }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => handleNavigateTab(tab.id)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 border cursor-pointer relative ${
                    isActive
                      ? 'bg-purple-600/15 border-purple-500/30 text-purple-300 font-black'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute bottom-1 inset-x-4 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  )}
                  {tab.id === 'favoritos' && favorites.length > 0 && (
                    <span className="ml-1.5 font-mono text-[9px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT UTILITIES: REAL-TIME SEARCH BOX, CART BUTTON, PROFILE SUMMARY */}
          <div className="flex items-center gap-2.5 md:gap-4 flex-1 md:flex-initial justify-end">
            
            {/* Realtime Search (nav-mounted quick navigation fallback trigger) */}
            <div className="relative hidden sm:block w-44 md:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <input
                id="navbar-search"
                type="text"
                placeholder="Buscar en tiempo real..."
                value={globalSearchTerm}
                onChange={(e) => {
                  setGlobalSearchTerm(e.target.value);
                  if (activeTab !== 'productos') {
                    setActiveTab('productos');
                  }
                }}
                className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] space-y-1.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40"
              />
            </div>

            {/* Shopping Cart button displaying dynamic counts */}
            <button
              id="header-cart-btn"
              onClick={() => handleNavigateTab('carrito')}
              className={`relative flex items-center justify-center gap-1.5 p-2 px-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeTab === 'carrito'
                  ? 'bg-purple-600/15 border-purple-500/40 text-purple-300'
                  : 'bg-transparent border-purple-500/15 text-slate-400 hover:text-white hover:border-purple-500/30'
              }`}
            >
              <ShoppingCart className="h-4.5 w-4.5" />
              <span className="text-xs font-black tracking-wider hidden xs:inline uppercase">Carrito</span>
              {cart.length > 0 && (
                <span className="font-mono text-[10px] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black px-1.5 py-0.5 rounded-full shadow-md animate-bounce">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Micro User Profile widget showing member status and points */}
            <div 
              onClick={() => handleNavigateTab('perfil')}
              className="flex items-center gap-2.5 cursor-pointer pl-1 border-l border-slate-500/10 group select-none"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="h-8.5 w-8.5 rounded-full object-cover border border-purple-500/20 group-hover:border-purple-500/60 transition-colors"
              />
              <div className="hidden md:block text-left text-[10px] leading-tight shrink-0">
                <span className="text-white font-black block group-hover:text-purple-350 transition-colors">
                  {profile.name}
                </span>
                <span className="text-slate-550 font-mono block">
                  {profile.points} PTS
                </span>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* MOBILE FLOATING TAB RAIL (Shows on lower responsive screens only for easy user access) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-purple-500/10 h-16 flex items-center justify-around text-slate-400 font-sans font-bold text-[10px] uppercase">
        {[
          { id: 'inicio', label: 'Inicio', icon: '★' },
          { id: 'productos', label: 'Productos', icon: '🛒' },
          { id: 'favoritos', label: 'Likes', icon: '♥' },
          { id: 'contacto', label: 'Ayuda', icon: '✉' },
          { id: 'perfil', label: 'Perfil', icon: '👤' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleNavigateTab(tab.id)}
              className={`flex flex-col items-center justify-center p-1.5 flex-grow cursor-pointer ${
                isActive ? 'text-purple-400 font-black' : 'text-slate-400'
              }`}
            >
              <span className="text-base select-none leading-none mb-1">{tab.icon}</span>
              <span className="text-[9px] uppercase tracking-wide leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* CORE CONTAINER BODY (Fluid and responsive Desktop-First) */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-12 min-h-[calc(100vh-17rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {activeTab === 'inicio' && (
              <HomeView
                products={PLAYGROUND_PRODUCTS}
                onViewDetails={setSelectedProduct}
                onAddToCart={(product, months) => handleAddToCart(product, months)}
                favoriteIds={favorites}
                onToggleFavorite={handleToggleFavorite}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'productos' && (
              <ProductsCatalogView
                products={PLAYGROUND_PRODUCTS}
                searchTerm={globalSearchTerm}
                onSearchChange={setGlobalSearchTerm}
                onViewDetails={setSelectedProduct}
                onAddToCart={(product, months) => handleAddToCart(product, months)}
                favoriteIds={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'favoritos' && (
              <FavoritesView
                products={PLAYGROUND_PRODUCTS}
                favoriteIds={favorites}
                onToggleFavorite={handleToggleFavorite}
                onViewDetails={setSelectedProduct}
                onAddToCart={(product, months) => handleAddToCart(product, months)}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'contacto' && <ContactView />}

            {activeTab === 'perfil' && (
              <ProfileView 
                profile={profile} 
                onUpdateProfile={setProfile} 
              />
            )}

            {activeTab === 'carrito' && (
              <CartView
                cartItems={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onNavigateTab={handleNavigateTab}
                userWhatsapp={profile.whatsapp}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* DETAILED SUSCRIPTION MODAL WITH COMPREHENSIVE INFOS (Triggered reactively) */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* MAIN CYBERPUNK THEMED FOOTER */}
      <footer className="border-t border-purple-500/10 bg-black py-12 px-4 md:px-8 relative overflow-hidden text-center md:text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-lg font-black tracking-tighter">
              MR STREAMING
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              El lugar donde el entretenimiento premium, la estabilidad total y la seguridad digital se vuelven épicas. Memes aside, serious quality.
            </p>
            
            {/* Social Media Link Icons */}
            <div className="flex gap-3 pt-2 justify-center md:justify-start">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/5 text-purple-400 hover:text-pink-400 hover:border-pink-400/40 transition-all cursor-pointer" title="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/5 text-purple-400 hover:text-blue-450 hover:border-blue-400/40 transition-all cursor-pointer" title="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/5 text-purple-400 hover:text-emerald-400 hover:border-emerald-400/40 transition-all cursor-pointer" title="WhatsApp Soporte">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-500/15 bg-purple-500/5 text-purple-400 hover:text-indigo-400 hover:border-indigo-400/40 transition-all cursor-pointer" title="Discord">
                <Gamepad2 className="h-4 w-4" />
              </a>
            </div>

            <div className="text-[10px] text-purple-400 font-mono tracking-wider pt-2">
              🟢 ESTABILIDAD RED_MONITOR: 100% ONLINE
            </div>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase text-white tracking-widest mb-4">Navegación Épica</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => handleNavigateTab('inicio')} className="hover:text-purple-400 cursor-pointer">Inicio</button></li>
              <li><button onClick={() => handleNavigateTab('productos')} className="hover:text-purple-400 cursor-pointer">Catálogo de Cuentas</button></li>
              <li><button onClick={() => handleNavigateTab('favoritos')} className="hover:text-purple-400 cursor-pointer">Tus Favoritos</button></li>
              <li><button onClick={() => handleNavigateTab('contacto')} className="hover:text-purple-400 cursor-pointer">Preguntas FAQ</button></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase text-white tracking-widest mb-4">Suscripciones Top</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="text-slate-450 font-semibold cursor-default">Netflix UHD 4K</span></li>
              <li><span className="text-slate-450 font-semibold cursor-default">Disney+ Premium Plus</span></li>
              <li><span className="text-slate-450 font-semibold cursor-default">Max (HBO) Premium</span></li>
              <li><span className="text-slate-450 font-semibold cursor-default">Youtube Premium Familiar</span></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-black uppercase text-white tracking-widest mb-4">Socio Garantizado</h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Cada cuenta vendida está garantizada de forma íntegra durante la vigencia elegida. Soporte activo 24/7.
            </p>
            <div className="flex gap-2.5 justify-center md:justify-start">
              <span className="bg-purple-950/30 text-purple-400 text-[10px] font-mono border border-purple-500/15 p-1.5 px-3 rounded-lg leading-none">
                🔒 COMPRA SEGURA
              </span>
              <span className="bg-emerald-950/30 text-emerald-400 text-[10px] font-mono border border-emerald-500/15 p-1.5 px-3 rounded-lg leading-none">
                🟢 SOPORTE ACTIVO
              </span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-500/5 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-[10px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} MR STREAMING. Todos los derechos reservados. Diseñado para ofrecer la mejor estabilidad digital.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-purple-400 font-sans font-bold">
            <button onClick={() => setActiveLegalModal('terminos')} className="hover:text-purple-300 transition-colors pointer-events-auto cursor-pointer">Términos y Condiciones</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setActiveLegalModal('privacidad')} className="hover:text-purple-300 transition-colors pointer-events-auto cursor-pointer">Política de Privacidad</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setActiveLegalModal('cookies')} className="hover:text-purple-300 transition-colors pointer-events-auto cursor-pointer">Política de Cookies</button>
            <span className="text-slate-800">|</span>
            <button onClick={() => setActiveLegalModal('legal')} className="hover:text-purple-300 transition-colors pointer-events-auto cursor-pointer">Aviso Legal</button>
          </div>
        </div>
      </footer>

      {/* Floating System Toast Alert */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 md:right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#090514]/95 border border-purple-500/30 text-[#d28eff] font-mono text-[11px] shadow-2xl shadow-purple-950/40 backdrop-blur-md max-w-[90vw] md:max-w-md"
          >
            <span className="font-bold shrink-0">❤️ </span>
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEGAL MODALS DIALOGS */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-purple-500/30 bg-[#070410] p-6 sm:p-8 text-slate-350 shadow-2xl flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-purple-500/10 pb-4">
              <h3 className="text-lg font-black text-white uppercase tracking-tight font-mono">
                {activeLegalModal === 'terminos' && '✦ Términos y Condiciones'}
                {activeLegalModal === 'privacidad' && '✦ Política de Privacidad'}
                {activeLegalModal === 'cookies' && '✦ Consentimiento y Cookies'}
                {activeLegalModal === 'legal' && '✦ Aviso Legal'}
              </h3>
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="rounded-xl border border-purple-500/20 hover:border-purple-500/40 bg-purple-500/5 px-3 py-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-all cursor-pointer font-mono"
              >
                CERRAR [X]
              </button>
            </div>

            <div className="text-xs space-y-4 leading-relaxed font-sans overflow-y-auto max-h-[55vh] pr-2 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
              {activeLegalModal === 'terminos' && (
                <>
                  <p className="font-bold text-white text-sm">1. RELACIÓN CONTRACTUAL</p>
                  <p>Bienvenido a MR STREAMING. Al adquirir cualquiera de nuestras suscripciones, licencias premium o acceso temporal a perfiles interactivos de streaming, declaras conocer y aceptar los presentes Términos y Condiciones de Uso.</p>
                  
                  <p className="font-bold text-white text-sm">2. NATURALEZA DEL SERVICIO</p>
                  <p>MR STREAMING actúa como administrador técnico y facilitador de accesos compartidos de cuentas familiares o residenciales oficiales contratadas directamente a los proveedores de contenido (Netflix, Max, Disney, Amazon, Spotify, YouTube). El usuario contrata el derecho de uso compartido o uso completo por periodos mensuales prepago de forma garantizada.</p>
                  
                  <p className="font-bold text-white text-sm">3. NORMAS DE CONDUCTA Y ACCESO</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Los perfiles compartidos son exclusivamente para un (1) dispositivo activo simultáneamente por perfil individual adquirido.</li>
                    <li>Soporte Técnico se reserva el derecho de revertir o reasignar accesos si se detecta uso simultáneo fraudulento en más pantallas de las contratadas.</li>
                    <li>Está estrictamente prohibido cambiar la dirección de correo principal, contraseña rectora, configurar métodos de pago adicionales, o alterar perfiles ajenos compartidos. El incumplimiento anulará de inmediato la garantía sin opción a reembolso.</li>
                  </ul>

                  <p className="font-bold text-white text-sm">4. POLÍTICA DE GARANTÍAS</p>
                  <p>Proporcionamos una garantía total que cubre la totalidad de los días contratados. Ante una eventual caída del perfil por re-enrutamientos, cambios de política de hogares de los canales principales o suspensiones técnicas, nuestro equipo resolverá la situación proveyendo un nuevo PIN o credencial alternativa en un periodo ágil menor a 24 horas hábiles.</p>
                </>
              )}

              {activeLegalModal === 'privacidad' && (
                <>
                  <p className="font-bold text-white text-sm">1. RESPETO A TU PRIVACIDAD</p>
                  <p>En MR STREAMING tomamos muy en serio la seguridad y confidencialidad. Tu información personal nunca es comercializada a terceros ni expuesta públicamente en ningún canal.</p>
                  
                  <p className="font-bold text-white text-sm">2. DATOS QUE RECOLECTAMOS</p>
                  <p>Únicamente almacenamos temporalmente datos para procesar el despacho de tus compras y prestar soporte:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Nombre, correo electrónico registrado e historial básico de carrito de compras.</li>
                    <li>Tu identificador telefónico a través del canal oficial de WhatsApp al solicitar activaciones de claves PIN o reemplazo de cuentas.</li>
                  </ul>

                  <p className="font-bold text-white text-sm">3. ENCRIPTACIÓN DE DATOS</p>
                  <p>No recopilamos ni tenemos acceso directo a tarjetas bancarias o datos financieros sensibles. Todos los links de checkout de pago son procesados con pasarelas certificadas y encriptadas de alta confiabilidad.</p>
                </>
              )}

              {activeLegalModal === 'cookies' && (
                <>
                  <p className="font-bold text-white text-sm">1. ¿CÓMO UTILIZAMOS LAS COOKIES?</p>
                  <p>Este portal utiliza cookies técnicas de sesión necesarias única y exclusivamente para el correcto funcionamiento de las siguientes características interactivas:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Carrito de Suscripciones:</strong> Para retener tus cuentas agregadas antes de procesar tu compra formal.</li>
                    <li><strong>Sección de Favoritos:</strong> Para recordar tus perfiles preferidos de forma temporal e inmediata.</li>
                    <li><strong>Preferencia de Pestañas:</strong> Para recordar la sección en la que te encuentras navegando de forma óptima.</li>
                  </ul>
                  <p>Las cookies son seguras, client-side, y no recopilan información oculta de tu disco duro ni realizan rastreo invasivo de anuncios.</p>
                </>
              )}

              {activeLegalModal === 'legal' && (
                <>
                  <p className="font-bold text-white text-sm">1. MARCA OPERATIVA</p>
                  <p>MR STREAMING opera de manera independiente y descentralizada como agregador de licencias, perfiles optimizados y distribución de servicios prepagados digitales para entretenimiento en vivo.</p>
                  
                  <p className="font-bold text-white text-sm">2. EXENCIÓN DE MARCAS REGISTRADAS</p>
                  <p>Los logotipos, marcas comerciales e imágenes de Netflix, Disney+, Max (HBO Max), Prime Video, Paramount+, Spotify, YouTube y Crunchyroll que se visualizan en nuestro catálogo pertenecen de forma exclusiva a sus respectivos titulares y titulares de derechos de autor. Su reproducción gráfica se realiza al solo efecto representativo de compatibilidad de los servicios ofrecidos, sin atribuir patrocinio técnico directo por parte de los mismos.</p>
                  
                  <p className="font-bold text-white text-sm">3. ATENCIÓN Y CONTACTO LEGAL</p>
                  <p>Por cualquier consulta, requerimiento administrativo de redistribuidor oficial o sugerencia, sírvase contactar a nuestro equipo legal disponible de inmediato a través del enlace de soporte y chat asignado en la aplicación.</p>
                </>
              )}
            </div>

            <div className="border-t border-purple-500/10 pt-4 flex justify-end">
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-black uppercase text-white shadow-lg shadow-purple-950/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                Entendido, Continuar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
