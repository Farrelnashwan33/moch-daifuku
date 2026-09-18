'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Sparkles, Menu, X, Phone, Utensils, Gift, MessageSquare, Star } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const { totalItems, isHydrated, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-soft py-2.5 sm:py-3'
          : 'bg-cream-100/80 backdrop-blur-sm md:bg-transparent py-3 sm:py-4 md:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-coral-500 to-coral-400 flex items-center justify-center text-white shadow-coral transform group-hover:rotate-6 transition-transform">
            <span className="text-lg sm:text-xl">🍓</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-choco-900 group-hover:text-coral-600 transition-colors">
                Jajan Yuk
              </span>
              <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-100 text-coral-600 border border-coral-200/60">
                Fresh
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] font-medium text-choco-500 -mt-0.5 sm:-mt-1 tracking-wide line-clamp-1">
              Mochi Daifuku & Desserts
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 bg-white/80 backdrop-blur-md px-5 lg:px-6 py-2 rounded-full border border-cream-300/80 shadow-soft">
          <a
            href="#katalog-menu"
            className="text-xs lg:text-sm font-bold text-choco-800 hover:text-coral-500 transition-colors"
          >
            Katalog Menu
          </a>
          <a
            href="#paket-hemat"
            className="text-xs lg:text-sm font-bold text-choco-800 hover:text-coral-500 transition-colors flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-coral-500" />
            Paket Hemat
          </a>
          <a
            href="#cara-pesan"
            className="text-xs lg:text-sm font-bold text-choco-800 hover:text-coral-500 transition-colors"
          >
            Cara Pesan
          </a>
          <a
            href="#testimoni"
            className="text-xs lg:text-sm font-bold text-choco-800 hover:text-coral-500 transition-colors"
          >
            Ulasan
          </a>
        </nav>

        {/* Actions & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Badge (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open Order Hari Ini</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            id="nav-cart-btn"
            aria-label="Buka Keranjang Belanja"
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm shadow-coral transition-all transform active:scale-95 group"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden sm:inline">Keranjang</span>
            {isHydrated && totalItems > 0 && (
              <span className="min-w-5 h-5 px-1 rounded-full bg-white text-coral-600 text-[11px] font-black flex items-center justify-center shadow-sm animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-2xl bg-white/90 border border-cream-300 text-choco-800 hover:bg-cream-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-coral-600" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border border-cream-300/80 px-4 py-4 mx-3 mt-2 rounded-2xl shadow-soft-xl animate-fadeIn">
          <div className="flex flex-col gap-1.5">
            <a
              href="#katalog-menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-choco-900 hover:bg-coral-50 hover:text-coral-600 transition-colors"
            >
              <span className="text-base">🍓</span>
              <span>Katalog Menu</span>
            </a>
            <a
              href="#paket-hemat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-choco-900 hover:bg-coral-50 hover:text-coral-600 transition-colors"
            >
              <span className="text-base">🎁</span>
              <span>Paket Hemat & Bundling</span>
            </a>
            <a
              href="#cara-pesan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-choco-900 hover:bg-coral-50 hover:text-coral-600 transition-colors"
            >
              <span className="text-base">📝</span>
              <span>Cara Pemesanan</span>
            </a>
            <a
              href="#testimoni"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-choco-900 hover:bg-coral-50 hover:text-coral-600 transition-colors"
            >
              <span className="text-base">⭐</span>
              <span>Ulasan Pelanggan</span>
            </a>
            
            <div className="mt-2 pt-3 border-t border-cream-200 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 text-xs text-choco-600">
              <span className="flex items-center gap-1.5 font-medium text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Open Order 09.00 - 21.00 WIB
              </span>
              <a
                href="https://wa.me/6289648306478"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral-600 font-bold flex items-center gap-1.5 text-xs bg-coral-50 px-2.5 py-1 rounded-lg border border-coral-200"
              >
                <Phone className="w-3.5 h-3.5" /> 0896-4830-6478
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
