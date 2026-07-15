import { useState, useMemo, useCallback } from 'react';

/**
 * useSearch — central search + filter logic for the entire app.
 *
 * Why useMemo? Filtering 25+ tools on every keystroke would be expensive
 * if recalculated on every render. useMemo caches the result and only
 * recalculates when query or filters actually change.
 *
 * @param {Array} tools — the full tools array from constants/tools.js
 * @returns {object} — query, setQuery, filters, updateFilter, resetFilters, results, resultCount
 */
function useSearch(tools = []) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    platform: '',
    difficulty: '',
    license: '',   // 'free' | 'paid' | ''
    openSource: '', // 'true' | 'false' | ''
    language: '',
  });

  // updateFilter: update a single filter key without wiping the others
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  // resetFilters: clear everything back to empty strings
  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      platform: '',
      difficulty: '',
      license: '',
      openSource: '',
      language: '',
    });
    setQuery('');
  }, []);

  // The filtered results — only recalculated when query or filters change
  const results = useMemo(() => {
    return tools.filter((tool) => {
      // --- Text Search ---
      // Match against name, description, category, and tags
      const q = query.toLowerCase().trim();
      const matchesQuery =
        q === '' ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(q));

      // --- Category Filter ---
      const matchesCategory =
        !filters.category || tool.category === filters.category;

      // --- Platform Filter ---
      const matchesPlatform =
        !filters.platform || tool.platform.includes(filters.platform);

      // --- Difficulty Filter ---
      const matchesDifficulty =
        !filters.difficulty || tool.difficulty === filters.difficulty;

      // --- Free/Paid Filter ---
      const matchesLicense =
        !filters.license ||
        (filters.license === 'free' && tool.free) ||
        (filters.license === 'paid' && !tool.free);

      // --- Open Source Filter ---
      const matchesOpenSource =
        !filters.openSource ||
        (filters.openSource === 'true' && tool.openSource) ||
        (filters.openSource === 'false' && !tool.openSource);

      // --- Language Filter ---
      const matchesLanguage =
        !filters.language || tool.language === filters.language;

      return (
        matchesQuery &&
        matchesCategory &&
        matchesPlatform &&
        matchesDifficulty &&
        matchesLicense &&
        matchesOpenSource &&
        matchesLanguage
      );
    });
  }, [tools, query, filters]);

  const hasActiveFilters =
    query !== '' ||
    Object.values(filters).some((v) => v !== '');

  return {
    query,
    setQuery,
    filters,
    updateFilter,
    resetFilters,
    results,
    resultCount: results.length,
    hasActiveFilters,
  };
}

export default useSearch;
