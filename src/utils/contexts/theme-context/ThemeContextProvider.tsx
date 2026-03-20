import React, { useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";

import type { Theme, Device } from "./ThemeContext";

type Props = {
  children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: Props) {
  /* =========================
     Theme
  ========================== */

  const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "system";

    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "system";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.documentElement.dataset.theme = resolvedTheme;
    localStorage.setItem("theme", theme);
  }, [theme, resolvedTheme]);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const listener = () => {
      document.documentElement.dataset.theme = media.matches ? "dark" : "light";
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  const setThemeGlobal = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  /* =========================
     Device
  ========================== */

  const getDevice = (): Device => {
    if (typeof window === "undefined") return "large";

    const width = window.innerWidth;
    if (width >= 1000) return "large";
    if (width >= 760) return "medium";
    return "small";
  };

  const [device, setDevice] = useState<Device>(getDevice);

  useEffect(() => {
    const handleResize = () => setDevice(getDevice());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ========================= */

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        device,
        setThemeGlobal,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
