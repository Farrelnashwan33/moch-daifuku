import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import FloatingCartButton from '@/components/FloatingCartButton';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jajanyuk-dessert.com'),
  title: 'Jajan Yuk! | Mochi Daifuku, Fruit Sando & Cheesecuit Viral',
  description: 'Pesan Mochi Daifuku lembut buah segar, Fruit Sando Roll, dan Cheesecuit creamy lumer dengan harga mulai 5k. Fresh daily, 100% Halal, checkout langsung via WhatsApp!',

  keywords: 'mochi daifuku, fruit sando, cheesecuit, dessert jogja, jajanan viral, mochi buah segar, jajan yuk',
  openGraph: {
    title: 'Jajan Yuk! | Mochi Daifuku & Dessert Manis Mulai 5 Ribuan',
    description: 'Sensasi mochi buah segar lembut & kenyal, Fruit Sando Roll creamy, dan Cheesecuit lezat.',
    url: 'https://jajanyuk-dessert.com',
    siteName: 'Jajan Yuk Dessert',
    images: [
      {
        url: '/images/hero-desserts.jpg',
        width: 1200,
        height: 630,
        alt: 'Jajan Yuk Mochi & Dessert',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased bg-cream-100 text-choco-900 min-h-screen selection:bg-coral-200 selection:text-coral-700">
        <CartProvider>
          {children}
          <CartDrawer />
          <FloatingCartButton />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
