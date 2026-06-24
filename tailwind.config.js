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
          bg: '#080604',
          surface: '#120E08',
          card: '#1C1510',
          'card-hover': '#241D14',
          gold: '#D4A843',
          'gold-light': '#F0C96A',
          'gold-dim': '#8B6E2A',
          saffron: '#E8622A',
          'saffron-light': '#FF8C5A',
          cream: '#F5ECD7',
          'cream-dim': '#C4B49A',
          muted: '#7A6B52',
          border: '#2E2215',
          'border-light': '#3D2E1C',
          red: '#8B2020',
          'green-deep': '#1A4A2E',
          teal: '#1A3D4A',
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
