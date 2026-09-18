import { CartItem, CustomerDetails } from '@/types';

export const formatRupiah = (amount: number): string => {
  const safeAmount = Math.round(amount || 0);
  const formatted = safeAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `Rp ${formatted}`;
};

export const formatShortPrice = (amount: number): string => {
  if (amount >= 1000) {
    const k = amount / 1000;
    return `${k % 1 === 0 ? k : k.toFixed(1)}k`;
  }
  return `${amount}`;
};

export const WA_PHONE_NUMBER = '6289648306478';

export const generateWhatsAppMessage = (
  items: CartItem[],
  subtotalAmount: number,
  customer: CustomerDetails
): string => {
  const dateStr = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());

  const deliveryFee = customer.deliveryFee ?? 0;
  const grandTotal = subtotalAmount + (customer.deliveryMethod === 'pickup' ? 0 : deliveryFee);

  const deliveryMethodLabel = {
    pickup: 'Ambil di Toko (Self Pickup)',
    delivery: '🛵 Kurir Toko / COD',
    instant: '⚡ Ojol Instant (Grab/Gojek/Maxim)',
  }[customer.deliveryMethod];

  const paymentMethodLabel = {
    qris: 'QRIS (Semua E-Wallet / Mobile Banking)',
    transfer: 'Transfer Bank (BCA / Mandiri / BRI)',
    cod: 'Bayar di Tempat (COD)',
  }[customer.paymentMethod];

  let text = `Halo Admin *Jajan Yuk!* 🌸\nSaya ingin memesan dessert manis berikut ini:\n\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📋 *DETAIL PESANAN:*\n`;

  items.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    text += `${index + 1}. *${item.productName}*\n`;
    text += `   • Varian: ${item.variantName}\n`;
    text += `   • Jumlah: ${item.quantity} pcs (${formatRupiah(item.price)}/pcs)\n`;
    text += `   • Subtotal: ${formatRupiah(itemSubtotal)}\n\n`;
  });

  text += `━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `💰 *RINCIAN PEMBAYARAN:*\n`;
  text += `• Subtotal Produk : ${formatRupiah(subtotalAmount)}\n`;
  
  if (customer.deliveryMethod === 'pickup') {
    text += `• Ongkos Kirim    : Gratis (Ambil di Toko)\n`;
  } else {
    const distStr = customer.distanceKm ? ` (~${customer.distanceKm} km)` : '';
    text += `• Ongkos Kirim${distStr} : ${formatRupiah(deliveryFee)}\n`;
  }

  text += `👉 *TOTAL BAYAR   : ${formatRupiah(grandTotal)}*\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  text += `👤 *DATA PEMESAN:*\n`;
  text += `• Nama: *${customer.name || '-'}*\n`;
  if (customer.phone) {
    text += `• No. WhatsApp: ${customer.phone}\n`;
  }
  text += `• Metode Pengiriman: ${deliveryMethodLabel}\n`;
  if (customer.deliveryMethod !== 'pickup') {
    if (customer.selectedArea) {
      text += `• Area/Wilayah: ${customer.selectedArea}\n`;
    }
    if (customer.distanceKm) {
      text += `• Estimasi Jarak: ${customer.distanceKm} km (dari Jatinangor)\n`;
    }
    text += `• Alamat / Patokan:\n  ${customer.address || '-'}\n`;
  }
  if (customer.notes) {
    text += `• Catatan Tambahan:\n  ${customer.notes}\n`;
  }
  text += `• Metode Pembayaran: ${paymentMethodLabel}\n\n`;

  text += `⏰ _Waktu Order: ${dateStr}_\n\n`;
  text += `Mohon segera diproses ya kak. Terima kasih! ✨🍓`;

  return text;
};

export const getWhatsAppUrl = (
  items: CartItem[],
  subtotalAmount: number,
  customer: CustomerDetails
): string => {
  const message = generateWhatsAppMessage(items, subtotalAmount, customer);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WA_PHONE_NUMBER}?text=${encodedMessage}`;
};
