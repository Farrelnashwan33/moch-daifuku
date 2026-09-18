import React from 'react';

export default function PromoBanner() {
  const perks = [
    {
      icon: '🍓',
      title: '100% Buah Segar Asli',
      desc: 'Dipilih dari buah segar pilihan (strawberry, anggur, mangga) berkualitas premium.',
      color: 'bg-rose-50 border-rose-200 text-rose-600',
    },
    {
      icon: '✨',
      title: 'Kulit Mochi Kenyal Lumer',
      desc: 'Tekstur adonan mochi khas Jepang yang lembut elastis dan lumer di mulut.',
      color: 'bg-amber-50 border-amber-200 text-amber-600',
    },
    {
      icon: '🧀',
      title: 'Bahan Premium & Higienis',
      desc: '100% Halal, tanpa pemanis buatan berlebih, dan selalu dibuat fresh setiap pagi.',
      color: 'bg-emerald-50 border-emerald-200 text-emerald-600',
    },
    {
      icon: '💸',
      title: 'Harga Bersahabat 5 Ribuan',
      desc: 'Kelezatan dessert cafe premium kini bisa dinikmati siapa saja dengan harga terjangkau.',
      color: 'bg-coral-50 border-coral-200 text-coral-600',
    },
  ];

  return (
    <section className="py-8 bg-cream-200/60 border-y border-cream-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-2xl border border-cream-300 shadow-soft hover:shadow-soft-lg hover:-translate-y-1 transition-all flex items-start gap-3.5"
            >
              <div className="w-11 h-11 rounded-2xl bg-cream-100 border border-cream-300 flex items-center justify-center text-2xl shrink-0">
                {perk.icon}
              </div>
              <div>
                <h4 className="font-display font-bold text-choco-900 text-sm sm:text-base leading-snug">
                  {perk.title}
                </h4>
                <p className="text-xs text-choco-600 mt-1 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
