import React from 'react';
import Hero from '../components/home/Hero';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { motion } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="space-y-24 pb-32">
      <Hero />

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-2xl font-serif">Curated Collection</h3>
          <div className="flex gap-4 text-[10px] uppercase font-bold text-stone-400">
            <Link to="/shop" className="text-luxury-black border-b border-luxury-black">All</Link>
            <Link to="/category/Men">Men</Link>
            <Link to="/category/Women">Women</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Section - Discover Your Scent */}
      <section className="relative h-[480px] rounded-3xl mx-6 md:mx-8 overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-60" 
            alt="Scent Discovery"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-stone-900/80" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Personalized</span>
          <h2 className="text-white text-4xl md:text-5xl font-serif mb-6 leading-tight">
            Find Your <br /> Olfactory Signature
          </h2>
          <p className="text-stone-300 text-xs mt-2 max-w-sm mx-auto mb-8 font-light lowercase">
            Our AI fragrance consultant analyzes notes, skin chemistry, and personality to match you with your perfect luxury scent.
          </p>
          <button 
            className="bg-gold text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:brightness-110 transition-all"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Consult ASK SELLSMRT AI
          </button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-1 block">The Latest</span>
            <h3 className="text-2xl font-serif">New Arrivals</h3>
          </div>
          <Link to="/shop" className="text-[10px] uppercase font-bold text-stone-400 hover:text-gold transition-colors">
            View Full Catalogue
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-y border-stone-200">
          {[
            { icon: ShieldCheck, title: 'Secure Payment', desc: 'Encrypted transactions' },
            { icon: Truck, title: 'Global Shipping', desc: 'Luxury care in transit' },
            { icon: RotateCcw, title: 'Easy Returns', desc: '30-day fragrance window' },
            { icon: Star, title: 'Authenticity', desc: '100% genuine products' }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <feature.icon className="w-5 h-5 text-gold" />
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold">{feature.title}</h4>
                <p className="text-[9px] text-stone-500 uppercase tracking-tighter mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
