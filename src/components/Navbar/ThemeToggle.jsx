import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 text-text-muted hover:text-primary transition-colors bg-surface rounded-full border border-border hover:border-primary/50 shadow-sm"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 360 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {isDark ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
