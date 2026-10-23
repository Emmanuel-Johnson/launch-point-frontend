import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courses, type Course, type CourseAccess } from "../data/courses";

type SortOption = "popular" | "rating" | "newest";

const categories = [
  "All",
  "Programming",
  "Web Development",
  "Frontend",
  "Backend",
  "Database",
  "Computer Science",
];

export default function ExploreCoursesPage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All levels");
  const [access, setAccess] = useState("All courses");
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    const results = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.skills.some((skill) => skill.toLowerCase().includes(query));

      const matchesCategory =
        category === "All" || course.category === category;

      const matchesLevel = level === "All levels" || course.level === level;

      const matchesAccess =
        access === "All courses" || course.access === access;

      return matchesSearch && matchesCategory && matchesLevel && matchesAccess;
    });

    return [...results].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return b.id - a.id;
      return b.students - a.students;
    });
  }, [search, category, level, access, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All levels");
    setAccess("All courses");
    setSort("popular");
  };

  const handleViewCourse = (course: Course) => {
    navigate(`/student/explore-courses/${course.id}`);
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

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Explore Courses
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                Discover new skills, learn from experienced instructors, and
                take the next step in your learning journey.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#101016] px-4 py-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-xl font-bold">{courses.length}</p>
                <p className="text-xs text-gray-500">Sample courses</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured banner */}
        <section className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-950/80 via-[#171326] to-[#101016] p-6 sm:p-8 lg:p-10">
          <div className="absolute -right-16 -top-20 size-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-300">
                <Sparkles size={14} />
                Learn something new
              </div>

              <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
                Your next skill starts here.
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400">
                Explore practical courses, strengthen your foundations, and
                build skills you can use in real projects.
              </p>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("course-catalog")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Browse courses
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="hidden items-center justify-center md:flex">
              <div className="flex size-32 items-center justify-center rounded-3xl border border-violet-400/20 bg-black/20">
                <GraduationCap
                  size={72}
                  strokeWidth={1.2}
                  className="text-violet-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Course catalog */}
        <section id="course-catalog" className="scroll-mt-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Course catalog</h2>
            <p className="mt-1 text-sm text-gray-500">
              Find the right course for your goals.
            </p>
          </div>

          {/* Search and sorting */}
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses, skills, or instructors..."
                aria-label="Search courses"
                className="w-full rounded-xl border border-white/10 bg-[#101016] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500/60"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowFilters((current) => !current)}
                aria-expanded={showFilters}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                  showFilters
                    ? "border-violet-500/40 bg-violet-500/10 text-violet-300"
                    : "border-white/10 bg-[#101016] text-gray-300 hover:bg-white/[0.05]"
                }`}
              >
                <SlidersHorizontal size={17} />
                Filters
              </button>

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
                aria-label="Sort courses"
                className="min-w-36 rounded-xl border border-white/10 bg-[#101016] px-3 py-3 text-sm text-gray-300 outline-none focus:border-violet-500/60"
              >
                <option value="popular">Most popular</option>
                <option value="rating">Top rated</option>
                <option value="newest">Recently added</option>
              </select>
            </div>
          </div>

          {/* Expandable filters */}
          {showFilters && (
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-white/[0.07] bg-[#101016] p-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="course-level"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Difficulty level
                </label>
                <select
                  id="course-level"
                  value={level}
                  onChange={(event) => setLevel(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#08080D] px-4 py-3 text-sm text-gray-300 outline-none focus:border-violet-500/60"
                >
                  <option>All levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="course-access"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Course access
                </label>
                <select
                  id="course-access"
                  value={access}
                  onChange={(event) => setAccess(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#08080D] px-4 py-3 text-sm text-gray-300 outline-none focus:border-violet-500/60"
                >
                  <option>All courses</option>
                  <option>Free</option>
                  <option>Premium</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm font-medium text-violet-400 hover:text-violet-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
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

          {/* Result count */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-gray-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredCourses.length}
              </span>{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </p>
          </div>

          {/* Course cards */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onView={() => handleViewCourse(course)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#101016] px-6 py-16 text-center">
              <Search size={36} className="mx-auto mb-4 text-gray-600" />
              <h3 className="font-semibold">No courses found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try a different search or change your filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function AccessBadge({ access }: { access: CourseAccess }) {
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

function CourseCard({
  course,
  onView,
}: {
  course: Course;
  onView: () => void;
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

        <div className="absolute left-4 top-4">
          <AccessBadge access={course.access} />
        </div>

        {course.featured && (
          <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-black/60 px-2.5 py-1 text-xs font-medium text-amber-300">
            <Sparkles size={12} />
            Featured
          </div>
        )}

        <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
          {course.level}
        </div>
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
            <span className="font-semibold text-white">
              {course.rating.toFixed(1)}
            </span>
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
