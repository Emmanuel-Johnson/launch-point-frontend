import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownAZ,
  ArrowDownUp,
  ArrowRight,
  ArrowUpAZ,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  Flame,
  Bookmark,
  Palette,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type Category =
  | "All Courses"
  | "Development"
  | "Design"
  | "Business"
  | "Data Science";

type Course = {
  id: number;
  uploadedAt: string;
  title: string;
  description: string;
  category: Exclude<Category, "All Courses">;
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

type CourseSortOption =
  | "Latest"
  | "Popularity"
  | "Average ratings"
  | "aA – zZ"
  | "zZ – aA";

const sortOptions: { label: CourseSortOption; description: string }[] = [
  { label: "Latest", description: "Newest courses first" },
  { label: "Popularity", description: "Most enrolled first" },
  { label: "Average ratings", description: "Highest rated first" },
  { label: "aA – zZ", description: "Alphabetical order" },
  { label: "zZ – aA", description: "Reverse alphabetical order" },
];

const parseReviewCount = (reviews: string) => {
  const value = reviews.toLowerCase().trim();
  if (value.endsWith("k")) return (Number.parseFloat(value) || 0) * 1000;
  return Number.parseFloat(value) || 0;
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
    if (amount >= 1)
      return `${amount} ${unit.label}${amount === 1 ? "" : "s"} ago`;
  }

  return "Just now";
};

const categories: {
  name: Category;
  icon: typeof Code2;
}[] = [
  { name: "All Courses", icon: Sparkles },
  { name: "Development", icon: Code2 },
  { name: "Design", icon: Palette },
  { name: "Business", icon: BarChart3 },
  { name: "Data Science", icon: Database },
];

// Options for the custom, app-styled filter dropdowns below. Values match the
// exact union types used by the filter state, so behavior is unchanged.
type PlanFilter = "All" | "Premium" | "Free";
type LevelFilter = "All" | "Beginner" | "Intermediate" | "Advanced";
type RatingFilter = "All" | "1to2" | "2to3" | "3to4" | "4to4.5" | "4.5to5";
type DurationFilter = "All" | "under2" | "2to5" | "5to10" | "10plus";

const planFilterOptions: { value: PlanFilter; label: string }[] = [
  { value: "All", label: "All plans" },
  { value: "Premium", label: "Premium" },
  { value: "Free", label: "Free" },
];

