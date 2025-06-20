import { create } from "zustand";

const THEME_KEY = "ispTheme";
const DARK_CLASS = "dark";
const bodyClass = document.body.classList;

// Get theme from localStorage or system preference
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
const storedTheme = localStorage.getItem(THEME_KEY) as Theme;
const initialTheme = storedTheme ?? (systemPrefersDark ? "dark" : "light");

const useThemeStore = create<ThemeStoreTypes>((set, get) => ({
  themeMode: initialTheme,
  setTheme: (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "dark") {
      bodyClass.add(DARK_CLASS);
    } else {
      bodyClass.remove(DARK_CLASS);
    }

    set({ themeMode: theme });
  },
  toggleTheme: () => {
    const newTheme = get().themeMode === "light" ? "dark" : "light";
    get().setTheme(newTheme);
  },
  setDarkTheme: () => get().setTheme("dark"),
  setLightTheme: () => get().setTheme("light"),
}));

export default useThemeStore;

interface ThemeStoreTypes {
  themeMode: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
}
type Theme = "dark" | "light";
