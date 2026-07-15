import { motion } from 'framer-motion';
import { FiSliders, FiGrid } from 'react-icons/fi';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { CATEGORIES } from '../constants/categories';

/**
 * CategoriesPage — displays grid list of all 12 cybersecurity categories.
 */
function CategoriesPage() {
  return (
    <div className="bg-cyber-black text-cyber-text min-h-screen pt-28 pb-20">
      <div className="section-container">
        {/* Page title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-neon-blue text-xs font-rajdhani font-semibold uppercase tracking-widest mb-4">
            <FiSliders className="w-3.5 h-3.5" />
            Category Catalog
          </div>
          <h1 className="text-4xl sm:text-5xl font-orbitron font-black text-white mb-4">
            BROWSE BY <span className="neon-text">SPECIALTY</span>
          </h1>
          <p className="text-cyber-muted font-rajdhani text-base leading-relaxed">
            Select a specialized cybersecurity field below to filter the database and discover
            industry-standard software, utilities, OSINT frameworks, and tools.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <CategoryCard category={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
