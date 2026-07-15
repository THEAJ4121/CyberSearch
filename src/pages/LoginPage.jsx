import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiLock, FiMail, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all security field protocols.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = response.data;
      login(user, token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Database connection timeout.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cyber-black text-cyber-text min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Background scanlines grid */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-rajdhani text-cyber-muted hover:text-neon-blue mb-6 transition-colors">
          <FiArrowLeft /> Back to Home
        </Link>

        {/* Card */}
        <div className="glass-card neon-border p-8">
          <div className="text-center mb-8">
            <FiShield className="text-neon-blue w-10 h-10 mx-auto mb-3 animate-float" />
            <h2 className="font-orbitron font-black text-2xl text-white tracking-widest">
              SECURE <span className="text-neon-blue">LOGIN</span>
            </h2>
            <p className="text-cyber-muted font-rajdhani text-sm mt-1">
              Enter your credentials to access the console
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded bg-neon-pink/10 border border-neon-pink/35 text-neon-pink text-xs font-mono">
              ⚠️ AUTHENTICATION ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                Console Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@cybersearch.io"
                  className="search-input pl-10 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-2">
                Decrypt Key (Password)
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="search-input pl-10 py-2.5 text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                'INITIALIZE SESSION'
              )}
            </button>
          </form>

          {/* Redirect */}
          <div className="mt-6 text-center font-rajdhani text-sm text-cyber-muted pt-6 border-t border-cyber-border/40">
            Need credentials?{' '}
            <Link to="/register" className="text-neon-blue hover:underline font-semibold">
              Register Node
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
