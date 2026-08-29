import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Courses", path: "/courses" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const PublicNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#050505]">
      {/* Bottom Glass Separator */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 translate-y-full bg-linear-to-b from-black/30 via-black/10 to-transparent" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between border-b border-white/10 px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-all duration-500 hover:scale-105"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-500 hover:scale-105">
            <img
              src="/logo.png"
              alt="Launch Point Logo"
              className="h-full w-full rounded-lg object-contain"
            />
          </div>

          <div className="group">
            <span className="block text-sm font-semibold tracking-[3px] text-white transition-all duration-500 group-hover:text-indigo-300">
              LAUNCH POINT
            </span>

            <p className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-500 transition-all duration-500 group-hover:text-zinc-300 sm:block">
              Study hard. Work hard.
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition-all duration-500 ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:scale-105 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}

                  {isActive && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute -bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.9)]"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-500 sm:block ${
                isActive
                  ? "text-white"
                  : "text-zinc-400 hover:scale-105 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            Sign in
          </NavLink>

          <Link
            to="/signup"
            className="rounded-lg bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-700 hover:scale-105 hover:bg-indigo-400 hover:shadow-indigo-500/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
