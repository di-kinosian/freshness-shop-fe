/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        linkGreen: "rgba(106, 152, 60, 1)",
        lightGrayBackground: "rgba(249, 249, 249, 1)",
      },
    },
  },
  plugins: [],
};
