import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../utils/contexts/auth/AuthContext";
import { BiLock } from "react-icons/bi";
import PageContainer from "../../../components/pageContianer/PageContainer";
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Unable to sign in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <main className="flex min-h-screen w-full items-center justify-center bg-(--color-bg) px-4 py-12 text-(--color-text)">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-primary) text-(--color-secondary) shadow-lg shadow-(--color-primary)/20">
              <BiLock className="w-full h-full p-2" />
            </div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-(--color-secondary-hover)">
              Sign in to continue to your account.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-(--color-secondary-hover) bg-(--color-bg) p-6 shadow-xl shadow-black/5 sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-(--color-text)"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-(--color-secondary-hover) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-secondary-hover) focus:border-(--color-primary-hover) focus:ring-2 focus:ring-(--color-primary)"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-(--color-text)"
                  >
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-xs font-medium text-(--color-hyperlink) transition hover:text-(--color-hyperlink-hover)"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-(--color-secondary-hover) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-secondary-hover) focus:border-(--color-primary-hover) focus:ring-2 focus:ring-(--color-primary)"
                />
              </div>
            </div>
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 flex w-full items-center justify-center rounded-xl bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-secondary) shadow-sm transition hover:bg-(--color-primary-hover) hover:shadow-md focus:outline-none focus:ring-2 focus:ring-(--color-primary-hover) focus:ring-offset-2 focus:ring-offset-(--color-bg) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <p className="mt-6 text-center text-sm text-(--color-secondary-hover)">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-(--color-hyperlink) transition hover:text-(--color-hyperlink-hover)"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </main>
    </PageContainer>
  );
}
