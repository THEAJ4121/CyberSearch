/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#06080F', // deep dark blue-black
        surface: '#0F131F', // slightly lighter surface
        'surface-hover': '#161B2B',
        border: '#1A2133',
        'border-hover': '#242D45',
        primary: '#00E5FF', // bright cyan
        'primary-hover': '#33EBFF',
        secondary: '#5A6A7A', // muted secondary
        text: {
          main: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 15px rgba(0, 229, 255, 0.4)' },
          '50%': { opacity: 0.7, boxShadow: '0 0 5px rgba(0, 229, 255, 0.1)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 229, 255, 0.15)',
        'glow-md': '0 0 20px rgba(0, 229, 255, 0.25)',
        'glow-lg': '0 0 30px rgba(0, 229, 255, 0.4)',
      },
    },
  },
  plugins: [],
}


