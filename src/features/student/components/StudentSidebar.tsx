import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/api/authApi";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useState } from "react";
import { Link } from "react-router-dom";

interface StudentSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const StudentSidebar = ({ isCollapsed, onToggle }: StudentSidebarProps) => {
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navSections = [
    {
      title: "Learning",
      items: [
        {
          name: "Dashboard",
          path: "/student/dashboard",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          ),
        },
        {
          name: "My Learning",
          path: "/student/learning",
          icon: (
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
                d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 5.5A2.5 2.5 0 0 0 6.5 8H20"
              />
            </svg>
          ),
        },
        {
          name: "Certificates",
          path: "/student/certificates",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="5" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.5 8 21l4-2 4 2-1-8.5"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Explore",
      items: [
        {
          name: "Explore Courses",
          path: "/courses",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m15.5 8.5-2.1 5.1-4.9 1.9 2.1-5.1 4.9-1.9Z"
              />
            </svg>
          ),
        },
        {
          name: "Community",
          path: "/student/community",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="9" cy="8" r="3" />
              <circle cx="17" cy="9" r="2.5" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.5 20a5.5 5.5 0 0 1 11 0"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 15.5a5 5 0 0 1 6.5 4.5"
              />
            </svg>
          ),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Wishlist",
          path: "/student/wishlist",
          icon: (
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
          ),
        },
        {
          name: "Subscriptions",
          path: "/student/subscriptions",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path strokeLinecap="round" d="M3 10h18" />
              <path strokeLinecap="round" d="M7 15h4" />
            </svg>
          ),
        },
        {
          name: "Notifications",
          path: "/student/notifications",
          icon: (
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
          ),
        },
        {
          name: "Profile",
          path: "/student/profile",
          icon: (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="12" cy="8" r="4" />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 21a7 7 0 0 1 14 0"
              />
            </svg>
          ),
        },
      ],
    },
  ];

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    setIsLoggingOut(true);

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`student-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/10 bg-[#080808] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCollapsed ? "w-20" : "w-[280px]"
        }`}
      >
        {/* =====================================================
            LOGO / TOGGLE
        ====================================================== */}
        <div
          className={`relative flex h-20 shrink-0 items-center border-b border-white/10 transition-all duration-500 ${
            isCollapsed ? "justify-center px-3" : "px-6"
          }`}
        >
          {/* =====================================================
              BRAND
          ====================================================== */}

          <Link
            to="/"
            className={`flex min-w-0 items-center transition-all duration-500 ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            {/* Logo */}
            <div className="group relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg">
              <img
                src="/logo.png"
                alt="Launch Point Logo"
                className="h-full w-full rounded-lg object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
              />

              {/* Logo Shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </div>

            {/* Brand */}
            <div
              className={`grid overflow-hidden transition-all duration-500 ease-out ${
                isCollapsed
                  ? "max-w-0 -translate-x-2 opacity-0"
                  : "max-w-[180px] translate-x-0 opacity-100"
              }`}
            >
              <div className="group min-w-[160px] cursor-pointer">
                <span className="block whitespace-nowrap text-sm font-semibold tracking-[3px] text-white transition-all duration-300 group-hover:text-zinc-200">
                  LAUNCH POINT
                </span>

                <p className="mt-0.5 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-500 transition-all duration-300 group-hover:text-zinc-300">
                  Student Portal
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
            className={`group relative flex h-8 w-8 shrink-0 cursor-ew-resize items-center justify-center overflow-hidden rounded-lg text-gray-500 transition-all duration-300 hover:bg-white/[0.06] hover:text-white ${
              isCollapsed
                ? "absolute -right-4 border border-white/10 bg-[#111111] shadow-lg shadow-black/30"
                : "ml-auto"
            }`}
          >
            {/* Toggle Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-500 ease-out group-hover:scale-110"
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
        <div className="scrollbar-hide flex-1 overflow-y-auto px-3 py-6">
          <nav className="space-y-6">
            {navSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                className="animate-sidebar-section"
                style={{
                  animationDelay: `${120 + sectionIndex * 80}ms`,
                }}
              >
                {/* Section Title */}
                <div
                  className={`mb-2 overflow-hidden transition-all duration-300 ${
                    isCollapsed ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
                  }`}
                >
                  <p className="cursor-default px-3 text-[10px] font-semibold uppercase tracking-[2px] text-gray-600">
                    {section.title}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      title={isCollapsed ? item.name : undefined}
                      style={{
                        animationDelay: `${
                          160 + sectionIndex * 100 + itemIndex * 45
                        }ms`,
                      }}
                      className={({ isActive }) =>
                        `group relative flex items-center overflow-hidden rounded-xl py-3 text-sm font-medium transition-all duration-300 animate-sidebar-item ${
                          isCollapsed ? "justify-center px-3" : "gap-3 px-3"
                        } ${
                          isActive
                            ? "bg-[#6c63ff]/10 text-[#9b94ff]"
                            : "text-gray-500 hover:translate-x-0.5 hover:bg-white/[0.04] hover:text-gray-200"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {/* Shine Effect */}
                          {!isActive && (
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#8b83ff]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                          )}

                          {/* Active Indicator */}
                          <span
                            className={`absolute left-0 rounded-full bg-[#6c63ff] transition-all duration-300 ${
                              isActive
                                ? "h-6 w-0.5 opacity-100"
                                : "h-0 w-0 opacity-0"
                            }`}
                          />

                          {/* Icon */}
                          <span
                            className={`relative z-10 shrink-0 transition-all duration-300 ${
                              isActive
                                ? "scale-105 text-[#8b83ff]"
                                : "text-gray-600 group-hover:scale-110 group-hover:text-gray-300"
                            }`}
                          >
                            {item.icon}
                          </span>

                          {/* Label */}
                          <span
                            className={`relative z-10 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out ${
                              isCollapsed
                                ? "max-w-0 translate-x-2 opacity-0"
                                : "max-w-[180px] translate-x-0 opacity-100"
                            }`}
                          >
                            {item.name}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* =====================================================
            LOGOUT
        ====================================================== */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            title={isCollapsed ? "Logout" : undefined}
            className={`group relative flex w-full cursor-pointer items-center overflow-hidden rounded-xl py-3 text-sm font-medium text-gray-500 transition-all duration-300 hover:translate-x-0.5 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              isCollapsed ? "justify-center px-3" : "gap-3 px-3"
            }`}
          >
            {/* Logout Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Icon */}
            <svg
              className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H3m0 0 4-4m-4 4 4 4"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1"
              />
            </svg>

            {/* Label */}
            <span
              className={`relative z-10 overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-[100px] translate-x-0 opacity-100"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          LOGOUT MODAL
      ====================================================== */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        isLoading={isLoggingOut}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default StudentSidebar;
