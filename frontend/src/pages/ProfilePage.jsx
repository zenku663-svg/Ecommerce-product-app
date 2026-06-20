import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Layout from '../components/Layout';
import { LogOut, User, Mail, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-primary/5 blur-[90px] pointer-events-none z-0" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-8 rounded-2xl glass-panel space-y-8 relative z-10"
        >
          {/* Avatar / Logo Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-orange-400 p-[1px] shadow-lg mb-2">
              <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold tracking-tight">{user?.name}</h2>
            {user?.isAdmin ? (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Administrator</span>
              </span>
            ) : (
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-semibold uppercase tracking-wider">
                Verified Customer
              </span>
            )}
          </div>

          {/* Details list */}
          <div className="border-t border-b border-white/5 py-6 space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Full Name</p>
                <p className="text-gray-200 font-medium truncate">{user?.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Email Address</p>
                <p className="text-gray-200 font-medium truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {user?.isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="w-full py-3 px-4 rounded-xl border border-orange-500/30 hover:border-orange-500 text-orange-400 hover:text-white hover:bg-orange-500/10 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
              >
                Go to Admin Dashboard
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className="w-full py-3.5 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase hover:text-white hover:bg-red-500/20 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
