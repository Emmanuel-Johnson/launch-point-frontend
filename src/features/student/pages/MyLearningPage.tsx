import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Play,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

type CourseStatus = "in-progress" | "completed" | "not-started";

interface LearningCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  progress: number;
  completedLessons: number;
  totalLessons: number;
  duration: string;
  status: CourseStatus;
  gradient: string;
  icon: string;
}

type FilterType = "all" | "in-progress" | "completed" | "not-started";

// Sample data for the UI. Replace this with enrolled-course API data later.
const sampleCourses: LearningCourse[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Build modern web applications with Python, Django, React, and PostgreSQL.",
    category: "Web Development",
    technologies: ["Python", "Django", "React"],
    progress: 68,
    completedLessons: 34,
    totalLessons: 50,
    duration: "24 hours",
    status: "in-progress",
    gradient: "from-violet-600/30 via-purple-500/10 to-transparent",
    icon: "FS",
  },
  {
    id: 2,
    title: "Python Fundamentals",
    description:
      "Master Python basics, functions, object-oriented programming, and core concepts.",
    category: "Programming",
    technologies: ["Python", "OOP", "Problem Solving"],
    progress: 100,
    completedLessons: 28,
    totalLessons: 28,
    duration: "12 hours",
    status: "completed",
    gradient: "from-blue-600/30 via-indigo-500/10 to-transparent",
    icon: "Py",
  },
  {
    id: 3,
    title: "Advanced React",
    description:
      "Learn reusable components, hooks, state management, and scalable frontend patterns.",
    category: "Frontend Development",
    technologies: ["React", "TypeScript", "Redux"],
    progress: 35,
    completedLessons: 14,
    totalLessons: 40,
    duration: "18 hours",
    status: "in-progress",
    gradient: "from-cyan-600/25 via-violet-500/10 to-transparent",
    icon: "Re",
  },
  {
    id: 4,
    title: "Django REST Framework",
    description:
      "Design REST APIs with serializers, authentication, permissions, and viewsets.",
    category: "Backend Development",
    technologies: ["Python", "Django", "REST API"],
    progress: 0,
    completedLessons: 0,
    totalLessons: 32,
    duration: "16 hours",
    status: "not-started",
    gradient: "from-emerald-600/20 via-teal-500/10 to-transparent",
    icon: "DR",
  },
  {
    id: 5,
    title: "SQL and PostgreSQL",
    description:
      "Practice relational database design, joins, queries, and data management.",
    category: "Database",
    technologies: ["SQL", "PostgreSQL", "Database Design"],
    progress: 100,
    completedLessons: 24,
    totalLessons: 24,
    duration: "10 hours",
    status: "completed",
    gradient: "from-amber-600/20 via-orange-500/10 to-transparent",
    icon: "DB",
  },
];

const filters: { label: string; value: FilterType }[] = [
  { label: "All courses", value: "all" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
  { label: "Not started", value: "not-started" },
];

const statusLabels: Record<CourseStatus, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  "not-started": "Not Started",
};

