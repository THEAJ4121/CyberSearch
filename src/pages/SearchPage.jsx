import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiSliders, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
import ToolCard from '../components/ToolCard/ToolCard';
import useSearch from '../hooks/useSearch';
import { TOOLS, getAllCategories, getAllPlatforms, getAllLanguages } from '../constants/tools';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchHook = useSearch(TOOLS);
  const { query, setQuery, filters, updateFilter, resetFilters, results, resultCount, hasActiveFilters } = searchHook;

  // Sync URL search parameters on load
  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    const featuredParam = searchParams.get('featured');
    const opensourceParam = searchParams.get('openSource');

    if (qParam) setQuery(qParam);
    if (catParam) updateFilter('category', catParam);
    if (featuredParam) {
      if (featuredParam === 'true') {
        // Simple manual filter mapping for featured
      }
    }
  }, [searchParams, setQuery, updateFilter]);

  // Pull lists of filter options
  const categoriesList = getAllCategories();
  const platformsList = getAllPlatforms();
  const languagesList = getAllLanguages();

  return (
    <div className="bg-cyber-black text-cyber-text min-h-screen pt-28 pb-20">
      <div className="section-container">

        {/* --- Layout Grid (Sidebar Filters + Results List) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* 🎯 Sidebar: Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6 border border-cyber-border">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-cyber-border">
                <h3 className="font-orbitron font-bold text-sm tracking-wider text-white flex items-center gap-2">
                  <FiSliders className="text-neon-blue" />
                  FILTERS
                </h3>
                {hasActiveFilters && (
                  <button onClick={resetFilters} className="text-xs font-rajdhani text-neon-pink hover:underline flex items-center gap-1">
                    <FiRefreshCw className="animate-spin-slow" /> Clear
                  </button>
                )}
              </div>

              {/* Text Search (inside filters) */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Keyword Search
                  </label>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Nmap, scanner, wifi..."
                      className="search-input pl-9 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
                  >
                    <option value="">All Categories</option>
                    {categoriesList.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Platform Dropdown */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Operating System
                  </label>
                  <select
                    value={filters.platform}
                    onChange={(e) => updateFilter('platform', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
                  >
                    <option value="">All Platforms</option>
                    {platformsList.map((plat) => (
                      <option key={plat} value={plat}>{plat}</option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Dropdown */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={filters.difficulty}
                    onChange={(e) => updateFilter('difficulty', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
                  >
                    <option value="">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                {/* Programming Language Dropdown */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => updateFilter('language', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
                  >
                    <option value="">All Languages</option>
                    {languagesList.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                {/* Cost Filter */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Pricing
                  </label>
                  <select
                    value={filters.license}
                    onChange={(e) => updateFilter('license', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
                  >
                    <option value="">All Licenses</option>
                    <option value="free">Free Only</option>
                    <option value="paid">Commercial/Paid</option>
                  </select>
                </div>

                {/* Open Source Switch */}
                <div>
                  <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                    Source Code
                  </label>
                  <select
                    value={filters.openSource}
                    onChange={(e) => updateFilter('openSource', e.target.value)}
                    className="w-full bg-cyber-gray border border-cyber-border text-cyber-text font-rajdhani px-3 py-2 rounded-lg outline-none focus:border-neon-blue text-sm"
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
            {/* Results count & Quick-reset */}
            <div className="flex items-center justify-between pb-4 border-b border-cyber-border/40">
              <div className="font-rajdhani text-cyber-muted text-sm">
                Found <span className="text-neon-blue font-bold font-orbitron">{resultCount}</span> tools registered in directory
              </div>
            </div>

            {/* Grid */}
            {resultCount > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {results.map((tool) => (
                  <div key={tool.id}>
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-card text-center py-20 px-4 border border-dashed border-cyber-border">
                <FiAlertTriangle className="w-12 h-12 text-neon-pink mx-auto mb-4 animate-bounce" />
                <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                  NO TOOLS MATCH SEARCH
                </h3>
                <p className="text-cyber-muted max-w-sm mx-auto text-sm leading-relaxed mb-6 font-rajdhani">
                  Try adjusting keywords or clearing database query options to explore standard
                  cybersecurity suites.
                </p>
                <button onClick={resetFilters} className="btn-primary py-2 px-6 text-sm">
                  Reset Catalog Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
