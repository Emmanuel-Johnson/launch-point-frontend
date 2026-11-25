import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Eye,
  FileArchive,
  FilePlus2,
  FileText,
  FileVideo,
  GripVertical,
  HelpCircle,
  ImagePlus,
  LayoutList,
  Lightbulb,
  PencilLine,
  PlayCircle,
  Plus,
  PlusCircle,
  Save,
  Settings2,
  ShieldCheck,
  Star,
  Trash2,
  Upload,
  UserCheck,
  Users,
  X,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   INSTRUCTOR COURSE BUILDER  —  UI ONLY  (Blue & Black theme)
   ────────────────────────────────────────────────────────────────── */

const CARD_BASE =
  "relative overflow-hidden border border-blue-400/15 bg-linear-to-b from-[#0D1117] to-[#080C10]";

const PILL =
  "border border-white/8 bg-[#0A0D12] text-white/65 transition-colors duration-300 hover:border-blue-400/35 hover:bg-blue-500/[0.07] hover:text-blue-100";

const CardSheen = () => (
  <span className="lp-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-linear-to-r from-transparent via-white/5 to-transparent" />
);

/* ──────────────────────────────────────────────────────────────────
   TYPES + MOCK DATA
   ────────────────────────────────────────────────────────────────── */

type LessonKind = "video" | "quiz" | "resource";

type Lesson = {
  id: string;
  title: string;
  kind: LessonKind;
  duration: string;
  status: "published" | "draft";
};

type Section = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Resource = {
  name: string;
  size: string;
  type: "zip" | "pdf" | "video";
};

const LESSON_ICON: Record<LessonKind, typeof PlayCircle> = {
  video: PlayCircle,
  quiz: HelpCircle,
  resource: FileText,
};

const mockCourse = {
  title: "React Masterclass: Hooks, Patterns & Performance",
  category: "Web Development",
  level: "Intermediate",
  status: "draft" as const,
  students: 0,
  rating: 0,
  thumbnail:
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=675&fit=crop",
};

const mockSections: Section[] = [
  {
    id: "s1",
    title: "Module 1: Python Fundamentals",
    lessons: [
      { id: "l1", title: "Introduction to Hooks", kind: "video", duration: "12:30", status: "published" },
      { id: "l2", title: "Variables & Data Types", kind: "video", duration: "08:45", status: "published" },
      { id: "l3", title: "Control Flow Basics", kind: "video", duration: "15:10", status: "draft" },
      { id: "l4", title: "Python Fundamentals Quiz", kind: "quiz", duration: "—", status: "draft" },
    ],
  },
  {
    id: "s2",
    title: "Module 2: React Masterclass",
    lessons: [
      { id: "l5", title: "Introduction to Hooks", kind: "video", duration: "20:00", status: "published" },
      { id: "l6", title: "Custom Hooks in Depth", kind: "video", duration: "18:30", status: "draft" },
      { id: "l7", title: "Advanced React Patterns", kind: "video", duration: "24:00", status: "draft" },
      { id: "l8", title: "React Masterclass Quiz", kind: "quiz", duration: "—", status: "draft" },
    ],
  },
  {
    id: "s3",
    title: "Module 3: Django for Pros",
    lessons: [],
  },
];

const mockResources: Resource[] = [
  { name: "Course Assets.zip", size: "45.2 MB", type: "zip" },
  { name: "Design-System-Cheat-Sheet.pdf", size: "2.1 MB", type: "pdf" },
  { name: "Intro Demo.mp4", size: "120 MB", type: "video" },
];

const RESOURCE_META: Record<
  Resource["type"],
  { icon: typeof FileText; wrap: string; tint: string }
> = {
  zip: { icon: FileArchive, wrap: "border-blue-400/20 bg-blue-500/10", tint: "text-blue-300" },
  pdf: { icon: FileText, wrap: "border-rose-400/20 bg-rose-500/10", tint: "text-rose-300" },
  video: { icon: FileVideo, wrap: "border-emerald-400/20 bg-emerald-500/10", tint: "text-emerald-300" },
};

