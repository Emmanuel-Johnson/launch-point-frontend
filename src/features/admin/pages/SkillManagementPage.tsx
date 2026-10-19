import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Ban,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Hash,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  createAdminCourseSkill,
  getAdminCourseSkills,
  updateAdminCourseSkill,
  updateAdminCourseSkillStatus,
  type AdminCourseSkill,
  type CreateAdminCourseSkillData,
} from "../api/adminCourseSkillApi";

import SkillStatusConfirmModal from "../components/SkillStatusConfirmModal";
import SkillFormModal from "../components/SkillFormModal";

type SkillStatus = "active" | "inactive";
type StatusFilter = "all" | SkillStatus;

const SKILLS_PER_PAGE = 6;

// Course count is not returned by the skill API yet; shown as a static placeholder.
const STATIC_COURSE_COUNT = 0;

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

const getErrorMessage = (error: unknown): string => {
  const apiError = error as {
    response?: {
      data?: {
        detail?: unknown;
        message?: unknown;
      };
    };
    message?: unknown;
  };

  const data = apiError.response?.data;

  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.message === "string") return data.message;
  if (typeof apiError.message === "string") return apiError.message;

  return "Something went wrong. Please try again.";
};

const SkillManagementPage = () => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLElement | null>(null);

  const [skills, setSkills] = useState<AdminCourseSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<AdminCourseSkill | null>(
    null,
  );

  const [statusSkill, setStatusSkill] = useState<AdminCourseSkill | null>(null);
  const [isStatusLoading, setIsStatusLoading] = useState(false);

  // Reusable refresh function for create, edit, and status updates.
  const loadSkills = useCallback(async () => {
    try {
      const data = await getAdminCourseSkills();
      setSkills(data);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error), { containerId: "admin" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load the initial list in the effect. State updates happen in the
  // asynchronous request callbacks, not synchronously in the effect body.
  useEffect(() => {
    let isMounted = true;

    const fetchInitialSkills = async () => {
      try {
        const data = await getAdminCourseSkills();

        if (isMounted) {
          setSkills(data);
        }
      } catch (error: unknown) {
        if (isMounted) {
          toast.error(getErrorMessage(error), { containerId: "admin" });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void fetchInitialSkills();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesSearch =
        !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && skill.is_active) ||
        (statusFilter === "inactive" && !skill.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [skills, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredSkills.length / SKILLS_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));

  const paginatedSkills = filteredSkills.slice(
    (safePage - 1) * SKILLS_PER_PAGE,
    safePage * SKILLS_PER_PAGE,
  );

  const totalCount = skills.length;
  const activeCount = skills.filter((skill) => skill.is_active).length;
  const inactiveCount = totalCount - activeCount;

  const startItem = filteredSkills.length
    ? (safePage - 1) * SKILLS_PER_PAGE + 1
    : 0;

  const endItem = Math.min(safePage * SKILLS_PER_PAGE, filteredSkills.length);

  const openAddModal = () => {
    setEditingSkill(null);
    setIsFormOpen(true);
  };

  const openEditModal = (skill: AdminCourseSkill) => {
    setEditingSkill(skill);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingSkill(null);
  };

  const handleSaveSkill = async (data: CreateAdminCourseSkillData) => {
    if (editingSkill) {
      await updateAdminCourseSkill(editingSkill.id, data);
      toast.success("Skill updated successfully.", {
        containerId: "admin",
      });
    } else {
      await createAdminCourseSkill(data);
      toast.success("Skill created successfully.", {
        containerId: "admin",
      });
    }

    closeFormModal();
    await loadSkills();
  };

  const handleToggleStatus = (skill: AdminCourseSkill) => {
    setStatusSkill(skill);
  };

  const handleConfirmStatus = async () => {
    if (!statusSkill) return;

    const skill = statusSkill;
    const nextIsActive = !skill.is_active;

    setIsStatusLoading(true);

    try {
      await updateAdminCourseSkillStatus(skill.id, nextIsActive);

      toast.success(
        nextIsActive
          ? "Skill enabled successfully."
          : "Skill disabled successfully.",
        { containerId: "admin" },
      );

      setStatusSkill(null);
      await loadSkills();
    } catch (error: unknown) {
      toast.error(getErrorMessage(error), { containerId: "admin" });
    } finally {
      setIsStatusLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilter = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    requestAnimationFrame(() => {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
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
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back
        </button>
      </div>

      <div className="mt-6 min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* Header and statistics */}
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

              <div className="relative flex flex-col gap-5 p-7 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex cursor-default items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                    <Code2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Skill Management
                    </h1>
                    <p className="mt-1 text-sm text-white/50">
                      Manage skills and expertise tags across Launch Point LMS.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openAddModal}
                  className="group relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <Plus className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
                  <span className="relative z-10">Add Skill</span>
                </button>
              </div>

              <div className="relative grid grid-cols-2 divide-white/[0.06] border-t border-white/[0.06] sm:grid-cols-4 sm:divide-x">
                <StatCell
                  label="Total Skills"
                  value={totalCount}
                  icon={<Code2 className="h-4 w-4" />}
                />
                <StatCell
                  label="Active"
                  value={activeCount}
                  accent="green"
                  icon={<CheckCircle2 className="h-4 w-4" />}
                />
                <StatCell
                  label="Inactive"
                  value={inactiveCount}
                  accent="red"
                  icon={<Ban className="h-4 w-4" />}
                />
                <StatCell
                  label="Showing"
                  value={filteredSkills.length}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            </div>
          </section>

          {/* Search and filters */}
          <section
            ref={listRef}
            className="animate-page-item scroll-mt-4"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#0B0B0B]/90 p-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
              <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => handleFilter(filter.key)}
                    className={`h-8 w-20 rounded-lg text-xs font-medium transition ${
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

              <div className="relative min-w-0 flex-1 md:max-w-sm">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => handleSearch(event.target.value)}
                  placeholder="Search skills..."
                  className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/15"
                />
              </div>
            </div>
          </section>

          {/* Skill cards */}
          {isLoading ? (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-52 animate-pulse rounded-2xl border border-white/[0.08] bg-white/[0.02]"
                />
              ))}
            </section>
          ) : filteredSkills.length > 0 ? (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedSkills.map((skill, index) => (
                <article
                  key={skill.id}
                  className="animate-page-item group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:shadow-[0_14px_40px_-12px_rgba(52,211,153,0.25)]"
                  style={{ animationDelay: `${260 + index * 60}ms` }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                        <Code2 className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3
                          className="truncate text-sm font-semibold text-white"
                          title={skill.name}
                        >
                          {skill.name}
                        </h3>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-white/35">
                          <Hash className="h-3 w-3" />
                          {skill.id}
                        </p>
                      </div>
                    </div>

                    <StatusPill isActive={skill.is_active} />
                  </div>

                  <p
                    className="mt-4 min-h-10 line-clamp-2 text-sm leading-5 text-white/60"
                    title={skill.description}
                  >
                    {skill.description || "No description provided"}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                    <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                      <BookOpen className="h-4 w-4 shrink-0 text-white/30" />
                      <span>
                        {STATIC_COURSE_COUNT}{" "}
                        <span className="text-white/35">
                          {STATIC_COURSE_COUNT ? "course" : "courses"}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(skill)}
                        aria-label={`Edit ${skill.name}`}
                        title="Edit skill"
                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(skill)}
                        className={`inline-flex h-9 w-[125px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 hover:scale-[1.02] ${
                          skill.is_active
                            ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                            : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                        }`}
                      >
                        {skill.is_active ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-white/[0.05] pt-2 text-[10px] text-white/35">
                    <span>
                      Created{" "}
                      <span className="text-white/55">
                        {formatDate(skill.created_at)}
                      </span>
                    </span>
                    <span>
                      Updated{" "}
                      <span className="text-white/55">
                        {formatDate(skill.updated_at)}
                      </span>
                    </span>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                  <SlidersHorizontal className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-sm font-medium text-white">
                  No skills found
                </h3>

                <p className="mt-1 max-w-sm text-xs text-white/40">
                  {searchQuery
                    ? "No skills match your search. Try a different name."
                    : statusFilter === "active"
                      ? "There are currently no active skills."
                      : statusFilter === "inactive"
                        ? "There are currently no inactive skills."
                        : "No skills have been added yet."}
                </p>

                {!searchQuery && statusFilter === "all" && (
                  <button
                    type="button"
                    onClick={openAddModal}
                    className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-[#34D399]/25 bg-[#34D399]/10 px-4 text-xs font-medium text-[#34D399] transition hover:bg-[#34D399]/15"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Skill
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Pagination */}
          {!isLoading && filteredSkills.length > 0 && totalPages > 1 && (
            <section
              className="animate-page-item flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              style={{ animationDelay: "320ms" }}
            >
              <p className="text-xs text-white/40">
                Showing{" "}
                <span className="font-medium text-white/70">{startItem}</span>{" "}
                to <span className="font-medium text-white/70">{endItem}</span>{" "}
                of{" "}
                <span className="font-medium text-white/70">
                  {filteredSkills.length}
                </span>{" "}
                skills
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
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] text-white/50 hover:border-[#34D399]/30 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      <SkillFormModal
        key={`${editingSkill?.id ?? "new"}-${isFormOpen}`}
        isOpen={isFormOpen}
        editingSkill={editingSkill}
        onClose={closeFormModal}
        onSave={handleSaveSkill}
      />

      <SkillStatusConfirmModal
        isOpen={Boolean(statusSkill)}
        isLoading={isStatusLoading}
        skillName={statusSkill?.name ?? ""}
        isActive={statusSkill?.is_active ?? false}
        onCancel={() => setStatusSkill(null)}
        onConfirm={handleConfirmStatus}
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
      <div>
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

export default SkillManagementPage;
