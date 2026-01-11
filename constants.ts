
import { ServicePackage, ServiceCategory } from './types';

export const SMM_SERVICES: ServicePackage[] = [
  {
    id: 'fb-followers-ultra',
    name: 'Facebook Followers (Ultra Cheap)',
    category: ServiceCategory.SMM,
    platform: 'Facebook',
    basePrice: 20,
    unitPrice: 80,
    minQuantity: 1000,
    maxQuantity: 50000,
    stock: 1000000,
    discountPercent: 0,
    description: 'Ultra cheap followers for quick profile boost. High delivery speed.',
    features: ['Fast Start', 'Global Profiles', 'Low Drop Rate'],
    status: 'Active'
  },
  {
    id: 'fb-reactions',
    name: 'Facebook Post Reactions',
    category: ServiceCategory.SMM,
    platform: 'Facebook',
    basePrice: 10,
    unitPrice: 70,
    minQuantity: 500,
    maxQuantity: 20000,
    stock: 500000,
    discountPercent: 5,
    description: 'Like, Love, Wow reactions for any public post.',
    features: ['Mixed Reactions', 'Safe Delivery', 'Instant Start'],
    status: 'Active'
  },
  {
    id: 'tk-followers-nodrop',
    name: 'TikTok Followers (0% Drop)',
    category: ServiceCategory.SMM,
    platform: 'TikTok',
    basePrice: 50,
    unitPrice: 120,
    minQuantity: 1000,
    maxQuantity: 100000,
    stock: 2000000,
    discountPercent: 10,
    description: 'Stable TikTok followers that don\'t drop.',
    features: ['Premium Quality', 'Refill Support', '0% Drop Guarantee'],
    status: 'Active'
  }
];

export const DESIGN_SERVICES: ServicePackage[] = [
  {
    id: 'design-basic',
    name: 'Basic Logo Package',
    category: ServiceCategory.GRAPHICS,
    platform: 'Design',
    basePrice: 2000,
    unitPrice: 0,
    minQuantity: 1,
    maxQuantity: 1,
    stock: 50,
    discountPercent: 0,
    description: 'Perfect for startups and small businesses.',
    features: ['2 Logo Concepts', 'High Res JPEG/PNG', '3 Revisions'],
    status: 'Active'
  },
  {
    id: 'design-standard',
    name: 'Standard Branding',
    category: ServiceCategory.GRAPHICS,
    platform: 'Design',
    basePrice: 5000,
    unitPrice: 0,
    minQuantity: 1,
    maxQuantity: 1,
    stock: 20,
    discountPercent: 15,
    description: 'Professional identity for your growing brand.',
    features: ['4 Logo Concepts', 'Vector Source Files', 'Unlimited Revisions', 'Social Media Kit'],
    status: 'Active',
    isFeatured: true
  }
];

export const PORTFOLIO_ITEMS = [
  { id: 1, title: 'EcoFriendly Tech', category: 'Logo Design', image: 'https://picsum.photos/seed/logo1/600/400' },
  { id: 2, title: 'SMM Campaign - Foodie', category: 'SMM Branding', image: 'https://picsum.photos/seed/smm1/600/400' },
  { id: 3, title: 'Lux Jewelry', category: 'Visual Identity', image: 'https://picsum.photos/seed/logo2/600/400' },
  { id: 4, title: 'Urban Gym', category: 'Social Media Management', image: 'https://picsum.photos/seed/smm2/600/400' },
];

export const FAQS = [
  { question: "How long does SMM delivery take?", answer: "Most orders start within 30-60 minutes and complete within 24 hours depending on the quantity." },
  { question: "What is your refund policy?", answer: "If we fail to deliver the service within the promised timeframe, a full refund is issued." }
];
