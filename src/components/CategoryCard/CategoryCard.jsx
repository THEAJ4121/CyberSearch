import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiGlobe, FiWifi, FiEye, FiShield,
  FiLock, FiCode, FiDatabase, FiAlertTriangle,
  FiRadio, FiSearch, FiTerminal, FiKey, FiArrowRight
} from 'react-icons/fi';

const CATEGORY_ICONS = {
  globe:      FiGlobe,
  wifi:       FiWifi,
  eye:        FiEye,
  shield:     FiShield,
  lock:       FiLock,
  code:       FiCode,
  database:   FiDatabase,
  alert:      FiAlertTriangle,
  radio:      FiRadio,
  search:     FiSearch,
  terminal:   FiTerminal,
  key:        FiKey,
};

function CategoryCard({ category }) {
  const { name, description, icon, tags, toolsCount } = category;
  const IconComp = CATEGORY_ICONS[icon] || FiShield;

  return (
    <Link
      to={`/search?category=${encodeURIComponent(name)}`}
      className="block h-full group"
    >
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-panel p-6 flex flex-col h-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FiArrowRight className="text-primary w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-surface border border-border rounded-xl group-hover:border-primary/40 group-hover:bg-primary/10 transition-colors shadow-sm">
            <IconComp className="w-6 h-6 text-text-main group-hover:text-primary transition-colors" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-text-main group-hover:text-primary transition-colors">
              {name}
            </h3>
            {toolsCount !== undefined && (
              <span className="text-xs text-text-muted font-medium">
                {toolsCount} tools available
              </span>
            )}
          </div>
        </div>

        <p className="text-text-muted text-sm line-clamp-3 mb-5 flex-1 relative z-10 leading-relaxed">
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/50 relative z-10">
            {tags.slice(0, 3).map((t) => (
              <span key={t} className="text-xs font-medium text-text-muted px-2 py-1 bg-surface border border-border rounded-md group-hover:border-primary/20 transition-colors">
                {t}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </Link>
  );
}

export default CategoryCard;
