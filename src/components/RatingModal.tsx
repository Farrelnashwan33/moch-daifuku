'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { submitProductRatingToDB } from '@/lib/ratingApi';
import { useCart } from '@/context/CartContext';
import { X, Star, Sparkles, CheckCircle2, Loader2, Heart } from 'lucide-react';

interface RatingModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onRatingSubmitted: (newRating: number) => void;
}

const RATING_LABELS = [
  '',
  'Kurang Puas 🙁',
  'Cukup Enak 😐',
  'Enak & Manis 🙂',
  'Enak Banget! 😋',
  'Juara & Nagih Pol! ⭐🍰',
];

export default function RatingModal({
  product,
  isOpen,
  onClose,
  onRatingSubmitted,
}: RatingModalProps) {
  const { customer, triggerCelebration } = useCart();
  const [selectedRating, setSelectedRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>(customer.name || '');
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating < 1) return;

    setIsSubmitting(true);
    const res = await submitProductRatingToDB(product.id, selectedRating, name, comment);
    setIsSubmitting(false);

    if (res.success) {
      setIsSuccess(true);
      triggerCelebration();
      onRatingSubmitted(selectedRating);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-choco-950/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-cream-300 z-10 animate-scaleUp overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 p-2 rounded-xl text-choco-400 hover:text-choco-900 hover:bg-cream-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3.5 shadow-soft">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="font-display font-black text-xl text-choco-900">
              Terima Kasih, Kak! 🎉
            </h3>
            <p className="text-xs text-choco-600 mt-1 max-w-xs leading-relaxed">
              Penilaian {selectedRating} bintangmu untuk <strong>{product.name}</strong> sudah berhasil disimpan ke database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Header / Product summary */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-cream-200">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-cream-100 border border-cream-300 shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-coral-600 bg-coral-100 px-2 py-0.5 rounded-md">
                  Beri Penilaian ⭐
                </span>
                <h3 className="font-display font-black text-base text-choco-900 line-clamp-1 mt-0.5">
                  {product.name}
                </h3>
                <p className="text-[11px] text-choco-500 font-medium">
                  Bagikan pengalaman manismu untuk menu ini!
                </p>
              </div>
            </div>

            {/* Star Rating Interactive Selector */}
            <div className="text-center py-2 bg-cream-50/70 rounded-2xl border border-cream-200">
              <p className="text-xs font-bold text-choco-800 mb-2">
                Pilih Jumlah Bintang:
              </p>

              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = (hoverRating || selectedRating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1.5 transform hover:scale-125 active:scale-95 transition-all focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          isFilled
                            ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                            : 'text-cream-400 fill-cream-100'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Rating Description Label */}
              <p className="text-xs font-bold text-coral-600 mt-2 h-4">
                {RATING_LABELS[hoverRating || selectedRating]}
              </p>
            </div>

            {/* Nama Pengulas */}
            <div>
              <label className="block text-xs font-bold text-choco-800 mb-1">
                Nama Kamu (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Kak Dinda / Anonim"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-cream-300 text-xs text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 transition-all"
              />
            </div>

            {/* Komentar / Ulasan */}
            <div>
              <label className="block text-xs font-bold text-choco-800 mb-1">
                Ulasan / Komentar (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Mochinya lembut banget dan strawberry-nya manis segar!"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-cream-300 text-xs text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-extrabold text-xs sm:text-sm shadow-coral hover:shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan ke Database...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Kirim Penilaian ({selectedRating} ⭐)</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-choco-400 font-medium">
              Data penilaian akan langsung tersimpan di database
            </p>

          </form>
        )}

      </div>
    </div>
  );
}
