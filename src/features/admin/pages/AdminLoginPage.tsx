import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    console.log({ email, password });

    // Connect your Django admin login API here
    setTimeout(() => {
      setIsLoading(false);
      navigate("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-[#050505]">
      {/* LEFT — Admin Login */}
      <div className="relative flex h-full w-full items-center justify-center px-8 lg:w-1/2">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -left-30 top-[20%] h-96 w-96 rounded-full bg-[#6c63ff]/15 blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-25 -right-25 h-80 w-80 rounded-full bg-purple-600/10 blur-[110px]" />

        {/* Login Content */}
        <div className="animate-[fadeUp_0.7s_ease-out_both] relative z-10 w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
              Launch Point Admin
            </p>

            <h1 className="mb-2 text-5xl font-bold tracking-tight text-white">
              Welcome Back
            </h1>

            <p className="text-sm font-light leading-6 text-gray-500">
              Sign in to manage your platform and users.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-white/10 bg-white/3 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-white/10 bg-white/3 px-4 py-3.5 pr-11 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-600 focus:border-[#6c63ff]/60 focus:bg-white/5 focus:ring-2 focus:ring-[#6c63ff]/10"
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
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-[#6c63ff] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20 transition-all duration-300 hover:scale-[1.01] hover:bg-[#756cff] hover:shadow-[#6c63ff]/30 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />

                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-4">
              <div className="h-px flex-1 bg-white/10" />

              <span className="text-xs uppercase tracking-widest text-gray-600">
                Secure Access
              </span>

              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Security Notice */}
            <div className="flex items-center justify-center gap-2 text-xs font-light text-gray-600">
              <svg
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>

              <span>Authorized administrators only</span>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="absolute bottom-4 left-0 right-0 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700">
          © {new Date().getFullYear()} Launch Point
        </p>
      </div>

      {/* RIGHT — Admin Image */}
      <div className="relative hidden h-full w-1/2 overflow-hidden lg:block">
        <img
          src="/admin-login.png"
          alt="Admin dashboard"
          className="absolute inset-0 h-full w-full animate-[imageReveal_1s_ease-out_both] object-cover"
        />

        {/* Blend image into dark left side */}
        <div className="absolute inset-0 bg-linear-to-r from-[#050505]/70 via-[#050505]/10 to-transparent" />

        {/* Bottom fade */}
        <div className="absolute inset-0 bg-linear-to-t from-[#050505]/30 via-transparent to-transparent" />

        {/* Purple tint */}
        <div className="absolute inset-0 bg-[#6c63ff]/5 mix-blend-screen" />

        {/* Divider */}
        <div className="absolute left-0 top-0 z-20 h-full w-px bg-linear-to-b from-transparent via-[#6c63ff]/40 to-transparent" />
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(25px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes imageReveal {
            from {
              opacity: 0;
              transform: scale(1.04);
            }

            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLoginPage;
