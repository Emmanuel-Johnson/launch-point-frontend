import {
  ArrowLeft,
  Ban,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Hash,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Tags,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  createAdminCourseSkill,
  deleteAdminCourseSkill,
  getAdminCourseSkills,
  updateAdminCourseSkill,
  updateAdminCourseSkillStatus,
  type AdminCourseSkill,
  type CreateAdminCourseSkillData,
  type UpdateAdminCourseSkillData,
} from "../api/adminCourseSkillApi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import SkillFormModal from "../components/SkillFormModal";
import SkillStatusConfirmModal from "../components/SkillStatusConfirmModal";
import SkillDeleteConfirmModal from "../components/SkillDeleteConfirmModal";

type StatusFilter = "all" | "active" | "inactive";
const SKILLS_PER_PAGE = 6;

const SkillManagementPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<AdminCourseSkill[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isCreatingSkill, setIsCreatingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<AdminCourseSkill | null>(
    null,
  );
  const [isUpdatingSkill, setIsUpdatingSkill] = useState(false);

  const [statusSkill, setStatusSkill] = useState<AdminCourseSkill | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState<number | null>(null);
  const [deletingSkill, setDeletingSkill] = useState<AdminCourseSkill | null>(
    null,
  );

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAdminCourseSkills();
        if (!response.success) {
          throw new Error(response.message || "Failed to fetch course skills.");
        }
        setSkills(response.data);
      } catch (fetchError: unknown) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to fetch course skills.",
        );
      } finally {
        setIsLoading(false);
      }
    };
    void fetchSkills();
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

  const handleFilter = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCreateSkill = async (data: CreateAdminCourseSkillData) => {
    try {
      setIsCreatingSkill(true);
      const response = await createAdminCourseSkill(data);
      if (!response.success || !response.data) {
        throw new Error(
          response.errors?.name?.[0] ||
            response.message ||
            "Failed to create course skill.",
        );
      }
      setSkills((current) => [response.data, ...current]);
      setCurrentPage(1);
      setSearchQuery("");
      setStatusFilter("all");
      setIsSkillModalOpen(false);
      toast.success("Course skill created successfully.", {
        containerId: "admin",
      });
    } catch (createError: unknown) {
      let message = "Failed to create course skill. Please try again.";
      if (axios.isAxiosError(createError)) {
        const data = createError.response?.data as
          | { message?: string; errors?: Record<string, string[]> | null }
          | undefined;
        message =
          data?.errors?.name?.[0] ||
          data?.message ||
          createError.message ||
          message;
        if (data?.message === "Validation failed." && !data.errors?.name?.[0]) {
          message =
            "Unable to create this course skill. Please check the form.";
        }
      } else if (createError instanceof Error) {
        message = createError.message;
      }
      toast.error(message, { containerId: "admin" });
      throw createError;
    } finally {
      setIsCreatingSkill(false);
    }
  };

  const handleUpdateSkill = async (data: UpdateAdminCourseSkillData) => {
    if (!editingSkill) return;
    try {
      setIsUpdatingSkill(true);
      const response = await updateAdminCourseSkill(editingSkill.id, {
        name: data.name,
        description: data.description,
      });
      if (!response.success || !response.data) {
        throw new Error(
          response.errors?.name?.[0] ||
            response.errors?.description?.[0] ||
            response.message ||
            "Failed to update course skill.",
        );
      }
      setSkills((current) =>
        current.map((skill) =>
          skill.id === editingSkill.id ? response.data : skill,
        ),
      );
      setEditingSkill(null);
      setIsSkillModalOpen(false);
      toast.success("Course skill updated successfully.", {
        containerId: "admin",
      });
    } catch (updateError: unknown) {
      let message = "Failed to update course skill. Please try again.";
      if (axios.isAxiosError(updateError)) {
        const data = updateError.response?.data as
          | { message?: string; errors?: Record<string, string[]> | null }
          | undefined;
        message =
          data?.errors?.name?.[0] ||
          data?.errors?.description?.[0] ||
          data?.message ||
          updateError.message ||
          message;
        if (
          data?.message === "Validation failed." &&
          !data.errors?.name?.[0] &&
          !data.errors?.description?.[0]
        ) {
          message =
            "Unable to update this course skill. Please check the form.";
        }
      } else if (updateError instanceof Error) {
        message = updateError.message;
      }
      toast.error(message, { containerId: "admin" });
      throw updateError;
    } finally {
      setIsUpdatingSkill(false);
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!statusSkill || isUpdatingStatus) return;
    const skillToUpdate = statusSkill;
    const nextIsActive = !skillToUpdate.is_active;
    try {
      setIsUpdatingStatus(true);
      const response = await updateAdminCourseSkillStatus(
        skillToUpdate.id,
        nextIsActive,
      );
      if (!response.success || !response.data) {
        throw new Error(
          response.message || "Failed to update course skill status.",
        );
      }
      setSkills((current) =>
        current.map((skill) =>
          skill.id === skillToUpdate.id ? response.data : skill,
        ),
      );
      setStatusSkill(null);
      toast.success(
        `Course skill ${nextIsActive ? "enabled" : "disabled"} successfully.`,
        { containerId: "admin" },
      );
    } catch (statusError: unknown) {
      let message = "Failed to update course skill status. Please try again.";
      if (axios.isAxiosError(statusError)) {
        const data = statusError.response?.data as
          | { message?: string }
          | undefined;
        message = data?.message || statusError.message || message;
      } else if (statusError instanceof Error) {
        message = statusError.message;
      }
      toast.error(message, { containerId: "admin" });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!deletingSkill || deletingSkillId !== null) return;
    const skillToDelete = deletingSkill;
    try {
      setDeletingSkillId(skillToDelete.id);
      const response = await deleteAdminCourseSkill(skillToDelete.id);
      if (!response.success) {
        throw new Error(response.message || "Failed to delete course skill.");
      }
      setSkills((current) =>
        current.filter((skill) => skill.id !== skillToDelete.id),
      );
      setDeletingSkill(null);
      toast.success(response.message || "Course skill deleted successfully.", {
        containerId: "admin",
      });
    } catch (deleteError: unknown) {
      let message = "Failed to delete course skill. Please try again.";
      if (axios.isAxiosError(deleteError)) {
        const data = deleteError.response?.data as
          | { message?: string; detail?: string }
          | undefined;
        message =
          data?.message || data?.detail || deleteError.message || message;
      } else if (deleteError instanceof Error) {
        message = deleteError.message;
      }
      toast.error(message, { containerId: "admin" });
    } finally {
      setDeletingSkillId(null);
    }
  };

  return (
    <>
      <div className="mb-6 space-y-6">
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

      <div className="min-h-screen w-full space-y-6 bg-black text-white">
        <section className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
          />
          <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                <Tags className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Skill Management
                </h1>
                <p className="mt-1 text-sm text-white/50">
                  Manage skills associated with courses across Launch Point.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEditingSkill(null);
                setIsSkillModalOpen(true);
              }}
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
              icon={<Tags className="h-4 w-4" />}
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
              value={filteredSkills.length}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#0B0B0B]/90 p-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
            {(
              [
                { key: "all", label: "All" },
                { key: "active", label: "Active" },
                { key: "inactive", label: "Inactive" },
              ] as { key: StatusFilter; label: string }[]
            ).map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => handleFilter(filter.key)}
                className={`h-8 w-20 cursor-pointer rounded-lg text-xs font-medium transition-all ${
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
              aria-label="Search skills"
              className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
            />
          </div>
        </section>

        {isLoading && (
          <section
            className="rounded-2xl border border-white/[0.08] bg-[#0B0B0B] px-6 py-16 text-center"
            role="status"
          >
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#34D399]" />
            <p className="mt-4 text-sm text-white/50">
              Loading course skills...
            </p>
          </section>
        )}

        {!isLoading && error && (
          <section
            className="rounded-2xl border border-red-400/20 bg-[#0B0B0B] px-6 py-12 text-center"
            role="alert"
          >
            <Ban className="mx-auto h-8 w-8 text-red-400" />
            <h3 className="mt-4 text-sm font-medium text-white">
              Failed to load course skills
            </h3>
            <p className="mt-2 text-sm text-red-400/80">{error}</p>
          </section>
        )}

        {!isLoading && !error && filteredSkills.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {paginatedSkills.map((skill) => (
              <article
                key={skill.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:shadow-[0_14px_40px_-12px_rgba(52,211,153,0.25)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Tags className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="truncate text-sm font-semibold text-white"
                        title={skill.name}
                      >
                        {skill.name}
                      </h3>
                      <p className="mt-0.5 flex items-center gap-1 text-xs tabular-nums text-white/35">
                        <Hash className="h-3 w-3" />
                        {skill.id}
                      </p>
                    </div>
                  </div>
                  <StatusPill isActive={skill.is_active} />
                </div>
                <p
                  className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-white/60"
                  title={skill.description}
                >
                  {skill.description || "No description provided"}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                    <BookOpen className="h-4 w-4 shrink-0 text-white/30" />
                    <span>
                      0 <span className="text-white/35">courses</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${skill.name}`}
                      title="Edit skill"
                      onClick={() => {
                        setEditingSkill(skill);
                        setIsSkillModalOpen(true);
                      }}
                      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                    >
                      <Pencil className="h-4 w-4" strokeWidth={1.8} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatusSkill(skill)}
                      className={`inline-flex h-9 w-[125px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 hover:scale-[1.02] ${skill.is_active ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10" : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"}`}
                    >
                      {skill.is_active ? "Disable" : "Enable"}
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${skill.name}`}
                      title="Delete skill"
                      onClick={() => setDeletingSkill(skill)}
                      disabled={deletingSkillId !== null}
                      className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-400/20 bg-red-400/5 text-red-400 transition-all duration-300 hover:scale-[1.03] hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {deletingSkillId === skill.id ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                      ) : (
                        <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/[0.05] pt-2 text-[10px] leading-4 text-white/35">
                  <span>
                    Created{" "}
                    <span className="text-white/55">
                      {formatDate(skill.created_at)}
                    </span>
                  </span>
                  <span className="text-white/20">·</span>
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
        )}

        {!isLoading && !error && filteredSkills.length === 0 && (
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-white">
                No skills found
              </h3>
              <p className="mt-1 max-w-sm text-xs text-white/40">
                {statusFilter === "active"
                  ? "There are currently no active skills."
                  : statusFilter === "inactive"
                    ? "There are currently no inactive skills."
                    : searchQuery
                      ? "No skills match your search. Try a different name."
                      : "No course skills have been added yet."}
              </p>
            </div>
          </section>
        )}

        {!isLoading &&
          !error &&
          filteredSkills.length > 0 &&
          totalPages > 1 && (
            <section className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
                  {filteredSkills.length}
                </span>{" "}
                skills
              </p>
              <div className="flex items-center justify-center gap-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage(Math.max(safePage - 1, 1))}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
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
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${safePage === page ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20" : "text-white/45 hover:bg-white/[0.04] hover:text-white"}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage(Math.min(safePage + 1, totalPages))
                  }
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>
          )}
      </div>

      <SkillFormModal
        isOpen={isSkillModalOpen}
        editingSkill={editingSkill}
        onClose={() => {
          if (!isCreatingSkill && !isUpdatingSkill) {
            setIsSkillModalOpen(false);
            setEditingSkill(null);
          }
        }}
        onSave={(data) =>
          editingSkill
            ? handleUpdateSkill(data as UpdateAdminCourseSkillData)
            : handleCreateSkill(data as CreateAdminCourseSkillData)
        }
        isSaving={isCreatingSkill || isUpdatingSkill}
      />
      <SkillStatusConfirmModal
        isOpen={Boolean(statusSkill)}
        skillName={statusSkill?.name ?? ""}
        isActive={statusSkill?.is_active ?? false}
        isLoading={isUpdatingStatus}
        onCancel={() => {
          if (!isUpdatingStatus) setStatusSkill(null);
        }}
        onConfirm={handleConfirmStatusChange}
      />
      <SkillDeleteConfirmModal
        isOpen={Boolean(deletingSkill)}
        skillName={deletingSkill?.name ?? ""}
        isLoading={deletingSkillId !== null}
        onCancel={() => {
          if (deletingSkillId === null) setDeletingSkill(null);
        }}
        onConfirm={() => void handleDeleteSkill()}
      />
    </>
  );
};

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
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
    <div className="flex items-center gap-3 p-4 sm:p-5">
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
    className={`inline-flex h-7 w-20 shrink-0 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${isActive ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20" : "bg-red-400/10 text-red-400 ring-red-400/20"}`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#34D399]" : "bg-red-400"}`}
    />
    {isActive ? "Active" : "Inactive"}
  </span>
);

export default SkillManagementPage;
