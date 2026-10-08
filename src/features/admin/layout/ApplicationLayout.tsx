import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, GraduationCap } from "lucide-react";

/*
  GREEN & BLACK THEME (matches the Admin sidebar / header / dashboard)
  -----------------------------------------------------------------
  Switch surface  #0A0A0A   near-black rail
  Primary         #34D399   emerald — the single accent colour
  Hover emerald   #6EE7B7   lighter step for hover states
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
            `flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white/90"
            }`
          }
        >
          <GraduationCap size={18} />
          <span>Instructor Applications</span>
        </NavLink>

        <NavLink
          to="/admin/applications/courses"
          className={({ isActive }) =>
            `flex items-center justify-center gap-2 px-4 py-4 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white/90"
            }`
          }
        >
          <BookOpen size={18} />
          <span>Course Applications</span>
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
