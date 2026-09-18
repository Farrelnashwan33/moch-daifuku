import React from 'react';
import { Phone, MapPin, Clock, Instagram, Heart, Sparkles, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-choco-900 text-cream-200 pt-16 pb-12 border-t-4 border-coral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-choco-700/60">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-coral-500 flex items-center justify-center text-white text-xl">
                🍓
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                Jajan Yuk
              </span>
            </div>
            
            <p className="text-xs text-cream-300 leading-relaxed">
              Spesialis Mochi Daifuku buah segar, Fruit Sando Roll, dan Cheesecuit creamy homemade. Hadirkan momen manis setiap hari dengan dessert berkualitas harga ramah di kantong!
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-choco-800 border border-choco-700 text-coral-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Halal & Fresh Daily</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-extrabold text-white text-base mb-4">
              Menu Favorit
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-300">
              <li>
                <a href="#katalog-menu" className="hover:text-coral-400 transition-colors">
                  🍓 Mochi Daifuku (Strawberry, Mangga, Anggur)
                </a>
              </li>
              <li>
                <a href="#katalog-menu" className="hover:text-coral-400 transition-colors">
                  🍰 Fruit Sando Roll Cake
                </a>
              </li>
              <li>
                <a href="#katalog-menu" className="hover:text-coral-400 transition-colors">
                  🧀 Cheesecuit Dessert Box (Keju, Matcha, Oreo)
                </a>
              </li>
              <li>
                <a href="#paket-hemat" className="hover:text-coral-400 transition-colors">
                  🎁 Paket Party Box Hemat
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-display font-extrabold text-white text-base mb-4">
              Kontak & Pemesanan
            </h4>
            <div className="space-y-3 text-xs text-cream-300">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Jam Operasional:</p>
                  <p>Buka Setiap Hari: 09.00 - 21.00 WIB</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">WhatsApp Customer Service:</p>
                  <a
                    href="https://wa.me/6289648306478"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-coral-300 hover:underline font-semibold"
                  >
                    0896-4830-6478
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-coral-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Layanan Kirim:</p>
                  <p>Melayani Pengiriman Instant & Ambil di Tempat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social & WhatsApp CTA */}
          <div className="space-y-4">
            <h4 className="font-display font-extrabold text-white text-base">
              Chat Langsung
            </h4>
            <p className="text-xs text-cream-300 leading-relaxed">
              Mau pesan partai besar untuk acara arisan, ulang tahun, atau kantor? Chat kami langsung ya!
            </p>
            <a
              href="https://wa.me/6289648306478?text=Halo%20Admin%20Jajan%20Yuk,%20mau%20tanya-tanya%20pemesanan%20dessert%20ya%20kak%20%F0%9F%8C%B8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat WhatsApp Admin</span>
            </a>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-choco-300">
          <p>
            © {new Date().getFullYear()} <strong className="text-white font-bold">Jajan Yuk</strong>. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1.5 font-medium">
            <Heart className="w-3.5 h-3.5 text-coral-400 fill-coral-400" />
            <span>Creative Media Bersama UMKM</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
