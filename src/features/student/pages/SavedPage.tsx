import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  Clock3,
  Compass,
  Crown,
  Star,
} from "lucide-react";

type SavedCourse = {
  id: number;
  uploadedAt: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  plan: "Free" | "Premium";
  duration: string;
  lessons: number;
  rating: number;
  reviews: string;
  image: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  skills: string[];
};

// UI-only mock data. Replace with the student's saved courses from the API.
// The card details and styling mirror the Explore Courses page.
const initialSaved: SavedCourse[] = [
  {
    id: 1,
    uploadedAt: "2026-10-23T12:00:00Z",
    title: "Full Stack Web Development",
    description:
      "Build modern web applications with Python, Django, React, and PostgreSQL.",
    category: "Development",
    level: "Intermediate",
    plan: "Premium",
    duration: "32 hours",
    lessons: 48,
    rating: 4.9,
    reviews: "1.2k",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop",
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 3,
    uploadedAt: "2025-10-25T12:00:00Z",
    title: "Python Programming",
    description:
      "Go from fundamentals to practical Python projects with hands-on exercises.",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "24 hours",
    lessons: 40,
    rating: 4.8,
    reviews: "2.1k",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop",
    instructor: "James Wilson",
    instructorRole: "Software Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
    skills: ["Python", "OOP", "Projects"],
  },
];

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

const SavedPage = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState<SavedCourse[]>(initialSaved);

  const removeSaved = (id: number) => {
    setSaved((current) => current.filter((course) => course.id !== id));
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Header */}
      <section
        className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center"
        style={{ animationDelay: "60ms" }}
      >
        <div className="cursor-default">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
            Account
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
            <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
              Saved Courses
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            Keep your favorite courses close and continue learning at your own
            pace.
          </p>
        </div>

        <div
          aria-label={`${saved.length} ${saved.length === 1 ? "course" : "courses"} saved`}
          className="inline-flex shrink-0 items-center justify-center gap-2.5 self-start rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-500/[0.12] to-purple-500/[0.08] px-5 py-3 text-sm font-semibold text-violet-200 shadow-sm shadow-violet-950/10 sm:self-center"
        >
          <Bookmark className="h-[18px] w-[18px] text-violet-300" />

          <span>Saved Courses</span>

          <span className="inline-flex min-w-6 items-center justify-center rounded-full border border-violet-300/20 bg-violet-400/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-violet-100">
            {saved.length}
          </span>
        </div>
      </section>

      {/* Course list */}
      {saved.length > 0 ? (
        <section id="saved-courses" className="scroll-mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {saved.map((course) => (
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
                        <Check className="h-3.5 w-3.5" />
                        Free
                      </span>
                    )}
                  </div>

                  {/* Remove-from-saved button */}
                  <button
                    type="button"
                    onClick={() => removeSaved(course.id)}
                    aria-label={`Remove ${course.title} from saved`}
                    aria-pressed="true"
                    className="group/save absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-violet-400/35 bg-[#101827]/95 text-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.12)] backdrop-blur-md transition-all duration-300 ease-out hover:border-violet-300/60 hover:bg-[#201A35]/95 hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-90"
                    title="Remove from saved"
                  >
                    <Bookmark
                      className="h-[17px] w-[17px] transition-transform duration-300 group-hover/save:scale-110"
                      fill="#A78BFA"
                      stroke="#A78BFA"
                      strokeWidth={1.8}
                    />
                  </button>

                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                    <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                    {course.duration}
                  </div>

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
                      onClick={() => navigate(`/student/courses/${course.id}`)}
                      className="group/button inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                    >
                      View course
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        /* Empty state */
        <div
          id="saved-courses"
          className="scroll-mt-6 relative overflow-hidden rounded-3xl border border-violet-400/[0.14] bg-gradient-to-br from-[#151025] via-[#100B1C] to-[#0B0813] px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          {/* Subtle ambient glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/[0.10] blur-[80px]" />

          {/* Minimal icon */}
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.14] to-purple-500/[0.06] text-violet-200 shadow-inner shadow-violet-300/[0.04]">
            <Bookmark className="h-[22px] w-[22px]" strokeWidth={1.6} />
          </div>

          <h2 className="relative mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Your next favorite starts here
          </h2>

          <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
            Discover courses that match your goals. Save the ones you love and
            keep them ready for your next learning session.
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
    </div>
  );
};

export default SavedPage;
