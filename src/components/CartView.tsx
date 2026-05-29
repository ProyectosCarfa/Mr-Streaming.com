/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';
import { motion } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onNavigateTab: (tab: string) => void;
  userWhatsapp: string;
}

export const CartView: React.FC<CartViewProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateTab,
  userWhatsapp,
}) => {
  const [discountCode, setDiscountCode] = useState<string>('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (appliedDiscountPercent / 100);
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    setCouponError(null);
    setCouponSuccess(null);
    if (!discountCode.trim()) return;

    if (discountCode.trim().toUpperCase() === 'MRSTREAMING10') {
      setAppliedDiscountPercent(10);
      setCouponSuccess('¡Cupón MRSTREAMING10 aplicado! Tienes un 10% de descuento.');
    } else if (discountCode.trim().toUpperCase() === 'EPICO20') {
      setAppliedDiscountPercent(20);
      setCouponSuccess('¡Cupón EPICO20 aplicado! Tienes un 20% de descuento especial.');
    } else {
      setCouponError('Código inválido. Prueba con "MRSTREAMING10" o "EPICO20"');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Craft formatted string for WhatsApp order
    let message = `🚀 *¡NUEVA SOLICITUD DE CUENTAS MR STREAMING!* 🚀\n\n`;
    message += `Hola, deseo solicitar las siguientes cuentas o perfiles de entretenimiento premium:\n`;
    message += `-------------------------------------------\n`;

    cartItems.forEach((item, index) => {
      message += `• *${index + 1}. ${item.product.name}*\n`;
      message += `   Modalidad: ${item.product.type}\n`;
      message += `   Cantidad: ${item.quantity} dispositivo(s)\n\n`;
    });

    message += `-------------------------------------------\n`;
    message += `⚡ _Por favor, facilítenme la cotización del periodo, planes activos y métodos de pago disponibles (Yape, Plin, PayPal, Transferencia, etc.)_ ⚡\n`;
    message += `¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    
    // Support WhatsApp URL redirection
    const targetPhone = '51987654321'; // Standard support WhatsApp contact
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
    
    // Clear the cart on successful checkout redirect
    window.location.href = whatsappUrl;
    onClearCart();
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* HEADER SECTION with background image inside */}
      <div className="rounded-3xl border border-purple-500/15 relative overflow-hidden text-center md:text-left">
        {/* Imagen de fondo dentro del header */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/banner-Carrito.png"
            alt="Cyber Streaming Grid"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#14052a]/80 to-[#04020a]/80" />
        </div>
        
        {/* Contenido del header */}
        <div className="relative z-10 p-8">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-36 w-36 rounded-full bg-pink-500/5 blur-3xl" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#cf5eff] uppercase bg-[#cf5eff]/10 px-3 py-1 rounded-full border border-[#cf5eff]/20">
            REVISIÓN DE SOLICITUDES
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-3">
            Tu Carrito Épico
          </h2>
          <p className="mt-1.5 text-xs text-slate-400">
            Tu lista de solicitudes de cuentas está lista. Al presionar el botón inferior se autolimpiará el carrito y se enviará tu pedido directamente a nuestro WhatsApp oficial.
          </p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        /* SILENT EMPTY STATE - empty when starting or on pays completed */
        <div className="text-center py-20 border border-purple-500/10 bg-[#070410] rounded-2xl">
          <ShoppingCart className="h-14 w-14 text-slate-550 mx-auto mb-4 animate-bounce" />
          <h3 className="text-lg font-black text-white uppercase tracking-tight">Tu carrito está vacío</h3>
          <p className="max-w-xs text-xs text-slate-400 mt-1 mx-auto leading-relaxed">
            Aún no has agregado ninguna cuenta o perfil premium a tu lista de solicitudes. ¡Explora nuestro catálogo y selecciona tus preferidas!
          </p>
          <button
            id="cart-go-catalog-btn"
            onClick={() => onNavigateTab('productos')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-6 py-3 text-semibold text-xs font-bold font-sans transition-all cursor-pointer"
          >
            Ver Suscripciones Premium &rarr;
          </button>
        </div>
      ) : (
        /* CART LAYOUT CONTENT */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List of Products (2/3 size) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-500/10 pb-3">
              <span className="text-xs font-black text-white uppercase tracking-widest">Servicios Solicitados</span>
              <button
                id="clear-all-cart-btn"
                onClick={onClearCart}
                className="text-[10px] font-bold text-rose-400 hover:text-rose-300 font-mono tracking-wider cursor-pointer bg-rose-500/5 px-2.5 py-1.5 rounded-lg border border-rose-500/10"
              >
                LIMPIAR TODAS LAS SOLICITUDES
              </button>
            </div>

            <div className="space-y-3.5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-purple-500/10 bg-[#0c0919]/90 backdrop-blur-md relative"
                >
                  {/* Left block Product banner info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-tr ${item.product.bannerColor} p-2 flex flex-col justify-end text-white text-[9px] font-black uppercase tracking-tight select-none`}>
                      {item.product.platform.substring(0, 3)}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white leading-tight">{item.product.name}</h4>
                      <p className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-2">
                        <span>Modalidad: <strong className="text-purple-400">{item.product.type}</strong></span>
                        <span className="text-slate-600">•</span>
                        <span>Soporte: <strong>Garantizado</strong></span>
                      </p>
                      <span className="text-[10px] font-mono tracking-wider text-purple-400 inline-block mt-1 bg-purple-500/10 rounded px-1.5 py-0.5 uppercase">
                        GARANTIA: ACTIVA
                      </span>
                    </div>
                  </div>

                  {/* Counters */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-500/5 pt-3.5 sm:pt-0">
                    {/* Quantity counter */}
                    <div className="flex items-center border border-purple-500/15 rounded-lg bg-[#070410] overflow-hidden">
                      <button
                        id={`qty-minus-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 px-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-white font-mono">{item.quantity}</span>
                      <button
                        id={`qty-plus-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Status marker */}
                    <div className="text-right w-24">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase block">
                        VERIFICADO_OK
                      </span>
                    </div>

                    {/* Delete single button */}
                    <button
                      id={`delete-item-${item.id}`}
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all cursor-pointer"
                      title="Eliminar de Solicitudes"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Support guarantee details */}
            <div className="rounded-xl border border-purple-500/10 bg-[#070410] p-4 flex gap-3 items-center text-xs text-slate-400">
              <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-400" />
              <span>
                <strong>Garantía Estándar de MR Streaming:</strong> Si tu cuenta presenta inconvenientes de conexión, comunícate al canal de soporte adjuntando tu captura de WhatsApp. La reactivación o reemplazo se genera en menos de 2 horas hábiles.
              </span>
            </div>
          </div>

          {/* Checkout Column Summary without prices */}
          <div className="space-y-6">
            <div className="border border-purple-500/15 bg-[#070410] rounded-2xl p-6 space-y-5">
              <h3 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest pb-3 border-b border-slate-500/10">
                PROCESADOR_DE_PEDIDO
              </h3>

              {/* Status parameters */}
              <div className="space-y-3.5 text-xs text-slate-400 font-mono">
                <div className="flex justify-between items-center">
                  <span>Plataformas Totales</span>
                  <span className="text-white font-bold">{cartItems.length} servicios</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Cuentas por Adquirir</span>
                  <span className="text-white font-bold">{cartItems.reduce((acc, current) => acc + current.quantity, 0)} perfiles</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Envío Digital Directo</span>
                  <span className="text-emerald-400 font-bold uppercase">INSTANTÁNEO</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Soporte VIP Postventa</span>
                  <span className="text-purple-400 font-bold uppercase">HABILITADO</span>
                </div>
              </div>

              {/* Checkout process button */}
              <button
                id="cart-submit-btn"
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-purple-900/30 font-mono cursor-pointer animate-pulse"
              >
                <span>PROCESAR AL WHATSAPP (AQUIRIR)</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>

              <div className="text-center text-[10px] text-slate-550 leading-relaxed pt-2">
                🟢 Al presionar, el carrito se vaciará y serás re-enrutado de inmediato a nuestra línea de WhatsApp, donde el soporte de MR STREAMING te entregará las credenciales y te indicará los métodos de pago.
              </div>
            </div>

            <button
              id="continue-shopping-btn"
              onClick={() => onNavigateTab('productos')}
              className="w-full text-center text-xs font-bold text-slate-400 hover:text-white border border-dashed border-slate-500/15 py-3 rounded-xl hover:border-slate-500/35 transition-all cursor-pointer font-mono uppercase"
            >
              &larr; Añadir Más Plataformas
            </button>
          </div>
        </div>
      )}
    </div>
  );
};