import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tools', to: '/search' },
  { label: 'Categories', to: '/categories' },
];

function MobileMenu({ isOpen, setIsOpen }) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = new FormData(e.target).get('q');
    if (q?.trim()) {
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] md:hidden bg-background/95 backdrop-blur-2xl flex flex-col h-[100dvh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border/50">
            <span className="font-display font-semibold text-lg text-text-main">
              Menu
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 -mr-2 text-text-muted hover:text-text-main transition-colors rounded-full bg-surface border border-border"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 no-scrollbar">
            {/* Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
                <input
                  name="q"
                  type="text"
                  placeholder="Search tools & categories..."
                  className="w-full bg-surface border border-border text-text-main px-4 py-3.5 pl-12 rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none shadow-glow-sm"
                />
              </div>
            </form>

            {/* Links */}
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-medium tracking-wide text-base transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-text-main hover:bg-surface border border-transparent'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-border/50 pt-6 space-y-6">
              {/* Account Section */}
              <div className="px-2">
                <span className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-3 block">
                  Account
                </span>
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-surface/50 border border-border/50 rounded-xl mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-text-main truncate">{user?.username}</p>
                        <p className="text-xs text-text-muted truncate">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl font-medium transition-colors"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="btn-secondary py-3 justify-center"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="btn-primary py-3 justify-center"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
