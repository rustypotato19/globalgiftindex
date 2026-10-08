import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

import type { AuthContextValue, AuthResponse, User } from "../../types/types";
import { apiFetch, setAccessToken } from "../../../utils/api/api";

const AuthContext = createContext<AuthContextValue | null>(null);

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const [user, setUser] = useState<User | null>(null);

  async function loadMe() {
    const response = await apiFetch("/auth/me");

    if (!response.ok) {
      throw new Error("Unable to load user");
    }

    const data = await response.json();

    setUser(data.user);
    setStatus("authenticated");
  }

  async function login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data: AuthResponse = await response.json();

    setAccessToken(data.accessToken);
    setUser(data.user);
    setStatus("authenticated");
  }

  async function register(username: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Unable to create account");
    }

    await login(email, password);
  }

  async function logout() {
    try {
      await apiFetch("/auth/logout", {
        method: "POST",
      });
    } finally {
      setAccessToken(null);
      setUser(null);
      setStatus("unauthenticated");
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("No active session");
        }

        const data = await response.json();

        if (cancelled) return;

        setAccessToken(data.accessToken);

        await loadMe();
      } catch {
        if (!cancelled) {
          setAccessToken(null);
          setUser(null);
          setStatus("unauthenticated");
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const value: AuthContextValue = {
    status,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
