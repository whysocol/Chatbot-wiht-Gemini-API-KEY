import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles, MessageCircleMore } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const INITIAL_MESSAGE = "Welcome to SellsMrt! I'm your personal fragrance consultant. How can I help you find your perfect scent today?";
const SYSTEM_INSTRUCTION = `You are ASK SELLSMRT, the elite AI fragrance concierge for SellsMrt - a premier luxury perfume destination. 

Your persona is sophisticated, knowledgeable, and helpful. You represent a brand that values craftsmanship and sensory excellence.

### CORE KNOWLEDGE:
- **Product Range**: We offer a curated selection of luxury, men's, women's, and unisex fragrances.
- **Volume Policy**: All our standard full-sized perfumes are 100ml (3.4 fl.oz). We also offer Gift Sets and Discovery Boxes with smaller sample vials (e.g., 10x2ml or 5x10ml).
- **Top Recommendations**:
  - *Midnight Elixir*: Our signature oriental luxury scent with dark oud.
  - *Imperial Oud*: The pinnacle of luxury with Cambodian oud.
  - *Silk Orchid*: A best-selling elegant floral for women.
  - *Tuscan Leather*: A bold, masculine woody/leather masterclass.
  - *Discovery Box*: Perfect for finding a signature scent with 10 different samples.
- **Return & Refund Policy**:
  - 30-day window for returns of unopened and unused products.
  - Returns must be in original packaging.
  - Refunds processed in 5-7 business days.
  - Domestic returns are FREE.
  - Non-returnable: Opened/used items, samples, gift cards, and clearance items.
- **Contact Information**: For specific order issues or returns, users should email support@sellsmrt.com.

### RESPONSE GUIDELINES:
1. **Tone**: Elegant, professional, and welcoming. Use "we" to represent SellsMrt.
2. **Fragrance Consulting**: If a customer is looking for a scent, ask about their preferences (notes, occasion, strength).
3. **Safety**: Do not make promises about specific delivery dates or stock levels you don't actually see. 
4. **Accuracy**: If a user asks about policy, stick strictly to the stated rules (30 days, unopened).
5. **Short & Sweet**: Keep responses concise but rich in quality.

Always guide the customer towards their perfect olfactory match.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: INITIAL_MESSAGE }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => scrollToBottom(), [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const botResponse = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error: any) {
      console.error('Chat Error:', error);
      
      let errorMessage = "I apologize, but I'm having trouble connecting right now. Please contact our support team for more details.";
      
      // Check for specific API Key errors as per skill
      if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('PERMISSION_DENIED')) {
        errorMessage = "It seems there's a configuration issue with my AI brain. Please check the API key in the Settings > Secrets panel.";
      }

      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-luxury-black text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-gold/20 hover:shadow-xl transition-all border border-gold/30"
        title="Ask SellsMrt AI"
      >
        <Sparkles className="w-6 h-6 text-gold" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-[100] w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between bg-white border-b border-stone-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                <span className="text-[10px] uppercase font-bold tracking-wider">Ask SellsMrt AI</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 custom-scroll">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex gap-2",
                    m.role === 'user' ? "flex-row-reverse items-end" : "items-start"
                  )}
                >
                  {m.role === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white text-[8px] font-bold shrink-0">S</div>
                  )}
                  <div className={cn(
                    "p-3 rounded-2xl text-[10px] leading-relaxed shadow-sm",
                    m.role === 'user' 
                      ? "bg-stone-900 text-white rounded-tr-none" 
                      : "bg-white text-luxury-black rounded-tl-none border border-stone-100"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-stone-400">
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-stone-300 rounded-full animate-bounce"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-stone-200"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask about products, gifting..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-stone-50 rounded-lg px-3 py-2.5 text-[10px] pr-10 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all outline-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 text-gold font-bold text-xs hover:translate-x-0.5 transition-transform disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
