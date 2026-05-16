import React, { useState } from 'react';
import { useCart } from '../store/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, ChevronRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNum: '',
    cardExp: '',
    cardCvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsProcessing(false);
    setIsCompleted(true);
    clearCart();
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
        <h2 className="text-3xl font-serif mb-6">Your bag is empty</h2>
        <Link to="/shop" className="text-gold uppercase tracking-widest text-xs font-bold border-b border-gold pb-1">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-white" />
        </motion.div>
        <h2 className="text-4xl font-serif mb-6">Order Confirmed</h2>
        <p className="text-gray-500 mb-4 font-light">Thank you for choosing SellsMrt. Your luxury fragrance journey has begun.</p>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-12">Order #SMRT-{Math.floor(Math.random() * 99999).toString().padStart(5, '0')}</p>
        <Link to="/" className="bg-luxury-black text-white px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-gold transition-all">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Checkout Form */}
        <div className="lg:col-span-12 xl:col-span-8">
          <div className="flex items-center space-x-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { id: 1, label: 'Contact', icon: ShieldCheck },
              { id: 2, label: 'Shipping', icon: Truck },
              { id: 3, label: 'Payment', icon: CreditCard }
            ].map((s) => (
              <div key={s.id} className="flex items-center shrink-0">
                <div className={cn(
                  "flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all text-[10px] uppercase font-bold tracking-[0.2em]",
                  step === s.id ? "bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-100" : "bg-white border-stone-100 text-stone-400"
                )}>
                  <s.icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                </div>
                {s.id < 3 && <ChevronRight className="w-3.5 h-3.5 mx-4 text-stone-200" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleOrder} className="space-y-12">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-serif">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <InputField label="Email Address" name="email" value={formData.email} onChange={handleInputChange} type="email" required />
                    <div className="grid grid-cols-2 gap-6">
                      <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                      <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto bg-luxury-black text-white px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-gold transition-all"
                  >
                    Continue to Shipping
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-serif">Shipping Details</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <InputField label="Address" name="address" value={formData.address} onChange={handleInputChange} required />
                    <div className="grid grid-cols-2 gap-6">
                      <InputField label="City" name="city" value={formData.city} onChange={handleInputChange} required />
                      <InputField label="ZIP / Postal Code" name="zip" value={formData.zip} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-luxury-black transition-colors px-10 py-4">
                      <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                    </button>
                    <button type="button" onClick={() => setStep(3)} className="bg-luxury-black text-white px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-gold transition-all">
                      Continue to Payment
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-serif">Payment Method</h3>
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 flex items-center justify-between border border-gold/10">
                    <div className="flex items-center space-x-4">
                      <CreditCard className="w-6 h-6 text-gold" />
                      <span className="text-sm font-medium tracking-wide">Credit or Debit Card</span>
                    </div>
                    <div className="flex space-x-3 opacity-60">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" referrerPolicy="no-referrer" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <InputField label="Card Number" name="cardNum" value={formData.cardNum} onChange={handleInputChange} placeholder="0000 0000 0000 0000" required />
                    <div className="grid grid-cols-2 gap-6">
                      <InputField label="Expiration" name="cardExp" value={formData.cardExp} onChange={handleInputChange} placeholder="MM / YY" required />
                      <InputField label="CVV" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="000" required />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-luxury-black transition-colors px-10 py-4">
                      <ArrowLeft className="w-4 h-4" /> <span>Back</span>
                    </button>
                    <button 
                      type="submit" 
                      disabled={isProcessing}
                      className="bg-luxury-black text-white px-10 py-4 uppercase text-xs tracking-widest font-bold hover:bg-gold transition-all flex items-center justify-center min-w-[200px]"
                    >
                      {isProcessing ? <span className="flex items-center"><Truck className="w-4 h-4 animate-bounce mr-2" /> Processing...</span> : `Pay ${formatPrice(totalPrice)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Order Sidebar */}
        <div className="xl:col-span-4 translate-y-0 xl:translate-y-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-32">
            <h4 className="font-serif text-lg mb-8 tracking-wide">Order Summary</h4>
            <div className="space-y-6 max-h-[400px] overflow-y-auto mb-8 pr-2 scrollbar-hide">
              {cart.map(item => (
                <div key={item.id} className="flex space-x-4">
                  <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h5 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{item.brand}</h5>
                    <p className="text-xs font-serif leading-tight mb-2">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Qty: {item.quantity}</span>
                      <span className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between text-xs tracking-wide">
                <span className="text-gray-400 uppercase">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-xs tracking-wide">
                <span className="text-gray-400 uppercase">Shipping</span>
                <span className="text-gold font-bold">FREE</span>
              </div>
              <div className="flex justify-between items-end pt-4 font-serif">
                <span className="text-lg">Total</span>
                <span className="text-2xl font-medium">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <div className="mt-10 p-4 bg-beige/30 rounded-xl flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                Your data is encrypted and protected. SellsMrt uses advanced security protocols for all luxury transactions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">{label}</label>
      <input 
        className="w-full bg-stone-50 border border-stone-100 px-5 py-3 text-[11px] uppercase tracking-wider focus:bg-white focus:border-gold/30 outline-none transition-all rounded-xl"
        {...props}
      />
    </div>
  );
}
