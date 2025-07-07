/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        udance: {
          primary: '#9b59b6',
          secondary: '#e91e63',
          accent: '#f1c40f',
          neutral: '#2c3e50',
          'base-100': '#ffffff',
        },
      },
    ],
  },
};
