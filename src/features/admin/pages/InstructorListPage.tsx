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
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAdminInstructors,
  type AdminInstructor,
} from "../api/instructorApi";

type Instructor = AdminInstructor;

const ITEMS_PER_PAGE = 5;

const InstructorListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // The list endpoint currently does not return an is_active field. Preserve
  // the existing UI toggle behavior without assuming a backend status value.
  const [instructorStatuses, setInstructorStatuses] = useState<
    Record<number, boolean>
  >({});

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
          setInstructorStatuses((previous) => {
            const nextStatuses: Record<number, boolean> = {};
            data.forEach((instructor) => {
              nextStatuses[instructor.id] = previous[instructor.id] ?? true;
            });
            return nextStatuses;
          });
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

    if (!query) {
      return instructors;
    }

    return instructors.filter((instructor) =>
      [
        instructor.full_name,
        instructor.email,
        instructor.occupation ?? "",
        instructor.location ?? "",
        instructor.years_of_experience ?? "",
        ...instructor.categories,
      ].some((value) => value.toLowerCase().includes(query)),
    );
  }, [instructors, searchQuery]);

  const totalPages = Math.ceil(filteredInstructors.length / ITEMS_PER_PAGE);

  // Derive the valid page without updating state inside an effect.
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const paginatedInstructors = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredInstructors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredInstructors, safeCurrentPage]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const changePage = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const openInstructor = (id: number) => {
    navigate(`/admin/instructors/${id}`);
  };

  const toggleInstructorStatus = (
    event: React.MouseEvent<HTMLButtonElement>,
    instructorId: number,
  ) => {
    // Prevent the parent row/card from opening the instructor detail.
    event.stopPropagation();

    setInstructorStatuses((previous) => ({
      ...previous,
      [instructorId]: !previous[instructorId],
    }));
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

            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                <Users className="h-5 w-5" />
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
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Instructors"
            value={instructors.length}
            icon={<Users className="h-5 w-5" />}
          />

          <StatCard
            title="Active Instructors"
            value={activeInstructors}
            icon={<UserCheck className="h-5 w-5" />}
            variant="active"
          />

          <StatCard
            title="Inactive Instructors"
            value={inactiveInstructors}
            icon={<UserX className="h-5 w-5" />}
            variant="inactive"
          />

          <StatCard
            title="Matching Results"
            value={filteredInstructors.length}
            icon={<Search className="h-5 w-5" />}
          />
        </section>

        {/* Instructor list */}
        <section
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "300ms" }}
        >
          {/* Search header */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                All Instructors
              </h2>
              <p className="mt-1 text-xs text-white/45">
                View instructor profiles and professional information.
              </p>
            </div>

            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search instructors..."
                aria-label="Search instructors"
                className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/15"
              />
            </div>
          </div>

          {isLoading && (
            <div
              className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-white/50"
              role="status"
            >
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/15 border-t-[#34D399]" />
              Loading instructors...
            </div>
          )}

          {!isLoading && error && (
            <div
              className="px-6 py-12 text-center text-sm text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Desktop table */}
          {!isLoading && !error && (
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                    <th className="w-[23%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Instructor
                    </th>

                    <th className="w-[24%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Email
                    </th>

                    <th className="w-[13%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Occupation
                    </th>

                    <th className="w-[17%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Experience
                    </th>

                    <th className="w-[12%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Status
                    </th>

                    <th className="w-[15%] px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Action
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
                        className="group cursor-pointer border-b border-white/[0.06] transition-colors hover:bg-[#34D399]/[0.04] hover:shadow-[inset_2px_0_0_0_#34D399]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <InstructorAvatar instructor={instructor} />

                            <div className="min-w-0">
                              <p
                                className="truncate text-sm font-medium text-white"
                                title={instructor.full_name}
                              >
                                {instructor.full_name}
                              </p>

                              <p className="mt-0.5 text-xs text-white/35">
                                ID: {instructor.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-white/60">
                            <Mail className="h-4 w-4 shrink-0 text-white/30" />
                            <span className="truncate" title={instructor.email}>
                              {instructor.email}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="block truncate text-sm text-white/55">
                            {instructor.occupation || "—"}
                          </span>

                          <span className="mt-1 flex items-center gap-1 truncate text-xs text-white/35">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {instructor.location || "Location not provided"}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full border border-sky-400/20 bg-sky-400/[0.08] px-2.5 py-1 text-xs text-sky-300">
                            {instructor.years_of_experience || "Not specified"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge isActive={isActive} />
                        </td>

                        {/* Activate / Deactivate */}
                        <td className="px-5 py-4">
                          <StatusToggleButton
                            isActive={isActive}
                            onClick={(event) =>
                              toggleInstructorStatus(event, instructor.id)
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Mobile cards */}
          {!isLoading && !error && (
            <div className="space-y-3 p-4 md:hidden">
              {paginatedInstructors.map((instructor) => {
                const isActive = instructorStatuses[instructor.id];

                return (
                  <div
                    key={instructor.id}
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-[#34D399]/30"
                  >
                    <button
                      type="button"
                      onClick={() => openInstructor(instructor.id)}
                      className="flex w-full items-center gap-3 text-left"
                    >
                      <InstructorAvatar instructor={instructor} />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">
                          {instructor.full_name}
                        </p>

                        <p className="truncate text-xs text-white/40">
                          {instructor.email}
                        </p>
                      </div>

                      <ChevronRight className="h-4 w-4 shrink-0 text-white/40" />
                    </button>

                    <div className="mt-4 space-y-2 text-xs text-white/50">
                      <p>
                        {instructor.occupation || "Occupation not provided"}
                      </p>

                      <p>{instructor.location || "Location not provided"}</p>

                      <p>
                        Experience:{" "}
                        {instructor.years_of_experience || "Not specified"}
                      </p>
                    </div>

                    {/* Mobile status and action */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <StatusBadge isActive={isActive} />

                      <StatusToggleButton
                        isActive={isActive}
                        onClick={(event) =>
                          toggleInstructorStatus(event, instructor.id)
                        }
                      />
                    </div>

                    {/* Categories */}
                    {instructor.categories.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {instructor.categories.slice(0, 3).map((category) => (
                          <span
                            key={category}
                            className="rounded-full border border-[#34D399]/20 px-2 py-1 text-[10px] text-[#34D399]"
                          >
                            {category}
                          </span>
                        ))}

                        {instructor.categories.length > 3 && (
                          <span className="px-1 py-1 text-[10px] text-white/40">
                            +{instructor.categories.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {!isLoading &&
            !error &&
            filteredInstructors.length > 0 &&
            totalPages > 1 && (
              <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-white/40">
                  Showing {startItem} to {endItem} of{" "}
                  {filteredInstructors.length} instructors
                </p>

                <div className="flex items-center justify-center gap-1">
                  <button
                    type="button"
                    onClick={() => changePage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage === 1}
                    aria-label="Previous page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 hover:border-[#34D399]/30 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
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
                      onClick={() => changePage(page)}
                      aria-current={
                        safeCurrentPage === page ? "page" : undefined
                      }
                      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs ${
                        safeCurrentPage === page
                          ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                          : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => changePage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage === totalPages}
                    aria-label="Next page"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 hover:border-[#34D399]/30 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

          {/* Empty state */}
          {!isLoading && !error && filteredInstructors.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <Users className="h-8 w-8 text-white/30" />

              <h3 className="mt-4 text-sm font-medium text-white">
                No instructors found
              </h3>

              <p className="mt-1 text-xs text-white/40">
                {searchQuery
                  ? "No instructors match your search. Try another name, email, location, or category."
                  : "No instructors are available."}
              </p>
            </div>
          )}
        </section>
      </div>
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
    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
      isActive
        ? "border-[#34D399]/25 bg-[#34D399]/[0.08] text-[#34D399]"
        : "border-red-400/25 bg-red-400/[0.08] text-red-300"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        isActive ? "bg-[#34D399]" : "bg-red-300"
      }`}
    />
    {isActive ? "Active" : "Inactive"}
  </span>
);

interface StatusToggleButtonProps {
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const StatusToggleButton = ({ isActive, onClick }: StatusToggleButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
      isActive
        ? "border-red-400/20 bg-red-400/[0.06] text-red-300 hover:bg-red-400/[0.12]"
        : "border-[#34D399]/25 bg-[#34D399]/[0.08] text-[#34D399] hover:bg-[#34D399]/[0.14]"
    }`}
  >
    {isActive ? "Deactivate" : "Activate"}
  </button>
);

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant?: "default" | "active" | "inactive";
}

const StatCard = ({
  title,
  value,
  icon,
  variant = "default",
}: StatCardProps) => {
  const iconStyles = {
    default: "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20",
    active: "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20",
    inactive: "bg-red-400/[0.08] text-red-300 ring-red-400/20",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors hover:border-white/[0.14]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/45">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${iconStyles[variant]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InstructorListPage;
