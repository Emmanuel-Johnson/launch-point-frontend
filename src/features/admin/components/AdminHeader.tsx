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
      className={`fixed right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-black px-8 transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
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
              bg-[#050505]
              transition-all duration-300

              hover:-translate-y-0.5
              hover:border-[oklch(52.7%_0.154_150.069)]/30
              hover:bg-[#080808]
              hover:shadow-[0_8px_30px_oklch(52.7%_0.154_150.069_/_0.08)]

              focus-within:border-[oklch(52.7%_0.154_150.069)]/50
              focus-within:bg-[#080808]
              focus-within:shadow-[0_0_0_4px_oklch(52.7%_0.154_150.069_/_0.07)]
            "
          >
            {/* Green shine */}
            <span
              className="
                pointer-events-none absolute inset-0 z-20
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-[oklch(52.7%_0.154_150.069)]/10
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

                group-hover:text-[oklch(65%_0.15_150)]
                group-focus-within:scale-105
                group-focus-within:text-[oklch(52.7%_0.154_150.069)]
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
        {/* =======================================================
            Notifications
        ======================================================== */}
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
            hover:shadow-[0_6px_20px_oklch(52.7%_0.154_150.069_/_0.08)]
          "
        >
          {/* Green shine */}
          <span
            className="
              pointer-events-none absolute inset-0
              -translate-x-full
              bg-gradient-to-r
              from-transparent
              via-[oklch(52.7%_0.154_150.069)]/10
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
              group-hover:text-[oklch(65%_0.15_150)]
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
              bg-[oklch(52.7%_0.154_150.069)]
              shadow-[0_0_8px_oklch(52.7%_0.154_150.069_/_0.7)]
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
              hover:shadow-[0_6px_20px_oklch(52.7%_0.154_150.069_/_0.08)]
            "
          >
            {/* Green shine */}
            <span
              className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-[oklch(52.7%_0.154_150.069)]/10
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
                bg-[oklch(52.7%_0.154_150.069)]/15
                text-sm font-semibold
                text-[oklch(65%_0.15_150)]
                ring-1 ring-[oklch(52.7%_0.154_150.069)]/20
                transition-all duration-300

                group-hover:scale-105
                group-hover:bg-[oklch(52.7%_0.154_150.069)]/20
                group-hover:text-[oklch(72%_0.14_150)]
                group-hover:ring-[oklch(52.7%_0.154_150.069)]/40
                group-hover:shadow-[0_0_18px_oklch(52.7%_0.154_150.069_/_0.15)]
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
                  group-hover:text-[oklch(78%_0.12_150)]
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
                isProfileOpen
                  ? "rotate-180 text-[oklch(65%_0.15_150)]"
                  : "rotate-0"
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
            className={`absolute right-0 top-[calc(100%+10px)] z-50 w-80 origin-top-right overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0D] shadow-2xl shadow-black/70 transition-all duration-200 ease-out ${
              isProfileOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }`}
          >
            {/* =====================================================
      ADMIN INFO
  ====================================================== */}
            <div className="cursor-default border-b border-white/[0.08] bg-[#0B0B0D] px-5 py-5">
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div
                  className="
          flex h-12 w-12 shrink-0
          items-center justify-center rounded-full
          bg-[oklch(52.7%_0.154_150.069)]
          text-sm font-semibold text-white
          shadow-lg
          shadow-[oklch(52.7%_0.154_150.069_/_0.2)]
          transition-all duration-300
          hover:scale-105
          hover:shadow-[0_0_18px_oklch(52.7%_0.154_150.069_/_0.3)]
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
              bg-[oklch(65%_0.15_150)]
              shadow-[0_0_6px_oklch(65%_0.15_150_/_0.5)]
            "
                    />

                    <span className="text-xs font-medium text-gray-500">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
      LOGOUT
  ====================================================== */}
            <div className="bg-[#0B0B0D] p-2">
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

                {/* Logout Icon */}
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

                {/* Logout Text */}
                <div className="relative z-10 flex-1">
                  <p className="text-sm font-medium text-red-400 transition-colors duration-200 group-hover:text-red-300">
                    Logout
                  </p>

                  <p className="mt-0.5 text-xs text-gray-600">
                    Sign out of admin account
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