/* ──────────────────────────────────────────────────────────────────
   LESSON ROW
   ────────────────────────────────────────────────────────────────── */
function LessonRow({ lesson }: { lesson: Lesson }) {
  const Icon = LESSON_ICON[lesson.kind];
  const isPublished = lesson.status === "published";

  return (
    <div
      className={`${CARD_BASE} group flex cursor-default items-center gap-3 rounded-2xl px-4 py-3 transition-transform duration-200 hover:-translate-y-px hover:border-blue-400/25`}
    >
      <CardSheen />
      <span className="shrink-0 cursor-grab text-white/20 transition-colors group-hover:text-white/40 active:cursor-grabbing">
        <GripVertical className="h-4 w-4" />
      </span>

      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
          lesson.kind === "quiz"
            ? "border-amber-400/20 bg-amber-500/10 text-amber-300"
            : lesson.kind === "resource"
              ? "border-rose-400/20 bg-rose-500/10 text-rose-300"
              : "border-blue-400/20 bg-blue-500/10 text-blue-300"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>

      <p className="min-w-0 flex-1 truncate text-sm font-medium text-white/85">
        {lesson.title}
      </p>

      {lesson.kind === "video" && (
        <span className="hidden shrink-0 items-center gap-1 text-[11px] text-white/40 sm:flex">
          {lesson.duration}
        </span>
      )}

      <span
        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
          isPublished
            ? "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
            : "border border-white/[0.07] bg-white/3 text-white/35"
        }`}
      >
        {isPublished ? "Published" : "Draft"}
      </span>

      <div className="flex shrink-0 items-center gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          type="button"
          aria-label="Edit lesson"
          className={`${PILL} flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl`}
        >
          <PencilLine className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Delete lesson"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-white/8 bg-[#0A0D12] text-white/40 transition-colors duration-300 hover:border-rose-400/30 hover:bg-rose-500/[0.07] hover:text-rose-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   SECTION CARD
   ────────────────────────────────────────────────────────────────── */
function SectionCard({
  section,
  index,
  expanded,
  onToggle,
}: {
  section: Section;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const publishedCount = section.lessons.filter((l) => l.status === "published").length;

  return (
    <div className={`${CARD_BASE} rounded-3xl transition-all duration-300 hover:border-blue-400/20`}>
      <CardSheen />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/30 to-transparent" />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-4 rounded-t-3xl px-6 py-5 text-left"
      >
        <span className="shrink-0 cursor-grab text-white/20 transition-colors hover:text-white/50">
          <GripVertical className="h-5 w-5" />
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10 text-xs font-bold text-blue-200">
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold text-white">{section.title}</span>
          <span className="mt-0.5 block text-[11px] text-white/40">
            {section.lessons.length} lesson{section.lessons.length !== 1 ? "s" : ""} · {publishedCount} published
          </span>
        </span>
        <div className="flex shrink-0 items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button type="button" aria-label="Edit section" className={`${PILL} hidden cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs sm:flex`}>
            <PencilLine className="h-3 w-3" />Edit
          </button>
          <button type="button" aria-label="Delete section" className="hidden cursor-pointer items-center gap-1.5 rounded-xl border border-white/8 bg-[#0A0D12] px-3 py-1.5 text-xs text-white/40 transition-colors duration-300 hover:border-rose-400/30 hover:bg-rose-500/[0.07] hover:text-rose-300 sm:flex">
            <Trash2 className="h-3 w-3" />Delete
          </button>
        </div>
        <ChevronDown className={`h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>

      {expanded && (
        <div className="space-y-2.5 border-t border-white/5 px-6 pb-5 pt-4">
          {section.lessons.length > 0 ? (
            section.lessons.map((lesson) => <LessonRow key={lesson.id} lesson={lesson} />)
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/8 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                <FilePlus2 className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-white/60">No lessons yet</p>
                <p className="mt-0.5 text-[11px] text-white/35">Add your first lesson to this section</p>
              </div>
            </div>
          )}
          <button type="button" className="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-400/20 py-3 text-sm font-medium text-blue-300/60 transition-colors duration-200 hover:border-blue-400/40 hover:bg-blue-500/4 hover:text-blue-200">
            <Plus className="h-4 w-4" />Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   LIST EDITOR — reusable component for What You'll Learn,
   Requirements, and Who This Is For sections
   ────────────────────────────────────────────────────────────────── */
function ListEditor({
  items,
  onAdd,
  onRemove,
  onUpdate,
  placeholder,
  addLabel,
}: {
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, value: string) => void;
  placeholder: string;
  addLabel: string;
}) {
  return (
    <div className="space-y-2.5">
      {items.map((item, index) => (
        <div key={index} className="group flex items-center gap-2.5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/25 bg-blue-500/10 text-[10px] font-bold text-blue-300">
            {index + 1}
          </span>
          <input
            type="text"
            value={item}
            onChange={(e) => onUpdate(index, e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-xl border border-white/8 bg-[#0B0E14] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/25 transition-colors hover:border-white/15 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
          />
          <button
            type="button"
            aria-label="Remove item"
            onClick={() => onRemove(index)}
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/6 bg-[#0A0D12] text-white/30 opacity-0 transition-all duration-200 group-hover:opacity-100 hover:border-rose-400/30 hover:bg-rose-500/[0.07] hover:text-rose-300"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-blue-400/20 py-2.5 text-sm font-medium text-blue-300/60 transition-colors duration-200 hover:border-blue-400/40 hover:bg-blue-500/4 hover:text-blue-200"
      >
        <Plus className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   COLLAPSIBLE INFO CARD — shared shell for the four info sections
   ────────────────────────────────────────────────────────────────── */
function InfoCard({
  icon: Icon,
  title,
  accentClass,
  iconBg,
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  accentClass: string;
  iconBg: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`${CARD_BASE} rounded-3xl transition-all duration-300 hover:border-blue-400/20`}>
      <CardSheen />
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent ${accentClass} to-transparent`} />

      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-4 rounded-t-3xl px-6 py-5 text-left"
      >
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border ${iconBg}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1 text-base font-semibold text-white">{title}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Body */}
      {open && (
        <div className="border-t border-white/5 px-6 pb-6 pt-5">
          {children}
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────────────── */
export default function InstructorCourseBuilderPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string[]>(["s1", "s2"]);
  const [activeTab, setActiveTab] = useState<"curriculum" | "resources">("curriculum");

  // About this course
  const [about, setAbout] = useState(
    "In this comprehensive course, you will master React from the ground up — covering hooks, advanced patterns, state management, and performance techniques used in production apps.",
  );

  // What you'll learn
  const [learningPoints, setLearningPoints] = useState([
    "Build real-world React applications with Hooks",
    "Understand advanced patterns like render props & HOCs",
    "Optimize performance with memoization techniques",
    "Manage complex state with Redux Toolkit",
  ]);

  // Requirements
  const [requirements, setRequirements] = useState([
    "Basic knowledge of HTML, CSS, and JavaScript",
    "Familiarity with ES6+ syntax (arrow functions, destructuring)",
    "A computer with Node.js installed",
  ]);

  // Who this is for
  const [audience, setAudience] = useState([
    "Frontend developers who want to level up their React skills",
    "JavaScript developers transitioning into React",
    "Students who have completed a beginner React course",
  ]);

  const totalLessons = mockSections.reduce((sum, s) => sum + s.lessons.length, 0);

  const toggleSection = (id: string) =>
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* Generic list helpers */
  const addItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    setter((prev) => [...prev, ""]);

  const removeItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  const updateItem = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string,
  ) => setter((prev) => prev.map((item, i) => (i === index ? value : item)));

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Shared animations */}
      <style>{`
        @keyframes lp-sheen {
          0%   { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40%  { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-sheen { animation: lp-sheen 1.1s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .lp-sheen { animation: none !important; }
        }
      `}</style>

      {/* ── Top bar ── */}
      <div className="flex flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-500/12 hover:text-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_22px_-4px_rgba(59,130,246,0.9)] transition-opacity duration-300 group-hover:opacity-100"
          />
          <ArrowLeft className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-1 items-center gap-2 text-[11px] italic tracking-[-0.01em] sm:text-xs"
        >
          <span className="hidden shrink-0 font-semibold text-white/45 transition-colors duration-200 hover:text-white/75 sm:inline">
            My Courses
          </span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-blue-300/50 sm:block" />
          <span className="min-w-0 truncate bg-linear-to-r from-blue-100 via-sky-200 to-indigo-200 bg-clip-text font-bold tracking-tight text-transparent">
            {mockCourse.title}
          </span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-blue-300/50 sm:block" />
          <span className="hidden shrink-0 font-semibold text-white/45 sm:inline">
            Course Builder
          </span>
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            className={`${PILL} hidden cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium sm:flex`}
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-linear-to-r from-[#3B82F6] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>

      {/* ── Single-column layout ── */}
      <div className="space-y-6">

        {/* ── Course thumbnail + title header ── */}
        <section className={`${CARD_BASE} group overflow-hidden rounded-[28px] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]`}>
          <CardSheen />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-400/40 to-transparent" />

          <div className="relative aspect-video w-full overflow-hidden bg-[#080C10]">
            <img
              src={mockCourse.thumbnail}
              alt={mockCourse.title}
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0D1117] via-[#0D1117]/40 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="group/thumb flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-white/15 bg-black/40 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-400/35 hover:bg-blue-500/12"
              >
                <ImagePlus className="h-7 w-7 text-white/60 transition-colors group-hover/thumb:text-blue-200" />
                <span className="text-xs font-medium text-white/60 transition-colors group-hover/thumb:text-blue-200">
                  Change Thumbnail
                </span>
              </button>
            </div>
            <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
              {mockCourse.status}
            </span>
          </div>

          <div className="p-6">
            <h1 className="text-[22px] font-semibold leading-snug tracking-tight sm:text-[26px]">
              <span className="bg-linear-to-r from-white via-[#E0EEFF] to-[#93C5FD] bg-clip-text text-transparent">
                {mockCourse.title}
              </span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-blue-300" />
                {mockCourse.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LayoutList className="h-4 w-4 text-blue-300" />
                {mockCourse.level}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-300" />
                {mockCourse.rating} rating
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-white/40" />
                {mockCourse.students} students
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button type="button" className={`${PILL} flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium`}>
                <Settings2 className="h-3.5 w-3.5" />Course Settings
              </button>
              <button type="button" className={`${PILL} flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium`}>
                <Upload className="h-3.5 w-3.5" />Upload Intro Video
              </button>
              <button type="button" className={`${PILL} flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium`}>
                <Eye className="h-3.5 w-3.5" />Preview as Student
              </button>
            </div>
          </div>
        </section>

        {/* ── ABOUT THIS COURSE ── */}
        <InfoCard
          icon={BookOpen}
          title="About This Course"
          accentClass="via-blue-400/30"
          iconBg="border-blue-400/20 bg-blue-500/10 text-blue-300"
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Course Description
          </p>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={5}
            placeholder="Describe what this course is about, what students will achieve, and why they should take it…"
            className="w-full resize-none rounded-2xl border border-white/8 bg-[#0B0E14] px-4 py-3.5 text-sm leading-relaxed text-white outline-none placeholder:text-white/25 transition-colors hover:border-white/15 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
          />
          <p className="mt-2 text-right text-[11px] text-white/30">
            {about.length} / 2000 characters
          </p>
        </InfoCard>

        {/* ── WHAT YOU'LL LEARN ── */}
        <InfoCard
          icon={Lightbulb}
          title="What You'll Learn"
          accentClass="via-amber-400/30"
          iconBg="border-amber-400/20 bg-amber-500/10 text-amber-300"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Learning Outcomes
          </p>
          <ListEditor
            items={learningPoints}
            onAdd={() => addItem(setLearningPoints)}
            onRemove={(i) => removeItem(setLearningPoints, i)}
            onUpdate={(i, v) => updateItem(setLearningPoints, i, v)}
            placeholder="e.g. Build real-world applications with React Hooks"
            addLabel="Add Learning Point"
          />
        </InfoCard>

        {/* ── REQUIREMENTS ── */}
        <InfoCard
          icon={ShieldCheck}
          title="Requirements"
          accentClass="via-violet-400/30"
          iconBg="border-violet-400/20 bg-violet-500/10 text-violet-300"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Prerequisites
          </p>
          <ListEditor
            items={requirements}
            onAdd={() => addItem(setRequirements)}
            onRemove={(i) => removeItem(setRequirements, i)}
            onUpdate={(i, v) => updateItem(setRequirements, i, v)}
            placeholder="e.g. Basic knowledge of HTML, CSS, and JavaScript"
            addLabel="Add Requirement"
          />
        </InfoCard>

        {/* ── WHO THIS IS FOR ── */}
        <InfoCard
          icon={UserCheck}
          title="Who This Is For"
          accentClass="via-emerald-400/30"
          iconBg="border-emerald-400/20 bg-emerald-500/10 text-emerald-300"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/35">
            Target Audience
          </p>
          <ListEditor
            items={audience}
            onAdd={() => addItem(setAudience)}
            onRemove={(i) => removeItem(setAudience, i)}
            onUpdate={(i, v) => updateItem(setAudience, i, v)}
            placeholder="e.g. Frontend developers who want to level up their React skills"
            addLabel="Add Audience"
          />
        </InfoCard>

        {/* ── TAB SWITCHER ── */}
        <div className={`${CARD_BASE} flex gap-1 rounded-2xl p-1.5`}>
          {(["curriculum", "resources"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-all duration-200 ${
                activeTab === tab
                  ? "bg-linear-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-blue-950/40"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab === "curriculum" ? "Curriculum" : "Resources & Files"}
            </button>
          ))}
        </div>

        {/* ── CURRICULUM TAB ── */}
        {activeTab === "curriculum" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Course Sections
              </p>
              <span className="text-[11px] text-white/35">
                {mockSections.length} section{mockSections.length !== 1 ? "s" : ""} · {totalLessons} lessons
              </span>
            </div>

            <div className="space-y-4">
              {mockSections.map((section, index) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={index}
                  expanded={expanded.includes(section.id)}
                  onToggle={() => toggleSection(section.id)}
                />
              ))}
            </div>

            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-3xl border border-dashed border-blue-400/20 py-5 text-sm font-medium text-blue-300/60 transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/3 hover:text-blue-200"
            >
              <PlusCircle className="h-5 w-5" />
              Add New Section
            </button>
          </section>
        )}

        {/* ── RESOURCES TAB ── */}
        {activeTab === "resources" && (
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Course Resources
              </p>
              <span className="text-[11px] text-white/35">{mockResources.length} files</span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {mockResources.map((resource) => {
                const meta = RESOURCE_META[resource.type];
                const Icon = meta.icon;
                return (
                  <div
                    key={resource.name}
                    className={`${CARD_BASE} group flex cursor-default items-center gap-3.5 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-blue-400/25`}
                  >
                    <CardSheen />
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${meta.wrap}`}>
                      <Icon className={`h-5 w-5 ${meta.tint}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{resource.name}</p>
                      <p className="mt-0.5 text-[11px] text-white/40">{resource.size}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Delete resource"
                      className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/8 bg-white/3 text-white/35 transition-colors duration-300 hover:border-rose-400/30 hover:bg-rose-500/8 hover:text-rose-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-blue-400/20 py-10 text-center transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-300">
                <Upload className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-medium text-white/60">Upload Resource File</p>
                <p className="mt-0.5 text-[11px] text-white/35">PDF, ZIP, MP4 — up to 500 MB</p>
              </div>
            </button>
          </section>
        )}

      </div>
    </div>
  );
}
