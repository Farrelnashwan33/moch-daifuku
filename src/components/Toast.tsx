'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

export default function Toast() {
  const { toast, hideToast, openCart } = useCart();

  if (!toast.show) return null;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-bounce-in">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-soft-xl border border-coral-200/80 p-4 flex items-center gap-3.5 transition-all">
        {toast.image ? (
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-coral-100 bg-cream-100">
            <Image
              src={toast.image}
              alt="Item added"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-coral-100 text-coral-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-coral-600 uppercase tracking-wider">
            {toast.message}
          </p>
          {toast.submessage && (
            <p className="text-sm font-bold text-choco-900 truncate">
              {toast.submessage}
            </p>
          )}
          <button
            onClick={() => {
              hideToast();
              openCart();
            }}
            className="mt-1 text-xs font-semibold text-coral-500 hover:text-coral-700 underline flex items-center gap-1 transition-colors"
          >
            <ShoppingBag className="w-3 h-3" />
            Buka Keranjang
          </button>
        </div>

        <button
          onClick={hideToast}
          aria-label="Tutup notifikasi"
          className="text-choco-300 hover:text-choco-700 p-1 rounded-lg hover:bg-cream-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
