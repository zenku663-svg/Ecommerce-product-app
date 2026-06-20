import React from 'react';
import { motion } from 'framer-motion';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className="relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap overflow-hidden"
          >
            {/* Active Glow/Background */}
            {isActive ? (
              <motion.span
                layoutId="activeCategoryBg"
                className="absolute inset-0 bg-primary shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : (
              <span className="absolute inset-0 bg-white/5 border border-white/5 hover:bg-white/10 transition-colors" />
            )}

            {/* Label */}
            <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
