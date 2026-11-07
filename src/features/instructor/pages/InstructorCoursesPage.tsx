import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpDown,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Crown,
  EyeOff,
  FileEdit,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  PencilLine,
  PlusCircle,
  Search,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Users,
  UsersRound,
  XCircle,
  type LucideIcon,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   INSTRUCTOR "MY COURSES" PAGE — UI ONLY
   Blue & black instructor shell (#0A0A0A surfaces, #3B82F6 royal blue
   accent) to match InstructorSidebar / InstructorHeader / Settings.
   Dummy data + stubbed handlers; wire to the real API later.
   ────────────────────────────────────────────────────────────────── */

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

/* ──────────────────────────────────── types + mock data */

type CourseStatus = "published" | "draft" | "under_review" | "rejected";

type InstructorCourse = {
  id: number;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  plan: "Premium" | "Free";
  status: CourseStatus;
  price: number;
  students: number;
  rating: number;
  reviews: string;
  lessons: number;
  duration: string;
  updatedAt: string;
  image: string;
  skills: string[];
};

// UI-only mock data. Replace with the instructor's courses from the API.
const myCourses: InstructorCourse[] = [
  {
    id: 1,
    title: "Modern React & TypeScript",
    description:
      "Build polished, scalable interfaces with React, TypeScript, and modern frontend patterns.",
    category: "Frontend Development",
    level: "Intermediate",
    plan: "Premium",
    status: "published",
    price: 1499,
    students: 1240,
    rating: 4.9,
    reviews: "1.2k",
    lessons: 32,
    duration: "12 hours",
    updatedAt: "2026-10-28T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&h=520&fit=crop",
    skills: ["React", "TypeScript", "UI Patterns"],
  },
  {
    id: 2,
    title: "Django REST Framework Masterclass",
    description:
      "Design secure, maintainable APIs and connect them to real-world applications.",
    category: "Backend Development",
    level: "Intermediate",
    plan: "Premium",
    status: "published",
    price: 1799,
    students: 980,
    rating: 4.8,
    reviews: "980",
    lessons: 40,
    duration: "16 hours",
    updatedAt: "2026-09-15T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=900&h=520&fit=crop",
    skills: ["Django", "REST APIs", "Python"],
  },
  {
    id: 3,
    title: "PostgreSQL & Database Design",
    description:
      "Learn relational data modeling, SQL fundamentals, and practical query optimization.",
    category: "Database",
    level: "Beginner",
    plan: "Free",
    status: "published",
    price: 0,
    students: 760,
    rating: 4.9,
    reviews: "760",
    lessons: 24,
    duration: "9 hours",
    updatedAt: "2026-08-02T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=900&h=520&fit=crop",
    skills: ["PostgreSQL", "SQL", "Data Modeling"],
  },
  {
    id: 4,
    title: "Advanced System Design",
    description:
      "Architect resilient, distributed systems with caching, queues, and scaling strategies.",
    category: "Architecture",
    level: "Advanced",
    plan: "Premium",
    status: "under_review",
    price: 2499,
    students: 0,
    rating: 0,
    reviews: "0",
    lessons: 28,
    duration: "14 hours",
    updatedAt: "2026-11-04T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&h=520&fit=crop",
    skills: ["Scaling", "Caching", "Queues"],
  },
  {
    id: 5,
    title: "Tailwind CSS from Scratch",
    description:
      "Design beautiful, responsive interfaces fast with a utility-first workflow.",
    category: "Frontend Development",
    level: "Beginner",
    plan: "Free",
    status: "draft",
    price: 0,
    students: 0,
    rating: 0,
    reviews: "0",
    lessons: 18,
    duration: "7 hours",
    updatedAt: "2026-11-06T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&h=520&fit=crop",
    skills: ["Tailwind", "CSS", "Responsive"],
  },
  {
    id: 6,
    title: "Docker & Kubernetes Essentials",
    description:
      "Containerize apps and orchestrate them confidently from local dev to production.",
    category: "DevOps",
    level: "Intermediate",
    plan: "Premium",
    status: "rejected",
    price: 1999,
    students: 0,
    rating: 0,
    reviews: "0",
    lessons: 30,
    duration: "13 hours",
    updatedAt: "2026-10-18T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&h=520&fit=crop",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
];

/* ──────────────────────────────────── helpers */

const formatRelativeUpdate = (iso: string) => {
  const elapsed = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 1000),
  );
  const units = [
    { label: "year", seconds: 365 * 24 * 60 * 60 },
    { label: "month", seconds: 30 * 24 * 60 * 60 },
    { label: "week", seconds: 7 * 24 * 60 * 60 },
    { label: "day", seconds: 24 * 60 * 60 },
    { label: "hour", seconds: 60 * 60 },
    { label: "minute", seconds: 60 },
  ];
  for (const unit of units) {
    const amount = Math.floor(elapsed / unit.seconds);
    if (amount >= 1)
      return `${amount} ${unit.label}${amount === 1 ? "" : "s"} ago`;
  }
  return "Just now";
};

