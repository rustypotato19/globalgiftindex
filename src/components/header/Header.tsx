import { useLocation } from "react-router";
import { useTheme } from "../../utils/contexts/theme-context/ThemeContext";
import { useMediaQuery } from "react-responsive";
import { useContext } from "react";
import LoginContext from "../../utils/contexts/login-context/LoginContext";
import MyError from "../../utils/error/Error";

export default function Header() {
  const { resolvedTheme } = useTheme();

  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  const context = useContext(LoginContext);
  if (!context) {
    return <MyError ErrorMessage="Context could not be initialised" />;
  }

  return (
    <div className="flex flex-row w-full h-fit bg-(--color-primary) py-4 justify-between items-center shadow-md">
      <div className="w-3/4 flex justify-start items-center">
        <img
          src={
            isMobile && resolvedTheme == "light"
              ? "/images/header/Logo-on-Yellow.png"
              : isMobile && resolvedTheme == "dark"
                ? "/images/header/Logo-on-Dark.png"
                : !isMobile && resolvedTheme == "light"
                  ? "/images/header/Title-Logo-on-Yellow.png"
                  : "/images/header/Title-Logo-on-Dark.png"
          }
          className="sm:ml-8 ml-4 sm:w-full max-w-1/3"
        />
      </div>

      {pathname === "/" && (
        <div className="flex flex-col items-end justify-center w-1/4 h-full gap-4">
          <button
            onClick={() => {
              context.setLoginOrSignup("login");
              context.setShowLoginModal(true);
            }}
            className="sm:w-40 w-30 bg-(--color-secondary) text-(--color-bg) text-xl font-semibold py-2 rounded-3xl border-2 border-(--color-secondary) mx-4 hover:bg-(--color-secondary-hover) transition-all duration-200 hover:cursor-pointer hover:scale-104"
          >
            Login
          </button>

          <button
            onClick={() => {
              context.setLoginOrSignup("signup");
              context.setShowLoginModal(true);
            }}
            className="sm:w-40 w-30 bg-(--color-primary) text-(--color-text) text-xl font-semibold py-2 rounded-3xl border-2 mx-4 hover:bg-(--color-primary-hover) transition-all duration-200 hover:cursor-pointer hover:scale-104 active:scale-97"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}
