import { create } from "zustand";

interface ThemeStoreTypes {
  themeMode: string;
  setTheme: (theme: string) => void;
  getTheme: () => string;
  toggleTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const themeKey = "ispTheme";
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
const systemTheme = isDarkMode === true ? "dark" : "light";
const localStorageTheme = window.localStorage.getItem(themeKey);
const classDark = "dark";
const bodyClass = window.document.body.classList;

export const theme = localStorageTheme || systemTheme;

const useThemeStore = create<ThemeStoreTypes>((set, get) => ({
  themeMode: theme,
  getTheme: () => get().themeMode,
  setTheme: (theme) => set({ themeMode: theme }),
  toggleTheme: () => {
    const colorMode = get().themeMode;

    if (colorMode === "light") {
      bodyClass.add(classDark);
      // bodyClass.remove("scrollbar-dark");
      // bodyClass.add("scrollbar-light");
      window.localStorage.setItem(themeKey, "dark");
      set({ themeMode: "dark" });
    } else {
      bodyClass.remove(classDark);
      // bodyClass.remove("scrollbar-light");
      // bodyClass.add("scrollbar-dark");
      window.localStorage.setItem(themeKey, "light");
      set({ themeMode: "light" });
    }
  },
  setDarkTheme: () => {
    bodyClass.add(classDark);
    // bodyClass.remove("scrollbar-light");
    // bodyClass.add("scrollbar-dark");

    window.localStorage.setItem(themeKey, "dark");
    set({ themeMode: "dark" });
  },
  setLightTheme: () => {
    bodyClass.remove(classDark);
    // bodyClass.remove("scrollbar-dark");
    // bodyClass.add("scrollbar-light");

    window.localStorage.setItem(themeKey, "light");
    set({ themeMode: "light" });
  },
}));

export default useThemeStore;
