import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const VerifyResetCodePage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
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

        {/* Dummy Email */}
        <p className="mt-2 text-sm font-medium text-gray-300">
          emma•••@gmail.com
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
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="h-14 w-12 border border-white/10 bg-white/3 text-center text-lg font-medium text-white outline-none transition-all duration-300 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
            />
          ))}
        </div>

        {/* Verify */}
        <button
          type="button"
          className="mt-7 w-full rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99]"
        >
          Verify Code
        </button>

        {/* Resend */}
        <p className="mt-6 text-sm font-light text-gray-500">
          Didn’t receive the code?{" "}
          <span className="font-medium text-gray-500">Resend in 30s</span>
        </p>

        {/* Change Email */}
        <p className="mt-3 text-sm font-light text-gray-600">
          Wrong email?{" "}
          <Link
            to="/forgot-password"
            className="font-medium text-gray-500 transition-colors hover:text-[#8b83ff]"
          >
            Change email
          </Link>
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
