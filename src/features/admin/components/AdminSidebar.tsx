import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
import AdminLogoutConfirmModal from "./AdminLogoutConfirmModal";

const AdminSidebar = () => {
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
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808]">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c63ff] shadow-lg shadow-[#6c63ff]/20">
              <span className="text-sm font-bold text-white">LP</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Launch Point</p>

              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[2px] text-gray-600">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[#6c63ff]/10 text-[#9b94ff]"
                        : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 h-6 w-0.5 rounded-full bg-[#6c63ff]" />
                      )}

                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        className={
                          isActive
                            ? "text-[#8b83ff]"
                            : "text-gray-600 group-hover:text-gray-300"
                        }
                      />

                      <span>{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut
              size={20}
              strokeWidth={1.8}
              className="transition-transform group-hover:-translate-x-0.5"
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>

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
