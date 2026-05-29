/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, UserProfile } from './types';
import productsData from './data/products.json';

export const PLAYGROUND_PRODUCTS: Product[] = productsData as Product[];

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Streaming Lover',
  email: 'streamer.epic@mrstreaming.com',
  whatsapp: '+51 987 654 321',
  tier: 'Socio Épico',
  avatar: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=200&auto=format&fit=crop',
  memberSince: 'Marzo 2026',
  points: 2450
};

export const PLATFORMS_DETAILS = {
  netflix: {
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    borderColor: 'border-red-500',
    logo: 'Netflix',
    bg: 'bg-red-950/20'
  },
  disney: {
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
    borderColor: 'border-blue-500',
    logo: 'Disney+',
    bg: 'bg-blue-950/20'
  },
  prime: {
    color: 'bg-cyan-500',
    hoverColor: 'hover:bg-cyan-600',
    borderColor: 'border-cyan-500',
    logo: 'Prime Video',
    bg: 'bg-cyan-950/20'
  },
  max: {
    color: 'bg-indigo-500',
    hoverColor: 'hover:bg-indigo-600',
    borderColor: 'border-indigo-500',
    logo: 'Max',
    bg: 'bg-indigo-950/20'
  },
  paramount: {
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
    borderColor: 'border-sky-500',
    logo: 'Paramount+',
    bg: 'bg-sky-950/25'
  },
  spotify: {
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
    borderColor: 'border-emerald-500',
    logo: 'Spotify',
    bg: 'bg-emerald-950/20'
  },
  youtube: {
    color: 'bg-rose-600',
    hoverColor: 'hover:bg-rose-700',
    borderColor: 'border-rose-600',
    logo: 'YouTube',
    bg: 'bg-rose-950/20'
  },
  crunchyroll: {
    color: 'bg-orange-600',
    hoverColor: 'hover:bg-orange-700',
    borderColor: 'border-orange-600',
    logo: 'Crunchyroll',
    bg: 'bg-orange-950/20'
  },
  appletv: {
    color: 'bg-slate-300',
    hoverColor: 'hover:bg-slate-400',
    borderColor: 'border-slate-300',
    logo: 'Apple TV',
    bg: 'bg-slate-900/40'
  }
};
