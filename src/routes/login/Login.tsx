import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLoginContext } from "../../utils/contexts/login-context/useLoginContext";
import { isValidEmail, isNonEmptyString } from "../../utils/validators";
import type { LoginResponse } from "../../utils/types/primary-types";

export default function Login() {
  const context = useLoginContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!isValidEmail(email)) {
      setError("Invalid email address");
      return;
    }
    if (!isNonEmptyString(password)) {
      setError("Password cannot be empty");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data: LoginResponse | null = null;
      try {
        data = await res.json();
      } catch (err) {
        console.warn("Response was not JSON", err);
      }

      if (!res.ok) {
        setError(data?.message || "Login failed");
        return;
      }

      if (!data?.user?.id) {
        setError("User ID undefined");
        return;
      }

      context.setUser(data?.user?.id);
      context.setShowLoginModal(false);
    } catch (err) {
      console.error(err);
      setError("Unable to reach server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => context.setShowLoginModal(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative flex flex-col w-full max-w-md bg-(--color-bg) p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <button
          onClick={() => context.setShowLoginModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-(--color-secondary)/10"
        >
          <X size={24} className="text-(--color-text)" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <form className="flex flex-col gap-4" onSubmit={submitLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => context.setLoginOrSignup("signup")}
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
