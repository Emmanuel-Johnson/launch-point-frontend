import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema
const forgotPasswordSchema = z.object({
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
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = (data) => {
    console.log("Forgot password email:", data);

    // Add your forgot-password API request here.
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
          Forgot Password?
        </h1>

        <p className="mx-auto max-w-sm text-sm font-light leading-6 text-gray-500">
          Enter the email address associated with your account and we’ll send
          you a 6-digit verification code.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 space-y-4"
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
              <p className="mt-1 text-left text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Send Code */}
          <button
            type="submit"
            className="w-full rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99]"
          >
            Send Code
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-6 text-sm font-light text-gray-500">
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-medium text-white transition-colors hover:text-[#8b83ff]"
          >
            Sign in
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

export default ForgotPasswordPage;
