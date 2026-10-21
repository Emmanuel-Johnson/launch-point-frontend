import {
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Search,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminInstructors,
  updateAdminInstructorStatus,
  type AdminInstructor,
} from "../api/adminInstructorApi";
import { toast } from "react-toastify";
import InstructorStatusConfirmModal from "../components/InstructorStatusConfirmModal";

type Instructor = AdminInstructor;

const ITEMS_PER_PAGE = 5;

const InstructorListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [instructorStatuses, setInstructorStatuses] = useState<
    Record<number, boolean>
  >({});
  const [updatingInstructorIds, setUpdatingInstructorIds] = useState<number[]>(
    [],
  );
  const [statusActionError, setStatusActionError] = useState("");
  const [statusModalInstructor, setStatusModalInstructor] =
    useState<Instructor | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const instructorsListRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const loadInstructors = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await getAdminInstructors();

        if (isMounted) {
          setInstructors(data);

          setInstructorStatuses(
            Object.fromEntries(
              data.map((instructor) => [instructor.id, instructor.is_active]),
            ),
          );
        }
      } catch (requestError) {
        console.error("Failed to load admin instructors:", requestError);

        if (isMounted) {
          setError("Unable to load instructors. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadInstructors();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredInstructors = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return instructors.filter((instructor) => {
      const matchesSearch =
        !query ||
        [
          instructor.full_name,
          instructor.email,
          instructor.occupation ?? "",
          instructor.location ?? "",
          instructor.years_of_experience ?? "",
          ...instructor.categories,
        ].some((value) => value.toLowerCase().includes(query));

      const isActive = instructorStatuses[instructor.id];

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "inactive" && !isActive);

      return matchesSearch && matchesStatus;
    });
  }, [instructors, searchQuery, statusFilter, instructorStatuses]);

  const totalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);

  // Derive the valid page without updating state inside an effect.
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const paginatedInstructors = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredInstructors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInstructors, safeCurrentPage]);

  // Reserve the height of a full page so the layout below (pagination,
  // page edges) never shifts when the last page has fewer rows. Only kicks
  // in while pagination is active, so single-page searches stay natural.
  const placeholderCount =
    totalPages > 1
      ? Math.max(ITEMS_PER_PAGE - paginatedInstructors.length, 0)
      : 0;

  const truncateText = (text: string, maxLength = 35) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength - 3)}...`;
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const scrollToInstructorsList = () => {
    instructorsListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) {
      return;
    }

    setCurrentPage(page);
    setTimeout(scrollToInstructorsList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  };

  const openInstructor = (id: number) => {
    navigate(`/admin/instructors/${id}`);
  };

  const toggleInstructorStatus = async () => {
    if (!statusModalInstructor || isUpdatingStatus) {
      return;
    }

    const instructorId = statusModalInstructor.id;
    const currentStatus = instructorStatuses[instructorId];

    if (currentStatus === undefined) {
      return;
    }

    const nextStatus = !currentStatus;

    setStatusActionError("");
    setIsUpdatingStatus(true);
    setUpdatingInstructorIds((previous) =>
      previous.includes(instructorId) ? previous : [...previous, instructorId],
    );

    try {
      const response = await updateAdminInstructorStatus(
        instructorId,
        nextStatus,
      );

      setInstructorStatuses((previous) => ({
        ...previous,
        [instructorId]: response.is_active,
      }));

      setInstructors((previous) =>
        previous.map((instructor) =>
          instructor.id === instructorId
            ? { ...instructor, is_active: response.is_active }
            : instructor,
        ),
      );

      toast.success(
        `Instructor ${response.is_active ? "activated" : "deactivated"} successfully.`,
        {
          containerId: "admin",
        },
      );
      setStatusModalInstructor(null);
    } catch (requestError) {
      console.error("Failed to update instructor status:", requestError);
      setStatusActionError(
        "Unable to update instructor status. Please try again.",
      );
      toast.error("Failed to update instructor status.", {
        containerId: "admin",
      });
    } finally {
      setIsUpdatingStatus(false);
      setUpdatingInstructorIds((previous) =>
        previous.filter((id) => id !== instructorId),
      );
    }
  };

  // Status counts update automatically when status state changes.
  const activeInstructors = instructors.filter(
    (instructor) => instructorStatuses[instructor.id],
  ).length;

  const inactiveInstructors = instructors.length - activeInstructors;

  const startItem =
    filteredInstructors.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(
    safeCurrentPage * ITEMS_PER_PAGE,
    filteredInstructors.length,
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
                    Instructors
                  </h1>

                  <p className="mt-1 text-sm text-white/50">
                    Manage and view all registered instructors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Instructors"
            value={instructors.length}
            icon={<Users className="h-5 w-5" strokeWidth={1.8} />}
            delay="160ms"
          />

          <StatCard
            title="Active Instructors"
            value={activeInstructors}
            icon={<UserCheck className="h-5 w-5" strokeWidth={1.8} />}
            variant="active"
            delay="220ms"
          />

          <StatCard
            title="Inactive Instructors"
            value={inactiveInstructors}
            icon={<UserX className="h-5 w-5" strokeWidth={1.8} />}
            variant="inactive"
            delay="280ms"
          />

          <StatCard
            title="Matching Results"
            value={filteredInstructors.length}
            icon={<Search className="h-5 w-5" strokeWidth={1.8} />}
            variant="search"
            delay="340ms"
          />
        </section>

        {/* Instructor Table */}
        <section
          ref={instructorsListRef}
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "420ms" }}
        >
          {/* Table Header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div className="cursor-default">
              <h2 className="text-lg font-semibold tracking-tight">
                All Instructors
              </h2>

              <p className="mt-1 text-xs text-white/45">
                View instructor profiles and professional information.
              </p>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row">
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
              <div className="relative min-w-0 flex-1">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-white/35"
                  strokeWidth={1.8}
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search instructors..."
                  aria-label="Search instructors"
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex min-h-[400px] items-center justify-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#34D399]"
                aria-label="Loading instructors"
              />
            </div>
          )}

          {/* Error */}
          {!isLoading && error && (
            <div
              className="px-6 py-12 text-center text-sm text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}

          {statusActionError && (
            <div
              className="mx-5 mt-3 rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400"
              role="alert"
            >
              {statusActionError}
            </div>
          )}

          {!isLoading && !error && (
            <>
              {/* Desktop Table */}
              <div className="overflow-x-auto">
                {/* table-fixed + explicit column widths keep every column in the
                exact same position across pages, regardless of cell content. */}
                <table className="w-full table-fixed">
                  <thead className="cursor-default">
                    <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                      <th className="w-[22%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Instructor
                      </th>

                      <th className="w-[24%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Email
                      </th>

                      <th className="w-[15%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Occupation
                      </th>

                      <th className="w-[13%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                        Experience
                      </th>

                      <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
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
                    {paginatedInstructors.map((instructor) => {
                      const isActive = instructorStatuses[instructor.id];

                      return (
                        <tr
                          key={instructor.id}
                          onClick={() => openInstructor(instructor.id)}
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              openInstructor(instructor.id);
                            }
                          }}
                          className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                        >
                          {/* Instructor */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <InstructorAvatar instructor={instructor} />

                              <div className="min-w-0">
                                <p
                                  className="truncate text-sm font-medium text-white"
                                  title={instructor.full_name}
                                >
                                  {truncateText(instructor.full_name)}
                                </p>

                                <p className="mt-0.5 text-xs tabular-nums text-white/35">
                                  ID: {instructor.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm text-white/60">
                              <Mail className="h-4 w-4 shrink-0 text-white/30" />

                              <span
                                className="truncate"
                                title={instructor.email}
                              >
                                {truncateText(instructor.email)}
                              </span>
                            </div>
                          </td>

                          {/* Occupation */}
                          <td className="px-6 py-4">
                            <span className="block truncate text-sm text-white/55">
                              {instructor.occupation || "—"}
                            </span>

                            <span className="mt-1 flex items-center gap-1 truncate text-xs text-white/35">
                              <MapPin className="h-3 w-3 shrink-0" />
                              {instructor.location || "Location not provided"}
                            </span>
                          </td>

                          {/* Experience */}
                          <td className="px-6 py-4">
                            <span className="inline-flex h-8 w-28 max-w-full items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-2 text-xs text-sky-300">
                              {instructor.years_of_experience ||
                                "Not specified"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <StatusBadge isActive={isActive} />
                          </td>

                          {/* Action */}
                          <td className="px-6 py-4 text-right">
                            <StatusToggleButton
                              isActive={isActive}
                              isUpdating={updatingInstructorIds.includes(
                                instructor.id,
                              )}
                              onClick={(event) => {
                                event.stopPropagation();
                                setStatusModalInstructor(instructor);
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}

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
                          <td className="px-6 py-4" />
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredInstructors.length > 0 && totalPages > 1 && (
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
                      {filteredInstructors.length}
                    </span>{" "}
                    instructors
                  </p>

                  {/* Pagination Controls */}
                  <div className="flex items-center justify-center gap-1">
                    {/* Previous */}
                    <button
                      type="button"
                      onClick={() => changePage(safeCurrentPage - 1)}
                      disabled={safeCurrentPage === 1}
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
                        onClick={() => changePage(page)}
                        aria-current={
                          safeCurrentPage === page ? "page" : undefined
                        }
                        className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                          safeCurrentPage === page
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
                      onClick={() => changePage(safeCurrentPage + 1)}
                      disabled={safeCurrentPage === totalPages}
                      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Empty State */}
              {filteredInstructors.length === 0 && (
                <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                    <Users className="h-6 w-6" />
                  </div>

                  <h3 className="mt-4 text-sm font-medium text-white">
                    No instructors found
                  </h3>

                  <p className="mt-1 text-xs text-white/40">
                    {statusFilter === "active"
                      ? "There are currently no active instructors."
                      : statusFilter === "inactive"
                        ? "There are currently no inactive instructors."
                        : searchQuery
                          ? "No instructors match your search. Try another name, email, location, or category."
                          : "No instructors are available."}
                  </p>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      <InstructorStatusConfirmModal
        isOpen={statusModalInstructor !== null}
        isLoading={isUpdatingStatus}
        instructorName={statusModalInstructor?.full_name ?? ""}
        isActive={
          statusModalInstructor
            ? (instructorStatuses[statusModalInstructor.id] ?? false)
            : false
        }
        onCancel={() => {
          if (!isUpdatingStatus) {
            setStatusModalInstructor(null);
          }
        }}
        onConfirm={toggleInstructorStatus}
      />
    </div>
  );
};

interface InstructorAvatarProps {
  instructor: Instructor;
}

const InstructorAvatar = ({ instructor }: InstructorAvatarProps) => {
  const [imageFailed, setImageFailed] = useState(false);

  const showImage = Boolean(instructor.profile_image) && !imageFailed;

  const initials =
    instructor.full_name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "IN";

  return (
    <div className="relative h-11 w-11 shrink-0">
      {showImage && (
        <img
          src={instructor.profile_image!}
          alt={instructor.full_name}
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-11 w-11 rounded-full object-cover ring-1 ring-white/10"
        />
      )}

      {!showImage && (
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#34D399]/10 text-sm font-semibold text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
          {initials}
        </div>
      )}
    </div>
  );
};

interface StatusBadgeProps {
  isActive: boolean;
}

const StatusBadge = ({ isActive }: StatusBadgeProps) => (
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

interface StatusToggleButtonProps {
  isActive: boolean;
  isUpdating: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StatusToggleButton = ({
  isActive,
  isUpdating,
  onClick,
}: StatusToggleButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isUpdating}
    className={`inline-flex h-9 w-28 items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
      isActive
        ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
        : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
    }`}
  >
    {isUpdating ? "Updating..." : isActive ? "Deactivate" : "Activate"}
  </button>
);

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: "default" | "active" | "inactive" | "search";
  delay?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  variant = "default",
  delay = "0ms",
}: StatCardProps) => {
  const styles = {
    default: {
      card: "border-white/[0.08] hover:border-white/[0.14]",
      line: "via-white/[0.12]",
      glow: "",
      value: "text-white",
      iconWrap:
        "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20",
    },
    active: {
      card: "border-[#34D399]/25 hover:border-[#34D399]/40",
      line: "via-[#34D399]/50",
      glow: "bg-[#34D399]/[0.08]",
      value: "text-[#34D399]",
      iconWrap:
        "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20",
    },
    inactive: {
      card: "border-red-400/20 hover:border-red-400/35",
      line: "via-red-400/40",
      glow: "bg-red-400/[0.06]",
      value: "text-red-400",
      iconWrap: "bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20",
    },
    search: {
      card: "border-white/[0.08] hover:border-white/[0.14]",
      line: "via-white/[0.12]",
      glow: "",
      value: "text-white",
      iconWrap: "bg-white/[0.04] text-white/60",
    },
  }[variant];

  return (
    <div
      className={`animate-page-item group relative cursor-default overflow-hidden rounded-2xl border bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 ${styles.card}`}
      style={{ animationDelay: delay }}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${styles.line} to-transparent`}
      />

      {styles.glow && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${styles.glow}`}
        />
      )}

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/45">
            {title}
          </p>

          <p
            className={`mt-3 text-3xl font-semibold tabular-nums ${styles.value}`}
          >
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InstructorListPage;
