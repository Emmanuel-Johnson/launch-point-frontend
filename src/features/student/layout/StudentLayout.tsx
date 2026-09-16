import { NavLink, Outlet } from "react-router-dom";
import api from "../../../shared/api/axios";

const StudentLayout = () => {
  const navItems = [
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
      name: "My Courses",
      path: "/student/courses",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </svg>
      ),
    },
    {
      name: "Assignments",
      path: "/student/assignments",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
      ),
    },
    {
      name: "Attendance",
      path: "/student/attendance",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      ),
    },
    {
      name: "Grades",
      path: "/student/grades",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      ),
    },
  ];

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
      if (refreshToken) {
        await api.post("/auth/logout/", {
          refresh: refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ================= SIDEBAR ================= */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808]">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6c63ff] shadow-lg shadow-[#6c63ff]/20">
              <span className="text-sm font-bold">LP</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">Launch Point</p>

              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-7">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[2px] text-gray-600">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => (
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
          </nav>
        </div>

        {/* Push logout to bottom */}
        <div className="flex-1" />

        {/* Logout */}
        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-400"
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

      {/* ================= MAIN AREA ================= */}
      <div className="ml-64 min-h-screen">
        {/* ================= TOP BAR ================= */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#050505] px-8">
          {/* Left side */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[3px] text-[#8b83ff]">
              Student Portal
            </p>

            <h2 className="mt-1 text-lg font-semibold text-white">Dashboard</h2>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-all hover:bg-white/[0.05] hover:text-white"
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

            {/* Profile */}
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6c63ff]/20 text-sm font-semibold text-[#9b94ff] ring-1 ring-[#6c63ff]/20 transition-all hover:bg-[#6c63ff]/30"
            >
              S
            </button>
          </div>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
