import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Clock3,
  Compass,
  Crown,
  Check,
  Star,
} from "lucide-react";

type SavedCourse = {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  level: string;
  plan: "Free" | "Premium";
  duration: string;
  lessonCount: number;
  rating: number;
  reviewCount: string;
  image: string;
  instructor: string;
  instructorImage: string;
};

// UI-only mock data — replace with the student's saved courses from the API.
const initialSaved: SavedCourse[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    subtitle:
      "Build real-world applications and turn your coding skills into a career.",
    category: "Development",
    level: "Intermediate",
    plan: "Premium",
    duration: "32 hours",
    lessonCount: 48,
    rating: 4.9,
    reviewCount: "1.2k",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    instructor: "Sarah Mitchell",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&crop=faces",
  },
  {
    id: 3,
    title: "Python Programming",
    subtitle: "Master the fundamentals and start building useful applications.",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "24 hours",
    lessonCount: 40,
    rating: 4.8,
    reviewCount: "2.1k",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop",
    instructor: "James Wilson",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=faces",
  },
];

const PlanBadge = ({ plan }: { plan: "Free" | "Premium" }) =>
  plan === "Premium" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95 px-3 py-1.5 text-[11px] font-semibold text-amber-200 shadow-[0_4px_18px_rgba(245,158,11,0.18)] backdrop-blur-md">
      <Crown className="h-3.5 w-3.5 text-amber-300" />
      Premium
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#06251D]/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg backdrop-blur-md">
      <Check className="h-3.5 w-3.5" />
      Free
    </span>
  );

const SavedPage = () => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState<SavedCourse[]>(initialSaved);

  const removeSaved = (id: number) =>
    setSaved((current) => current.filter((course) => course.id !== id));

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Header */}
      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-violet-500/0 text-violet-200">
          <Bookmark className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">
            Saved courses
          </h1>
          <p className="mt-1 text-xs text-white/40">
            {saved.length} {saved.length === 1 ? "course" : "courses"} saved for
            later
          </p>
        </div>
      </div>

      {/* Empty state */}
      {saved.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814] p-12 text-center">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
          <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
            <Bookmark className="h-6 w-6" />
          </span>
          <h2 className="relative mt-5 text-lg font-semibold">
            No saved courses yet
          </h2>
          <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-white/50">
            Browse the catalog and tap the bookmark icon on any course to save
            it here for later.
          </p>
          <button
            type="button"
            onClick={() => navigate("/student/courses")}
            className="group relative mx-auto mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
          >
            <Compass className="h-4 w-4" />
            Explore courses
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((course) => (
            <article
              key={course.id}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814] transition-transform duration-500 ease-in-out hover:scale-[1.02] hover:border-violet-400/35"
            >
              <div className="relative h-40 overflow-hidden bg-[#14101D]">
                <img
                  src={course.image}
                  alt={course.title}
                  loading="lazy"
                  className="block h-full w-full object-cover"
                />

                <div className="absolute left-3 top-3 z-20">
                  <PlanBadge plan={course.plan} />
                </div>

                {/* Remove-from-saved button */}
                <button
                  type="button"
                  onClick={() => removeSaved(course.id)}
                  aria-label="Remove from saved"
                  className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/40 bg-violet-500/20 text-violet-200 backdrop-blur-md transition hover:bg-violet-500/30"
                >
                  <Bookmark className="h-[18px] w-[18px]" fill="currentColor" />
                </button>

                <span className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {course.rating.toFixed(1)}
                  <span className="text-white/45">({course.reviewCount})</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] text-white/45">
                  <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 font-medium text-violet-200">
                    {course.category}
                  </span>
                  <span>{course.level}</span>
                </div>

                <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-6 tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-violet-100">
                  {course.title}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-[1.65] text-white/50">
                  {course.subtitle}
                </p>

                <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.07] pt-3.5 text-[11px] text-white/45">
                  <img
                    src={course.instructorImage}
                    alt=""
                    loading="lazy"
                    className="h-7 w-7 rounded-full border border-white/10 object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate">
                    {course.instructor}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                    {course.duration}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                    <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
                    {course.lessonCount} lessons
                  </span>

                  <button
                    type="button"
                    onClick={() => navigate(`/student/courses/${course.id}`)}
                    className="group/button inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                  >
                    View course
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/button:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
