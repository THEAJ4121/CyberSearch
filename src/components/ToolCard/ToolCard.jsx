import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiCpu, FiStar, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

function ToolCard({ tool }) {
  const { name, slug, description, category, platform, github, website, stars, openSource, free } = tool;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass-panel flex flex-col p-5 group h-full relative overflow-hidden"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header: Category & Tags */}
      <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-surface border border-border text-primary group-hover:border-primary/30 transition-colors">
          {category}
        </span>
        <div className="flex gap-1.5">
          {openSource && (
            <span className="text-[10px] uppercase font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-md">
              FOSS
            </span>
          )}
          {free ? (
            <span className="text-[10px] uppercase font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-md">
              FREE
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2 py-0.5 rounded-md">
              PAID
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <Link to={`/tools/${slug}`} className="group/link inline-flex items-center gap-2 relative z-10">
        <h3 className="text-xl font-display font-semibold text-text-main group-hover/link:text-primary transition-colors">
          {name}
        </h3>
        <FiChevronRight className="w-4 h-4 text-text-muted opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
      </Link>

      {/* Description */}
      <p className="text-sm text-text-muted mt-2 flex-1 line-clamp-3 leading-relaxed relative z-10">
        {description}
      </p>

      {/* Meta Specs */}
      <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-text-muted relative z-10">
        <div className="flex items-center gap-1.5">
          <FiCpu className="text-primary w-3.5 h-3.5" />
          <span className="font-medium">{tool.language || 'N/A'}</span>
        </div>
        {github && stars !== null && (
          <div className="flex items-center gap-1.5 select-none" title="GitHub Stars">
            <FiStar className="text-yellow-400 w-3.5 h-3.5" />
            <span className="font-medium">{stars.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 flex items-center justify-between relative z-10">
        <div className="flex gap-1.5 flex-wrap flex-1 mr-2">
          {platform.map((p) => (
            <span key={p} className="text-[10px] font-mono text-text-muted border border-border bg-surface/50 px-1.5 py-0.5 rounded capitalize">
              {p}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              className="p-1.5 text-text-muted hover:text-text-main border border-border/50 bg-surface hover:bg-border rounded-md transition-all active:scale-95"
              aria-label="GitHub Repo">
              <FiGithub className="w-4 h-4" />
            </a>
          )}
          <a href={website} target="_blank" rel="noopener noreferrer"
            className="p-1.5 text-text-muted hover:text-primary border border-border/50 bg-surface hover:bg-border hover:border-primary/30 rounded-md transition-all active:scale-95"
            aria-label="Official Website">
            <FiExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ToolCard;
