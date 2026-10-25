import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  FileText,
  ListVideo,
  Menu,
  Play,
  PlayCircle,
  X,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";

type Lesson = {
  id: string;
  title: string;
  moduleTitle: string;
  moduleIndex: number;
  lessonIndex: number;
};

export default function CourseLearningPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === Number(courseId));

  const lessons = useMemo<Lesson[]>(() => {
    if (!course) return [];

    return (course.curriculum ?? []).flatMap((module, moduleIndex) =>
      module.lessons.map((title, lessonIndex) => ({
        id: `${moduleIndex}-${lessonIndex}`,
        title,
        moduleTitle: module.title,
        moduleIndex,
        lessonIndex,
      })),
    );
  }, [course]);

  const [activeLessonId, setActiveLessonId] = useState("0-0");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeIndex = lessons.findIndex(
    (lesson) => lesson.id === activeLessonId,
  );

  const activeLesson = lessons[activeIndex] ?? lessons[0];

  const completedCount = completedLessonIds.length;
  const progress =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  const isLessonComplete = (lessonId: string) =>
    completedLessonIds.includes(lessonId);

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
  };

  const markLessonComplete = () => {
    if (!activeLesson) return;

    setCompletedLessonIds((previous) =>
      previous.includes(activeLesson.id)
        ? previous
        : [...previous, activeLesson.id],
    );
  };

  const goToPreviousLesson = () => {
    if (activeIndex > 0) {
      setActiveLessonId(lessons[activeIndex - 1].id);
    }
  };

  const goToNextLesson = () => {
    if (activeIndex < lessons.length - 1) {
      setActiveLessonId(lessons[activeIndex + 1].id);
    }
  };

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08080D] px-4 text-white">
        <div className="max-w-md text-center">
          <BookOpen size={44} className="mx-auto text-violet-400" />

          <h1 className="mt-5 text-2xl font-bold">Course not found</h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            We couldn't find this course. Return to the course catalog and
            select a course to continue.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/courses")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold hover:bg-violet-500"
          >
            <ArrowLeft size={16} />
            Explore courses
          </button>
        </div>
      </div>
    );
  }

  if (lessons.length === 0 || !activeLesson) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08080D] px-4 text-white">
        <div className="max-w-md text-center">
          <ListVideo size={44} className="mx-auto text-violet-400" />

          <h1 className="mt-5 text-2xl font-bold">
            Lessons are not available yet
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            This course doesn't have any lesson content yet.
          </p>

          <Link
            to={`/student/courses/${course.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold hover:bg-white/[0.05]"
          >
            <ArrowLeft size={16} />
            Back to course details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080D] text-white">
      {/* Top navigation */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-[#0D0D14]/95 backdrop-blur">
        <div className="flex min-h-[68px] items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((current) => !current)}
              aria-label="Toggle course curriculum"
              className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-gray-300 transition hover:bg-white/[0.05]"
            >
              {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
            </button>

            <div className="min-w-0">
              <Link
                to="/student/courses"
                className="text-xs text-violet-400 hover:text-violet-300"
              >
                Explore Courses
              </Link>

              <h1 className="mt-1 truncate text-sm font-semibold sm:text-base">
                {course.title}
              </h1>
            </div>
          </div>

          <Link
            to={`/student/courses/${course.id}`}
            className="hidden shrink-0 items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/[0.05] sm:inline-flex"
          >
            <ArrowLeft size={16} />
            Course details
          </Link>
        </div>
      </header>

      <div className="relative flex min-h-[calc(100vh-68px)]">
        {/* Curriculum sidebar */}
        {sidebarOpen && (
          <aside className="absolute inset-y-0 left-0 z-20 w-[min(340px,88vw)] border-r border-white/[0.08] bg-[#0D0D14] lg:static lg:w-[320px] lg:shrink-0">
            <div className="flex h-full flex-col">
              <div className="border-b border-white/[0.07] p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-violet-400">
                  Course curriculum
                </p>

                <h2 className="mt-2 text-lg font-semibold">
                  Your learning path
                </h2>

                <div className="mt-5 flex items-center justify-between text-xs text-gray-400">
                  <span>Course progress</span>
                  <span className="font-semibold text-white">{progress}%</span>
                </div>

                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]"
                  role="progressbar"
                  aria-label="Course progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                >
                  <div
                    className="h-full rounded-full bg-violet-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  {completedCount} of {lessons.length} lessons completed
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-3">
                {(course.curriculum ?? []).map((module, moduleIndex) => {
                  const moduleLessons = lessons.filter(
                    (lesson) => lesson.moduleIndex === moduleIndex,
                  );

                  const moduleCompleted = moduleLessons.filter((lesson) =>
                    isLessonComplete(lesson.id),
                  ).length;

                  const hasActiveLesson = moduleLessons.some(
                    (lesson) => lesson.id === activeLesson.id,
                  );

                  return (
                    <details
                      key={module.title}
                      open={hasActiveLesson || moduleIndex === 0}
                      className="mb-2 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-3 p-4 hover:bg-white/[0.03]">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-semibold text-violet-300">
                          {moduleIndex + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-5 text-gray-200">
                            {module.title}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {moduleCompleted}/{moduleLessons.length} completed
                          </p>
                        </div>

                        <ChevronDown
                          size={16}
                          className="mt-1 shrink-0 text-gray-500"
                        />
                      </summary>

                      <div className="border-t border-white/[0.06] p-2">
                        {moduleLessons.map((lesson) => {
                          const selected = lesson.id === activeLesson.id;
                          const completed = isLessonComplete(lesson.id);

                          return (
                            <button
                              key={lesson.id}
                              type="button"
                              onClick={() => selectLesson(lesson.id)}
                              className={`flex w-full items-start gap-3 rounded-lg p-3 text-left transition ${
                                selected
                                  ? "bg-violet-500/10 text-white"
                                  : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-200"
                              }`}
                            >
                              <span className="mt-0.5 shrink-0">
                                {completed ? (
                                  <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                  />
                                ) : selected ? (
                                  <PlayCircle
                                    size={17}
                                    className="text-violet-400"
                                  />
                                ) : (
                                  <Circle size={17} className="text-gray-600" />
                                )}
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block text-sm leading-5">
                                  {lesson.title}
                                </span>
                                <span className="mt-1 block text-xs text-gray-600">
                                  Lesson {lesson.lessonIndex + 1}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="border-t border-white/[0.07] p-4">
                <Link
                  to={`/student/courses/${course.id}`}
                  className="flex items-center gap-2 text-sm text-gray-400 transition hover:text-violet-300"
                >
                  <ArrowLeft size={16} />
                  Back to course overview
                </Link>
              </div>
            </div>
          </aside>
        )}

        {/* Lesson content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <div className="mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm">
              <span>{activeLesson.moduleTitle}</span>
              <ChevronRight size={15} />
              <span className="text-gray-300">Lesson {activeIndex + 1}</span>
            </div>

            {/* Lesson heading */}
            <div className="mt-5">
              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                {activeLesson.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Learn the key concepts in this lesson, then mark it complete
                when you're ready to continue.
              </p>
            </div>

            {/* Lesson player placeholder */}
            <section className="mt-7 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101016]">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-[#21163B] via-[#151122] to-[#0B0B11]">
                <div className="absolute -left-16 -top-16 size-64 rounded-full bg-violet-500/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-16 size-72 rounded-full bg-indigo-500/10 blur-3xl" />

                <div className="relative z-10 max-w-md px-5 text-center">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300 sm:size-20">
                    <Play size={34} fill="currentColor" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold sm:text-xl">
                    {activeLesson.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Lesson content will appear here when video or reading
                    materials are connected.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-gray-400">
                    <FileText size={14} />
                    Learning content placeholder
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between gap-3 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:px-5">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock3 size={16} />
                  <span>Self-paced lesson</span>
                </div>

                {isLessonComplete(activeLesson.id) ? (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
                    <CheckCircle2 size={17} />
                    Lesson completed
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={markLessonComplete}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
                  >
                    <Check size={16} />
                    Mark as completed
                  </button>
                )}
              </div>
            </section>

            {/* Lesson notes */}
            <section className="mt-7 rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                  <BookOpen size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">About this lesson</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {activeLesson.moduleTitle}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-gray-400">
                This lesson is part of the {course.title} course. Follow the
                course material, practice the concepts, and review the lesson
                before moving to the next topic.
              </p>

              <div className="mt-5 rounded-xl border border-violet-500/15 bg-violet-500/[0.05] p-4">
                <p className="text-sm font-medium text-violet-200">
                  Learning tip
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Try the examples yourself instead of only reading or watching.
                  Practicing each concept helps you retain it.
                </p>
              </div>
            </section>

            {/* Lesson navigation */}
            <div className="mt-7 flex flex-col justify-between gap-3 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={goToPreviousLesson}
                disabled={activeIndex <= 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft size={17} />
                Previous lesson
              </button>

              <span className="text-center text-xs text-gray-500">
                Lesson {activeIndex + 1} of {lessons.length}
              </span>

              {activeIndex < lessons.length - 1 ? (
                <button
                  type="button"
                  onClick={goToNextLesson}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  Next lesson
                  <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/student/courses")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500"
                >
                  Finish course
                  <CheckCircle2 size={17} />
                </button>
              )}
            </div>

            {/* Completion notice */}
            {progress === 100 && (
              <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    size={22}
                    className="shrink-0 text-emerald-400"
                  />

                  <div>
                    <h3 className="font-semibold text-emerald-300">
                      All lessons completed!
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      You've marked every lesson in this course as completed.
                      Your backend should verify completion before issuing a
                      certificate.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
