'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-tr from-coral-200/40 via-cream-300/30 to-rose-200/30 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-coral-300/20 rounded-full blur-2xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-200/30 rounded-full blur-2xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copywriting & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-coral-200/80 shadow-soft text-coral-600 text-xs sm:text-sm font-bold mb-6 animate-pulse-subtle">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-coral-500"></span>
              </span>
              <span>Dessert Viral & Halal No. 1</span>
              <span className="text-choco-300">|</span>
              <span className="text-choco-800 font-extrabold text-xs">Mulai Rp 5.000-an</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-choco-900 leading-[1.15] tracking-tight">
              Kenyalnya Mochi, <br />
              <span className="text-gradient">Lumernya Dessert</span> <br />
              Bikin Mood Naik! ✨
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-choco-700 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Nikmati sensasi <strong className="text-choco-900 font-bold">Mochi Daifuku</strong> isi buah segar utuh yang juicy, <strong className="text-choco-900 font-bold">Fruit Sando Roll</strong> super lembut, dan <strong className="text-choco-900 font-bold">Cheesecuit</strong> creamy gurih. Dibuat fresh setiap hari tanpa bahan pengawet!
            </p>

            {/* Highlights Grid */}
            <div className="mt-7 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-lg">🍓 100%</div>
                <div className="text-xs font-semibold text-choco-600 mt-0.5">Buah Asli</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-lg">💰 5 Ribu</div>
                <div className="text-xs font-semibold text-choco-600 mt-0.5">Harga Ramah</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-cream-300 shadow-soft text-center">
                <div className="text-coral-500 font-display font-black text-lg">✨ Fresh</div>
                <div className="text-xs font-semibold text-choco-600 mt-0.5">Made Daily</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#katalog-menu"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-black text-base shadow-coral hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 group"
              >
                <span>Pilih Menu Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20mau%20tanya%20menu%20dan%20stok%20hari%20ini%20dong%20%F0%9F%8C%B8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-cream-100 text-choco-900 border-2 border-cream-300 hover:border-coral-300 font-bold text-base transition-all shadow-soft flex items-center justify-center gap-2"
              >
                <span>💬 Tanya Admin</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-cream-300/80 flex items-center justify-center lg:justify-start gap-6 text-xs font-bold text-choco-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Halal & Higienis</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Rating 4.9/5 (1.000+ Terjual)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Floating Elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-[420px] aspect-square">
              
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-coral-400/30 to-amber-200/40 blur-xl scale-95 animate-pulse-subtle" />
              
              {/* Main Card */}
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-soft-xl bg-white">
                <Image
                  src="/images/hero-desserts.jpg"
                  alt="Aneka Dessert Jajan Yuk - Mochi Daifuku, Fruit Sando Roll, Cheesecuit"
                  fill
                  priority
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-choco-950/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-coral-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm mb-1">
                    Favorit Pelanggan
                  </span>
                  <p className="font-display font-bold text-lg leading-tight">
                    Mochi Daifuku & Fruit Sando
                  </p>
                  <p className="text-xs text-cream-200 font-medium">
                    Isian Buah Asli Segar & Cream Lembut
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Top Right - Price Sticker */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-soft-xl border border-coral-200 transform rotate-6 hover:rotate-0 transition-transform animate-float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-coral-500 text-white flex items-center justify-center font-display font-black text-sm shadow-coral">
                    5K
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-coral-600 uppercase tracking-wider">Mochi Buah</p>
                    <p className="text-xs font-black text-choco-900">Per Pcs</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left - Viral Review */}
              <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-soft-xl border border-cream-300 max-w-[210px] transform -rotate-3 hover:rotate-0 transition-transform animate-float-delayed">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-choco-900 mt-1 line-clamp-2">
                  &ldquo;Mochinya kenyal lembut, buahnya gede banget!&rdquo;
                </p>
                <p className="text-[10px] font-medium text-choco-500 mt-0.5">
                  — Nadya, Jogja
                </p>
              </div>

              {/* Floating Badge 3: Halal / Fresh Daily */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Freshly Handcrafted</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
