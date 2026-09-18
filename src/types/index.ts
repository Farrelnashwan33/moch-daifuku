export interface ProductVariant {
  id: string;
  name: string;
  color?: string; // hex or tailwind class for tag dot
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  variants: ProductVariant[];
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id: `${productId}-${variantId}`
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
  deliveryMethod: 'pickup' | 'delivery' | 'instant';
  paymentMethod: 'qris' | 'transfer' | 'cod';
  distanceKm?: number;
  deliveryFee?: number;
  selectedArea?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

