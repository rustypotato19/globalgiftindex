import { useContext } from "react";
import LoginContext from "./LoginContext";

export const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (!context) throw new Error("Login Context is not initialized");
  return context;
};
