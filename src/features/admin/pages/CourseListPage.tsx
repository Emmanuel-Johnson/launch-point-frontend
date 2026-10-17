import {
  Ban,
  BookOpen,
  CheckCircle2,
  Crown,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Search,
  SlidersHorizontal,
  Tags,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type CourseStatus = "active" | "inactive";
type CourseAccess = "free" | "premium";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  level: string;
  accessType: CourseAccess;
  students: number;
  status: CourseStatus;
}

type StatusFilter = "all" | CourseStatus;

const COURSES_PER_PAGE = 5;

const INITIAL_COURSES: Course[] = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "Alex Johnson",
    category: "Web Development",
    level: "Beginner",
    accessType: "premium",
    students: 124,
    status: "active",
  },
  {
    id: 2,
    title: "Python Programming Masterclass",
    instructor: "Sarah Williams",
    category: "Programming",
    level: "Beginner",
    accessType: "free",
    students: 86,
    status: "active",
  },
  {
    id: 3,
    title: "Advanced React and TypeScript",
    instructor: "David Miller",
    category: "Web Development",
    level: "Advanced",
    accessType: "premium",
    students: 52,
    status: "active",
  },
  {
    id: 4,
    title: "Django REST Framework",
    instructor: "Michael Brown",
    category: "Backend Development",
    level: "Intermediate",
    accessType: "premium",
    students: 67,
    status: "inactive",
  },
  {
    id: 5,
    title: "SQL and Database Design",
    instructor: "Emma Wilson",
    category: "Database",
    level: "Intermediate",
    accessType: "free",
    students: 93,
    status: "active",
  },
  {
    id: 6,
    title: "Data Structures and Algorithms",
    instructor: "Daniel Thomas",
    category: "Computer Science",
    level: "Advanced",
    accessType: "premium",
    students: 148,
    status: "active",
  },
  {
    id: 7,
    title: "UI/UX Design Fundamentals",
    instructor: "Olivia Martin",
    category: "Design",
    level: "Beginner",
    accessType: "free",
    students: 41,
    status: "inactive",
  },
];

