import React, { useState, useMemo } from 'react';
import { PRODUCTS, Product } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Men', 'Women', 'Unisex', 'Luxury', 'Daily Use', 'Gift Sets'];
const FRAGRANCES = ['All', 'Flowery', 'Woody', 'Fresh', 'Oriental', 'Citrus'];
const NOTES = ['Oud', 'Vanilla', 'Rose', 'Leather', 'Amber', 'Citrus', 'Musk', 'Saffron', 'Sandalwood', 'Mint', 'Lavender'];
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Avg. Rating', value: 'rating' },
];

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [fragrance, setFragrance] = useState('All');
  const [sort, setSort] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // New granular filters
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (fragrance !== 'All') {
      result = result.filter(p => p.fragranceType === fragrance);
    }

    if (showBestSellers) {
      result = result.filter(p => p.isBestSeller);
    }

    if (showNewArrivals) {
      result = result.filter(p => p.isNewArrival);
    }

    if (selectedNotes.length > 0) {
      result = result.filter(p => 
        selectedNotes.some(note => 
          p.description.toLowerCase().includes(note.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(note.toLowerCase()))
        )
      );
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [search, category, fragrance, sort, showBestSellers, showNewArrivals, selectedNotes]);

  const toggleNote = (note: string) => {
    setSelectedNotes(prev => 
      prev.includes(note) ? prev.filter(n => n !== note) : [...prev, note]
    );
  };

  const resetFilters = () => {
    setCategory('All');
    setFragrance('All');
    setSearch('');
    setShowBestSellers(false);
    setShowNewArrivals(false);
    setSelectedNotes([]);
  };

  const activeFiltersCount = (category !== 'All' ? 1 : 0) + 
                             (fragrance !== 'All' ? 1 : 0) + 
                             (showBestSellers ? 1 : 0) + 
                             (showNewArrivals ? 1 : 0) + 
                             selectedNotes.length;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-20">
      {/* Header */}
      <div className="mb-20">
        <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block text-center">Exclusive</span>
        <h1 className="text-4xl md:text-5xl font-serif mb-6 text-center">Our Scent Catalogue</h1>
        <div className="w-12 h-px bg-stone-300 mx-auto"></div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 sticky top-[68px] lg:top-[60px] bg-beige/95 backdrop-blur-md z-40 py-6 border-b border-stone-200">
        {/* Search */}
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search our archives..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-stone-100 border-none rounded-xl focus:ring-1 focus:ring-gold/30 text-[11px] uppercase tracking-wider outline-none transition-all"
          />
        </div>

        {/* Desktop Filter Tabs */}
        <div className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all",
                category === cat ? "bg-white text-gold shadow-sm" : "text-stone-500 hover:text-luxury-black"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting & Filter Toggle */}
        <div className="flex items-center space-x-4 w-full lg:w-auto">
          <select 
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="flex-1 lg:w-48 bg-stone-100 border-none px-4 py-3 rounded-xl text-[10px] uppercase tracking-widest font-bold outline-none cursor-pointer hover:bg-stone-200 transition-all appearance-none"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-3 bg-stone-100 rounded-xl hover:bg-stone-200 transition-all relative"
          >
            <SlidersHorizontal className="w-4 h-4 text-stone-600" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center text-[8px] text-white border-2 border-beige shadow-sm font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Expanded Filters */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12 bg-stone-50 rounded-3xl p-8 border border-stone-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6">Collections</h4>
                <div className="space-y-4">
                  <label className="flex items-center group cursor-pointer">
                    <div 
                      onClick={() => setShowBestSellers(!showBestSellers)}
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all mr-3",
                        showBestSellers ? "bg-gold border-gold" : "border-stone-300 group-hover:border-gold"
                      )}
                    >
                      {showBestSellers && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                    </div>
                    <span className={cn("text-[11px] uppercase tracking-wider font-medium transition-colors", showBestSellers ? "text-gold" : "text-stone-500")}>Best Sellers</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <div 
                      onClick={() => setShowNewArrivals(!showNewArrivals)}
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-all mr-3",
                        showNewArrivals ? "bg-gold border-gold" : "border-stone-300 group-hover:border-gold"
                      )}
                    >
                      {showNewArrivals && <Check className="w-2.5 h-2.5 text-white stroke-[3px]" />}
                    </div>
                    <span className={cn("text-[11px] uppercase tracking-wider font-medium transition-colors", showNewArrivals ? "text-gold" : "text-stone-500")}>New Arrivals</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6">Fragrance Family</h4>
                <div className="flex flex-wrap gap-2">
                  {FRAGRANCES.map(f => (
                    <button
                      key={f}
                      onClick={() => setFragrance(f)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold border transition-all",
                        fragrance === f ? "bg-gold text-white border-gold shadow-sm" : "bg-white border-stone-200 text-stone-500 hover:border-gold hover:text-gold"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-stone-400 mb-6">Signature Notes</h4>
                <div className="flex flex-wrap gap-2">
                  {NOTES.map(note => (
                    <button
                      key={note}
                      onClick={() => toggleNote(note)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-[9px] uppercase tracking-wider font-bold border transition-all",
                        selectedNotes.includes(note) ? "bg-stone-800 text-white border-stone-800" : "bg-white border-stone-200 text-stone-500 hover:border-stone-400"
                      )}
                    >
                      {note}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-end justify-end gap-4">
                <button 
                  onClick={resetFilters}
                  className="flex items-center text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5 mr-2" /> Reset Archive
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-16">
        {filteredProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center">
          <p className="text-gray-400 font-serif text-2xl mb-4">No fragrances found matching your filters.</p>
          <button 
            onClick={resetFilters}
            className="text-gold uppercase text-xs tracking-widest font-bold border-b border-gold pb-1"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
