import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Code2,
  Database,
  Filter,
  Heart,
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
  accent: string;
  skills: string[];
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

const courses: Course[] = [
  {
    id: 1,
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
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
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
    accent: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
    skills: ["Figma", "Prototyping", "Design"],
  },
  {
    id: 3,
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
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 4,
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
    accent: "from-indigo-500/25 via-violet-500/10 to-transparent",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 5,
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
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    skills: ["JavaScript", "ES2026", "Async"],
  },
  {
    id: 6,
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
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    skills: ["Strategy", "Research", "Planning"],
  },
  {
    id: 1,
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
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
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
    accent: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
    skills: ["Figma", "Prototyping", "Design"],
  },
  {
    id: 3,
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
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 4,
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
    accent: "from-indigo-500/25 via-violet-500/10 to-transparent",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 5,
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
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    skills: ["JavaScript", "ES2026", "Async"],
  },
  {
    id: 6,
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
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    skills: ["Strategy", "Research", "Planning"],
  },
  {
    id: 1,
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
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
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
    accent: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
    skills: ["Figma", "Prototyping", "Design"],
  },
  {
    id: 3,
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
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 4,
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
    accent: "from-indigo-500/25 via-violet-500/10 to-transparent",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 5,
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
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    skills: ["JavaScript", "ES2026", "Async"],
  },
  {
    id: 6,
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
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    skills: ["Strategy", "Research", "Planning"],
  },
  {
    id: 1,
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
    accent: "from-violet-500/25 via-purple-500/10 to-transparent",
    skills: ["React", "Django", "PostgreSQL"],
  },
  {
    id: 2,
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
    accent: "from-fuchsia-500/25 via-violet-500/10 to-transparent",
    skills: ["Figma", "Prototyping", "Design"],
  },
  {
    id: 3,
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
    accent: "from-sky-500/25 via-blue-500/10 to-transparent",
    skills: ["Python", "OOP", "Projects"],
  },
  {
    id: 4,
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
    accent: "from-indigo-500/25 via-violet-500/10 to-transparent",
    skills: ["SQL", "Analytics", "Reports"],
  },
  {
    id: 5,
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
    accent: "from-amber-500/20 via-orange-500/10 to-transparent",
    skills: ["JavaScript", "ES2026", "Async"],
  },
  {
    id: 6,
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
    accent: "from-emerald-500/20 via-teal-500/10 to-transparent",
    skills: ["Strategy", "Research", "Planning"],
  },
];

const ExploreCoursesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category>("All Courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [planFilter, setPlanFilter] = useState<"All" | "Premium" | "Free">(
    "All",
  );
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

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

      return matchesCategory && matchesSearch && matchesPlan && matchesPremium;
    });

    if (sortBy === "Top Rated") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "A–Z") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Shortest") {
      result = [...result].sort(
        (a, b) => Number.parseInt(a.duration) - Number.parseInt(b.duration),
      );
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, planFilter, showPremiumOnly]);

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );
  const firstCourseNumber = filteredCourses.length === 0 ? 0 : startIndex + 1;
  const lastCourseNumber = Math.min(
    startIndex + coursesPerPage,
    filteredCourses.length,
  );

  const toggleWishlist = (courseId: number) => {
    setWishlist((current) =>
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
    setPlanFilter("All");
    setShowPremiumOnly(false);
  };

  // Keep every pagination control using the same page-change and scroll behavior.
  const goToPage = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);

    // Wait for the page update to be scheduled before scrolling to the catalog.
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
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-[#A78BFA]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
            YOUR NEXT CHAPTER STARTS HERE
          </div>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore{" "}
            <span className="bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C5CFF] bg-clip-text text-transparent">
              Courses
            </span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
            Discover new skills, learn from industry experts, and build the
            future you want.
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

            <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              One new skill can
              <br />
              <span className="bg-gradient-to-r from-white via-[#DDD6FE] to-[#A78BFA] bg-clip-text text-transparent">
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
                className="group/button inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
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

      {/* Category filters */}
      <section id="course-catalog" className="scroll-mt-6 space-y-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Browse categories</h2>
            <p className="mt-1 text-sm text-white/45">
              Find the skills you want to master.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-sm transition ${
              showFilters
                ? "border-[#7C5CFF]/40 bg-[#7C5CFF]/10 text-[#C4B5FD]"
                : "border-white/10 bg-[#0B0B0D] text-white/65 hover:border-white/20 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
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
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-[#8B5CF6]/60 bg-gradient-to-r from-[#7C3AED]/30 to-[#5B21B6]/20 text-white shadow-[0_4px_20px_rgba(124,92,255,0.12)]"
                    : "border-white/[0.08] bg-[#0A0A0C] text-white/55 hover:border-white/20 hover:bg-white/[0.03] hover:text-white/90"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-[#A78BFA]" : ""}`}
                />
                {name}
                {isActive && (
                  <Check className="ml-1 h-3.5 w-3.5 text-[#A78BFA]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search and sorting */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="group relative min-w-0 flex-1">
            <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-[#A78BFA]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search courses, skills, or instructors..."
              aria-label="Search courses"
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0A0A0C] pl-11 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 hover:border-white/15 focus:border-[#8B5CF6]/50 focus:bg-[#0D0B13] focus:ring-4 focus:ring-[#7C5CFF]/[0.07]"
            />
          </div>

          <div className="flex gap-3">
            <label className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0A0A0C] px-3 sm:min-w-[155px]">
              <ArrowDownUp className="h-4 w-4 shrink-0 text-white/40" />
              <span className="shrink-0 text-xs text-white/40">Sort:</span>
              <select
                value={sortBy}
                onChange={(event) => {
                  setSortBy(event.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Sort courses"
                className="min-w-0 flex-1 cursor-pointer bg-transparent text-sm text-white outline-none"
              >
                <option className="bg-[#111111]" value="Latest">
                  Latest
                </option>
                <option className="bg-[#111111]" value="Top Rated">
                  Top Rated
                </option>
                <option className="bg-[#111111]" value="A–Z">
                  A–Z
                </option>
                <option className="bg-[#111111]" value="Shortest">
                  Shortest
                </option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              aria-label="Toggle course filters"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#0A0A0C] text-white/60 transition hover:border-[#8B5CF6]/40 hover:text-white lg:hidden"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#0B0B0D] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium text-white/80">
                Learning plan
              </p>
              <div className="flex flex-wrap gap-2">
                {(["All", "Premium", "Free"] as const).map((plan) => (
                  <button
                    key={plan}
                    type="button"
                    onClick={() => {
                      setPlanFilter(plan);
                      setShowPremiumOnly(false);
                      setCurrentPage(1);
                    }}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      planFilter === plan && !showPremiumOnly
                        ? "border-violet-500/40 bg-violet-500/15 text-violet-200"
                        : "border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {plan === "Premium" ? "♛ Premium" : plan}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="self-start text-sm text-[#A78BFA] transition hover:text-white sm:self-center"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* Course grid */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              {showPremiumOnly
                ? "Premium learning"
                : activeCategory === "All Courses"
                  ? "Discover your next skill"
                  : activeCategory}
            </h2>
            <p className="mt-1.5 text-sm text-white/45">
              Handpicked courses to help you grow.
            </p>
          </div>

          <span className="rounded-lg border border-white/[0.08] bg-[#0A0A0C] px-3 py-2 text-xs text-white/50">
            Showing{" "}
            <span className="font-semibold text-white">
              {firstCourseNumber}–{lastCourseNumber}
            </span>{" "}
            of {filteredCourses.length} courses
          </span>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {paginatedCourses.map((course) => {
              const isWishlisted = wishlist.includes(course.id);

              return (
                <article
                  key={course.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0C] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
                >
                  {/* Course image */}
                  <div className="relative h-48 overflow-hidden bg-[#14101D]">
                    <div
                      className={`absolute inset-0 z-10 bg-gradient-to-br ${course.accent} pointer-events-none`}
                    />
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

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
                      onClick={() => toggleWishlist(course.id)}
                      aria-label={
                        isWishlisted
                          ? `Remove ${course.title} from wishlist`
                          : `Add ${course.title} to wishlist`
                      }
                      aria-pressed={isWishlisted}
                      className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
                        isWishlisted
                          ? "border-violet-400/50 bg-violet-500/25 text-violet-200"
                          : "border-white/15 bg-black/35 text-white/80 hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-violet-200"
                      }`}
                    >
                      <Heart
                        className="h-[17px] w-[17px]"
                        fill={isWishlisted ? "currentColor" : "none"}
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
                      <span className="text-[11px] text-white/40">
                        {course.level}
                      </span>
                    </div>

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
                          className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-white/55"
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
                        onClick={() => setSelectedCourse(course)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/10 hover:text-violet-200"
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
              className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500"
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
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
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
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`cursor-pointer inline-flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition ${
                      currentPage === page
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
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                aria-label="Next page"
                className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0A0A0C] text-white/70 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        )}
      </section>

      <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-r from-[#120C22] via-[#100D19] to-[#0D0D12] p-6 sm:p-8">
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
      </section>

      {/* Course preview modal — UI only */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCourse(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-preview-title"
            className="relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#101014] shadow-2xl shadow-black/60"
          >
            <div className="relative h-52 overflow-hidden">
              <img
                src={selectedCourse.image}
                alt={selectedCourse.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-black/10 to-black/20" />

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close course preview"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition hover:bg-white/15"
              >
                <X className="h-4 w-4" />
              </button>

              <span className="absolute bottom-4 left-5 rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1.5 text-xs font-medium text-violet-200 backdrop-blur-md">
                {selectedCourse.plan} course
              </span>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs text-white/45">
                <span>{selectedCourse.category}</span>
                <span>•</span>
                <span>{selectedCourse.level}</span>
                <span>•</span>
                <span>{selectedCourse.duration}</span>
              </div>

              <h2
                id="course-preview-title"
                className="mt-3 text-2xl font-semibold tracking-tight"
              >
                {selectedCourse.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/55">
                {selectedCourse.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {selectedCourse.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/65"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <img
                  src={selectedCourse.instructorImage}
                  alt={selectedCourse.instructor}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {selectedCourse.instructor}
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    {selectedCourse.instructorRole}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  {selectedCourse.rating.toFixed(1)}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <BookOpen className="mb-2 h-4 w-4 text-violet-300" />
                  <p className="text-lg font-semibold">
                    {selectedCourse.lessons}
                  </p>
                  <p className="mt-1 text-xs text-white/45">Lessons</p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-3">
                  <Clock3 className="mb-2 h-4 w-4 text-violet-300" />
                  <p className="text-lg font-semibold">
                    {selectedCourse.duration}
                  </p>
                  <p className="mt-1 text-xs text-white/45">Learning time</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:brightness-110"
              >
                Close preview
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="mt-3 text-center text-[11px] text-white/35">
                Preview only · Course enrollment is not connected yet
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreCoursesPage;
