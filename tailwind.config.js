module.exports = {
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
