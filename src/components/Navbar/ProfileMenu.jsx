import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiSettings, FiBookmark, FiGrid, FiLogOut } from 'react-icons/fi';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useAuth } from '../../context/AuthContext';

function ProfileMenu() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-3 pr-1 bg-surface border border-border hover:border-primary/50 rounded-full transition-all duration-200"
      >
        <span className="text-sm font-medium text-text-main max-w-[100px] truncate select-none">
          {user?.username || 'User'}
        </span>
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <FiUser className="w-4 h-4 text-primary" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 bg-background/95 backdrop-blur-xl border border-border shadow-2xl rounded-xl overflow-hidden origin-top-right py-1.5"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 mb-1">
              <p className="text-xs text-text-muted font-medium truncate">Signed in as</p>
              <p className="text-sm font-semibold text-text-main truncate mt-0.5">{user?.email || 'user@example.com'}</p>
            </div>

            {/* Links */}
            <div className="flex flex-col px-1.5">
              <MenuLink to="/dashboard" icon={FiGrid} label="Dashboard" onClick={() => setIsOpen(false)} />
              <MenuLink to="/bookmarks" icon={FiBookmark} label="Bookmarks" onClick={() => setIsOpen(false)} />
              <MenuLink to="/profile" icon={FiUser} label="Profile" onClick={() => setIsOpen(false)} />
              <MenuLink to="/settings" icon={FiSettings} label="Settings" onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-1 pt-1.5 border-t border-border/50 px-1.5">
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 hover:text-red-400 rounded-lg transition-colors group"
              >
                <FiLogOut className="w-4 h-4 group-active:scale-90 transition-transform" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-main hover:bg-surface rounded-lg transition-colors group"
    >
      <Icon className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
      {label}
    </Link>
  );
}

export default ProfileMenu;
