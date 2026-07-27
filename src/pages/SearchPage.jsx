import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiRefreshCw, FiAlertTriangle, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ToolCard from '../components/ToolCard/ToolCard';
import EmptyState from '../components/EmptyState/EmptyState';
import useSearch from '../hooks/useSearch';
import { TOOLS, getAllCategories, getAllPlatforms, getAllLanguages } from '../constants/tools';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchHook = useSearch(TOOLS);
  const { query, setQuery, filters, updateFilter, resetFilters, results, resultCount, hasActiveFilters } = searchHook;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync URL search parameters on load
  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    const featuredParam = searchParams.get('featured');

    if (qParam) setQuery(qParam);
    if (catParam) updateFilter('category', catParam);
    if (featuredParam === 'true') {
      // Just an example hook in case they want featured logic later
    }
  }, [searchParams, setQuery, updateFilter]);

  const categoriesList = getAllCategories();
  const platformsList = getAllPlatforms();
  const languagesList = getAllLanguages();

  return (
    <div className="bg-background text-text-main min-h-screen pt-24 pb-24">
      <div className="container-base">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display font-semibold text-3xl md:text-4xl text-text-main">
              Tool <span className="text-primary font-bold">Directory</span>
            </h1>
            <p className="text-text-muted mt-2 text-sm md:text-base">
              Explore {TOOLS.length}+ security tools, frameworks, and resources.
            </p>
          </div>
          
          <button 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="lg:hidden flex items-center justify-center gap-2 btn-secondary w-full md:w-auto"
          >
            <FiFilter /> Filters
          </button>
        </div>

        {/* --- Layout Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* 🎯 Sidebar: Filters */}
          <div className={`lg:col-span-1 space-y-6 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="glass-panel p-5 sticky top-24">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                <h3 className="font-display font-semibold text-base tracking-wide text-text-main flex items-center gap-2">
                  <FiSliders className="text-primary w-4 h-4" />
                  Filters
                </h3>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs font-medium text-text-muted hover:text-red-400 transition-colors flex items-center gap-1">
                    <FiRefreshCw className="w-3 h-3" /> Clear All
                  </button>
                )}
              </div>

              {/* Filters Form */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. Nmap, scanner..."
                      className="input-base pl-9 text-sm"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Categories</option>
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Platform Dropdown */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Operating System
                  </label>
                  <select
                    value={filters.platform}
                    onChange={(e) => updateFilter('platform', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Platforms</option>
                    {platformsList.map((plat) => (
                      <option key={plat} value={plat}>{plat}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Dropdown */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Language  */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => updateFilter('language', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Languages</option>
                    {languagesList.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Cost Filter */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Pricing
                  </label>
                  <select
                    value={filters.license}
                    onChange={(e) => updateFilter('license', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Licenses</option>
                    <option value="free">Free Only</option>
                    <option value="paid">Commercial/Paid</option>
                  </select>
                </div>

                {/* Source Code */}
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
                    Source Code
                  </label>
                  <select
                    value={filters.openSource}
                    onChange={(e) => updateFilter('openSource', e.target.value)}
                    className="input-base"
                  >
                    <option value="">All Source Types</option>
                    <option value="true">Open Source (FOSS)</option>
                    <option value="false">Proprietary</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 📊 Main Content: Results Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/40">
              <div className="text-text-muted text-sm font-medium">
                Showing <span className="text-text-main font-bold">{resultCount}</span> matching tools
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {resultCount > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((tool) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={tool.id}
                    >
                      <ToolCard tool={tool} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <EmptyState 
                  title="No tools found"
                  description="We couldn't find any tools matching your current filter criteria."
                  icon={FiAlertTriangle}
                  action={
                    <button onClick={resetFilters} className="btn-secondary">
                      Clear Filters
                    </button>
                  }
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
