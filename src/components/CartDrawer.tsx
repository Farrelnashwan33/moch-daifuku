'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatRupiah, getWhatsAppUrl } from '@/utils/formatters';
import {
  POPULAR_JATINANGOR_AREAS,
  calculateDistanceKm,
  calculateShippingFee,
} from '@/utils/delivery';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Send,
  MapPin,
  User,
  AlertCircle,
  Navigation,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    shippingFee,
    grandTotal,
    totalItems,
    customer,
    updateCustomer,
    triggerCelebration,
  } = useCart();

  const [formErrors, setFormErrors] = useState<{ name?: string; address?: string }>({});
  const [isLocating, setIsLocating] = useState(false);
  const [gpsStatus, setGpsStatus] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const validateForm = () => {
    const errors: { name?: string; address?: string } = {};
    if (!customer.name.trim()) {
      errors.name = 'Mohon isi nama kamu ya kak.';
    }
    if (customer.deliveryMethod !== 'pickup' && !customer.address.trim()) {
      errors.address = 'Mohon isi alamat/patokan pengiriman ya kak.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;
    if (!validateForm()) return;

    triggerCelebration();

    const waUrl = getWhatsAppUrl(items, totalPrice, customer);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Handle GPS location detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGpsStatus('Browser tidak mendukung pendeteksian lokasi GPS.');
      return;
    }

    setIsLocating(true);
    setGpsStatus('Mencari titik lokasi GPS...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateDistanceKm(userLat, userLng);
        const fee = calculateShippingFee(customer.deliveryMethod, distance);

        updateCustomer({
          distanceKm: distance,
          deliveryFee: fee,
          selectedArea: 'Lokasi GPS Terdeteksi',
          coords: { lat: userLat, lng: userLng },
        });

        setIsLocating(false);
        setGpsStatus(`Lokasi terdeteksi! Jarak ~${distance} km dari Jatinangor.`);

        // Reverse geocoding fallback
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}&zoom=18&addressdetails=1`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.display_name && !customer.address) {
              updateCustomer({ address: data.display_name });
            }
          }
        } catch {
          // ignore geocode fallback
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setGpsStatus('Izin lokasi ditolak. Silakan pilih area atau masukkan jarak manual.');
        } else {
          setGpsStatus('Gagal membaca GPS. Silakan pilih area di bawah.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const currentDistance = customer.distanceKm || 2;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-choco-950/50 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-slideInRight">
          
          {/* Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4.5 bg-cream-100 border-b border-cream-300 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-coral-500 text-white flex items-center justify-center shadow-coral shrink-0">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-choco-900 leading-tight">
                  Keranjang Belanja
                </h3>
                <p className="text-[11px] sm:text-xs text-choco-600 font-medium">
                  {totalItems} item dipilih
                </p>
              </div>
            </div>

            <button
              onClick={closeCart}
              aria-label="Tutup Keranjang"
              className="p-1.5 sm:p-2 rounded-xl text-choco-500 hover:text-choco-900 hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            
            {/* Empty State */}
            {items.length === 0 ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-cream-200 text-coral-400 flex items-center justify-center text-3xl sm:text-4xl mb-3 sm:mb-4">
                  🍰
                </div>
                <h4 className="font-display font-bold text-base sm:text-lg text-choco-900">
                  Keranjangmu Masih Kosong
                </h4>
                <p className="text-xs text-choco-600 mt-1 max-w-xs px-4">
                  Yuk pilih Mochi Daifuku atau dessert manis kesukaanmu sekarang!
                </p>
                <button
                  onClick={closeCart}
                  className="mt-5 sm:mt-6 px-6 py-2.5 sm:py-3 rounded-2xl bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs sm:text-sm shadow-coral transition-all"
                >
                  Lihat Menu
                </button>
              </div>
            ) : (
              <>
                {/* Items List */}
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-choco-700">
                    <span>Daftar Pesanan ({totalItems} pcs)</span>
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 font-medium transition-colors text-[11px]"
                    >
                      Kosongkan
                    </button>
                  </div>

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-cream-50/80 rounded-2xl p-2.5 sm:p-3 border border-cream-300 flex items-center gap-2.5 sm:gap-3 hover:border-coral-200 transition-colors"
                    >
                      <div className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-xl overflow-hidden bg-cream-200 shrink-0 border border-cream-300">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-cover"
                          sizes="52px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-choco-900 truncate">
                          {item.productName}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-block text-[9px] sm:text-[10px] font-semibold text-coral-600 bg-coral-100 px-1.5 py-0.5 rounded">
                            {item.variantName}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-choco-600 font-bold">
                            {formatRupiah(item.price)}
                          </span>
                        </div>

                        {/* Counter and Subtotal */}
                        <div className="mt-1.5 sm:mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-xl bg-white border border-cream-300 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Kurangi jumlah"
                              className="w-5 h-5 rounded-lg text-choco-700 hover:bg-cream-100 flex items-center justify-center text-xs font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-black text-choco-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Tambah jumlah"
                              className="w-5 h-5 rounded-lg text-choco-700 hover:bg-cream-100 flex items-center justify-center text-xs font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-2.5">
                            <span className="font-display font-black text-xs sm:text-sm text-choco-900">
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Hapus produk"
                              className="text-choco-400 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form Data Pembeli & Pengiriman */}
                <div className="pt-3.5 sm:pt-4 border-t border-cream-300 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center gap-1.5 text-xs font-black text-choco-800 uppercase tracking-wider">
                    <User className="w-4 h-4 text-coral-500" />
                    <span>Data Pemesan & Pengiriman</span>
                  </div>

                  {/* Nama */}
                  <div>
                    <label className="block text-xs font-bold text-choco-800 mb-1">
                      Nama Pemesan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Kak Dinda / Fadil"
                      value={customer.name}
                      onChange={(e) => {
                        updateCustomer({ name: e.target.value });
                        if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className={`w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs sm:text-sm text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                        formErrors.name
                          ? 'border-red-400 focus:ring-red-300'
                          : 'border-cream-300 focus:ring-coral-300 focus:border-coral-400'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* No WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-choco-800 mb-1">
                      No. WhatsApp Aktif (Opsional)
                    </label>
                    <input
                      type="tel"
                      placeholder="Contoh: 081234567890"
                      value={customer.phone}
                      onChange={(e) => updateCustomer({ phone: e.target.value })}
                      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 transition-all"
                    />
                  </div>

                  {/* Metode Pengiriman */}
                  <div>
                    <label className="block text-xs font-bold text-choco-800 mb-1.5">
                      Metode Pengiriman
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { id: 'delivery', label: 'Kurir / COD', icon: '🛵', hint: 'Mulai 5k' },
                        { id: 'instant', label: 'Ojol Instant', icon: '⚡', hint: 'Mulai 10k' },
                        { id: 'pickup', label: 'Ambil Sendiri', icon: '🏪', hint: 'Gratis' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => updateCustomer({ deliveryMethod: m.id as any })}
                          className={`p-2 sm:p-2.5 rounded-xl text-xs font-bold text-center border transition-all ${
                            customer.deliveryMethod === m.id
                              ? 'bg-coral-50 border-coral-400 text-coral-700 ring-2 ring-coral-300/30'
                              : 'bg-white border-cream-300 text-choco-700 hover:bg-cream-50'
                          }`}
                        >
                          <span className="block text-base sm:text-lg mb-0.5">{m.icon}</span>
                          <span className="text-[10px] sm:text-[11px] leading-tight block">{m.label}</span>
                          <span className="text-[9px] font-medium text-choco-500 block mt-0.5">
                            {m.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lokasi & Ongkir Dinamis (Jika bukan Ambil Sendiri) */}
                  {customer.deliveryMethod !== 'pickup' && (
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2.5 sm:space-y-3 animate-fadeIn">
                      
                      {/* Asal Toko Info */}
                      <div className="flex items-center justify-between text-[11px] text-choco-700 font-medium">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-coral-500 shrink-0" />
                          <span>Titik Toko: <strong className="text-choco-900">Jatinangor</strong></span>
                        </span>
                        <span className="text-[9px] sm:text-[10px] bg-coral-100 text-coral-700 px-2 py-0.5 rounded-full font-bold">
                          {customer.deliveryMethod === 'delivery' ? '🛵 Tarif Kurir' : '⚡ Tarif Ojol'}
                        </span>
                      </div>

                      {/* Tombol Deteksi Lokasi GPS */}
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={isLocating}
                        className="w-full py-2 px-2.5 sm:px-3 rounded-xl bg-white hover:bg-cream-100 border border-coral-200 text-coral-700 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        {isLocating ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Mendeteksi Lokasi GPS...</span>
                          </>
                        ) : (
                          <>
                            <Navigation className="w-3.5 h-3.5 text-coral-500 shrink-0" />
                            <span className="text-[11px] sm:text-xs">📍 Gunakan Lokasi GPS Saya</span>
                          </>
                        )}
                      </button>

                      {gpsStatus && (
                        <p className="text-[10px] sm:text-[11px] text-choco-700 bg-white/80 p-2 rounded-lg border border-cream-200 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{gpsStatus}</span>
                        </p>
                      )}

                      {/* Pilihan Cepat Wilayah / Area Sekitar Jatinangor */}
                      <div>
                        <label className="block text-[10px] sm:text-[11px] font-bold text-choco-800 mb-1.5">
                          Pilihan Cepat Area Sekitar Jatinangor:
                        </label>
                        <div className="flex flex-wrap gap-1 sm:gap-1.5">
                          {POPULAR_JATINANGOR_AREAS.map((area) => {
                            const isSelected = customer.selectedArea === area.name;
                            return (
                              <button
                                key={area.id}
                                type="button"
                                onClick={() => {
                                  updateCustomer({
                                    selectedArea: area.name,
                                    distanceKm: area.defaultDistanceKm,
                                  });
                                  setGpsStatus(null);
                                }}
                                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border ${
                                  isSelected
                                    ? 'bg-coral-500 text-white border-coral-500 shadow-sm'
                                    : 'bg-white text-choco-700 border-cream-300 hover:border-coral-300'
                                }`}
                              >
                                {area.name} (~{area.defaultDistanceKm} km)
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pengatur Jarak Jangkauan (KM) */}
                      <div className="pt-2 border-t border-amber-200/60">
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] sm:text-[11px] font-bold text-choco-800 flex items-center gap-1">
                            <span>Jarak:</span>
                            <span className="text-coral-600 font-extrabold">{currentDistance} KM</span>
                          </label>
                          <span className="text-[11px] sm:text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-md">
                            Ongkir: {formatRupiah(shippingFee)}
                          </span>
                        </div>
                        
                        <input
                          type="range"
                          min="0.5"
                          max="20"
                          step="0.5"
                          value={currentDistance}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            updateCustomer({
                              distanceKm: val,
                              selectedArea: `Jarak ~${val} km`,
                            });
                          }}
                          className="w-full accent-coral-500 cursor-pointer h-1.5 bg-cream-300 rounded-lg"
                        />
                        <div className="flex justify-between text-[9px] sm:text-[10px] text-choco-500 mt-0.5">
                          <span>Dekat (0.5 km)</span>
                          <span>Sedang (5-10 km)</span>
                          <span>Jauh (20 km)</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Alamat Pengiriman */}
                  {customer.deliveryMethod !== 'pickup' && (
                    <div>
                      <label className="block text-xs font-bold text-choco-800 mb-1">
                        Alamat Lengkap / Patokan Rumah / Kosan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Contoh: Kost Pondok Mawar No. 15, Jl. Sayang Jatinangor"
                        value={customer.address}
                        onChange={(e) => {
                          updateCustomer({ address: e.target.value });
                          if (formErrors.address)
                            setFormErrors((prev) => ({ ...prev, address: undefined }));
                        }}
                        className={`w-full px-3 sm:px-3.5 py-2 rounded-xl border text-xs sm:text-sm text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                          formErrors.address
                            ? 'border-red-400 focus:ring-red-300'
                            : 'border-cream-300 focus:ring-coral-300 focus:border-coral-400'
                        }`}
                      />
                      {formErrors.address && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {formErrors.address}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Catatan Tambahan */}
                  <div>
                    <label className="block text-xs font-bold text-choco-800 mb-1">
                      Catatan Pesanan (Opsional)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Minta ice pack atau ucapan birthday"
                      value={customer.notes}
                      onChange={(e) => updateCustomer({ notes: e.target.value })}
                      className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-cream-300 text-xs sm:text-sm text-choco-900 bg-cream-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-coral-300 focus:border-coral-400 transition-all"
                    />
                  </div>

                  {/* Metode Pembayaran */}
                  <div>
                    <label className="block text-xs font-bold text-choco-800 mb-1.5">
                      Pilihan Metode Pembayaran
                    </label>
                    <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                      {[
                        { id: 'qris', label: 'QRIS', icon: '📱' },
                        { id: 'transfer', label: 'Transfer', icon: '🏦' },
                        { id: 'cod', label: 'COD Tunai', icon: '💵' },
                      ].map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => updateCustomer({ paymentMethod: p.id as any })}
                          className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                            customer.paymentMethod === p.id
                              ? 'bg-coral-50 border-coral-400 text-coral-700 ring-2 ring-coral-300/30'
                              : 'bg-white border-cream-300 text-choco-700 hover:bg-cream-50'
                          }`}
                        >
                          <span className="block text-sm sm:text-base mb-0.5">{p.icon}</span>
                          <span className="text-[10px] sm:text-[11px] leading-tight block">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </>
            )}

          </div>

          {/* Footer with Subtotal, Ongkir & Grand Total */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-cream-100 border-t border-cream-300 space-y-3">
              
              {/* Summary Calculation Breakdown */}
              <div className="space-y-1.5 bg-white/80 p-2.5 sm:p-3 rounded-xl border border-cream-300/70 text-xs">
                <div className="flex justify-between text-choco-600 text-[11px] sm:text-xs">
                  <span>Subtotal Produk ({totalItems} pcs)</span>
                  <span className="font-semibold text-choco-900">{formatRupiah(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between items-center text-choco-600 text-[11px] sm:text-xs">
                  <span className="flex items-center gap-1">
                    <span>Biaya Ongkir</span>
                    {customer.deliveryMethod !== 'pickup' && (
                      <span className="text-[9px] sm:text-[10px] bg-coral-100 text-coral-700 px-1.5 py-0.2 rounded font-bold">
                        ~{customer.distanceKm || 2} km
                      </span>
                    )}
                  </span>
                  <span className="font-bold text-emerald-700">
                    {customer.deliveryMethod === 'pickup' ? 'Gratis' : formatRupiah(shippingFee)}
                  </span>
                </div>

                <div className="pt-1.5 border-t border-cream-300 flex justify-between items-baseline">
                  <div>
                    <span className="font-display font-extrabold text-choco-900 text-xs sm:text-base block leading-tight">
                      Total Pembayaran
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-choco-500 font-medium">
                      Sudah termasuk ongkir
                    </span>
                  </div>
                  <span className="font-display font-black text-lg sm:text-2xl text-coral-600">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                onClick={handleCheckoutWhatsApp}
                id="checkout-whatsapp-btn"
                className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>Pesan Sekarang via WhatsApp</span>
              </button>

              <p className="text-[9px] sm:text-[10px] text-center text-choco-500 font-medium">
                🔒 Pesanan otomatis diteruskan ke WhatsApp Admin (089648306478)
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
