import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/hooks";
import { logoutAdmin } from "../api/adminApi";
import AdminLogoutConfirmModal from "./LogoutConfirmModal";

interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
}

/*
  GREEN & BLACK THEME (matches the Admin sidebar + dashboard)
  -----------------------------------------------------------------
  Chrome surface  #0A0A0A   near-black — same tone as the sidebar rail so
                            the header + sidebar frame the #000000 content.
  Primary         #34D399   emerald — the single accent colour
  Hover emerald   #6EE7B7   lighter step for hover/focus states

  The logout action stays red — a semantic destructive signal, intentionally
  not folded into the green palette.
*/

const AdminHeader = ({ isSidebarCollapsed }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const admin = useAppSelector((state) => state.admin.admin);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("admin_refresh");

    setIsLoggingOut(true);

    try {
      if (refreshToken) {
        await logoutAdmin(refreshToken);
      }
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");

      setShowLogoutConfirm(false);

      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <>
      <header
        className={`fixed right-0 top-0 z-50 flex h-20 items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A] px-8 transition-[left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "left-20" : "left-[280px]"
        }`}
      >
        {/* =========================================================
          Search
      ========================================================== */}
        <div className="mx-8 flex max-w-lg flex-1">
          <div className="group relative w-full">
            <div className="relative overflow-hidden rounded-full border border-white/[0.08] bg-[#0F0F12] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#121216] hover:shadow-[0_8px_30px_rgba(52,211,153,0.1)] focus-within:border-[#34D399]/50 focus-within:bg-[#121216] focus-within:shadow-[0_0_0_4px_rgba(52,211,153,0.08)]">
              {/* Green shine */}
              <span className="pointer-events-none absolute inset-0 z-20 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Search Icon */}
              <Search
                className="absolute left-4 top-1/2 z-10 h-[18px] w-[18px] -translate-y-1/2 cursor-pointer text-white/40 transition-all duration-300 group-hover:text-[#6EE7B7] group-focus-within:scale-105 group-focus-within:text-[#34D399]"
                strokeWidth={1.8}
              />

              {/* Input */}
              <input
                type="text"
                placeholder="Search students, instructors, courses..."
                className="relative z-0 h-11 w-full bg-transparent pl-11 pr-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/35 group-hover:placeholder:text-white/50 focus:placeholder:text-white/50"
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
            className="group relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-xl text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_6px_20px_rgba(52,211,153,0.1)]"
          >
            {/* Green shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Notification Icon */}
            <Bell
              className="relative z-10 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:text-[#6EE7B7]"
              strokeWidth={1.8}
            />

            {/* Notification Indicator */}
            <span className="absolute right-2.5 top-2 z-20 h-1.5 w-1.5 animate-pulse rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </button>

          {/* Divider */}
          <div className="mx-1 h-8 w-px bg-white/[0.08]" />

          {/* =========================================================
            Admin Profile
        ========================================================== */}
          <div ref={profileRef} className="relative">
            {/* Profile Trigger */}
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-expanded={isProfileOpen}
              className="group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-2 py-1.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] hover:shadow-[0_6px_20px_rgba(52,211,153,0.1)]"
            >
              {/* Green shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Avatar */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#34D399]/15 text-sm font-semibold text-[#34D399] ring-1 ring-[#34D399]/20 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#34D399]/20 group-hover:text-[#6EE7B7] group-hover:ring-[#34D399]/40 group-hover:shadow-[0_0_18px_rgba(52,211,153,0.18)]">
                A
              </div>

              {/* Admin Info */}
              <div className="relative z-10 hidden text-left sm:block">
                <p className="text-sm font-medium text-white transition-colors duration-200 group-hover:text-[#6EE7B7]">
                  {admin?.full_name ?? "Admin"}
                </p>

                <p className="text-xs text-white/50 transition-colors duration-200 group-hover:text-white/70">
                  {admin?.role ?? "Administrator"}
                </p>
              </div>

              {/* Chevron */}
              <ChevronDown
                className={`relative z-10 hidden h-4 w-4 text-white/50 transition-all duration-300 group-hover:text-white/70 sm:block ${
                  isProfileOpen ? "rotate-180 text-[#34D399]" : "rotate-0"
                }`}
                strokeWidth={1.8}
              />
            </button>

            {/* =========================================================
              Profile Dropdown
          ========================================================== */}
            <div
              className={`absolute right-0 top-[calc(100%+10px)] z-50 w-80 origin-top-right overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-2xl shadow-black/70 transition-all duration-200 ease-out ${
                isProfileOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-95 opacity-0"
              }`}
            >
              {/* =====================================================
                ADMIN INFO
            ====================================================== */}
              <div className="cursor-default border-b border-white/[0.08] px-5 py-5">
                <div className="flex items-center gap-3.5">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#34D399] to-[#059669] text-sm font-semibold text-white shadow-lg shadow-[#34D399]/20 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_18px_rgba(52,211,153,0.3)]">
                    AD
                  </div>

                  {/* Admin Details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-white">
                      {admin?.full_name ?? "Admin"}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5">
                      {/* Online status — emerald doubles as the theme accent here */}
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34D399] shadow-[0_0_6px_rgba(52,211,153,0.5)]" />

                      <span className="text-xs font-medium text-white/55">
                        {admin?.email ?? "Administrator"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =====================================================
                LOGOUT
            ====================================================== */}
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    setShowLogoutConfirm(true);
                  }}
                  className="group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-left transition-all duration-300 hover:translate-x-0.5 hover:bg-red-500/[0.06]"
                >
                  {/* Red shine */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {/* Logout Icon */}
                  <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/[0.06] text-red-400 transition-all duration-300 group-hover:scale-105 group-hover:bg-red-500/10 group-hover:text-red-300 group-hover:shadow-[0_0_16px_rgba(239,68,68,0.1)]">
                    <LogOut
                      className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-0.5"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Logout Text */}
                  <div className="relative z-10 flex-1">
                    <p className="text-sm font-medium text-red-400 transition-colors duration-200 group-hover:text-red-300">
                      Logout
                    </p>

                    <p className="mt-0.5 text-xs text-white/50">
                      Sign out of admin account
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AdminLogoutConfirmModal
        isOpen={showLogoutConfirm}
        isLoading={isLoggingOut}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminHeader;
