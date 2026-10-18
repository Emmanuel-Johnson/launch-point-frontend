import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  GraduationCap,
  Search,
  BookOpen,
  XCircle,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type ApplicationStatus = "pending" | "approved" | "rejected";
type StatusFilter = "all" | ApplicationStatus;

interface CourseApplication {
  id: number;
  course_title: string;
  instructor_name: string;
  instructor_email: string;
  level: string;
  submitted_at: string;
  status: ApplicationStatus;
}

const APPLICATIONS_PER_PAGE = 5;
const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "pending",
  "approved",
  "rejected",
];

// UI-only sample data. Replace this array with API data when integrating the backend.
const INITIAL_APPLICATIONS: CourseApplication[] = [
  {
    id: 1001,
    course_title: "Python for Beginners",
    instructor_name: "Aarav Menon",
    instructor_email: "aarav.menon@example.com",
    level: "Beginner",
    submitted_at: "2026-10-16T10:30:00Z",
    status: "pending",
  },
  {
    id: 1002,
    course_title: "Modern React with TypeScript",
    instructor_name: "Priya Nair",
    instructor_email: "priya.nair@example.com",
    level: "Intermediate",
    submitted_at: "2026-10-15T08:15:00Z",
    status: "approved",
  },
  {
    id: 1003,
    course_title: "Django REST Framework in Practice",
    instructor_name: "Rahul Das",
    instructor_email: "rahul.das@example.com",
    level: "Advanced",
    submitted_at: "2026-10-14T13:45:00Z",
    status: "pending",
  },
  {
    id: 1004,
    course_title: "SQL and Database Fundamentals",
    instructor_name: "Meera Krishnan",
    instructor_email: "meera.krishnan@example.com",
    level: "Beginner",
    submitted_at: "2026-10-12T09:00:00Z",
    status: "rejected",
  },
  {
    id: 1005,
    course_title: "Building APIs with Python",
    instructor_name: "Arjun Thomas",
    instructor_email: "arjun.thomas@example.com",
    level: "Intermediate",
    submitted_at: "2026-10-11T15:20:00Z",
    status: "approved",
  },
  {
    id: 1006,
    course_title: "JavaScript Essentials",
    instructor_name: "Nisha Varma",
    instructor_email: "nisha.varma@example.com",
    level: "Beginner",
    submitted_at: "2026-10-10T12:10:00Z",
    status: "pending",
  },
  {
    id: 1007,
    course_title: "Advanced CSS and Responsive Design",
    instructor_name: "Vishnu Raj",
    instructor_email: "vishnu.raj@example.com",
    level: "Advanced",
    submitted_at: "2026-10-09T07:40:00Z",
    status: "rejected",
  },
];

const statusConfig: Record<
  ApplicationStatus,
  { label: string; badge: string; dot: string }
> = {
  pending: {
    label: "Pending",
    badge: "bg-amber-400/10 text-amber-400 ring-amber-400/20",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Approved",
    badge: "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20",
    dot: "bg-[#34D399]",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-red-400/10 text-red-400 ring-red-400/20",
    dot: "bg-red-400",
  },
};

