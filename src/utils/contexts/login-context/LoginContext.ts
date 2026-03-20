import { createContext, useContext } from "react";
import type { loginType } from "../../types/primary-types";

export function useLogin() {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error("useTheme must be used inside LoginContextProvider");
  }

  return context;
}

export type LoginContextType = {
  showLoginModal: boolean;
  setShowLoginModal: (b: boolean) => void;

  loginOrSignup: loginType;
  setLoginOrSignup: (lt: loginType) => void;
};

const LoginContext = createContext<LoginContextType | null>(null);

export default LoginContext;
