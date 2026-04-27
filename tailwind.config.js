/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#EFECE6',
        'bg-secondary': '#E0DAD0',
        'bg-dark': '#111110',
        'text-main': '#1A1917',
        'text-muted': '#6B6560',
        'accent': '#C8BFB2',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'image-fade': 'imageFade 1.2s ease-out forwards',
      },
      keyframes: {
        imageFade: {
          '0%': { opacity: '0', transform: 'scale(1.1)' },
          '100%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
