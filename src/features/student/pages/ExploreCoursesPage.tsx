import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  BookOpen,
  Clock3,
  Star,
  Users,
  ArrowRight,
  X,
  PlayCircle,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
type CourseAccess = "Free" | "Premium";

interface Course {
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
  skills: string[];
  featured?: boolean;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Python Programming Masterclass",
    description:
      "Build a strong foundation in Python, from core syntax to object-oriented programming.",
    instructor: "Alex Morgan",
    category: "Programming",
    level: "Beginner",
    access: "Free",
    duration: "8h 30m",
    lessons: 42,
    rating: 4.8,
    students: 1240,
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    skills: ["Python", "OOP", "Problem Solving"],
    featured: true,
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    description:
      "Learn how to build modern web applications with frontend and backend technologies.",
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
    skills: ["HTML & CSS", "React", "Backend"],
    featured: true,
  },
  {
    id: 3,
    title: "React and TypeScript",
    description:
      "Create maintainable frontend applications using React, TypeScript, and reusable components.",
    instructor: "David Miller",
    category: "Frontend",
    level: "Intermediate",
    access: "Premium",
    duration: "12h 40m",
    lessons: 58,
    rating: 4.7,
    students: 1860,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
    skills: ["React", "TypeScript", "Hooks"],
  },
  {
    id: 4,
    title: "SQL and Database Fundamentals",
    description:
      "Understand relational databases, write SQL queries, and work with structured data.",
    instructor: "Emma Wilson",
    category: "Database",
    level: "Beginner",
    access: "Free",
    duration: "6h 20m",
    lessons: 35,
    rating: 4.6,
    students: 970,
    thumbnail:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
    skills: ["SQL", "PostgreSQL", "Database Design"],
  },
  {
    id: 5,
    title: "Advanced Django REST Framework",
    description:
      "Design secure REST APIs with serializers, permissions, authentication, and testing.",
    instructor: "Michael Chen",
    category: "Backend",
    level: "Advanced",
    access: "Premium",
    duration: "15h 10m",
    lessons: 64,
    rating: 4.9,
    students: 1520,
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    skills: ["Django", "REST API", "Authentication"],
  },
  {
    id: 6,
    title: "Data Structures and Algorithms",
    description:
      "Improve your problem-solving skills with essential data structures and algorithm patterns.",
    instructor: "James Anderson",
    category: "Computer Science",
    level: "Intermediate",
    access: "Free",
    duration: "18h 45m",
    lessons: 82,
    rating: 4.8,
    students: 3210,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=900&q=80",
    skills: ["DSA", "Algorithms", "Complexity"],
    featured: true,
  },
];

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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All levels");
  const [access, setAccess] = useState("All courses");
  const [sort, setSort] = useState<SortOption>("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Heading */}
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
                onClick={() => {
                  document
                    .getElementById("course-catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
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

        {/* Catalog */}
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

          {/* Course grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onView={() => setSelectedCourse(course)}
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

        {/* Course details modal */}
        {selectedCourse && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="course-modal-title"
              className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#111119] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedCourse.thumbnail}
                  alt={selectedCourse.title}
                  className="h-52 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111119] to-transparent" />
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
                <div className="flex flex-wrap items-center gap-2">
                  <AccessBadge access={selectedCourse.access} />
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {selectedCourse.level}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-400">
                    {selectedCourse.category}
                  </span>
                </div>

                <div>
                  <h2 id="course-modal-title" className="text-2xl font-bold">
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
                  <DetailStat
                    icon={<PlayCircle size={17} />}
                    value={`${selectedCourse.lessons} lessons`}
                  />
                  <DetailStat
                    icon={<Clock3 size={17} />}
                    value={selectedCourse.duration}
                  />
                  <DetailStat
                    icon={<Star size={17} />}
                    value={`${selectedCourse.rating} rating`}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold">
                    What you'll learn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-xs text-gray-300"
                      >
                        <CheckCircle2 size={14} className="text-violet-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(null)}
                    className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 hover:bg-white/[0.05]"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Connect this action to your enrollment API.
                      console.info(`Enroll in course ${selectedCourse.id}`);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500"
                  >
                    {selectedCourse.access === "Premium"
                      ? "View Premium course"
                      : "Start learning"}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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

function DetailStat({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span className="text-violet-400">{icon}</span>
      <span className="text-xs text-gray-300">{value}</span>
    </div>
  );
}
