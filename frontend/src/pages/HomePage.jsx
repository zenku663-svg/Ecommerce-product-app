import React, { useState, useEffect, useRef } from 'react';
import api from '../api/api';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { ArrowUpDown, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering & Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('featured');

  const productsRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Extract unique categories from products
  const categories = ['ALL', ...new Set(products.map((p) => p.category).filter(Boolean))];

  // Process filtering and sorting
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === 'ALL' || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default featured
    });

  // Skeleton Loader for Product Cards
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="rounded-2xl glass-panel p-5 space-y-4 animate-pulse-slow">
        <div className="aspect-square w-full bg-white/5 rounded-xl" />
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded w-2/3" />
          <div className="h-3 bg-white/5 rounded w-full" />
          <div className="h-3 bg-white/5 rounded w-5/6" />
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-white/5">
          <div className="h-6 bg-white/5 rounded w-1/4" />
          <div className="h-8 bg-white/5 rounded w-1/3" />
        </div>
      </div>
    ));
  };

  return (
    <Layout>
      {/* Hero Header */}
      <HeroSection scrollToProducts={scrollToProducts} />

      {/* Product Catalog Section */}
      <section ref={productsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-16">
        <div className="space-y-10">
          
          {/* Section Header */}
          <div className="border-b border-white/5 pb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Curated Collection</h2>
            <p className="text-gray-400 text-sm mt-2">Browse our handpicked inventory of design items.</p>
          </div>

          {/* Filters & Search Control Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              {/* Sort Dropdown */}
              <div className="relative flex items-center bg-white/5 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-gray-300 font-semibold cursor-pointer hover:bg-white/10 hover:border-white/10 transition-colors">
                <ArrowUpDown className="w-4 h-4 mr-2 text-primary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-gray-300 outline-none cursor-pointer font-sans"
                >
                  <option value="featured" className="bg-[#121212] text-gray-300">Featured</option>
                  <option value="price-low" className="bg-[#121212] text-gray-300">Price: Low to High</option>
                  <option value="price-high" className="bg-[#121212] text-gray-300">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 max-w-xl mx-auto">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {renderSkeletons()}
            </div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div layout key={product._id || product.id}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
              <p className="text-gray-400 font-medium">No products match your current filters.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('ALL');
                  setSortBy('featured');
                }}
                className="mt-4 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
