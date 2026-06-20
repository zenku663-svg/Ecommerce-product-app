import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#070707] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Pitch */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-orange-400 p-[1px]">
                <div className="w-full h-full bg-[#0a0a0a] rounded-[7px] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                VEXEL<span className="text-primary font-light">STORE</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Experience the next generation of premium shopping. Handpicked tech and design items curated with unmatched precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-4">Store</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center group">
                  <span>Browse Products</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ml-1 text-primary" />
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm text-gray-400 hover:text-primary transition-colors flex items-center group">
                  <span>View Shopping Cart</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ml-1 text-primary" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-gray-200 uppercase tracking-widest mb-4">Support</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-1">
              support@vexelstore.com
            </p>
            <p className="text-xs text-gray-500">
              Response time: Under 2 hours
            </p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Vexel Store. Built with Apple & Veldara level design standards.
          </p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