const CourseApplicationAdminListPage = () => {
  const navigate = useNavigate();
  const [applications] = useState<CourseApplication[]>(INITIAL_APPLICATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsListRef = useRef<HTMLElement | null>(null);

  const filteredApplications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.course_title.toLowerCase().includes(query) ||
        application.instructor_name.toLowerCase().includes(query) ||
        application.instructor_email.toLowerCase().includes(query) ||
        application.level.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "all" || application.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, searchQuery, statusFilter]);

  const totalPages = Math.ceil(
    filteredApplications.length / APPLICATIONS_PER_PAGE,
  );
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedApplications = useMemo(() => {
    const startIndex = (safePage - 1) * APPLICATIONS_PER_PAGE;
    return filteredApplications.slice(
      startIndex,
      startIndex + APPLICATIONS_PER_PAGE,
    );
  }, [filteredApplications, safePage]);

  const placeholderCount =
    totalPages > 1
      ? Math.max(APPLICATIONS_PER_PAGE - paginatedApplications.length, 0)
      : 0;
  const totalCount = applications.length;
  const pendingCount = applications.filter(
    (item) => item.status === "pending",
  ).length;
  const approvedCount = applications.filter(
    (item) => item.status === "approved",
  ).length;
  const rejectedCount = applications.filter(
    (item) => item.status === "rejected",
  ).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const truncateText = (text: string, maxLength = 35) =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength - 3)}...`;

  const openApplication = (applicationId: number) => {
    navigate(`/admin/applications/courses/${applicationId}`);
  };

  const scrollToApplicationsList = () => {
    applicationsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(scrollToApplicationsList, 0);
  };

  const startItem = filteredApplications.length
    ? (safePage - 1) * APPLICATIONS_PER_PAGE + 1
    : 0;
  const endItem = Math.min(
    safePage * APPLICATIONS_PER_PAGE,
    filteredApplications.length,
  );

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* Header */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "80ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] p-7 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.06] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
            />
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Course Applications
                </h1>
                <p className="mt-1 text-sm text-white/50">
                  Review course submissions and manage their approval status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Applications"
            value={totalCount}
            icon={<GraduationCap className="h-5 w-5" />}
            accent="green"
            delay="160ms"
          />
          <StatCard
            label="Pending"
            value={pendingCount}
            icon={<Clock3 className="h-5 w-5" />}
            accent="amber"
            delay="220ms"
          />
          <StatCard
            label="Approved"
            value={approvedCount}
            icon={<CheckCircle2 className="h-5 w-5" />}
            accent="green"
            delay="280ms"
          />
          <StatCard
            label="Rejected"
            value={rejectedCount}
            icon={<XCircle className="h-5 w-5" />}
            accent="red"
            delay="340ms"
          />
        </section>

        {/* Applications Table */}
        <section
          ref={applicationsListRef}
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "420ms" }}
        >
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                All Course Applications
              </h2>
              <p className="mt-1 text-xs text-white/45">
                Review course details, instructor information, and submission
                status.
              </p>
            </div>
            <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row md:justify-end">
              <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setStatusFilter(filter);
                      setCurrentPage(1);
                    }}
                    className={`h-8 rounded-lg px-3 text-xs font-medium capitalize transition-all ${
                      statusFilter === filter
                        ? filter === "approved"
                          ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                          : filter === "pending"
                            ? "bg-amber-400/10 text-amber-400 ring-1 ring-inset ring-amber-400/20"
                            : filter === "rejected"
                              ? "bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20"
                              : "bg-white/[0.08] text-white"
                        : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
              <div className="relative min-w-0 flex-1 md:max-w-sm">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                  strokeWidth={1.8}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search courses or instructors..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1040px] table-fixed">
              <thead className="cursor-default">
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                  <th className="w-[30%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Course
                  </th>
                  <th className="w-[23%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Instructor
                  </th>
                  <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Level
                  </th>
                  <th className="w-[15%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Submitted
                  </th>
                  <th className="w-[10%] px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Status
                  </th>
                  <th className="w-[10%] px-4 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedApplications.map((application) => {
                  const status = statusConfig[application.status];
                  return (
                    <tr
                      key={application.id}
                      onClick={() => openApplication(application.id)}
                      className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                            <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-medium text-white"
                              title={application.course_title}
                            >
                              {truncateText(application.course_title, 32)}
                            </p>
                            <p className="mt-0.5 text-xs tabular-nums text-white/35">
                              Application ID: {application.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-xs font-semibold text-white/65 ring-1 ring-inset ring-white/[0.08]">
                            {getInitials(application.instructor_name)}
                          </div>
                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-medium text-white/80"
                              title={application.instructor_name}
                            >
                              {application.instructor_name}
                            </p>
                            <p
                              className="truncate text-xs text-white/35"
                              title={application.instructor_email}
                            >
                              {application.instructor_email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60">
                          {application.level}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                          <CalendarDays className="h-4 w-4 shrink-0 text-white/30" />
                          <span className="truncate">
                            {formatDate(application.submitted_at)}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <span
                          className={`inline-flex h-7 min-w-[76px] items-center justify-center gap-1.5 rounded-full px-2 text-[11px] font-medium ring-1 ring-inset ${status.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openApplication(application.id);
                            }}
                            aria-label={`View ${application.course_title} application`}
                            className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 text-xs font-medium text-white/60 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                          >
                            <Eye className="h-4 w-4" strokeWidth={1.8} />
                            View
                            <ArrowUpRight
                              className="h-3.5 w-3.5"
                              strokeWidth={1.8}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {Array.from({ length: placeholderCount }).map((_, index) => (
                  <tr
                    key={`placeholder-${index}`}
                    aria-hidden="true"
                    className="border-b border-white/[0.03]"
                  >
                    <td className="px-6 py-4">
                      <div className="h-11" />
                    </td>
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
                    <td className="px-4 py-4" />
                    <td className="px-4 py-4" />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-white/[0.06] md:hidden">
            {paginatedApplications.map((application) => {
              const status = statusConfig[application.status];
              return (
                <article
                  key={application.id}
                  className="p-4 transition-colors hover:bg-[#34D399]/[0.03]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">
                        {application.course_title}
                      </p>
                      <p className="mt-1 text-xs text-white/40">
                        {application.instructor_name} · ID: {application.id}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55">
                          {application.level}
                        </span>
                        <span
                          className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium ring-1 ring-inset ${status.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {formatDate(application.submitted_at)}
                        </span>
                        <button
                          type="button"
                          onClick={() => openApplication(application.id)}
                          className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 text-xs font-medium text-white/65 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredApplications.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                No course applications found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-white/40">
                {statusFilter !== "all"
                  ? `There are currently no ${statusFilter} course applications.`
                  : searchQuery
                    ? "No applications match your search. Try a different course, instructor, category, or level."
                    : "No course applications are available yet."}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredApplications.length > 0 && totalPages > 1 && (
            <div className="flex cursor-default flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/40">
                Showing{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {startItem}
                </span>{" "}
                to{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {endItem}
                </span>{" "}
                of{" "}
                <span className="font-medium tabular-nums text-white/70">
                  {filteredApplications.length}
                </span>{" "}
                applications
              </p>
              <div className="flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(safePage - 1, 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${safePage === page ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20" : "text-white/45 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(safePage + 1, totalPages))
                  }
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon,
  accent = "neutral",
  delay = "160ms",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent?: "neutral" | "green" | "red" | "amber";
  delay?: string;
}) => {
  const styles = {
    neutral: {
      border: "border-white/[0.08]",
      text: "text-white",
      icon: "bg-white/[0.04] text-white/60",
      glow: "via-white/[0.12]",
    },
    green: {
      border: "border-[#34D399]/25",
      text: "text-[#34D399]",
      icon: "bg-[#34D399]/10 text-[#34D399]",
      glow: "via-[#34D399]/50",
    },
    red: {
      border: "border-red-400/20",
      text: "text-red-400",
      icon: "bg-red-400/10 text-red-400",
      glow: "via-red-400/40",
    },
    amber: {
      border: "border-amber-400/20",
      text: "text-amber-400",
      icon: "bg-amber-400/10 text-amber-400",
      glow: "via-amber-400/40",
    },
  }[accent];

  return (
    <div
      className={`animate-page-item group relative overflow-hidden rounded-2xl border ${styles.border} bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]`}
      style={{ animationDelay: delay }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${styles.glow} to-transparent`}
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/45">
            {label}
          </p>
          <p
            className={`mt-3 text-3xl font-semibold tabular-nums ${styles.text}`}
          >
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${styles.icon}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default CourseApplicationAdminListPage;
