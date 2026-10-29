import { useRef, useState } from "react";
import type { ComponentType } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Crown,
  GraduationCap,
  Laptop,
  ListChecks,
  MessageCircle,
  Play,
  PlayCircle,
  Star,
  Target,
  Users,
  UsersRound,
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
  publishedAt: string;
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
    publishedAt: "January 2024",
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
    publishedAt: "March 2024",
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
    publishedAt: "February 2023",
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
    publishedAt: "May 2022",
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
    publishedAt: "August 2024",
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
    publishedAt: "June 2024",
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

/* ──────────────────────────────────────────────────────────────────
   UNIFIED SURFACE SYSTEM
   One violet-black card surface, one interactive-pill surface, and one
   set of hover states — shared by every card and control on the page so
   backgrounds and hovers read as a single, consistent system.
   ────────────────────────────────────────────────────────────────── */

/* Standard content card — same base gradient + border everywhere */
const CARD_BASE =
  "relative overflow-hidden border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

/* Pill / ghost control surface (back button, badges, "view all", arrows) */
const PILL =
  "border border-white/[0.08] bg-[#0E0A1A] text-white/65 transition-colors duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-violet-100";

const SectionHeading = ({
  icon: Icon,
  title,
  caption,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  caption?: string;
}) => (
  <div className="flex items-start gap-3.5">
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-violet-500/0 text-violet-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h2 className="text-xl font-semibold tracking-[-0.015em] text-white sm:text-[22px]">
        {title}
      </h2>
      {caption && <p className="mt-1 text-xs text-white/40">{caption}</p>}
    </div>
  </div>
);

/* A small badge that matches the catalog cards exactly (amber Crown / emerald Check) */
const PlanBadge = ({
  plan,
  className = "",
}: {
  plan: "Free" | "Premium";
  className?: string;
}) =>
  plan === "Premium" ? (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/35 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95 px-3 py-1.5 text-[11px] font-semibold text-amber-200 shadow-[0_4px_18px_rgba(245,158,11,0.18)] backdrop-blur-md ${className}`}
    >
      <Crown className="h-3.5 w-3.5 text-amber-300" />
      Premium
    </span>
  ) : (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-[#06251D]/90 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 shadow-lg backdrop-blur-md ${className}`}
    >
      <Check className="h-3.5 w-3.5" />
      Free
    </span>
  );

const CourseDetailsPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const course =
    courses.find((item) => item.id === Number(courseId)) ?? courses[0];

  const [saved, setSaved] = useState(false);
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [showAllModules, setShowAllModules] = useState(false);
  const [relatedCanScrollLeft, setRelatedCanScrollLeft] = useState(false);
  const [relatedCanScrollRight, setRelatedCanScrollRight] = useState(true);

  const relatedCoursesRef = useRef<HTMLDivElement | null>(null);

  const totalModules = course.modules.length;
  const displayedModules = showAllModules
    ? course.modules
    : course.modules.slice(0, 3);

  const isPremium = course.plan === "Premium";

  /* Sidebar facts — deliberately NON-redundant with the hero and the
     "Skills you'll develop" section. These describe access, format and
     deliverables rather than re-listing title/subtitle/skills. */
  const courseIncludes = [
    { icon: Clock3, label: `${course.duration} of on-demand content` },
    {
      icon: ListChecks,
      label: `${course.lessonCount} lessons across ${totalModules} modules`,
    },
    { icon: BookOpen, label: `Taught in ${course.language}` },
    { icon: UsersRound, label: `1024 learners enrolled` },
    { icon: Star, label: `${course.rating} course rating` },
    { icon: GraduationCap, label: "Certificate of completion" },
  ];

  /* Compact "Course details" rows for the sidebar — published / updated
     dates plus a couple of facts not emphasised in the hero. */
  const courseDetails = [
    { label: "Category", value: course.category },
    { label: "Skill level", value: course.level },
    { label: "Published", value: course.publishedAt },
    { label: "Last updated", value: course.updatedAt },
  ];

  const handleLearningAction = () => {
    // UI-only: connect this action to your actual subscription,
    // enrollment, and lesson-player routes when integrating the backend.
    if (isPremium) {
      navigate("/student/subscriptions");
      return;
    }

    navigate("/student/courses");
  };

  const handleViewInstructor = () => {
    // UI-only: point this at your instructor profile route when the
    // backend is connected.
    navigate("/student/instructors");
  };

  const toggleModule = (index: number) => {
    setExpandedModules((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const scrollToCurriculum = () => {
    document.getElementById("course-curriculum")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Glassy card sheen — plays only on hover (shared with the catalog) */}
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
        @keyframes lp-aura {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        /* Soft glow for the hero blooms — opacity-only so it never
           repaints the compositor layer (prevents first-paint flicker). */
        @keyframes lp-hero-bloom {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        .lp-hero-bloom {
          will-change: opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          animation: lp-hero-bloom 8s ease-in-out infinite;
        }
        /* Gentle breathing ring around the play button */
        @keyframes lp-play-ring {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 0.9; }
        }
        .lp-play-ring {
          animation: lp-play-ring 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen { display: none; }
          .lp-aura { animation: none !important; }
          .lp-hero-bloom { animation: none !important; }
          .lp-play-ring { animation: none !important; }
        }
      `}</style>

      {/* Top bar — circular glass back button + clean boxless breadcrumb */}

      <div className="flex min-w-0 flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_22px_-4px_rgba(167,139,250,0.9)] transition-opacity duration-300 group-hover:opacity-100"
          />
          <ArrowLeft className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 items-center gap-2 text-xs"
        >
          <span className="hidden shrink-0 font-medium text-white/40 sm:inline">
            Courses
          </span>

          <ChevronRight
            aria-hidden="true"
            className="hidden h-3.5 w-3.5 shrink-0 text-white/30 sm:block"
          />

          <span className="hidden max-w-[120px] shrink-0 truncate text-white/40 sm:inline">
            {course.category}
          </span>

          <ChevronRight
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-white/30"
          />

          <span className="min-w-0 truncate bg-gradient-to-r from-white to-violet-200 bg-clip-text font-semibold text-transparent">
            {course.title}
          </span>
        </nav>
      </div>

      {/* ── Hero — modern, premium refresh ─────────────────────────── */}

      <section
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty(
            "--mx",
            `${event.clientX - rect.left}px`,
          );
          event.currentTarget.style.setProperty(
            "--my",
            `${event.clientY - rect.top}px`,
          );
        }}
        className="group/hero relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0B0817] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        {/* Ambient radial base */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(130%_130%_at_0%_0%,#1B1238_0%,#0B0817_45%,#0A1022_100%)]"
        />

        {/* Fine masked grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] [transform:translateZ(0)] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(80%_80%_at_20%_0%,#000_0%,transparent_75%)]"
        />

        {/* Animated color blooms (opacity-only, GPU-promoted — no flicker) */}
        <div
          aria-hidden="true"
          className="lp-hero-bloom pointer-events-none absolute -right-20 -top-28 z-0 h-80 w-80 rounded-full bg-violet-600/25 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="lp-hero-bloom pointer-events-none absolute -bottom-32 left-1/4 z-0 h-72 w-72 rounded-full bg-sky-500/15 blur-[120px] [animation-delay:-4s]"
        />

        {/* Cursor-follow spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/hero:opacity-100 [background:radial-gradient(500px_circle_at_var(--mx,50%)_var(--my,50%),rgba(139,92,246,0.10),transparent_60%)]"
        />

        <div className="relative z-10 grid lg:grid-cols-[0.92fr_1.08fr]">
          {/* Text — now on the RIGHT (lg:order-2); image moved to the left */}
          <div className="relative z-10 order-2 flex flex-col justify-center p-6 sm:p-10 lg:order-2 lg:p-12">
            {/* Category + level badges — refreshed UI, dot removed */}
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-violet-500/[0.06] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-violet-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                <Laptop className="h-3.5 w-3.5 text-violet-300" />
                {course.category}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/25 bg-gradient-to-r from-cyan-500/15 to-cyan-500/[0.04] px-3 py-1.5 text-[11px] font-semibold tracking-wide text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm">
                <GraduationCap className="h-3.5 w-3.5 text-cyan-300" />
                {course.level}
              </span>

              <PlanBadge plan={course.plan} />
            </div>

            <h1 className="max-w-2xl text-[32px] font-semibold leading-[1.03] tracking-[-0.04em] sm:text-[42px] lg:text-[46px]">
              <span className="bg-gradient-to-br from-white via-[#EDE7FF] to-[#9F85FF] bg-clip-text text-transparent [text-wrap:balance]">
                {course.title}
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-7 tracking-[0.01em] text-white/55 [text-wrap:pretty]">
              {course.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 text-xs text-white/55">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <strong className="text-white">
                  {course.rating.toFixed(1)}
                </strong>
                <span className="text-white/40">
                  ({course.reviewCount} reviews)
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
                <Users className="h-4 w-4 text-violet-300" />
                <strong className="text-white">{course.students}</strong>
                <span className="text-white/40">learners</span>
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2 backdrop-blur-sm">
                <Clock3 className="h-4 w-4 text-cyan-300" />
                <strong className="text-white">{course.duration}</strong>
              </span>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Primary CTA — now matches the sidebar "Enroll Now" button UI */}
              <button
                type="button"
                onClick={handleLearningAction}
                className="group/button inline-flex min-h-12 min-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-10 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:ring-offset-2 focus:ring-offset-[#0B0817]"
              >
                {isPremium ? (
                  <>Enroll Now</>
                ) : (
                  <>
                    <PlayCircle className="h-4 w-4" />
                    Start Learning
                  </>
                )}

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={scrollToCurriculum}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-violet-400/30 hover:bg-violet-500/[0.07] hover:text-white"
              >
                <BookOpen className="h-4 w-4 text-violet-300" />
                View curriculum
              </button>

              <button
                type="button"
                onClick={() => setSaved((current) => !current)}
                aria-pressed={saved}
                aria-label={saved ? "Remove saved course" : "Save course"}
                className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200 ${
                  saved
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200 shadow-[0_0_24px_-6px_rgba(167,139,250,0.8)]"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-violet-400/30 hover:text-violet-200"
                }`}
              >
                <Bookmark
                  className="h-[18px] w-[18px]"
                  fill={saved ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Image — now on the LEFT (order-1) */}
          <div className="relative isolate order-1 min-h-[260px] overflow-hidden bg-[#0B0817] transform-gpu sm:min-h-[320px] lg:order-1 lg:min-h-[460px]">
            <img
              src={course.image}
              alt={`${course.title} course`}
              loading="eager"
              decoding="async"
              draggable={false}
              onLoad={() => setHeroImageLoaded(true)}
              className={`absolute inset-0 block h-full w-full scale-110 transform-gpu object-cover [backface-visibility:hidden] transition-[transform,opacity] duration-[2200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/hero:scale-100 ${
                heroImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Cinematic blend into panel */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0817] via-[#0B0817]/25 to-transparent lg:bg-gradient-to-l lg:from-[#0B0817] lg:via-[#0B0817]/20 lg:to-transparent"
            />

            {/* Subtle color wash */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-violet-900/30 via-transparent to-sky-900/20 mix-blend-soft-light"
            />

            {/* Play / preview — ultra-transparent glass control */}
            <button
              type="button"
              onClick={scrollToCurriculum}
              aria-label="Preview this course"
              className="group/play absolute inset-0 flex cursor-pointer items-center justify-center"
            >
              {/* Breathing outer rings — layered, see-through */}
              <span
                aria-hidden="true"
                className="lp-play-ring absolute h-[104px] w-[104px] rounded-full border border-white/20"
              />
              <span
                aria-hidden="true"
                className="lp-play-ring absolute h-[128px] w-[128px] rounded-full border border-white/10 [animation-delay:-1.5s]"
              />

              {/* Fully transparent disc — the image stays visible underneath; slow 700ms hover both ways */}
              <span className="relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-white/40 bg-transparent shadow-[0_10px_40px_-8px_rgba(0,0,0,0.45)] transition-all duration-700 ease-out group-hover/play:scale-110 group-hover/play:border-white/80 group-hover/play:bg-white/5 group-hover/play:shadow-[0_14px_52px_-6px_rgba(124,58,237,0.6)]">
                {/* Faint glow that fades in on hover (kept see-through) */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-violet-400/20 via-transparent to-sky-400/10 opacity-0 transition-opacity duration-700 ease-out group-hover/play:opacity-100"
                />
                <Play
                  className="relative h-7 w-7 translate-x-[2px] fill-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] transition-transform duration-700 ease-out group-hover/play:scale-105"
                  strokeWidth={0}
                />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Main content and sidebar */}
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_356px]">
        <div className="min-w-0 space-y-8">
          {/* Overview */}
          <section id="course-overview" className="scroll-mt-24 space-y-8">
            {/* About — tightened, with a compact meta strip for better structure */}
            <div className={`${CARD_BASE} group rounded-3xl p-6 sm:p-7`}>
              <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative">
                <SectionHeading
                  icon={BookOpen}
                  title="About this course"
                  caption="What this course is about"
                />

                <p className="mt-5 text-[15px] leading-7 text-white/60">
                  {course.description}
                </p>
              </div>
            </div>

            {/* What you'll learn */}
            <div className={`${CARD_BASE} rounded-3xl p-6 sm:p-7`}>
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
              <div className="relative">
                <SectionHeading
                  icon={Target}
                  title="What you'll learn"
                  caption="Skills and outcomes from this course"
                />

                <div className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  {course.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <p className="text-sm leading-6 text-white/65">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className={`${CARD_BASE} rounded-3xl p-6 sm:p-7`}>
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-violet-500/12 blur-3xl" />
              <div className="relative">
                <SectionHeading
                  icon={Laptop}
                  title="Skills you'll develop"
                  caption="Hands-on tools and technologies"
                />
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="cursor-default rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/75 transition hover:-translate-y-0.5 hover:border-violet-300/30 hover:bg-violet-400/[0.1] hover:text-violet-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Curriculum */}
          <section id="course-curriculum" className="scroll-mt-24 space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <SectionHeading
                icon={ListChecks}
                title="Course curriculum"
                caption="Explore the modules and lessons included."
              />

              <span
                className={`rounded-full px-4 py-2 text-xs font-medium ${PILL}`}
              >
                {course.lessonCount} lessons · {course.duration}
              </span>
            </div>

            <div className="space-y-3">
              {displayedModules.map((module, index) => {
                const expanded = expandedModules.includes(index);
                const moduleMinutes = module.lessons.length;

                return (
                  <div
                    key={module.title}
                    className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                      expanded
                        ? "border-violet-400/25 bg-gradient-to-b from-[#130E24] to-[#0B0814]"
                        : "border-white/[0.07] bg-[#0B0814] hover:border-violet-400/25 hover:bg-[#120D22]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleModule(index)}
                      aria-expanded={expanded}
                      className="flex w-full cursor-pointer items-center gap-3.5 px-4 py-4 text-left sm:px-5"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold transition ${
                          expanded
                            ? "border-violet-400/30 bg-violet-500/15 text-violet-100"
                            : "border-violet-400/15 bg-violet-500/[0.08] text-violet-200"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-white/90">
                          {module.title}
                        </span>
                        <span className="mt-1 block text-xs text-white/40">
                          {moduleMinutes} lessons
                        </span>
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                          expanded
                            ? "border-violet-400/30 bg-violet-500/10 text-violet-300"
                            : "border-white/[0.08] text-white/40"
                        }`}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            expanded ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        expanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/[0.06] px-3 py-2 sm:px-4">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.title}
                              className="group/lesson flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-white/[0.03] sm:px-3"
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/45 transition group-hover/lesson:bg-violet-500/15 group-hover/lesson:text-violet-300">
                                <PlayCircle className="h-4 w-4" />
                              </span>

                              <div className="min-w-0 flex-1">
                                <p className="truncate text-[13px] leading-5 text-white/75">
                                  {lessonIndex + 1}. {lesson.title}
                                </p>
                              </div>

                              <span className="shrink-0 text-[11px] tabular-nums text-white/35">
                                {lesson.duration}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalModules > 3 && (
              <button
                type="button"
                onClick={() => setShowAllModules((current) => !current)}
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium ${PILL}`}
              >
                {showAllModules ? "Show fewer modules" : "View all modules"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showAllModules ? "rotate-180" : ""
                  }`}
                />
              </button>
            )}
          </section>

          {/* Requirements */}
          <section
            className={`${CARD_BASE} grid gap-5 rounded-3xl p-6 sm:grid-cols-2 sm:p-7`}
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/12 blur-3xl" />
            <div className="relative">
              <SectionHeading icon={ListChecks} title="Requirements" />
              <div className="mt-5 space-y-3.5">
                {course.requirements.map((requirement) => (
                  <div
                    key={requirement}
                    className="flex items-start gap-3 text-sm leading-6 text-white/55"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {requirement}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative sm:border-l sm:border-white/[0.08] sm:pl-6">
              <SectionHeading icon={GraduationCap} title="Who this is for" />
              <div className="mt-5 space-y-3.5">
                {course.audience.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-white/55"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                      <GraduationCap className="h-3 w-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instructor — heading outside the card (like Student reviews) */}
          <section id="course-instructor" className="scroll-mt-24 space-y-6">
            <SectionHeading
              icon={GraduationCap}
              title="Meet your instructor"
              caption="Learn from an experienced industry professional."
            />

            <div className={`${CARD_BASE} group rounded-3xl p-6 sm:p-7`}>
              <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative shrink-0">
                    <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/15 blur-sm" />
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="relative h-20 w-20 rounded-full border border-white/15 object-cover shadow-lg"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold tracking-[-0.015em]">
                      {course.instructor}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-violet-300/80">
                      {course.instructorRole}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/50">
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-violet-300" />
                        {course.instructorExperience}
                      </span>
                      <span className="h-3 w-px bg-white/10" />
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-violet-300" />
                        {course.students} learners
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-5 border-t border-white/[0.08] pt-5 text-sm leading-7 text-white/55">
                  {course.instructorBio}
                </p>

                <button
                  type="button"
                  onClick={handleViewInstructor}
                  className={`mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium ${PILL}`}
                >
                  View instructor profile
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Reviews */}
          <section id="course-reviews" className="scroll-mt-24 space-y-6">
            <SectionHeading
              icon={MessageCircle}
              title="Student reviews"
              caption="Feedback from learners about their experience."
            />

            <div className="grid gap-4 sm:grid-cols-[210px_minmax(0,1fr)]">
              <div
                className={`${CARD_BASE} flex flex-col items-center justify-center rounded-3xl p-6`}
              >
                <div className="absolute -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
                <p className="relative text-5xl font-semibold tracking-tight">
                  {course.rating.toFixed(1)}
                </p>
                <div className="relative mt-2.5 flex gap-1">
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
                <p className="relative mt-2.5 text-xs text-white/45">
                  Based on {course.reviewCount} reviews
                </p>
              </div>

              <div
                className={`${CARD_BASE} flex flex-col justify-center space-y-3 rounded-3xl p-6`}
              >
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentages: Record<number, number> = {
                    5: 78,
                    4: 16,
                    3: 4,
                    2: 1,
                    1: 1,
                  };

                  return (
                    <div
                      key={star}
                      className="relative flex items-center gap-3 text-xs"
                    >
                      <span className="inline-flex w-12 shrink-0 items-center gap-1 text-white/45">
                        {star}
                        <Star className="h-3 w-3 fill-amber-400/70 text-amber-400/70" />
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300"
                          style={{ width: `${percentages[star]}%` }}
                        />
                      </div>
                      <span className="w-9 text-right tabular-nums text-white/40">
                        {percentages[star]}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.slice(0, 4).map((review) => (
                <article
                  key={review.name}
                  className={`${CARD_BASE} rounded-2xl p-5 transition-colors duration-300 hover:border-violet-400/35`}
                >
                  <div className="relative flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-violet-500/5 text-xs font-semibold text-violet-100">
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

            {reviews.length > 4 && (
              <button
                type="button"
                className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm font-medium ${PILL}`}
              >
                View all reviews
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </section>
        </div>
        {/* ──────────────────────────────────────────────────────────
            ENROLL CARD — no image, no preview button (those duplicated
            the hero). A branded card with the "This course includes"
            panel, a compact "Course details" block (published / updated
            dates and more), and the CTA.
            ────────────────────────────────────────────────────────── */}

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="group relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-b from-[#1A1230] to-[#0B0814] shadow-xl shadow-black/30">
            <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative p-5">
              {/* Course includes */}
              <div>
                <h4 className="text-sm font-semibold text-white">
                  This course includes
                </h4>

                <ul className="mt-3.5 space-y-2.5">
                  {courseIncludes.map(({ icon: Icon, label }) => (
                    <li
                      key={label}
                      className="flex items-center gap-3 text-sm leading-5 text-white/65"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.08] text-violet-300">
                        <Icon className="h-3.5 w-3.5" />
                      </span>

                      <span className="min-w-0">{label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course details */}
              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <h4 className="text-sm font-semibold text-white">
                  Course details
                </h4>

                <dl className="mt-3 space-y-2 text-sm">
                  {courseDetails.map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3"
                    >
                      <dt className="text-white/45">{label}</dt>
                      <dd className="text-right font-medium text-white/80">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Primary action */}
              <div className="mt-5 border-t border-white/[0.08] pt-5">
                <button
                  type="button"
                  onClick={handleLearningAction}
                  className="group/button flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60 focus:ring-offset-2 focus:ring-offset-[#0B0814]"
                >
                  {isPremium ? "Enroll Now" : "Start Learning"}

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* Related courses — presented like the Explore Courses listing */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] sm:text-[26px]">
              Related{" "}
              <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
                courses
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/45">
              Discover more courses to build on what you learn here.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll related courses left"
              disabled={!relatedCanScrollLeft}
              onClick={() => {
                const element = relatedCoursesRef.current;
                if (!element) return;

                element.scrollTo({
                  left: Math.max(0, element.scrollLeft - 340),
                  behavior: "smooth",
                });
              }}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${PILL} disabled:cursor-not-allowed disabled:opacity-25`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Scroll related courses right"
              disabled={!relatedCanScrollRight}
              onClick={() => {
                const element = relatedCoursesRef.current;
                if (!element) return;

                element.scrollTo({
                  left: Math.min(
                    element.scrollWidth - element.clientWidth,
                    element.scrollLeft + 340,
                  ),
                  behavior: "smooth",
                });
              }}
              className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full ${PILL} disabled:cursor-not-allowed disabled:opacity-25`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
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
          className="grid grid-flow-col auto-cols-[minmax(280px,1fr)] gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
              <article
                key={related.id}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814] transition-transform duration-500 ease-in-out hover:scale-[1.02] hover:border-violet-400/35"
              >
                <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                <div className="relative h-40 overflow-hidden bg-[#14101D]">
                  <img
                    src={related.image}
                    alt={related.title}
                    loading="lazy"
                    className="block h-full w-full object-cover"
                  />

                  <div className="absolute left-3 top-3 z-20">
                    <PlanBadge plan={related.plan} />
                  </div>

                  <span className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-lg border border-slate-300/15 bg-[#090E1B]/90 px-2.5 py-1.5 text-[11px] font-medium text-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.25)] backdrop-blur-md">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {related.rating.toFixed(1)}
                    <span className="text-white/45">
                      ({related.reviewCount})
                    </span>
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] text-white/45">
                    <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-2.5 py-1 text-[10px] font-medium text-violet-200">
                      {related.category}
                    </span>
                    <span>{related.level}</span>
                  </div>

                  <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-semibold leading-6 tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-violet-100">
                    {related.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-[40px] text-xs leading-[1.65] text-white/50">
                    {related.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-2.5 border-t border-white/[0.07] pt-3.5 text-[11px] text-white/45">
                    <img
                      src={related.instructorImage}
                      alt=""
                      loading="lazy"
                      className="h-7 w-7 rounded-full border border-white/10 object-cover"
                    />

                    <span className="min-w-0 flex-1 truncate">
                      {related.instructor}
                    </span>

                    <span className="inline-flex shrink-0 items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5 text-cyan-300" />
                      {related.duration}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                      <BookOpen className="h-3.5 w-3.5 text-cyan-300" />
                      {related.lessonCount} lessons
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/student/courses/${related.id}`)}
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
    </div>
  );
};

export default CourseDetailsPage;
