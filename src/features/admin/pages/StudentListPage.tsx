import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Mail,
  Search,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStudents } from "../api/adminApi";

interface Student {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  date_joined: string;
  is_active: boolean;
}

const STUDENTS_PER_PAGE = 10;

const StudentListPage = () => {
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsListRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await getAdminStudents();
        setStudentList(students);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return studentList.filter((student) => {
      const matchesSearch =
        !query ||
        student.full_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && student.is_active) ||
        (statusFilter === "inactive" && !student.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, studentList]);

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * STUDENTS_PER_PAGE;
    const endIndex = startIndex + STUDENTS_PER_PAGE;

    return filteredStudents.slice(startIndex, endIndex);
  }, [filteredStudents, currentPage]);

  // Reserve the height of a full page so the layout below (pagination,
  // page edges) never shifts when the last page has fewer rows. Only kicks
  // in while pagination is active, so single-page searches stay natural.
  const placeholderCount =
    totalPages > 1
      ? Math.max(STUDENTS_PER_PAGE - paginatedStudents.length, 0)
      : 0;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const isDefaultProfileImage = (profileImage: string | null) => {
    if (!profileImage) {
      return true;
    }

    return profileImage.includes("default_profile.png");
  };

  const truncateText = (text: string, maxLength = 35) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength - 3)}...`;
  };

  const MEDIA_BASE_URL = "http://127.0.0.1:8000";

  const handleToggleStatus = (studentId: number) => {
    setStudentList((currentStudents) =>
      currentStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              is_active: !student.is_active,
            }
          : student,
      ),
    );
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const scrollToStudentsList = () => {
    studentsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.max(page - 1, 1);

      if (nextPage !== page) {
        setTimeout(scrollToStudentsList, 0);
      }

      return nextPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.min(page + 1, totalPages);

      if (nextPage !== page) {
        setTimeout(scrollToStudentsList, 0);
      }

      return nextPage;
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    setTimeout(scrollToStudentsList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  };

  const startItem =
    filteredStudents.length === 0
      ? 0
      : (currentPage - 1) * STUDENTS_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * STUDENTS_PER_PAGE,
    filteredStudents.length,
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

            <div className="relative cursor-default">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#34D399]/25">
                  <Users className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <div>
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Students
                  </h1>

                  <p className="mt-1 text-sm text-white/50">
                    Manage and view all registered students.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Students */}
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
                  Total Students
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {studentList.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <Users className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Active Students */}
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
                  Active Students
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-[#34D399]">
                  {studentList.filter((student) => student.is_active).length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <UserCheck className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Inactive Students */}
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
                  Inactive Students
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-red-400">
                  {studentList.filter((student) => !student.is_active).length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20">
                <UserCheck className="h-5 w-5" strokeWidth={1.8} />
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
                  {filteredStudents.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                <Search className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Student Table */}
        <section
          ref={studentsListRef}
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "420ms" }}
        >
          {" "}
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div className="cursor-default">
              <h2 className="text-lg font-semibold tracking-tight">
                All Students
              </h2>

              <p className="mt-1 text-xs text-white/45">
                View and manage registered student accounts.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
              {/* Status Filter */}
              <div className="flex h-10 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {(["all", "active", "inactive"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => {
                      setStatusFilter(filter);
                      setCurrentPage(1);
                    }}
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
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-white/35"
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearchChange(event.target.value)}
                  placeholder="Search students..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </div>
          {/* Desktop Table */}
          {isLoading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#34D399]"
                aria-label="Loading students"
              />
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">
                {/* table-fixed + explicit column widths keep every column in the
                exact same position across pages, regardless of cell content. */}
                <table className="w-full table-fixed">
                  <thead className="cursor-default">
                    <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                      <th className="w-[26%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Student
                      </th>

                      <th className="w-[30%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Email
                      </th>

                      <th className="w-[16%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Joined
                      </th>

                      <th className="w-[14%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Status
                      </th>

                      {/* "Action" label aligned to the start (left edge) of the
                      action button that sits below it. */}
                      <th className="w-[14%] px-6 py-4">
                        <div className="flex justify-end">
                          <span className="w-28 text-left text-[11px] font-semibold uppercase tracking-wider text-white/35">
                            Action
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedStudents.map((student, index) => (
                      <tr
                        key={`${student.id}-${index}`}
                        onClick={() =>
                          navigate(`/admin/students/${student.id}`)
                        }
                        className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                      >
                        {/* Student */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {!isDefaultProfileImage(student.profile_image) ? (
                              <img
                                src={`${MEDIA_BASE_URL}${student.profile_image}`}
                                alt={student.full_name}
                                className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-white/10"
                              />
                            ) : (
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-semibold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                                {getInitials(student.full_name)}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p
                                className="truncate text-sm font-medium text-white"
                                title={student.full_name}
                              >
                                {truncateText(student.full_name)}
                              </p>

                              <p className="mt-0.5 text-xs tabular-nums text-white/35">
                                ID #{student.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Mail className="h-4 w-4 shrink-0 text-white/30" />

                            <span className="truncate" title={student.email}>
                              {truncateText(student.email)}
                            </span>
                          </div>
                        </td>

                        {/* Joined */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                            <CalendarDays className="h-4 w-4 shrink-0 text-white/30" />

                            <span className="truncate">
                              {formatDate(student.date_joined)}
                            </span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex h-7 w-20 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
                              student.is_active
                                ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                                : "bg-red-400/10 text-red-400 ring-red-400/20"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                student.is_active
                                  ? "bg-[#34D399]"
                                  : "bg-red-400"
                              }`}
                            />

                            {student.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleToggleStatus(student.id);
                            }}
                            className={`inline-flex h-9 w-28 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-700 ease-out hover:scale-[1.03] ${
                              student.is_active
                                ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                                : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                            }`}
                          >
                            {student.is_active ? "Deactivate" : "Activate"}
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* Height-reserving placeholder rows keep the page structure
                    fixed when the last page is partially filled. */}
                    {Array.from({ length: placeholderCount }).map(
                      (_, index) => (
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
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {filteredStudents.length > 0 && totalPages > 1 && (
                <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between cursor-default">
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
                      {filteredStudents.length}
                    </span>{" "}
                    students
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
              {filteredStudents.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                    <Users className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-sm font-medium text-white">
                    No students found
                  </h3>

                  <p className="mt-1 text-xs text-white/40">
                    {statusFilter === "active"
                      ? "There are currently no active students."
                      : statusFilter === "inactive"
                        ? "There are currently no inactive students."
                        : searchQuery
                          ? "No students match your search. Try a different name or email."
                          : "No registered students are available."}
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default StudentListPage;
