/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, Users, Mail, Phone, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('Compra o Renovación');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // FAQ Expand-collapses state
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo funciona MR STREAMING?',
      a: 'Navegas por nuestro catálogo premium, seleccionas si deseas una cuenta completa privada o un perfil individual y el tiempo de suscripción (1, 3, 6, o 12 meses). Haces clic en procesar compra, lo cual te redirige al WhatsApp con tu orden preestablecida. Te entregaremos las credenciales (correo y contraseña más PIN de acceso) de inmediato tras el desembolso.'
    },
    {
      q: '¿Qué métodos de pago aceptan?',
      a: 'Aceptamos transferencias locales (Yape, Plin, Banco), tarjetas de crédito/débito en general mediante pasarelas de pago cifradas, PayPal para socios fuera del país, y criptomonedas populares USDT.'
    },
    {
      q: '¿Los productos son digitales?',
      a: 'Sí, son 100% digitales. Se te entrega un usuario y contraseña únicos generados legalmente mediante nuestra plataforma de streaming. No cobramos cargos de envío físico ni manipulaciones.'
    },
    {
      q: '¿Tienen soporte y garantía reales?',
      a: '¡Por supuesto! Es uno de nuestros pilares. Si tu cuenta presenta cualquier inconveniente debido a actualizaciones de geolocalización o de hogar, nos escribes al canal de WhatsApp directo y te reparamos el acceso u otorgamos una cuenta nueva de respaldo de manera prioritaria.'
    },
    {
      q: '¿Puedo cambiar la contraseña?',
      a: 'Para perfiles individuales y cuentas compartidas está estrictamente prohibido cambiar la clave o el correo de inicio para no afectar el acceso premium de los demás perfiles. Para cuentas completas privadas puedes personalizar perfiles y pins, pero recomendamos no alterar la facturación para no perder la garantía.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Send order query cleanly via Whatsapp
    const whatsappMessage = `📧 *CONSULTA / SOPORTE MR STREAMING* 📧\n\n` +
      `Nombre: ${name}\n` +
      `Correo: ${email}\n` +
      `Asunto: ${subject}\n` +
      `Mensaje: ${message}`;

    const targetPhone = '51987654321';
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="space-y-12 py-4 animate-fadeIn">
      {/* SECTION 1: HERO HEADER (Matches Screenshot 4) */}
      <div className="rounded-3xl border border-purple-500/15 bg-gradient-to-r from-[#14062c] to-[#04020a] p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-purple-500/5 blur-3xl" />
        <span className="text-xs font-mono font-bold tracking-widest text-[#ce37ff] uppercase bg-[#ce37ff]/10 px-3.5 py-1.5 rounded-full border border-[#ce37ff]/20">
          /// CONTACTO DIRECTO
        </span>
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mt-4">
          HABLEMOS ÉPICO ⚡
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-slate-300">
          ¿Tienes dudas sobre los accesos, renovaciones o promociones especiales para distribuidores? ¡Escríbenos de inmediato!
        </p>
      </div>

      {/* SECTION 2: THREE-PANEL CORE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* PANEL A (Cols 1-5): CONTACT FORM */}
        <div className="lg:col-span-5 border border-purple-500/10 bg-[#070410] rounded-2xl p-6 space-y-5 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 h-20 w-20 bg-purple-500/5 rounded-full blur-2xl" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-500/10 flex items-center gap-2">
            <Send className="h-4.5 w-4.5 text-purple-400" />
            Envíanos un mensaje
          </h3>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-450 mx-auto animate-bounce" />
              <h4 className="text-sm font-black text-white uppercase">Soporte Iniciado</h4>
              <p className="text-xs text-slate-400">Te estamos redirigiendo para abrir el canal de WhatsApp...</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Nombre Completo</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Correo Electrónico</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Asunto</label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-slate-300 focus:outline-none focus:border-purple-500/40 cursor-pointer"
                >
                  <option value="Compra o Renovación">Compra o Renovación</option>
                  <option value="Soporte por Caídas">Soporte por Caídas</option>
                  <option value="Socio Distribuidor">Socio Distribuidor / Mayoristas</option>
                  <option value="Sugerencias">Sugerencias o Feedback</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Mensaje detallado</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Escribe tu mensaje o las cuentas que deseas renovar..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/40 resize-none"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg cursor-pointer transition-all"
              >
                <span>Enviar Consulta</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* PANEL B (Cols 6-8): DIRECT CHANNELS */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border border-purple-500/10 bg-[#070410] rounded-2xl p-5 space-y-5 shadow-lg relative">
            <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-500/10">
              Canales Rápidos
            </h3>

            {/* Live support */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-xs font-black text-white uppercase">Chat Soporte (WA)</span>
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full select-none uppercase tracking-wide">
                    En Línea
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight mt-1">
                  Atención directa, reposiciones y canjes instantáneos.
                </p>
                <a
                  href="https://wa.me/51987654321"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-purple-400 hover:text-purple-300 block mt-1.5"
                >
                  +51 987 654 321
                </a>
              </div>
            </div>

            {/* Email contact */}
            <div className="flex items-start gap-3.5 pt-1.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-black text-white uppercase block">Correo General</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Para consultas corporativas y alianzas comerciales.
                </p>
                <a
                  href="mailto:hola@mrstreaming.com"
                  className="text-xs font-mono font-bold text-pink-400 hover:text-pink-300 block mt-1"
                >
                  hola@mrstreaming.com
                </a>
              </div>
            </div>

            {/* Discord channel */}
            <div className="flex items-start gap-3.5 pt-1.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-black text-white uppercase block">Comunidad Oficial</span>
                <p className="text-[11px] text-slate-400 mt-1">
                  Únete y participa en sorteos mensuales de cuentas Netflix.
                </p>
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono font-bold text-indigo-400 hover:text-indigo-300 block mt-1"
                >
                  discord.gg/mrstreaming
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL C (Cols 9-12): FREQUENTLY ASKED QUESTIONS */}
        <div className="lg:col-span-4 border border-purple-500/10 bg-[#070410] rounded-2xl p-6 space-y-5 shadow-lg relative">
          <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-500/10 flex items-center gap-2">
            <HelpCircle className="h-4.5 w-4.5 text-purple-400" />
            Preguntas Frecuentes
          </h3>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isExpanded = expandedFaqIndex === index;
              return (
                <div key={index} className="border-b border-slate-500/10 pb-3">
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : index)}
                    className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-200 hover:text-white transition-all focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-purple-400 font-bold ml-2 shrink-0">{isExpanded ? '−' : '+'}</span>
                  </button>
                  {isExpanded && (
                    <p className="mt-2 text-[11px] text-slate-400 leading-relaxed font-normal animate-slideDown">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// Simple quick helper SVG component for Discord icon representing social channels
const BrandDiscord = () => (
  <svg className="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.46-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 1-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);
