import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  GraduationCap,
  Search,
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

  // Keep table height consistent when pagination is active.
  const placeholderCount =
    totalPages > 1
      ? Math.max(APPLICATIONS_PER_PAGE - paginatedApplications.length, 0)
      : 0;

  const totalCount = applications.length;

  const pendingCount = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const approvedCount = applications.filter(
    (application) => application.status === "approved",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "rejected",
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page === safePage) return;

    setCurrentPage(page);
    setTimeout(scrollToApplicationsList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
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
        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Applications */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
            style={{ animationDelay: "160ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Total Applications
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {totalCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-amber-400/35"
            style={{ animationDelay: "220ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.06] blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Pending
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-amber-400">
                  {pendingCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 ring-1 ring-inset ring-amber-400/20">
                <Clock3 className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Approved */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-[#34D399]/25 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-[#34D399]/40"
            style={{ animationDelay: "280ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#34D399]/[0.08] blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Approved
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-[#34D399]">
                  {approvedCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-red-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-red-400/35"
            style={{ animationDelay: "340ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-400/[0.06] blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Rejected
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-red-400">
                  {rejectedCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20">
                <XCircle className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Course Applications Table */}
        <section
          ref={applicationsListRef}
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "420ms" }}
        >
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div className="cursor-default">
              <h2 className="text-lg font-semibold tracking-tight">
                All Course Applications
              </h2>

              <p className="mt-1 text-xs text-white/45">
                Review course details, instructor information, and submission
                status.
              </p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row">
              {/* Status Filter */}
              <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {STATUS_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleStatusChange(filter)}
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

              {/* Search */}
              <div className="relative min-w-0 flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search courses or instructors..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full table-fixed">
              <thead className="cursor-default">
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                  <th className="w-[26%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Course
                  </th>

                  <th className="w-[22%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Instructor
                  </th>

                  <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Level
                  </th>

                  <th className="w-[16%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Submitted
                  </th>

                  <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Status
                  </th>

                  <th className="w-[12%] px-6 py-4">
                    <div className="flex justify-end">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Action
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedApplications.map((application, index) => {
                  const status = statusConfig[application.status];

                  return (
                    <tr
                      key={`${application.id}-${index}`}
                      onClick={() => openApplication(application.id)}
                      className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                    >
                      {/* Course */}
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
                              {truncateText(application.course_title, 28)}
                            </p>

                            <p
                              className="mt-0.5 truncate text-xs text-white/35"
                              title={`Application ID: ${application.id}`}
                            >
                              ID: {application.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-6 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-xs font-semibold text-white/65 ring-1 ring-inset ring-white/[0.08]">
                            {getInitials(application.instructor_name)}
                          </div>

                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-medium text-white"
                              title={application.instructor_name}
                            >
                              {truncateText(application.instructor_name, 20)}
                            </p>

                            <p
                              className="mt-0.5 truncate text-xs text-white/35"
                              title={application.instructor_email}
                            >
                              {application.instructor_email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Level */}
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/60">
                          {application.level}
                        </span>
                      </td>

                      {/* Submitted */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                          <CalendarDays className="h-4 w-4 shrink-0 text-white/30" />

                          <span className="truncate">
                            {formatDate(application.submitted_at)}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex h-7 w-24 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${status.badge}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />

                          {status.label}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4">
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openApplication(application.id);
                            }}
                            aria-label={`View ${application.course_title} application`}
                            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-xs font-medium text-white/60 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
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

                {/* Placeholder rows keep table height consistent across pages. */}
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
                    <td className="px-6 py-4" />
                    <td className="px-6 py-4" />
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

                      <p className="mt-1 truncate text-xs text-white/40">
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
                          className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 text-xs font-medium text-white/65 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
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
                    ? "No applications match your search. Try a different course, instructor, or level."
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
                {/* Previous */}
                <button
                  type="button"
                  onClick={() => handlePageChange(Math.max(safePage - 1, 1))}
                  disabled={safePage === 1}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                      safePage === page
                        ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(Math.min(safePage + 1, totalPages))
                  }
                  disabled={safePage === totalPages}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                  aria-label="Next page"
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

export default CourseApplicationAdminListPage;
