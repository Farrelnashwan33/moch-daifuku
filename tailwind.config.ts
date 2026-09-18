import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDFB',
          100: '#FFF7F2',
          200: '#FFF0E5',
          300: '#FDE4D4',
          400: '#FBD2BA',
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE6DF',
          200: '#FFCEBE',
          300: '#FFAC94',
          400: '#FF8C66',
          500: '#FF6B4A',
          600: '#F25230',
          700: '#CB3716',
        },
        choco: {
          100: '#EFEBE9',
          300: '#A1887F',
          500: '#795548',
          700: '#5D4037',
          800: '#4A2E2B',
          900: '#3D2723',
          950: '#261512',
        },
        dessert: {
          strawberry: '#FF6584',
          matcha: '#7BAE7F',
          mango: '#FFAA33',
          grape: '#9C7AD8',
          cookies: '#5C5470',
          cheese: '#F4B251',
          oreo: '#333333',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-outfit)', 'Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(74, 46, 43, 0.06)',
        'soft-lg': '0 14px 40px rgba(74, 46, 43, 0.10)',
        'soft-xl': '0 20px 50px rgba(74, 46, 43, 0.14)',
        'coral': '0 10px 25px -5px rgba(255, 107, 74, 0.35)',
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
