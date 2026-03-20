import { X } from "lucide-react";
import { useContext, useEffect } from "react";
import LoginContext from "../../utils/contexts/login-context/LoginContext";
import MyError from "../../utils/error/Error";
import { motion } from "framer-motion";

export default function Login() {
  const context = useContext(LoginContext);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") context?.setShowLoginModal(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [context]);

  if (!context) {
    return <MyError ErrorMessage="Context could not be initialised" />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="absolute inset-0"
        onClick={() => context.setShowLoginModal(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative flex flex-col justify-between w-full max-w-xl h-[70vh] min-h-125 bg-(--color-bg) border-6 border-(--color-secondary)/70 shadow-2xl rounded-4xl p-10"
      >
        {/* Close button */}
        <button
          onClick={() => context.setShowLoginModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-(--color-secondary)/5 transition group hover:scale-110 active:scale-95"
        >
          <X
            size={36}
            className="text-(--color-text)/70 hover:cursor-pointer"
          />
        </button>

        {/* Title */}
        <h1 className="text-6xl font-extrabold text-(--color-text) text-center tracking-tight">
          Login
        </h1>

        {/* Form */}
        <form className="flex flex-col gap-6 w-full max-w-md mx-auto">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text)/80">
              Email
            </label>
            <input
              type="email"
              placeholder="janedoe@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-(--color-secondary)/40 bg-transparent text-(--color-text) placeholder:text-(--color-text)/40 focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-(--color-text)/80">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl border border-(--color-secondary)/40 bg-transparent text-(--color-text) placeholder:text-(--color-text)/40 focus:outline-none focus:ring-2 focus:ring-(--color-secondary)"
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="text-center text-sm text-(--color-text)/60 font-bold">
          Don't have an account?{" "}
          <button
            onClick={() => {
              context.setLoginOrSignup("signup");
            }}
            className="text-(--color-hyperlink) hover:text-(--color-hyperlink-hover) cursor-pointer hover:underline"
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
}
