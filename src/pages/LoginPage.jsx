import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiLock, FiMail, FiArrowLeft, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
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
      setError('Please fill in all details.');
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
      setError(err.response?.data?.error || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-text-main min-h-screen flex text-sm">
      
      {/* ── Left Side: Form ── */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:flex-none lg:w-1/2 xl:px-24">
        
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 font-medium text-text-muted hover:text-primary transition-colors">
          <FiArrowLeft /> Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-sm lg:w-96"
        >
          <div className="mb-8">
            <div className="flex items-center gap-2 group mb-6">
              <div className="relative flex items-center justify-center bg-surface p-2 rounded-xl border border-border">
                <FiShield className="text-primary w-6 h-6" />
              </div>
              <span className="font-display font-semibold text-xl tracking-tight text-text-main">
                Cyber<span className="text-primary font-bold">Search</span>
              </span>
            </div>
            <h2 className="text-3xl font-display font-semibold text-text-main">
              Welcome back
            </h2>
            <p className="text-text-muted mt-2">
              Log in to your account and explore the directory.
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 btn-secondary py-2.5">
              <FcGoogle className="w-5 h-5" /> Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 btn-secondary py-2.5">
              <FiGithub className="w-5 h-5" /> Continue with GitHub
            </button>
          </div>

          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs font-medium">
              <span className="bg-background px-4 text-text-muted">OR CONTINUE WITH</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Email address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="admin@example.com"
                  className="input-base pl-9 py-2.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-base pl-9 py-2.5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border bg-surface text-primary focus:ring-primary h-4 w-4" />
                <span className="text-text-muted text-sm">Remember me</span>
              </label>
              <a href="#" className="font-medium text-primary hover:text-primary-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-base">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : 'Log in'}
            </button>
          </form>

          <p className="mt-8 text-center text-text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-text-main hover:text-primary transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
      
      {/* ── Right Side: Illustration ── */}
      <div className="hidden lg:block lg:flex-1 relative border-l border-border/50 overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,229,255,0.06),transparent)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        {/* Animated Cyber Circles */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full flex items-center justify-center"
        >
          <div className="w-[450px] h-[450px] border border-primary/20 rounded-full border-dashed" />
          <div className="absolute w-[300px] h-[300px] border border-primary/30 rounded-full" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <div className="glass-panel p-8 max-w-md backdrop-blur-xl">
            <h3 className="font-display font-bold text-2xl text-text-main mb-3">Join the network</h3>
            <p className="text-text-muted leading-relaxed">
              CyberSearch helps security professionals discover, evaluate, and share top-tier security tools for defensive and offensive operations.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default LoginPage;
