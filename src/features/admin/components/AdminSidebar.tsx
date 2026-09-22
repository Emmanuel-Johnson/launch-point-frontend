import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Tags,
  TicketPercent,
  IndianRupee,
  BarChart3,
  Bell,
  UserRound,
  LogOut,
} from "lucide-react";

import { logoutAdmin } from "../api/adminApi";
import AdminLogoutConfirmModal from "./LogoutConfirmModal";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ isCollapsed, onToggle }: AdminSidebarProps) => {
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: Users,
    },
    {
      name: "Instructors",
      path: "/admin/instructors",
      icon: GraduationCap,
    },
    {
      name: "Courses",
      path: "/admin/courses",
      icon: BookOpen,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Coupons",
      path: "/admin/coupons",
      icon: TicketPercent,
    },
    {
      name: "Revenue",
      path: "/admin/revenue",
      icon: IndianRupee,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: Bell,
    },
    {
      name: "Profile",
      path: "/admin/profile",
      icon: UserRound,
    },
  ];

  // =========================================================
  // Admin Logout
  // =========================================================

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

      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[#17251b] bg-[#070b08] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCollapsed ? "w-20" : "w-[280px]"
        }`}
      >
        {/* =====================================================
            LOGO / TOGGLE
        ====================================================== */}
        <div
          className={`relative flex h-20 shrink-0 items-center border-b border-[#17251b] transition-all duration-500 ${
            isCollapsed ? "justify-center px-3" : "px-6"
          }`}
        >
          {/* =====================================================
              BRAND
          ====================================================== */}
          <Link
            to="/admin/dashboard"
            className={`flex min-w-0 items-center transition-all duration-500 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            {/* Logo */}
            <div
              className="
    group relative flex h-9 w-9 shrink-0
    cursor-pointer items-center justify-center
    overflow-hidden rounded-xl
    border border-[#294d35]
    bg-[#102318]
    shadow-[0_0_18px_rgba(30,70,43,0.12)]
    transition-all duration-500
    hover:scale-105
  "
            >
              <img
                src="/admin_logo.png"
                alt="Launch Point Admin"
                className="
      h-full w-full
      object-cover
      transition-transform duration-500
      group-hover:scale-105
    "
              />

              {/* Logo Shine */}
              <span
                className="
      pointer-events-none absolute inset-0
      -translate-x-full
      bg-gradient-to-r
      from-transparent
      via-[#6f9f7c]/[0.08]
      to-transparent
      transition-transform duration-700
      group-hover:translate-x-full
    "
              />
            </div>

            {/* Brand */}
            <div
              className={`grid overflow-hidden transition-all duration-500 ease-out ${
                isCollapsed
                  ? "max-w-0 -translate-x-2 opacity-0"
                  : "max-w-[180px] translate-x-0 opacity-100"
              }`}
            >
              <div className="group min-w-[170px] cursor-pointer">
                <span
                  className="
                    block whitespace-nowrap
                    text-sm font-semibold
                    tracking-[3px] text-white
                    transition-all duration-300
                    group-hover:text-[#d0d9d2]
                  "
                >
                  LAUNCH POINT
                </span>

                <p
                  className="
                    mt-0.5 whitespace-nowrap
                    text-[9px] font-medium uppercase
                    tracking-[0.25em] text-[#536158]
                    transition-all duration-300
                    group-hover:text-[#708078]
                  "
                >
                  Admin Portal
                </p>
              </div>
            </div>
          </Link>

          {/* =====================================================
              TOGGLE
          ====================================================== */}
          <button
            type="button"
            onClick={onToggle}
            aria-label={isCollapsed ? "Open sidebar" : "Close sidebar"}
            title={isCollapsed ? "Open sidebar" : "Close sidebar"}
            className={`group relative flex h-8 w-8 shrink-0 cursor-ew-resize items-center justify-center overflow-hidden rounded-lg text-[#4f5c53] transition-all duration-300 hover:bg-[#101812] hover:text-[#8a9f8f] ${
              isCollapsed
                ? "absolute -right-4 border border-[#1d3023] bg-[#0c120e] shadow-lg shadow-black/30"
                : "ml-auto"
            }`}
          >
            {/* Toggle Shine */}
            <span
              className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-[#315f3d]/[0.08]
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              "
            />

            <svg
              className="
                relative z-10 h-4 w-4
                transition-transform duration-500
                ease-out
                group-hover:scale-110
              "
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isCollapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 6 6 6-6 6"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 6-6 6 6 6"
                />
              )}
            </svg>
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <div
          className="
            admin-sidebar-scrollbar
            flex-1 overflow-y-auto
            px-3 py-6
          "
        >
          {/* Section Title */}
          <div
            className={`mb-3 overflow-hidden transition-all duration-300 ${
              isCollapsed ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
            }`}
          >
            <p className="cursor-default px-3 text-[10px] font-semibold uppercase tracking-[2px] text-[#465249]">
              Main Menu
            </p>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    `group relative flex items-center overflow-hidden rounded-xl py-3 text-sm font-medium transition-all duration-300 ${
                      isCollapsed ? "justify-center px-3" : "gap-3 px-3"
                    } ${
                      isActive
                        ? "bg-[#163020] text-[#7f9b86]"
                        : "text-[#526057] hover:translate-x-0.5 hover:bg-[#0e160f] hover:text-[#b3beb5]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* =================================================
                          Hover Shine
                      ================================================= */}
                      {!isActive && (
                        <span
                          className="
                            pointer-events-none absolute inset-0
                            -translate-x-full
                            bg-gradient-to-r
                            from-transparent
                            via-[#315f3d]/[0.08]
                            to-transparent
                            transition-transform duration-700
                            group-hover:translate-x-full
                          "
                        />
                      )}

                      {/* =================================================
                          Active Indicator
                      ================================================= */}
                      <span
                        className={`absolute left-0 rounded-full bg-[#52785d] transition-all duration-300 ${
                          isActive
                            ? "h-6 w-0.5 opacity-100"
                            : "h-0 w-0 opacity-0"
                        }`}
                      />

                      {/* =================================================
                          Icon
                      ================================================= */}
                      <span
                        className={`relative z-10 shrink-0 transition-all duration-300 ${
                          isActive
                            ? "scale-105 text-[#78917e]"
                            : "text-[#465249] group-hover:scale-110 group-hover:text-[#819487]"
                        }`}
                      >
                        <Icon size={20} strokeWidth={1.8} />
                      </span>

                      {/* =================================================
                          Label
                      ================================================= */}
                      <span
                        className={`relative z-10 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                          isCollapsed
                            ? "max-w-0 translate-x-2 opacity-0"
                            : "max-w-[180px] translate-x-0 opacity-100"
                        }`}
                      >
                        {item.name}
                      </span>

                      {/* =================================================
                          Active Glow
                      ================================================= */}
                      {isActive && !isCollapsed && (
                        <span className="pointer-events-none absolute right-3 h-1.5 w-1.5 rounded-full bg-[#52785d] opacity-60 shadow-[0_0_8px_rgba(82,120,93,0.35)]" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* =====================================================
            LOGOUT
        ====================================================== */}
        <div className="shrink-0 border-t border-[#17251b] p-3">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            title={isCollapsed ? "Logout" : undefined}
            className={`group relative flex w-full cursor-pointer items-center overflow-hidden rounded-xl py-3 text-sm font-medium text-[#526057] transition-all duration-300 hover:translate-x-0.5 hover:bg-red-500/[0.06] hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              isCollapsed ? "justify-center px-3" : "gap-3 px-3"
            }`}
          >
            {/* Logout Shine */}
            <span
              className="
                pointer-events-none absolute inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-red-400/[0.07]
                to-transparent
                transition-transform duration-700
                group-hover:translate-x-full
              "
            />

            {/* Icon */}
            <LogOut
              size={20}
              strokeWidth={1.8}
              className="
                relative z-10 shrink-0
                transition-transform duration-300
                group-hover:-translate-x-1
              "
            />

            {/* Label */}
            <span
              className={`relative z-10 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-[120px] translate-x-0 opacity-100"
              }`}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          LOGOUT CONFIRMATION MODAL
      ====================================================== */}
      <AdminLogoutConfirmModal
        isOpen={showLogoutConfirm}
        isLoading={isLoggingOut}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminSidebar;
