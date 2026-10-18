import {
  ArrowLeft,
  Ban,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type SkillStatus = "active" | "inactive";

interface Skill {
  id: number;
  name: string;
  description: string;
  courses: number;
  is_active: boolean;
}

const SKILLS_PER_PAGE = 5;

const INITIAL_SKILLS: Skill[] = [
  {
    id: 1,
    name: "Python",
    description:
      "A general-purpose programming language used for backend development and automation.",
    courses: 12,
    is_active: true,
  },
  {
    id: 2,
    name: "React",
    description:
      "A JavaScript library for building interactive user interfaces.",
    courses: 18,
    is_active: true,
  },
  {
    id: 3,
    name: "Django",
    description: "A Python web framework for building secure web applications.",
    courses: 9,
    is_active: true,
  },
  {
    id: 4,
    name: "SQL",
    description: "A language for querying and managing relational databases.",
    courses: 4,
    is_active: false,
  },
  {
    id: 5,
    name: "TypeScript",
    description:
      "A typed superset of JavaScript for scalable application development.",
    courses: 7,
    is_active: true,
  },
  {
    id: 6,
    name: "Redux",
    description:
      "A toolkit for building and managing application state in React.",
    courses: 6,
    is_active: true,
  },
];

type StatusFilter = "all" | SkillStatus;

interface SkillFormModalProps {
  isOpen: boolean;
  editingSkill: Skill | null;
  onClose: () => void;
  onSave: (data: Pick<Skill, "name" | "description">) => void;
}

const SkillFormModal = ({
  isOpen,
  editingSkill,
  onClose,
  onSave,
}: SkillFormModalProps) => {
  const [name, setName] = useState(editingSkill?.name ?? "");
  const [description, setDescription] = useState(
    editingSkill?.description ?? "",
  );
  const [error, setError] = useState("");

  // Reset the form whenever a different skill is opened.
  const [formKey, setFormKey] = useState(0);

  const resetAndClose = () => {
    setName("");
    setDescription("");
    setError("");
    setFormKey((current) => current + 1);
    onClose();
  };

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Please enter a skill name.");
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
    });
    resetAndClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) resetAndClose();
      }}
    >
      <div
        key={`${editingSkill?.id ?? "new"}-${formKey}`}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0B] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/[0.08] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399]">
              <Code2 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </h2>
              <p className="mt-1 text-xs text-white/45">
                Define a skill for your courses.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close modal"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/45 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <div>
            <label
              htmlFor="skill-name"
              className="mb-2 block text-xs font-medium text-white/65"
            >
              Skill Name <span className="text-red-400">*</span>
            </label>

            <input
              id="skill-name"
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="e.g. Python"
              maxLength={50}
              className="h-11 w-full rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/10"
            />

            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          </div>

          <div>
            <label
              htmlFor="skill-description"
              className="mb-2 block text-xs font-medium text-white/65"
            >
              Description
            </label>

            <textarea
              id="skill-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe who this skill is for..."
              rows={4}
              maxLength={300}
              className="w-full resize-none rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/10"
            />

            <p className="mt-1 text-right text-[11px] text-white/30">
              {description.length}/300
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={resetAndClose}
              className="h-10 rounded-xl border border-white/[0.10] px-5 text-sm font-medium text-white/65 transition hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition hover:bg-[#34D399]/15"
            >
              <CheckCircle2 className="h-4 w-4" />
              {editingSkill ? "Save Changes" : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SkillManagementPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Skill[]>(INITIAL_SKILLS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const listRef = useRef<HTMLElement | null>(null);

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
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleSaveSkill = (data: Pick<Skill, "name" | "description">) => {
    if (editingSkill) {
      setSkills((current) =>
        current.map((skill) =>
          skill.id === editingSkill.id ? { ...skill, ...data } : skill,
        ),
      );
    } else {
      const newSkill: Skill = {
        id: Math.max(0, ...skills.map((skill) => skill.id)) + 1,
        ...data,
        courses: 0,
        is_active: true,
      };

      setSkills((current) => [newSkill, ...current]);
      setCurrentPage(1);
      setSearchQuery("");
      setStatusFilter("all");
    }
  };

  const handleToggleStatus = (id: number) => {
    const skill = skills.find((item) => item.id === id);
    if (!skill) return;

    const action = skill.is_active ? "disable" : "enable";

    if (
      !window.confirm(
        `Are you sure you want to ${action} the "${skill.name}" skill?`,
      )
    ) {
      return;
    }

    setSkills((current) =>
      current.map((item) =>
        item.id === id ? { ...item, is_active: !item.is_active } : item,
      ),
    );
  };

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

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex cursor-default items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
                    <Code2 className="h-5 w-5" strokeWidth={1.8} />
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
                  className="group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <Plus
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={2}
                  />

                  <span className="relative z-10">Add Skill</span>
                </button>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Total Skills"
              value={totalCount}
              icon={<Code2 className="h-5 w-5" />}
              accent="neutral"
            />

            <StatCard
              label="Active"
              value={activeCount}
              icon={<CheckCircle2 className="h-5 w-5" />}
              accent="green"
            />

            <StatCard
              label="Inactive"
              value={inactiveCount}
              icon={<Ban className="h-5 w-5" />}
              accent="red"
            />

            <StatCard
              label="Showing"
              value={filteredSkills.length}
              icon={<Search className="h-5 w-5" />}
              accent="neutral"
            />
          </section>

          {/* Skill Table */}
          <section
            ref={listRef}
            className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "300ms" }}
          >
            {/* Table Header */}
            <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
              <div className="cursor-default">
                <h2 className="text-lg font-semibold tracking-tight">
                  All Skills
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  View and manage skills and expertise tags for courses.
                </p>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row md:justify-end">
                {/* Status Filter */}
                <div className="flex h-10 shrink-0 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                  {(["all", "active", "inactive"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => handleFilter(filter)}
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
                <div className="relative min-w-0 flex-1 md:max-w-sm">
                  <Search
                    className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                    strokeWidth={1.8}
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => handleSearch(event.target.value)}
                    placeholder="Search skills..."
                    className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] table-fixed">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                    <th className="w-[23%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Skill
                    </th>

                    <th className="w-[35%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Description
                    </th>

                    <th className="w-[14%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Courses
                    </th>

                    <th className="w-[13%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Status
                    </th>

                    <th className="w-[15%] px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-white/35">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedSkills.map((skill) => (
                    <tr
                      key={skill.id}
                      className="group border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04]"
                    >
                      {/* Skill */}
                      <td className="relative px-6 py-4">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[#34D399] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                        />

                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                            <Code2 className="h-5 w-5" strokeWidth={1.8} />
                          </div>

                          <div className="min-w-0">
                            <p
                              className="truncate text-sm font-medium text-white"
                              title={skill.name}
                            >
                              {skill.name}
                            </p>

                            <p className="mt-0.5 text-xs tabular-nums text-white/35">
                              ID: {skill.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4">
                        <p
                          className="line-clamp-2 text-sm leading-5 text-white/60"
                          title={skill.description}
                        >
                          {skill.description || "No description provided"}
                        </p>
                      </td>

                      {/* Courses */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                          <BookOpen className="h-4 w-4 shrink-0 text-white/30" />
                          <span>{skill.courses}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusPill isActive={skill.is_active} />
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(skill)}
                            aria-label={`Edit ${skill.name}`}
                            title="Edit skill"
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                          >
                            <Pencil className="h-4 w-4" strokeWidth={1.8} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(skill.id)}
                            className={`inline-flex h-9 w-[76px] shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 hover:scale-[1.02] ${
                              skill.is_active
                                ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                                : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                            }`}
                          >
                            {skill.is_active ? "Disable" : "Enable"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Keep table height consistent when the last page has fewer rows */}
                  {totalPages > 1 &&
                    Array.from({
                      length: Math.max(
                        SKILLS_PER_PAGE - paginatedSkills.length,
                        0,
                      ),
                    }).map((_, index) => (
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
                    ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredSkills.length === 0 && (
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
            )}

            {/* Pagination */}
            {filteredSkills.length > 0 && totalPages > 1 && (
              <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
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
              </div>
            )}
          </section>
        </div>
      </div>

      {/* UI-only Add / Edit Modal */}
      <SkillFormModal
        key={`${editingSkill?.id ?? "new"}-${isModalOpen}`}
        isOpen={isModalOpen}
        editingSkill={editingSkill}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSkill(null);
        }}
        onSave={handleSaveSkill}
      />
    </>
  );
};

const StatCard = ({
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
    neutral: {
      border: "border-white/[0.08]",
      text: "text-white",
      icon: "bg-white/[0.04] text-white/60",
    },
    green: {
      border: "border-[#34D399]/25",
      text: "text-[#34D399]",
      icon: "bg-[#34D399]/10 text-[#34D399]",
    },
    red: {
      border: "border-red-400/20",
      text: "text-red-400",
      icon: "bg-red-400/10 text-red-400",
    },
  }[accent];

  return (
    <div
      className={`animate-page-item group relative overflow-hidden rounded-2xl border ${styles.border} bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
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

export default SkillManagementPage;
