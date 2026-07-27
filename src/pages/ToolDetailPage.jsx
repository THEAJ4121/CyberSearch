import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft, FiGithub, FiExternalLink,
  FiHardDrive, FiCheckCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { getToolBySlug, getToolsByCategory } from '../constants/tools';

function ToolDetailPage() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) {
    return (
      <div className="bg-background text-text-main min-h-screen pt-28 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-display font-semibold text-text-main mb-4">Tool Not Found</h1>
        <p className="text-text-muted mb-6">The requested tool could not be found in the directory.</p>
        <Link to="/search" className="btn-primary">Back to Directory</Link>
      </div>
    );
  }

  const relatedTools = getToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 3);

  return (
    <div className="bg-background text-text-main min-h-screen pt-24 pb-20 relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container-base relative z-10">
        {/* Back Link */}
        <Link to="/search" className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary mb-8 transition-colors">
          <FiArrowLeft /> Back to Search Directory
        </Link>

        {/* --- Main 2-column Detail Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ── Left Column: Core Info & Details ── */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title / Description Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-md bg-surface border border-border text-primary mb-4 shadow-sm">
                    {tool.category}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-text-main tracking-tight">
                    {tool.name}
                  </h1>
                </div>
                <div className="flex gap-3">
                  {tool.github && (
                    <a href={tool.github} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center justify-center px-3">
                      <FiGithub className="w-5 h-5" />
                    </a>
                  )}
                  <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 shadow-glow-sm">
                    Website <FiExternalLink />
                  </a>
                </div>
              </div>

              {/* Long description */}
              <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-3">
                Overview
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-text-muted mb-8">
                {tool.longDescription || tool.description}
              </p>

              {/* Tags list */}
              <div className="flex flex-wrap gap-2 pt-6 border-t border-border/50">
                {tool.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-text-muted bg-surface border border-border px-3 py-1.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Features list */}
            {tool.features && tool.features.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-6 sm:p-8"
              >
                <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-6 flex items-center gap-2">
                  <FiCheckCircle className="text-green-400 w-5 h-5" />
                  Key Capabilities
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm md:text-base text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Installation guide wrapper */}
            {tool.installation && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6 sm:p-8 border-primary/20"
              >
                <h3 className="text-sm font-semibold text-text-main uppercase tracking-wider mb-6 flex items-center gap-2">
                  <FiHardDrive className="text-blue-400 w-5 h-5" />
                  Installation Guide
                </h3>
                <div className="space-y-6">
                  {Object.entries(tool.installation).map(([platformName, cmd]) => (
                    <div key={platformName}>
                      <span className="text-xs font-semibold uppercase tracking-wider text-text-muted block mb-2">
                        {platformName}
                      </span>
                      <pre className="bg-background/80 border border-border text-text-main font-mono text-sm p-4 rounded-xl overflow-x-auto select-all shadow-inner">
                        <code>{cmd}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* ── Right Column: Specs & Alternatives ── */}
          <div className="space-y-6">
            
            {/* Quick Specs card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-6"
            >
              <h3 className="font-semibold text-sm text-text-main uppercase tracking-wider pb-4 border-b border-border/50 mb-4">
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                <div>
                  <span className="text-text-muted block text-xs uppercase font-medium">Platform OS</span>
                  <span className="font-medium text-text-main mt-1 block">
                    {tool.platform.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-xs uppercase font-medium">Languages</span>
                  <span className="font-medium text-text-main mt-1 block">
                    {tool.language || 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-xs uppercase font-medium">License Mode</span>
                  <span className="font-medium text-text-main mt-1 block">
                    {tool.license} ({tool.free ? 'Free' : 'Commercial'})
                  </span>
                </div>
                <div>
                  <span className="text-text-muted block text-xs uppercase font-medium">Complexity</span>
                  <span className="font-medium text-text-main mt-1 block">
                    {tool.difficulty}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Alternatives card */}
            {tool.alternatives && tool.alternatives.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-sm text-text-main uppercase tracking-wider pb-4 border-b border-border/50 mb-4">
                  Popular Alternatives
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.alternatives.map((alt) => (
                    <span key={alt} className="text-sm font-medium border border-border px-3 py-1.5 rounded-lg bg-surface text-text-muted">
                      {alt}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Related Tools list card */}
            {relatedTools.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-panel p-6"
              >
                <h3 className="font-semibold text-sm text-text-main uppercase tracking-wider pb-4 border-b border-border/50 mb-4">
                  Related Tools
                </h3>
                <div className="space-y-4">
                  {relatedTools.map((rel) => (
                    <Link key={rel.slug} to={`/tools/${rel.slug}`} className="block group p-3 -mx-3 rounded-xl hover:bg-surface transition-colors cursor-pointer border border-transparent hover:border-border/50">
                      <h4 className="font-semibold text-sm text-text-main group-hover:text-primary transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-text-muted line-clamp-2 mt-1.5 leading-relaxed">
                        {rel.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolDetailPage;
