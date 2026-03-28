import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLoginContext } from "../../utils/contexts/login-context/useLoginContext";
import {
  isValidDate,
  isValidEmail,
  isValidPassword,
  isNonEmptyString,
} from "../../utils/validators";

type Step = 1 | 2 | 3;

export default function Signup() {
  const context = useLoginContext();
  const [step, setStep] = useState<Step>(1);

  // Step 1
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Step 2
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120);

  // countdown
  useEffect(() => {
    if (step !== 2) return;
    if (timer <= 0) return;

    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  // -------------------------
  // STEP 1: REGISTER + SEND CODE
  // -------------------------
  const submitStep1 = async () => {
    if (loading) return;

    if (!isValidEmail(email)) return setError("Invalid email");
    if (!isNonEmptyString(fullName)) return setError("Full name required");
    if (!isValidDate(dob)) return setError("Invalid date of birth");
    if (!isValidPassword(password)) return setError("Weak password");
    if (password !== confirm) return setError("Passwords do not match");

    setError(null);
    setLoading(true);

    try {
      // 1. Register user
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, dob, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // 2. Send verification code
      const codeRes = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const codeData = await codeRes.json();
      if (!codeRes.ok) {
        setError(codeData.message || "Failed to send code");
        return;
      }

      setStep(2);
      setTimer(300);
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // STEP 2: VERIFY CODE
  // -------------------------
  const submitStep2 = async () => {
    if (!isNonEmptyString(code)) return setError("Verification code required");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Verification failed");
      }

      setStep(3);
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  // -------------------------
  // RESEND CODE
  // -------------------------
  const resendCode = async () => {
    try {
      setError(null);

      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return setError(data.message || "Failed to resend code");
      }

      setTimer(300);
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const finishSignup = () => {
    context.setShowLoginModal(false);
  };

  const prevToLogin = () => context.setLoginOrSignup("login");

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <motion.div className="relative w-full max-w-md bg-(--color-bg) p-8 rounded-2xl shadow-xl">
        <button
          onClick={() => context.setShowLoginModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-(--color-secondary)/10"
        >
          <X size={24} className="text-(--color-text) hover:cursor-pointer" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <AnimatePresence mode="wait">
          {/* STEP 1 */}
          {step === 1 && (
            <motion.div
              key="step1"
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <input
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                className="input"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <button
                onClick={submitStep1}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? "Creating account..." : "Continue"}
              </button>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <span
                  onClick={prevToLogin}
                  className="underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </motion.div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="text-center">
                Enter verification code sent to {email}
              </p>

              <input
                className="input text-center"
                placeholder="Verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />

              <p className="text-sm text-center text-(--color-text)/70">
                Time left: {Math.floor(timer / 60)}:
                {String(timer % 60).padStart(2, "0")}
              </p>

              <button
                disabled={timer > 0}
                onClick={resendCode}
                className="underline disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend Code
              </button>

              <button onClick={submitStep2} className="btn-primary">
                Verify
              </button>
            </motion.div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <motion.div
              key="step3"
              className="flex flex-col gap-4 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-center">Signup complete!</p>
              <button onClick={finishSignup} className="btn-primary">
                Finish
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
