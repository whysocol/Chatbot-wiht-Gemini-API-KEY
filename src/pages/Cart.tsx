import React from 'react';
import { useCart } from '../store/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-32 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <ShoppingBag className="w-8 h-8 text-gold" />
        </div>
        <h2 className="text-3xl font-serif mb-6 lowercase tracking-tighter">Your bag is empty</h2>
        <p className="text-stone-500 mb-10 text-xs font-light lowercase">Explore our curated collections and find your signature scent.</p>
        <Link to="/shop" className="inline-block bg-luxury-black text-white px-10 py-3.5 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-gold transition-all">
          Explore Archives
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <h1 className="text-4xl font-serif mb-12">Shopping Bag ({totalItems})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Cart items */}
        <div className="lg:col-span-8 space-y-8">
          <AnimatePresence initial={false}>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center space-x-6 pb-8 border-b border-gray-100 group"
              >
                <div className="w-24 h-32 bg-gray-50 overflow-hidden rounded-xl shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">{item.brand}</p>
                    <Link to={`/product/${item.id}`} className="block">
                      <h3 className="font-serif text-lg group-hover:text-gold transition-colors">{item.name}</h3>
                    </Link>
                    <p className="text-sm font-medium mt-2">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden h-10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <div className="text-right w-24">
                      <p className="text-sm font-bold">{formatPrice(item.price * item.quantity)}</p>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link 
            to="/shop" 
            className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-gold transition-colors pt-4"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 translate-y-0 lg:-translate-y-4">
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-8 sticky top-24">
            <h2 className="font-serif text-lg mb-8 tracking-tighter lowercase">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-stone-500">
                <span>Subtotal</span>
                <span className="text-luxury-black">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-stone-500">
                <span>Shipping</span>
                <span className="text-gold">COMPLIMENTARY</span>
              </div>
              <div className="pt-4 border-t border-stone-200 flex justify-between items-end">
                <span className="font-serif text-lg tracking-tighter lowercase">Total</span>
                <span className="text-2xl font-serif text-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-luxury-black text-white px-8 py-4 uppercase text-[10px] tracking-widest font-bold hover:bg-gold transition-all flex items-center justify-center group mb-6 shadow-xl shadow-stone-200"
            >
              Checkout Order
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
