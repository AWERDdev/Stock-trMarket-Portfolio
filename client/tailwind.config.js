/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  screens: {
    'tablet': '640px',
    'laptop': '1024px',
    'desktop': '1280px',
  },
}

