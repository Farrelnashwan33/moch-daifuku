'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative Pastel Background Blobs - Constrained to prevent horizontal scroll */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-coral-200/40 via-cream-300/30 to-rose-200/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-48 sm:w-72 h-48 sm:h-72 bg-coral-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-48 sm:w-80 h-48 sm:h-80 bg-amber-200/25 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 border border-coral-200/80 shadow-soft text-coral-600 text-xs sm:text-sm font-bold mb-4 sm:mb-6 animate-pulse-subtle">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral-500"></span>
              </span>
              <span>Dessert Viral & Halal No. 1</span>
              <span className="text-choco-300">|</span>
              <span className="text-choco-800 font-extrabold text-[11px] sm:text-xs">Mulai Rp 5k</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-choco-900 leading-[1.18] tracking-tight">
              Kenyalnya Mochi, <br />
              <span className="text-gradient">Lumernya Dessert</span> <br />
              Bikin Mood Naik! ✨
            </h1>

            {/* Subheading */}
            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-choco-700 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Nikmati sensasi <strong className="text-choco-900 font-bold">Mochi Daifuku</strong> isi buah segar utuh juicy, <strong className="text-choco-900 font-bold">Fruit Sando Roll</strong> lembut, dan <strong className="text-choco-900 font-bold">Cheesecuit</strong> creamy gurih. Dibuat fresh setiap hari tanpa pengawet!
            </p>

            {/* Highlights Grid */}
            <div className="mt-6 sm:mt-7 grid grid-cols-3 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">🍓 100%</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Buah Asli</div>
              </div>
              <div className="bg-white/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">💰 5 Ribu</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Harga Ramah</div>
              </div>
              <div className="bg-white/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">✨ Fresh</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Made Daily</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <a
                href="#katalog-menu"
                className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm sm:text-base shadow-coral hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Pilih Menu Sekarang</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20mau%20tanya%20menu%20dan%20stok%20hari%20ini%20dong%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-cream-100 text-choco-900 border-2 border-cream-300 hover:border-coral-300 font-bold text-sm sm:text-base transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <span>💬 Tanya Admin</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-cream-300/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-bold text-choco-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Halal & Higienis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>Rating 4.9/5 (1.000+ Terjual)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center px-2 sm:px-0">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] aspect-square">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-400/30 to-amber-200/40 blur-xl scale-95 animate-pulse-subtle" />
              
              {/* Main Card */}
              <div className="relative w-full h-full rounded-3xl sm:rounded-[2.5rem] overflow-hidden border-4 border-white shadow-soft-xl bg-white">
                <Image
                  src="/images/hero-desserts.jpg"
                  alt="Aneka Dessert Jajan Yuk - Mochi Daifuku, Fruit Sando Roll, Cheesecuit"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 340px, (max-width: 1024px) 400px, 420px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-choco-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-coral-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm mb-1">
                    Favorit Pelanggan
                  </span>
                  <p className="font-display font-bold text-base sm:text-lg leading-tight">
                    Mochi Daifuku & Fruit Sando
                  </p>
                  <p className="text-[11px] sm:text-xs text-cream-200 font-medium mt-0.5">
                    Isian Buah Asli Segar & Cream Lembut
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right - Price Sticker */}
              <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-soft-xl border border-coral-200 transform rotate-6 hover:rotate-0 transition-transform animate-float-slow z-10">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-coral-500 text-white flex items-center justify-center font-display font-black text-xs sm:text-sm shadow-coral">
                    5K
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-coral-600 uppercase tracking-wider">Mochi Buah</p>
                    <p className="text-[11px] sm:text-xs font-black text-choco-900">Per Pcs</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left - Viral Review (Hidden on very tiny mobile, visible sm+) */}
              <div className="absolute -bottom-3 -left-2 sm:-bottom-5 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3.5 shadow-soft-xl border border-cream-300 max-w-[170px] sm:max-w-[210px] transform -rotate-3 hover:rotate-0 transition-transform animate-float-delayed z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-[10px] sm:text-xs font-bold text-choco-900 mt-1 line-clamp-2 leading-snug">
                  &ldquo;Mochinya kenyal lembut, buahnya gede!&rdquo;
                </p>
                <p className="text-[9px] sm:text-[10px] font-medium text-choco-500 mt-0.5">
                  — Nadya, Jogja
                </p>
              </div>

              {/* Floating Badge 3: Halal / Fresh Daily */}
              <div className="absolute top-1/2 -right-2 sm:-right-5 -translate-y-1/2 bg-emerald-500 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 z-10">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="whitespace-nowrap">Fresh Handcrafted</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
