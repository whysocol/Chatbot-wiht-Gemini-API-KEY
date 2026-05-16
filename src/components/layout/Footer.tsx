import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-stone-200 px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <Link to="/" className="text-luxury-black font-serif text-lg tracking-tighter lowercase mb-2 md:mb-0">sellsmrt</Link>
          <p>© {new Date().getFullYear()} SellsMrt Perfume Store • Luxury Scents Delivered</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 hover:text-stone-600 transition-colors">
          <Link to="/return-policy" className="hover:text-black">Return Policy</Link>
          <Link to="/shop" className="hover:text-black">Our Perfumes</Link>
          <Link to="/cart" className="hover:text-black">Your Cart</Link>
          <Link to="/shop" className="hover:text-black">Gift Sets</Link>
        </div>
      </div>
    </footer>
  );
}