const formatCompact = (value: number) => {
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
};

const STATUS_META: Record<
  CourseStatus,
  { label: string; icon: LucideIcon; className: string; dot: string }
> = {
  published: {
    label: "Published",
    icon: CheckCircle2,
    className: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  draft: {
    label: "Draft",
    icon: FileEdit,
    className: "border-white/15 bg-white/[0.04] text-white/60",
    dot: "bg-white/50",
  },
  under_review: {
    label: "Under Review",
    icon: Clock3,
    className: "border-amber-400/25 bg-amber-500/10 text-amber-300",
    dot: "bg-amber-400",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "border-red-400/25 bg-red-500/10 text-red-300",
    dot: "bg-red-400",
  },
};

type StatusFilter = "all" | CourseStatus;
type SortOption = "recent" | "students" | "rating" | "title";

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "under_review", label: "Under Review" },
  { value: "rejected", label: "Rejected" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Recently updated" },
  { value: "students", label: "Most students" },
  { value: "rating", label: "Top rated" },
  { value: "title", label: "Title (A–Z)" },
];

/* ──────────────────────────────────── stat tile */

const StatTile = ({
  icon: Icon,
  label,
  value,
  accent = "text-[#60A5FA]",
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: string;
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0A0A0A] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6]/25 hover:shadow-[0_10px_30px_-18px_rgba(59,130,246,0.6)]">
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#3B82F6]/[0.07] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    <div className="relative flex items-center justify-between gap-3">
      <span className="text-xs font-medium text-white/55">{label}</span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#3B82F6]/15 bg-[#3B82F6]/[0.10] transition-colors duration-300 group-hover:bg-[#3B82F6]/[0.18]">
        <Icon className={`h-4 w-4 ${accent}`} strokeWidth={1.8} />
      </span>
    </div>
    <p
      className="relative mt-2 text-2xl font-semibold tracking-tight text-white"
      style={{ fontFamily: DISPLAY_FONT }}
    >
      {value}
    </p>
  </div>
);

/* ──────────────────────────────────── course card */

