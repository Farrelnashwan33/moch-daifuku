'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { formatRupiah } from '@/utils/formatters';
import { ShoppingBag } from 'lucide-react';

export default function FloatingCartButton() {
  const { totalItems, totalPrice, openCart, isCartOpen, isHydrated } = useCart();

  if (!isHydrated || totalItems === 0 || isCartOpen) return null;

  return (
    <div className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40">
      <button
        onClick={openCart}
        aria-label="Buka Keranjang Belanja"
        className="flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-bold shadow-coral hover:shadow-soft-xl border-2 border-white transition-all transform hover:scale-105 active:scale-95 group"
      >
        <div className="relative">
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-coral-600 text-[10px] sm:text-[11px] font-black flex items-center justify-center shadow-sm">
            {totalItems}
          </span>
        </div>

        <div className="text-left hidden xs:block">
          <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-coral-100">
            Keranjang ({totalItems})
          </p>
          <p className="text-xs sm:text-sm font-black font-display -mt-0.5">
            {formatRupiah(totalPrice)}
          </p>
        </div>

        <span className="text-[11px] sm:text-xs font-black bg-coral-600/90 px-2 py-0.5 sm:py-1 rounded-full ml-0.5">
          🛒 Checkout
        </span>
      </button>
    </div>
  );
}
