import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, AlertCircle } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  const id = product._id || product.id;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="group relative flex flex-col rounded-2xl glass-panel glass-panel-hover overflow-hidden h-full"
    >
      {/* Category Tag */}
      <span className="absolute top-4 left-4 z-20 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-300">
        {product.category}
      </span>

      {/* Stock warning */}
      {isOutOfStock && (
        <span className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-red-500/20 backdrop-blur-md border border-red-500/20 text-[10px] font-bold uppercase tracking-wider text-red-400">
          Out Of Stock
        </span>
      )}
      {isLowStock && (
        <span className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-lg bg-orange-500/20 backdrop-blur-md border border-orange-500/20 text-[10px] font-bold uppercase tracking-wider text-orange-400 flex items-center space-x-1">
          <AlertCircle className="w-3 h-3" />
          <span>Only {product.stock} left</span>
        </span>
      )}

      {/* Image container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
        <img
          src={product.imageUrl || product.image || 'https://via.placeholder.com/300x300?text=Premium+Product'}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover overlay with action triggers */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-xs">
          <Link
            to={`/product/${id}`}
            className="p-3 rounded-xl bg-white text-black hover:bg-primary hover:text-white transition-colors duration-200 shadow-lg"
            title="View Details"
          >
            <Eye className="w-5 h-5" />
          </Link>
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="p-3 rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors duration-200 shadow-lg active:scale-95"
              title="Add to Cart"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-grow space-y-3.5">
        <div className="space-y-1">
          <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
            <h3 className="font-display font-bold text-base text-white tracking-tight line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-lg font-display font-bold text-white">
            ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          
          <Link
            to={`/product/${id}`}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-gray-200 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
