import { MessageCircle, MessageSquare, Phone, MessagesSquare, Store, Megaphone, Globe, MonitorSmartphone, Share2, Building2, Camera } from 'lucide-react';
import React from 'react';

export interface PlatformMeta {
  id: string;
  name: string;
  icon: React.ElementType;
  colorClass: string;
}

const defaultMeta: PlatformMeta = {
  id: 'default',
  name: 'Platform',
  icon: Share2,
  colorClass: 'text-slate-600 bg-slate-50 border-slate-200',
};

export const platformMetadata: Record<string, PlatformMeta> = {
  // Chat
  facebookMessenger: {
    id: 'facebookMessenger',
    name: 'Facebook Messenger',
    icon: MessageCircle,
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram Direct',
    icon: Camera,
    colorClass: 'text-pink-600 bg-pink-50 border-pink-200',
  },
  zaloOA: {
    id: 'zaloOA',
    name: 'Zalo OA',
    icon: MessageSquare,
    colorClass: 'text-blue-500 bg-blue-50 border-blue-200',
  },
  zaloPersonal: {
    id: 'zaloPersonal',
    name: 'Zalo Cá nhân',
    icon: MessageCircle,
    colorClass: 'text-blue-400 bg-blue-50 border-blue-200',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    icon: Share2,
    colorClass: 'text-sky-500 bg-sky-50 border-sky-200',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: Phone,
    colorClass: 'text-green-500 bg-green-50 border-green-200',
  },
  websiteLiveChat: {
    id: 'websiteLiveChat',
    name: 'Website LiveChat',
    icon: Globe,
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  
  // Sales
  shopee: {
    id: 'shopee',
    name: 'Shopee',
    icon: Store,
    colorClass: 'text-orange-500 bg-orange-50 border-orange-200',
  },
  tiktokShop: {
    id: 'tiktokShop',
    name: 'TikTok Shop',
    icon: Store,
    colorClass: 'text-slate-900 bg-slate-100 border-slate-300',
  },
  lazada: {
    id: 'lazada',
    name: 'Lazada',
    icon: Store,
    colorClass: 'text-indigo-600 bg-indigo-50 border-indigo-200',
  },
  ecommerceWebsite: {
    id: 'ecommerceWebsite',
    name: 'Website TMĐT',
    icon: Globe,
    colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  },
  pos: {
    id: 'pos',
    name: 'Phần mềm POS',
    icon: MonitorSmartphone,
    colorClass: 'text-violet-600 bg-violet-50 border-violet-200',
  },
  erp: {
    id: 'erp',
    name: 'Hệ thống ERP',
    icon: Building2,
    colorClass: 'text-purple-600 bg-purple-50 border-purple-200',
  },
  
  // Ads
  metaAds: {
    id: 'metaAds',
    name: 'Meta Ads',
    icon: Megaphone,
    colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
  },
  googleAds: {
    id: 'googleAds',
    name: 'Google Ads',
    icon: Megaphone,
    colorClass: 'text-red-500 bg-red-50 border-red-200',
  },
  tiktokAds: {
    id: 'tiktokAds',
    name: 'TikTok Ads',
    icon: Megaphone,
    colorClass: 'text-slate-900 bg-slate-100 border-slate-300',
  },
  shopeeAds: {
    id: 'shopeeAds',
    name: 'Shopee Ads',
    icon: Megaphone,
    colorClass: 'text-orange-500 bg-orange-50 border-orange-200',
  },
  zaloAds: {
    id: 'zaloAds',
    name: 'Zalo Ads',
    icon: Megaphone,
    colorClass: 'text-blue-500 bg-blue-50 border-blue-200',
  },
};

export const getPlatformMeta = (key: string): PlatformMeta => {
  return platformMetadata[key] || { ...defaultMeta, name: key };
};