const levelFilterOptions: { value: LevelFilter; label: string }[] = [
  { value: "All", label: "All levels" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const categoryFilterOptions: { value: Category; label: string }[] = [
  { value: "All Courses", label: "All categories" },
  { value: "Development", label: "Development" },
  { value: "Design", label: "Design" },
  { value: "Business", label: "Business" },
  { value: "Data Science", label: "Data Science" },
];

const ratingFilterOptions: { value: RatingFilter; label: string }[] = [
  { value: "All", label: "Any rating" },
  { value: "1to2", label: "1.0 – 2.0 stars" },
  { value: "2to3", label: "2.0 – 3.0 stars" },
  { value: "3to4", label: "3.0 – 4.0 stars" },
  { value: "4to4.5", label: "4.0 – 4.5 stars" },
  { value: "4.5to5", label: "4.5 – 5.0 stars" },
];

const durationFilterOptions: { value: DurationFilter; label: string }[] = [
  { value: "All", label: "Any duration" },
  { value: "under2", label: "Under 2 hours" },
  { value: "2to5", label: "2–5 hours" },
  { value: "5to10", label: "5–10 hours" },
  { value: "10plus", label: "10+ hours" },
];

// Custom select built to match the app's UI (same violet/dark tokens as the
// sort dropdown). Options expand inline so they are never clipped by the
// filter panel's own vertical scroll container.
type FilterSelectProps<T extends string> = {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: T) => void;
};

function FilterSelect<T extends string>({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onChange,
}: FilterSelectProps<T>) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="group mb-2 rounded-xl border border-transparent px-3 py-2 transition-colors hover:border-white/[0.06] hover:bg-white/[0.025]">
      <div className="flex items-center justify-between gap-4">
        <span className="w-[40%] shrink-0 text-xs font-medium text-white/65">
          {label}
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={`flex h-10 w-[56%] max-w-[205px] cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 text-xs font-medium text-white shadow-inner shadow-black/20 outline-none transition duration-200 ${
            isOpen
              ? "border-violet-400/60 bg-[#13101A] ring-2 ring-violet-500/15"
              : "border-white/[0.10] bg-[#0B0B0F] hover:border-violet-300/25 hover:bg-[#13101A]"
          }`}
        >
          <span className="truncate text-left">
            {selected ? selected.label : label}
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 shrink-0 text-white/40 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-violet-300" : ""
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <div
          role="listbox"
          aria-label={label}
          className="mt-2 grid gap-1 overflow-hidden rounded-xl border border-violet-400/20 bg-[#0B0A10] p-1.5 shadow-inner shadow-black/40 ring-1 ring-white/[0.04] animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {options.map((option) => {
            const isActive = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => onChange(option.value)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                  isActive
                    ? "bg-violet-500/15 font-medium text-violet-200"
                    : "text-white/65 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isActive && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-violet-300" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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

const CoursesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<CourseSortOption>("Latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [planFilter, setPlanFilter] = useState<"All" | "Premium" | "Free">(
    "All",
  );
  const [levelFilter, setLevelFilter] = useState<
    "All" | "Beginner" | "Intermediate" | "Advanced"
  >("All");
  const [categoryFilter, setCategoryFilter] = useState<Category>("All Courses");
  const [ratingFilter, setRatingFilter] = useState<
    "All" | "1to2" | "2to3" | "3to4" | "4to4.5" | "4.5to5"
  >("All");
  const [durationFilter, setDurationFilter] = useState<
    "All" | "under2" | "2to5" | "5to10" | "10plus"
  >("All");

  // Tracks which custom filter dropdown is expanded (one at a time).
  const [openFilterKey, setOpenFilterKey] = useState<
    "plan" | "level" | "category" | "rating" | "duration" | null
  >(null);

  const [saved, setSaved] = useState<number[]>([]);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesOverflow, setCategoriesOverflow] = useState(false);
  const categoryWrapperRef = useRef<HTMLDivElement | null>(null);
  const categoryListRef = useRef<HTMLDivElement | null>(null);
  const coursesPerPage = 12;

  // Show category arrows only when the category content is wider than
  // the full available row. Measure against the wrapper, not the scroll
  // container, so showing the arrows cannot cause the overflow state to flip.
  useEffect(() => {
    const categoryWrapper = categoryWrapperRef.current;
    const categoryList = categoryListRef.current;

    if (!categoryWrapper || !categoryList) return;

    const updateCategoryOverflow = () => {
      const hasOverflow =
        categoryList.scrollWidth > categoryWrapper.clientWidth + 1;

      setCategoriesOverflow((current) =>
        current === hasOverflow ? current : hasOverflow,
      );

      if (!hasOverflow) {
        categoryList.scrollLeft = 0;
      }
    };

    updateCategoryOverflow();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateCategoryOverflow)
        : null;

    resizeObserver?.observe(categoryWrapper);
    resizeObserver?.observe(categoryList);
    window.addEventListener("resize", updateCategoryOverflow);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateCategoryOverflow);
    };
  }, [activeCategory]);

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const matchesCategory =
        activeCategory === "All Courses" || course.category === activeCategory;

      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.skills.some((skill) => skill.toLowerCase().includes(query));

      const matchesPlan = planFilter === "All" || course.plan === planFilter;
      const matchesPremium = !showPremiumOnly || course.plan === "Premium";
      const matchesLevel =
        levelFilter === "All" || course.level === levelFilter;
      const matchesFilterCategory =
        categoryFilter === "All Courses" || course.category === categoryFilter;
      const matchesRating =
        ratingFilter === "All" ||
        (ratingFilter === "1to2" && course.rating >= 1 && course.rating < 2) ||
        (ratingFilter === "2to3" && course.rating >= 2 && course.rating < 3) ||
        (ratingFilter === "3to4" && course.rating >= 3 && course.rating < 4) ||
        (ratingFilter === "4to4.5" &&
          course.rating >= 4 &&
          course.rating < 4.5) ||
        (ratingFilter === "4.5to5" &&
          course.rating >= 4.5 &&
          course.rating <= 5);
      const durationHours = Number.parseFloat(course.duration);
      const matchesDuration =
        durationFilter === "All" ||
        (durationFilter === "under2" && durationHours < 2) ||
        (durationFilter === "2to5" &&
          durationHours >= 2 &&
          durationHours < 5) ||
        (durationFilter === "5to10" &&
          durationHours >= 5 &&
          durationHours < 10) ||
        (durationFilter === "10plus" && durationHours >= 10);
      return (
        matchesCategory &&
        matchesSearch &&
        matchesPlan &&
        matchesPremium &&
        matchesLevel &&
        matchesFilterCategory &&
        matchesRating &&
        matchesDuration
      );
    });

    switch (sortBy) {
      case "Latest":
        // Sort by the actual upload timestamp so the most recently uploaded
        // course appears first, regardless of the source array order.
        result = [...result].sort(
          (a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
        );
        break;
      case "Popularity":
        result = [...result].sort(
          (a, b) => parseReviewCount(b.reviews) - parseReviewCount(a.reviews),
        );
        break;
      case "Average ratings":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "aA – zZ":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "zZ – aA":
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [
    activeCategory,
    searchQuery,
    sortBy,
    planFilter,
    showPremiumOnly,
    levelFilter,
    categoryFilter,
    ratingFilter,
    durationFilter,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  // Derive a valid page from the current results instead of synchronizing
  // pagination state in an effect. This avoids cascading renders.
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

  const clearFilters = () => {
    setCurrentPage(1);
    setActiveCategory("All Courses");
    setSearchQuery("");
    setSortBy("Latest");
    setSortOpen(false);
    setFilterOpen(false);
    setPlanFilter("All");
    setLevelFilter("All");
    setCategoryFilter("All Courses");
    setRatingFilter("All");
    setDurationFilter("All");
    setShowPremiumOnly(false);
    setOpenFilterKey(null);
  };

  // Keep every pagination control using the same page-change and scroll behavior.
  const goToPage = (page: number) => {
    // Do not attempt to navigate when the current filters return no courses.
    if (totalPages === 0) return;

    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === safeCurrentPage) return;

    setCurrentPage(nextPage);

    // Scroll after the page change has been scheduled.
    requestAnimationFrame(() => {
      document.getElementById("course-catalog")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#A78BFA]">
            <span className="h-1 w-1 rounded-full bg-[#8B5CF6] shadow-[0_0_6px_1px_rgba(139,92,246,0.7)]" />
            Your next chapter starts here
          </div>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
            Explore{" "}
            <span className="bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C5CFF] bg-clip-text text-transparent">
              Courses
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/50 sm:text-[15px]">
            Discover new skills, learn from industry experts, and build the{" "}
            <span
              className="italic text-white/70"
              style={{ fontFamily: '"Fraunces", serif' }}
            >
              future you want
            </span>
            .
          </p>
        </div>
      </section>

      {/* Learning discovery hero */}
      <section className="group relative isolate overflow-hidden rounded-3xl border border-violet-400/20 bg-[#100C20]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#17102D] via-[#100C20] to-[#11152B]" />
        <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="grid min-h-[320px] items-center md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 px-6 py-9 sm:px-9 lg:px-11 lg:py-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-violet-200 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              YOUR LEARNING JOURNEY STARTS HERE
            </div>

            <h2 className="max-w-xl text-2xl font-normal italic leading-[1.25] tracking-[-0.035em] sm:text-3xl lg:text-[34px]">
              One new skill can
              <br />
              <span
                className="font-medium bg-gradient-to-r from-white via-[#DDD6FE] to-[#A78BFA] bg-clip-text text-transparent"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                open new possibilities.
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-6 text-white/60 sm:text-base">
              Every expert started as a beginner. Explore practical courses,
              learn from experienced instructors, and take the next step toward
              the future you want.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("course-catalog")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }
                className="cursor-pointer group/button inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
              >
                Explore courses
                <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </button>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
                <BookOpen className="h-4 w-4 text-violet-300" />
                Learn at your own pace
              </span>
            </div>
          </div>

          <div className="relative hidden min-h-[320px] h-full md:block">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=900&fit=crop"
              alt="Learners building new skills with digital learning tools"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#100C20] via-[#100C20]/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#100C20]/70 via-transparent to-[#100C20]/10" />

            <div className="absolute right-7 top-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0B0D]/70 p-3.5 shadow-xl backdrop-blur-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
                <Zap className="h-5 w-5 text-violet-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Keep growing</p>
                <p className="mt-1 text-xs text-white/50">
                  One lesson at a time
                </p>
              </div>
            </div>

            <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-xl">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-200">
                Your next chapter
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                Discover. Practice. Grow.
              </p>
              <p className="mt-1 text-sm text-white/55">
                Turn curiosity into skills you can use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course discovery controls */}
      <section id="course-catalog" className="scroll-mt-6 space-y-5">
        {/* Search, sort and filter */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="group relative min-w-0 flex-1">
            <Search className="cursor-pointer absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-violet-300" />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search courses, skills, or instructors..."
              aria-label="Search courses"
              className="h-16 w-full rounded-2xl border border-white/[0.08] bg-[#0B0B0F] pl-14 pr-5 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/15 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          {/* Sort and filter */}
          <div className="grid grid-cols-2 gap-2 lg:flex lg:shrink-0">
            {/* Custom sort dropdown */}
            <div className="relative min-w-0 lg:w-52">
              <button
                type="button"
                onClick={() => {
                  setSortOpen((open) => !open);
                  setFilterOpen(false);
                }}
                aria-label="Sort courses"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
                className={`flex h-16 w-full cursor-pointer items-center gap-3 rounded-2xl border bg-[#0B0B0F] px-4 text-left transition-all duration-200 ${
                  sortOpen
                    ? "border-violet-400/40 bg-violet-500/[0.06] shadow-lg shadow-violet-950/10"
                    : "border-white/[0.08] hover:border-violet-400/30"
                }`}
              >
                <ArrowDownUp className="h-4 w-4 shrink-0 text-violet-300" />

                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] text-white/40">
                    Sort courses by
                  </span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-white/85">
                    {sortBy}
                  </span>
                </div>

                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                    sortOpen ? "rotate-180 text-violet-300" : ""
                  }`}
                />
              </button>

              {sortOpen && (
                <>
                  {/* Close the dropdown when clicking outside */}
                  <button
                    type="button"
                    aria-label="Close sort menu"
                    onClick={() => setSortOpen(false)}
                    className="fixed inset-0 z-40 cursor-default"
                  />

                  <div
                    role="listbox"
                    aria-label="Sort courses by"
                    className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(290px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-violet-400/20 bg-[#111016] p-2 shadow-2xl shadow-black/50 ring-1 ring-white/[0.04] animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 pb-2 pt-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">
                        Advanced sorting
                      </p>
                      <p className="mt-1 text-xs text-white/35">
                        Find the right course for you
                      </p>
                    </div>

                    <div className="mb-1 h-px bg-white/[0.06]" />

                    {sortOptions.map((option) => {
                      const isActive = sortBy === option.label;

                      return (
                        <button
                          key={option.label}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setSortBy(option.label);
                            setCurrentPage(1);
                            setSortOpen(false);
                          }}
                          className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive
                              ? "bg-violet-500/15 text-violet-200"
                              : "text-white/70 hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                              isActive
                                ? "border-violet-400/20 bg-violet-500/15 text-violet-300"
                                : "border-white/[0.06] bg-white/[0.025] text-white/40"
                            }`}
                          >
                            {option.label === "Latest" && (
                              <Sparkles className="h-4 w-4" />
                            )}
                            {option.label === "Popularity" && (
                              <Flame className="h-4 w-4" />
                            )}
                            {option.label === "Average ratings" && (
                              <Star className="h-4 w-4" />
                            )}
                            {option.label === "aA – zZ" && (
                              <ArrowDownAZ className="h-4 w-4" />
                            )}
                            {option.label === "zZ – aA" && (
                              <ArrowUpAZ className="h-4 w-4" />
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block text-xs font-medium">
                              {option.label}
                            </span>
                            <span
                              className={`mt-0.5 block text-[10px] ${
                                isActive
                                  ? "text-violet-200/55"
                                  : "text-white/35"
                              }`}
                            >
                              {option.description}
                            </span>
                          </span>

                          {isActive && (
                            <Check className="h-4 w-4 shrink-0 text-violet-300" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Custom filter dropdown */}
            <div className="relative min-w-0 lg:w-44">
              <button
                type="button"
                aria-label="Filter courses"
                aria-expanded={filterOpen}
                aria-haspopup="dialog"
                onClick={() => {
                  setFilterOpen((open) => !open);
                  setSortOpen(false);
                  setOpenFilterKey(null);
                }}
                className={`flex h-16 w-full cursor-pointer items-center gap-3 rounded-2xl border bg-[#0B0B0F] px-4 text-left transition-all duration-200 ${
                  filterOpen
                    ? "border-violet-400/40 bg-violet-500/[0.06] shadow-lg shadow-violet-950/10"
                    : "border-white/[0.08] hover:border-violet-400/30"
                }`}
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0 text-violet-300" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] text-white/40">
                    Filter courses
                  </span>
                  <span className="mt-0.5 block truncate text-xs font-medium text-white/85">
                    {[
                      planFilter !== "All",
                      levelFilter !== "All",
                      categoryFilter !== "All Courses",
                      ratingFilter !== "All",
                      durationFilter !== "All",
                    ].filter(Boolean).length > 0
                      ? `${
                          [
                            planFilter !== "All",
                            levelFilter !== "All",
                            categoryFilter !== "All Courses",
                            ratingFilter !== "All",
                            durationFilter !== "All",
                          ].filter(Boolean).length
                        } selected`
                      : "All filters"}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 ${
                    filterOpen ? "rotate-180 text-violet-300" : ""
                  }`}
                />
              </button>

              {filterOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close filter menu"
                    onClick={() => {
                      setFilterOpen(false);
                      setOpenFilterKey(null);
                    }}
                    className="fixed inset-0 z-40 cursor-default"
                  />
                  <div
                    role="dialog"
                    aria-label="Filter courses by plan, level, category, rating, and duration"
                    className="absolute right-0 top-[calc(100%+10px)] z-50 w-[min(400px,calc(100vw-2rem))] max-h-[min(75vh,680px)] overflow-y-auto rounded-3xl border border-violet-400/20 bg-[#100E16] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.05] animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl border border-violet-300/10 bg-gradient-to-br from-violet-500/[0.12] via-white/[0.025] to-transparent px-4 py-4">
                      <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-violet-500/15 blur-2xl" />
                      <div className="relative flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-300/15 bg-violet-500/10 text-violet-200 shadow-inner shadow-violet-300/5">
                          <SlidersHorizontal className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold tracking-tight text-white">
                              Refine your search
                            </p>
                            <span className="rounded-full border border-violet-300/15 bg-violet-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-violet-200">
                              Filters
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] leading-5 text-white/45">
                            Narrow results by plan, level, category, rating, and
                            duration.
                          </p>
                        </div>
                      </div>
                    </div>

                    <FilterSelect
                      label="Plan"
                      value={planFilter}
                      options={planFilterOptions}
                      isOpen={openFilterKey === "plan"}
                      onToggle={() =>
                        setOpenFilterKey((key) =>
                          key === "plan" ? null : "plan",
                        )
                      }
                      onChange={(value) => {
                        setPlanFilter(value);
                        setCurrentPage(1);
                        setOpenFilterKey(null);
                      }}
                    />

                    <FilterSelect
                      label="Level"
                      value={levelFilter}
                      options={levelFilterOptions}
                      isOpen={openFilterKey === "level"}
                      onToggle={() =>
                        setOpenFilterKey((key) =>
                          key === "level" ? null : "level",
                        )
                      }
                      onChange={(value) => {
                        setLevelFilter(value);
                        setCurrentPage(1);
                        setOpenFilterKey(null);
                      }}
                    />

                    <FilterSelect
                      label="Category"
                      value={categoryFilter}
                      options={categoryFilterOptions}
                      isOpen={openFilterKey === "category"}
                      onToggle={() =>
                        setOpenFilterKey((key) =>
                          key === "category" ? null : "category",
                        )
                      }
                      onChange={(value) => {
                        setCategoryFilter(value);
                        setCurrentPage(1);
                        setOpenFilterKey(null);
                      }}
                    />

                    <FilterSelect
                      label="Rating"
                      value={ratingFilter}
                      options={ratingFilterOptions}
                      isOpen={openFilterKey === "rating"}
                      onToggle={() =>
                        setOpenFilterKey((key) =>
                          key === "rating" ? null : "rating",
                        )
                      }
                      onChange={(value) => {
                        setRatingFilter(value);
                        setCurrentPage(1);
                        setOpenFilterKey(null);
                      }}
                    />

                    <FilterSelect
                      label="Duration"
                      value={durationFilter}
                      options={durationFilterOptions}
                      isOpen={openFilterKey === "duration"}
                      onToggle={() =>
                        setOpenFilterKey((key) =>
                          key === "duration" ? null : "duration",
                        )
                      }
                      onChange={(value) => {
                        setDurationFilter(value);
                        setCurrentPage(1);
                        setOpenFilterKey(null);
                      }}
                    />

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <p className="text-xs text-white/40">
                        {filteredCourses.length} matching course
                        {filteredCourses.length === 1 ? "" : "s"}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setPlanFilter("All");
                            setLevelFilter("All");
                            setCategoryFilter("All Courses");
                            setRatingFilter("All");
                            setDurationFilter("All");
                            setCurrentPage(1);
                            setOpenFilterKey(null);
                          }}
                          className="cursor-pointer inline-flex min-w-[140px] items-center justify-center rounded-xl border border-violet-400/25 bg-violet-500/[0.08] px-6 py-2.5 text-xs font-semibold text-violet-200 transition hover:border-violet-400/45 hover:bg-violet-500/[0.14] focus:outline-none focus:ring-2 focus:ring-violet-400/30"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hide the category strip scrollbar in every browser while keeping scrolling enabled. */}
        <style>{`#course-category-list::-webkit-scrollbar { display: none; width: 0; height: 0; }`}</style>

        {/* Show navigation arrows only when categories need horizontal scrolling. */}
        <div
          ref={categoryWrapperRef}
          className="flex min-w-0 items-stretch gap-2"
        >
          {categoriesOverflow && (
            <button
              type="button"
              aria-label="Scroll categories left"
              onClick={() => {
                categoryListRef.current?.scrollBy({
                  left: -220,
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer flex shrink-0 items-center justify-center self-stretch rounded-xl border border-white/[0.08] bg-[#0B0B0F] px-3 text-white/55 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          {/* Category list */}
          <div
            id="course-category-list"
            ref={categoryListRef}
            className="flex min-w-0 flex-1 items-stretch gap-2 overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map(({ name, icon: Icon }) => {
              const isActive = activeCategory === name;

              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setActiveCategory(name);
                    setCurrentPage(1);
                  }}
                  className={`cursor-pointer inline-flex shrink-0 items-center gap-2 self-stretch rounded-xl border px-4 py-3 text-xs font-medium transition-all ${
                    isActive
                      ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                      : "border-white/[0.07] bg-[#0B0B0F] text-white/50 hover:border-white/15 hover:text-white/85"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive ? "text-violet-300" : "text-white/40"
                    }`}
                  />

                  {name}

                  {isActive && (
                    <Check className="h-3.5 w-3.5 text-violet-300" />
                  )}
                </button>
              );
            })}
          </div>

          {categoriesOverflow && (
            <button
              type="button"
              aria-label="Scroll categories right"
              onClick={() => {
                categoryListRef.current?.scrollBy({
                  left: 220,
                  behavior: "smooth",
                });
              }}
              className="cursor-pointer flex shrink-0 items-center justify-center self-stretch rounded-xl border border-white/[0.08] bg-[#0B0B0F] px-3 text-white/55 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </section>

      {/* Course grid */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
              {showPremiumOnly
                ? "Premium learning"
                : activeCategory === "All Courses"
                  ? "Discover your next skill"
                  : activeCategory}
            </h2>

            <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/45">
              Handpicked courses to help you grow.
            </p>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1.5">
            <span className="text-[10px] text-white/40">Showing</span>
            <span className="text-xs font-medium tabular-nums text-white">
              {firstCourseNumber}–{lastCourseNumber}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-xs tabular-nums text-white/50">
              {filteredCourses.length}
            </span>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedCourses.map((course, courseIndex) => {
              const isSaved = saved.includes(course.id);

              return (
                <article
                  key={`${course.id}-${startIndex + courseIndex}`}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-1.5 hover:border-[#8B5CF6]/45 hover:shadow-[0_24px_60px_-12px_rgba(124,92,255,0.25),0_18px_45px_rgba(0,0,0,0.45)]"
                >
                  {/* Course image */}
                  <div className="relative -mb-px h-48 overflow-hidden bg-[#14101D]">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="block h-full w-full object-cover"
                    />
                    <div
                      className={`pointer-events-none absolute inset-0 z-10 bg-gradient-to-br ${course.accent} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
                    />
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

                    <div className="absolute left-3 top-3 z-20">
                      {course.plan === "Premium" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/40 bg-[#281447]/90 px-3 py-1.5 text-[11px] font-semibold text-violet-200 shadow-lg backdrop-blur-md">
                          <Sparkles className="h-3.5 w-3.5" />
                          Premium
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#06251D]/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg backdrop-blur-md">
                          <Check className="h-3.5 w-3.5" />
                          Free
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSaved(course.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${course.title} from saved`
                          : `Add ${course.title} to saved`
                      }
                      aria-pressed={isSaved}
                      className={`absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
                        isSaved
                          ? "border-violet-400/50 bg-violet-500/25 text-violet-200"
                          : "border-white/15 bg-black/35 text-white/80 hover:border-violet-300/60 hover:bg-[#DDD6FE] hover:text-[#24113F] hover:shadow-[0_0_18px_rgba(196,181,253,0.28)]"
                      }`}
                    >
                      <Bookmark
                        className="h-[17px] w-[17px]"
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-md">
                      <Clock3 className="h-3.5 w-3.5 text-violet-300" />
                      {course.duration}
                    </div>

                    <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 text-[11px] text-white/80 backdrop-blur-md">
                      <BookOpen className="h-3.5 w-3.5 text-violet-300" />
                      {course.lessons} lessons
                    </div>
                  </div>

                  {/* Course information */}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-md border border-violet-500/20 bg-violet-500/[0.08] px-2.5 py-1 text-[10px] font-medium text-violet-300">
                        {course.category}
                      </span>
                      <span className="text-[11px] text-white/35">
                        {formatRelativeUploadDate(course.uploadedAt)}
                      </span>
                    </div>

                    <p className="mb-2 text-[10px] font-normal tracking-wide text-white/45">
                      {course.level} level
                    </p>
                    <h3 className="line-clamp-2 min-h-[48px] text-[15px] font-semibold leading-6 text-white transition-colors group-hover:text-violet-200">
                      {course.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-5 text-white/45">
                      {course.description}
                    </p>

                    <div className="my-4 flex flex-wrap gap-1.5">
                      {course.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-white/55 transition-colors group-hover:border-violet-400/20 group-hover:bg-violet-500/[0.06] group-hover:text-white/70"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4 flex items-center gap-3 border-t border-white/[0.07] pt-4">
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

                    <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-3">
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
                        onClick={() =>
                          navigate(`/student/courses/${course.id}`)
                        }
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/10 hover:text-violet-200"
                      >
                        View course
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-[#0A0A0C] px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
              <Search className="h-6 w-6 text-violet-300" />
            </div>
            <h3 className="text-lg font-semibold">No courses found</h3>
            <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
              Try a different search or clear your filters to discover more
              courses.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 cursor-pointer rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
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
                className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={safeCurrentPage === page ? "page" : undefined}
                    className={`cursor-pointer inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${
                      safeCurrentPage === page
                        ? "border-violet-400/50 bg-violet-500/20 text-violet-200 shadow-[0_4px_16px_rgba(124,92,255,0.12)]"
                        : "border-white/10 bg-[#0A0A0C] text-white/55 hover:border-white/20 hover:bg-white/[0.03] hover:text-white"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() => goToPage(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                aria-label="Next page"
                className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </section>

      {/* <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#120C22] via-[#100D19] to-[#0D0D12] p-6 sm:p-8">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-violet-600/10 blur-[70px]" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10">
              <Sparkles className="h-5 w-5 text-violet-300" />
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2">
                <h3 className="text-base font-semibold text-white">
                  Unlock your potential with Premium.
                </h3>
                <span className="rounded-md border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                  Premium
                </span>
              </div>

              <p className="max-w-lg text-sm leading-6 text-white/45">
                Take your learning further with premium courses, expand your
                skills, and discover new opportunities to grow. Invest in your
                knowledge and take the next step toward your goals.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/student/subscriptions")}
            className="cursor-pointer inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-400/25 bg-violet-500/10 px-5 py-3 text-sm font-medium text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/20"
          >
            Explore Premium
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section> */}
    </div>
  );
};

export default CoursesPage;
