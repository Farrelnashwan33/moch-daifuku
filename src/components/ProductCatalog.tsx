'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';
import { Sparkles, Utensils, Heart } from 'lucide-react';

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Menu 🍓' },
    { id: 'mochi-daifuku', label: 'Mochi Daifuku' },
    { id: 'fruit-sando-roll', label: 'Fruit Sando Roll' },
    { id: 'cheesecuit', label: 'Cheesecuit Box' },
  ];

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.id === activeTab);

  return (
    <section id="katalog-menu" className="py-16 md:py-24 relative scroll-mt-20">
      
      {/* Background decoration */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-coral-100/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coral-100 text-coral-600 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Katalog Menu Fresh Daily</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-choco-900 tracking-tight">
            Pilihan Dessert Manis <br className="hidden sm:inline" />
            <span className="text-gradient">Favorit Semua Orang</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-choco-700 font-medium">
            Pilih dessert favoritmu, tentukan varian rasa kesukaan, lalu tambahkan ke keranjang untuk checkout langsung via WhatsApp.
          </p>

          {/* Category Tabs Filter */}
          <div className="mt-7 flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === cat.id
                    ? 'bg-coral-500 text-white shadow-coral'
                    : 'bg-white text-choco-700 border border-cream-300 hover:border-coral-300 hover:bg-cream-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Info Banner below catalog */}
        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl p-6 border-2 border-dashed border-coral-200 text-center max-w-3xl mx-auto shadow-soft">
          <p className="text-sm font-bold text-choco-900 flex items-center justify-center gap-2">
            <span className="text-xl">💡</span>
            <span>Tips Pemesanan:</span>
          </p>
          <p className="text-xs sm:text-sm text-choco-600 mt-1">
            Kamu bisa memesan beberapa varian rasa sekaligus dalam 1 kali checkout. Kami packing higienis dengan ice pack untuk menjaga kesegaran buah! ❄️
          </p>
        </div>

      </div>
    </section>
  );
}
