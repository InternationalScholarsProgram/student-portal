import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useIsFetching } from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useThemeStore from "./styles/theme.store";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { darkTheme, lightTheme } from "./styles/theme";
import Router from "./router/Router";
import { FullLoader } from "./components/loaders/Loader";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BASE_URL } from "./services/api/base";
import "react-circular-progressbar/dist/styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

function AppWrapper() {
  const { themeMode, setDarkTheme, setLightTheme } = useThemeStore(
    (state) => state
  );

  useEffect(() => {
    if (themeMode === "dark") setDarkTheme();
    if (themeMode === "light") setLightTheme();

    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = `${BASE_URL}/login/includes/includes/assets/images/finkap-ico.png`;
    document.head.appendChild(link);
  }, [themeMode, setDarkTheme, setLightTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <ToastContainer
            position="top-right"
            // autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={true}
            transition={Bounce}
          />
          <ReactQueryDevtools />
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppWrapper;

function GlobalLoadingIndicator() {
  const isFetching = useIsFetching();
  return isFetching ? <FullLoader /> : null;
}
