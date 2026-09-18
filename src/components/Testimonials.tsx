import React from 'react';
import { TESTIMONIALS } from '@/data/products';
import { Star, Quote, Heart } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimoni" className="py-16 md:py-24 bg-cream-200/40 border-t border-cream-300 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coral-100 text-coral-600 text-xs font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-coral-500 text-coral-500" />
            <span>Kata Mereka yang Sudah Mencoba</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-choco-900 tracking-tight">
            Apa Kata Para <span className="text-gradient">Dessert Lovers?</span> 💬
          </h2>

          <p className="mt-2 text-sm text-choco-700 font-medium">
            Ratusan pelanggan puas dengan kelembutan mochi dan kesegaran buah asli kami.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-cream-300 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-coral-200" />
                </div>

                <p className="text-sm text-choco-800 leading-relaxed font-normal italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200 flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cream-100 border border-coral-200 flex items-center justify-center text-xl shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-display font-bold text-choco-900 text-sm">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-choco-600 font-medium">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-choco-500 font-medium mt-0.5">
                    Order: <span className="text-coral-600 font-semibold">{t.menu}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
