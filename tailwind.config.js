const { light } = require("@mui/material/styles/createPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        linkGreen: "rgba(106, 152, 60, 1)",
        lightGrayBackground: "rgba(249, 249, 249, 1)",
        borderInput: "rgba(209, 209, 209, 1)",
        errorText: "rgb(211,47,47)",
        link: "#3B82F6;",
      },
    },
  },
  plugins: [],
};
