import { useState } from "react";
import LoginContext from "./LoginContext";
import type { loginType } from "../../types/primary-types";

type Props = {
  children: React.ReactNode;
};

export default function LoginContextProvider({ children }: Props) {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginOrSignup, setLoginOrSignup] = useState<loginType>("login");
  const [user, setUser] = useState<string>("");

  return (
    <LoginContext.Provider
      value={{
        showLoginModal,
        setShowLoginModal,
        loginOrSignup,
        setLoginOrSignup,
        user,
        setUser,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
