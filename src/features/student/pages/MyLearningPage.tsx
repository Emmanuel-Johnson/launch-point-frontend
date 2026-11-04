import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Compass,
  Crown,
  Flame,
  GraduationCap,
  LayoutGrid,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   TYPES + DATA (UI-only mock — wire to the student's enrolled courses
   from the API later). Card details + styling mirror Explore Courses
   and Saved so the whole student area reads as one system.
   ────────────────────────────────────────────────────────────────── */

type EnrolledCourse = {
  id: number;
  lastAccessed: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  plan: "Free" | "Premium";
  duration: string;
  totalLessons: number;
  completedLessons: number;
  rating: number;
  reviews: string;
  image: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  skills: string[];
  nextLesson: string;
};

const enrolledCourses: EnrolledCourse[] = [
  {
    id: 1,
    lastAccessed: "2026-11-03T09:00:00Z",
    title: "Full Stack Web Development",
    description:
      "Build modern web applications with Python, Django, React, and PostgreSQL.",
    category: "Development",
    level: "Intermediate",
    plan: "Premium",
    duration: "32 hours",
    totalLessons: 48,
    completedLessons: 31,
    rating: 4.9,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop",
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
    skills: ["React", "Django", "PostgreSQL"],
    nextLesson: "Advanced React Patterns",
  },
  {
    id: 3,
    lastAccessed: "2026-11-01T14:30:00Z",
    title: "Python Programming",
    description:
      "Go from fundamentals to practical Python projects with hands-on exercises.",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "24 hours",
    totalLessons: 40,
    completedLessons: 12,
    rating: 4.8,
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop",
    instructor: "James Wilson",
    instructorRole: "Software Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    skills: ["Python", "OOP", "Projects"],
    nextLesson: "Control Flow Basics",
  },
  {
    id: 4,
    lastAccessed: "2026-10-20T18:00:00Z",
    title: "Data Analytics with SQL",
    description:
      "Transform raw data into meaningful insights using SQL and analytics.",
    category: "Data Science",
    level: "Intermediate",
    plan: "Premium",
    duration: "21 hours",
    totalLessons: 36,
    completedLessons: 36,
    rating: 4.9,
    reviews: "980",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=520&fit=crop",
    instructor: "Priya Sharma",
    instructorRole: "Data Analyst",
    instructorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    skills: ["SQL", "Analytics", "Reports"],
    nextLesson: "Course completed",
  },
  {
    id: 2,
    lastAccessed: "2026-10-12T11:15:00Z",
    title: "UI/UX Design Masterclass",
    description:
      "Master design systems, wireframes, and beautiful user experiences with Figma.",
    category: "Design",
    level: "Beginner",
    plan: "Premium",
    duration: "18 hours",
    totalLessons: 32,
    completedLessons: 8,
    rating: 4.8,
    reviews: "856",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=520&fit=crop",
    instructor: "Alex Carter",
    instructorRole: "Product Designer",
    instructorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    skills: ["Figma", "Prototyping", "Design"],
    nextLesson: "Color & Typography Systems",
  },
];

type LearningFilter = "All" | "In Progress" | "Completed";

const filters: { label: LearningFilter; icon: typeof LayoutGrid }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "In Progress", icon: Flame },
  { label: "Completed", icon: CheckCircle2 },
];

