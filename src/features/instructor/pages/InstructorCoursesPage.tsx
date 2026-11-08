import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpDown,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crown,
  Eye,
  EyeOff,
  FileEdit,
  LayoutGrid,
  MessageSquare,
  MoreVertical,
  PencilLine,
  PlusCircle,
  Search,
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

// Number of courses shown per page in the grid.
const COURSES_PER_PAGE = 8;

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
  createdAt: string;
  publishedAt: string | null;
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
    createdAt: "2026-09-10T12:00:00Z",
    publishedAt: "2026-10-20T12:00:00Z",
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
    createdAt: "2026-08-20T12:00:00Z",
    publishedAt: "2026-09-10T12:00:00Z",
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
    createdAt: "2026-07-05T12:00:00Z",
    publishedAt: "2026-08-01T12:00:00Z",
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
    createdAt: "2026-10-25T12:00:00Z",
    publishedAt: null,
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
    createdAt: "2026-11-01T12:00:00Z",
    publishedAt: null,
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
    createdAt: "2026-10-01T12:00:00Z",
    publishedAt: null,
    updatedAt: "2026-10-18T12:00:00Z",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&h=520&fit=crop",
    skills: ["Docker", "Kubernetes", "CI/CD"],
  },
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
    createdAt: "2026-09-10T12:00:00Z",
    publishedAt: "2026-10-20T12:00:00Z",
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
    createdAt: "2026-08-20T12:00:00Z",
    publishedAt: "2026-09-10T12:00:00Z",
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
    createdAt: "2026-07-05T12:00:00Z",
    publishedAt: "2026-08-01T12:00:00Z",
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
    createdAt: "2026-10-25T12:00:00Z",
    publishedAt: null,
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
    createdAt: "2026-11-01T12:00:00Z",
    publishedAt: null,
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
    createdAt: "2026-10-01T12:00:00Z",
    publishedAt: null,
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
    // Solid-dark base so the pill stays readable over light/white cover images.
    icon: CheckCircle2,
    className: "border-emerald-400/40 bg-emerald-950/85 text-emerald-200",
    dot: "bg-emerald-400",
  },
  draft: {
    label: "Draft",
    icon: FileEdit,
    className: "border-white/25 bg-black/75 text-white/85",
    dot: "bg-white/50",
  },
  under_review: {
    label: "Under Review",
    icon: Clock3,
    className: "border-amber-400/40 bg-amber-950/85 text-amber-200",
    dot: "bg-amber-400",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: "border-red-400/40 bg-red-950/85 text-red-200",
    dot: "bg-red-400",
  },
};

type StatusFilter = "all" | CourseStatus;
type SortOption =
  | "recently_published"
  | "top_rated"
  | "lowest_rated"
  | "most_students"
  | "least_students"
  | "title_asc"
  | "title_desc";

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Drafts" },
  { value: "under_review", label: "Under Review" },
  { value: "rejected", label: "Rejected" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "recently_published", label: "Recently published" },
  { value: "top_rated", label: "Top rated" },
  { value: "lowest_rated", label: "Lowest rated" },
  { value: "most_students", label: "Most students" },
  { value: "least_students", label: "Least students" },
  { value: "title_asc", label: "Title (A–Z)" },
  { value: "title_desc", label: "Title (Z–A)" },
];

/* ──────────────────────────────────── pagination helper */

// Builds a compact page list with "…" gaps, e.g. [1, "…", 4, 5, 6, "…", 12].
const buildPageItems = (
  current: number,
  total: number,
): (number | "ellipsis")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const items: (number | "ellipsis")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) items.push(page);
  if (end < total - 1) items.push("ellipsis");

  items.push(total);
  return items;
};

/* ──────────────────────────────────── course card */

