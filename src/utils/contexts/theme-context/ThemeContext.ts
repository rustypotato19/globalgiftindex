import { createContext, useContext } from "react";

export type Theme = "light" | "dark" | "system";
export type Device = "small" | "medium" | "large";

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeContextProvider");
  }

  return context;
}

export type ThemeContextType = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  device: Device;
  setThemeGlobal: (newTheme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
