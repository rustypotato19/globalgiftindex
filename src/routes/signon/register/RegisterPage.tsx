import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../utils/contexts/auth/AuthContext";
import PageContainer from "../../../components/pageContianer/PageContainer";
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(username, email, password);
      navigate("/dashboard");
    } catch {
      setError("Unable to create account. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <PageContainer>
      <main className="flex min-h-screen w-full items-center justify-center bg-(--color-bg) px-4 py-12 text-(--color-text)">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-(--color-secondary-hover)">
              Get started in just a few steps.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-(--color-secondary-hover) bg-(--color-bg) p-6 shadow-2xl sm:p-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-(--color-text)"
                >
                  Username
                </label>
                <input
                  id="username"
                  required
                  minLength={3}
                  maxLength={32}
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-xl border border-(--color-secondary-hover) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-secondary-hover) focus:border-(--color-primary-hover) focus:ring-2 focus:ring-(--color-primary)"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-(--color-text)"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-(--color-secondary-hover) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-secondary-hover) focus:border-(--color-primary-hover) focus:ring-2 focus:ring-(--color-primary)"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-(--color-text)"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={12}
                  maxLength={128}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-(--color-secondary-hover) bg-(--color-bg) px-4 py-3 text-sm text-(--color-text) outline-none transition placeholder:text-(--color-secondary-hover) focus:border-(--color-primary-hover) focus:ring-2 focus:ring-(--color-primary)"
                />
                <p className="mt-2 text-xs text-(--color-secondary-hover)">
                  Use at least 12 characters.
                </p>
              </div>
            </div>
            {error && (
              <p
                role="alert"
                className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-7 w-full rounded-xl bg-(--color-primary) px-4 py-3 text-sm font-bold text-(--color-secondary) transition hover:bg-(--color-primary-hover) focus:outline-none focus:ring-2 focus:ring-(--color-primary-hover) disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
            <p className="mt-6 text-center text-sm text-(--color-secondary-hover)">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-medium text-(--color-hyperlink) hover:text-(--color-hyperlink-hover)"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </PageContainer>
  );
}
