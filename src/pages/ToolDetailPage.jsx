import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft, FiGithub, FiExternalLink, FiCpu,
  FiShield, FiHardDrive, FiCheckCircle
} from 'react-icons/fi';
import { getToolBySlug, getToolsByCategory } from '../constants/tools';

function ToolDetailPage() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="bg-cyber-black text-cyber-text min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-orbitron font-black text-white mb-4">TOOL NOT FOUND</h1>
        <p className="text-cyber-muted font-rajdhani mb-6">The requested tool slug does not exist in the directory.</p>
        <Link to="/search" className="btn-primary">Back to Directory</Link>
      </div>
    );
  }

  const relatedTools = getToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <div className="bg-cyber-black text-cyber-text min-h-screen pt-28 pb-20">
      <div className="section-container">
        {/* Back Link */}
        <Link to="/search" className="inline-flex items-center gap-2 text-sm font-rajdhani text-cyber-muted hover:text-neon-blue mb-8 transition-colors">
          <FiArrowLeft /> Back to Search Directory
        </Link>

        {/* --- Main 2-column Detail Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ── Left Column: Core Info & Details ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title / Description Card */}
            <div className="glass-card p-6 sm:p-8 border border-cyber-border">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <span className="cyber-badge mb-3">{tool.category}</span>
                  <h1 className="text-3xl sm:text-4xl font-orbitron font-black text-white mt-1">
                    {tool.name}
                  </h1>
                </div>
                <div className="flex gap-2">
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center justify-center p-3">
                      <FiGithub className="w-5 h-5" />
                    </a>
                  )}
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                    Website <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Long description */}
              <h3 className="font-orbitron font-bold text-sm text-neon-blue uppercase tracking-widest mb-3">
                Overview
              </h3>
              <p className="font-rajdhani text-base leading-relaxed text-cyber-text mb-6">
                {tool.longDescription || tool.description}
              </p>

              {/* Tags list */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-cyber-border/40">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-neon-blue/80 bg-cyber-gray border border-cyber-border hover:border-neon-blue px-2.5 py-1 rounded transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Features list */}
            {tool.features && tool.features.length > 0 && (
              <div className="glass-card p-6 sm:p-8 border border-cyber-border">
                <h3 className="font-orbitron font-bold text-sm text-neon-green uppercase tracking-widest mb-6 flex items-center gap-2">
                  <FiCheckCircle className="text-neon-green" />
                  KEY CAPABILITIES
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-rajdhani">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-cyber-text">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-green mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Installation guide wrapper */}
            {tool.installation && (
              <div className="glass-card p-6 sm:p-8 border border-cyber-border">
                <h3 className="font-orbitron font-bold text-sm text-neon-purple uppercase tracking-widest mb-6 flex items-center gap-2">
                  <FiHardDrive className="text-neon-purple" />
                  INSTALLATION GUIDE
                </h3>
                <div className="space-y-4">
                  {Object.entries(tool.installation).map(([platformName, cmd]) => (
                    <div key={platformName}>
                      <span className="text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted block mb-2">
                        {platformName}
                      </span>
                      <pre className="bg-cyber-black border border-cyber-border text-neon-blue font-mono text-xs sm:text-sm p-4 rounded-lg overflow-x-auto select-all">
                        <code>{cmd}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Right Column: Specs & Alternatives ── */}
          <div className="space-y-8">
            {/* Quick Specs card */}
            <div className="glass-card p-6 border border-cyber-border space-y-4">
              <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-widest pb-3 border-b border-cyber-border">
                SPECIFICATIONS
              </h3>
              <div className="grid grid-cols-2 gap-4 font-rajdhani text-sm">
                <div>
                  <span className="text-cyber-muted block text-xs uppercase">Platform OS</span>
                  <span className="font-semibold text-white mt-1 block">
                    {tool.platform.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-cyber-muted block text-xs uppercase">Languages</span>
                  <span className="font-semibold text-white mt-1 block">
                    {tool.language || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-cyber-muted block text-xs uppercase">License Mode</span>
                  <span className="font-semibold text-white mt-1 block">
                    {tool.license} ({tool.free ? 'Free' : 'Commercial'})
                  </span>
                </div>
                <div>
                  <span className="text-cyber-muted block text-xs uppercase">Complexity</span>
                  <span className="font-semibold text-white mt-1 block">
                    {tool.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Alternatives card */}
            {tool.alternatives && tool.alternatives.length > 0 && (
              <div className="glass-card p-6 border border-cyber-border space-y-4">
                <h3 className="font-orbitron font-bold text-sm text-white uppercase tracking-widest pb-3 border-b border-cyber-border">
                  POPULAR ALTERNATIVES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.alternatives.map((alt) => (
                    <span key={alt} className="font-rajdhani text-sm border border-cyber-border px-3 py-1.5 rounded bg-cyber-gray/30 text-cyber-text">
                      {alt}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Tools list card */}
            {relatedTools.length > 0 && (
              <div className="glass-card p-6 border border-cyber-border space-y-4">
                <h3 className="font-orbitron font-bold text-sm text-neon-blue uppercase tracking-widest pb-3 border-b border-cyber-border">
                  RELATED TOOLS
                </h3>
                <div className="space-y-4">
                  {relatedTools.map((rel) => (
                    <Link key={rel.slug} to={`/tools/${rel.slug}`} className="block group">
                      <h4 className="font-orbitron font-semibold text-sm text-white group-hover:text-neon-blue transition-colors">
                        {rel.name}
                      </h4>
                      <p className="font-rajdhani text-xs text-cyber-muted line-clamp-1 mt-1">
                        {rel.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolDetailPage;