const formatRelativeDate = (value: string) => {
  const time = new Date(value).getTime();
  const elapsed = Math.max(0, Math.floor((Date.now() - time) / 1000));

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
    if (amount >= 1) {
      return `${amount} ${unit.label}${amount === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

const MyLearningPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<LearningFilter>("All");

  const openCourse = (id: number) => navigate(`/student/learning/${id}`);

  /* Overall learning statistics derived from the enrolled courses. */
  const stats = useMemo(() => {
    const totalCourses = enrolledCourses.length;
    const completed = enrolledCourses.filter(
      (course) => course.completedLessons >= course.totalLessons,
    ).length;
    const inProgress = totalCourses - completed;
    const lessonsDone = enrolledCourses.reduce(
      (sum, course) => sum + course.completedLessons,
      0,
    );

    return { totalCourses, completed, inProgress, lessonsDone };
  }, []);

  /* The most recently accessed course still in progress — the hero CTA. */
  const continueCourse = useMemo(() => {
    return [...enrolledCourses]
      .filter((course) => course.completedLessons < course.totalLessons)
      .sort(
        (a, b) =>
          new Date(b.lastAccessed).getTime() -
          new Date(a.lastAccessed).getTime(),
      )[0];
  }, []);

  const filteredCourses = useMemo(() => {
    const sorted = [...enrolledCourses].sort(
      (a, b) =>
        new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime(),
    );

    if (activeFilter === "In Progress") {
      return sorted.filter(
        (course) => course.completedLessons < course.totalLessons,
      );
    }
    if (activeFilter === "Completed") {
      return sorted.filter(
        (course) => course.completedLessons >= course.totalLessons,
      );
    }
    return sorted;
  }, [activeFilter]);

  const statCards = [
    {
      label: "Enrolled",
      value: stats.totalCourses,
      icon: GraduationCap,
      tint: "text-violet-300",
      wrap: "border-violet-400/20 bg-violet-500/10",
    },
    {
      label: "In progress",
      value: stats.inProgress,
      icon: Flame,
      tint: "text-amber-300",
      wrap: "border-amber-400/20 bg-amber-500/10",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: Award,
      tint: "text-emerald-300",
      wrap: "border-emerald-400/20 bg-emerald-500/10",
    },
    {
      label: "Lessons done",
      value: stats.lessonsDone,
      icon: TrendingUp,
      tint: "text-cyan-300",
      wrap: "border-cyan-400/20 bg-cyan-500/10",
    },
  ];

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Glassy card sheen — plays only on hover (shared across the app) */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }
        @keyframes lp-progress-shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(260%); }
        }
        .lp-progress-shine { animation: lp-progress-shine 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen, .lp-progress-shine { animation: none !important; }
        }
      `}</style>

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="cursor-default">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
            Keep the momentum going
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
            My{" "}
            <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
              Learning
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            Pick up where you left off, track your progress, and finish what you
            started.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/courses")}
          className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 self-start rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-500/[0.12] to-purple-500/[0.08] px-5 py-3 text-sm font-semibold text-violet-200 shadow-sm shadow-violet-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-violet-500/[0.16] sm:self-center"
        >
          <Compass className="h-[17px] w-[17px] text-violet-300 transition-transform duration-300 group-hover:rotate-[-8deg]" />
          Explore more
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D0C12] p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-violet-400/25"
          >
            <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.wrap}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.tint}`} />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-semibold leading-none tabular-nums text-white">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider text-white/40">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Continue learning hero */}
      {continueCourse && (
        <section className="group relative isolate overflow-hidden rounded-3xl border border-violet-400/20 bg-[#100C20]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#17102D] via-[#100C20] to-[#11152B]" />
          <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="grid min-h-[300px] items-center md:grid-cols-[1.1fr_0.9fr]">
            {/* Left side - text + progress */}
            <div className="relative z-10 px-6 py-8 sm:px-9 lg:px-11 lg:py-11">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-violet-200 sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                CONTINUE LEARNING
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                {continueCourse.category} · {continueCourse.level}
              </p>

              <h2 className="mt-2 max-w-xl text-2xl font-medium leading-[1.2] tracking-[-0.03em] sm:text-3xl">
                {continueCourse.title}
              </h2>

              <p className="mt-3 flex items-center gap-2 text-sm text-white/55">
                <PlayCircle className="h-4 w-4 text-violet-300" />
                Up next:{" "}
                <span className="font-medium text-white/80">
                  {continueCourse.nextLesson}
                </span>
              </p>

              {/* Progress */}
              {(() => {
                const pct = Math.round(
                  (continueCourse.completedLessons /
                    continueCourse.totalLessons) *
                    100,
                );

                return (
                  <div className="mt-6 max-w-md">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-white/55">
                        {continueCourse.completedLessons} of{" "}
                        {continueCourse.totalLessons} lessons
                      </span>
                      <span className="font-semibold tabular-nums text-violet-200">
                        {pct}%
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="relative h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF]"
                        style={{ width: `${pct}%` }}
                      >
                        <span className="lp-progress-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                      </div>
                    </div>
                  </div>
                );
              })()}

              <button
                type="button"
                onClick={() => openCourse(continueCourse.id)}
                className="group/button mt-7 inline-flex cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                Resume course
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </button>
            </div>

            {/* Right side - photo */}
            <div className="relative hidden h-full min-h-[300px] md:block">
              <img
                src={continueCourse.image}
                alt={continueCourse.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#100C20] via-[#100C20]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100C20]/70 via-transparent to-[#100C20]/10" />

              <div className="absolute bottom-7 right-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0B0D]/70 p-3.5 shadow-xl backdrop-blur-xl">
                <img
                  src={continueCourse.instructorImage}
                  alt={continueCourse.instructor}
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">
                    {continueCourse.instructor}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    {continueCourse.instructorRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Course grid */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
              Your courses
            </h2>
            <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/45">
              Everything you've enrolled in, all in one place.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {filters.map(({ label, icon: Icon }) => {
              const isActive = activeFilter === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveFilter(label)}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                      : "border-white/[0.07] bg-[#0B0B0F] text-white/50 hover:border-white/15 hover:text-white/85"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredCourses.map((course) => {
              const pct = Math.round(
                (course.completedLessons / course.totalLessons) * 100,
              );
              const isDone = course.completedLessons >= course.totalLessons;

              return (
                <article
                  key={course.id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0D0C12] transition-transform duration-700 ease-in-out hover:scale-[1.02]"
                >
                  {/* Glassy sheen — animates only while hovering */}
                  <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* Course image */}
                  <div className="relative h-44 overflow-hidden bg-[#14101D] sm:h-48">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="block h-full w-full object-cover"
                    />

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

                    {/* Completed badge */}
                    {isDone && (
                      <div className="absolute right-3 top-3 z-20">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/35 bg-[#06251D]/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg backdrop-blur-md">
                          <Award className="h-3.5 w-3.5" />
                          Completed
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                      <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                      {course.duration}
                    </div>

                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                      <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
                      {course.totalLessons} lessons
                    </div>
                  </div>

                  {/* Course information */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1 text-[10px] font-medium text-violet-200">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-white/35">
                        {formatRelativeDate(course.lastAccessed)}
                      </span>
                    </div>

                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                      {course.level} level
                    </p>

                    <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-violet-100">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-[1.65] text-white/50">
                      {course.description}
                    </p>

                    {/* Progress */}
                    <div className="mt-4">
                      <div className="mb-2 flex items-center justify-between text-[11px]">
                        <span className="text-white/45">
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                        <span
                          className={`font-semibold tabular-nums ${
                            isDone ? "text-emerald-300" : "text-violet-200"
                          }`}
                        >
                          {pct}%
                        </span>
                      </div>
                      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className={`h-full rounded-full ${
                            isDone
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                              : "bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF]"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <div className="mb-4 mt-4 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        loading="lazy"
                        className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-white/85">
                          {course.instructor}
                        </p>
                        <p className="mt-1 truncate text-[10px] text-white/40">
                          {course.instructorRole}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-white">
                          {course.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] text-white/40">
                          ({course.reviews})
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => openCourse(course.id)}
                        className="group/button inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                      >
                        {isDone ? "Review" : "Continue"}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/[0.14] bg-gradient-to-br from-[#151025] via-[#100B1C] to-[#0B0813] px-6 py-14 text-center sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/[0.10] blur-[80px]" />

            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.14] to-purple-500/[0.06] text-violet-200 shadow-inner shadow-violet-300/[0.04]">
              <GraduationCap className="h-[22px] w-[22px]" strokeWidth={1.6} />
            </div>

            <h2 className="relative mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {activeFilter === "Completed"
                ? "No completed courses yet"
                : activeFilter === "In Progress"
                  ? "Nothing in progress right now"
                  : "Your learning journey starts here"}
            </h2>

            <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
              Enroll in a course to start building new skills. Everything you
              take will show up here so you can track your progress.
            </p>

            <button
              type="button"
              onClick={() => navigate("/student/courses")}
              className="group relative mt-7 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-violet-300/20 bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200/30 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <Compass className="h-[17px] w-[17px] transition-transform duration-300 group-hover:rotate-[-8deg]" />
              Explore courses
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
          </div>
        )}
      </section>
    </div>
  );
};

export default MyLearningPage;
