import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useCart } from '../store/CartContext';
import { formatPrice, cn } from '../lib/utils';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ChevronLeft, Minus, Plus } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const AccordionItem = ({ 
  title, 
  isOpen, 
  onClick, 
  children 
}: { 
  title: string; 
  isOpen: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) => {
  return (
    <div className="border-b border-stone-100 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between group transition-all"
      >
        <span className={cn(
          "text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-300",
          isOpen ? "text-gold" : "text-stone-400 group-hover:text-luxury-black"
        )}>
          {title}
        </span>
        <div className="relative w-4 h-4 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 0 : 90 }}
            className={cn(
              "absolute h-[1px] w-4 transition-colors duration-300",
              isOpen ? "bg-gold" : "bg-stone-300 group-hover:bg-luxury-black"
            )}
          />
          <div className={cn(
            "h-4 w-[1px] transition-colors duration-300",
            isOpen ? "bg-transparent" : "bg-stone-300 group-hover:bg-luxury-black"
          )} />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-8 text-stone-600 font-light leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>('description');

  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="py-40 text-center">
        <h2 className="text-3xl font-serif mb-6">Fragrance Not Found</h2>
        <Link to="/shop" className="text-gold uppercase tracking-widest text-xs font-bold border-b border-gold pb-1">
          Return to Shop
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pb-32">
      {/* Breadcrumbs */}
      <div className="bg-stone-50 py-4 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-3 text-[12px] font-light text-stone-300">/</span>
          <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <span className="mx-3 text-[12px] font-light text-stone-300">/</span>
          <span className="text-luxury-black">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 mb-32">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-stone-100 overflow-hidden rounded-2xl group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square bg-stone-100 rounded-xl overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all border border-transparent hover:border-gold">
                <img 
                  src={product.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100" 
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <p className="text-gold uppercase tracking-[0.4em] font-bold text-[10px] mb-3">{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4 lowercase tracking-tighter">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-stone-200"
                    )} 
                  />
                ))}
              </div>
              <span className="text-[10px] text-stone-400 tracking-[0.2em] uppercase font-bold">
                {product.rating} • {product.reviews} Verification
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
              {product.isBestSeller && (
                <span className="bg-gold/10 text-gold px-3 py-1 text-[10px] uppercase tracking-widest font-bold">Best Seller</span>
              )}
            </div>
          </div>

          <p className="text-gray-500 leading-loose mb-10 font-light">
            {product.description}
          </p>

          <div className="space-y-8 mb-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400 mb-4">Fragrance Family</p>
              <div className="inline-block px-5 py-2 bg-stone-100 rounded-lg text-[10px] uppercase font-bold tracking-widest text-luxury-black">
                {product.fragranceType}
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-3 hover:bg-stone-100 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-10 text-center font-bold text-xs">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-3 hover:bg-stone-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 flex space-x-4">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-1 bg-luxury-black text-white px-10 py-5 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-gold transition-all duration-500 shadow-xl shadow-stone-200 active:scale-95"
                >
                  Add to Cart
                </button>
                <button className="p-5 border border-stone-100 rounded-xl hover:border-gold hover:text-gold transition-all bg-stone-50">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-4 pt-10 border-t border-gray-100">
            {[
              { icon: ShieldCheck, label: 'Secure' },
              { icon: Truck, label: 'Free Shipping' },
              { icon: RefreshCw, label: '30D Returns' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2">
                <item.icon className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="max-w-3xl mx-auto px-6 md:px-8 mb-32 border-t border-stone-100">
        <AccordionItem 
          title="Description" 
          isOpen={openSection === 'description'} 
          onClick={() => setOpenSection(openSection === 'description' ? null : 'description')}
        >
          <div className="max-w-2xl">
            <p className="mb-8 text-lg font-serif italic text-stone-400 leading-relaxed">
              "A sensory journey through the finest landscapes of luxury."
            </p>
            <p className="mb-8">Experience the harmonious blend of rare ingredients that make {product.name} a true masterpiece. This fragrance opens with captivating top notes that slowly reveal a complex heart, finally settling into a rich, long-lasting base that lingers gracefully.</p>
            <div className="space-y-6 pt-4">
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold shrink-0 w-24">Top Notes</span>
                <p className="text-sm">Selected from the finest citrus groves and fresh botanicals</p>
              </div>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold shrink-0 w-24">Heart Notes</span>
                <p className="text-sm">A sophisticated floral heart that speaks of modern luxury</p>
              </div>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold shrink-0 w-24">Base Notes</span>
                <p className="text-sm">Hand-sourced oud, amber, and rare warm woods</p>
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Details" 
          isOpen={openSection === 'details'} 
          onClick={() => setOpenSection(openSection === 'details' ? null : 'details')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Volume</span>
              <span className="text-sm">{product.volume}</span>
            </div>
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Longevity</span>
              <span className="text-sm font-medium text-gold">8-12 Hours</span>
            </div>
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Occasion</span>
              <span className="text-sm">{product.tags.join(', ')}</span>
            </div>
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Sillage</span>
              <span className="text-sm">Moderate to Heavy</span>
            </div>
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Category</span>
              <span className="text-sm">{product.category}</span>
            </div>
            <div className="flex justify-between border-b border-stone-50 pb-4">
              <span className="font-bold text-luxury-black uppercase tracking-widest text-[9px]">Batch</span>
              <span className="text-sm font-mono opacity-60">#SMRT-2024-X1</span>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem 
          title="Reviews" 
          isOpen={openSection === 'reviews'} 
          onClick={() => setOpenSection(openSection === 'reviews' ? null : 'reviews')}
        >
          <div className="space-y-12 py-4">
            {[1, 2].map(i => (
              <div key={i} className="group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center font-bold text-gold text-sm group-hover:bg-gold group-hover:text-white transition-colors duration-500">
                      {i === 1 ? 'JD' : 'AS'}
                    </div>
                    <div>
                      <h6 className="font-bold text-sm tracking-tight">{i === 1 ? 'John Doe' : 'Alice Smith'}</h6>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-gold text-gold" />)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">{i === 1 ? '2 weeks ago' : '1 month ago'}</span>
                </div>
                <p className="text-sm italic text-stone-500 leading-relaxed pl-16 group-hover:text-luxury-black transition-colors">
                  {i === 1 
                    ? "Absolutely phenomenal. The complexity of this scent is unlike anything I've owned before. I get compliments every time I wear it." 
                    : "A true masterpiece. The dry down is incredible and it stays on my skin for the entire day. The packaging is also very premium."}
                </p>
              </div>
            ))}
            <button className="w-full py-4 mt-8 bg-stone-50 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-gold hover:bg-stone-100 transition-all rounded-lg">
              View All 124 Reviews
            </button>
          </div>
        </AccordionItem>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-serif mb-12 text-center">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
