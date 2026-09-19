import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../auth/api/authApi";
import LogoutConfirmModal from "./LogoutConfirmModal";

const StudentSidebar = () => {
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
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808]">
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c63ff] shadow-lg shadow-[#6c63ff]/20">
              <span className="text-sm font-bold text-white">LP</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Launch Point</p>

              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-6">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-gray-600">
                  {section.title}
                </p>

                <div className="space-y-1">
                  {section.items.map((item) => (
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

                          <span
                            className={
                              isActive
                                ? "text-[#8b83ff]"
                                : "text-gray-600 group-hover:text-gray-300"
                            }
                          >
                            {item.icon}
                          </span>

                          <span>{item.name}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="shrink-0 border-t border-white/10 p-3">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            disabled={isLoggingOut}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-5 w-5 transition-transform group-hover:-translate-x-0.5"
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

            <span>Logout</span>
          </button>
        </div>
      </aside>

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
