/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      padding: {
        6.5: '1.625rem',
      },
      boxShadow: {
        xs: '0 0 0 1px',
      },
    },
  },
  plugins: [],
};