const CourseListPage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesListRef = useRef<HTMLElement | null>(null);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.level.toLowerCase().includes(query) ||
        course.accessType.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, courses]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * COURSES_PER_PAGE;
    const endIndex = startIndex + COURSES_PER_PAGE;

    return filteredCourses.slice(startIndex, endIndex);
  }, [filteredCourses, currentPage]);

  // Reserve the height of a full page so the layout below (pagination,
  // page edges) never shifts when the last page has fewer rows. Only kicks
  // in while pagination is active, so single-page searches stay natural.
  const placeholderCount =
    totalPages > 1
      ? Math.max(COURSES_PER_PAGE - paginatedCourses.length, 0)
      : 0;

  const totalCount = courses.length;
  const activeCount = courses.filter((c) => c.status === "active").length;
  const inactiveCount = totalCount - activeCount;

  const updateStatus = (id: number) => {
    const course = courses.find((item) => item.id === id);

    if (!course) return;

    const action = course.status === "active" ? "disable" : "enable";

    if (
      !window.confirm(`Are you sure you want to ${action} "${course.title}"?`)
    ) {
      return;
    }

    setCourses((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "active" ? "inactive" : "active",
            }
          : item,
      ),
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const scrollToCoursesList = () => {
    coursesListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.max(page - 1, 1);

      if (nextPage !== page) {
        setTimeout(scrollToCoursesList, 0);
      }

      return nextPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.min(page + 1, totalPages);

      if (nextPage !== page) {
        setTimeout(scrollToCoursesList, 0);
      }

      return nextPage;
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    setTimeout(scrollToCoursesList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  };

  const startItem =
    filteredCourses.length === 0 ? 0 : (currentPage - 1) * COURSES_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * COURSES_PER_PAGE,
    filteredCourses.length,
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

            <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 cursor-default">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#34D399]/25">
                  <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Courses
                  </h1>

                  <p className="mt-1 text-sm text-white/50">
                    View and manage courses across Launch Point LMS.
                  </p>
                </div>
              </div>

              {/* Management shortcuts */}
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Level Management */}
                <button
                  type="button"
                  onClick={() => navigate("/admin/course-levels")}
                  className="group relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-4 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <SlidersHorizontal
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={2}
                  />

                  <span className="relative z-10">Level Management</span>
                </button>

                {/* Skill Management */}
                <button
                  type="button"
                  onClick={() => navigate("/admin/skills")}
                  className="group relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 text-sm font-medium text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#34D399]/[0.06] hover:text-[#34D399] hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.25)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <Tags
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={2}
                  />

                  <span className="relative z-10">Skill Management</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Courses */}
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
                  Total Courses
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {totalCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-[#34D399]/25 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-[#34D399]/40"
            style={{ animationDelay: "220ms" }}
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
                  Active
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-[#34D399]">
                  {activeCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Inactive Courses */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-red-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-red-400/35"
            style={{ animationDelay: "280ms" }}
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
                  Inactive
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-red-400">
                  {inactiveCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20">
                <Ban className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Showing */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
            style={{ animationDelay: "340ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Showing
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {filteredCourses.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                <Search className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Course Table */}
        <section
          ref={coursesListRef}
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "420ms" }}
        >
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div className="cursor-default">
              <h2 className="text-lg font-semibold tracking-tight">
                All Courses
              </h2>

              <p className="mt-1 text-xs text-white/45">
                Browse courses, instructors, levels and access type.
              </p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row">
              {/* Status Filter */}
              <div className="flex h-10 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {(["all", "active", "inactive"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterChange(filter)}
                    className={`h-8 w-20 rounded-lg text-xs font-medium capitalize transition-all ${
                      statusFilter === filter
                        ? filter === "active"
                          ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                          : filter === "inactive"
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
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-white/35"
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search courses..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {/* table-fixed + explicit column widths keep every column in the
            exact same position across pages, regardless of cell content. */}
            <table className="w-full min-w-[960px] table-fixed">
              <thead className="cursor-default">
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                  <th className="w-[24%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Course
                  </th>

                  <th className="w-[16%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Instructor
                  </th>

                  <th className="w-[18%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Category / Level
                  </th>

                  <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Access
                  </th>

                  <th className="w-[14%] px-4 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                    Status
                  </th>

                  {/* "Action" label aligned to the right, above the action
                  control (toggle) that sits below it. */}
                  <th className="w-[12%] px-4 py-4">
                    <div className="flex justify-start">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Action
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedCourses.map((course) => (
                  <tr
                    key={course.id}
                    onClick={() => navigate(`/admin/courses/${course.id}`)}
                    className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04]"
                  >
                    {/* Course */}
                    <td className="relative px-6 py-4">
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[#34D399] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      />

                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                          <GraduationCap
                            className="h-5 w-5"
                            strokeWidth={1.8}
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            className="truncate text-sm font-medium text-white"
                            title={course.title}
                          >
                            {course.title}
                          </p>

                          <p className="mt-0.5 text-xs tabular-nums text-white/35">
                            ID: {course.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="px-6 py-4">
                      <p
                        className="truncate text-sm text-white/65"
                        title={course.instructor}
                      >
                        {course.instructor}
                      </p>
                    </td>

                    {/* Category / Level */}
                    <td className="px-6 py-4">
                      <p
                        className="truncate text-sm text-white/65"
                        title={course.category}
                      >
                        {course.category}
                      </p>

                      <p className="mt-0.5 text-xs text-white/35">
                        {course.level}
                      </p>
                    </td>

                    {/* Access */}
                    <td className="px-6 py-4">
                      <AccessPill accessType={course.accessType} />
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <StatusPill isActive={course.status === "active"} />
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-start gap-2">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            updateStatus(course.id);
                          }}
                          className={`inline-flex h-9 w-28 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-700 ease-out hover:scale-[1.03] ${
                            course.status === "active"
                              ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                              : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                          }`}
                        >
                          {course.status === "active" ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {/* Height-reserving placeholder rows keep the page structure
                fixed when the last page is partially filled. */}
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

          {/* Pagination */}
          {filteredCourses.length > 0 && totalPages > 1 && (
            <div className="flex cursor-default flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Showing range */}
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
                  {filteredCourses.length}
                </span>{" "}
                courses
              </p>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
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
                      currentPage === page
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
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                <BookOpen className="h-6 w-6" />
              </div>

              <h3 className="mt-4 text-sm font-medium text-white">
                No courses found
              </h3>

              <p className="mt-1 text-xs text-white/40">
                {statusFilter === "active"
                  ? "There are currently no active courses."
                  : statusFilter === "inactive"
                    ? "There are currently no inactive courses."
                    : searchQuery
                      ? "No courses match your search. Try a different term."
                      : "No courses are available yet."}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const AccessPill = ({ accessType }: { accessType: CourseAccess }) => {
  const isPremium = accessType === "premium";

  return (
    <span
      className={`inline-flex h-7 w-20 items-center justify-center gap-1 rounded-full border text-[11px] font-medium ${
        isPremium
          ? "border-[#E8C67A]/25 bg-[#E8C67A]/10 text-[#E8C67A]"
          : "border-slate-400/20 bg-slate-400/10 text-slate-300"
      }`}
    >
      {isPremium && <Crown size={12} />}
      {isPremium ? "Premium" : "Free"}
    </span>
  );
};

const StatusPill = ({ isActive }: { isActive: boolean }) => (
  <span
    className={`inline-flex h-7 w-20 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
      isActive
        ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
        : "bg-red-400/10 text-red-400 ring-red-400/20"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        isActive ? "bg-[#34D399]" : "bg-red-400"
      }`}
    />
    {isActive ? "Active" : "Inactive"}
  </span>
);

export default CourseListPage;
