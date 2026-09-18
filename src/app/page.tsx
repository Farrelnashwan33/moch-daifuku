import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PromoBanner from '@/components/PromoBanner';
import ProductCatalog from '@/components/ProductCatalog';
import ComboDeals from '@/components/ComboDeals';
import HowToOrder from '@/components/HowToOrder';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-100 relative">
      <Navbar />
      <HeroSection />
      <PromoBanner />
      <ProductCatalog />
      <ComboDeals />
      <HowToOrder />
      <Testimonials />
      <Footer />
    </main>
  );
}
