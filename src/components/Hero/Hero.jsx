import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiShield, FiCode, FiEye, FiGlobe } from 'react-icons/fi';

// Rotating words for the animated heading
const ROTATING_WORDS = [
  'Penetration Testing',
  'OSINT Tools',
  'Malware Analysis',
  'Network Security',
  'Reverse Engineering',
  'Vulnerability Scanners',
];

// Stats shown at the bottom of the hero
const STATS = [
  { value: '25+', label: 'Security Tools' },
  { value: '12',  label: 'Categories' },
  { value: '100%', label: 'Free to Search' },
  { value: '∞',   label: 'Knowledge' },
];

// Quick category shortcuts on hero
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

  // Rotate the heading word every 2.5 seconds
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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">

      {/* ── Animated grid background ── */}
      <div className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Radial purple glow in center */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(191,0,255,0.08),transparent)]" />

      {/* Top-left neon orb */}
      <div className="absolute top-40 left-10 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl z-0" />
      {/* Bottom-right neon orb */}
      <div className="absolute bottom-40 right-10 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl z-0" />

      {/* ── Content ── */}
      <div className="relative z-10 section-container text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue text-xs font-rajdhani font-semibold uppercase tracking-widest mb-6"
        >
          <span className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse" />
          The Cybersecurity Search Platform
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-7xl leading-tight mb-2">
            <span className="text-white">DISCOVER</span>
          </h1>
          {/* Rotating word */}
          <div className="h-14 sm:h-16 lg:h-20 overflow-hidden mb-2">
            <motion.h1
              key={wordIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="font-orbitron font-black text-4xl sm:text-5xl lg:text-7xl neon-text"
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.h1>
          </div>
          <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-7xl text-white">
            &amp; MORE
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-cyber-muted font-rajdhani text-lg sm:text-xl max-w-2xl mx-auto"
        >
          Your one-stop directory for cybersecurity tools, frameworks, OS distributions,
          and learning resources — all in one place.
        </motion.p>

        {/* Search bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-cyber-muted w-5 h-5 z-10" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Nmap, SQLMap, Kali Linux, Shodan..."
                className="search-input pl-12 py-4 text-base"
              />
            </div>
            <button type="submit" className="btn-primary flex items-center gap-2 whitespace-nowrap">
              Search <FiArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick search tags */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {['Nmap', 'Metasploit', 'Burp Suite', 'Wireshark', 'Ghidra'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/search?q=${tag}`)}
                className="text-xs font-rajdhani text-cyber-muted hover:text-neon-blue border border-cyber-border hover:border-neon-blue/50 px-3 py-1 rounded-full transition-all duration-200"
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
          className="flex flex-wrap gap-3 justify-center mt-8"
        >
          {QUICK_CATEGORIES.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to}
              className="flex items-center gap-2 px-4 py-2 glass-card neon-border text-cyber-text hover:text-neon-blue font-rajdhani font-semibold text-sm transition-all duration-300">
              <Icon className="w-4 h-4 text-neon-blue" />
              {label}
            </Link>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto mt-16"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-orbitron font-black text-3xl neon-text-green">{value}</div>
              <div className="font-rajdhani text-cyber-muted text-sm mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cyber-black to-transparent z-10" />
    </section>
  );
}

export default Hero;
