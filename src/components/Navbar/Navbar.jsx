import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useAuth } from '../../context/AuthContext';

import Logo from './Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import CategoriesDropdown from './CategoriesDropdown';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';

function Navbar() {
  const isScrolled = useScrollPosition();
  const { isAuthenticated } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container-base">
          <div className="flex items-center justify-between h-16 md:h-20 max-w-[1400px] mx-auto gap-4 md:gap-8">
            {/* Left section: Logo and Categories Menu */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
              <div className="hidden md:flex">
                <CategoriesDropdown />
              </div>
            </div>

            {/* Middle section: Desktop Center Links */}
            <div className="hidden md:flex flex-1 justify-center">
              <NavLinks />
            </div>

            {/* Right section: Search, Actions, Profile */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 flex-1 md:flex-none">
              <SearchBar />

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3 border-l border-border/50 pl-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3 pl-1">
                    <NotificationMenu />
                    <ProfileMenu />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/login" className="text-sm font-medium text-text-muted hover:text-text-main transition-colors px-3 py-2">
                      Log in
                    </Link>
                    <Link to="/register" className="btn-primary py-2 px-4 shadow-glow-sm">
                      Sign up
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Hamburger Toggle */}
              <button
                className="md:hidden p-2 text-text-muted hover:text-primary active:scale-95 transition-transform bg-surface rounded-lg border border-border"
                onClick={() => setIsMobileOpen(true)}
              >
                <FiMenu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global animated mobile drawer */}
      <MobileMenu isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />
    </>
  );
}

export default Navbar;