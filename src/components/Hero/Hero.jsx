import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiShield, FiCode, FiEye, FiGlobe } from 'react-icons/fi';

const ROTATING_WORDS = [
  'Penetration Testing',
  'OSINT Tools',
  'Malware Analysis',
  'Network Security',
  'Reverse Engineering',
  'Vulnerability Scanners',
];

const STATS = [
  { value: '100+', label: 'Security Tools' },
  { value: '15',  label: 'Categories' },
  { value: '100%', label: 'Free to Search' },
  { value: '24/7',   label: 'Up to Date' },
];

const QUICK_CATEGORIES = [
  { label: 'Web Security',     icon: FiGlobe,  to: '/search?category=Web+Security' },
  { label: 'Network Security', icon: FiShield, to: '/search?category=Network+Security' },
  { label: 'OSINT',            icon: FiEye,    to: '/search?category=OSINT' },
  { label: 'Reverse Eng.',     icon: FiCode,   to: '/search?category=Reverse+Engineering' },
];

function Hero() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim() || '')}`);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">

      {/* ── Animated Background ── */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_40%,rgba(0,229,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-10 container-base text-center mt-12 mb-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider mb-8 shadow-glow-sm"
        >
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          The Modern Security Stack
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <h1 className="font-display font-semibold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-text-main">
            Discover tools for
          </h1>
          {/* Rotating word */}
          <div className="h-16 sm:h-20 lg:h-24 overflow-hidden mb-2 relative w-full flex justify-center">
            <AnimatePresence mode='wait'>
              <motion.h1
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 pb-2"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Your curated directory for cybersecurity tools, frameworks, OS distributions,
          and learning resources. Built for the modern security engineer.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 max-w-3xl mx-auto w-full group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex p-1.5 bg-surface/80 backdrop-blur-xl border border-border rounded-xl shadow-lg">
            <div className="relative flex-1 flex items-center">
              <FiSearch className="absolute left-4 text-text-muted w-5 h-5 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Nmap, SQLMap, Kali Linux..."
                className="w-full bg-transparent text-text-main text-lg placeholder-text-muted/70 pl-12 pr-4 py-3 outline-none"
              />
            </div>
            <button type="submit" className="btn-primary px-8 rounded-lg text-base shadow-glow-sm">
              Search
            </button>
          </div>

          {/* Quick search tags */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {['Nmap', 'Metasploit', 'Burp Suite', 'Wireshark'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/search?q=${tag}`)}
                className="text-xs font-medium text-text-muted hover:text-text-main bg-surface/50 border border-border/50 hover:border-border hover:bg-surface px-3 py-1.5 rounded-md transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.form>

        {/* Quick categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center mt-12"
        >
          {QUICK_CATEGORIES.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to}
              className="flex items-center gap-2 px-5 py-3 glass-panel group text-text-main hover:text-primary transition-all duration-300">
              <Icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              <span className="font-medium text-sm">{label}</span>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="relative z-10 w-full bg-surface/30 border-t border-border/50 backdrop-blur-md mt-auto py-8"
      >
        <div className="container-base grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border/50">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <div className="font-display font-bold text-3xl md:text-4xl text-text-main mb-1">{value}</div>
              <div className="font-medium text-text-muted text-sm uppercase tracking-wider">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
