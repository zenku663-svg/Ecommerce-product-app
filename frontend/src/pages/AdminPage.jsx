import React, { useState, useEffect } from 'react';
import api from '../api/api';
import Layout from '../components/Layout';
import { Search, Plus, Edit2, Trash2, X, AlertCircle, ShoppingBag, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null when adding new
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching admin products:', err);
      setError('Unable to load catalog. Please check API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setImageUrl('');
    setCategory('');
    setPrice('');
    setDescription('');
    setStock('');
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setName(product.name || '');
    setImageUrl(product.imageUrl || product.image || '');
    setCategory(product.category || '');
    setPrice(product.price !== undefined ? product.price.toString() : '');
    setDescription(product.description || '');
    setStock(product.stock !== undefined ? product.stock.toString() : '');
    setFormError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter((p) => (p._id || p.id) !== productId));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete product. Please check admin authorization.');
    }
  };

  const validateForm = () => {
    if (!name.trim()) return 'Product Name is required';
    if (!imageUrl.trim()) return 'Image URL is required';
    if (!category.trim()) return 'Category is required';
    if (!price || isNaN(Number(price)) || Number(price) < 0) return 'Price must be a valid positive number';
    if (!description.trim()) return 'Description is required';
    if (!stock || isNaN(Number(stock)) || Number(stock) < 0) return 'Stock must be a valid positive integer';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    const validationErr = validateForm();
    if (validationErr) {
      setFormError(validationErr);
      return;
    }

    const payload = {
      name,
      imageUrl, // Sending both in case backend looks for one or the other
      image: imageUrl,
      category,
      price: Number(price),
      description,
      stock: Math.floor(Number(stock)),
    };

    setIsSubmitting(true);
    try {
      if (editingProduct) {
        // Update product
        const id = editingProduct._id || editingProduct.id;
        await api.put(`/products/${id}`, payload);
      } else {
        // Create product
        await api.post('/products', payload);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error('Form submission error:', err);
      setFormError(err.response?.data?.message || 'Failed to save product details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="border-b border-white/5 pb-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm mt-1">Manage and update your global inventory catalog.</p>
            </div>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center space-x-2 py-3 px-5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-[0_4px_15px_rgba(249,115,22,0.3)] transition-all duration-200 active:scale-95 self-start sm:self-center"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Catalog Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-gray-500"
            />
          </div>
          <div className="text-xs text-gray-500 font-semibold self-end sm:self-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Products Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-white/5 bg-zinc-950/20 backdrop-blur-md">
          {loading ? (
            <div className="text-center py-20 text-gray-500 text-sm animate-pulse">
              Loading inventory list...
            </div>
          ) : filteredProducts.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[10px] uppercase font-bold tracking-widest text-gray-400 bg-white/[0.01]">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredProducts.map((p) => {
                  const id = p._id || p.id;
                  return (
                    <tr key={id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <img
                            src={p.imageUrl || p.image || 'https://via.placeholder.com/100?text=Product'}
                            alt={p.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-semibold text-white truncate max-w-[200px]">{p.name}</span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{p.category}</td>
                      <td className="py-4 px-6 font-display font-semibold text-white">
                        ${p.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-6">
                        {p.stock === 0 ? (
                          <span className="text-red-400 text-xs font-bold uppercase tracking-wider bg-red-500/10 px-2 py-1 rounded">Out</span>
                        ) : p.stock <= 5 ? (
                          <span className="text-orange-400 text-xs font-bold uppercase tracking-wider bg-orange-500/10 px-2 py-1 rounded">Low ({p.stock})</span>
                        ) : (
                          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded">Ok ({p.stock})</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/10 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/20 transition-all"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-20 text-gray-500 text-sm">
              No products found in database.
            </div>
          )}
        </div>

        {/* Modal Form Overlay */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg rounded-2xl glass-panel relative z-10 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
              >
                {/* Title */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-lg font-bold">
                    {editingProduct ? 'Edit Product Details' : 'Add New Product'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {formError && (
                    <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Product Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Minimalist Mechanical Keyboard"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Image URL</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="e.g. https://images.unsplash.com/photo-xxx"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                    />
                  </div>

                  {/* Category & Price Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Category</label>
                      <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. TECH"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 149.99"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Stock Units</label>
                    <input
                      type="number"
                      min="0"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="e.g. 25"
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Description</label>
                    <textarea
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write a high-end description for the item..."
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4 border-t border-white/5">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2.5 rounded-xl border border-white/5 hover:bg-white/5 text-gray-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold uppercase tracking-wider hover:bg-primary-hover shadow-lg transition-colors active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? 'Saving...' : 'Save Product'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default AdminPage;
