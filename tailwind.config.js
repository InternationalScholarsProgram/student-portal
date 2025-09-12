/** @type {import('tailwindcss').Config} */

const { lightTheme, darkTheme, mainColors } = require("./src/styles/theme");

export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-dvh": "100dvh",
      },
      colors: {
        ...mainColors,
        dark: {
          ...darkTheme.palette,
        },
        light: {
          ...lightTheme.palette,
        },
      },
    },
  },
  plugins: [],
};
