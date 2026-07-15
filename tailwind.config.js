/** @type {import('tailwindcss').Config} */
export default {
  // content: tells Tailwind WHERE to look for class names.
  // If a file isn't listed here, Tailwind won't include its classes in the final CSS.
  // This is how Tailwind keeps the CSS bundle small — it only generates what you use.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enables dark mode via a 'dark' class on <html>
  theme: {
    extend: {
      // Our Cyberpunk color palette
      colors: {
        'cyber-black':  '#0a0a0f',
        'cyber-dark':   '#0d0d1a',
        'cyber-gray':   '#1a1a2e',
        'cyber-border': '#1e1e3a',
        'neon-blue':    '#00d4ff',
        'neon-green':   '#00ff88',
        'neon-purple':  '#bf00ff',
        'neon-pink':    '#ff0080',
        'cyber-text':   '#c8d6e5',
        'cyber-muted':  '#5a6a7a',
      },
      // Custom fonts — loaded via Google Fonts in index.html
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],  // headings — sci-fi feel
        'rajdhani': ['Rajdhani', 'sans-serif'], // body — readable + modern
        'mono':     ['JetBrains Mono', 'monospace'], // code
      },
      // Custom animations for the cyberpunk feel
      animation: {
        'glow-pulse':   'glowPulse 2s ease-in-out infinite',
        'scan-line':    'scanLine 3s linear infinite',
        'flicker':      'flicker 0.15s infinite',
        'float':        'float 3s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff' },
          '50%':      { boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.8 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      // Background gradients used throughout the UI
      backgroundImage: {
        'cyber-gradient':  'linear-gradient(135deg, #0a0a0f 0%, #0d0d1a 50%, #1a1a2e 100%)',
        'neon-gradient':   'linear-gradient(90deg, #00d4ff, #bf00ff)',
        'green-gradient':  'linear-gradient(90deg, #00ff88, #00d4ff)',
      },
      // Box shadow utilities for neon glows
      boxShadow: {
        'neon-blue':   '0 0 10px #00d4ff, 0 0 20px #00d4ff40',
        'neon-green':  '0 0 10px #00ff88, 0 0 20px #00ff8840',
        'neon-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff40',
      },
    },
  },
  plugins: [],
}


