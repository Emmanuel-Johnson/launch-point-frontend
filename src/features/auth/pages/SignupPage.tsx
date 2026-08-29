import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#050505]">
      {/* LEFT — Signup Form */}
      <div className="relative flex w-full flex-col justify-center px-8 py-12 sm:px-14 lg:w-1/2">
        {/* Ambient purple glow */}
        <div className="pointer-events-none absolute -left-30 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-25 -right-25 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />

        <div className="relative z-10 mx-auto w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
              Join Launch Point
            </p>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-white">
              Create Account
            </h1>

            <p className="text-sm font-light leading-6 text-gray-500">
              Start learning practical skills and build your future.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              placeholder="Full name"
              className="w-full border border-white/10 bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-white/10 bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Create password"
              className="w-full border border-white/10 bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-white/10 bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
            />

            {/* Create Account */}
            <button
              type="button"
              className="mt-2 w-full rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99]"
            >
              Create Account
            </button>
            {/* Terms */}
            <p className="px-2 text-center text-[11px] font-light leading-5 text-gray-600">
              By continuing, you agree to{" "}
              <Link
                to="/terms"
                state={{ from: "/signup" }}
                className="text-gray-400 transition-colors hover:text-[#8b83ff]"
              >
                Terms
              </Link>{" "}
              &amp;{" "}
              <Link
                to="/privacy-policy"
                state={{ from: "/signup" }}
                className="text-gray-400 transition-colors hover:text-[#8b83ff]"
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
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm font-light text-gray-500">
            Already have an account?{" "}
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

      {/* RIGHT — Uploaded Image */}
      <div className="relative hidden w-1/2 overflow-hidden lg:block">
        <img
          src="/signup-learning.png"
          alt="Student learning on a laptop"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Blend image into the dark left side */}
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/70 via-[#050505]/10 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505]/30 via-transparent to-transparent" />

        {/* Very subtle purple tint */}
        <div className="absolute inset-0 bg-[#6c63ff]/5 mix-blend-screen" />

        {/* Divider */}
        <div className="absolute left-0 top-0 z-20 h-full w-px bg-linear-to-b from-transparent via-[#6c63ff]/40 to-transparent" />
      </div>
    </div>
  );
};

export default SignupPage;
