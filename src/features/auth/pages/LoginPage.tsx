import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(50, "Email is too long")
    .email("Enter a valid email")
    .regex(
      /^(?!.*\.\.)(?!\.)(?!.*\.$)[a-z0-9.]{3,}@gmail\.com$/,
      "Enter a valid Gmail address",
    ),

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
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log("Login data:", data);

    // Add your login API request here.
  };

  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#050505]">
      {/* LEFT — Image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src="/signin-learning.png"
          alt="Student celebrating a successful learning moment"
          className="signup-image-in absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark blend toward the form */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-[#050505]/70" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505]/50 via-transparent to-transparent" />

        {/* Subtle purple tint */}
        <div className="absolute inset-0 bg-[#6c63ff]/5 mix-blend-screen" />

        {/* Right divider */}
        <div className="absolute right-0 top-0 z-20 h-full w-px bg-linear-to-b from-transparent via-[#6c63ff]/40 to-transparent" />
      </div>

      {/* RIGHT — Login Form */}
      <div className="relative flex w-full flex-col justify-center px-8 py-12 sm:px-14 lg:w-1/2">
        {/* Ambient purple glow */}
        <div className="signup-glow pointer-events-none absolute -right-30 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

        <div className="signup-glow pointer-events-none absolute -bottom-25 -left-25 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-sm">
          {/* Heading */}
          <div
            className="signup-fade-up mb-8"
            style={{ animationDelay: "100ms" }}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
              Welcome Back
            </p>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-white">
              Sign In
            </h1>

            <p className="text-sm font-light leading-6 text-gray-500">
              Continue learning and build your future.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="signup-fade-up space-y-4"
            style={{ animationDelay: "220ms" }}
          >
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                {...register("email")}
                className={`w-full border ${
                  errors.email
                    ? "border-red-400/60"
                    : "border-white/10"
                } bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10`}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.preventDefault();
                    }
                  }}
                  className={`w-full border ${
                    errors.password
                      ? "border-red-400/60"
                      : "border-white/10"
                  } bg-white/3 px-4 py-3.5 pr-11 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-[#8b83ff]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    /* Eye-off */
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
                    /* Eye */
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-xs text-gray-500 transition-colors duration-300 hover:text-[#8b83ff]"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99]"
            >
              Sign In
            </button>

            {/* Terms */}
            <p className="px-2 text-center text-[11px] font-light leading-5 text-gray-600">
              By continuing, you agree to{" "}
              <Link
                to="/terms"
                className="text-gray-400 transition-colors hover:text-[#8b83ff]"
                state={{ from: "/login" }}
              >
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link
                to="/privacy-policy"
                className="text-gray-400 transition-colors hover:text-[#8b83ff]"
                state={{ from: "/login" }}
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Divider */}
            <div className="flex items-center gap-3 py-2">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs uppercase tracking-widest text-gray-600">
                or
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/3 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/6"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />

                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43-.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53l3.66-2.84z"
                />
              </svg>

              Continue with Google
            </button>
          </form>

          {/* Signup */}
          <p
            className="signup-fade-up mt-6 text-center text-sm font-light text-gray-500"
            style={{ animationDelay: "400ms" }}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-white transition-colors hover:text-[#8b83ff]"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p
          className="signup-fade-in absolute bottom-5 left-0 right-0 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700"
          style={{ animationDelay: "700ms" }}
        >
          © {new Date().getFullYear()} Launch Point
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
