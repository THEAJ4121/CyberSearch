import { motion } from 'framer-motion';
import { FiSliders } from 'react-icons/fi';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { CATEGORIES } from '../constants/categories';

function CategoriesPage() {
  return (
    <div className="bg-background text-text-main min-h-screen pt-24 pb-20 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-base relative z-10">
        {/* Page title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium uppercase tracking-wider mb-6 shadow-glow-sm"
          >
            <FiSliders className="w-3.5 h-3.5" />
            Category Catalog
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4 tracking-tight"
          >
            Browse by <span className="text-primary">Specialty</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-muted text-base sm:text-lg leading-relaxed max-w-lg mx-auto"
          >
            Select a specialized security field below to filter the database and discover robust utilities, frameworks, and resources.
          </motion.p>
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
