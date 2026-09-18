'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Star, Sparkles, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-10 sm:pt-28 sm:pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-coral-200/35 via-cream-300/30 to-rose-200/25 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-44 sm:w-72 h-44 sm:h-72 bg-coral-300/15 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Copywriting & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-coral-200/80 shadow-soft text-coral-600 text-xs sm:text-sm font-bold mb-4 sm:mb-5">
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
            <p className="mt-3.5 sm:mt-5 text-sm sm:text-base md:text-lg text-choco-700 font-medium max-w-xl leading-relaxed">
              Nikmati sensasi <strong className="text-choco-900 font-bold">Mochi Daifuku</strong> isi buah segar utuh juicy, <strong className="text-choco-900 font-bold">Fruit Sando Roll</strong> lembut, dan <strong className="text-choco-900 font-bold">Cheesecuit</strong> creamy gurih. Dibuat fresh setiap hari tanpa pengawet!
            </p>

            {/* Highlights Grid */}
            <div className="mt-5 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md">
              <div className="bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">🍓 100%</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Buah Asli</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">💰 5 Ribu</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Harga Ramah</div>
              </div>
              <div className="bg-white/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-base sm:text-lg">✨ Fresh</div>
                <div className="text-[10px] sm:text-xs font-semibold text-choco-600 mt-0.5">Made Daily</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="#katalog-menu"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-sm sm:text-base shadow-coral hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Pilih Menu Sekarang</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20mau%20tanya%20menu%20dan%20stok%20hari%20ini%20dong%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-2xl bg-white hover:bg-cream-100 text-choco-900 border-2 border-cream-300 hover:border-coral-300 font-bold text-sm sm:text-base transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <span>💬 Tanya Admin</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-cream-300/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs font-bold text-choco-600 w-full">
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

          {/* Right Column: Hero Visual Container */}
          <div className="lg:col-span-5 relative flex items-center justify-center w-full">
            
            {/* Visual Card Wrapper */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px] aspect-square">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-400/25 to-amber-200/30 blur-xl scale-95 pointer-events-none" />
              
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
                <div className="absolute inset-0 bg-gradient-to-t from-choco-950/75 via-choco-950/15 to-transparent" />
                
                {/* Top Corner Pill on Image */}
                <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                  <span className="bg-coral-500 text-white text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full shadow-coral">
                    Mulai 5k / pcs 🍓
                  </span>
                </div>

                {/* Bottom Caption on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                    ✨ Favorit Pelanggan
                  </span>
                  <p className="font-display font-black text-base sm:text-lg leading-tight">
                    Mochi Daifuku & Fruit Sando
                  </p>
                  <p className="text-[11px] text-cream-200 font-medium mt-0.5">
                    Buah Segar Utuh & Cream Lembut
                  </p>
                </div>
              </div>

              {/* Floating Review Badge (Only on Large Screens/Desktop where space allows) */}
              <div className="hidden lg:block absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-soft-xl border border-cream-300 max-w-[210px] transform -rotate-3 hover:rotate-0 transition-transform animate-float-delayed z-10">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-choco-900 mt-1 line-clamp-2 leading-snug">
                  &ldquo;Mochinya kenyal lembut, buahnya gede!&rdquo;
                </p>
                <p className="text-[10px] font-medium text-choco-500 mt-0.5">
                  — Nadya, Jogja
                </p>
              </div>

              {/* Floating Fresh Badge (Only on Large Screens/Desktop) */}
              <div className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5 z-10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fresh Handcrafted</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
