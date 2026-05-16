import React from 'react';
import { motion } from 'motion/react';
import { RefreshCw, ShieldCheck, Clock, Truck } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-serif mb-8 text-luxury-black">Return & Refund Policy</h1>
          
          <div className="prose prose-stone max-w-none text-stone-600 space-y-8">
            <section>
              <h2 className="text-2xl font-serif text-luxury-black mb-4">Our Commitment</h2>
              <p>
                At SellsMrt, we take pride in the quality of our luxury fragrances. If you are not completely satisfied with your purchase, we are here to help. Due to the personal nature of our products, we maintain a strict policy to ensure the hygiene and safety of all our customers.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-6 my-12">
              <div className="p-6 bg-white border border-stone-100 rounded-lg shadow-sm">
                <RefreshCw className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-bold text-luxury-black mb-2 uppercase tracking-wider">30-Day Returns</h3>
                <p className="text-sm">We accept returns within 30 days of the original purchase date for unopened and unused products.</p>
              </div>
              <div className="p-6 bg-white border border-stone-100 rounded-lg shadow-sm">
                <ShieldCheck className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-bold text-luxury-black mb-2 uppercase tracking-wider">Quality Guarantee</h3>
                <p className="text-sm">If you receive a defective or damaged item, please contact us immediately for a replacement or refund.</p>
              </div>
              <div className="p-6 bg-white border border-stone-100 rounded-lg shadow-sm">
                <Clock className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-bold text-luxury-black mb-2 uppercase tracking-wider">Processing Time</h3>
                <p className="text-sm">Refunds are processed within 5-7 business days after we receive and inspect the returned item.</p>
              </div>
              <div className="p-6 bg-white border border-stone-100 rounded-lg shadow-sm">
                <Truck className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-bold text-luxury-black mb-2 uppercase tracking-wider">Free Returns</h3>
                <p className="text-sm">Domestic returns are free of charge. International customers are responsible for return shipping costs.</p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-serif text-luxury-black mb-4">How to Initiate a Return</h2>
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <strong>Contact Us:</strong> Email our support team at support@sellsmrt.com with your order number and reason for return.
                </li>
                <li>
                  <strong>Approval:</strong> Once your return request is approved, we will send you a pre-paid return shipping label (for domestic orders).
                </li>
                <li>
                  <strong>Packaging:</strong> Securely pack the item in its original packaging to prevent damage during transit.
                </li>
                <li>
                  <strong>Ship:</strong> Drop off the package at any authorized shipping location.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-serif text-luxury-black mb-4">Non-Returnable Items</h2>
              <p>The following items cannot be returned:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Opened or used perfumes</li>
                <li>Fragrance samples and discovery sets</li>
                <li>Gift cards</li>
                <li>Items purchased on final clearance sale</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
