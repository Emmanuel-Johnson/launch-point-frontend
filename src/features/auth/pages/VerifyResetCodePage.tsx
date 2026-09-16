import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { resendPasswordResetOTP, verifyPasswordResetOTP } from "../api/authApi";

const RESEND_COOLDOWN = 60;

type LocationState = {
  email?: string;
};

const VerifyResetCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = (location.state as LocationState) || {};

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  /*
   * ---------------------------------------------------------
   * Redirect if email is missing
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!email) {
      navigate("/forgot-password", { replace: true });
    }
  }, [email, navigate]);

  /*
   * ---------------------------------------------------------
   * Resend timer
   *
   * The timestamp is stored in localStorage.
   *
   * This means the timer does NOT restart when:
   *
   * - Browser Back is pressed
   * - Browser Forward is pressed
   * - The component remounts
   * - The page is refreshed
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!email) return;

    const storageKey = `password_reset_resend_available_at_${email}`;

    let expiryTime = Number(localStorage.getItem(storageKey));

    /*
     * If there is no existing expiry time, create one.
     *
     * This handles the first time the user reaches
     * the verification page after requesting an OTP.
     */
    if (!expiryTime || expiryTime <= Date.now()) {
      expiryTime = Date.now() + RESEND_COOLDOWN * 1000;

      localStorage.setItem(storageKey, expiryTime.toString());
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        Math.ceil((expiryTime - Date.now()) / 1000),
      );

      setResendTimer(remaining);

      /*
       * Remove the timestamp after cooldown finishes.
       */
      if (remaining === 0) {
        localStorage.removeItem(storageKey);
      }
    };

    /*
     * Update immediately.
     */
    updateTimer();

    /*
     * Update every second.
     */
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [email]);

  /*
   * ---------------------------------------------------------
   * OTP input change
   * ---------------------------------------------------------
   */
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (error) {
      setError("");
    }

    /*
     * Move to next input.
     */
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    /*
     * Automatically verify when all 6 digits are entered.
     */
    if (newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  /*
   * ---------------------------------------------------------
   * Backspace handling
   * ---------------------------------------------------------
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  /*
   * ---------------------------------------------------------
   * Paste OTP
   * ---------------------------------------------------------
   */
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

    /*
     * Automatically verify pasted 6-digit OTP.
     */
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  /*
   * ---------------------------------------------------------
   * Verify password reset OTP
   * ---------------------------------------------------------
   */
  const handleVerify = async (enteredOtp?: string) => {
    if (isVerifying || isResending) return;

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

      const response = await verifyPasswordResetOTP({
        email,
        otp: code,
      });

      setError("");

      /*
       * OTP has been successfully verified.
       *
       * Remove the resend timer because the user
       * is moving to the next step.
       */
      localStorage.removeItem(`password_reset_resend_available_at_${email}`);

      toast.success(response.message);

      /*
       * Pass the reset token to ResetPasswordPage.
       */
      navigate("/reset-password", {
        replace: true,
        state: {
          resetToken: response.reset_token,
        },
      });
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

      setError("Unable to verify the password reset code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Resend password reset OTP
   * ---------------------------------------------------------
   */
  const handleResend = async () => {
    if (!email) {
      toast.error("Email information is missing.");
      return;
    }

    /*
     * Prevent resend while cooldown is active.
     */
    if (resendTimer > 0) {
      return;
    }

    /*
     * Prevent multiple resend requests.
     */
    if (isResending || isVerifying) {
      return;
    }

    try {
      setIsResending(true);

      const response = await resendPasswordResetOTP({
        email,
      });

      /*
       * Clear old OTP.
       */
      setOtp(["", "", "", "", "", ""]);
      setError("");

      /*
       * Create a new 60-second cooldown.
       */
      const expiryTime = Date.now() + RESEND_COOLDOWN * 1000;

      localStorage.setItem(
        `password_reset_resend_available_at_${email}`,
        expiryTime.toString(),
      );

      /*
       * Update state because this happened
       * from the user's resend action.
       */
      setResendTimer(RESEND_COOLDOWN);

      /*
       * Focus first OTP input.
       */
      inputRefs.current[0]?.focus();

      toast.success(response.message);
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

  /*
   * ---------------------------------------------------------
   * Prevent rendering when email doesn't exist.
   * ---------------------------------------------------------
   */
  if (!email) {
    return null;
  }

  const isBusy = isVerifying || isResending;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
      {/* Ambient purple glow */}
      <div className="signup-glow pointer-events-none absolute -left-32 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

      <div className="signup-glow pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Content */}
      <div className="signup-fade-up relative z-10 w-full max-w-sm text-center">
        {/* Icon */}
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
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        </div>

        {/* Heading */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
          Account Recovery
        </p>

        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
          Enter the Code
        </h1>

        <p className="mx-auto max-w-sm text-sm font-light leading-6 text-gray-500">
          We’ve sent a 6-digit verification code to
        </p>

        {/* Email */}
        <p className="mt-2 break-all text-sm font-medium text-gray-300">
          {email}
        </p>

        {/* OTP */}
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
              disabled={isBusy}
              className={`h-14 w-12 border ${
                error ? "border-red-400/60" : "border-white/10"
              } bg-white/3 text-center text-lg font-medium text-white outline-none transition-all duration-300 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10 disabled:cursor-not-allowed disabled:opacity-60`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

        {/* Verify */}
        <button
          type="button"
          onClick={() => handleVerify()}
          disabled={isBusy}
          className="mt-7 flex w-full items-center justify-center rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
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
            "Verify Code"
          )}
        </button>

        {/* Resend */}
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
              disabled={isBusy}
              className="font-medium text-[#8b83ff] transition-colors hover:text-[#a39eff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          )}
        </p>

        {/* Change Email */}
        <p className="mt-3 text-sm font-light text-gray-600">
          Wrong email?{" "}
          {isBusy ? (
            <span className="cursor-not-allowed font-medium text-gray-700">
              Change email
            </span>
          ) : (
            <Link
              to="/forgot-password"
              className="font-medium text-gray-500 transition-colors hover:text-[#8b83ff]"
            >
              Change email
            </Link>
          )}
        </p>
      </div>

      {/* Footer */}
      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700">
        © {new Date().getFullYear()} Launch Point
      </p>
    </div>
  );
};

export default VerifyResetCodePage;
