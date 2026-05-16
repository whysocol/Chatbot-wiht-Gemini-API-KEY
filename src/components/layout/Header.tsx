import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../store/CartContext';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMobileMenuOpen(false), [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: "Men's", path: '/category/Men' },
    { name: "Women's", path: '/category/Women' },
    { name: 'Unisex', path: '/category/Unisex' },
    { name: 'Offers', path: '/offers' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md py-2 border-stone-200 shadow-sm' 
          : 'bg-white py-4 border-stone-200'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5 text-stone-600" />
          </button>

          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-serif tracking-tighter uppercase font-semibold hover:opacity-80 transition-opacity"
            id="site-logo"
          >
            SellsMrt
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => cn(
                  'text-[10px] uppercase tracking-widest font-semibold hover:text-gold transition-colors relative group',
                  isActive ? 'text-gold' : 'text-luxury-black'
                )}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search fragrances..." 
              className="bg-stone-100 border-none rounded-full px-8 py-1.5 text-xs w-48 focus:ring-1 focus:ring-gold/30 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3 text-stone-600">
            <button className="text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors hidden md:block">Wishlist</button>
            <Link to="/cart" className="text-[10px] uppercase tracking-widest font-bold hover:text-gold transition-colors flex items-center gap-1.5">
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[70] p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif tracking-widest uppercase">
                  Sells<span className="text-gold">Mrt</span>
                </span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) => cn(
                      'text-lg font-serif tracking-wide hover:text-gold transition-colors',
                      isActive ? 'text-gold' : 'text-luxury-black'
                    )}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <div className="absolute bottom-12 left-8 right-8 pt-8 border-t border-gray-100 flex justify-between">
                <div className="flex space-x-6">
                  <User className="w-5 h-5 opacity-60" />
                  <Heart className="w-5 h-5 opacity-60" />
                  <Search className="w-5 h-5 opacity-60" />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
