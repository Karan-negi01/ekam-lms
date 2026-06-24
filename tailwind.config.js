/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ekam: {
          bg: '#FDFAF4',
          surface: '#F5EFE4',
          card: '#FFFFFF',
          'card-hover': '#FFFEF8',
          gold: '#8C6210',
          'gold-light': '#B07C18',
          'gold-dim': '#D4A843',
          'gold-bright': '#E8C060',
          saffron: '#C44015',
          'saffron-light': '#E05830',
          cream: '#1C0E04',
          'cream-dim': '#3D2814',
          muted: '#7A6550',
          border: '#E2D5C4',
          'border-light': '#EDE4D8',
          red: '#B01818',
          'green-deep': '#1A5C38',
          teal: '#1A4A5A',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #D4A843 0%, #F0C96A 50%, #D4A843 100%)',
        'cultural-pattern': "url('/patterns/mandala-bg.svg')",
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 168, 67, 0.15)',
        'gold-strong': '0 0 40px rgba(212, 168, 67, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 168, 67, 0.1)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212, 168, 67, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(212, 168, 67, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
