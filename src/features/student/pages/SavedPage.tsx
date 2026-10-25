import { useMemo, useState } from "react";
import {
  Search,
  Clock3,
  Star,
  Users,
  ArrowRight,
  Trash2,
  GraduationCap,
  Bookmark,
  ShoppingBag,
  X,
  PlayCircle,
} from "lucide-react";

type CourseAccess = "Free" | "Premium";
type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

interface SavedCourse {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: CourseLevel;
  access: CourseAccess;
  duration: string;
  lessons: number;
  rating: number;
  students: number;
  thumbnail: string;
}

const initialSavedCourses: SavedCourse[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Build complete web applications with modern frontend and backend technologies.",
    instructor: "Sarah Williams",
    category: "Web Development",
    level: "Intermediate",
    access: "Premium",
    duration: "24h 15m",
    lessons: 96,
    rating: 4.9,
    students: 2840,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Advanced React Development",
    description:
      "Master React hooks, reusable components, state management, and TypeScript.",
    instructor: "David Miller",
    category: "Frontend",
    level: "Advanced",
    access: "Premium",
    duration: "12h 40m",
    lessons: 58,
    rating: 4.8,
    students: 1860,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Python Programming Fundamentals",
    description:
      "Learn Python fundamentals, functions, object-oriented programming, and problem-solving.",
    instructor: "Alex Morgan",
    category: "Programming",
    level: "Beginner",
    access: "Free",
    duration: "8h 30m",
    lessons: 42,
    rating: 4.7,
    students: 1240,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Database Design with PostgreSQL",
    description:
      "Understand relational database design, SQL queries, joins, and performance fundamentals.",
    instructor: "Emma Wilson",
    category: "Database",
    level: "Intermediate",
    access: "Free",
    duration: "6h 20m",
    lessons: 35,
    rating: 4.6,
    students: 970,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  },
];

const categories = [
  "All",
  "Programming",
  "Web Development",
  "Frontend",
  "Database",
];

