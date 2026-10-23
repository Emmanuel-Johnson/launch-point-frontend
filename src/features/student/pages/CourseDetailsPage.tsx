import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { courses } from "../data/courses";
import type { Course } from "../data/courses";

export default function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === Number(courseId));

  const [openModules, setOpenModules] = useState<number[]>([0]);

  if (!course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#08080D] px-4 text-white">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
            <BookOpen size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold">Course not found</h1>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            The course you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/explore-courses")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            <ArrowLeft size={16} />
            Back to courses
          </button>
        </div>
      </div>
    );
  }

  const curriculum = course.curriculum ?? [
    {
      title: "Course topics",
      lessons: course.skills,
    },
  ];

  const toggleModule = (index: number) => {
    setOpenModules((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index],
    );
  };

  const handleStartLearning = () => {
    navigate(`/student/learning/${course.id}`);
  };

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Back navigation */}
        <Link
          to="/student/explore-courses"
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-violet-300"
        >
          <ArrowLeft size={17} />
          Back to Explore Courses
        </Link>

        {/* Course hero */}
        <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101016]">
          <div className="relative h-64 sm:h-80 lg:h-[420px]">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#101016] via-black/35 to-black/10" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-8 sm:top-8">
              <AccessBadge access={course.access} />

              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur-sm">
                {course.level}
              </span>

              <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur-sm">
                {course.category}
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
              <div className="mb-3 flex items-center gap-2 text-sm text-violet-300">
                <GraduationCap size={18} />
                <span>Student Portal</span>
              </div>

              <h1 className="max-w-4xl text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {course.title}
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300 sm:text-base">
                {course.description}
              </p>
            </div>
          </div>

          {/* Course statistics */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/[0.07] p-5 sm:grid-cols-4 sm:p-8">
            <CourseStat
              icon={<Clock3 size={18} />}
              label="Duration"
              value={course.duration}
            />

            <CourseStat
              icon={<PlayCircle size={18} />}
              label="Lessons"
              value={String(course.lessons)}
            />

            <CourseStat
              icon={<Star size={18} />}
              label="Rating"
              value={`${course.rating.toFixed(1)} / 5`}
            />

            <CourseStat
              icon={<Users size={18} />}
              label="Students"
              value={course.students.toLocaleString()}
            />
          </div>
        </section>

        {/* Main content and enrollment panel */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-8">
            {/* About */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:p-7">
              <SectionHeading>About this course</SectionHeading>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {course.longDescription ?? course.description}
              </p>

              <div className="mt-6 flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <GraduationCap size={24} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Course instructor</p>

                  <p className="mt-1 font-semibold text-white">
                    {course.instructor}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {course.instructorRole ?? "Course Instructor"}
                  </p>
                </div>
              </div>
            </section>

            {/* Learning outcomes */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:p-7">
              <SectionHeading>What you&apos;ll learn</SectionHeading>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {(course.learningOutcomes ?? course.skills).map((outcome) => (
                  <div key={outcome} className="flex gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-violet-400"
                    />

                    <p className="text-sm leading-6 text-gray-300">{outcome}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-white/[0.07] pt-5">
                <h3 className="text-sm font-semibold text-white">
                  Skills covered
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-violet-500/20 bg-violet-500/[0.07] px-3 py-2 text-xs text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:p-7">
              <SectionHeading>Requirements</SectionHeading>

              <ul className="mt-4 space-y-3">
                {(
                  course.requirements ?? [
                    "A computer with internet access.",
                    "Willingness to learn and practice.",
                  ]
                ).map((requirement) => (
                  <li
                    key={requirement}
                    className="flex gap-3 text-sm leading-6 text-gray-400"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400" />
                    {requirement}
                  </li>
                ))}
              </ul>
            </section>

            {/* Curriculum */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:p-7">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                <div>
                  <SectionHeading>Course curriculum</SectionHeading>

                  <p className="mt-2 text-sm text-gray-500">
                    Explore the modules included in this course.
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {course.lessons} lessons · {course.duration}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {curriculum.map((module, index) => {
                  const isOpen = openModules.includes(index);

                  return (
                    <div
                      key={module.title}
                      className="overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02]"
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleModule(index)}
                        className="flex w-full items-center justify-between gap-4 p-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm font-semibold text-violet-300">
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-white">
                              {module.title}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                              {module.lessons.length} topics
                            </p>
                          </div>
                        </div>

                        <ArrowRight
                          size={16}
                          className={`shrink-0 text-gray-500 transition-transform ${
                            isOpen ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="space-y-1 border-t border-white/[0.07] p-3">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson}
                              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-400 transition hover:bg-white/[0.03]"
                            >
                              <PlayCircle
                                size={16}
                                className="shrink-0 text-violet-400"
                              />

                              <span className="flex-1">{lesson}</span>

                              <span className="text-xs text-gray-600">
                                {lessonIndex + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Enrollment panel */}
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-2xl border border-violet-500/20 bg-[#101016] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-gray-400">Course access</span>

                <AccessBadge access={course.access} />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {course.access === "Free"
                  ? "Start learning for free"
                  : "Premium course"}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                {course.access === "Free"
                  ? "Explore the course content and begin building your skills."
                  : "This course requires Premium access. Check your subscription before enrolling."}
              </p>

              <div className="mt-5 space-y-4 border-t border-white/[0.07] pt-5">
                <FeatureLine>{course.lessons} course lessons</FeatureLine>

                <FeatureLine>{course.duration} of learning content</FeatureLine>

                <FeatureLine>
                  {course.skills.length} key skills covered
                </FeatureLine>

                <FeatureLine>{course.level} level</FeatureLine>
              </div>

              <button
                type="button"
                onClick={handleStartLearning}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                {course.access === "Free"
                  ? "Start learning"
                  : "Continue to learning"}

                <ArrowRight size={17} />
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-gray-500">
                Enrollment and Premium access must be verified by your backend.
              </p>

              <Link
                to="/student/explore-courses"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/[0.04]"
              >
                <ArrowLeft size={16} />
                Browse other courses
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AccessBadge({ access }: { access: Course["access"] }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        access === "Premium"
          ? "border border-violet-500/25 bg-violet-500/10 text-violet-300"
          : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
      }`}
    >
      {access}
    </span>
  );
}

function CourseStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 truncate text-sm font-semibold text-white">
          {value}
        </p>
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-white">{children}</h2>;
}

function FeatureLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300">
      <CheckCircle2 size={16} className="shrink-0 text-violet-400" />
      <span>{children}</span>
    </div>
  );
}
