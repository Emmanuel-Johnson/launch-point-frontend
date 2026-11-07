import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crown,
  Bookmark,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Reveal from "../../../shared/components/Reveal";

type Course = {
  id: number;
  uploadedAt: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  image: string;
  rating: number;
  reviews: string;
  lessons: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  plan: "Premium" | "Free";
  language: "English" | "Malayalam";
  accent: string;
  skills: string[];
};

const formatRelativeUploadDate = (uploadedAt: string) => {
  const uploadedTime = new Date(uploadedAt).getTime();
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - uploadedTime) / 1000),
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
    const amount = Math.floor(elapsedSeconds / unit.seconds);

    if (amount >= 1) {
      return `${amount} ${unit.label}${amount === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

const courses: Course[] = [
  {
    id: 1,
    uploadedAt: "2026-10-23T12:00:00Z",
    title: "Full Stack Web Development",
    description:
      "Build modern web applications with Python, Django, React, and PostgreSQL.",
    category: "Development",
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop",
    rating: 4.9,
    reviews: "1.2k",
    lessons: 48,
    duration: "32 hours",
    level: "Intermediate",
    plan: "Premium",
    language: "English",
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
    uploadedAt: "2026-07-25T12:00:00Z",
    title: "UI/UX Design Masterclass",
    description:
      "Master design systems, wireframes, and beautiful user experiences with Figma.",
    category: "Design",
    instructor: "Alex Carter",
    instructorRole: "Product Designer",
    instructorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=520&fit=crop",
    rating: 4.8,
    reviews: "856",
    lessons: 32,
    duration: "18 hours",
    level: "Beginner",
    plan: "Premium",
    language: "English",
    accent: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
    skills: ["Figma", "Prototyping", "Design"],
  },
  {
    id: 3,
    uploadedAt: "2025-10-25T12:00:00Z",
    title: "Python Programming",
    description:
      "Go from fundamentals to practical Python projects with hands-on exercises.",
    category: "Development",
    instructor: "James Wilson",
    instructorRole: "Software Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop",
    rating: 4.8,
    reviews: "2.1k",
    lessons: 40,
    duration: "24 hours",
    level: "Beginner",
    plan: "Free",
    language: "English",
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 4,
    uploadedAt: "2023-10-25T12:00:00Z",
    title: "Data Analytics with SQL",
    description:
      "Transform raw data into meaningful insights using SQL and analytics.",
    category: "Data Science",
    instructor: "Priya Sharma",
    instructorRole: "Data Analyst",
    instructorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=520&fit=crop",
    rating: 4.9,
    reviews: "980",
    lessons: 36,
    duration: "21 hours",
    level: "Intermediate",
    plan: "Premium",
    language: "English",
    accent: "from-indigo-500/25 via-violet-500/10 to-transparent",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 5,
    uploadedAt: "2026-10-11T12:00:00Z",
    title: "Modern JavaScript Essentials",
    description:
      "Learn modern JavaScript, asynchronous programming, and clean coding practices.",
    category: "Development",
    instructor: "Daniel Brooks",
    instructorRole: "Frontend Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=520&fit=crop",
    rating: 4.7,
    reviews: "743",
    lessons: 28,
    duration: "16 hours",
    level: "Beginner",
    plan: "Free",
    language: "English",
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    skills: ["JavaScript", "ES2026", "Async"],
  },
  {
    id: 6,
    uploadedAt: "2026-04-25T12:00:00Z",
    title: "Product & Business Strategy",
    description:
      "Understand product thinking, market research, and building successful products.",
    category: "Business",
    instructor: "Olivia Bennett",
    instructorRole: "Product Strategist",
    instructorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=520&fit=crop",
    rating: 4.7,
    reviews: "512",
    lessons: 24,
    duration: "14 hours",
    level: "Beginner",
    plan: "Premium",
    language: "English",
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    skills: ["Strategy", "Research", "Planning"],
  },
];

const PublicCoursesPage = () => {
  const navigate = useNavigate();

  const [saved, setSaved] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 12;

  const filteredCourses = courses;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (safeCurrentPage - 1) * coursesPerPage;

  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );

  const firstCourseNumber = filteredCourses.length === 0 ? 0 : startIndex + 1;

  const lastCourseNumber = Math.min(
    startIndex + coursesPerPage,
    filteredCourses.length,
  );

  const toggleSaved = (courseId: number) => {
    setSaved((current) =>
      current.includes(courseId)
        ? current.filter((id) => id !== courseId)
        : [...current, courseId],
    );
  };

  const goToPage = (page: number) => {
    if (totalPages === 0) return;

    const nextPage = Math.min(Math.max(page, 1), totalPages);

    if (nextPage === safeCurrentPage) return;

    setCurrentPage(nextPage);

    requestAnimationFrame(() => {
      document.getElementById("course-catalog")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-full pb-8 text-white">
      <style>{`
        @keyframes lp-card-sheen {
          0% {
            opacity: 0;
            transform: translateX(-150%) skewX(-12deg);
          }

          40% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translateX(260%) skewX(-12deg);
          }
        }

        .lp-card-sheen {
          opacity: 0;
          transform: translateX(-150%) skewX(-12deg);
        }

        .group:hover .lp-card-sheen {
          animation: lp-card-sheen 1.1s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen {
            display: none;
          }
        }
      `}</style>

      <div
        id="course-catalog"
        className="scroll-mt-6 px-4 sm:px-6 lg:px-8 xl:px-10"
      >
        <section className="mt-6 space-y-6">
          {/* Section heading */}
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Turn Your Ambition Into Expertise.
                </h2>

                <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/45">
                  Master in-demand skills through expert-led courses and
                  practical learning.
                </p>
              </div>

              {/* <p className="text-[10px] uppercase tracking-wider text-white/45">
                <span className="mr-1">Showing</span>

                <span className="font-semibold tabular-nums text-white/80">
                  {firstCourseNumber}–{lastCourseNumber}
                </span>

                <span className="mx-1 text-white/25">of</span>

                <span className="font-medium tabular-nums text-violet-300">
                  {filteredCourses.length}
                </span>

                <span className="ml-0.5">courses</span>
              </p> */}
            </div>
          </Reveal>

          {/* Course grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 px-2 sm:grid-cols-2 sm:px-3 lg:grid-cols-3 lg:px-4 xl:grid-cols-4">
              {paginatedCourses.map((course, courseIndex) => {
                const isSaved = saved.includes(course.id);

                return (
                  <Reveal
                    key={`${course.id}-${startIndex + courseIndex}`}
                    delay={Math.min(courseIndex * 100, 500)}
                  >
                    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0D0C12] transition-transform duration-700 ease-in-out hover:scale-[1.02]">
                      {/* Glassy sheen */}
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
                              <Check className="h-3.5 w-3.5" />
                              Free
                            </span>
                          )}
                        </div>

                        {/* Save course */}
                        <button
                          type="button"
                          onClick={() => toggleSaved(course.id)}
                          aria-label={
                            isSaved
                              ? `Remove ${course.title} from saved`
                              : `Add ${course.title} to saved`
                          }
                          aria-pressed={isSaved}
                          className={`group absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-90 ${
                            isSaved
                              ? "border-violet-400/35 bg-[#101827]/95 text-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.12)]"
                              : "border-white/20 bg-[#101827]/90 text-white/80 hover:border-violet-400/50 hover:bg-[#201A35]/95 hover:text-violet-400 hover:shadow-[0_0_14px_rgba(167,139,250,0.18)]"
                          }`}
                        >
                          <Bookmark
                            className={`h-[17px] w-[17px] transition-transform duration-300 ${
                              isSaved ? "scale-110" : "group-hover:scale-110"
                            }`}
                            fill={isSaved ? "#A78BFA" : "none"}
                            stroke={isSaved ? "#A78BFA" : "currentColor"}
                            strokeWidth={1.8}
                          />
                        </button>

                        {/* Duration */}
                        <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                          <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                          {course.duration}
                        </div>

                        {/* Lessons */}
                        <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                          <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
                          {course.lessons} lessons
                        </div>
                      </div>

                      {/* Course information */}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-4 flex items-center justify-between gap-2">
                          <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1 text-[10px] font-medium text-violet-200">
                            {course.category}
                          </span>

                          <span className="text-[11px] text-white/35">
                            {formatRelativeUploadDate(course.uploadedAt)}
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

                        {/* Skills */}
                        <div className="my-4 flex flex-wrap gap-1.5">
                          {course.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-white/55 transition-colors duration-300 group-hover:border-violet-300/15 group-hover:bg-violet-400/[0.05] group-hover:text-white/75"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Instructor */}
                        <div className="mb-4 mt-1 flex items-center gap-3 border-t border-white/[0.07] pt-4">
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

                        {/* Rating and action */}
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
                            onClick={() => navigate(`/courses/${course.id}`)}
                            className="group/button inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                          >
                            View course
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                          </button>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0A0A0C] px-6 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                <BookOpen className="h-6 w-6 text-violet-300" />
              </div>

              <h3 className="text-lg font-semibold">No courses found</h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                Please check back later for new courses.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Reveal delay={150}>
              <nav
                aria-label="Course pagination"
                className="flex flex-col gap-4 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="text-xs text-white/45">
                  Showing{" "}
                  <span className="font-medium text-white/80">
                    {firstCourseNumber}–{lastCourseNumber}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-white/80">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage <= 1}
                    aria-label="Previous page"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
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
                      onClick={() => goToPage(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={
                        safeCurrentPage === page ? "page" : undefined
                      }
                      className={`inline-flex h-10 min-w-10 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${
                        safeCurrentPage === page
                          ? "border-violet-400/50 bg-violet-500/20 text-violet-200 shadow-[0_4px_16px_rgba(124,92,255,0.12)]"
                          : "border-white/10 bg-[#0A0A0C] text-white/55 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage >= totalPages}
                    aria-label="Next page"
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </nav>
            </Reveal>
          )}
        </section>
      </div>
    </div>
  );
};

export default PublicCoursesPage;
