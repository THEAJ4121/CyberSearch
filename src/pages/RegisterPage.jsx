import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiLock, FiMail, FiUser, FiArrowLeft, FiActivity } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all protocol configurations.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Keys are not matching.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = response.data;
      register(user, token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration sequence interrupted.');
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
            <FiActivity className="text-neon-green w-10 h-10 mx-auto mb-3 animate-pulse" />
            <h2 className="font-orbitron font-black text-2xl text-white tracking-widest">
              REGISTER <span className="text-neon-green">NODE</span>
            </h2>
            <p className="text-cyber-muted font-rajdhani text-sm mt-1">
              Initialize a new node connection to directory
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded bg-neon-pink/10 border border-neon-pink/35 text-neon-pink text-xs font-mono">
              ⚠️ REGISTRATION ERROR: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-1.5">
                Node Alias (Username)
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="operator_1"
                  className="search-input pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-1.5">
                Console Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="operator@cybersearch.io"
                  className="search-input pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-1.5">
                Decrypt Key (Password)
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="search-input pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-rajdhani font-semibold uppercase tracking-wider text-cyber-muted mb-1.5">
                Confirm Decrypt Key
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-muted w-4 h-4" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••••••"
                  className="search-input pl-10 py-2 text-sm"
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin" />
                  CREATING NODE...
                </>
              ) : (
                'INITIALIZE NODE'
              )}
            </button>
          </form>

          {/* Redirect */}
          <div className="mt-6 text-center font-rajdhani text-sm text-cyber-muted pt-4 border-t border-cyber-border/40">
            Node registered?{' '}
            <Link to="/login" className="text-neon-green hover:underline font-semibold">
              Enter Console
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
