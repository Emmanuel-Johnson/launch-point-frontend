import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Layers,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type ApplicationStatus = "pending" | "approved" | "rejected";

interface Application {
  id: number;
  categories: string[];
  submitted_at: string;
  status: ApplicationStatus;
}

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

/*
 * Sample data
 * Replace this with your API data later.
 */
const applications: Application[] = [
  {
    id: 1,
    categories: ["Python", "Django", "Web Development"],
    submitted_at: "October 7, 2026",
    status: "pending",
  },
  {
    id: 2,
    categories: ["React", "TypeScript", "Frontend Development"],
    submitted_at: "September 12, 2026",
    status: "approved",
  },
  {
    id: 3,
    categories: ["Python", "Machine Learning", "Data Science"],
    submitted_at: "August 20, 2026",
    status: "rejected",
  },
];

const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        icon: CheckCircle2,
        className: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
        accent: "from-emerald-400/80 to-emerald-500/30",
      };

    case "rejected":
      return {
        label: "Rejected",
        icon: XCircle,
        className: "border-red-400/25 bg-red-500/10 text-red-300",
        accent: "from-red-400/80 to-red-500/30",
      };

    default:
      return {
        label: "Pending",
        icon: Clock3,
        className: "border-amber-400/25 bg-amber-500/10 text-amber-300",
        accent: "from-amber-400/80 to-amber-500/30",
      };
  }
};

const InstructorApplicationListPage = () => {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-zinc-100">
      {/* Header — full black, lifted above the ambient glows */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#0A0E1A]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Back button + Logo */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              to="/instructor"
              aria-label="Back to student dashboard"
              className="group flex shrink-0 items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>

            <BrandLogo />
          </div>
        </div>
      </header>

      {/* Ambient blue backdrop (sits below the header) */}
      <div className="pointer-events-none absolute inset-x-0 top-20 h-[520px] bg-[radial-gradient(120%_100%_at_50%_-20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-60 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Main Content */}
      <section className="relative px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-white">My </span>
              <span className="bg-gradient-to-r from-[#DBEAFE] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent">
                Applications
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-400">
              View your applied applications and track their status.
            </p>
          </div>

          {/* Applications */}
          {applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((application, index) => {
                const status = getStatusConfig(application.status);
                const StatusIcon = status.icon;

                // Descending numbering: latest-added carries the highest (last)
                // number, counting down to #01 for the oldest.
                const number = applications.length - index;
                const numberLabel = String(number).padStart(2, "0");

                return (
                  <article
                    key={application.id}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.07] via-white/[0.02] to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:border-blue-400/35 hover:shadow-[0_0_45px_-16px_rgba(59,130,246,0.7)]"
                  >
                    {/* Status accent bar */}
                    <div
                      className={`pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b ${status.accent}`}
                    />

                    {/* Ambient hover glow */}
                    <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-blue-500/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative p-5 sm:p-6">
                      {/* Top row */}
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* Left Content */}
                        <div className="flex min-w-0 items-start gap-4">
                          {/* Number tile */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-blue-600/5 text-base font-semibold text-blue-200 shadow-[0_0_20px_-8px_rgba(59,130,246,0.7)] transition-all duration-300 group-hover:border-blue-400/40 group-hover:text-blue-100">
                            {numberLabel}
                          </div>

                          <div className="min-w-0">
                            {/* Title */}
                            <h2 className="text-base font-semibold text-white sm:text-lg">
                              Application{" "}
                            </h2>

                            {/* Meta: date + category count */}
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400">
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-blue-300/70" />
                                Submitted {application.submitted_at}
                              </span>

                              <span className="hidden h-3 w-px bg-white/10 sm:block" />

                              <span className="inline-flex items-center gap-1.5">
                                <Layers className="h-3.5 w-3.5 shrink-0 text-blue-300/70" />
                                {application.categories.length}{" "}
                                {application.categories.length === 1
                                  ? "category"
                                  : "categories"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right Side — status + View Details on one line */}
                        <div className="flex shrink-0 items-center gap-3">
                          {/* Uniform status pill */}
                          <span
                            className={`inline-flex h-9 w-32 items-center justify-center gap-1.5 rounded-full border text-xs font-medium ${status.className}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/instructor/applications/${application.id}`,
                              )
                            }
                            className="flex h-9 cursor-pointer items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-b from-blue-500/90 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 ring-1 ring-inset ring-white/10 transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-[0_8px_30px_-10px_rgba(59,130,246,0.8)] active:scale-[0.98]"
                          >
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Categories — labeled footer strip */}
                      <div className="mt-5 border-t border-white/[0.06] pt-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200/70">
                            Areas applied to teach
                          </span>
                          <span className="h-px flex-1 bg-gradient-to-r from-blue-400/20 to-transparent" />
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {application.categories.map((category) => (
                            <span
                              key={category}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-blue-400/15 bg-blue-500/[0.08] px-2.5 py-1.5 text-xs font-medium text-blue-100/90 transition-colors duration-200 group-hover:border-blue-400/30 hover:bg-blue-500/15"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_1px_rgba(59,130,246,0.7)]" />
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="relative overflow-hidden rounded-2xl border border-blue-400/15 bg-gradient-to-b from-blue-500/[0.06] to-transparent px-6 py-16 text-center">
              <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl" />

              <div className="relative">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-blue-300 shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]">
                  <FileText className="h-7 w-7" />
                </div>

                <h2 className="text-lg font-semibold text-white">
                  No applications yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
                  You haven't submitted an instructor application yet. Start
                  your application and take the next step toward becoming an
                  instructor.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/instructor")}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 ring-1 ring-blue-400/30 transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-blue-900/50"
                >
                  Become an Instructor
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default InstructorApplicationListPage;
