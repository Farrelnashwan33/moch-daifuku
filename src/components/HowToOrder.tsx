import React from 'react';
import { ShoppingBag, FileText, Send } from 'lucide-react';

export default function HowToOrder() {
  const steps = [
    {
      step: '01',
      icon: <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-coral-500" />,
      title: 'Pilih Menu & Varian',
      desc: 'Pilih produk favoritmu (Mochi, Fruit Sando, Cheesecuit) dan varian rasa yang kamu sukai.',
    },
    {
      step: '02',
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-coral-500" />,
      title: 'Cek Keranjang & Data',
      desc: 'Tinjau kembali pesanan di keranjang, masukkan nama, alamat/titik pengiriman, dan catatan.',
    },
    {
      step: '03',
      icon: <Send className="w-5 h-5 sm:w-6 sm:h-6 text-coral-500" />,
      title: 'Kirim Pesan WhatsApp',
      desc: 'Klik tombol checkout dan pesan pesananmu otomatis terformat rapi dikirim ke admin WhatsApp kami.',
    },
  ];

  return (
    <section id="cara-pesan" className="py-12 sm:py-16 md:py-24 relative scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-coral-600 bg-coral-100 px-3.5 py-1 rounded-full inline-block mb-3">
            Mudah & Cepat
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-choco-900 tracking-tight">
            Cara Pesan di <span className="text-gradient">Jajan Yuk</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-choco-700 font-medium px-2 sm:px-0">
            Tanpa perlu registrasi akun yang ribet, kamu bisa langsung pesan dalam 3 langkah mudah.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 sm:p-7 border-2 border-cream-200 shadow-soft relative flex flex-col items-center text-center group hover:border-coral-300 hover:shadow-soft-lg transition-all"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-3.5 bg-coral-500 text-white font-display font-black text-xs px-3.5 py-0.5 sm:py-1 rounded-full shadow-coral">
                Langkah {item.step}
              </div>

              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-coral-50 border border-coral-200 flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="font-display font-extrabold text-base sm:text-lg text-choco-900 mb-1.5 sm:mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-choco-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
