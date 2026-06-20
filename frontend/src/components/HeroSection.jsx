import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

const HeroSection = ({ scrollToProducts }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[90px] pointer-events-none z-0" />

      {/* Floating Graphic Element */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft geometric circle floating */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-12 -left-12 w-64 h-64 rounded-full border border-white/5 bg-gradient-to-tr from-white/0 to-white/[0.02]"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [360, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full border border-white/5 bg-gradient-to-bl from-white/0 to-white/[0.01]"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center z-10 space-y-8 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-gray-300 text-xs font-semibold tracking-wide"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span className="gradient-text uppercase font-display tracking-widest text-[10px]">Premium E-Commerce Experience</span>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none"
          >
            The New Era of <br />
            <span className="gradient-orange-text">Digital Excellence</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-light"
          >
            Explore a handpicked ecosystem of premium products, precision engineered for design-conscious creators. Zero placeholders. Real performance.
          </motion.p>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={scrollToProducts}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_35px_rgba(249,115,22,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 group active:scale-95"
          >
            <span>Explore Collection</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Decorative Bottom Mesh Grid Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default HeroSection;
