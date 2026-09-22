import {
  Bell,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  LogOut,
  Search,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface InstructorHeaderProps {
  isSidebarCollapsed: boolean;
}

/*
  BLUE & BLACK THEME (matches the Instructor sidebar + dashboard)
  -----------------------------------------------------------------
  Chrome surface  #0A0A0A   near-black — same tone as the sidebar rail so
                            the header + sidebar frame the #000000 content.
  Primary         #3B82F6   royal blue — the single accent colour
  Deep blue       #1D4ED8   gradient end for the dropdown avatar
  Hover blue      #60A5FA   lighter step for hover/focus states

  Semantic colours are intentionally NOT blue: the online-status dot stays
  emerald (universal "online" signal) and the logout action stays red.
*/

const InstructorHeader = ({ isSidebarCollapsed }: InstructorHeaderProps) => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

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

    // Add instructor logout logic here
    // dispatch(logoutInstructor());

    navigate("/login");
  };

  return (
    <header
      className={`fixed right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A] px-8 transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isSidebarCollapsed ? "left-20" : "left-[280px]"
      }`}
    >
      {/* =====================================================
          SEARCH
      ====================================================== */}
      <div className="mx-8 flex max-w-lg flex-1">
        <div className="group relative w-full">
          <div className="relative overflow-hidden rounded-full border border-white/[0.08] bg-[#0F0F12] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6]/25 hover:bg-[#121216] hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] focus-within:border-[#3B82F6]/40 focus-within:bg-[#121216] focus-within:shadow-[0_0_0_4px_rgba(59,130,246,0.08)]">
            {/* Blue Shine */}
            <span className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Search Icon */}
            <Search
              className="absolute left-4 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-white/40 transition-all duration-300 group-hover:text-[#60A5FA] group-focus-within:scale-105 group-focus-within:text-[#3B82F6]"
              strokeWidth={1.8}
            />

            {/* Input */}
            <input
              type="text"
              placeholder="Search courses, students..."
              className="relative z-0 h-11 w-full bg-transparent pl-11 pr-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/35 group-hover:placeholder:text-white/50 focus:placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="group relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_6px_20px_rgba(59,130,246,0.1)]"
        >
          {/* Shine */}
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          {/* Notification Icon */}
          <Bell
            className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-[#60A5FA]"
            strokeWidth={1.8}
          />

          {/* Notification Indicator */}
          <span className="absolute right-2.5 top-2 z-20 h-1.5 w-1.5 animate-pulse rounded-full bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
        </button>

        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-white/[0.08]" />

        {/* =====================================================
            PROFILE
        ====================================================== */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            aria-expanded={isProfileOpen}
            className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-2 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:shadow-[0_6px_20px_rgba(59,130,246,0.1)]"
          >
            {/* Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Avatar */}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3B82F6]/20 text-sm font-semibold text-[#3B82F6] ring-1 ring-[#3B82F6]/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#3B82F6]/25 group-hover:text-[#60A5FA] group-hover:ring-[#3B82F6]/40 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.18)]">
              EJ
            </div>

            {/* User Info */}
            <div className="relative z-10 hidden text-left sm:block">
              <p className="text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#60A5FA]">
                Emmanuel Johnson
              </p>

              <p className="text-xs text-white/50">Instructor</p>
            </div>

            {/* Chevron */}
            <ChevronDown
              className={`relative z-10 hidden h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-white/70 sm:block ${
                isProfileOpen ? "rotate-180 text-[#3B82F6]" : "rotate-0"
              }`}
              strokeWidth={1.8}
            />
          </button>

          {/* =====================================================
              PROFILE DROPDOWN
          ====================================================== */}
          <div
            className={`absolute right-0 top-[calc(100%+10px)] z-50 w-80 origin-top-right overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-2xl shadow-black/70 transition-all duration-200 ease-out ${
              isProfileOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-95 opacity-0"
            }`}
          >
            {/* =====================================================
                USER INFO
            ====================================================== */}
            <div className="cursor-default border-b border-white/[0.08] px-5 py-5">
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-sm font-semibold text-white shadow-lg shadow-[#3B82F6]/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_18px_rgba(59,130,246,0.3)]">
                  EJ
                </div>

                {/* User Details */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-semibold text-white">
                    Emmanuel Johnson
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    {/* Online status — semantic green, intentionally not blue */}
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />

                    <span className="text-xs font-medium text-white/55">
                      Instructor
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                MY PROFILE
            ====================================================== */}
            <div className="p-2">
              <button
                type="button"
                onClick={() => navigate("/instructor/profile")}
                className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 hover:translate-x-0.5 hover:bg-white/[0.05]"
              >
                {/* Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/45 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.1)]">
                  <User
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-sm font-medium text-white/90 transition-colors duration-200 group-hover:text-white">
                    My Profile
                  </p>

                  <p className="mt-0.5 text-xs text-white/50 transition-colors duration-200 group-hover:text-white/70">
                    View and edit your profile
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className="relative z-10 h-4 w-4 shrink-0 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#60A5FA]"
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.08]" />

            {/* =====================================================
                SWITCH TO STUDENT
            ====================================================== */}
            <div className="p-2">
              <button
                type="button"
                onClick={() => navigate("/student/dashboard")}
                className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 hover:translate-x-0.5 hover:bg-[#3B82F6]/[0.06]"
              >
                {/* Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/[0.08] text-[#3B82F6] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#3B82F6]/[0.14] group-hover:text-[#60A5FA] group-hover:shadow-[0_0_16px_rgba(59,130,246,0.1)]">
                  <GraduationCap
                    className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Text */}
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#60A5FA] transition-colors duration-200 group-hover:text-white">
                    Switch to Student
                  </p>

                  <p className="mt-0.5 text-xs text-white/50 transition-colors duration-200 group-hover:text-white/70">
                    Continue learning as a student
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight
                  className="relative z-10 h-4 w-4 shrink-0 text-[#3B82F6]/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#60A5FA]"
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-white/[0.08]" />

            {/* =====================================================
                LOGOUT
            ====================================================== */}
            <div className="p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 hover:translate-x-0.5 hover:bg-red-500/[0.06]"
              >
                {/* Red Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon */}
                <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-red-500/10 group-hover:text-red-300 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.1)]">
                  <LogOut
                    className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                    strokeWidth={1.8}
                  />
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

export default InstructorHeader;
