import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password is too long")
      .refine((password) => /[A-Z]/.test(password), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "Must contain at least one lowercase letter",
      })
      .refine((password) => /[0-9]/.test(password), {
        message: "Must contain at least one number",
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: "Must contain at least one special character",
      }),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ResetPasswordFormData> = (data) => {
    console.log("Reset password data:", data);

    // Add your reset-password API request here.
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
      {/* Ambient purple glow */}
      <div className="signup-glow pointer-events-none absolute -left-32 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

      <div className="signup-glow pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />

      {/* Content */}
      <div className="signup-fade-up relative z-10 w-full max-w-sm">
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
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
            Account Recovery
          </p>

          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
            Create New Password
          </h1>

          <p className="mx-auto max-w-sm text-sm font-light leading-6 text-gray-500">
            Choose a strong password you haven’t used before.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-4"
        >
          {/* New Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                {...register("password")}
                className={`w-full border ${
                  errors.password ? "border-red-400/60" : "border-white/10"
                } bg-white/3 px-4 py-3.5 pr-11 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-[#8b83ff]"
              >
                {showPassword ? (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                {...register("confirmPassword")}
                className={`w-full border ${
                  errors.confirmPassword
                    ? "border-red-400/60"
                    : "border-white/10"
                } bg-white/3 px-4 py-3.5 pr-11 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10`}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-[#8b83ff]"
              >
                {showConfirmPassword ? (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Reset Password */}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99]"
          >
            Reset Password
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700">
        © {new Date().getFullYear()} Launch Point
      </p>
    </div>
  );
};

export default ResetPasswordPage;
