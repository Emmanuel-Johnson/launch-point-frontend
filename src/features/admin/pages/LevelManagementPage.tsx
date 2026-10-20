import {
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
import { useMemo, useState } from "react";

type LevelStatus = "active" | "inactive";
type StatusFilter = "all" | LevelStatus;

type CourseLevel = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  courses: number;
  created_at: string;
  updated_at: string;
};

const LEVELS_PER_PAGE = 6;

const INITIAL_LEVELS: CourseLevel[] = [
  {
    id: 1,
    name: "Beginner",
    description:
      "Build a strong foundation with essential concepts and guided practice.",
    is_active: true,
    courses: 8,
    created_at: "Oct 01, 2026",
    updated_at: "Oct 18, 2026",
  },
  {
    id: 2,
    name: "Intermediate",
    description:
      "Strengthen your skills through practical exercises and real-world projects.",
    is_active: true,
    courses: 12,
    created_at: "Oct 02, 2026",
    updated_at: "Oct 17, 2026",
  },
  {
    id: 3,
    name: "Advanced",
    description:
      "Explore advanced techniques, architecture, and complex problem-solving.",
    is_active: true,
    courses: 6,
    created_at: "Oct 03, 2026",
    updated_at: "Oct 16, 2026",
  },
  {
    id: 4,
    name: "Expert",
    description:
      "Master specialized topics and apply your knowledge to challenging projects.",
    is_active: false,
    courses: 3,
    created_at: "Oct 04, 2026",
    updated_at: "Oct 15, 2026",
  },
  {
    id: 5,
    name: "Foundation",
    description:
      "Start learning with introductory lessons and step-by-step guidance.",
    is_active: true,
    courses: 5,
    created_at: "Oct 05, 2026",
    updated_at: "Oct 14, 2026",
  },
  {
    id: 6,
    name: "Professional",
    description:
      "Prepare for professional workflows with practical, industry-focused learning.",
    is_active: false,
    courses: 4,
    created_at: "Oct 06, 2026",
    updated_at: "Oct 13, 2026",
  },
  {
    id: 7,
    name: "Specialist",
    description:
      "Focus on a specific area and develop deeper subject-matter expertise.",
    is_active: true,
    courses: 2,
    created_at: "Oct 07, 2026",
    updated_at: "Oct 12, 2026",
  },
];

const LevelManagementPage = () => {
  const [levels, setLevels] = useState<CourseLevel[]>(INITIAL_LEVELS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleFilter = (filter: StatusFilter) => {
    setStatusFilter(filter);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen w-full space-y-6 bg-black text-white">
      <section className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
        />

        <div className="relative flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] ring-1 ring-inset ring-[#34D399]/25">
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
            className="group relative inline-flex h-11 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Plus className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            <span className="relative z-10">Add Level</span>
          </button>
        </div>

        <div className="relative grid grid-cols-2 divide-white/[0.06] border-t border-white/[0.06] sm:grid-cols-4 sm:divide-x">
          <StatCell
            label="Total Levels"
            value={totalCount}
            icon={<GraduationCap className="h-4 w-4" />}
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
            aria-label="Search levels"
            className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
          />
        </div>
      </section>

      {filteredLevels.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {paginatedLevels.map((level) => (
            <article
              key={level.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:shadow-[0_14px_40px_-12px_rgba(52,211,153,0.25)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

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

              <p
                className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm leading-5 text-white/60"
                title={level.description}
              >
                {level.description || "No description provided"}
              </p>

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
                    aria-label={`Edit ${level.name}`}
                    title="Edit level"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                  >
                    <Pencil className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className={`inline-flex h-9 w-[125px] shrink-0 items-center justify-center rounded-lg text-xs font-medium transition-all duration-300 hover:scale-[1.02] ${
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
      ) : (
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
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
          </div>
        </section>
      )}

      {filteredLevels.length > 0 && totalPages > 1 && (
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
              {filteredLevels.length}
            </span>{" "}
            levels
          </p>
          <div className="flex items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setCurrentPage(Math.max(safePage - 1, 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                    safePage === page
                      ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                      : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => setCurrentPage(Math.min(safePage + 1, totalPages))}
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
    className={`inline-flex h-7 w-20 shrink-0 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
      isActive
        ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
        : "bg-red-400/10 text-red-400 ring-red-400/20"
    }`}
  >
    <span
      className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#34D399]" : "bg-red-400"}`}
    />
    {isActive ? "Active" : "Inactive"}
  </span>
);

export default LevelManagementPage;
