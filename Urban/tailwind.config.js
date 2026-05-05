/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.tsx"],
  theme: {
    extend: {
      fontFamily: {
        'abraham-outline': ['Abraham Outline', 'sans-serif'],
        'fat-wandals': ['Fat Wandals', 'cursive'],
        'mostwasted': ['Mostwasted', 'cursive'],
        'next-ups': ['Next Ups', 'sans-serif'],
        'vanchrome-outline': ['Vanchrome Outline', 'sans-serif'],
      },
      colors: {
        'primary': '#3400f1',
        'secondary': '#9d00ff',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
