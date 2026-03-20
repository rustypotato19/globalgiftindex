// src/pages/Landing.tsx
import Header from "../../components/header/Header";
import { useTheme } from "../../utils/contexts/theme-context/ThemeContext";
import LoginSignup from "../../routes/login/LoginSignup";
import { useContext } from "react";
import LoginContext from "../../utils/contexts/login-context/LoginContext";
import MyError from "../../utils/error/Error";
import { AnimatePresence } from "framer-motion";

export default function Landing() {
  const { theme, resolvedTheme, setThemeGlobal } = useTheme();

  const context = useContext(LoginContext);
  if (!context) {
    return <MyError ErrorMessage="Context could not be initialised" />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Header />

      <AnimatePresence mode="wait">
        {context.showLoginModal && (
          <LoginSignup loginType={context.loginOrSignup ?? "login"} />
        )}
      </AnimatePresence>

      {/* Theme Debug Section */}
      <div className="absolute bottom-0 left-0 p-4 rounded-lg border border-(--color-text) text-sm z-50">
        <p>Selected theme: {theme}</p>
        <p>Resolved theme: {resolvedTheme}</p>

        <div className="flex gap-2 mt-3 justify-center">
          <button onClick={() => setThemeGlobal("light")} className="underline">
            Light
          </button>
          <button onClick={() => setThemeGlobal("dark")} className="underline">
            Dark
          </button>
          <button
            onClick={() => setThemeGlobal("system")}
            className="underline"
          >
            System
          </button>
        </div>
      </div>
    </div>
  );
}
