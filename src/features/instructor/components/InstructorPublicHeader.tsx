import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import type { InstructorApplication } from "../api/instructorApplicationApi";

/* ---------- Brand logo (matches PublicNavbar, uses instructor png) ---------- */

const BrandLogo = () => (
  <Link
    to="/instructor"
    className="group flex items-center gap-3 transition-all duration-300"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-lg">
      <img
        src="/instructor_logo.png"
        alt="Launch Point Logo"
        className="h-full w-full rounded-lg object-contain"
      />
    </div>

    <div>
      <span className="block text-sm font-semibold tracking-[3px] text-white transition-colors duration-300 group-hover:text-blue-300">
        LAUNCH POINT
      </span>

      <p className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-500 sm:block">
        Study hard. Work hard.
      </p>
    </div>
  </Link>
);

type InstructorPublicHeaderProps = {
  latestApplication: InstructorApplication | null;
  isApplicationLoading: boolean;
  onApply: () => void;
};

/**
 * Shared header for all three instructor public pages (landing, application
 * list, application details). Rendered once from InstructorPublicLayout so it
 * never re-mounts between navigations — the logo and back button keep their
 * exact position and only the content below swaps.
 *
 * The right-side CTA is shown ONLY on the landing page (`/instructor`). On the
 * other pages the right side stays empty, keeping the logo + back button pinned
 * to the left exactly as before.
 */
const InstructorPublicHeader = ({
  latestApplication,
  isApplicationLoading,
  onApply,
}: InstructorPublicHeaderProps) => {
  const { pathname } = useLocation();

  const isLanding = pathname === "/instructor" || pathname === "/instructor/";

  // Any existing application (pending / rejected / approved) → "View Status".
  const hasApplication = latestApplication != null;

  // Back target per page — only the `to` changes, the button never moves.
  const backTo = pathname.startsWith("/instructor/applications/")
    ? "/instructor/applications"
    : pathname === "/instructor/applications"
      ? "/instructor"
      : "/student/dashboard";

  return (
    <header className="relative z-20 border-b border-white/[0.08] bg-[#0A0E1A]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Back button + Logo (identical on every page) */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            to={backTo}
            aria-label="Go back"
            className="group flex shrink-0 items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          </Link>

          <BrandLogo />
        </div>

        {/* Right: Application CTA — landing page only.
            Waits for the status to load, then renders the correct label once
            (no text/color flip): "View Status" if an application exists,
            otherwise "Become an Instructor". */}
        {isLanding &&
          !isApplicationLoading &&
          (hasApplication ? (
            <Link
              to="/instructor/applications"
              className="inline-flex w-52 cursor-pointer items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-1000 ease-in-out hover:scale-105 hover:bg-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]"
            >
              <span className="hidden sm:inline">View Status</span>
              <span className="sm:hidden">Status</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={onApply}
              className="inline-flex w-52 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-1000 ease-in-out hover:scale-105 hover:bg-blue-400 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            >
              <span className="hidden sm:inline">Become an Instructor</span>
              <span className="sm:hidden">Apply</span>
            </button>
          ))}
      </div>
    </header>
  );
};

export default InstructorPublicHeader;