export default function SavedPage() {
  const [savedCourses, setSaved] = useState<SavedCourse[]>(initialSavedCourses);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<SavedCourse | null>(
    null,
  );
  const [confirmRemove, setConfirmRemove] = useState<SavedCourse | null>(null);

  const filteredSavedCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return savedCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || course.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [savedCourses, search, category]);

  const removeSavedCourse = (courseId: number) => {
    setSaved((current) => current.filter((course) => course.id !== courseId));

    setConfirmRemove(null);
    setSelectedCourse((current) => (current?.id === courseId ? null : current));
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
  };

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page heading */}
        <section>
          <div className="mb-3 flex items-center gap-2 text-sm text-violet-400">
            <GraduationCap size={18} />
            <span>Student Portal</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                My Saved
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Keep track of the courses you want to take and choose what you
                want to learn next.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
              <Bookmark size={22} className="text-violet-400" />
              <div>
                <p className="text-xl font-bold">{savedCourses.length}</p>
                <p className="text-xs text-gray-400">Saved courses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Saved summary */}
        <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/70 via-[#171326] to-[#101016] p-6 sm:p-8">
          <div className="absolute -right-12 -top-16 size-56 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <div className="mb-3 inline-flex items-center gap-2 text-sm text-violet-300">
                <Bookmark size={17} />
                Your learning shortlist
              </div>

              <h2 className="text-xl font-bold sm:text-2xl">
                Your next big skill could be here.
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Save courses that interest you and revisit them whenever you are
                ready to learn.
              </p>
            </div>

            <a
              href="/student/courses"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Explore courses
              <ArrowRight size={17} />
            </a>
          </div>
        </section>

        {/* Search and category filters */}
        <section className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your saved courses..."
                className="w-full rounded-xl border border-white/10 bg-[#101016] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500/60"
              />
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/[0.05] hover:text-white"
            >
              Clear filters
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  category === item
                    ? "bg-violet-600 text-white"
                    : "border border-white/[0.07] bg-[#101016] text-gray-400 hover:border-violet-500/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Course list */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Saved courses</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredSavedCourses.length}{" "}
                {filteredSavedCourses.length === 1 ? "course" : "courses"} found
              </p>
            </div>
          </div>

          {filteredSavedCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSavedCourses.map((course) => (
                <SavedCourseCard
                  key={course.id}
                  course={course}
                  onView={() => setSelectedCourse(course)}
                  onRemove={() => setConfirmRemove(course)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#101016] px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-violet-500/10">
                <Bookmark size={30} className="text-violet-400" />
              </div>

              <h3 className="font-semibold">
                {savedCourses.length === 0
                  ? "Your saved courses are empty"
                  : "No saved courses found"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {savedCourses.length === 0
                  ? "Discover courses that interest you and save them here for later."
                  : "Try a different search or category to find your saved courses."}
              </p>

              {savedCourses.length === 0 ? (
                <a
                  href="/student/courses"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                >
                  <ShoppingBag size={17} />
                  Explore courses
                </a>
              ) : (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </section>

        {/* Course details modal */}
        {selectedCourse && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="saved-course-title"
              className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#111119] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="h-52 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => setSelectedCourse(null)}
                  aria-label="Close course details"
                  className="absolute right-4 top-4 rounded-full bg-black/60 p-2 text-white hover:bg-black"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-5 p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      selectedCourse.access === "Premium"
                        ? "border border-violet-500/25 bg-violet-500/10 text-violet-300"
                        : "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {selectedCourse.access}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {selectedCourse.level}
                  </span>

                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {selectedCourse.category}
                  </span>
                </div>

                <div>
                  <h2 id="saved-course-title" className="text-2xl font-bold">
                    {selectedCourse.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    {selectedCourse.description}
                  </p>

                  <p className="mt-3 text-sm text-gray-300">
                    Instructor: {selectedCourse.instructor}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 border-y border-white/[0.07] py-5">
                  <CourseDetail
                    icon={<PlayCircle size={17} />}
                    value={`${selectedCourse.lessons} lessons`}
                  />
                  <CourseDetail
                    icon={<Clock3 size={17} />}
                    value={selectedCourse.duration}
                  />
                  <CourseDetail
                    icon={<Star size={17} />}
                    value={`${selectedCourse.rating} rating`}
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 hover:bg-white/[0.05]"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => removeSavedCourse(selectedCourse.id)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={16} />
                    Remove from saved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Remove confirmation modal */}
        {confirmRemove && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setConfirmRemove(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="remove-saved-title"
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#111119] p-6 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <Trash2 size={22} />
              </div>

              <h2 id="remove-saved-title" className="text-lg font-semibold">
                Remove saved course?
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Remove{" "}
                <span className="font-medium text-white">
                  {confirmRemove.title}
                </span>{" "}
                from your saved courses?
              </p>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setConfirmRemove(null)}
                  className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-white/[0.05]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => removeSavedCourse(confirmRemove.id)}
                  className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
                >
                  Remove course
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SavedCourseCard({
  course,
  onView,
  onRemove,
}: {
  course: SavedCourse;
  onView: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101016] transition duration-200 hover:-translate-y-1 hover:border-violet-500/30">
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            course.access === "Premium"
              ? "border border-violet-500/25 bg-black/70 text-violet-300 backdrop-blur-sm"
              : "border border-emerald-500/20 bg-black/70 text-emerald-400 backdrop-blur-sm"
          }`}
        >
          {course.access}
        </span>

        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${course.title} from saved courses`}
          title="Remove from saved"
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-red-400 backdrop-blur-sm transition hover:bg-red-500 hover:text-white"
        >
          <Bookmark size={18} className="fill-current" />
        </button>

        <span className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
          {course.level}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-violet-400">{course.category}</p>

        <h3 className="mt-2 min-h-12 text-base font-semibold leading-6 text-white">
          {course.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
          {course.description}
        </p>

        <p className="mt-4 text-xs text-gray-400">By {course.instructor}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/[0.07] pb-4 text-xs text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="font-semibold text-white">{course.rating}</span>
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Users size={14} />
            {course.students.toLocaleString()}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock3 size={14} />
            {course.duration}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            {course.lessons} lessons
          </span>

          <button
            type="button"
            onClick={onView}
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-500"
          >
            View course
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function CourseDetail({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-violet-400">{icon}</span>
      <span className="text-xs text-gray-300">{value}</span>
    </div>
  );
}
