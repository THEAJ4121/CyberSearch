import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiCpu, FiStar } from 'react-icons/fi';

/**
 * ToolCard — displays a single cybersecurity tool.
 * Includes category tag, platform badges, description, GitHub stars, and details link.
 *
 * @param {object} tool — tool data object from tools.js
 */
function ToolCard({ tool }) {
  const { name, slug, description, category, platform, github, website, stars, openSource, free } = tool;

  return (
    <div className="glass-card neon-border h-full flex flex-col p-6 transition-all duration-300 hover:-translate-y-1">
      {/* Header: Category & Open Source status */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="cyber-badge">{category}</span>
        <div className="flex gap-1.5">
          {openSource && (
            <span className="text-[10px] uppercase font-bold text-neon-green bg-neon-green/10 border border-neon-green/20 px-2 py-0.5 rounded">
              FOSS
            </span>
          )}
          {free ? (
            <span className="text-[10px] uppercase font-bold text-neon-blue bg-neon-blue/10 border border-neon-blue/20 px-2 py-0.5 rounded">
              FREE
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold text-neon-pink bg-neon-pink/10 border border-neon-pink/20 px-2 py-0.5 rounded">
              PAID
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <Link to={`/tools/${slug}`} className="group inline-block">
        <h3 className="text-xl font-orbitron font-semibold text-white group-hover:text-neon-blue transition-colors flex items-center gap-1">
          {name}
        </h3>
      </Link>

      {/* Description */}
      <p className="text-sm text-cyber-muted font-rajdhani mt-3 flex-1 line-clamp-3">
        {description}
      </p>

      {/* Meta Specs (Language & GitHub Stars) */}
      <div className="mt-4 pt-4 border-t border-cyber-border/40 flex items-center justify-between text-xs text-cyber-muted font-rajdhani">
        <div className="flex items-center gap-1">
          <FiCpu className="text-neon-blue w-3.5 h-3.5" />
          <span>{tool.language || 'N/A'}</span>
        </div>
        {github && stars !== null && (
          <div className="flex items-center gap-1 select-none" title="GitHub Stars">
            <FiStar className="text-neon-green w-3.5 h-3.5" />
            <span>{stars.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-5 flex items-center gap-3">
        {/* Support dynamic platform icons / tags */}
        <div className="flex gap-1 flex-1">
          {platform.map((p) => (
            <span key={p} className="text-[10px] font-mono text-cyber-muted border border-cyber-border px-1.5 py-0.5 rounded capitalize">
              {p}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="p-2 text-cyber-muted hover:text-white border border-cyber-border hover:border-white rounded-lg transition-colors"
              aria-label="GitHub Repo">
              <FiGithub className="w-4 h-4" />
            </a>
          )}
          <a href={website} target="_blank" rel="noopener noreferrer"
            className="p-2 text-cyber-muted hover:text-neon-blue border border-cyber-border hover:border-neon-blue rounded-lg transition-colors"
            aria-label="Official Website">
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ToolCard;
