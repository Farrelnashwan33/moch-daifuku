'use client';

import React from 'react';
import Image from 'next/image';
import { COMBOS } from '@/data/products';
import { formatRupiah } from '@/utils/formatters';
import { Gift, MessageCircle } from 'lucide-react';

export default function ComboDeals() {
  return (
    <section id="paket-hemat" className="py-12 sm:py-16 bg-cream-200/50 border-y border-cream-300 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 rounded-full bg-coral-100 text-coral-600 text-xs font-bold mb-3">
            <Gift className="w-3.5 h-3.5 shrink-0" />
            <span>Spesial Lebih Hemat</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-choco-900 tracking-tight">
            Paket Bundling & Gift Box 🎁
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-choco-700 font-medium px-2 sm:px-0">
            Cocok untuk cemilan bareng keluarga, traktiran teman, atau hampers manis hari spesial.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-3xl p-4.5 sm:p-6 border-2 border-coral-200 shadow-soft-lg hover:shadow-soft-xl transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-3.5 right-3.5 bg-coral-500 text-white text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full shadow-coral z-10">
                {combo.badge}
              </div>

              <div>
                <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden bg-cream-100 mb-4 sm:mb-5">
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-choco-950/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {combo.discount}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-choco-900 group-hover:text-coral-600 transition-colors">
                  {combo.name}
                </h3>

                <p className="text-xs sm:text-sm text-choco-600 mt-1.5 sm:mt-2 leading-relaxed">
                  {combo.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] sm:text-xs text-choco-400 line-through font-semibold block">
                    {formatRupiah(combo.originalPrice)}
                  </span>
                  <span className="font-display font-black text-xl sm:text-2xl text-coral-600">
                    {formatRupiah(combo.price)}
                  </span>
                </div>

                <a
                  href={`https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20saya%20tertarik%20pesan%20*${encodeURIComponent(combo.name)}*%20seharga%20*${encodeURIComponent(formatRupiah(combo.price))}*.%20Bisa%20pilih%20rasa%20apa%20aja%20kak?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm shadow-coral flex items-center gap-1.5 sm:gap-2 transition-all transform active:scale-95 shrink-0"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>Pesan Paket</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
