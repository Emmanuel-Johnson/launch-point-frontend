import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StudentHeaderProps {
  isSidebarCollapsed: boolean;
}

const StudentHeader = ({ isSidebarCollapsed }: StudentHeaderProps) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);

    // Add your logout logic here
    // dispatch(logoutUser());

    navigate("/login");
  };

  return (
    <header
      className={`fixed right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#050505] px-8 transition-all duration-300 ${
        isSidebarCollapsed ? "left-20" : "left-[280px]"
      }`}
    >
      {/* Search */}
      <div className="mx-8 flex max-w-md flex-1">
        <div className="relative w-full">
          <svg
            className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-gray-500"
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

      {/* Right Side */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Become Instructor */}
        <button
          type="button"
          className="cursor-pointer rounded-xl border border-[#6c63ff]/30 bg-[#6c63ff]/10 px-4 py-2 text-sm font-medium text-[#a39eff] transition-all hover:bg-[#6c63ff]/20"
        >
          Become Instructor
        </button>

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Wishlist"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-white/[0.05] hover:text-white"
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

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-white/[0.05] hover:text-white"
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

        {/* Profile + Dropdown */}
        <div ref={profileRef} className="relative">
          {/* Profile Trigger */}
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1.5 transition-all hover:bg-white/[0.05]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c63ff]/20 text-sm font-semibold text-[#9b94ff] ring-1 ring-[#6c63ff]/20">
              E
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-white">Emmanuel Johnson</p>

              <p className="text-xs text-gray-500">Student</p>
            </div>

            {/* Chevron */}
            <svg
              className={`hidden h-4 w-4 text-gray-500 transition-transform sm:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-80 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0b0b0d] shadow-2xl shadow-black/50">
              {/* User Info */}
              <div className="border-b border-white/[0.08] px-5 py-5">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#6c63ff] to-[#8b5cf6] text-sm font-semibold text-white shadow-lg shadow-[#6c63ff]/20">
                    EJ
                  </div>

                  {/* User Details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-white">
                      Emmanuel Johnson
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-gray-500">
                        Student
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => navigate("/student/profile")}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-white/[0.05]"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-gray-500 transition-colors duration-200 group-hover:bg-[#6c63ff]/10 group-hover:text-[#8b7cff]">
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
                        d="M20 21a8 8 0 0 0-16 0"
                      />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-200 transition-colors group-hover:text-white">
                      My Profile
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      View and edit your profile
                    </p>
                  </div>

                  {/* Arrow */}
                  <svg
                    className="h-4 w-4 shrink-0 text-gray-600 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 18 6-6-6-6"
                    />
                  </svg>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-white/[0.08]" />

              {/* Logout */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 hover:bg-red-500/[0.06]"
                >
                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-colors duration-200 group-hover:bg-red-500/10 group-hover:text-red-300">
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
                        d="M10 17l5-5-5-5"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H3"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 19V5a2 2 0 0 0-2-2h-6"
                      />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-400 transition-colors group-hover:text-red-300">
                      Logout
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;
