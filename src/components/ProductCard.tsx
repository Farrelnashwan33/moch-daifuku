'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import { formatRupiah, formatShortPrice } from '@/utils/formatters';
import { fetchProductRatingSummaryFromDB } from '@/lib/ratingApi';
import RatingModal from '@/components/RatingModal';
import { Plus, Minus, ShoppingBag, Star, Check, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, triggerCelebration } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratingSummary, setRatingSummary] = useState({
    rating: product.rating,
    reviewCount: product.reviewCount,
  });

  // Fetch updated rating count on mount
  useEffect(() => {
    fetchProductRatingSummaryFromDB(product.id, product.rating, product.reviewCount).then((res) => {
      setRatingSummary({
        rating: res.average,
        reviewCount: res.count,
      });
    });
  }, [product.id, product.rating, product.reviewCount]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, selectedVariant, quantity);
    triggerCelebration();
    
    setTimeout(() => {
      setIsAdding(false);
      setQuantity(1);
    }, 600);
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleRatingSubmitted = (newStar: number) => {
    setRatingSummary((prev) => {
      const nextCount = prev.reviewCount + 1;
      const nextAvg =
        Math.round(((prev.rating * prev.reviewCount + newStar) / nextCount) * 10) / 10;
      return { rating: nextAvg, reviewCount: nextCount };
    });
  };

  return (
    <>
      <div className="bg-white rounded-3xl border-2 border-cream-200/80 shadow-soft hover:shadow-soft-xl hover:border-coral-200 transition-all duration-300 flex flex-col h-full overflow-hidden group">
        
        {/* Product Image Container */}
        <div className="relative w-full aspect-square bg-cream-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            {product.badge && (
              <span className="px-3 py-1 rounded-full bg-coral-500 text-white text-xs font-extrabold shadow-coral backdrop-blur-sm">
                {product.badge}
              </span>
            )}
            
            <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center font-display font-black text-coral-600 text-xs border border-coral-100 ml-auto">
              {formatShortPrice(product.price)}
            </div>
          </div>

          {/* Japanese Name Overlay Tag */}
          {product.japaneseName && (
            <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-choco-950/70 backdrop-blur-sm text-white/90 text-[11px] font-medium">
              {product.japaneseName}
            </div>
          )}
        </div>

        {/* Product Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          
          {/* Rating (Interactive Star Button) & Tags */}
          <div className="flex items-center justify-between text-xs mb-2">
            <button
              type="button"
              onClick={() => setIsRatingModalOpen(true)}
              title="Klik untuk beri ulasan & bintang"
              className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200/80 transition-all transform active:scale-95 group/rate cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 group-hover/rate:scale-110 transition-transform" />
              <span>{ratingSummary.rating}</span>
              <span className="text-choco-400 font-normal">({ratingSummary.reviewCount})</span>
              <span className="text-[10px] text-coral-600 font-extrabold pl-1 hidden group-hover/rate:inline-block">
                + Nilai
              </span>
            </button>

            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              Fresh Daily
            </span>
          </div>

          {/* Title & Price */}
          <h3 className="font-display font-extrabold text-xl text-choco-900 group-hover:text-coral-600 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-choco-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price Tag */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-display font-black text-coral-600">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-choco-300 line-through font-semibold">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
            <span className="text-[11px] text-choco-500 font-medium">/ pcs</span>
          </div>

          {/* Variant Selection */}
          <div className="mt-4 pt-4 border-t border-cream-200/80">
            <div className="flex items-center justify-between text-xs mb-2.5">
              <span className="font-bold text-choco-800">Pilih Varian Rasa:</span>
              <span className="font-bold text-coral-600 text-xs">
                {selectedVariant.name}
              </span>
            </div>

            {/* Variant Pills Grid */}
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                      isSelected
                        ? 'bg-coral-50 border-coral-400 text-coral-700 ring-2 ring-coral-400/20 shadow-sm'
                        : 'bg-white border-cream-300 text-choco-700 hover:border-coral-200 hover:bg-cream-50'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      {v.color && (
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-inner"
                          style={{ backgroundColor: v.color }}
                        />
                      )}
                      <span className="truncate">{v.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-coral-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Footer */}
          <div className="mt-5 pt-4 border-t border-cream-200 flex items-center gap-3">
            {/* Quantity Counter */}
            <div className="flex items-center rounded-2xl bg-cream-100 border border-cream-300 p-1 shrink-0">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                aria-label="Kurangi Jumlah"
                className="w-8 h-8 rounded-xl bg-white text-choco-700 disabled:opacity-40 hover:bg-cream-200 flex items-center justify-center font-bold text-sm shadow-sm transition-all"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-black text-choco-900">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                aria-label="Tambah Jumlah"
                className="w-8 h-8 rounded-xl bg-white text-choco-700 hover:bg-cream-200 flex items-center justify-center font-bold text-sm shadow-sm transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-soft transform active:scale-95 ${
                isAdding
                  ? 'bg-emerald-500 text-white'
                  : 'bg-coral-500 hover:bg-coral-600 text-white shadow-coral hover:shadow-lg'
              }`}
            >
              {isAdding ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Berhasil!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>+ Keranjang</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Interactive Rating Modal */}
      <RatingModal
        product={product}
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </>
  );
}
