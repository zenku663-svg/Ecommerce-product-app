import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Layout from '../components/Layout';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { AuthContext } from "../context/AuthContext";

  const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useContext(CartContext);

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleCheckout = () => {
      if (!user) {
        navigate("/login");
        return;
      }

      alert("Order simulated successfully!");
      clearCart();
    };

    if (cartItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 text-gray-500 mb-2">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Your Cart is Empty</h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
            You haven't added any products to your catalog yet. Start exploring our handpicked items.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover shadow-[0_4px_15px_rgba(249,115,22,0.3)] transition-all duration-300 active:scale-95"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="border-b border-white/5 pb-6 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
            <p className="text-gray-400 text-sm mt-1">Review and manage your selected design items.</p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-red-400 hover:text-red-300 self-start sm:self-center transition-colors"
          >
            Clear All Items
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => {
              const id = item._id || item.id;
              return (
                <motion.div
                  key={id}
                  layout
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl glass-panel relative gap-4"
                >
                  {/* Product Details Wrapper */}
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="w-16 h-16 rounded-lg bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img
                        src={item.imageUrl || item.image || 'https://via.placeholder.com/150?text=Product'}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <Link to={`/product/${id}`} className="hover:text-primary transition-colors">
                        <h3 className="text-sm font-semibold text-white font-display line-clamp-1">{item.name}</h3>
                      </Link>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{item.category}</p>
                      <p className="text-xs text-primary font-bold font-display">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity and Actions Wrapper */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                    
                    {/* Quantity controls */}
                    <div className="flex items-center bg-white/5 border border-white/5 rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(id, item.quantity - 1)}
                        className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white font-display">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(id, item.quantity + 1)}
                        disabled={item.stock !== undefined && item.quantity >= item.stock}
                        className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total and Delete */}
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-bold font-display text-white w-20 text-right">
                        ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <button
                        onClick={() => removeFromCart(id)}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/10 text-red-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/20 transition-all"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="p-6 rounded-2xl glass-panel space-y-6">
            <h2 className="text-lg font-bold border-b border-white/5 pb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-medium font-display">
                  ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span className="text-emerald-400 font-medium">Free</span>
              </div>
              
              <div className="border-t border-white/5 pt-4 flex justify-between font-bold">
                <span className="text-sm text-gray-300">Total Price</span>
                <span className="text-lg font-display text-white">
                  ${cartTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 group active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            <p className="text-[10px] text-gray-500 text-center leading-normal">
              Secure transactions are simulated using JWT authorizations. Data stored in your secure local instance.
            </p>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
