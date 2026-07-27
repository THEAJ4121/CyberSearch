import { Link } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';

function Logo({ onClick }) {
  return (
    <Link to="/" onClick={onClick} className="flex items-center gap-2 group z-50">
      <div className="relative flex items-center justify-center bg-surface p-1.5 rounded-lg border border-border group-hover:border-primary/50 transition-colors">
        <FiShield className="text-primary w-5 h-5 shadow-glow-sm" />
      </div>
      <span className="font-display font-semibold text-lg tracking-tight">
        <span className="text-text-main">Cyber</span>
        <span className="text-primary font-bold">Search</span>
      </span>
    </Link>
  );
}

export default Logo;
