import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tags,
  CreditCard,
  LogOut,
  ShieldCheck,
} from "lucide-react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Add your logout API here
    navigate("/admin/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      name: "Subscription Plans",
      path: "/admin/subscriptions",
      icon: CreditCard,
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#0d0d10] border-r border-white/6 flex flex-col">
        {/* Logo */}
        <div className="h-20 px-6 flex items-center border-b border-white/6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <ShieldCheck size={21} />
          </div>

          <div className="ml-3">
            <h1 className="text-base font-semibold text-white">
              Admin Panel
            </h1>

            <p className="text-xs text-zinc-600 mt-0.5">
              Management System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <p className="px-3 mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600">
            Main Menu
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "text-zinc-500 hover:bg-white/4 hover:text-zinc-200"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.8} />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Admin Profile */}
        <div className="p-4 border-t border-white/6">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-9 h-9 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-sm font-semibold text-indigo-400">
              A
            </div>

            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-200 truncate">
                Administrator
              </p>

              <p className="text-xs text-zinc-600 truncate">
                admin@example.com
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition"
          >
            <LogOut size={18} />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-[#0d0d10] border-b border-white/6 px-8 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Admin Dashboard
            </h2>

            <p className="text-xs text-zinc-600 mt-1">
              Manage your platform
            </p>
          </div>

          {/* Admin Info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-zinc-200">
                Administrator
              </p>

              <p className="text-[11px] text-zinc-600">
                Super Admin
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-sm font-semibold text-indigo-400">
              A
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;