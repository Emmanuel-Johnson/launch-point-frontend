import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BadgeCheck,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Globe2,
  GraduationCap,
  Laptop,
  ListChecks,
  LockKeyhole,
  MessageCircle,
  MonitorPlay,
  PlayCircle,
  Share2,
  Sparkles,
  Star,
  Target,
  Users,
} from "lucide-react";

type Lesson = {
  title: string;
  duration: string;
  preview?: boolean;
};

type Module = {
  title: string;
  lessons: Lesson[];
};

type Course = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  level: string;
  plan: "Free" | "Premium";
  duration: string;
  lessonCount: number;
  rating: number;
  reviewCount: string;
  students: string;
  updatedAt: string;
  language: string;
  image: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  instructorBio: string;
  instructorExperience: string;
  skills: string[];
  outcomes: string[];
  requirements: string[];
  audience: string[];
  modules: Module[];
};

const courses: Course[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    subtitle:
      "Build real-world applications and turn your coding skills into a career.",
    description:
      "Learn how modern web applications are designed, developed, and deployed. Explore frontend development with React, backend development with Django, and relational databases with PostgreSQL through practical projects.",
    category: "Development",
    level: "Intermediate",
    plan: "Premium",
    duration: "32 hours",
    lessonCount: 48,
    rating: 4.9,
    reviewCount: "1.2k",
    students: "8.4k",
    updatedAt: "October 2026",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1000&fit=crop",
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "Sarah is a software engineer who specializes in modern web applications, scalable backend systems, and helping developers build practical industry-ready skills.",
    instructorExperience: "8+ years experience",
    skills: ["React", "TypeScript", "Django", "PostgreSQL"],
    outcomes: [
      "Build responsive interfaces with React and TypeScript.",
      "Create REST APIs using Django and Django REST Framework.",
      "Design relational databases and write efficient SQL queries.",
      "Integrate frontend applications with backend services.",
      "Build and deploy a complete full stack project.",
      "Apply clean coding practices and reusable architecture.",
    ],
    requirements: [
      "Basic computer and internet skills.",
      "A willingness to practice and build projects.",
      "Basic programming knowledge is recommended.",
      "A computer with a modern code editor installed.",
    ],
    audience: [
      "Developers who want to become full stack engineers.",
      "Students preparing for software development roles.",
      "Frontend developers interested in backend development.",
    ],
    modules: [
      {
        title: "Getting Started with Web Development",
        lessons: [
          { title: "Welcome to the course", duration: "04:20", preview: true },
          { title: "How the web works", duration: "12:45", preview: true },
          {
            title: "Setting up your development environment",
            duration: "16:30",
          },
          {
            title: "Understanding the development workflow",
            duration: "10:15",
          },
        ],
      },
      {
        title: "Frontend Development with React",
        lessons: [
          { title: "Modern JavaScript fundamentals", duration: "24:10" },
          { title: "Components, props and state", duration: "28:35" },
          { title: "React hooks and reusable components", duration: "31:20" },
          { title: "Building responsive user interfaces", duration: "26:40" },
          { title: "TypeScript with React", duration: "32:15" },
        ],
      },
      {
        title: "Backend Development with Django",
        lessons: [
          { title: "Introduction to Django", duration: "18:25" },
          { title: "Models, views and serializers", duration: "29:40" },
          { title: "Building REST APIs", duration: "35:15" },
          { title: "Authentication and permissions", duration: "30:10" },
        ],
      },
      {
        title: "Databases with PostgreSQL",
        lessons: [
          { title: "Database design fundamentals", duration: "20:30" },
          { title: "Writing SQL queries", duration: "27:45" },
          { title: "Relationships and query optimization", duration: "24:20" },
        ],
      },
      {
        title: "Build and Complete Your Project",
        lessons: [
          { title: "Planning the application architecture", duration: "18:40" },
          { title: "Integrating frontend and backend", duration: "32:50" },
          { title: "Testing and debugging", duration: "25:30" },
          { title: "Deployment and next steps", duration: "22:15" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    subtitle: "Transform ideas into intuitive, beautiful digital experiences.",
    description:
      "Learn the principles of user-centered design, wireframing, prototyping, visual hierarchy, and design systems. Build a structured design workflow and develop practical skills using Figma.",
    category: "Design",
    level: "Beginner",
    plan: "Premium",
    duration: "18 hours",
    lessonCount: 32,
    rating: 4.8,
    reviewCount: "856",
    students: "5.2k",
    updatedAt: "July 2026",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&h=1000&fit=crop",
    instructor: "Alex Carter",
    instructorRole: "Product Designer",
    instructorImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "Alex works at the intersection of product strategy, interaction design, and accessible digital experiences.",
    instructorExperience: "6+ years experience",
    skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"],
    outcomes: [
      "Apply visual hierarchy and layout principles.",
      "Create wireframes and interactive prototypes.",
      "Design reusable components and design systems.",
      "Improve usability through user-centered design.",
    ],
    requirements: [
      "No previous design experience required.",
      "Access to a computer and Figma.",
    ],
    audience: [
      "Aspiring UI/UX designers.",
      "Developers who want stronger design skills.",
      "Product creators and design enthusiasts.",
    ],
    modules: [
      {
        title: "Design Fundamentals",
        lessons: [
          { title: "Introduction to UI/UX", duration: "12:20", preview: true },
          { title: "Visual hierarchy and typography", duration: "22:10" },
        ],
      },
      {
        title: "Mastering Figma",
        lessons: [
          { title: "Figma workspace and tools", duration: "18:30" },
          { title: "Components and auto layout", duration: "26:45" },
        ],
      },
      {
        title: "Prototyping and Design Systems",
        lessons: [
          { title: "Creating interactive prototypes", duration: "24:10" },
          { title: "Building reusable design systems", duration: "29:15" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Python Programming",
    subtitle: "Master the fundamentals and start building useful applications.",
    description:
      "Develop a solid foundation in Python through programming fundamentals, data structures, object-oriented programming, and hands-on projects.",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "24 hours",
    lessonCount: 40,
    rating: 4.8,
    reviewCount: "2.1k",
    students: "12.6k",
    updatedAt: "October 2025",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1600&h=1000&fit=crop",
    instructor: "James Wilson",
    instructorRole: "Software Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "James teaches programming through clear explanations, practical exercises, and projects that reinforce fundamental concepts.",
    instructorExperience: "7+ years experience",
    skills: ["Python", "OOP", "Data Structures", "Projects"],
    outcomes: [
      "Understand Python syntax and core programming concepts.",
      "Work with collections, functions, and modules.",
      "Apply object-oriented programming.",
      "Build small practical Python applications.",
    ],
    requirements: [
      "No previous programming experience required.",
      "A computer with Python installed.",
    ],
    audience: [
      "Complete beginners.",
      "Students learning programming fundamentals.",
      "Developers adding Python to their toolkit.",
    ],
    modules: [
      {
        title: "Python Fundamentals",
        lessons: [
          { title: "Introduction to Python", duration: "10:20", preview: true },
          { title: "Variables and data types", duration: "18:40" },
          { title: "Conditions and loops", duration: "24:15" },
        ],
      },
      {
        title: "Functions and Data Structures",
        lessons: [
          { title: "Writing reusable functions", duration: "20:10" },
          { title: "Lists, tuples and dictionaries", duration: "27:30" },
        ],
      },
      {
        title: "Object-Oriented Programming",
        lessons: [
          { title: "Classes and objects", duration: "26:15" },
          { title: "Inheritance and encapsulation", duration: "30:20" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Data Analytics with SQL",
    subtitle: "Turn raw data into meaningful insights and better decisions.",
    description:
      "Explore relational databases, SQL queries, joins, aggregation, and analytical techniques for extracting useful information from data.",
    category: "Data Science",
    level: "Intermediate",
    plan: "Premium",
    duration: "21 hours",
    lessonCount: 36,
    rating: 4.9,
    reviewCount: "980",
    students: "6.1k",
    updatedAt: "October 2023",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=1000&fit=crop",
    instructor: "Priya Sharma",
    instructorRole: "Data Analyst",
    instructorImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "Priya specializes in SQL, analytical reporting, and helping teams turn complex datasets into actionable insights.",
    instructorExperience: "5+ years experience",
    skills: ["SQL", "PostgreSQL", "Analytics", "Reporting"],
    outcomes: [
      "Write SQL queries to retrieve useful data.",
      "Join tables and aggregate records.",
      "Use subqueries and advanced query techniques.",
      "Analyze datasets and communicate findings.",
    ],
    requirements: [
      "Basic computer skills.",
      "Previous SQL knowledge is helpful but not essential.",
    ],
    audience: [
      "Aspiring data analysts.",
      "Students interested in data science.",
      "Professionals who work with relational data.",
    ],
    modules: [
      {
        title: "SQL Foundations",
        lessons: [
          {
            title: "Introduction to relational databases",
            duration: "15:20",
            preview: true,
          },
          { title: "SELECT, WHERE and ORDER BY", duration: "22:40" },
        ],
      },
      {
        title: "Joins and Aggregation",
        lessons: [
          { title: "Working with joins", duration: "28:10" },
          { title: "Grouping and aggregate functions", duration: "25:35" },
        ],
      },
      {
        title: "Practical Data Analysis",
        lessons: [
          { title: "Analyzing business datasets", duration: "30:15" },
          { title: "Writing analytical reports", duration: "24:50" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Modern JavaScript Essentials",
    subtitle:
      "Write cleaner JavaScript and understand how modern web apps work.",
    description:
      "Learn modern JavaScript syntax, asynchronous programming, promises, modules, and the fundamentals needed to develop interactive web applications.",
    category: "Development",
    level: "Beginner",
    plan: "Free",
    duration: "16 hours",
    lessonCount: 28,
    rating: 4.7,
    reviewCount: "743",
    students: "7.3k",
    updatedAt: "October 2026",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1600&h=1000&fit=crop",
    instructor: "Daniel Brooks",
    instructorRole: "Frontend Engineer",
    instructorImage:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "Daniel focuses on modern frontend engineering, JavaScript fundamentals, and writing maintainable application code.",
    instructorExperience: "6+ years experience",
    skills: ["JavaScript", "ES Modules", "Async", "DOM"],
    outcomes: [
      "Understand modern JavaScript syntax.",
      "Work with arrays, objects, and functions.",
      "Use promises and async/await.",
      "Build interactive browser applications.",
    ],
    requirements: [
      "Basic familiarity with using a computer.",
      "No previous JavaScript experience required.",
    ],
    audience: [
      "Beginners learning frontend development.",
      "Students preparing to learn React.",
      "Developers refreshing JavaScript fundamentals.",
    ],
    modules: [
      {
        title: "JavaScript Essentials",
        lessons: [
          {
            title: "Getting started with JavaScript",
            duration: "12:10",
            preview: true,
          },
          { title: "Variables and functions", duration: "20:30" },
        ],
      },
      {
        title: "Modern JavaScript",
        lessons: [
          { title: "Arrays and objects", duration: "25:15" },
          { title: "Promises and async/await", duration: "30:40" },
        ],
      },
      {
        title: "Working with the Browser",
        lessons: [
          { title: "DOM manipulation", duration: "22:20" },
          { title: "Building a practical project", duration: "34:10" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Product & Business Strategy",
    subtitle:
      "Learn to turn market opportunities into practical product plans.",
    description:
      "Understand product thinking, market research, customer needs, strategic planning, and the fundamentals of building successful products.",
    category: "Business",
    level: "Beginner",
    plan: "Premium",
    duration: "14 hours",
    lessonCount: 24,
    rating: 4.7,
    reviewCount: "512",
    students: "3.8k",
    updatedAt: "April 2026",
    language: "English",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=1000&fit=crop",
    instructor: "Olivia Bennett",
    instructorRole: "Product Strategist",
    instructorImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    instructorBio:
      "Olivia helps teams connect customer research, product decisions, and business objectives to build useful digital products.",
    instructorExperience: "7+ years experience",
    skills: ["Strategy", "Research", "Planning", "Product"],
    outcomes: [
      "Understand product discovery and strategy.",
      "Research markets and customer needs.",
      "Define product goals and priorities.",
      "Create actionable product roadmaps.",
    ],
    requirements: [
      "No prior product management experience required.",
      "An interest in business and product development.",
    ],
    audience: [
      "Aspiring product managers.",
      "Entrepreneurs and business students.",
      "Developers interested in product strategy.",
    ],
    modules: [
      {
        title: "Product Thinking",
        lessons: [
          {
            title: "Introduction to product strategy",
            duration: "14:20",
            preview: true,
          },
          { title: "Understanding customer needs", duration: "20:15" },
        ],
      },
      {
        title: "Market Research",
        lessons: [
          { title: "Market and competitor analysis", duration: "24:40" },
          { title: "Validating product ideas", duration: "21:10" },
        ],
      },
      {
        title: "Planning and Execution",
        lessons: [
          { title: "Setting product priorities", duration: "18:25" },
          { title: "Building a product roadmap", duration: "26:30" },
        ],
      },
    ],
  },
];

const reviews = [
  {
    name: "Michael R.",
    initials: "MR",
    rating: 5,
    date: "2 weeks ago",
    text: "The lessons are structured well and the practical examples make the concepts easier to understand.",
  },
  {
    name: "Ananya K.",
    initials: "AK",
    rating: 5,
    date: "1 month ago",
    text: "A great learning experience. I particularly liked the clear explanations and step-by-step approach.",
  },
  {
    name: "David T.",
    initials: "DT",
    rating: 4,
    date: "1 month ago",
    text: "Useful content with a good progression from fundamentals to more practical topics.",
  },
  {
    name: "Jessica M.",
    initials: "JM",
    rating: 5,
    date: "2 months ago",
    text: "The explanations are clear, and the course helped me feel more confident applying what I learned.",
  },
  {
    name: "Rahul P.",
    initials: "RP",
    rating: 5,
    date: "2 months ago",
    text: "A well-organized course with practical topics and a useful learning path.",
  },
  {
    name: "Emily W.",
    initials: "EW",
    rating: 4,
    date: "3 months ago",
    text: "Good course structure and examples. I would recommend it to anyone looking to build their skills.",
  },
];

const CourseDetailsPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const course =
    courses.find((item) => item.id === Number(courseId)) ?? courses[0];

  const [saved, setSaved] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews"
  >("overview");
  const [showAllModules, setShowAllModules] = useState(false);
  const [relatedCanScrollLeft, setRelatedCanScrollLeft] = useState(false);
  const [relatedCanScrollRight, setRelatedCanScrollRight] = useState(true);
  const relatedCoursesRef = useRef<HTMLDivElement | null>(null);

  const totalModules = course.modules.length;
  const displayedModules = showAllModules
    ? course.modules
    : course.modules.slice(0, 3);

  const isPremium = course.plan === "Premium";

  const handleLearningAction = () => {
    // UI-only: connect this action to your actual subscription,
    // enrollment, and lesson-player routes when integrating the backend.
    if (isPremium) {
      navigate("/student/subscriptions");
      return;
    }

    navigate("/student/courses");
  };

  const toggleModule = (index: number) => {
    setExpandedModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const scrollToCurriculum = () => {
    setActiveTab("curriculum");
    document.getElementById("course-curriculum")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-full space-y-7 pb-12 text-white">
      {/* Top navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-sm text-white/65 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to courses
        </button>

        <div className="hidden items-center gap-2 text-xs text-white/35 sm:flex">
          <span>Courses</span>
          <span>/</span>
          <span className="text-violet-300">{course.category}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative isolate overflow-hidden rounded-3xl border border-violet-400/20 bg-[#0D0B14]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1B1230] via-[#100E19] to-[#0A0D16]" />
        <div className="absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute -bottom-28 left-1/3 -z-10 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
          <div className="relative z-10 flex flex-col justify-center p-6 sm:p-9 lg:p-11">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-[11px] font-medium text-violet-200">
                {course.category}
              </span>

              <span className="rounded-lg border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 text-[11px] text-white/60">
                {course.level}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-semibold ${
                  isPremium
                    ? "border-violet-400/30 bg-violet-500/10 text-violet-200"
                    : "border-emerald-400/25 bg-emerald-500/10 text-emerald-300"
                }`}
              >
                {isPremium ? (
                  <Sparkles className="h-3.5 w-3.5" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                )}
                {course.plan}
              </span>
            </div>

            <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              {course.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              {course.subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <strong className="text-white">
                  {course.rating.toFixed(1)}
                </strong>
                <span>({course.reviewCount} reviews)</span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Users className="h-4 w-4 text-violet-300" />
                {course.students} learners
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <img
                src={course.instructorImage}
                alt={course.instructor}
                className="h-11 w-11 rounded-full border border-white/10 object-cover"
              />
              <div>
                <p className="text-sm font-medium text-white">
                  {course.instructor}
                  <BadgeCheck className="ml-1.5 inline h-4 w-4 text-violet-300" />
                </p>
                <p className="mt-1 text-xs text-white/40">
                  {course.instructorRole}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleLearningAction}
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
              >
                {isPremium ? (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Explore Premium
                  </>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    Start Learning
                  </>
                )}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={scrollToCurriculum}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-white/75 transition hover:border-violet-400/30 hover:bg-violet-500/[0.07] hover:text-white"
              >
                <BookOpen className="h-4 w-4" />
                View curriculum
              </button>

              <button
                type="button"
                onClick={() => setSaved((current) => !current)}
                aria-pressed={saved}
                aria-label={saved ? "Remove saved course" : "Save course"}
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition ${
                  saved
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/[0.035] text-white/60 hover:border-violet-400/30 hover:text-violet-200"
                }`}
              >
                <Bookmark
                  className="h-4.5 w-4.5"
                  fill={saved ? "currentColor" : "none"}
                />
              </button>
            </div>

            <p className="mt-4 text-[11px] leading-5 text-white/35">
              {isPremium
                ? "Premium subscription required to access the full course."
                : "Start exploring the lessons and build your skills at your own pace."}
            </p>
          </div>

          {/* Course preview image */}
          <div className="relative min-h-[260px] overflow-hidden sm:min-h-[340px] lg:min-h-[520px]">
            <img
              src={course.image}
              alt={`${course.title} course`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B14] via-[#0D0B14]/10 to-transparent lg:bg-gradient-to-r lg:from-[#0D0B14]/70 lg:via-transparent lg:to-transparent" />
            <div className="absolute inset-0 bg-violet-950/10" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-xl sm:left-auto sm:right-5">
              <MonitorPlay className="h-4 w-4 text-violet-300" />
              <span className="text-xs font-medium text-white/90">
                Course preview
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToCurriculum}
              aria-label="Explore course lessons"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white shadow-2xl backdrop-blur-md transition hover:scale-105 hover:bg-violet-600/70">
                <PlayCircle className="h-8 w-8" />
              </span>
            </button>

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-200">
                  Your next chapter
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  Learn. Build. Grow.
                </p>
              </div>
              <span className="rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs text-white/80 backdrop-blur-md">
                {course.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Course quick facts */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            icon: Clock3,
            label: "Course duration",
            value: course.duration,
          },
          {
            icon: BookOpen,
            label: "Total lessons",
            value: `${course.lessonCount} lessons`,
          },
          {
            icon: GraduationCap,
            label: "Skill level",
            value: course.level,
          },
          {
            icon: Globe2,
            label: "Language",
            value: course.language,
          },
        ].map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.07] bg-[#0B0B0F] p-4 transition hover:border-violet-400/20"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.09] text-violet-300">
              <Icon className="h-4 w-4" />
            </div>
            <p className="text-[11px] text-white/40">{label}</p>
            <p className="mt-1.5 text-sm font-medium text-white/90">{value}</p>
          </div>
        ))}
      </section>

      {/* Main content and sidebar */}
      <div className="grid items-start gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-7">
          {/* Content navigation */}
          <nav className="flex gap-5 overflow-x-auto border-b border-white/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(
              [
                ["overview", "Overview"],
                ["curriculum", "Curriculum"],
                ["instructor", "Instructor"],
                ["reviews", "Reviews"],
              ] as const
            ).map(([tab, label]) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  if (tab !== "overview") {
                    document
                      .getElementById(
                        tab === "curriculum"
                          ? "course-curriculum"
                          : tab === "instructor"
                            ? "course-instructor"
                            : "course-reviews",
                      )
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                  }
                }}
                className={`relative shrink-0 pb-3 text-sm transition ${
                  activeTab === tab
                    ? "font-semibold text-violet-200"
                    : "text-white/45 hover:text-white/80"
                }`}
              >
                {label}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-violet-400" />
                )}
              </button>
            ))}
          </nav>

          {/* Overview */}
          <section id="course-overview" className="scroll-mt-6 space-y-7">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <BookOpen className="h-4 w-4" />
                </span>
                <h2 className="text-xl font-semibold tracking-tight">
                  About this course
                </h2>
              </div>
              <p className="text-sm leading-7 text-white/55">
                {course.description}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Learn at your own pace, revisit lessons when you need to, and
                build a foundation you can use in your next project.
              </p>
            </div>

            <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] to-transparent p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-200">
                  <Target className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">What you'll learn</h2>
                  <p className="mt-1 text-xs text-white/40">
                    Skills and outcomes from this course
                  </p>
                </div>
              </div>

              <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {course.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                    <p className="text-sm leading-6 text-white/65">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Laptop className="h-4 w-4" />
                </span>
                <h2 className="text-xl font-semibold tracking-tight">
                  Skills you'll develop
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs font-medium text-white/65 transition hover:border-violet-400/30 hover:bg-violet-500/[0.06] hover:text-violet-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section id="course-curriculum" className="scroll-mt-6 space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-violet-300" />
                  <h2 className="text-xl font-semibold tracking-tight">
                    Course curriculum
                  </h2>
                </div>
                <p className="text-xs text-white/40">
                  Explore the modules and lessons included in this course.
                </p>
              </div>

              <span className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-white/50">
                {course.lessonCount} lessons · {course.duration}
              </span>
            </div>

            <div className="space-y-3">
              {displayedModules.map((module, index) => {
                const expanded = expandedModules.includes(index);

                return (
                  <div
                    key={module.title}
                    className={`overflow-hidden rounded-2xl border transition-colors ${
                      expanded
                        ? "border-violet-400/25 bg-[#0D0B13]"
                        : "border-white/[0.08] bg-[#0B0B0F] hover:border-white/[0.14]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(index)}
                      aria-expanded={expanded}
                      className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/[0.08] text-xs font-semibold text-violet-200">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-white/90">
                          {module.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/40">
                          {module.lessons.length} lessons
                        </span>
                      </span>

                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-white/40 transition-transform ${
                          expanded ? "rotate-180 text-violet-300" : ""
                        }`}
                      />
                    </button>

                    {expanded && (
                      <div className="border-t border-white/[0.06] px-3 py-2 sm:px-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.title}
                            className="flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-white/[0.025] sm:px-3"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.035] text-white/40">
                              <PlayCircle className="h-4 w-4" />
                            </span>

                            <div className="min-w-0 flex-1">
                              <p className="text-xs leading-5 text-white/75">
                                {lessonIndex + 1}. {lesson.title}
                              </p>
                            </div>

                            <span className="shrink-0 text-[11px] tabular-nums text-white/35">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {totalModules > 3 && (
              <button
                type="button"
                onClick={() => setShowAllModules((current) => !current)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-medium text-white/65 transition hover:border-violet-400/30 hover:text-violet-200"
              >
                {showAllModules ? "Show fewer modules" : "View all modules"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showAllModules ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}

            <p className="text-[11px] leading-5 text-white/35">
              Sample curriculum for UI demonstration. Lesson availability
              depends on the course and the student's access permissions.
            </p>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl border border-white/[0.07] bg-[#0B0B0F] p-5 sm:p-6">
            <h2 className="text-lg font-semibold tracking-tight">
              Requirements
            </h2>
            <div className="mt-4 space-y-3">
              {course.requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="flex items-start gap-3 text-sm leading-6 text-white/55"
                >
                  <Check className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                  {requirement}
                </div>
              ))}
            </div>

            <div className="my-5 h-px bg-white/[0.06]" />

            <h3 className="text-sm font-semibold text-white">
              Who this course is for
            </h3>
            <div className="mt-4 space-y-3">
              {course.audience.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-white/55"
                >
                  <GraduationCap className="mt-1 h-4 w-4 shrink-0 text-violet-300" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Instructor */}
          <section
            id="course-instructor"
            className="scroll-mt-6 rounded-2xl border border-white/[0.07] bg-[#0B0B0F] p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-violet-300" />
              <h2 className="text-xl font-semibold tracking-tight">
                Meet your instructor
              </h2>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row">
              <img
                src={course.instructorImage}
                alt={course.instructor}
                className="h-24 w-24 shrink-0 rounded-2xl border border-white/10 object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{course.instructor}</h3>
                  <BadgeCheck className="h-4 w-4 text-violet-300" />
                </div>
                <p className="mt-1 text-sm text-violet-300/80">
                  {course.instructorRole}
                </p>

                <p className="mt-3 text-sm leading-7 text-white/50">
                  {course.instructorBio}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/55">
                  <GraduationCap className="h-4 w-4 text-violet-300" />
                  {course.instructorExperience}
                </div>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section id="course-reviews" className="scroll-mt-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-violet-300" />
                  <h2 className="text-xl font-semibold tracking-tight">
                    Student reviews
                  </h2>
                </div>
                <p className="text-xs text-white/40">
                  Feedback from learners about their experience.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[190px_minmax(0,1fr)]">
              <div className="flex flex-col items-center justify-center rounded-2xl border border-violet-400/15 bg-violet-500/[0.06] p-5">
                <p className="text-4xl font-semibold tracking-tight">
                  {course.rating.toFixed(1)}
                </p>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(course.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/15"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-white/45">
                  {course.reviewCount} reviews
                </p>
              </div>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentages: Record<number, number> = {
                    5: 78,
                    4: 16,
                    3: 4,
                    2: 1,
                    1: 1,
                  };

                  return (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-10 shrink-0 text-white/45">
                        {star} star
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${percentages[star]}%` }}
                        />
                      </div>
                      <span className="w-9 text-right text-white/35">
                        {percentages[star]}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              {reviews.slice(0, 3).map((review) => (
                <article
                  key={review.name}
                  className="rounded-2xl border border-white/[0.07] bg-[#0B0B0F] p-4 sm:p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-violet-500/10 text-xs font-semibold text-violet-200">
                      {review.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-white/85">
                          {review.name}
                        </p>
                        <span className="text-[11px] text-white/35">
                          {review.date}
                        </span>
                      </div>

                      <div className="mt-1.5 flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-white/15"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mt-3 text-sm leading-6 text-white/50">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {reviews.length > 3 && (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm font-medium text-white/65 transition hover:border-violet-400/30 hover:text-violet-200"
              >
                View all reviews
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            <p className="text-[11px] leading-5 text-white/35">
              Review content and rating distribution are illustrative UI data.
              Replace them with actual course reviews from your backend.
            </p>
          </section>
        </div>

        {/* Sticky sidebar */}
        <aside className="space-y-4 xl:sticky xl:top-6">
          <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B0B0F]">
            <div className="relative overflow-hidden border-b border-violet-400/15 bg-gradient-to-br from-[#211438] via-[#151020] to-[#0B0B0F] p-5">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200">
                  <Sparkles className="h-3 w-3" />
                  {isPremium ? "Premium course" : "Free course"}
                </span>

                <h3 className="mt-4 text-lg font-semibold">
                  {isPremium
                    ? "Take your learning further"
                    : "Start learning today"}
                </h3>

                <p className="mt-2 text-xs leading-6 text-white/45">
                  {isPremium
                    ? "Unlock this course with a Premium subscription and continue building your skills."
                    : "Explore the lessons and build your knowledge at your own pace."}
                </p>

                <button
                  type="button"
                  onClick={handleLearningAction}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:brightness-110"
                >
                  {isPremium ? (
                    <>
                      <LockKeyhole className="h-4 w-4" />
                      Explore Premium
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Start Learning
                    </>
                  )}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-xs font-semibold text-white/80">
                What's included
              </p>

              {[
                {
                  icon: MonitorPlay,
                  label: `${course.lessonCount} video lessons`,
                },
                {
                  icon: Clock3,
                  label: `${course.duration} of content`,
                },
                {
                  icon: Laptop,
                  label: "Learn at your own pace",
                },
                {
                  icon: Globe2,
                  label: `${course.language} language`,
                },
                {
                  icon: Bookmark,
                  label: "Save for later",
                },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-xs text-white/50"
                >
                  <Icon className="h-4 w-4 shrink-0 text-violet-300/80" />
                  {label}
                </div>
              ))}

              <div className="border-t border-white/[0.07] pt-4">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-white/40">Last updated</span>
                  <span className="text-white/70">{course.updatedAt}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="text-white/40">Course level</span>
                  <span className="text-white/70">{course.level}</span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="text-white/40">Course plan</span>
                  <span
                    className={
                      isPremium ? "text-violet-200" : "text-emerald-300"
                    }
                  >
                    {course.plan}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Share course */}
          <button
            type="button"
            onClick={() => {
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                void navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-medium text-white/55 transition hover:border-violet-400/25 hover:text-white/85"
          >
            <Share2 className="h-4 w-4" />
            Share this course
          </button>
        </aside>
      </div>

      {/* Related courses - displayed like the Explore Courses listing */}
      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium text-violet-300">
              <Sparkles className="h-4 w-4" />
              KEEP LEARNING
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Related courses
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
              Discover more courses to build on what you learn here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Scroll related courses left"
                disabled={!relatedCanScrollLeft}
                onClick={() =>
                  relatedCoursesRef.current?.scrollBy({
                    left: -320,
                    behavior: "smooth",
                  })
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] text-white/70 transition hover:border-violet-400/30 hover:bg-violet-500/[0.08] hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Scroll related courses right"
                disabled={!relatedCanScrollRight}
                onClick={() =>
                  relatedCoursesRef.current?.scrollBy({
                    left: 320,
                    behavior: "smooth",
                  })
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.025] text-white/70 transition hover:border-violet-400/30 hover:bg-violet-500/[0.08] hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={relatedCoursesRef}
          onScroll={(event) => {
            const element = event.currentTarget;
            setRelatedCanScrollLeft(element.scrollLeft > 4);
            setRelatedCanScrollRight(
              element.scrollLeft + element.clientWidth <
                element.scrollWidth - 4,
            );
          }}
          className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {[
            ...courses.filter(
              (item) =>
                item.id !== course.id &&
                (item.category === course.category ||
                  item.level === course.level),
            ),
            ...courses.filter(
              (item) =>
                item.id !== course.id &&
                item.category !== course.category &&
                item.level !== course.level,
            ),
          ]
            .filter(
              (item, index, list) =>
                list.findIndex((entry) => entry.id === item.id) === index,
            )
            .map((related) => (
              <button
                key={related.id}
                type="button"
                onClick={() => navigate(`/student/courses/${related.id}`)}
                className="group min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B0B0F] text-left transition duration-200 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[#100D18]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.04]">
                  <img
                    src={related.image}
                    alt={related.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span
                    className={`absolute left-3 top-3 rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${
                      related.plan === "Premium"
                        ? "border-violet-300/30 bg-violet-950/70 text-violet-200"
                        : "border-emerald-300/30 bg-emerald-950/70 text-emerald-200"
                    }`}
                  >
                    {related.plan}
                  </span>
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-black/55 px-2 py-1 text-[10px] text-white/85 backdrop-blur-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {related.rating.toFixed(1)}{" "}
                    <span className="text-white/45">
                      ({related.reviewCount})
                    </span>
                  </span>
                </div>
                <div className="space-y-3 p-4">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] text-white/45">
                    <span className="rounded-md border border-violet-400/20 bg-violet-500/[0.08] px-2 py-1 text-violet-200">
                      {related.category}
                    </span>
                    <span>{related.level}</span>
                  </div>
                  <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-white/90 transition group-hover:text-violet-200">
                    {related.title}
                  </h3>
                  <p className="line-clamp-2 min-h-10 text-xs leading-5 text-white/45">
                    {related.subtitle}
                  </p>
                  <div className="flex items-center gap-2 border-t border-white/[0.07] pt-3 text-[11px] text-white/45">
                    <img
                      src={related.instructorImage}
                      alt=""
                      loading="lazy"
                      className="h-7 w-7 rounded-full object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate">
                      {related.instructor}
                    </span>
                    <span className="shrink-0">{related.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/40">
                    <span className="inline-flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" />
                      {related.lessonCount} lessons
                    </span>
                    <span className="inline-flex items-center gap-1 text-violet-300 transition group-hover:gap-2">
                      View course <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
