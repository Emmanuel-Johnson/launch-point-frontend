import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { verifyEmail, resendVerificationOTP } from "../api/authApi";

const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (resendTimer === 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (error) {
      setError("");
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Automatically verify when all 6 digits are entered
    if (newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = ["", "", "", "", "", ""];

    pastedData.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(pastedData.length, 5);

    inputRefs.current[nextIndex]?.focus();

    // Automatically verify pasted 6-digit OTP
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (enteredOtp?: string) => {
    if (isVerifying) return;

    const code = enteredOtp ?? otp.join("");

    if (code.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (!email) {
      toast.error("Email information is missing.");
      return;
    }

    try {
      setIsVerifying(true);

      const result = await verifyEmail({
        email,
        otp: code,
      });

      setError("");

      // Store JWT tokens after successful email verification
      localStorage.setItem("access", result.tokens.access);
      localStorage.setItem("refresh", result.tokens.refresh);

      toast.success("Email verified successfully! Welcome to your dashboard.");

      navigate("/student/dashboard", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        const otpError = responseData?.otp?.[0];
        const emailError = responseData?.email?.[0];
        const detailError = responseData?.detail;

        const errorMessage =
          otpError ||
          emailError ||
          (typeof detailError === "string" ? detailError : null);

        if (errorMessage) {
          setError(errorMessage);
          return;
        }
      }

      setError("Unable to verify your email. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error("Email information is missing.");
      return;
    }

    try {
      setIsResending(true);

      const result = await resendVerificationOTP({
        email,
      });

      setOtp(["", "", "", "", "", ""]);
      setError("");
      setResendTimer(60);

      inputRefs.current[0]?.focus();

      toast.success(result.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        const emailError = responseData?.email?.[0];
        const detailError = responseData?.detail;
        const messageError = responseData?.message;

        const errorMessage =
          emailError ||
          (typeof detailError === "string" ? detailError : null) ||
          (typeof messageError === "string" ? messageError : null);

        if (errorMessage) {
          toast.error(errorMessage);
          return;
        }
      }

      toast.error("Unable to resend the code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
      <div className="signup-glow pointer-events-none absolute -left-32 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

      <div className="signup-glow pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="signup-fade-up relative z-10 w-full max-w-sm text-center">
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#6c63ff]/20 bg-[#6c63ff]/10">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className="text-[#8b83ff]"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <path d="m22 6-10 7L2 6" />
          </svg>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
          Verify Your Email
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
          Enter the Code
        </h1>

        <p className="mx-auto max-w-sm text-sm font-light leading-6 text-gray-500">
          We’ve sent a 6-digit verification code to
        </p>

        <p className="mt-2 text-sm font-medium text-gray-300">{email}</p>

        <div className="mt-8 flex justify-center gap-2.5">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isVerifying || isResending}
              className={`h-14 w-12 border ${
                error ? "border-red-400/60" : "border-white/10"
              } bg-white/3 text-center text-lg font-medium text-white outline-none transition-all duration-300 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10`}
            />
          ))}
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        <button
          type="button"
          onClick={() => handleVerify()}
          disabled={isVerifying || isResending}
          className="mt-7 flex w-full items-center justify-center rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isVerifying ? (
            <svg
              className="h-5 w-5 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-30"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            "Verify Email"
          )}
        </button>

        <p className="mt-6 text-sm font-light text-gray-500">
          Didn’t receive the code?{" "}
          {resendTimer > 0 ? (
            <span className="font-medium text-gray-500">
              Resend in {resendTimer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending || isVerifying}
              className="font-medium text-white transition-colors hover:text-[#8b83ff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend"}
            </button>
          )}
        </p>

        <p className="mt-3 text-sm font-light text-gray-600">
          Wrong email?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup", { replace: true })}
            disabled={isVerifying || isResending}
            className="font-medium text-gray-500 transition-colors hover:text-[#8b83ff] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Change email
          </button>
        </p>
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700">
        © {new Date().getFullYear()} Launch Point
      </p>
    </div>
  );
};

export default VerifyEmailPage;