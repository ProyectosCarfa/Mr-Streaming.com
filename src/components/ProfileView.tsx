/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import { User, Mail, Phone, Award, Upload, CheckCircle2, Shield } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(profile.name);
  const [email, setEmail] = useState<string>(profile.email);
  const [whatsapp, setWhatsapp] = useState<string>(profile.whatsapp);
  const [tier, setTier] = useState<UserProfile['tier']>(profile.tier);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // File Selector Base64 converter handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onUpdateProfile({
        ...profile,
        avatar: base64String,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpdateProfile({
        ...profile,
        avatar: reader.result as string,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name,
      email,
      whatsapp,
      tier,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* HEADER SECTION */}
      <div className="rounded-3xl border border-purple-500/15 bg-gradient-to-r from-[#14052a] to-[#04020a] p-8 relative overflow-hidden text-center md:text-left">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl" />
        <span className="text-xs font-mono font-bold tracking-widest text-[#a855f7] uppercase bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Tu Perfil Premium
        </span>
        <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-3">
          Configura tu Espacio
        </h2>
        <p className="mt-1.5 text-xs text-slate-400">
          Modifica tus detalles y cambia tu avatar premium para vivir una experiencia de navegación 100% personalizada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: CUSTOM PHOTO UPLOAD & ACCUMULATED POINTS (Matches Screenshot 3 bottom right box) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Avatar box */}
          <div className="border border-purple-500/10 bg-[#070410] rounded-2xl p-6 text-center space-y-5 shadow-lg relative overflow-hidden">
            <h3 className="text-xs font-black tracking-widest text-slate-400 uppercase tracking-widest">
              Identidad Digital
            </h3>

            {/* Photo preview container */}
            <div className="relative group mx-auto h-32 w-32 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-950/20">
              <img
                src={profile.avatar}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay hover prompt */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-bold cursor-pointer transition-opacity duration-300"
              >
                <Upload className="h-5 w-5 mb-1 text-purple-400" />
                <span>SUBIR FOTO</span>
              </div>
            </div>

            {/* Drag & drop or upload area */}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-purple-500/20 hover:border-purple-500/40 rounded-xl p-4 bg-[#0a0518]/50 text-slate-400 text-xs cursor-pointer transition-all"
            >
              <p>Arrastra tu foto de perfil aquí o <span className="text-purple-400 font-bold">haz clic</span> para buscar.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>

            <div className="text-[10px] text-slate-500 leading-tight">
              Formatos soportados: JPG, PNG, GIF. Peso máximo 4MB. Guardado localmente.
            </div>
          </div>

          {/* VIP Active Warranty Card (No PTS or loyalty points) */}
          <div className="border border-purple-500/15 bg-gradient-to-br from-[#0e0725] to-[#04010a] rounded-2xl p-6 space-y-4 shadow-lg text-center">
            <div className="flex justify-center">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Shield className="h-5.5 w-5.5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#cf5eff] uppercase block font-bold leading-tight">
                MEMBRESÍA VIP ACTIVADA
              </span>
              <h4 className="text-sm font-black text-white uppercase mt-1">Socio Streaming Premium</h4>
            </div>

            <div className="bg-black/30 border border-purple-500/10 rounded-xl p-4 text-left space-y-2">
              <span className="text-[9px] font-mono text-slate-500 block tracking-wider uppercase">VINCULACIÓN DE SEGURIDAD</span>
              <div className="text-xs text-slate-300 leading-normal">
                Tu perfil de socio cuenta con redireccionamiento encriptado. Toda solicitud enviada a WhatsApp entra en canal prioritario automatizado.
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span>CANAL DIRECTO ACTIVADO</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 leading-relaxed bg-purple-950/10 border border-purple-500/10 rounded-xl p-3 text-left">
              Conserva siempre tu número de WhatsApp registrado para que el sistema identifique tu usuario de manera inmediata y asigne tus credenciales al instante.
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REWRITABLE PROFILE INFORMATION FORM */}
        <div className="lg:col-span-8 border border-purple-500/10 bg-[#070410] rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute left-1/2 bottom-0 h-40 w-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <h3 className="text-sm font-black text-white uppercase tracking-wider pb-3 border-b border-slate-500/10 flex items-center gap-2">
            <User className="h-4.5 w-4.5 text-purple-400" />
            Configuración Personal
          </h3>

          <form onSubmit={handleProfileSubmit} className="space-y-6 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    id="profile-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-3 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white focus:outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Correo de Socio</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    id="profile-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-3 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white focus:outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Teléfono / WhatsApp de Entrega</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <input
                    id="profile-whatsapp"
                    type="text"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-3 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-white focus:outline-none focus:border-purple-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase block">Nivel de Suscriptor</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <select
                    id="profile-tier"
                    value={tier}
                    onChange={(e) => setTier(e.target.value as UserProfile['tier'])}
                    className="w-full pl-9 pr-3.5 py-3 text-xs rounded-xl border border-purple-500/15 bg-[#0e0921] text-slate-300 focus:outline-none focus:border-purple-500/40 cursor-pointer"
                  >
                    <option value="Básico">Socio Básico (Acceso general)</option>
                    <option value="Socio Épico">Socio Épico (10% descuento)</option>
                    <option value="Streaming Master">Streaming Master (15% descuento)</option>
                    <option value="Inversionista Legendario">Inversionista Legendario Premium (20% descuento)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simulated registration details */}
            <div className="rounded-xl border border-purple-500/10 bg-[#0d0922] p-4 flex gap-3 text-xs text-slate-400 items-center">
              <Shield className="h-5 w-5 shrink-0 text-purple-400" />
              <div>
                Miembro oficial Premium desde: <strong>{profile.memberSince}</strong> • Estatus de Garantía: <strong className="text-emerald-400">Excelente</strong>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-3 border-t border-slate-500/10">
              <button
                id="profile-submit-btn"
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-purple-900/40 cursor-pointer"
              >
                <span>Guardar Cambios</span>
              </button>

              {saveSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-450 font-bold text-xs animate-fadeIn font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>¡CAMBIOS ACTUALIZADOS CON ÉXITO!</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
