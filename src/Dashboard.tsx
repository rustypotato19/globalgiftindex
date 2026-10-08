import { useAuth } from "./utils/contexts/auth/AuthContext";
import { apiFetch } from "./utils/api/api";

export default function Dashboard() {
  const { user, logout } = useAuth();

  async function testProtectedRoute() {
    const response = await apiFetch("/api/private");

    const data = await response.json();

    alert(JSON.stringify(data, null, 2));
  }

  return (
    <main className="min-h-screen bg-(--color-bg) text-(--color-text)">
      <header className="border-b border-(--color-secondary-hover) bg-(--color-bg)">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold">My App</span>

          <button
            onClick={logout}
            className="rounded-lg border border-(--color-secondary) px-4 py-2 text-sm font-medium text-(--color-secondary) transition hover:border-(--color-primary-hover) hover:bg-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary-hover)"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold text-(--color-secondary)">
            Your workspace
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome, {user?.username}
          </h1>

          <p className="mt-2 text-(--color-secondary-hover)">
            You are signed in.
          </p>
        </div>

        <section className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-(--color-secondary-hover) bg-(--color-bg) p-6 shadow-sm">
            <h2 className="font-semibold">Account details</h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div>
                <dt className="text-(--color-secondary-hover)">Username</dt>
                <dd className="mt-1 font-medium text-(--color-text)">
                  {user?.username}
                </dd>
              </div>

              <div>
                <dt className="text-(--color-secondary-hover)">Email</dt>
                <dd className="mt-1 font-medium text-(--color-text)">
                  {user?.email}
                </dd>
              </div>

              <div>
                <dt className="text-(--color-secondary-hover)">User ID</dt>
                <dd className="mt-1 font-mono text-(--color-text)">
                  {user?.uid}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-(--color-secondary-hover) bg-(--color-bg) p-6 shadow-sm">
            <h2 className="font-semibold">Authentication</h2>

            <p className="mt-3 text-sm leading-6 text-(--color-secondary-hover)">
              Your access token is held in memory. Your refresh token is stored
              in a browser-managed HttpOnly cookie.
            </p>

            <button
              onClick={testProtectedRoute}
              className="mt-5 rounded-xl bg-(--color-primary) px-4 py-3 text-sm font-semibold text-(--color-secondary) transition hover:bg-(--color-primary-hover) focus:outline-none focus:ring-2 focus:ring-(--color-primary-hover)"
            >
              Test protected API
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
