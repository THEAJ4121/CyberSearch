import { Link } from 'react-router-dom';
import { FiAlertOctagon, FiArrowLeft } from 'react-icons/fi';

/**
 * NotFoundPage — Catch-all 404 router page.
 */
function NotFoundPage() {
  return (
    <div className="bg-cyber-black text-cyber-text min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Grid pattern background */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,0,128,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,0,128,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '45px 45px',
        }}
      />

      <div className="relative z-10 w-full max-w-md text-center">
        <div className="glass-card neon-border p-8 border-neon-pink">
          <div className="mb-6">
            <div className="inline-block p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-full animate-float">
              <FiAlertOctagon className="w-12 h-12 text-neon-pink" />
            </div>
          </div>
          <h1 className="font-orbitron font-black text-5xl text-white mb-2 tracking-widest">
            404
          </h1>
          <h2 className="font-orbitron font-bold text-sm text-neon-pink uppercase tracking-widest mb-4">
            CONNECTION TERMINATED
          </h2>
          <p className="text-cyber-muted font-rajdhani text-sm leading-relaxed mb-8">
            The target node or directory path does not exist. The console address is invalid or might
            have been offline.
          </p>
          <Link to="/" className="btn-ghost flex items-center justify-center gap-2 max-w-xs mx-auto border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-cyber-black">
            <FiArrowLeft /> Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
