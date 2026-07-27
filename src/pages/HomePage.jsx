import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiList, FiTrendingUp } from 'react-icons/fi';
import Hero from '../components/Hero/Hero';
import ToolCard from '../components/ToolCard/ToolCard';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { getFeaturedTools } from '../constants/tools';
import { CATEGORIES } from '../constants/categories';

function HomePage() {
  const featuredTools = getFeaturedTools().slice(0, 6);
  const topCategories = CATEGORIES.slice(0, 4);

  return (
    <div className="bg-background text-text-main pb-24">
      {/* ── Hero Section ── */}
      <Hero />

      {/* ── Featured Categories Section ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-base relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3 text-primary text-sm font-medium tracking-wide">
                <FiList className="w-4 h-4" />
                <span>DIRECTORIES</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-main">
                Explore <span className="text-primary font-bold">Categories</span>
              </h2>
            </div>
            <Link to="/categories" className="btn-secondary group flex items-center gap-2">
              All Categories <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Security Tools ── */}
      <section className="py-24 border-t border-border/50 bg-surface/30 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="container-base relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3 text-primary text-sm font-medium tracking-wide">
                <FiTrendingUp className="w-4 h-4" />
                <span>INDUSTRY STANDARDS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-text-main">
                Featured <span className="text-primary font-bold">Tools</span>
              </h2>
            </div>
            <Link to="/search?featured=true" className="btn-secondary group flex items-center gap-2">
              Show All Features <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action / Educational Flag ── */}
      <section className="py-24 border-t border-border/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,229,255,0.08),transparent)] pointer-events-none" />
        <div className="container-base max-w-4xl text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="p-5 bg-surface border border-border shadow-glow-sm rounded-2xl">
              <FiShield className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-main mb-6 tracking-tight">
            Want to contribute?
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            This directory is actively curated by the cybersecurity community. You can suggest tools,
            report broken resources, or submit new repositories directly on our GitHub platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="btn-primary py-3 px-8 text-base shadow-glow-sm">Browse Database</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-secondary py-3 px-8 text-base">
              Submit Directory Repo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
