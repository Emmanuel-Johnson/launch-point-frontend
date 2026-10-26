import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, GraduationCap, ArrowUpRight } from "lucide-react";

const ApplicationLayout = () => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      {/* Application Navigation */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Instructor Applications */}
          <NavLink
            to="/admin/applications/instructors"
            className={({ isActive }) =>
              `group relative flex min-w-0 items-start gap-4 overflow-hidden p-5 transition-colors duration-300 sm:p-6 ${
                isActive ? "bg-[#34D399]/[0.07]" : "hover:bg-white/[0.025]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300 ${
                    isActive ? "bg-[#34D399]" : "bg-transparent"
                  }`}
                />

                {/* Hover Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon Container */}
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#34D399]/20 bg-[#34D399]/10 text-[#34D399]"
                      : "border-white/[0.08] bg-white/[0.025] text-white/45 group-hover:border-[#34D399]/20 group-hover:bg-[#34D399]/[0.07] group-hover:text-[#34D399]"
                  }`}
                >
                  <GraduationCap
                    size={21}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                {/* Text Content */}
                <span className="relative z-10 min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      Instructor Applications
                    </span>

                    <ArrowUpRight
                      size={15}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-[#34D399] opacity-100"
                          : "-translate-x-1 translate-y-1 text-white/30 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#34D399] group-hover:opacity-100"
                      }`}
                    />
                  </span>

                  <span className="mt-1.5 block text-xs leading-5 text-white/40 transition-colors duration-300 group-hover:text-white/55">
                    Review applicant profiles and their teaching expertise.
                  </span>
                </span>
              </>
            )}
          </NavLink>

          {/* Course Applications */}
          <NavLink
            to="/admin/applications/courses"
            className={({ isActive }) =>
              `group relative flex min-w-0 items-start gap-4 overflow-hidden border-t border-white/[0.06] p-5 transition-colors duration-300 sm:border-l sm:border-t-0 sm:p-6 ${
                isActive ? "bg-[#34D399]/[0.07]" : "hover:bg-white/[0.025]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] transition-opacity duration-300 ${
                    isActive ? "bg-[#34D399]" : "bg-transparent"
                  }`}
                />

                {/* Hover Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Icon Container */}
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#34D399]/20 bg-[#34D399]/10 text-[#34D399]"
                      : "border-white/[0.08] bg-white/[0.025] text-white/45 group-hover:border-[#34D399]/20 group-hover:bg-[#34D399]/[0.07] group-hover:text-[#34D399]"
                  }`}
                >
                  <BookOpen
                    size={20}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                {/* Text Content */}
                <span className="relative z-10 min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      Course Applications
                    </span>

                    <ArrowUpRight
                      size={15}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-[#34D399] opacity-100"
                          : "-translate-x-1 translate-y-1 text-white/30 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#34D399] group-hover:opacity-100"
                      }`}
                    />
                  </span>

                  <span className="mt-1.5 block text-xs leading-5 text-white/40 transition-colors duration-300 group-hover:text-white/55">
                    Review course submissions and manage their approval status.
                  </span>
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Page Content */}
      <div key={location.pathname} className="animate-page-enter">
        <Outlet />
      </div>
    </div>
  );
};

export default ApplicationLayout;
