import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock } from 'react-icons/fi';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDebounce } from '../../hooks/useDebounce';

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useClickOutside(searchRef, () => setIsOpen(false));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <div ref={searchRef} className="relative hidden md:block">
      {/* Search Input Trigger */}
      <div 
        className="relative flex items-center group cursor-pointer"
        onClick={() => {
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
      >
        <div className="flex items-center w-64 h-9 bg-surface/50 hover:bg-surface border border-border hover:border-border/80 rounded-lg px-3 transition-colors">
          <FiSearch className="text-text-muted w-4 h-4 mr-2" />
          <span className="text-sm text-text-muted select-none flex-1">Search...</span>
          <div className="flex items-center gap-1 border border-border/80 rounded px-1.5 py-0.5 bg-background shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <span className="text-[10px] text-text-muted font-medium">Ctrl</span>
            <span className="text-[10px] text-text-muted font-medium">K</span>
          </div>
        </div>
      </div>

      {/* Dropdown / Expanded Search */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-0 right-0 w-96 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-50 transform origin-top-right"
          >
            <form onSubmit={handleSubmit} className="flex items-center border-b border-border/50 px-4 py-3">
              <FiSearch className="text-primary w-5 h-5 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, categories..."
                className="flex-1 bg-transparent text-text-main text-sm outline-none placeholder:text-text-muted font-medium"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="p-1 text-text-muted hover:text-text-main">
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </form>
            
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
                {debouncedQuery ? 'Suggestions' : 'Recent Searches'}
              </div>
              <div className="flex flex-col">
                {/* Mock suggestions */}
                {['Nmap', 'React', 'Tailwind', 'Authentication'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(item)}`);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-surface rounded-lg transition-colors text-sm text-text-main font-medium group"
                  >
                    <FiClock className="text-text-muted group-hover:text-primary transition-colors w-4 h-4" />
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;
