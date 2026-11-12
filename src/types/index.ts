export type ProductCategory =
  | 'laptops'
  | 'pc-gaming'
  | 'smartphones'
  | 'playstation-gaming'
  | 'cameras'
  | 'monitors'
  | 'storage'
  | 'keyboards-mice'
  | 'audio'
  | 'smart-glasses'
  | 'gadgets';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  categoryName: string;
  price: number; // in MZN
  oldPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  specifications: Record<string, string>;
  features: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  flashDealEndTime?: string;
  warrantyMonths: number;
  tags: string[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image: string;
  productCount: number;
  popularBrands: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type OrderStatus =
  | 'pendente'
  | 'confirmado'
  | 'em_preparacao'
  | 'em_transito'
  | 'entregue'
  | 'cancelado';

export type PaymentMethod =
  | 'mpesa'
  | 'emola'
  | 'conta_movel'
  | 'cartao_simo'
  | 'transferencia'
  | 'pagamento_entrega';

export type DeliveryMethod =
  | 'express_maputo'
  | 'standard_mozambique'
  | 'levantamento_loja';

export interface Order {
  id: string; // e.g. GZ-84920
  customerName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  status: OrderStatus;
  paymentStatus: 'pendente' | 'confirmado' | 'rejeitado';
  createdAt: string;
  notes?: string;
  estimatedDelivery?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'cliente' | 'admin';
  address?: {
    province: string;
    city: string;
    street: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  validUntil: string;
  active: boolean;
  description: string;
}

export interface ProvinceDeliveryInfo {
  name: string;
  cities: string[];
  expressAvailable: boolean;
  standardFee: number;
  estimatedDays: string;
}
