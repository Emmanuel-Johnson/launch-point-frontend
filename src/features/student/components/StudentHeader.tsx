const StudentHeader = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#050505] px-8">
      {/* Search */}
      <div className="mx-8 flex max-w-md flex-1">
        <div className="relative w-full">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            placeholder="Search courses..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-gray-600 focus:border-[#6c63ff]/50 focus:bg-white/[0.05]"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Become Instructor */}
        <button
          type="button"
          className="rounded-xl border border-[#6c63ff]/30 bg-[#6c63ff]/10 px-4 py-2 text-sm font-medium text-[#a39eff] transition-all hover:bg-[#6c63ff]/20"
        >
          Become Instructor
        </button>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Wishlist"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-white/[0.05] hover:text-white"
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
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            />
          </svg>
        </button>

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifications"
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

        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-white/10" />

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition-all hover:bg-white/[0.05]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c63ff]/20 text-sm font-semibold text-[#9b94ff] ring-1 ring-[#6c63ff]/20">
            C
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">Cristiano Ronaldo</p>
            <p className="text-xs text-gray-500">Student</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
