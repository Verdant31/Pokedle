/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xsm': '424px',
        'halfmd': '500px',
      }
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
