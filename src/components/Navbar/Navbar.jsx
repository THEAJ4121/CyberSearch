import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiMenu, FiX, FiSun, FiMoon,
  FiShield, FiLogOut,
} from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Tools',      to: '/search' },
  { label: 'Categories', to: '/categories' },
];

function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsMobileOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-rajdhani font-semibold uppercase tracking-widest transition-colors duration-200 ${
      isActive ? 'text-neon-blue' : 'text-cyber-muted hover:text-cyber-text'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cyber-black/90 backdrop-blur-md border-b border-cyber-border'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <FiShield className="text-neon-blue w-7 h-7" />
              <div className="absolute inset-0 text-neon-blue blur-sm opacity-50">
                <FiShield className="w-7 h-7" />
              </div>
            </div>
            <span className="font-orbitron font-black text-xl tracking-widest">
              <span className="text-white">CYBER</span>
              <span className="text-neon-blue">SEARCH</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-blue"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setIsSearchOpen((v) => !v)} className="p-2 text-cyber-muted hover:text-neon-blue transition-colors" aria-label="Toggle search">
              <FiSearch className="w-5 h-5" />
            </button>
            <button onClick={toggleTheme} className="p-2 text-cyber-muted hover:text-neon-blue transition-colors" aria-label="Toggle theme">
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-rajdhani text-cyber-text">{user?.username || 'User'}</span>
                <button onClick={logout} className="p-2 text-cyber-muted hover:text-neon-pink transition-colors"><FiLogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-ghost py-1.5 px-4 text-xs">Login</Link>
                <Link to="/register" className="btn-primary py-1.5 px-4 text-xs">Register</Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-cyber-muted hover:text-neon-blue" onClick={() => setIsMobileOpen((v) => !v)}>
            {isMobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
              <form onSubmit={handleSearch} className="pb-4">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-muted w-5 h-5" />
                  <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools, exploits, frameworks..." className="search-input pl-12" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-cyber-dark border-t border-cyber-border">
            <div className="section-container py-4 space-y-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-muted w-5 h-5" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools..." className="search-input pl-12" />
                </div>
              </form>
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => `px-4 py-3 rounded-lg font-rajdhani font-semibold uppercase tracking-wider text-sm transition-colors ${isActive ? 'bg-cyber-gray text-neon-blue' : 'text-cyber-text hover:bg-cyber-gray'}`}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex items-center gap-3 pt-2 border-t border-cyber-border">
                <button onClick={toggleTheme} className="p-2 text-cyber-muted hover:text-neon-blue">
                  {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                </button>
                {isAuthenticated ? (
                  <button onClick={logout} className="flex items-center gap-1 text-sm text-neon-pink font-rajdhani"><FiLogOut /> Logout</button>
                ) : (
                  <div className="flex gap-2 flex-1">
                    <Link to="/login" onClick={() => setIsMobileOpen(false)} className="btn-ghost py-1.5 text-xs flex-1 text-center">Login</Link>
                    <Link to="/register" onClick={() => setIsMobileOpen(false)} className="btn-primary py-1.5 text-xs flex-1 text-center">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;