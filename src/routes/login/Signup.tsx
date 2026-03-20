import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BadgeInfo, CircleUser } from "lucide-react";
import LoginContext from "../../utils/contexts/login-context/LoginContext";
import MyError from "../../utils/error/Error";

type Step = 1 | 2 | 3;

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function Signup() {
  const context = useContext(LoginContext);

  const [step, setStep] = useState<Step>(1);

  // Step 1 state
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // Step 2 state
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(299);

  // Timer countdown
  useEffect(() => {
    if (step !== 2) return;

    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  function nextStep() {
    setStep((s) => (s + 1) as Step);
  }

  function prevToLogin() {
    context?.setLoginOrSignup("login");
  }

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
        onClick={() => context.setShowLoginModal(false)}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-full mx-6 sm:mx-0 sm:max-w-xl h-fit min-h-150 bg-(--color-bg) border-6 border-(--color-secondary)/70 rounded-4xl shadow-2xl p-10 flex flex-col"
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {/* Close */}
        <button
          onClick={() => context.setShowLoginModal(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-(--color-secondary)/5 transition"
        >
          <X
            size={32}
            className="text-(--color-text)/70 hover:cursor-pointer"
          />
        </button>

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-6">Sign Up</h1>

        <AnimatePresence mode="wait">
          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex flex-col gap-6 flex-1"
            >
              <div className="w-full flex items-center justify-between">
                <p className="text-sm text-(--color-text)/60">
                  <span className="font-bold text-red-700">*</span> required
                  field{" "}
                </p>
                <button className="text-sm text-(--color-text)/60 flex items-center justify-center gap-2">
                  <p>
                    <BadgeInfo size={20} />
                  </p>
                  <p className="max-w-40 text-left text-xs">
                    Click here to find out why we ask for certain information
                  </p>
                </button>
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <label className="ml-2">
                  Email <span className="font-bold text-red-700">*</span>
                </label>
                <input
                  placeholder="janedoe@email.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1">
                <label className="ml-2">
                  Full Name <span className="font-bold text-red-700">*</span>
                </label>
                <input
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1">
                <label className="ml-2">
                  Date of Birth{" "}
                  <span className="font-bold text-red-700">*</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="input hover:cursor-pointer"
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1">
                <label className="ml-2">
                  Create Password{" "}
                  <span className="font-bold text-red-700">*</span>
                </label>
                <input
                  type="password"
                  placeholder="SuperSecurePassword123"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>

              <div className="flex flex-col items-start justify-center gap-1">
                <label className="ml-2">
                  Confirm Password{" "}
                  <span className="font-bold text-red-700">*</span>
                </label>
                <input
                  type="password"
                  placeholder="SuperSecurePassword123"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input"
                />
              </div>

              <button onClick={nextStep} className="btn-primary mt-4">
                Sign Up
              </button>

              <p className="text-sm text-center font-bold">
                Already a member?{" "}
                <span
                  onClick={prevToLogin}
                  className="underline cursor-pointer text-(--color-hyperlink) hover:text-(--color-hyperlink-hover)"
                >
                  Login
                </span>
              </p>
            </motion.div>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex flex-col gap-6 flex-1"
            >
              <h2 className="text-2xl font-semibold text-center">
                Verify Email
              </h2>

              <input
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="input text-center text-xl tracking-widest"
              />

              <p className="text-sm text-center text-(--color-text)/70">
                We have sent a verification code to <b>{email}</b>.
              </p>

              <p className="text-xs text-center text-(--color-text)/60">
                The code may take up to 5 minutes to arrive, if you don't
                receive it in this time, make sure you typed in your email
                correctly, otherwise click below to request a new code.
              </p>

              <button
                disabled={timer > 0}
                onClick={() => setTimer(59)}
                className="text-sm underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed hover:cursor-pointer"
              >
                Request New Code: {formatTime(timer)}
              </button>

              <button onClick={nextStep} className="btn-primary">
                Continue
              </button>
            </motion.div>
          )}

          {/* ================= STEP 3 ================= */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="flex flex-col items-center justify-center gap-6 flex-1"
            >
              <div className="w-32 h-32 rounded-full bg-(--color-secondary)/20 flex items-center justify-center">
                <CircleUser size={125} strokeWidth={1.3} />
              </div>

              <button className="underline">
                Upload a new profile picture
              </button>

              <p className="text-sm text-(--color-text)/60">
                (you can do this later)
              </p>

              <div className="flex flex-col gap-1 w-50">
                <button
                  onClick={() => context.setShowLoginModal(false)}
                  className="italic hover:cursor-pointer hover:underline"
                >
                  Skip
                </button>

                <button
                  onClick={() => context.setShowLoginModal(false)}
                  className="btn-primary"
                >
                  Finish
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
