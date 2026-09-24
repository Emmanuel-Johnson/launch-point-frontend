import {
  Award,
  Bell,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  Heart,
  LayoutDashboard,
  LogOut,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/api/authApi";
import LogoutConfirmModal from "./LogoutConfirmModal";

interface StudentSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

/*
  VIOLET & BLACK THEME (matches the Admin / Student dashboards)
  -----------------------------------------------------------------
  Rail surface  #0A0A0A   near-black — sits one step above the #000000
                          content area so the sidebar reads as an elevated
                          rail rather than merging into the page.
  Primary       #7C5CFF   Launch Point electric indigo-violet
*/
const navSections: NavSection[] = [
  {
    title: "Learning",
    items: [
      { name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard },
      { name: "My Learning", path: "/student/learning", icon: BookOpen },
      { name: "Certificates", path: "/student/certificates", icon: Award },
    ],
  },
  {
    title: "Explore",
    items: [
      { name: "Explore Courses", path: "/courses", icon: Compass },
      { name: "Community", path: "/student/community", icon: Users },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Wishlist", path: "/student/wishlist", icon: Heart },
      {
        name: "Subscriptions",
        path: "/student/subscriptions",
        icon: CreditCard,
      },
      { name: "Notifications", path: "/student/notifications", icon: Bell },
      { name: "Profile", path: "/student/profile", icon: User },
    ],
  },
];

const StudentSidebar = ({ isCollapsed, onToggle }: StudentSidebarProps) => {
  const navigate = useNavigate();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
        className={`student-sidebar fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/[0.08] bg-[#0A0A0A] transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isCollapsed ? "w-20" : "w-[280px]"
        }`}
      >
        {/* =====================================================
            LOGO / TOGGLE
        ====================================================== */}
        <div
          className={`relative flex h-20 shrink-0 items-center border-b border-white/[0.08] transition-all duration-500 ${
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
                src="/student_logo.png"
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
                <span className="block whitespace-nowrap text-sm font-semibold tracking-[3px] text-white transition-all duration-300 group-hover:text-white/80">
                  LAUNCH POINT
                </span>

                <p className="mt-0.5 whitespace-nowrap text-[9px] font-medium uppercase tracking-[0.25em] text-white/45 transition-all duration-300 group-hover:text-[#7C5CFF]">
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
            className={`group relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg text-white/50 transition-all duration-300 hover:bg-white/[0.06] hover:text-white ${
              isCollapsed
                ? "absolute -right-4 border border-white/[0.08] bg-[#111111] shadow-lg shadow-black/40"
                : "ml-auto"
            }`}
          >
            {/* Toggle Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {isCollapsed ? (
              <ChevronRight
                className="relative z-10 h-4 w-4 transition-transform duration-500 ease-out group-hover:scale-110"
                strokeWidth={2}
              />
            ) : (
              <ChevronLeft
                className="relative z-10 h-4 w-4 transition-transform duration-500 ease-out group-hover:scale-110"
                strokeWidth={2}
              />
            )}
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <div className="student-sidebar-scrollbar flex-1 overflow-y-auto px-3 py-6">
          <nav className="space-y-6">
            {navSections.map((section, sectionIndex) => (
              <div
                key={section.title}
                className="animate-sidebar-section"
                style={{ animationDelay: `${120 + sectionIndex * 80}ms` }}
              >
                {/* Section Title */}
                <div
                  className={`mb-2 overflow-hidden transition-all duration-300 ${
                    isCollapsed ? "max-h-0 opacity-0" : "max-h-6 opacity-100"
                  }`}
                >
                  <p className="cursor-default px-3 text-[10px] font-semibold uppercase tracking-[2px] text-white/40">
                    {section.title}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;

                    return (
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
                              ? "bg-[#7C5CFF]/10 text-white ring-1 ring-inset ring-[#7C5CFF]/20"
                              : "text-white/55 hover:translate-x-0.5 hover:bg-white/[0.04] hover:text-white/90"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {/* Shine Effect */}
                            {!isActive && (
                              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#7C5CFF]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            )}

                            {/* Active Indicator */}
                            <span
                              className={`absolute left-0 rounded-full bg-[#7C5CFF] transition-all duration-300 ${
                                isActive
                                  ? "h-6 w-0.5 opacity-100"
                                  : "h-0 w-0 opacity-0"
                              }`}
                            />

                            {/* Icon */}
                            <span
                              className={`relative z-10 shrink-0 transition-all duration-300 ${
                                isActive
                                  ? "scale-105 text-[#7C5CFF]"
                                  : "text-white/45 group-hover:scale-110 group-hover:text-white/80"
                              }`}
                            >
                              <Icon className="h-5 w-5" strokeWidth={1.8} />
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
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* =====================================================
            LOGOUT
        ====================================================== */}
        <div className="shrink-0 border-t border-white/[0.08] p-3">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            title={isCollapsed ? "Logout" : undefined}
            className={`group relative flex w-full cursor-pointer items-center overflow-hidden rounded-xl py-3 text-sm font-medium text-white/55 transition-all duration-300 hover:translate-x-0.5 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              isCollapsed ? "justify-center px-3" : "gap-3 px-3"
            }`}
          >
            {/* Logout Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-400/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            {/* Icon */}
            <LogOut
              className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.8}
            />

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
