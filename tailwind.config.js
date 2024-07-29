// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // This enables dark mode
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
      },
    },
  },
  plugins: [],
}
