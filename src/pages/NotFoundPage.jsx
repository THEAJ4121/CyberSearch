import { Link } from 'react-router-dom';
import { FiAlertOctagon, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

function NotFoundPage() {
  return (
    <div className="bg-background text-text-main min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,229,255,0.06),transparent)] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <div className="glass-panel p-10 border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex p-4 bg-red-500/10 border border-red-500/20 rounded-2xl animate-float">
              <FiAlertOctagon className="w-10 h-10 text-red-500" />
            </div>
          </div>
          <h1 className="font-display font-bold text-6xl text-text-main mb-2 tracking-tight">
            404
          </h1>
          <h2 className="font-semibold text-sm text-red-400 uppercase tracking-widest mb-4">
            Page Not Found
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-8">
            The page you are looking for doesn't exist or has been moved. Check the URL and try again.
          </p>
          <Link to="/" className="btn-secondary w-full flex items-center justify-center gap-2 text-base py-3">
            <FiArrowLeft /> Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFoundPage;
