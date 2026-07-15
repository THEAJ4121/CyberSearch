import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiSliders, FiTrendingUp } from 'react-icons/fi';
import Hero from '../components/Hero/Hero';
import ToolCard from '../components/ToolCard/ToolCard';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { getFeaturedTools } from '../constants/tools';
import { CATEGORIES } from '../constants/categories';

function HomePage() {
  const featuredTools = getFeaturedTools().slice(0, 6); // grab up to 6 featured tools
  const topCategories = CATEGORIES.slice(0, 4); // grab top 4 for the homepage grid

  return (
    <div className="bg-cyber-black text-cyber-text pb-20">
      {/* ── Hero Search Section ── */}
      <Hero />

      {/* ── Featured Categories Section ── */}
      <section className="py-20 border-t border-cyber-border/40 relative">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-neon-green text-xs font-rajdhani font-bold uppercase tracking-widest">
                <FiSliders className="w-4 h-4 animate-spin-slow" />
                <span>Directories</span>
              </div>
              <h2 className="text-3xl font-orbitron font-black text-white">
                EXPLORE <span className="text-neon-blue">CATEGORIES</span>
              </h2>
            </div>
            <Link to="/categories" className="btn-ghost flex items-center gap-2 text-xs py-2">
              All Categories <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <CategoryCard category={cat} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Security Tools ── */}
      <section className="py-20 border-t border-cyber-border/40 bg-cyber-dark/30 relative">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-neon-purple text-xs font-rajdhani font-bold uppercase tracking-widest">
                <FiTrendingUp className="w-4 h-4" />
                <span>Industry Standards</span>
              </div>
              <h2 className="text-3xl font-orbitron font-black text-white">
                FEATURED <span className="text-neon-purple">TOOLS</span>
              </h2>
            </div>
            <Link to="/search?featured=true" className="btn-ghost flex items-center gap-2 text-xs py-2">
              Show All Features <FiArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call To Action / Educational Flag ── */}
      <section className="py-20 border-y border-cyber-border/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,212,255,0.05),transparent)] pointer-events-none" />
        <div className="section-container max-w-4xl text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-neon-blue/5 border border-neon-blue/20 rounded-full animate-float">
              <FiShield className="w-12 h-12 text-neon-blue" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-orbitron font-black text-white mb-4">
            WANT TO CONTRIBUTE?
          </h2>
          <p className="text-cyber-muted text-base max-w-xl mx-auto leading-relaxed mb-8">
            This directory is actively curated by the cybersecurity community. You can suggest tools,
            report broken resources, or submit new repositories directly on our GitHub platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="btn-primary">Browse Database</Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Submit Directory Repo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
