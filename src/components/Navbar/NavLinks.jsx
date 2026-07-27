import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tools', to: '/search' },
];

function NavLinks() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {NAV_LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) =>
            `relative text-sm font-medium transition-colors duration-200 py-2 ${
              isActive ? 'text-text-main' : 'text-text-muted hover:text-text-main'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator-desktop"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full shadow-glow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavLinks;
