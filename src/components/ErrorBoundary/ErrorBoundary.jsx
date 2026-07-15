import React from 'react';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';

/**
 * ErrorBoundary - Catch React render crashes and display a Cyberpunk recovery dashboard.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔥 RENDER CRASH ENCOUNTERED:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-cyber-black text-cyber-text min-h-screen flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,212,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <div className="relative z-10 w-full max-w-md text-center">
            <div className="glass-card neon-border p-8 border-neon-pink">
              <div className="mb-6">
                <div className="inline-block p-4 bg-neon-pink/5 border border-neon-pink/20 rounded-full animate-pulse">
                  <FiAlertTriangle className="w-12 h-12 text-neon-pink" />
                </div>
              </div>
              
              <h1 className="font-orbitron font-black text-3xl text-white mb-2 tracking-widest">
                CORE CRASH
              </h1>
              <h2 className="font-orbitron font-bold text-xs text-neon-pink uppercase tracking-widest mb-4">
                MEMORY EXCEPTION ERROR
              </h2>
              
              <p className="text-cyber-muted font-rajdhani text-sm leading-relaxed mb-6">
                A rendering interface crash occurred in this console node session. Details:
                <br />
                <span className="font-mono text-[10px] text-neon-pink/80 bg-cyber-black border border-cyber-border block p-2 rounded mt-2 text-left overflow-x-auto select-all">
                  {this.state.error?.message || 'Unknown react execution decay'}
                </span>
              </p>
              
              <button
                onClick={this.handleReset}
                className="btn-primary w-full py-2.5 flex items-center justify-center gap-2"
              >
                <FiRefreshCw /> RE-INITIALIZE CONSOLE
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