const MyLearningPage = () => {
  const [courses] = useState<LearningCourse[]>(sampleCourses);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesFilter =
        activeFilter === "all" || course.status === activeFilter;

      const searchableText = [
        course.title,
        course.description,
        course.category,
        ...course.technologies,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && searchableText.includes(query);
    });
  }, [courses, activeFilter, searchQuery]);

  const totalCourses = courses.length;
  const completedCourses = courses.filter(
    (course) => course.status === "completed",
  ).length;
  const inProgressCourses = courses.filter(
    (course) => course.status === "in-progress",
  ).length;

  const averageProgress =
    totalCourses === 0
      ? 0
      : Math.round(
          courses.reduce((total, course) => total + course.progress, 0) /
            totalCourses,
        );

  const handleOpenCourse = (course: LearningCourse) => {
    toast.info(
      `Course player for "${course.title}" will be connected when the learning API and course player are ready.`,
    );
  };

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="mx-auto max-w-[1600px] space-y-8">
        {/* Page heading */}
        <section
          className="animate-page-item flex flex-col justify-between gap-5 sm:flex-row sm:items-end"
          style={{ animationDelay: "80ms" }}
        >
          <div>
            <p className="mb-2 text-sm font-medium text-[#7C5CFF]">
              Your learning space
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Learning
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
              Pick up where you left off, track your progress, and keep building
              your skills.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/[0.07] px-4 py-3 sm:self-auto">
            <Sparkles className="h-4 w-4 text-[#9D82FF]" />
            <span className="text-xs font-medium text-white/75">
              Keep moving forward
            </span>
          </div>
        </section>

        {/* Overview cards */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Total courses
              </p>
              <BookOpen className="h-5 w-5 text-[#9D82FF]" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{totalCourses}</p>
            <p className="mt-2 text-xs text-white/40">
              In your learning library
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                In progress
              </p>
              <Play className="h-5 w-5 text-[#9D82FF]" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{inProgressCourses}</p>
            <p className="mt-2 text-xs text-white/40">
              Courses you are working on
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Completed
              </p>
              <CheckCircle2 className="h-5 w-5 text-[#9D82FF]" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{completedCourses}</p>
            <p className="mt-2 text-xs text-white/40">Courses finished</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                Average progress
              </p>
              <Clock3 className="h-5 w-5 text-[#9D82FF]" />
            </div>
            <p className="mt-4 text-3xl font-semibold">{averageProgress}%</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5B3FE0] transition-all"
                style={{ width: `${averageProgress}%` }}
              />
            </div>
          </div>
        </section>

        {/* Course library */}
        <section className="space-y-6" style={{ animationDelay: "180ms" }}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-semibold">Your courses</h2>
              <p className="mt-1 text-sm text-white/45">
                Browse your enrolled learning paths.
              </p>
            </div>

            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search courses or technologies..."
                aria-label="Search courses"
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-[#0A0A0A] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#7C5CFF]/50 focus:ring-2 focus:ring-[#7C5CFF]/10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="mr-1 h-4 w-4 text-white/35" />

            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`rounded-xl border px-4 py-2.5 text-xs font-medium transition ${
                    isActive
                      ? "border-[#7C5CFF]/30 bg-[#7C5CFF]/15 text-[#C4B5FD]"
                      : "border-white/[0.08] bg-[#0A0A0A] text-white/50 hover:border-white/15 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-white/40">
              Showing{" "}
              <span className="font-medium text-white/70">
                {filteredCourses.length}
              </span>{" "}
              of {totalCourses} courses
            </p>
          </div>

          {/* Course cards */}
          {filteredCourses.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredCourses.map((course, index) => (
                <article
                  key={course.id}
                  className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] transition duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/35 hover:shadow-[0_12px_40px_rgba(124,92,255,0.08)]"
                  style={{ animationDelay: `${160 + index * 70}ms` }}
                >
                  {/* Course cover */}
                  <div
                    className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${course.gradient}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(124,92,255,0.12),transparent_65%)]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-3xl font-bold tracking-tight text-white shadow-xl backdrop-blur-sm transition duration-300 group-hover:scale-105">
                      {course.icon}
                    </div>

                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-medium text-white/80 backdrop-blur-sm">
                      {course.category}
                    </span>

                    <span
                      className={`absolute right-4 top-4 rounded-full border px-3 py-1.5 text-[10px] font-medium ${
                        course.status === "completed"
                          ? "border-[#7C5CFF]/30 bg-[#7C5CFF]/15 text-[#C4B5FD]"
                          : course.status === "in-progress"
                            ? "border-white/10 bg-black/40 text-white/80"
                            : "border-white/10 bg-black/40 text-white/55"
                      }`}
                    >
                      {statusLabels[course.status]}
                    </span>
                  </div>

                  {/* Course details */}
                  <div className="space-y-5 p-5">
                    <div>
                      <h3 className="text-base font-semibold leading-6 text-white transition-colors group-hover:text-[#C4B5FD]">
                        {course.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-white/45">
                        {course.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="flex min-h-6 flex-wrap gap-2">
                      {course.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] text-white/55"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>

                    {/* Progress */}
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="text-white/45">Course progress</span>
                        <span className="font-medium text-white/80">
                          {course.progress}%
                        </span>
                      </div>

                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
                        role="progressbar"
                        aria-label={`${course.title} progress`}
                        aria-valuenow={course.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            course.status === "completed"
                              ? "bg-[#7C5CFF]"
                              : "bg-gradient-to-r from-[#7C5CFF] to-[#5B3FE0]"
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] text-white/40">
                        <span>
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {course.duration}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <button
                      type="button"
                      onClick={() => handleOpenCourse(course)}
                      className="group/button flex w-full items-center justify-center gap-2 rounded-xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-4 py-3 text-sm font-medium text-[#C4B5FD] transition hover:border-[#7C5CFF]/50 hover:bg-[#7C5CFF]/20"
                    >
                      {course.status === "completed"
                        ? "Review course"
                        : course.status === "not-started"
                          ? "Start learning"
                          : "Continue learning"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.12] bg-[#0A0A0A] px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#7C5CFF]/20 bg-[#7C5CFF]/10">
                <BookOpen className="h-6 w-6 text-[#9D82FF]" />
              </div>

              <h3 className="mt-5 text-base font-semibold">No courses found</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                Try a different search term or select another filter to find
                your courses.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("all");
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-medium text-white/70 transition hover:bg-white/[0.05] hover:text-white"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyLearningPage;
