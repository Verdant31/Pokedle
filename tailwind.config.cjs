/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xsm': '380px',
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
