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
    const onScroll = () => setIsScrolled(window.scrollY > 10);
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
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-text-muted hover:text-text-main'
    }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-base">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center bg-surface p-1.5 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
              <FiShield className="text-primary w-5 h-5 shadow-glow-sm" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight">
              <span className="text-text-main">Cyber</span>
              <span className="text-primary font-bold">Search</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 bg-surface/40 backdrop-blur-md px-6 py-1.5 rounded-full border border-border/60">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass} end={link.to === '/'}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator-desktop"
                        className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow-sm"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setIsSearchOpen((v) => !v)} className="p-2 text-text-muted hover:text-primary transition-colors bg-surface rounded-full border border-border hover:border-primary/50" aria-label="Toggle search">
              <FiSearch className="w-4 h-4" />
            </button>
            <button onClick={toggleTheme} className="p-2 text-text-muted hover:text-primary transition-colors bg-surface rounded-full border border-border hover:border-primary/50" aria-label="Toggle theme">
              {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center gap-3 bg-surface pl-3 pr-1 py-1 rounded-full border border-border">
                <span className="text-sm font-medium text-text-main max-w-[100px] truncate">{user?.username || 'User'}</span>
                <button onClick={logout} className="p-1.5 bg-background rounded-full text-text-muted hover:text-red-400 transition-colors border border-border/50 hover:border-red-400/30"><FiLogOut className="w-4 h-4" /></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost">Log in</Link>
                <Link to="/register" className="btn-primary">Sign up</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 text-text-muted hover:text-primary active:scale-95 transition-transform bg-surface rounded-lg border border-border" onClick={() => setIsMobileOpen((v) => !v)}>
            {isMobileOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>

        {/* Desktop Search Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }} exit={{ opacity: 0, height: 0, y: -10 }} transition={{ duration: 0.2 }} className="overflow-hidden border-t border-border mt-1">
              <form onSubmit={handleSearch} className="py-4">
                <div className="relative max-w-2xl mx-auto">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                  <input autoFocus type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools, exploits, frameworks..." className="w-full bg-surface/80 backdrop-blur-md border border-border text-text-main text-base placeholder-text-muted px-4 py-3 pl-12 rounded-xl transition-all duration-300 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 shadow-glow-sm" />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border mt-1 shadow-2xl overflow-hidden h-[calc(100vh-4rem)]">
            <div className="container-base py-6 space-y-6 flex flex-col h-full">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools..." className="input-base pl-12 py-3 text-base" />
                </div>
              </form>
              <nav className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map((link) => (
                  <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => `px-4 py-3 rounded-lg font-medium tracking-wide text-base transition-colors ${isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-text-main hover:bg-surface'}`}>
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="flex flex-col gap-4 pt-6 border-t border-border pb-8">
                <div className="flex justify-between items-center px-2">
                  <span className="text-text-muted text-sm font-medium">Theme</span>
                  <button onClick={toggleTheme} className="p-2 bg-surface rounded-full text-text-main border border-border">
                    {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
                  </button>
                </div>
                {isAuthenticated ? (
                  <button onClick={logout} className="btn-secondary w-full justify-between py-3"><span className="text-text-main">Logout ({user?.username})</span><FiLogOut className="text-red-400" /></button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" onClick={() => setIsMobileOpen(false)} className="btn-secondary py-3 text-base">Log in</Link>
                    <Link to="/register" onClick={() => setIsMobileOpen(false)} className="btn-primary py-3 text-base">Sign up</Link>
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