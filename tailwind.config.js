/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#0f1124',
          900: '#1e1b4b',
          800: '#2e1065',
          700: '#3730a3',
          600: '#4f46e5',
          100: '#e0e7ff',
          50: '#eef2ff',
        },
        marigold: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        lilac: {
          bg: '#f7f5fd',
          subtle: '#f0ecfa',
          border: '#e4ddf6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Tamil', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Noto Sans Tamil', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'arch': '28px 28px 8px 8px',
        'arch-lg': '40px 40px 12px 12px',
        'pill': '9999px',
        'card': '22px',
      },
      boxShadow: {
        'soft': '0 8px 25px -4px rgba(30, 27, 75, 0.06), 0 4px 10px -2px rgba(30, 27, 75, 0.03)',
        'lift': '0 16px 36px -6px rgba(30, 27, 75, 0.12), 0 6px 14px -3px rgba(30, 27, 75, 0.05)',
      }
    },
  },
  plugins: [],
}
