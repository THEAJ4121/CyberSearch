import { Link } from 'react-router-dom';
import {
  FiGlobe, FiWifi, FiEye, FiShield,
  FiLock, FiCode, FiDatabase, FiAlertTriangle,
  FiRadio, FiSearch, FiTerminal, FiKey
} from 'react-icons/fi';

// Map icon strings to React Icons components
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

/**
 * CategoryCard — showcases a single category with matching icon and link.
 *
 * @param {object} category — category item from categories.js
 */
function CategoryCard({ category }) {
  const { name, description, icon, tags } = category;
  const IconComp = CATEGORY_ICONS[icon] || FiShield;

  return (
    <Link
      to={`/search?category=${encodeURIComponent(name)}`}
      className="glass-card neon-border p-6 flex flex-col h-full group hover:shadow-neon-blue/20 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-center gap-4 mb-4">
        {/* Animated icon wrapper */}
        <div className="p-3 bg-neon-blue/5 border border-neon-blue/20 rounded-xl group-hover:bg-neon-blue/10 group-hover:border-neon-blue/50 transition-colors">
          <IconComp className="w-6 h-6 text-neon-blue group-hover:animate-pulse" />
        </div>
        <div>
          <h3 className="font-orbitron font-semibold text-lg text-white group-hover:text-neon-blue transition-colors">
            {name}
          </h3>
          <span className="text-xs text-cyber-muted font-rajdhani uppercase tracking-wider font-semibold">
            Explore Category
          </span>
        </div>
      </div>

      <p className="text-cyber-muted text-sm font-rajdhani line-clamp-3 mb-4 flex-1">
        {description}
      </p>

      {/* Subtags listed in category */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-cyber-border/40">
          {tags.slice(0, 3).map((t) => (
            <span key={t} className="text-[10px] font-mono text-cyber-muted px-1.5 py-0.5 bg-cyber-gray border border-cyber-border rounded">
              {t}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

export default CategoryCard;
