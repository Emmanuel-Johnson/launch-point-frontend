import { useMemo, useRef, useState } from "react";
import type { ComponentType } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Download,
  FileArchive,
  FileText,
  FileQuestion,
  Lock,
  MessageCircle,
  PlayCircle,
  RefreshCcw,
  Send,
  Sparkles,
  ThumbsUp,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   UNIFIED SURFACE SYSTEM
   The exact same violet-black card surface, pill surface and hover
   sheen used on the Courses + Course Details pages, so the learning
   player reads as one consistent system.
   ────────────────────────────────────────────────────────────────── */

/* Standard content card — same base gradient + border everywhere */
const CARD_BASE =
  "relative overflow-hidden border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

/* Pill / ghost control surface */
const PILL =
  "border border-white/[0.08] bg-[#0E0A1A] text-white/65 transition-colors duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-violet-100";

/* Reusable hover shimmer shared by every card */
const CardSheen = () => (
  <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
);

/* ──────────────────────────────────────────────────────────────────
   TYPES + DATA (UI-only mock — wire to your real lesson API later)
   ────────────────────────────────────────────────────────────────── */

type LessonStatus = "completed" | "current" | "locked" | "available";
type LessonKind = "lesson" | "quiz";

type PathLesson = {
  id: string;
  title: string;
  kind: LessonKind;
  status: LessonStatus;
  badge?: string;
};

type PathModule = {
  id: string;
  title: string;
  locked?: boolean;
  lessons: PathLesson[];
};

type Resource = {
  name: string;
  size: string;
  type: "zip" | "pdf";
};

type Comment = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  text: string;
  likes: number;
  liked?: boolean;
  instructor?: boolean;
  replies?: Comment[];
};

const lesson = {
  title: "Module 2: Master Design Tokens — Naming Conventions & Logic",
  duration: "24 Minutes",
  level: "Advanced Level",
  updated: "Updated Jan 2024",
  poster:
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1600&h=900&fit=crop",
  description:
    "In this lesson, we dive deep into the semantic structure of design tokens. You will learn how to bridge the gap between design and development by establishing a logic-based naming system that scales. We cover color primitives, semantic aliases, and component-specific tokens with real-world examples from industry-leading design systems.",
};

const resources: Resource[] = [
  { name: "Course Assets.zip", size: "45.2 MB", type: "zip" },
  { name: "Design-System-Cheat-Sheet.pdf", size: "2.1 MB", type: "pdf" },
];

const learningPath: PathModule[] = [
  {
    id: "m1",
    title: "Module 1: Python Fundamentals",
    lessons: [
      {
        id: "l1",
        title: "Introduction to Hooks",
        kind: "lesson",
        status: "completed",
      },
      {
        id: "l2",
        title: "Variables & Data Types",
        kind: "lesson",
        status: "completed",
      },
      {
        id: "l3",
        title: "Control Flow Basics",
        kind: "lesson",
        status: "completed",
      },
      {
        id: "l4",
        title: "Python Fundamentals Quiz",
        kind: "quiz",
        status: "available",
      },
    ],
  },
  {
    id: "m2",
    title: "Module 2: React Masterclass",
    lessons: [
      {
        id: "l5",
        title: "Introduction to Hooks",
        kind: "lesson",
        status: "completed",
      },
      {
        id: "l6",
        title: "Custom Hooks in depth",
        kind: "lesson",
        status: "completed",
      },
      {
        id: "l7",
        title: "Advanced React Patterns",
        kind: "lesson",
        status: "current",
        badge: "NOW",
      },
      {
        id: "l8",
        title: "Performance Optimization",
        kind: "lesson",
        status: "available",
      },
      {
        id: "l9",
        title: "Context API & Portals",
        kind: "lesson",
        status: "available",
      },
      {
        id: "l10",
        title: "React Masterclass Quiz",
        kind: "quiz",
        status: "available",
      },
    ],
  },
  { id: "m3", title: "Module 3: Django for Pros", locked: true, lessons: [] },
  { id: "m4", title: "Module 4: Django Advanced", locked: true, lessons: [] },
];

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Marcus Chen",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    time: "2 hours ago",
    text: "Could someone clarify when we should prefer HOCs over Hooks for cross-cutting concerns?",
    likes: 14,
    replies: [
      {
        id: 2,
        name: "Sarah Drasner",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
        time: "1 hour ago",
        text: "Hooks are generally preferred now. HOCs remain powerful for wrapping components with dynamic behaviors without modifying original code.",
        likes: 28,
        instructor: true,
      },
    ],
  },
];

