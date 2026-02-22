/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#1c5f20",
        "primary-light": "#2e8a34",
        "primary-dark": "#134216",
        "accent": "#00FFC2",
        "background-light": "#f6f8f6",
        "background-dark": "#131f14",
        "surface-light": "#ffffff",
        "surface-dark": "#1a2c1c",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 255, 194, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
