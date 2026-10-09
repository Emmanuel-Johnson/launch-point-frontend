import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";

/*
  GREEN & BLACK THEME (matches the Admin sidebar / header / dashboard)
  -----------------------------------------------------------------
  Switch surface  #0A0A0A   near-black rail
  Primary         #34D399   emerald — the single accent colour
  Hover emerald   #6EE7B7   lighter step for hover states

  Two equal halves (grid-cols-2). Active vs inactive differ ONLY in
  background tint + text/icon colour — same box, padding, border and text —
  so nothing shifts position when you toggle.

  Active (matches the sidebar nav items):
    - background tint bg-[#34D399]/10
    - LABEL stays white; only the ICON turns emerald (+ slight scale)

  Hover:
    - emerald shine sweep on BOTH tabs, symmetric about the centre line
    - icon dims at rest (white/45), scales up + brightens on hover
    - label brightens to white/90 on hover
*/

const ApplicationLayout = () => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Application Type Switch */}
      <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]">
        <NavLink
          to="/admin/applications/instructors"
          className={({ isActive }) =>
            `group relative flex items-center justify-center gap-2 overflow-hidden px-4 py-4 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-[#34D399]/10 text-white"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white/90"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Hover Shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Icon */}
              <span
                className={`relative z-10 shrink-0 transition-all duration-300 ${
                  isActive
                    ? "scale-105 text-[#34D399]"
                    : "text-white/45 group-hover:scale-110 group-hover:text-white/80"
                }`}
              >
                <GraduationCap size={18} strokeWidth={1.8} />
              </span>

              {/* Label */}
              <span className="relative z-10 whitespace-nowrap transition-all duration-300">
                Instructor Applications
              </span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/admin/applications/courses"
          className={({ isActive }) =>
            `group relative flex items-center justify-center gap-2 overflow-hidden px-4 py-4 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "bg-[#34D399]/10 text-white"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white/90"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* Hover Shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {/* Icon */}
              <span
                className={`relative z-10 shrink-0 transition-all duration-300 ${
                  isActive
                    ? "scale-105 text-[#34D399]"
                    : "text-white/45 group-hover:scale-110 group-hover:text-white/80"
                }`}
              >
                <BookOpen size={18} strokeWidth={1.8} />
              </span>

              {/* Label */}
              <span className="relative z-10 whitespace-nowrap transition-all duration-300">
                Course Applications
              </span>
            </>
          )}
        </NavLink>
      </div>

      {/* Animate only the content below the switch */}
      <div key={location.pathname} className="animate-page-enter">
        <Outlet />
      </div>
    </div>
  );
};

export default ApplicationLayout;