const CourseCard = ({
  course,
  menuOpen,
  onToggleMenu,
  onEdit,
  onView,
  onAnalytics,
  onReviews,
  onCommunity,
  onDelete,
  onTogglePublish,
}: {
  course: InstructorCourse;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onView: () => void;
  onAnalytics: () => void;
  onReviews: () => void;
  onCommunity: () => void;
  onDelete: () => void;
  onTogglePublish: () => void;
}) => {
  const status = STATUS_META[course.status];
  const StatusIcon = status.icon;
  const isPublished = course.status === "published";

  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0D0D0D] transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:border-[#3B82F6]/25">
      {/* Glassy sheen on hover */}
      <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Cover image */}
      <div className="relative h-40 overflow-hidden bg-[#111]">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="block h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/20 to-transparent" />

        {/* Plan pill */}
        <div className="absolute left-3 top-3 z-20">
          {course.plan === "Premium" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95 px-3 py-1.5 text-[11px] font-semibold text-amber-200 shadow-[0_4px_18px_rgba(245,158,11,0.18)] backdrop-blur-md">
              <Crown className="h-3.5 w-3.5 text-amber-300" />
              Premium
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#06251D]/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg backdrop-blur-md">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Free
            </span>
          )}
        </div>

        {/* Status pill */}
        <div className="absolute right-3 top-3 z-20">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold backdrop-blur-md ${status.className}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>

        {/* Lessons + duration */}
        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-[#60A5FA]" />
            {course.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
            <Clock3 className="h-3.5 w-3.5 text-[#60A5FA]" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/[0.08] px-3 py-1 text-[10px] font-medium text-[#8FBAFF]">
            {course.category}
          </span>
          <span className="text-[11px] text-white/35">
            {formatRelativeUpdate(course.updatedAt)}
          </span>
        </div>

        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
          {course.level} level
        </p>

        <h3
          className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-[#8FBAFF]"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-[1.65] text-white/50">
          {course.description}
        </p>

        {/* Metrics */}
        <div className="my-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-[#60A5FA]">
              <Users className="h-3.5 w-3.5" />
            </div>
            <p className="mt-1 text-sm font-semibold tabular-nums text-white">
              {formatCompact(course.students)}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-white/35">
              Students
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-300">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </div>
            <p className="mt-1 text-sm font-semibold tabular-nums text-white">
              {course.rating > 0 ? course.rating.toFixed(1) : "—"}
            </p>
            <p className="text-[9px] uppercase tracking-wide text-white/35">
              Rating
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto space-y-2 border-t border-white/[0.07] pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="group/button inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/60"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </button>

            {/* Delete (replaces the former Analytics icon button) */}
            <button
              type="button"
              onClick={onDelete}
              aria-label="Delete course"
              title="Delete"
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-red-500/15 bg-red-500/[0.05] text-red-400 transition-all duration-300 hover:border-red-400/35 hover:bg-red-500/[0.10] hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            {/* Kebab menu */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={onToggleMenu}
                aria-label="More actions"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border transition-all duration-300 ${
                  menuOpen
                    ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.10] text-[#8FBAFF]"
                    : "border-white/[0.08] bg-white/[0.02] text-white/55 hover:border-[#3B82F6]/35 hover:bg-[#3B82F6]/[0.08] hover:text-[#8FBAFF]"
                }`}
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={onToggleMenu}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div
                    role="menu"
                    className="absolute bottom-[calc(100%+8px)] right-0 z-50 w-44 overflow-hidden rounded-xl border border-white/[0.08] bg-[#0A0A0A] p-1.5 shadow-2xl shadow-black/60 ring-1 ring-white/[0.04]"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={onView}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <BookOpen className="h-3.5 w-3.5 text-[#60A5FA]" />
                      View as student
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={onAnalytics}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <BarChart3 className="h-3.5 w-3.5 text-[#60A5FA]" />
                      Analytics
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={onReviews}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-[#60A5FA]" />
                      Reviews
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={onCommunity}
                      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-medium text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      <UsersRound className="h-3.5 w-3.5 text-[#60A5FA]" />
                      Community
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Publish / Unpublish toggle */}
          <button
            type="button"
            onClick={onTogglePublish}
            className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-300 ${
              isPublished
                ? "border-amber-400/25 bg-amber-500/[0.08] text-amber-300 hover:border-amber-400/40 hover:bg-amber-500/[0.14]"
                : "border-emerald-400/25 bg-emerald-500/[0.08] text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/[0.14]"
            }`}
          >
            {isPublished ? (
              <>
                <EyeOff className="h-3.5 w-3.5" />
                Unpublish
              </>
            ) : (
              <>
                <Upload className="h-3.5 w-3.5" />
                Publish
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

/* ──────────────────────────────────── page */

const InstructorCoursesPage = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [sortOpen, setSortOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const stats = useMemo(() => {
    const published = myCourses.filter((c) => c.status === "published").length;
    const drafts = myCourses.filter((c) => c.status === "draft").length;
    const totalStudents = myCourses.reduce((sum, c) => sum + c.students, 0);
    return { published, drafts, totalStudents };
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<StatusFilter, number> = {
      all: myCourses.length,
      published: 0,
      draft: 0,
      under_review: 0,
      rejected: 0,
    };
    for (const course of myCourses) counts[course.status] += 1;
    return counts;
  }, []);

  const filteredCourses = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    let result = myCourses.filter((course) => {
      const matchesStatus =
        statusFilter === "all" || course.status === statusFilter;
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.skills.some((skill) => skill.toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "students":
          return b.students - a.students;
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        case "recent":
        default:
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
      }
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  const activeSort =
    sortOptions.find((option) => option.value === sortBy) ?? sortOptions[0];

  // Stubbed handlers — wire to real routes / API later.
  const handleCreate = () => {
    console.log("Create new course");
    // navigate("/instructor/courses/new");
  };
  const handleEdit = (id: number) => {
    console.log("Edit course", id);
    // navigate(`/instructor/courses/${id}/edit`);
  };
  const handleView = (id: number) => {
    setOpenMenuId(null);
    navigate(`/student/courses/${id}`);
  };
  const handleAnalytics = (id: number) => {
    setOpenMenuId(null);
    console.log("Open analytics for course", id);
    // navigate(`/instructor/courses/${id}/analytics`);
  };
  const handleReviews = (id: number) => {
    setOpenMenuId(null);
    console.log("Open reviews for course", id);
    // navigate(`/instructor/courses/${id}/reviews`);
  };
  const handleCommunity = (id: number) => {
    setOpenMenuId(null);
    console.log("Open community for course", id);
    // navigate(`/instructor/courses/${id}/community`);
  };
  const handleDelete = (id: number) => {
    setOpenMenuId(null);
    console.log("Delete course", id);
  };
  const handleTogglePublish = (id: number) => {
    setOpenMenuId(null);
    console.log("Toggle publish for course", id);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("recent");
    setSortOpen(false);
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Hover sheen keyframes (shared pattern) */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen { display: none; }
        }
      `}</style>

      {/* ───────── Page header */}
      <section>
        <div className="rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
          <div className="relative overflow-hidden rounded-[25px] bg-[#0A0A0A] p-6 sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#3B82F6]/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-28 left-1/3 h-52 w-52 rounded-full bg-[#3B82F6]/[0.07] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_URL}")` }}
            />

            <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-medium text-[#60A5FA]">
                  <Sparkles className="h-4 w-4" />
                  Course Management
                </p>

                <h1
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    backgroundImage:
                      "linear-gradient(90deg, #FFFFFF 0%, #DBEAFE 45%, #60A5FA 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                  }}
                >
                  My Courses
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  Create, manage, and track every course you teach on Launch
                  Point — all in one place.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCreate}
                className="group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 self-start overflow-hidden rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/60 lg:self-center"
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <PlusCircle className="relative h-[18px] w-[18px]" />
                <span className="relative">Create Course</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Stats */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatTile
          icon={LayoutGrid}
          label="Total courses"
          value={String(myCourses.length)}
        />
        <StatTile
          icon={CheckCircle2}
          label="Published"
          value={String(stats.published)}
          accent="text-emerald-300"
        />
        <StatTile
          icon={Users}
          label="Total students"
          value={formatCompact(stats.totalStudents)}
        />
      </section>

      {/* ───────── Controls: search + sort */}
      <section className="space-y-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="group relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#60A5FA]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search your courses, categories, or skills..."
              aria-label="Search courses"
              className="h-14 w-full rounded-2xl border border-white/[0.08] bg-[#0A0A0A] pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/15 focus:border-[#3B82F6]/40 focus:ring-2 focus:ring-[#3B82F6]/10"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative min-w-0 lg:w-56">
            <button
              type="button"
              onClick={() => setSortOpen((open) => !open)}
              aria-label="Sort courses"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className={`flex h-14 w-full cursor-pointer items-center gap-3 rounded-2xl border bg-[#0A0A0A] px-4 text-left transition-all duration-200 ${
                sortOpen
                  ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.06] shadow-lg shadow-blue-950/10"
                  : "border-white/[0.08] hover:border-[#3B82F6]/30"
              }`}
            >
              <ArrowUpDown className="h-4 w-4 shrink-0 text-[#60A5FA]" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] text-white/40">Sort by</span>
                <span className="mt-0.5 block truncate text-xs font-medium text-white/85">
                  {activeSort.label}
                </span>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                  sortOpen ? "rotate-180 text-[#60A5FA]" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close sort menu"
                  onClick={() => setSortOpen(false)}
                  className="fixed inset-0 z-40 cursor-default"
                />
                <div
                  role="listbox"
                  aria-label="Sort courses by"
                  className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(260px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-2 shadow-2xl shadow-black/60 ring-1 ring-white/[0.04]"
                >
                  {sortOptions.map((option) => {
                    const isActive = option.value === sortBy;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
                        aria-selected={isActive}
                        onClick={() => {
                          setSortBy(option.value);
                          setSortOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                          isActive
                            ? "bg-[#3B82F6]/15 font-medium text-[#8FBAFF]"
                            : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        {option.label}
                        {isActive && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#60A5FA]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.12] text-white ring-1 ring-inset ring-[#3B82F6]/20"
                    : "border-white/[0.07] bg-[#0A0A0A] text-white/55 hover:border-white/15 hover:text-white/85"
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                    isActive
                      ? "bg-[#3B82F6]/20 text-[#8FBAFF]"
                      : "bg-white/[0.06] text-white/45"
                  }`}
                >
                  {statusCounts[tab.value]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ───────── Course grid */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <p className="text-[10px] uppercase tracking-wider text-white/45">
            <span className="mr-1">Showing</span>
            <span className="font-semibold tabular-nums text-white/80">
              {filteredCourses.length}
            </span>
            <span className="mx-1 text-white/25">of</span>
            <span className="font-medium tabular-nums text-[#60A5FA]">
              {myCourses.length}
            </span>
            <span className="ml-0.5">courses</span>
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                menuOpen={openMenuId === course.id}
                onToggleMenu={() =>
                  setOpenMenuId((current) =>
                    current === course.id ? null : course.id,
                  )
                }
                onEdit={() => handleEdit(course.id)}
                onView={() => handleView(course.id)}
                onAnalytics={() => handleAnalytics(course.id)}
                onReviews={() => handleReviews(course.id)}
                onCommunity={() => handleCommunity(course.id)}
                onDelete={() => handleDelete(course.id)}
                onTogglePublish={() => handleTogglePublish(course.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="relative overflow-hidden rounded-3xl border border-[#3B82F6]/15 bg-gradient-to-b from-[#3B82F6]/[0.06] to-transparent px-6 py-16 text-center">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#3B82F6]/[0.12] blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#3B82F6]/25 bg-gradient-to-br from-[#3B82F6]/25 to-[#2563EB]/5 text-[#60A5FA] shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]">
                <BookOpen className="h-7 w-7" />
              </div>

              <h2
                className="text-lg font-semibold text-white sm:text-xl"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {searchQuery || statusFilter !== "all"
                  ? "No courses match your filters"
                  : "You haven't created any courses yet"}
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/50">
                {searchQuery || statusFilter !== "all"
                  ? "Try a different search or clear your filters to see more courses."
                  : "Start building your first course and share your expertise with learners around the world."}
              </p>

              {searchQuery || statusFilter !== "all" ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/[0.08] hover:text-white"
                >
                  Clear filters
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <PlusCircle className="h-4 w-4" />
                  Create your first course
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default InstructorCoursesPage;
