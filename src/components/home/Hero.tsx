import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatPrice, cn } from '../../lib/utils';

const HERO_SLIDES = [
  {
    id: '1',
    title: 'Essence of Elegance',
    subtitle: 'LUXURY COLLECTION 2026',
    description: 'Discover our most exclusive fragrances curated for the sophisticated soul.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=1920',
    productId: '1',
    accent: '#D4AF37'
  },
  {
    id: '2',
    title: 'The Art of Scents',
    subtitle: 'NEW ARRIVALS',
    description: 'Bold notes of citrus and amber combined in our latest unisex masterpiece.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1920',
    productId: '2',
    accent: '#A67C00'
  },
  {
    id: '3',
    title: 'Timeless Allure',
    subtitle: 'BEST SELLERS',
    description: 'The fragrances everyone is talking about. Reimagined for the modern age.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1920',
    productId: '6',
    accent: '#8E9299'
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  // content of the file from line 52 to 156
  return (
    <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden bg-black m-4 md:m-8 rounded-2xl md:rounded-[2.5rem]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={HERO_SLIDES[currentSlide].image}
              alt={HERO_SLIDES[currentSlide].title}
              className="h-full w-full object-cover opacity-70"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-8 md:px-16 flex items-center z-20">
            <div className="max-w-xl">
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-2 block"
              >
                {HERO_SLIDES[currentSlide].subtitle}
              </motion.span>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-5xl md:text-7xl font-serif leading-[1.1] mb-4"
              >
                {HERO_SLIDES[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-stone-300 text-sm mb-10 leading-relaxed font-light max-w-md"
              >
                {HERO_SLIDES[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  to="/shop"
                  className="bg-gold text-white px-10 py-3.5 text-[10px] uppercase tracking-widest font-bold hover:brightness-110 transition-all duration-300"
                >
                  Shop Now
                </Link>
                {HERO_SLIDES[currentSlide].productId && (
                  <Link
                    to={`/product/${HERO_SLIDES[currentSlide].productId}`}
                    className="border border-white/20 hover:border-white/50 text-white px-10 py-3.5 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 backdrop-blur-sm"
                  >
                    View Record
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-30">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={cn(
              "w-1.5 transition-all duration-500 rounded-full",
              currentSlide === idx ? "h-6 bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)]" : "h-1.5 bg-white/30"
            )}
          />
        ))}
      </div>
    </section>
  );
}
