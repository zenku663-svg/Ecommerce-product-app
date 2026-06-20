import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  // Generate random dots for the premium floating particle background
  const particles = Array.from({ length: 15 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((_, index) => {
          const size = Math.random() * 4 + 2; // 2px to 6px
          const left = Math.random() * 100; // 0% to 100%
          const delay = Math.random() * 10; // 0s to 10s delay
          const duration = Math.random() * 20 + 20; // 20s to 40s duration
          
          return (
            <motion.div
              key={index}
              className="absolute rounded-full bg-primary/20 blur-[1px]"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: '-20px',
              }}
              animate={{
                y: ['0vh', '-110vh'],
                x: ['0px', `${Math.random() * 40 - 20}px`, '0px'],
                opacity: [0, 0.6, 0.6, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: 'linear',
              }}
            />
          );
        })}
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow z-10 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
