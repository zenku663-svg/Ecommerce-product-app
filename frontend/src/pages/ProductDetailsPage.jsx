import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Plus, Minus, AlertCircle, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch current product details
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        
        // Fetch all products to filter related products
        const allResponse = await api.get('/products');
        setAllProducts(allResponse.data);
        
        // Reset quantity to 1 when product changes
        setQuantity(1);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Product not found or api error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse-slow">
          <div className="h-6 w-24 bg-white/5 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-square bg-white/5 rounded-2xl" />
            <div className="space-y-6">
              <div className="h-4 w-32 bg-white/5 rounded" />
              <div className="h-10 w-2/3 bg-white/5 rounded" />
              <div className="h-6 w-20 bg-white/5 rounded" />
              <div className="h-20 w-full bg-white/5 rounded" />
              <div className="h-12 w-1/3 bg-white/5 rounded" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
          <ShieldAlert className="w-16 h-16 mx-auto text-red-500" />
          <h2 className="text-2xl font-bold">Failed to Load Product</h2>
          <p className="text-gray-400 text-sm">{error || 'The requested product does not exist.'}</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Store</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  // Get related products: same category, excluding current product, cap at 4 items
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && (p._id || p.id) !== (product._id || product.id))
    .slice(0, 4);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products</span>
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Image Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl border border-white/5 bg-zinc-900 overflow-hidden aspect-square flex items-center justify-center relative"
          >
            <img
              src={product.imageUrl || product.image || 'https://via.placeholder.com/600x600?text=Premium+Product'}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Right Column: Details Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col space-y-6"
          >
            {/* Category tag */}
            <div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-gray-400">
                {product.category}
              </span>
            </div>

            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{product.name}</h1>
              <p className="text-2xl font-bold font-display text-white">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Description */}
            <div className="border-t border-b border-white/5 py-6">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Product Description</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">{product.description}</p>
            </div>

            {/* Stock status */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Availability:</span>
              {isOutOfStock ? (
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">Out of stock</span>
              ) : isLowStock ? (
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center">
                  <AlertCircle className="w-3.5 h-3.5 mr-1" />
                  Only {product.stock} items left
                </span>
              ) : (
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">In stock ({product.stock} available)</span>
              )}
            </div>

            {/* Actions: Quantity Selector & Add To Cart */}
            {!isOutOfStock && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-4">
                  {/* Quantity selector buttons */}
                  <div className="flex items-center bg-white/5 border border-white/5 rounded-xl p-1">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 transition-all active:scale-90"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-white font-display">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                      className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 transition-all active:scale-90"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-grow py-3.5 px-6 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 group active:scale-95"
                  >
                    <ShoppingCart className="w-4.5 h-4.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Added Message */}
                {addedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold text-center"
                  >
                    Successfully added {quantity} item(s) to your cart!
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 space-y-8">
            <div className="border-b border-white/5 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">You might also like</h2>
              <p className="text-gray-400 text-xs mt-1">Related premium items in the same category.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
