import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to home"
        className="group absolute left-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 12H5m7 7-7-7 7-7"
          />
        </svg>
      </button>

      <Outlet />
    </div>
  );
};

export default AuthLayout;
