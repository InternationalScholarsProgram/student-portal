import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const mainColors = {
  primary: {
    main: "#2164a6",
    light: "#74a4d4",
  },
  secondary: {
    main: "#1a9970",
    light: "#3d997b",
  },
  error: {
    main: red.A400,
  },
};

const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "dark",
    ...mainColors,

    background: {
      default: "#1a222c",
      paper: "#24303f",
    },
  },
});

const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    ...mainColors,
    background: {
      paper: "#f6f6f6",
      default: "#ffffff",
    },
  },
});

export { darkTheme, lightTheme, mainColors };
