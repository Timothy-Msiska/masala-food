/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        masala: {
          green: '#174d35',
          orange: '#f38f2b',
          yellow: '#f7b928',
          brown: '#8b4a20',
          dark: '#0f2e20',
        }
      }
    }
  },
  plugins: [],
}
