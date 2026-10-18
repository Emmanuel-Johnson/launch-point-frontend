import {
  ArrowLeft,
  Ban,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Hash,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { AdminCourseLevel } from "../api/adminCourseLevelApi";
import {
  createAdminCourseLevel,
  getAdminCourseLevels,
  updateAdminCourseLevel,
  updateAdminCourseLevelStatus,
} from "../api/adminCourseLevelApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LevelFormModal from "../components/LevelFormModal";
import LevelStatusConfirmModal from "../components/LevelStatusConfirmModal";

type LevelStatus = "active" | "inactive";

type CourseLevel = AdminCourseLevel & {
  // Course count is not currently returned by the course-level API.
  courses: number;
};

const LEVELS_PER_PAGE = 6;

const formatDate = (value: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const mapApiLevel = (
  level: AdminCourseLevel,
  existing?: CourseLevel,
): CourseLevel => ({
  ...level,
  courses: existing?.courses ?? 0,
  created_at: formatDate(level.created_at),
  updated_at: formatDate(level.updated_at),
});

type StatusFilter = "all" | LevelStatus;

const LevelManagementPage = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<CourseLevel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLevel, setEditingLevel] = useState<CourseLevel | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const listRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadLevels = async () => {
      setIsLoading(true);
      try {
        const data = await getAdminCourseLevels();
        if (isMounted) {
          setLevels(data.map((level) => mapApiLevel(level)));
        }
      } catch {
        if (isMounted) {
          toast.error("Unable to load course levels. Please try again.", {
            containerId: "admin",
          });
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadLevels();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredLevels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return levels.filter((level) => {
      const matchesSearch =
        !query ||
        level.name.toLowerCase().includes(query) ||
        level.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && level.is_active) ||
        (statusFilter === "inactive" && !level.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [levels, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredLevels.length / LEVELS_PER_PAGE);

  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedLevels = filteredLevels.slice(
    (safePage - 1) * LEVELS_PER_PAGE,
    safePage * LEVELS_PER_PAGE,
  );

  const totalCount = levels.length;
  const activeCount = levels.filter((level) => level.is_active).length;
  const inactiveCount = totalCount - activeCount;

  const startItem = filteredLevels.length
    ? (safePage - 1) * LEVELS_PER_PAGE + 1
    : 0;

  const endItem = Math.min(safePage * LEVELS_PER_PAGE, filteredLevels.length);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilter = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const scrollToList = () => {
    listRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(scrollToList, 0);
  };

  const openAddModal = () => {
    setEditingLevel(null);
    setIsModalOpen(true);
  };

  const openEditModal = (level: CourseLevel) => {
    setEditingLevel(level);
    setIsModalOpen(true);
  };

  const handleSaveLevel = async (
    data: Pick<CourseLevel, "name" | "description">,
  ) => {
    if (editingLevel) {
      const updated = await updateAdminCourseLevel(editingLevel.id, data);
      setLevels((current) =>
        current.map((level) =>
          level.id === editingLevel.id ? mapApiLevel(updated, level) : level,
        ),
      );
      toast.success("Course level updated successfully.", {
        containerId: "admin",
      });
    } else {
      const created = await createAdminCourseLevel(data);
      setLevels((current) => [mapApiLevel(created), ...current]);
      toast.success("Course level created successfully.", {
        containerId: "admin",
      });
      setCurrentPage(1);
      setSearchQuery("");
      setStatusFilter("all");
    }
  };

  const handleToggleStatus = (id: number) => {
    const level = levels.find((item) => item.id === id);
    if (!level) return;
    setSelectedLevel(level);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedLevel) return;

    setIsStatusUpdating(true);
    try {
      const response = await updateAdminCourseLevelStatus(
        selectedLevel.id,
        !selectedLevel.is_active,
      );
      setLevels((current) =>
        current.map((item) =>
          item.id === selectedLevel.id
            ? mapApiLevel(response.data, item)
            : item,
        ),
      );
      toast.success(
        response.message || "Course level status updated successfully.",
        {
          containerId: "admin",
        },
      );
      setIsStatusModalOpen(false);
      setSelectedLevel(null);
    } catch {
      toast.error("Unable to update course level status. Please try again.", {
        containerId: "admin",
      });
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleCancelStatusChange = () => {
    if (isStatusUpdating) return;
    setIsStatusModalOpen(false);
    setSelectedLevel(null);
  };

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "inactive", label: "Inactive" },
  ];

  return (
    <>
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => navigate("/admin/courses")}
          className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
          style={{ animationDelay: "80ms" }}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </button>
      </div>

      <div className="mt-6 min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {isLoading && (
            <div className="rounded-xl border border-white/[0.08] bg-[#0B0B0B] px-4 py-8 text-center text-sm text-white/50">
              Loading course levels...
            </div>
          )}
          {/* Header + inline stat strip */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "80ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
              />

              {/* Title row */}
              <div className="relative flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex cursor-default items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                    <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Level Management
                    </h1>
                    <p className="mt-1 text-sm text-white/50">
                      Manage learning levels for courses across Launch Point.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="cursor-pointer group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Plus
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={2}
                  />
                  <span className="relative z-10">Add Level</span>
                </button>
              </div>

              {/* Inline stat strip */}
              <div className="relative grid grid-cols-2 divide-white/[0.06] border-t border-white/[0.06] sm:grid-cols-4 sm:divide-x">
                <StatCell
                  label="Total Levels"
                  value={totalCount}
                  icon={<GraduationCap className="h-4 w-4" />}
                  accent="neutral"
                />
                <StatCell
                  label="Active"
                  value={activeCount}
                  icon={<CheckCircle2 className="h-4 w-4" />}
                  accent="green"
                />
                <StatCell
                  label="Inactive"
                  value={inactiveCount}
                  icon={<Ban className="h-4 w-4" />}
                  accent="red"
                />
                <StatCell
                  label="Showing"
                  value={filteredLevels.length}
                  icon={<Search className="h-4 w-4" />}
                  accent="neutral"
                />
              </div>
            </div>
          </section>

          {/* Sticky toolbar */}
          <section
            ref={listRef}
            className="animate-page-item sticky top-4 z-20 scroll-mt-4"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#0B0B0B]/90 p-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              {/* Segmented status filter */}
              <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => handleFilter(filter.key)}
                    className={`h-8 w-20 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === filter.key
                        ? filter.key === "active"
                          ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                          : filter.key === "inactive"
                            ? "bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20"
                            : "bg-white/[0.08] text-white"
                        : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative min-w-0 flex-1 md:max-w-sm">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                  strokeWidth={1.8}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search levels..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </section>

          {/* Level card grid */}
          {!isLoading && filteredLevels.length > 0 ? (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedLevels.map((level, index) => (
                <article
                  key={level.id}
                  className="animate-page-item group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:shadow-[0_14px_40px_-12px_rgba(52,211,153,0.25)]"
                  style={{ animationDelay: `${260 + index * 60}ms` }}
                >
                  {/* Top accent line on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {/* Card header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                        <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="truncate text-sm font-semibold text-white"
                          title={level.name}
                        >
                          {level.name}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs tabular-nums text-white/35">
                          <Hash className="h-3 w-3" />
                          {level.id}
                        </p>
                      </div>
                    </div>

                    <StatusPill isActive={level.is_active} />
                  </div>

                  {/* Description */}
                  <p
                    className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-white/60"
                    title={level.description}
                  >
                    {level.description || "No description provided"}
                  </p>

                  {/* Footer: courses + actions */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                      <BookOpen className="h-4 w-4 shrink-0 text-white/30" />
                      <span>
                        {level.courses}{" "}
                        <span className="text-white/35">
                          {level.courses === 1 ? "course" : "courses"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(level)}
                        aria-label={`Edit ${level.name}`}
                        title="Edit level"
                        className="cursor-pointer inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.8} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(level.id)}
                        className={`cursor-pointer inline-flex h-9 w-[150px] shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 hover:scale-[1.02] ${
                          level.is_active
                            ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                            : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                        }`}
                      >
                        {level.is_active ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.05] pt-2 text-[10px] leading-4 text-white/35">
                    <span>
                      Created{" "}
                      <span className="text-white/55">{level.created_at}</span>
                    </span>
                    <span className="text-white/20">·</span>
                    <span>
                      Updated{" "}
                      <span className="text-white/55">{level.updated_at}</span>
                    </span>
                  </div>
                </article>
              ))}
            </section>
          ) : !isLoading ? (
            /* Empty state */
            <section className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                  <SlidersHorizontal className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-sm font-medium text-white">
                  No levels found
                </h3>

                <p className="mt-1 max-w-sm text-xs text-white/40">
                  {statusFilter === "active"
                    ? "There are currently no active levels."
                    : statusFilter === "inactive"
                      ? "There are currently no inactive levels."
                      : searchQuery
                        ? "No levels match your search. Try a different name."
                        : "No learning levels have been added yet."}
                </p>

                {!searchQuery && statusFilter === "all" && (
                  <button
                    type="button"
                    onClick={openAddModal}
                    className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-[#34D399]/25 bg-[#34D399]/10 px-4 text-xs font-medium text-[#34D399] transition hover:bg-[#34D399]/15"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Level
                  </button>
                )}
              </div>
            </section>
          ) : null}

          {/* Pagination */}
          {filteredLevels.length > 0 && totalPages > 1 && (
            <section
              className="animate-page-item flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: "320ms" }}
            >
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
                  {filteredLevels.length}
                </span>{" "}
                levels
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
                    className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                      safePage === page
                        ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                        : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                    }`}
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
            </section>
          )}
        </div>
      </div>

      <LevelFormModal
        isOpen={isModalOpen}
        editingLevel={editingLevel}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLevel(null);
        }}
        onSave={handleSaveLevel}
      />

      <LevelStatusConfirmModal
        isOpen={isStatusModalOpen}
        isLoading={isStatusUpdating}
        levelName={selectedLevel?.name ?? ""}
        isActive={selectedLevel?.is_active ?? false}
        onCancel={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
      />
    </>
  );
};

const StatCell = ({
  label,
  value,
  icon,
  accent = "neutral",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  accent?: "neutral" | "green" | "red";
}) => {
  const styles = {
    neutral: { text: "text-white", icon: "bg-white/[0.04] text-white/60" },
    green: { text: "text-[#34D399]", icon: "bg-[#34D399]/10 text-[#34D399]" },
    red: { text: "text-red-400", icon: "bg-red-400/10 text-red-400" },
  }[accent];

  return (
    <div className="flex items-center gap-3 p-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-white/45">
          {label}
        </p>
        <p
          className={`mt-1 text-2xl font-semibold tabular-nums ${styles.text}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

const StatusPill = ({ isActive }: { isActive: boolean }) => (
  <span
    className={`inline-flex h-7 w-20 shrink-0 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
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

export default LevelManagementPage;
