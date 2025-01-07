const { light } = require("@mui/material/styles/createPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "Poppins"],
      },
      colors: {
        bage: "rgba(229, 112, 75, 1)",
        separator: "rgba(229, 231, 235)",
        neutralGreenBg: "rgba(106, 152, 60, 1)",
        lightGreen: "rgba(244, 248, 236, 1)",
        neutralGrayBg: "rgba(249, 249, 249, 1)",
        basicGray: "rgba(209, 209, 209, 1)",
        grayText: "rgba(169, 169, 169, 1)",
        grayBorder: "rgba(245, 245, 245, 1)",
        tagsGray: "rgba(245, 245, 245, 1)",
        errorText: "rgb(211,47,47)",
        link: "#3B82F6;",
      },
      screens: {
        custom: "886px",
        customSm: "690px",
        customMd: "930px",
        xs:'360px',
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
  },
  plugins: [],
};
