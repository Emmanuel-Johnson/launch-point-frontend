import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BookOpen, GraduationCap, ArrowUpRight } from "lucide-react";

const ApplicationLayout = () => {
  const location = useLocation();

  return (
    <div className="min-w-0 space-y-6">
      {/* Application Navigation */}
      <div className="relative isolate overflow-hidden rounded-2xl border border-white/[0.08] bg-[#090B0A]">
        {/* Ambient Background Lighting */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-20 -top-24 h-48 w-48 rounded-full bg-[#34D399]/[0.035] blur-3xl" />
          <div className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#34D399]/[0.025] blur-3xl" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Instructor Applications */}
          <NavLink
            to="/admin/applications/instructors"
            className={({ isActive }) =>
              `group relative flex min-h-[120px] min-w-0 items-start gap-4 overflow-hidden p-4 transition-colors duration-300 sm:p-5 ${
                isActive ? "bg-[#34D399]/[0.045]" : "hover:bg-white/[0.025]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-100"
                      : "bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Active Glow */}
                <span
                  className={`pointer-events-none absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34D399]/[0.08] blur-2xl transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* One-Time Left-to-Right Shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 z-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent opacity-0 group-hover:animate-[application-shimmer_800ms_ease-out_1] group-hover:opacity-100"
                  style={{
                    animationFillMode: "none",
                  }}
                />

                {/* Icon Container */}
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#34D399]/25 bg-[#34D399]/[0.10] text-[#34D399] shadow-[0_0_24px_rgba(52,211,153,0.07)]"
                      : "border-white/[0.08] bg-white/[0.025] text-white/45 group-hover:border-[#34D399]/20 group-hover:bg-[#34D399]/[0.06] group-hover:text-[#34D399]"
                  }`}
                >
                  <GraduationCap
                    size={21}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                {/* Text Content */}
                <span className="relative z-10 flex min-w-0 flex-1 flex-col self-center">
                  <span className="flex min-w-0 items-center justify-between gap-3">
                    <span
                      className={`text-sm font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      Instructor Applications
                    </span>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 translate-y-0 text-[#34D399] opacity-100"
                          : "-translate-x-1 translate-y-1 text-white/25 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#34D399] group-hover:opacity-100"
                      }`}
                    />
                  </span>

                  <span className="mt-1.5 max-w-[280px] text-xs leading-[1.7] text-white/40 transition-colors duration-300 group-hover:text-white/55">
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
              `group relative flex min-h-[120px] min-w-0 items-start gap-4 overflow-hidden border-t border-white/[0.07] p-4 transition-colors duration-300 sm:border-l sm:border-t-0 sm:p-5 ${
                isActive ? "bg-[#34D399]/[0.045]" : "hover:bg-white/[0.025]"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator */}
                <span
                  className={`absolute inset-x-0 top-0 h-[2px] transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-transparent via-[#34D399] to-transparent opacity-100"
                      : "bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Active Glow */}
                <span
                  className={`pointer-events-none absolute left-1/2 top-0 h-20 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34D399]/[0.08] blur-2xl transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* One-Time Left-to-Right Shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 z-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent opacity-0 group-hover:animate-[application-shimmer_800ms_ease-out_1] group-hover:opacity-100"
                  style={{
                    animationFillMode: "none",
                  }}
                />

                {/* Icon Container */}
                <span
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "border-[#34D399]/25 bg-[#34D399]/[0.10] text-[#34D399] shadow-[0_0_24px_rgba(52,211,153,0.07)]"
                      : "border-white/[0.08] bg-white/[0.025] text-white/45 group-hover:border-[#34D399]/20 group-hover:bg-[#34D399]/[0.06] group-hover:text-[#34D399]"
                  }`}
                >
                  <BookOpen
                    size={20}
                    strokeWidth={1.7}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </span>

                {/* Text Content */}
                <span className="relative z-10 flex min-w-0 flex-1 flex-col self-center">
                  <span className="flex min-w-0 items-center justify-between gap-3">
                    <span
                      className={`text-sm font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-white/75 group-hover:text-white"
                      }`}
                    >
                      Course Applications
                    </span>

                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.8}
                      className={`shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 translate-y-0 text-[#34D399] opacity-100"
                          : "-translate-x-1 translate-y-1 text-white/25 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[#34D399] group-hover:opacity-100"
                      }`}
                    />
                  </span>

                  <span className="mt-1.5 max-w-[280px] text-xs leading-[1.7] text-white/40 transition-colors duration-300 group-hover:text-white/55">
                    Review course submissions and manage their approval status.
                  </span>
                </span>
              </>
            )}
          </NavLink>
        </div>
      </div>

      {/* Page Content */}
      <div key={location.pathname} className="animate-page-enter min-w-0">
        <Outlet />
      </div>

      {/* Shimmer Animation */}
      <style>
        {`
          @keyframes application-shimmer {
            0% {
              transform: translateX(-100%) skewX(-20deg);
              opacity: 0;
            }

            10% {
              opacity: 1;
            }

            90% {
              opacity: 1;
            }

            100% {
              transform: translateX(200%) skewX(-20deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ApplicationLayout;
