import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiShield, FiLock, FiMail, FiUser, FiArrowLeft, FiGithub, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
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

  // Simple password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 5) strength += 25;
    if (pass.length > 7) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    return strength;
  };
  const strength = getPasswordStrength(formData.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all details.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
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
    <div className="bg-background text-text-main min-h-screen flex text-sm">
      
      {/* ── Left Side: Form ── */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-12 lg:flex-none lg:w-1/2 xl:px-24 pb-12 pt-16 lg:pt-0 overflow-y-auto">
        
        <Link to="/" className="absolute top-8 left-8 inline-flex items-center gap-2 font-medium text-text-muted hover:text-primary transition-colors bg-background z-10">
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
              Create an account
            </h2>
            <p className="text-text-muted mt-2">
              Join the community and discover the best security tools.
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 btn-secondary py-2.5">
              <FcGoogle className="w-5 h-5" /> Sign up with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 btn-secondary py-2.5">
              <FiGithub className="w-5 h-5" /> Sign up with GitHub
            </button>
          </div>

          <div className="mt-8 mb-6 relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs font-medium">
              <span className="bg-background px-4 text-text-muted">OR CONTINUE WITH EMAIL</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-2 text-sm max-w-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="johndoe"
                  className="input-base pl-9 py-2.5"
                />
              </div>
            </div>

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
                  placeholder="john@example.com"
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
              {/* Password strength */}
              {formData.password.length > 0 && (
                <div className="mt-2 flex gap-1 h-1.5 w-full bg-surface rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strength > 0 ? (strength > 74 ? 'bg-green-400' : strength > 49 ? 'bg-yellow-400' : 'bg-red-400') : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full transition-all duration-300 ${strength > 25 ? (strength > 74 ? 'bg-green-400' : strength > 49 ? 'bg-yellow-400' : 'bg-red-400') : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full transition-all duration-300 ${strength > 50 ? (strength > 74 ? 'bg-green-400' : 'bg-yellow-400') : ''}`} style={{ width: '25%' }}></div>
                  <div className={`h-full transition-all duration-300 ${strength > 75 ? 'bg-green-400' : ''}`} style={{ width: '25%' }}></div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-main mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`input-base pl-9 py-2.5 ${formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword ? 'border-primary ring-1 ring-primary/20' : ''}`}
                />
                {formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword && (
                   <FiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-primary w-4 h-4" />
                )}
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2 text-base">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : 'Create account'}
            </button>
          </form>

          <p className="mt-8 text-center text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-text-main hover:text-primary transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── Right Side: Features ── */}
      <div className="hidden lg:block lg:flex-1 relative border-l border-border/50 bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(0,229,255,0.06),transparent)]" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-24 pb-8">
          <h3 className="font-display font-semibold text-2xl text-text-main xl:text-3xl max-w-md">
            The standard for modern security curation.
          </h3>
          <p className="text-text-muted mt-4 max-w-md text-base leading-relaxed">
            Create an account to track your favorite tools, contribute to the directory, and engage with the community.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-background border border-border rounded-lg mt-0.5">
                <FiShield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-text-main text-base">Curated Directory</h4>
                <p className="text-text-muted mt-1 max-w-sm">Every tool is manually reviewed and categorized by security experts.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="p-2 bg-background border border-border rounded-lg mt-0.5">
                <FiUser className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-text-main text-base">Community Driven</h4>
                <p className="text-text-muted mt-1 max-w-sm">Backed by thousands of researchers, penetration testers, and security engineers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RegisterPage;
