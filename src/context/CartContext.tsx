'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CustomerDetails, Product, ProductVariant } from '@/types';
import { calculateShippingFee } from '@/utils/delivery';

interface ToastState {
  show: boolean;
  message: string;
  submessage?: string;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number; // Subtotal
  shippingFee: number;
  grandTotal: number;
  isCartOpen: boolean;
  isHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  customer: CustomerDetails;
  updateCustomer: (data: Partial<CustomerDetails>) => void;
  toast: ToastState;
  hideToast: () => void;
  triggerCelebration: () => void;
}

const defaultCustomer: CustomerDetails = {
  name: '',
  phone: '',
  address: '',
  notes: '',
  deliveryMethod: 'delivery',
  paymentMethod: 'qris',
  distanceKm: 2,
  deliveryFee: 5000,
  selectedArea: 'unpad-itb',
};


const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'jajan_yuk_cart_v1';
const CUSTOMER_STORAGE_KEY = 'jajan_yuk_customer_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerDetails>(defaultCustomer);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: '',
    submessage: '',
    image: '',
  });

  // Load from localStorage safely after mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
        const savedCustomer = localStorage.getItem(CUSTOMER_STORAGE_KEY);
        if (savedCustomer) {
          setCustomer((prev) => ({ ...prev, ...JSON.parse(savedCustomer) }));
        }
      }
    } catch (e) {
      console.error('Failed to load storage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [items, isHydrated]);

  // Save customer data
  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
      }
    } catch (e) {
      console.error('Failed to save customer', e);
    }
  }, [customer, isHydrated]);

  const showToast = (message: string, submessage?: string, image?: string) => {
    setToast({
      show: true,
      message,
      submessage,
      image,
    });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const triggerCelebration = async () => {
    if (typeof window === 'undefined') return;
    try {
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF8C66', '#FF6584', '#FFAA33', '#7BAE7F'],
      });
    } catch (e) {
      // ignore
    }
  };

  const addItem = (product: Product, variant: ProductVariant, quantity: number = 1) => {
    const itemId = `${product.id}-${variant.id}`;
    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          productName: product.name,
          variantId: variant.id,
          variantName: variant.name,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    });

    showToast(
      `Ditambahkan ke Keranjang!`,
      `${quantity}x ${product.name} (${variant.name})`,
      product.image
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const shippingFee =
    customer.deliveryMethod === 'pickup'
      ? 0
      : (customer.deliveryFee ?? calculateShippingFee(customer.deliveryMethod, customer.distanceKm || 2));

  const grandTotal = totalPrice + shippingFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const updateCustomer = (data: Partial<CustomerDetails>) => {
    setCustomer((prev) => {
      const next = { ...prev, ...data };
      // Auto compute deliveryFee if method or distanceKm changed and deliveryFee not explicitly provided in data
      if (
        (data.deliveryMethod !== undefined || data.distanceKm !== undefined) &&
        data.deliveryFee === undefined
      ) {
        next.deliveryFee = calculateShippingFee(next.deliveryMethod, next.distanceKm || 2);
      }
      return next;
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        shippingFee,
        grandTotal,
        isCartOpen,
        isHydrated,
        openCart,
        closeCart,
        toggleCart,
        customer,
        updateCustomer,
        toast,
        hideToast,
        triggerCelebration,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