const RESOURCE_META: Record<
  Resource["type"],
  { icon: ComponentType<{ className?: string }>; wrap: string; tint: string }
> = {
  zip: {
    icon: FileArchive,
    wrap: "border-violet-400/20 bg-violet-500/10",
    tint: "text-violet-300",
  },
  pdf: {
    icon: FileText,
    wrap: "border-rose-400/20 bg-rose-500/10",
    tint: "text-rose-300",
  },
};

/* Small avatar + name + time header used in the discussion */
const CommentHeader = ({
  avatar,
  name,
  time,
  instructor,
  size = "md",
}: {
  avatar: string;
  name: string;
  time?: string;
  instructor?: boolean;
  size?: "sm" | "md";
}) => (
  <div className="flex items-center gap-3">
    <img
      src={avatar}
      alt={name}
      loading="lazy"
      className={`shrink-0 rounded-full border border-white/10 object-cover ${
        size === "sm" ? "h-8 w-8" : "h-10 w-10"
      }`}
    />
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <p className="truncate text-sm font-semibold text-white">{name}</p>
        {instructor && (
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/25 bg-violet-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-violet-200">
            <BadgeCheck className="h-3 w-3" />
            Instructor
          </span>
        )}
        {time && <span className="text-[11px] text-white/35">{time}</span>}
      </div>
    </div>
  </div>
);

