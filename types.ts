
export enum ServiceCategory {
  SMM = 'SMM',
  GRAPHICS = 'Graphics'
}

export enum PaymentMethod {
  BKASH = 'bKash',
  NAGAD = 'Nagad',
  ROCKET = 'Rocket',
  STRIPE = 'Stripe/Card',
  PAYPAL = 'PayPal'
}

export interface PricingPlan {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  description: string;
  features: string[];
  discountPercent?: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  category: ServiceCategory;
  platform?: 'Facebook' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'YouTube' | 'Design';
  basePrice: number; // Minimum fixed cost to start order
  unitPrice: number; // Price per 1000 units (for SMM) or per unit
  minQuantity: number;
  maxQuantity: number;
  stock: number; // Available capacity
  discountPercent: number;
  description: string;
  features: string[];
  status: 'Active' | 'Inactive';
  plans?: PricingPlan[];
  isFeatured?: boolean;
}

export interface CartItem {
  packageId: string;
  name: string;
  price: number;
  targetLink?: string;
  quantity?: number;
  notes?: string;
  designBrief?: DesignBrief;
}

export interface DesignBrief {
  businessName: string;
  industry: string;
  colors: string;
  styleReference: string;
}

export interface Order {
  id: string;
  status: 'Processing' | 'Completed' | 'Pending' | 'Failed';
  items: CartItem[];
  total: number;
  date: string;
  paymentMethod?: PaymentMethod;
  senderNumber?: string;
  transactionId?: string;
  adminNote?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  adminName: string;
  timestamp: string;
  details: string;
}
