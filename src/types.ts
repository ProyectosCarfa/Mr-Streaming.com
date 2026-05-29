/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'Cuentas Completas' | 'Perfiles' | 'Combos Especiales' | 'Música & Gaming';
  platform: 'netflix' | 'disney' | 'prime' | 'max' | 'paramount' | 'spotify' | 'crunchyroll' | 'youtube' | 'appletv';
  type: 'Completa' | 'Perfil' | 'Combo';
  tag?: 'NUEVO' | 'HOT' | '-20%' | '-30%' | 'RECOMENDADO' | 'MÁS VENDIDO' | 'POPULAR' | 'TENDENCIA';
  features: string[];
  durationOptions: {
    months: number;
    price: number;
    description: string;
  }[];
  detailedInfo: string;
  rules: string[];
  bannerColor: string; // Tailwind bg gradient or color text
  accentColor: string; // Purple, Cyan, Emerald, Rose etc.
  image?: string;
}

export interface CartItem {
  id: string; // product_id + duration
  product: Product;
  selectedDuration: number;
  price: number;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  whatsapp: string;
  tier: 'Básico' | 'Socio Épico' | 'Streaming Master' | 'Inversionista Legendario';
  avatar: string; // Base64 or Unsplash URL
  memberSince: string;
  points: number;
}
