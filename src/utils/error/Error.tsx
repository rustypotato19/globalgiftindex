type Props = {
  ErrorCode?: number;
  ErrorMessage?: string;
};

export default function MyError({ ErrorCode, ErrorMessage }: Props) {
  const code = ErrorCode ?? 500;
  const msg = ErrorMessage ?? "Something went wrong.";

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-(--color-bg)">
      <div className="max-w-md w-full mx-4 p-8 rounded-2xl bg-(--color-bg) border border-(--color-secondary)/20 shadow-2xl flex flex-col items-center gap-4 transition-all duration-300">
        {/* Big error code */}
        <h1 className="text-6xl font-extrabold text-(--color-secondary) tracking-tight">
          {code}
        </h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-(--color-text)">
          Oops, something went wrong
        </h2>

        {/* Message */}
        <p className="text-sm text-center text-(--color-text)/70 max-w-sm">
          {msg}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-(--color-secondary)/20 my-2" />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-(--color-secondary) text-(--color-text-alt) font-medium hover:bg-(--color-secondary-hover) transition hover:scale-105"
          >
            Refresh
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 rounded-lg border border-(--color-secondary)/40 text-(--color-text) hover:bg-(--color-secondary)/10 transition hover:scale-105"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