export default function CourseLearningPage() {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams<{
    courseId: string;
    lessonId: string;
  }>();

  const [completed, setCompleted] = useState(false);
  const [draft, setDraft] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [expanded, setExpanded] = useState<string[]>(["m2"]);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const totalLessons = 10;
  const completedLessons = 3;
  const progress = Math.round((completedLessons / totalLessons) * 100);

  const totalDoubts = useMemo(
    () =>
      comments.reduce(
        (sum, comment) => sum + 1 + (comment.replies?.length ?? 0),
        0,
      ) + 126,
    [comments],
  );

  const toggleModule = (id: string) =>
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  /* Open a specific lesson. Falls back gracefully when there is no
     courseId in the URL (keeps the component usable in isolation). */
  const openLesson = (lessonSlug: string) => {
    if (courseId) {
      navigate(`/student/learning/${courseId}/${lessonSlug}`);
    }
  };

  const toggleLike = (id: number) => {
    const flip = (list: Comment[]): Comment[] =>
      list.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        if (comment.replies) {
          return { ...comment, replies: flip(comment.replies) };
        }
        return comment;
      });
    setComments((current) => flip(current));
  };

  const postComment = () => {
    const value = draft.trim();
    if (!value) {
      commentRef.current?.focus();
      return;
    }

    setComments((current) => [
      {
        id: Date.now(),
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=faces",
        time: "Just now",
        text: value,
        likes: 0,
      },
      ...current,
    ]);
    setDraft("");
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Glassy card sheen — plays only on hover (shared with the catalog) */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }
        @keyframes lp-play-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 0.9; }
        }
        .lp-play-ring { animation: lp-play-ring 3s ease-in-out infinite; }
        @keyframes lp-progress-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(260%); }
        }
        .lp-progress-shine { animation: lp-progress-shine 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen, .lp-play-ring, .lp-progress-shine { animation: none !important; }
        }
      `}</style>

      {/* Top bar — back button + breadcrumb */}
      <div className="flex min-w-0 flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_22px_-4px_rgba(167,139,250,0.9)] transition-opacity duration-300 group-hover:opacity-100"
          />
          <ArrowLeft className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2 text-[11px] italic tracking-[-0.01em] sm:text-xs"
        >
          <span className="hidden shrink-0 font-semibold text-white/45 transition-colors duration-200 hover:text-white/75 sm:inline">
            My Learning
          </span>
          <ChevronRight className="hidden h-3.5 w-3.5 shrink-0 text-violet-300/50 sm:block" />
          <span className="min-w-0 truncate bg-gradient-to-r from-violet-100 via-purple-200 to-indigo-200 bg-clip-text font-bold tracking-[-0.025em] text-transparent">
            React Masterclass
          </span>
        </nav>
      </div>

      {/* Two-column layout: lesson on the left, learning path on the right */}
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_356px]">
        {/* ── LEFT: lesson player + content ──────────────────────────── */}
        <div className="min-w-0 space-y-8">
          {/* Video player */}
          <section className="group relative isolate overflow-hidden rounded-[28px] border border-violet-400/15 bg-[#0D071C] shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-video w-full overflow-hidden bg-[#100821]">
              <img
                src={lesson.poster}
                alt={lesson.title}
                loading="eager"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D071C] via-[#0D071C]/30 to-transparent" />

              {/* Play button */}
              <button
                type="button"
                aria-label="Play lesson video"
                className="group/play absolute inset-0 flex cursor-pointer items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className="lp-play-ring absolute h-[104px] w-[104px] rounded-full border border-white/20"
                />
                <span
                  aria-hidden="true"
                  className="lp-play-ring absolute h-[132px] w-[132px] rounded-full border border-white/10 [animation-delay:-1.5s]"
                />
                <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#6D4AFF] shadow-[0_18px_50px_-10px_rgba(124,58,237,0.75)] transition-transform duration-500 ease-out group-hover/play:scale-110">
                  <PlayCircle
                    className="h-9 w-9 text-white"
                    strokeWidth={1.6}
                  />
                </span>
              </button>
            </div>
          </section>

          {/* Lesson title + meta + description */}
          <section className="cursor-default">
            <h1 className="text-[26px] font-semibold leading-[1.18] tracking-[-0.03em] sm:text-[30px]">
              <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
                {lesson.title}
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-cyan-300" />
                {lesson.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-violet-300" />
                {lesson.level}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCcw className="h-4 w-4 text-white/40" />
                {lesson.updated}
              </span>
            </div>

            <p className="mt-5 max-w-3xl text-sm leading-[1.9] text-white/60">
              {lesson.description}
            </p>
          </section>

          {/* Resources & downloads */}
          <section className="space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
              Resources &amp; Downloads
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              {resources.map((resource) => {
                const meta = RESOURCE_META[resource.type];
                const Icon = meta.icon;

                return (
                  <button
                    key={resource.name}
                    type="button"
                    className={`${CARD_BASE} group flex cursor-pointer items-center gap-3.5 rounded-2xl p-4 text-left transition-transform duration-300 hover:-translate-y-0.5 hover:border-violet-400/30`}
                  >
                    <CardSheen />
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${meta.wrap}`}
                    >
                      <Icon className={`h-5 w-5 ${meta.tint}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {resource.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/40">
                        {resource.size}
                      </p>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/55 transition-colors duration-300 group-hover:border-violet-400/35 group-hover:bg-violet-500/[0.08] group-hover:text-violet-200">
                      <Download className="h-4 w-4" />
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Lesson navigation bar */}
          <section className={`${CARD_BASE} rounded-3xl p-3 sm:p-4`}>
            <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <button
                type="button"
                className={`${PILL} flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium`}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Lesson
              </button>

              <button
                type="button"
                onClick={() => setCompleted((current) => !current)}
                aria-pressed={completed}
                className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60 ${
                  completed
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600"
                    : "bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF]"
                }`}
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Mark as Completed
                  </>
                )}
              </button>

              <button
                type="button"
                className={`${PILL} flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium`}
              >
                Next Lesson
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* Questions & discussion */}
          <section className={`${CARD_BASE} group rounded-3xl p-6 sm:p-7`}>
            <CardSheen />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-violet-500/0 text-violet-200">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <h2 className="text-xl font-semibold tracking-[-0.015em] text-white">
                    Questions &amp; Discussion
                  </h2>
                </div>
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-white/55">
                  {totalDoubts} Doubts
                </span>
              </div>

              {/* Composer */}
              <div className="mt-6 flex items-start gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=faces"
                  alt="Your avatar"
                  loading="lazy"
                  className="hidden h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover sm:block"
                />
                <div className="min-w-0 flex-1">
                  <textarea
                    ref={commentRef}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    rows={3}
                    placeholder="Have a question or comment about this lesson?"
                    className="w-full resize-none rounded-2xl border border-white/[0.08] bg-[#0B0B0F] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/15 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10"
                  />
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={postComment}
                      className="group/button inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" />
                      Post Question
                    </button>
                  </div>
                </div>
              </div>

              {/* Comment threads */}
              <div className="mt-7 space-y-7">
                {comments.map((comment) => (
                  <div key={comment.id}>
                    <CommentHeader
                      avatar={comment.avatar}
                      name={comment.name}
                      time={comment.time}
                    />
                    <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                      {comment.text}
                    </p>
                    <div className="mt-3 flex items-center gap-4 text-xs">
                      <button
                        type="button"
                        onClick={() => toggleLike(comment.id)}
                        className={`inline-flex cursor-pointer items-center gap-1.5 transition-colors ${
                          comment.liked
                            ? "text-violet-300"
                            : "text-white/45 hover:text-white/80"
                        }`}
                      >
                        <ThumbsUp
                          className="h-3.5 w-3.5"
                          fill={comment.liked ? "currentColor" : "none"}
                        />
                        {comment.likes}
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer text-white/45 transition-colors hover:text-white/80"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-5 space-y-5 border-l border-white/[0.08] pl-5 sm:pl-6">
                        {comment.replies.map((reply) => (
                          <div key={reply.id}>
                            <CommentHeader
                              avatar={reply.avatar}
                              name={reply.name}
                              instructor={reply.instructor}
                              size="sm"
                            />
                            <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                              {reply.text}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-xs">
                              <button
                                type="button"
                                onClick={() => toggleLike(reply.id)}
                                className={`inline-flex cursor-pointer items-center gap-1.5 transition-colors ${
                                  reply.liked
                                    ? "text-violet-300"
                                    : "text-white/45 hover:text-white/80"
                                }`}
                              >
                                <ThumbsUp
                                  className="h-3.5 w-3.5"
                                  fill={reply.liked ? "currentColor" : "none"}
                                />
                                {reply.likes}
                              </button>
                              <button
                                type="button"
                                className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-violet-200 transition-colors hover:bg-violet-500/20"
                              >
                                Answer
                              </button>
                              <button
                                type="button"
                                className="cursor-pointer text-white/45 transition-colors hover:text-white/80"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── RIGHT: progress + learning path + community ────────────── */}
        <aside className="space-y-6 xl:sticky xl:top-6">
          {/* Overall progress */}
          <section className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-[#7C3AED] to-[#6D4AFF] p-6 shadow-[0_24px_60px_-28px_rgba(124,58,237,0.7)]">
            <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Overall Progress
            </p>
            <div className="relative mt-3 flex items-end gap-3">
              <span className="text-4xl font-bold leading-none tracking-tight text-white">
                {progress}%
              </span>
              <span className="pb-0.5 text-xs leading-snug text-white/75">
                {completedLessons} of {totalLessons} Lessons
                <br />
                Completed
              </span>
            </div>
            <div className="relative mt-5 h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="relative h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              >
                <span className="lp-progress-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              </div>
            </div>
          </section>

          {/* Learning path */}
          <section className={`${CARD_BASE} rounded-3xl p-5`}>
            <h2 className="mb-4 px-1 text-lg font-semibold tracking-tight text-white">
              Learning Path
            </h2>

            <div className="space-y-1.5">
              {learningPath.map((module) => {
                const isOpen = expanded.includes(module.id);
                const isActive = module.id === "m2";

                if (module.locked) {
                  return (
                    <div
                      key={module.id}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3 py-3 text-white/35"
                    >
                      <Lock className="h-4 w-4 shrink-0" />
                      <span className="truncate text-sm font-medium">
                        {module.title}
                      </span>
                    </div>
                  );
                }

                return (
                  <div key={module.id}>
                    {/* Module header */}
                    <button
                      type="button"
                      onClick={() => toggleModule(module.id)}
                      aria-expanded={isOpen}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                        isActive
                          ? "border-violet-400/30 bg-violet-500/[0.08]"
                          : "border-transparent hover:bg-white/[0.03]"
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                          isActive
                            ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                            : "border-violet-500 bg-violet-600 text-white"
                        }`}
                      >
                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-violet-300" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span
                        className={`min-w-0 flex-1 truncate text-sm font-semibold ${
                          isActive ? "text-violet-200" : "text-white/85"
                        }`}
                      >
                        {module.title}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Module lessons */}
                    {isOpen && (
                      <div className="mt-1 space-y-0.5 pl-2">
                        {module.lessons.map((item) => {
                          /* Highlight the lesson from the URL when present,
                             otherwise fall back to the seeded "current" one. */
                          const isCurrent = lessonId
                            ? item.id === lessonId
                            : item.status === "current";
                          const isDone = item.status === "completed";
                          const KindIcon =
                            item.kind === "quiz" ? FileQuestion : PlayCircle;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => openLesson(item.id)}
                              className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                                isCurrent
                                  ? "bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] shadow-lg shadow-violet-950/30"
                                  : "hover:bg-white/[0.04]"
                              }`}
                            >
                              <KindIcon
                                className={`h-4 w-4 shrink-0 ${
                                  isCurrent ? "text-white" : "text-white/45"
                                }`}
                              />
                              <span
                                className={`min-w-0 flex-1 truncate text-[13px] ${
                                  isCurrent
                                    ? "font-semibold text-white"
                                    : isDone
                                      ? "text-white/70"
                                      : "text-white/55"
                                }`}
                              >
                                {item.title}
                              </span>

                              {item.badge && (
                                <span className="shrink-0 rounded-md bg-white/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                  {item.badge}
                                </span>
                              )}

                              {isDone && (
                                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white">
                                  <Check className="h-3 w-3" />
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
