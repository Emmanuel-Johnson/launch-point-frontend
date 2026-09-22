import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
}

const AdminHeader = ({ isSidebarCollapsed }: AdminHeaderProps) => {
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

    // Keep your existing logout logic here
    navigate("/admin/login");
  };

  return (
    <header
      className={`fixed right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-[#050a07] px-8 transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isSidebarCollapsed ? "left-20" : "left-[280px]"
      }`}
    >
      {/* =========================================================
          Search
      ========================================================== */}
      <div className="mx-8 flex max-w-lg flex-1">
        <div className="group relative w-full">
          <div
            className="
              relative overflow-hidden rounded-2xl
              border border-white/[0.08]
              bg-[#0a100c]
              transition-all duration-300

              hover:-translate-y-0.5
              hover:border-[#22c55e]/25
              hover:bg-[#0c130f]
              hover:shadow-[0_8px_30px_rgba(34,197,94,0.08)]

              focus-within:border-[#22c55e]/40
              focus-within:bg-[#0c130f]
              focus-within:shadow-[0_0_0_4px_rgba(34,197,94,0.06)]
            "
          >
            {/* Green shine */}
            <span
              className="
                pointer-events-none absolute inset-0 z-20
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-[#22c55e]/10
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              "
            />

            {/* Search Icon */}
            <svg
              className="
                pointer-events-none absolute left-4 top-1/2 z-10
                h-[18px] w-[18px]
                -translate-y-1/2
                text-gray-500
                transition-all duration-300

                group-hover:text-[#4ade80]
                group-focus-within:scale-105
                group-focus-within:text-[#22c55e]
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20 20-4-4"
              />
            </svg>

            {/* Input */}
            <input
              type="text"
              placeholder="Search students, instructors, courses..."
              className="
                relative z-0
                h-11 w-full
                bg-transparent
                pl-11 pr-4
                text-sm text-white
                outline-none
                placeholder:text-gray-600
                transition-colors duration-300

                group-hover:placeholder:text-gray-500
                focus:placeholder:text-gray-500
              "
            />
          </div>
        </div>
      </div>

      {/* =========================================================
          Right Side
      ========================================================== */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="
            group relative flex h-10 w-10 cursor-pointer
            items-center justify-center overflow-hidden rounded-xl
            text-gray-500
            transition-all duration-300

            hover:-translate-y-0.5
            hover:bg-white/[0.05]
            hover:text-white
            hover:shadow-[0_6px_20px_rgba(34,197,94,0.08)]
          "
        >
          {/* Green shine */}
          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-[#22c55e]/10
              to-transparent
              transition-transform duration-700
              group-hover:translate-x-full
            "
          />

          {/* Notification Icon */}
          <svg
            className="
              relative z-10 h-5 w-5
              transition-all duration-300
              group-hover:scale-110
              group-hover:text-[#4ade80]
            "
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

          {/* Notification Indicator */}
          <span
            className="
              absolute right-2.5 top-2 z-20
              h-1.5 w-1.5
              animate-pulse rounded-full
              bg-[#22c55e]
              shadow-[0_0_8px_rgba(34,197,94,0.7)]
            "
          />
        </button>

        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-white/10" />

        {/* =========================================================
            Admin Profile
        ========================================================== */}
        <div ref={profileRef} className="relative">
          {/* Profile Trigger */}
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            className="
              group relative flex cursor-pointer
              items-center gap-3 overflow-hidden
              rounded-xl px-2 py-1.5
              transition-all duration-300

              hover:-translate-y-0.5
              hover:bg-white/[0.05]
              hover:shadow-[0_6px_20px_rgba(34,197,94,0.08)]
            "
          >
            {/* Green shine */}
            <span
              className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-[#22c55e]/10
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              "
            />

            {/* Avatar */}
            <div
              className="
                relative z-10 flex h-10 w-10 shrink-0
                items-center justify-center rounded-full
                bg-[#22c55e]/15
                text-sm font-semibold text-[#4ade80]
                ring-1 ring-[#22c55e]/20
                transition-all duration-300

                group-hover:scale-105
                group-hover:bg-[#22c55e]/20
                group-hover:text-[#86efac]
                group-hover:ring-[#22c55e]/40
                group-hover:shadow-[0_0_18px_rgba(34,197,94,0.15)]
              "
            >
              A
            </div>

            {/* Admin Info */}
            <div className="relative z-10 hidden text-left sm:block">
              <p
                className="
                  text-sm font-medium text-white
                  transition-colors duration-200
                  group-hover:text-[#bbf7d0]
                "
              >
                Admin
              </p>

              <p
                className="
                  text-xs text-gray-500
                  transition-colors duration-200
                  group-hover:text-gray-400
                "
              >
                Administrator
              </p>
            </div>

            {/* Chevron */}
            <svg
              className={`relative z-10 hidden h-4 w-4 text-gray-500 transition-all duration-300 group-hover:text-gray-300 sm:block ${
                isProfileOpen ? "rotate-180 text-[#4ade80]" : "rotate-0"
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

          {/* =========================================================
              Profile Dropdown
          ========================================================== */}
          <div
            className={`absolute right-0 top-[calc(100%+10px)] z-50 w-80 origin-top-right overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a100c] shadow-2xl shadow-black/50 transition-all duration-200 ease-out ${
              isProfileOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }`}
          >
            {/* User Info */}
            <div className="cursor-default border-b border-white/[0.08] px-5 py-5">
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div
                  className="
                    flex h-12 w-12 shrink-0
                    items-center justify-center rounded-full
                    bg-gradient-to-br from-[#16a34a] to-[#22c55e]
                    text-sm font-semibold text-white
                    shadow-lg shadow-[#22c55e]/20
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-[#22c55e]/30
                  "
                >
                  AD
                </div>

                {/* Admin Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-white">
                    Administrator
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span
                      className="
                        h-1.5 w-1.5 animate-pulse rounded-full
                        bg-emerald-400
                        shadow-[0_0_6px_rgba(52,211,153,0.5)]
                      "
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="p-2">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/admin/profile");
                }}
                className="
                  group relative flex w-full cursor-pointer
                  items-center gap-3 overflow-hidden
                  rounded-xl px-3 py-3 text-left
                  transition-all duration-300

                  hover:translate-x-0.5
                  hover:bg-white/[0.05]
                "
              >
                {/* Shine */}
                <span
                  className="
                    pointer-events-none absolute inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-[#22c55e]/10
                    to-transparent
                    transition-transform duration-700
                    group-hover:translate-x-full
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative z-10 flex h-11 w-11 shrink-0
                    items-center justify-center rounded-xl
                    bg-white/[0.04]
                    text-gray-500
                    transition-all duration-300

                    group-hover:scale-105
                    group-hover:bg-[#22c55e]/10
                    group-hover:text-[#4ade80]
                    group-hover:shadow-[0_0_16px_rgba(34,197,94,0.08)]
                  "
                >
                  <svg
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
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
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-200 transition-colors duration-200 group-hover:text-white">
                    My Profile
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500 transition-colors duration-200 group-hover:text-gray-400">
                    View and edit admin profile
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  className="
                    relative z-10 h-4 w-4 shrink-0
                    text-gray-600
                    transition-all duration-300
                    group-hover:translate-x-1
                    group-hover:text-[#4ade80]
                  "
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
                className="
                  group relative flex w-full cursor-pointer
                  items-center gap-3 overflow-hidden
                  rounded-xl px-3 py-3 text-left
                  transition-all duration-300

                  hover:translate-x-0.5
                  hover:bg-red-500/[0.06]
                "
              >
                {/* Red shine */}
                <span
                  className="
                    pointer-events-none absolute inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-red-400/10
                    to-transparent
                    transition-transform duration-700
                    group-hover:translate-x-full
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative z-10 flex h-11 w-11 shrink-0
                    items-center justify-center rounded-xl
                    bg-red-500/[0.06]
                    text-red-400
                    transition-all duration-300

                    group-hover:scale-105
                    group-hover:bg-red-500/10
                    group-hover:text-red-300
                    group-hover:shadow-[0_0_16px_rgba(239,68,68,0.08)]
                  "
                >
                  <svg
                    className="
                      h-5 w-5
                      transition-transform duration-300
                      group-hover:-translate-x-0.5
                    "
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
                <div className="relative z-10 flex-1">
                  <p className="text-sm font-medium text-red-400 transition-colors duration-200 group-hover:text-red-300">
                    Logout
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
