import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../store/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white p-3 border border-stone-100 rounded-xl hover:border-gold transition-all flex flex-col gap-2 group"
    >
      <div className="aspect-[4/5] bg-stone-50 rounded-lg overflow-hidden relative">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isBestSeller && (
            <span className="bg-black text-white text-[8px] px-2 py-0.5 uppercase tracking-wider font-bold">
              Best Seller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-gold text-white text-[8px] px-2 py-0.5 uppercase tracking-wider font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`} className="block">
            <h4 className="text-[11px] font-bold uppercase tracking-tight group-hover:text-gold transition-colors">{product.name}</h4>
          </Link>
          <div className="flex items-center gap-1 text-[10px] text-stone-400">
            <Star className="w-2.5 h-2.5 fill-gold text-gold" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-[9px] text-stone-500 leading-tight uppercase tracking-tighter">{product.fragranceType} & {product.tags[0]}</p>
        
        <div className="flex items-center gap-2 mt-1">
          <p className="text-xs font-bold">{formatPrice(product.price)}</p>
          {product.originalPrice && (
            <p className="text-[10px] text-stone-400 line-through">
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => addToCart(product)}
        className="w-full border border-stone-200 py-1.5 text-[9px] uppercase font-bold hover:bg-stone-50 active:bg-stone-100 transition-colors mt-auto"
      >
        Quick Add
      </button>
    </motion.div>
  );
};

export default ProductCard;
