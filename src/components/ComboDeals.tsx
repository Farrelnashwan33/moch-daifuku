'use client';

import React from 'react';
import Image from 'next/image';
import { COMBOS } from '@/data/products';
import { formatRupiah } from '@/utils/formatters';
import { Gift, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export default function ComboDeals() {
  return (
    <section id="paket-hemat" className="py-16 bg-cream-200/50 border-y border-cream-300 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-coral-100 text-coral-600 text-xs font-bold mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>Spesial Lebih Hemat</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-choco-900 tracking-tight">
            Paket Bundling & Gift Box 🎁
          </h2>

          <p className="mt-2 text-sm text-choco-700 font-medium">
            Cocok untuk cemilan bareng keluarga, traktiran teman, atau hampers manis hari spesial.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {COMBOS.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-3xl p-6 border-2 border-coral-200 shadow-soft-lg hover:shadow-soft-xl transition-all flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-4 right-4 bg-coral-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-coral">
                {combo.badge}
              </div>

              <div>
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-cream-100 mb-5">
                  <Image
                    src={combo.image}
                    alt={combo.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-choco-950/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                    {combo.discount}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-choco-900 group-hover:text-coral-600 transition-colors">
                  {combo.name}
                </h3>

                <p className="text-xs sm:text-sm text-choco-600 mt-2 leading-relaxed">
                  {combo.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-choco-400 line-through font-semibold block">
                    {formatRupiah(combo.originalPrice)}
                  </span>
                  <span className="font-display font-black text-2xl text-coral-600">
                    {formatRupiah(combo.price)}
                  </span>
                </div>

                <a
                  href={`https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20saya%20tertarik%20pesan%20*${encodeURIComponent(combo.name)}*%20seharga%20*${encodeURIComponent(formatRupiah(combo.price))}*.%20Bisa%20pilih%20rasa%20apa%20aja%20kak?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm shadow-coral flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
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
