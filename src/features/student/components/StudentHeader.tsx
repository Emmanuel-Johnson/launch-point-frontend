const StudentNavbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#050505] px-8">
      {/* Left side */}
      <div>
        <p className="text-xs font-medium uppercase tracking-[3px] text-[#8b83ff]">
          Student Portal
        </p>

        <h2 className="mt-1 text-lg font-semibold text-white">Dashboard</h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-white/[0.05] hover:text-white"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.73 21a2 2 0 0 1-3.46 0"
            />
          </svg>

          <span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-[#6c63ff]" />
        </button>

        {/* Profile */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c63ff]/20 text-sm font-semibold text-[#9b94ff] ring-1 ring-[#6c63ff]/20 transition-all hover:bg-[#6c63ff]/30"
        >
          S
        </button>
      </div>
    </header>
  );
};

export default StudentNavbar;
