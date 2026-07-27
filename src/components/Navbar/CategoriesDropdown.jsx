import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiGlobe, FiCode, FiEye, FiServer } from 'react-icons/fi';
import { useClickOutside } from '../../hooks/useClickOutside';

const CATEGORIES = [
  { id: 'web-security', icon: FiGlobe, label: 'Web Security', count: 42, desc: 'Web App Pentesting' },
  { id: 'network', icon: FiServer, label: 'Network', count: 28, desc: 'Scanners & Sniffers' },
  { id: 'osint', icon: FiEye, label: 'OSINT', count: 35, desc: 'Intel Gathering' },
  { id: 'reverse-eng', icon: FiCode, label: 'Reverse Eng.', count: 14, desc: 'Decompilers' },
];

function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative hidden md:block z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 py-2 text-sm font-medium transition-colors duration-200 ${
          isOpen ? 'text-primary' : 'text-text-muted hover:text-text-main'
        }`}
      >
        Explore
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown className="w-4 h-4 opacity-70" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-screen max-w-[500px]"
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-4 grid grid-cols-2 gap-2 relative before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-border">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/search?category=${encodeURIComponent(cat.label)}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-start p-3 gap-3 hover:bg-surface rounded-xl group transition-colors"
                >
                  <div className="mt-0.5 p-2 bg-surface/50 border border-border/50 group-hover:border-primary/30 group-hover:bg-primary/5 rounded-lg shadow-sm transition-colors text-primary">
                    <cat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-main group-hover:text-primary transition-colors">
                      {cat.label}
                    </h4>
                    <p className="text-xs text-text-muted mt-0.5">{cat.desc}</p>
                  </div>
                </Link>
              ))}
              <div className="col-span-2 pt-3 mt-1 border-t border-border/50">
                <Link
                  to="/categories"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center p-2 text-xs font-semibold text-text-muted hover:text-primary transition-colors uppercase tracking-wider"
                >
                  View All Categories
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CategoriesDropdown;