const CourseCard = ({
  course,
  delay,
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
  delay: number;
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
    <article
      /* `animate-page-item` + staggered `animationDelay` gives the cards the
         same load-in entrance the stat tiles use. `transform-gpu` +
         backface-visibility keep the rounded corners crisp during the
         translate so no 1px light seam appears while the card animates. */
      className="group animate-page-item relative flex min-w-0 transform-gpu flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0D0D0D] [backface-visibility:hidden] transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:border-[#3B82F6]/25"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glassy sheen on hover */}
      <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Cover image */}
      <div className="relative h-40 overflow-hidden bg-[#0D0D0D]">
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
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold shadow-lg shadow-black/30 backdrop-blur-md ${status.className}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>

        {/* Lessons — bottom-left */}
        <div className="absolute bottom-3 left-3 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
            <BookOpen className="h-3.5 w-3.5 text-[#60A5FA]" />
            {course.lessons} lessons
          </span>
        </div>

        {/* Duration — bottom-right corner */}
        <div className="absolute bottom-3 right-3 z-20">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/60 px-2.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
            <Clock3 className="h-3.5 w-3.5 text-[#60A5FA]" />
            {course.duration}
          </span>
        </div>
      </div>

      {/* Body — pulled up 1px over its own solid background so the image/body
          junction never shows a light seam line on load. */}
      <div className="relative z-[1] -mt-px flex flex-1 flex-col bg-[#0D0D0D] p-5">
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
                      <Eye className="h-3.5 w-3.5 text-[#60A5FA]" />
                      Preview
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
  const [sortBy, setSortBy] = useState<SortOption>("recently_published");
  const [sortOpen, setSortOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // Ref to the sort control so we can close the menu on an outside click
  // WITHOUT a full-screen fixed backdrop (a fixed overlay swallows wheel /
  // touch events, which is what was blocking page scroll while open).
  const sortRef = useRef<HTMLDivElement>(null);

  // Pagination — current page for the course grid.
  const [currentPage, setCurrentPage] = useState(1);

  // Close the sort menu when clicking anywhere outside it. The page stays
  // scrollable while the menu is open because there is no overlay in the way.
  useEffect(() => {
    if (!sortOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortOpen]);

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
        case "recently_published": {
          const aPublished = a.publishedAt
            ? new Date(a.publishedAt).getTime()
            : 0;
          const bPublished = b.publishedAt
            ? new Date(b.publishedAt).getTime()
            : 0;
          return bPublished - aPublished;
        }
        case "top_rated":
          // Courses without ratings stay after rated courses.
          return (
            (b.rating > 0 ? b.rating : -1) - (a.rating > 0 ? a.rating : -1)
          );
        case "lowest_rated": {
          // Ignore zero ratings when ordering; unrated courses stay last.
          const aRating = a.rating > 0 ? a.rating : Number.POSITIVE_INFINITY;
          const bRating = b.rating > 0 ? b.rating : Number.POSITIVE_INFINITY;
          return aRating - bRating;
        }
        case "most_students":
          return b.students - a.students;
        case "least_students":
          return a.students - b.students;
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, statusFilter, sortBy]);

  // Total pages for the current filtered/sorted set (never below 1).
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / COURSES_PER_PAGE),
  );

  // Page resets happen in the event handlers that change the filters (search,
  // status tabs, sort, clear) — no effect and no setState during render, so no
  // cascading-render warning.

  // Keep the page in range by *deriving* a safe value rather than storing a
  // corrected one, so the page stays valid even if the result set shrinks.
  const safePage = Math.min(currentPage, totalPages);

  // The slice of courses shown on the current page.
  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, safePage]);

  const pageItems = useMemo(
    () => buildPageItems(safePage, totalPages),
    [safePage, totalPages],
  );

  // Index range shown, for the "X–Y of N" label.
  const rangeStart =
    filteredCourses.length === 0 ? 0 : (safePage - 1) * COURSES_PER_PAGE + 1;
  const rangeEnd = Math.min(
    safePage * COURSES_PER_PAGE,
    filteredCourses.length,
  );

  const goToPage = (page: number) => {
    setOpenMenuId(null);
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

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
    setSortBy("recently_published");
    setSortOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Hover sheen + card entrance keyframes (shared pattern) */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }

        /* Load-in entrance for the course cards. Falls back to a defined
           class if the project already ships one; this local copy guarantees
           the animation works even if the global utility isn't present. */
        @keyframes lp-course-in {
          0% { opacity: 0; transform: translateY(14px) scale(0.985); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-page-item {
          opacity: 0;
          animation: lp-course-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen { display: none; }
          .animate-page-item {
            opacity: 1;
            animation: none;
          }
        }
      `}</style>

      {/* ───────── Page header ───────── */}
      <section className="animate-page-item" style={{ animationDelay: "80ms" }}>
        <div className="relative overflow-hidden rounded-3xl border border-[#3B82F6]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] p-7 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
          {/* Blue ambient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#3B82F6]/15 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#3B82F6]/[0.06] blur-3xl"
          />

          {/* Top accent line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#60A5FA]/60 to-transparent"
          />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            {/* Header content */}
            <div className="flex items-center gap-4 cursor-default">
              {/* Course icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/[0.04] text-[#60A5FA] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#3B82F6]/25">
                <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              </div>

              {/* Title and description */}
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  My Courses
                </h1>

                <p className="mt-1 text-sm text-white/50">
                  Build, organize, and manage all your courses in one place.
                </p>
              </div>
            </div>

            {/* Create Course */}
            <button
              type="button"
              onClick={handleCreate}
              className="group relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#3B82F6]/25 bg-[#3B82F6]/10 px-5 text-sm font-medium text-[#60A5FA] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3B82F6]/15 hover:shadow-[0_8px_24px_-6px_rgba(59,130,246,0.35)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#60A5FA]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <PlusCircle
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                strokeWidth={2}
              />

              <span className="relative z-10">Create Course</span>
            </button>
          </div>
        </div>
      </section>

      {/* ───────── Course Stats ───────── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Total Courses */}
        <div
          className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-[#93C5FD]/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-[#93C5FD]/40"
          style={{ animationDelay: "160ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#93C5FD]/50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#93C5FD]/[0.07] blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Total Courses
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-[#BFDBFE]">
                {myCourses.length}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#93C5FD]/10 text-[#93C5FD] ring-1 ring-inset ring-[#93C5FD]/20">
              <LayoutGrid className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Published */}
        <div
          className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-emerald-400/40"
          style={{ animationDelay: "220ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-400/[0.08] blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Published
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-emerald-300">
                {stats.published}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
              <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div
          className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/30"
          style={{ animationDelay: "280ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Drafts
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-white/80">
                {stats.drafts}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-white/65 ring-1 ring-inset ring-white/10">
              <FileEdit className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Under Review */}
        <div
          className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-amber-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-amber-400/35"
          style={{ animationDelay: "340ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.06] blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Under Review
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-amber-300">
                {
                  myCourses.filter((course) => course.status === "under_review")
                    .length
                }
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/20">
              <Clock3 className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
        </div>

        {/* Total Students */}
        <div
          className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-violet-400/35"
          style={{ animationDelay: "400ms" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-400/[0.06] blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Total Students
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-violet-300">
                {formatCompact(stats.totalStudents)}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300 ring-1 ring-inset ring-violet-400/20">
              <Users className="h-5 w-5" strokeWidth={1.8} />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Controls: search + sort */}
      <section
        className="animate-page-item space-y-5"
        style={{ animationDelay: "460ms" }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="group relative min-w-0 flex-1 lg:flex-[1.5]">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#60A5FA]" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search your courses, categories, or skills..."
              aria-label="Search courses"
              className="h-11 w-full rounded-2xl border border-white/[0.08] bg-[#0A0A0A] pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/15 focus:border-[#3B82F6]/40 focus:ring-2 focus:ring-[#3B82F6]/10"
            />
          </div>

          {/* Sort by */}
          <div className="flex min-w-0 items-center gap-3 lg:w-[280px] lg:shrink-0">
            <span className="shrink-0 text-xs font-medium text-white/45">
              Sort by
            </span>

            <div ref={sortRef} className="relative min-w-0 flex-1">
              <button
                type="button"
                onClick={() => setSortOpen((open) => !open)}
                aria-label="Sort courses"
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                className={`flex h-11 w-full cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 text-left transition-all duration-200 ${
                  sortOpen
                    ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.08]"
                    : "border-white/[0.08] bg-[#0A0A0A] hover:border-white/[0.16]"
                }`}
              >
                <ArrowUpDown className="h-4 w-4 shrink-0 text-[#60A5FA]" />

                <span className="min-w-0 flex-1 truncate text-xs font-medium text-white/85">
                  {activeSort.label}
                </span>

                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-200 ${
                    sortOpen ? "rotate-180 text-[#60A5FA]" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <div
                  role="listbox"
                  aria-label="Sort courses by"
                  className="absolute right-0 top-[calc(100%+8px)] z-40 w-full min-w-[200px] overflow-hidden rounded-xl border border-white/[0.09] bg-[#0D0D0D] p-1.5 shadow-2xl shadow-black/50"
                >
                  <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    Sort courses
                  </p>

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
                          setCurrentPage(1);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-xs transition-colors ${
                          isActive
                            ? "bg-[#3B82F6]/[0.12] font-medium text-[#8FBAFF]"
                            : "text-white/60 hover:bg-white/[0.05] hover:text-white"
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
              )}
            </div>
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
                onClick={() => {
                  setStatusFilter(tab.value);
                  setCurrentPage(1);
                }}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.12] text-white ring-1 ring-inset ring-[#3B82F6]/20"
                    : "border-white/[0.07] bg-[#0A0A0A] text-white/55 hover:border-white/15 hover:text-white/85"
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-[3px] text-[10px] font-semibold tabular-nums ${
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
      <section
        className="animate-page-item space-y-5"
        style={{ animationDelay: "520ms" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          {/* Left content */}
          <div>
            <h3 className="text-lg font-medium tracking-tight text-white">
              Your Teaching Space
            </h3>
            <p className="mt-1 text-sm text-white/45">
              Manage your courses and keep your learning community growing.
            </p>
          </div>

          {/* Right content */}
          <p className="text-left text-[11px] uppercase tracking-wider text-white/45 sm:text-right">
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
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {paginatedCourses.map((course, index) => {
                // Absolute position in the filtered list — a stable, unique key
                // even if two courses share the same id (e.g. duplicated data),
                // which is what keeps the grid updating correctly across pages.
                const itemKey = (safePage - 1) * COURSES_PER_PAGE + index;
                return (
                  <CourseCard
                    key={itemKey}
                    course={course}
                    // Staggered entrance: each card fades/rises in a beat
                    // after the one before it when the grid (re)mounts.
                    delay={120 + index * 60}
                    menuOpen={openMenuId === itemKey}
                    onToggleMenu={() =>
                      setOpenMenuId((current) =>
                        current === itemKey ? null : itemKey,
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
                );
              })}
            </div>

            {/* ───────── Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Course pagination"
                className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 sm:flex-row"
              >
                {/* Range label */}
                <p className="text-[11px] uppercase tracking-wider text-white/45">
                  <span className="mr-1">Showing</span>
                  <span className="font-semibold tabular-nums text-white/80">
                    {rangeStart}–{rangeEnd}
                  </span>
                  <span className="mx-1 text-white/25">of</span>
                  <span className="font-medium tabular-nums text-[#60A5FA]">
                    {filteredCourses.length}
                  </span>
                </p>

                {/* Page controls */}
                <div className="flex items-center gap-1.5">
                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    aria-label="Previous page"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-[#0A0A0A] text-white/60 transition-all hover:border-[#3B82F6]/35 hover:bg-[#3B82F6]/[0.08] hover:text-[#8FBAFF] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/[0.08] disabled:hover:bg-[#0A0A0A] disabled:hover:text-white/60"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {/* Numbered pages */}
                  {pageItems.map((item, index) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="inline-flex h-9 w-9 items-center justify-center text-white/30"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => goToPage(item)}
                        aria-label={`Page ${item}`}
                        aria-current={item === safePage ? "page" : undefined}
                        className={`inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border px-2 text-xs font-semibold tabular-nums transition-all ${
                          item === safePage
                            ? "border-[#3B82F6]/40 bg-[#3B82F6]/[0.14] text-white ring-1 ring-inset ring-[#3B82F6]/20"
                            : "border-white/[0.08] bg-[#0A0A0A] text-white/60 hover:border-[#3B82F6]/35 hover:bg-[#3B82F6]/[0.08] hover:text-[#8FBAFF]"
                        }`}
                      >
                        {item}
                      </button>
                    ),
                  )}

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    aria-label="Next page"
                    className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-[#0A0A0A] text-white/60 transition-all hover:border-[#3B82F6]/35 hover:bg-[#3B82F6]/[0.08] hover:text-[#8FBAFF] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/[0.08] disabled:hover:bg-[#0A0A0A] disabled:hover:text-white/60"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </nav>
            )}
          </>
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
