import { NavLink, Outlet } from "react-router-dom";

const StudentLayout = () => {
  const navItems = [
    { name: "Home", path: "/student/home" },
    { name: "My Courses", path: "/student/courses" },
    { name: "Assignments", path: "/student/assignments" },
    { name: "Attendance", path: "/student/attendance" },
    { name: "Grades", path: "/student/grades" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-white/10 bg-[#080808]">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6c63ff]">
              <span className="text-sm font-bold">LP</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Launch Point
              </p>
              <p className="text-xs text-gray-500">
                Student Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-[#6c63ff]/10 text-[#8b83ff]"
                    : "text-gray-500 hover:bg-white/5 hover:text-gray-200"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6c63ff]/20 text-sm font-semibold text-[#8b83ff]">
              S
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                Student
              </p>
              <p className="truncate text-xs text-gray-500">
                student@example.com
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="ml-64 min-h-screen">
        {/* Top bar */}
        <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#050505] px-8">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-[#8b83ff]">
              Student Portal
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              Dashboard
            </h2>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            Logout
          </button>
        </header>

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
