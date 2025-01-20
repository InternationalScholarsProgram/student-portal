import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useThemeStore from "./styles/theme.store";
import { darkTheme, lightTheme } from "./styles/theme";
import Router from "./router/Router";

const queryClient = new QueryClient();

function AppWrapper() {
  document.title = "Student Portal";

  const { themeMode, setDarkTheme, setLightTheme } = useThemeStore(
    (state) => state
  );

  useEffect(() => {
    // To set dark mode for the first time for both tailwind and mui themes
    if (themeMode === "dark") setDarkTheme();
    if (themeMode === "light") setLightTheme();
  }, [themeMode, setDarkTheme, setLightTheme]);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={true}
        />
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppWrapper;
