import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  GraduationCap,
  Linkedin,
  MapPin,
  MessageCircle,
  PlayCircle,
  Star,
  Users,
  UsersRound,
} from "lucide-react";

type InstructorCourse = {
  id: number;
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
  level: string;
  plan: "Free" | "Premium";
  language: string;
  skills: string[];
};

type InstructorProfile = {
  slug: string;
  name: string;
  role: string;
  image: string;
  coverImage: string;
  bio: string;
  experience: string;
  location: string;
  joined: string;
  students: string;
  rating: number;
  reviews: string;
  coursesTaught: number;
  skills: string[];
  teachingApproach: string[];
  achievements: string[];
  languages: string[];
  website?: string;
  linkedin?: string;
};

const courses: InstructorCourse[] = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description:
      "Build modern web applications with Python, Django, React, and PostgreSQL.",
    category: "Development",
    instructor: "Sarah Mitchell",
    instructorRole: "Senior Full Stack Developer",
    instructorImage:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&h=520&fit=crop",
    rating: 4.9,
    reviews: "1.2k",
    lessons: 48,
    duration: "32 hours",
    level: "Intermediate",
    plan: "Premium",
    language: "English",
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
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&h=520&fit=crop",
    rating: 4.8,
    reviews: "856",
    lessons: 32,
    duration: "18 hours",
    level: "Beginner",
    plan: "Premium",
    language: "English",
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
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900&h=520&fit=crop",
    rating: 4.8,
    reviews: "2.1k",
    lessons: 40,
    duration: "24 hours",
    level: "Beginner",
    plan: "Free",
    language: "English",
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
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=520&fit=crop",
    rating: 4.9,
    reviews: "980",
    lessons: 36,
    duration: "21 hours",
    level: "Intermediate",
    plan: "Premium",
    language: "English",
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
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=520&fit=crop",
    rating: 4.7,
    reviews: "743",
    lessons: 28,
    duration: "16 hours",
    level: "Beginner",
    plan: "Free",
    language: "English",
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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=520&fit=crop",
    rating: 4.7,
    reviews: "512",
    lessons: 24,
    duration: "14 hours",
    level: "Beginner",
    plan: "Premium",
    language: "English",
    skills: ["Strategy", "Research", "Planning"],
  },
];

const instructors: InstructorProfile[] = [
  {
    slug: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Senior Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1800&h=700&fit=crop",
    bio: "Sarah is a software engineer who specializes in modern web applications, scalable backend systems, and helping developers build practical industry-ready skills. Her teaching focuses on connecting core concepts to the kind of projects developers build on the job.",
    experience: "8+ years experience",
    location: "Available online",
    joined: "January 2024",
    students: "8.4k",
    rating: 4.9,
    reviews: "1.2k",
    coursesTaught: 1,
    skills: [
      "React",
      "TypeScript",
      "Python",
      "Django",
      "PostgreSQL",
      "REST APIs",
    ],
    teachingApproach: [
      "Project-based lessons that turn concepts into working applications.",
      "Clear explanations of frontend, backend, and database decisions.",
      "Practical guidance on code quality and real-world development workflows.",
    ],
    achievements: [
      "Full stack application development",
      "REST API architecture",
      "Database design and integration",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    slug: "alex-carter",
    name: "Alex Carter",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1800&h=700&fit=crop",
    bio: "Alex helps learners turn design ideas into clear, intuitive digital experiences. The focus is on understanding user needs, building consistent design systems, and communicating design decisions with confidence.",
    experience: "7+ years experience",
    location: "Available online",
    joined: "March 2024",
    students: "5.6k",
    rating: 4.8,
    reviews: "856",
    coursesTaught: 1,
    skills: ["UI/UX", "Figma", "Wireframing", "Prototyping", "Design Systems"],
    teachingApproach: [
      "Learn design by solving realistic user problems.",
      "Build from low-fidelity wireframes to interactive prototypes.",
      "Use reusable design systems to create consistent interfaces.",
    ],
    achievements: [
      "Product design",
      "Design systems",
      "Interactive prototyping",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    slug: "james-wilson",
    name: "James Wilson",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=1800&h=700&fit=crop",
    bio: "James teaches programming fundamentals with an emphasis on writing understandable code and solving problems step by step. His lessons help beginners build a strong foundation before moving on to larger projects.",
    experience: "6+ years experience",
    location: "Available online",
    joined: "February 2024",
    students: "12.3k",
    rating: 4.8,
    reviews: "2.1k",
    coursesTaught: 1,
    skills: [
      "Python",
      "Object-Oriented Programming",
      "Problem Solving",
      "Automation",
    ],
    teachingApproach: [
      "Break complex programming concepts into manageable steps.",
      "Practice each concept with small coding exercises.",
      "Apply fundamentals through useful, hands-on projects.",
    ],
    achievements: [
      "Python fundamentals",
      "Problem solving",
      "Practical automation",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    slug: "priya-sharma",
    name: "Priya Sharma",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&h=700&fit=crop",
    bio: "Priya helps learners make sense of data through structured analysis and practical SQL. Her approach connects query-writing skills to the questions analysts need to answer with real datasets.",
    experience: "6+ years experience",
    location: "Available online",
    joined: "April 2024",
    students: "4.9k",
    rating: 4.9,
    reviews: "980",
    coursesTaught: 1,
    skills: [
      "SQL",
      "Data Analysis",
      "Reporting",
      "Data Cleaning",
      "Dashboards",
    ],
    teachingApproach: [
      "Use realistic datasets to practise analytical thinking.",
      "Write SQL queries that answer specific business questions.",
      "Turn query results into clear, useful insights.",
    ],
    achievements: [
      "SQL querying",
      "Data interpretation",
      "Analytical reporting",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    slug: "daniel-brooks",
    name: "Daniel Brooks",
    role: "Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1800&h=700&fit=crop",
    bio: "Daniel focuses on modern JavaScript and the fundamentals behind responsive, interactive web experiences. His lessons emphasize readable code, modern language features, and practical patterns developers can reuse.",
    experience: "5+ years experience",
    location: "Available online",
    joined: "June 2024",
    students: "3.7k",
    rating: 4.7,
    reviews: "743",
    coursesTaught: 1,
    skills: ["JavaScript", "ES2026", "Async JavaScript", "DOM", "Web APIs"],
    teachingApproach: [
      "Understand the language before relying on frameworks.",
      "Practise asynchronous patterns with realistic examples.",
      "Improve code readability through small refactoring exercises.",
    ],
    achievements: [
      "Modern JavaScript",
      "Frontend fundamentals",
      "Async programming",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
  {
    slug: "olivia-bennett",
    name: "Olivia Bennett",
    role: "Product Strategist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=600&fit=crop&crop=faces",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&h=700&fit=crop",
    bio: "Olivia helps learners understand how products are researched, planned, and improved. Her lessons connect customer needs, market context, and prioritisation into a practical product strategy workflow.",
    experience: "8+ years experience",
    location: "Available online",
    joined: "May 2024",
    students: "2.8k",
    rating: 4.7,
    reviews: "512",
    coursesTaught: 1,
    skills: [
      "Product Strategy",
      "Market Research",
      "Roadmaps",
      "Prioritisation",
    ],
    teachingApproach: [
      "Start with customer problems and evidence.",
      "Translate research into focused product decisions.",
      "Practise prioritisation and roadmap planning with examples.",
    ],
    achievements: [
      "Product discovery",
      "Market research",
      "Strategic planning",
    ],
    languages: ["English"],
    linkedin: "https://www.linkedin.com/",
  },
];

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const Stat = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Users;
  label: string;
  value: string;
}) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-violet-300">
      <Icon className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <p className="text-lg font-semibold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/45">{label}</p>
    </div>
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="mb-5">
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300">
      {eyebrow}
    </p>
    <h2 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
      {title}
    </h2>
    {description && (
      <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
        {description}
      </p>
    )}
  </div>
);

const InstructorPublicProfilePage = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams<{ instructorId: string }>();

  const instructor = useMemo(() => {
    const normalizedId = (instructorId ?? "").toLowerCase();
    return instructors.find(
      (item) =>
        item.slug === normalizedId || slugify(item.name) === normalizedId,
    );
  }, [instructorId]);

  const instructorCourses = useMemo(
    () =>
      instructor
        ? courses.filter(
            (course) => slugify(course.instructor) === instructor.slug,
          )
        : [],
    [instructor],
  );

  if (!instructor) {
    return (
      <main className="min-h-screen bg-[#08070D] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#100D18] p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold">Instructor not found</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">
            This instructor profile may have moved, or the profile link may be
            incorrect.
          </p>
          <button
            type="button"
            onClick={() => navigate("/student/courses")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Explore courses <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </main>
    );
  }

  const totalLessons = instructorCourses.reduce(
    (total, course) => total + course.lessons,
    0,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#08070D] text-white">
      <div
        className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-48 left-[15%] h-[28rem] w-[28rem] rounded-full bg-violet-700/[0.09] blur-[120px]" />
        <div className="absolute right-[-10rem] top-[35rem] h-[25rem] w-[25rem] rounded-full bg-indigo-600/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-3.5 py-2.5 text-sm text-white/65 transition hover:border-violet-400/30 hover:bg-violet-500/[0.07] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Profile hero */}
        <section className="relative isolate overflow-hidden rounded-[2rem] border border-violet-400/20 bg-[#100C1B]">
          <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#21133D] via-[#100C1B] to-[#101020]" />
          <div
            className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.12]"
            style={{ backgroundImage: `url("${instructor.coverImage}")` }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#100C1B] via-[#100C1B]/95 to-[#100C1B]/60" />
          <div className="absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-10">
            <div className="flex min-w-0 flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-violet-400/60 to-indigo-500/20 blur-sm" />
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="relative h-32 w-32 rounded-full border-2 border-white/15 object-cover shadow-2xl sm:h-36 sm:w-36"
                />
                <span className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#171126] bg-violet-500 text-white">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              </div>

              <div className="min-w-0 text-center sm:text-left">
                <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <span className="rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200">
                    Instructor profile
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1 text-[10px] font-medium text-emerald-200">
                    <CheckCircle2 className="h-3 w-3" /> Verified educator
                  </span>
                </div>

                <h1 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                  {instructor.name}
                </h1>
                <p className="mt-2 text-base font-medium text-violet-200/90 sm:text-lg">
                  {instructor.role}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/50 sm:justify-start">
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseBusiness className="h-3.5 w-3.5 text-violet-300" />
                    {instructor.experience}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-violet-300" />
                    {instructor.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-violet-300" />
                    Teaching since {instructor.joined}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              {instructor.linkedin && (
                <a
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${instructor.name} on LinkedIn`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition hover:border-violet-300/30 hover:bg-violet-500/10 hover:text-violet-200"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              <button
                type="button"
                onClick={() => navigate("/student/courses")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Explore courses <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            icon={UsersRound}
            label="Learners reached"
            value={instructor.students}
          />
          <Stat
            icon={Star}
            label="Average course rating"
            value={instructor.rating.toFixed(1)}
          />
          <Stat
            icon={BookOpen}
            label="Courses published"
            value={String(instructorCourses.length || instructor.coursesTaught)}
          />
          <Stat
            icon={PlayCircle}
            label="Lessons across courses"
            value={String(totalLessons || "—")}
          />
        </section>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-12">
            {/* About */}
            <section>
              <SectionHeading
                eyebrow="Get to know your instructor"
                title="About the instructor"
                description="Learn about their experience, expertise, and approach to teaching."
              />
              <div className="rounded-3xl border border-white/[0.08] bg-[#0E0C14]/90 p-6 sm:p-7">
                <p className="text-sm leading-7 text-white/65">
                  {instructor.bio}
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {instructor.achievements.map((achievement) => (
                    <div
                      key={achievement}
                      className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                      <span className="text-sm text-white/65">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Expertise */}
            <section>
              <SectionHeading
                eyebrow="Areas of expertise"
                title="Skills & expertise"
                description="Topics you can learn from this instructor."
              />
              <div className="flex flex-wrap gap-2.5">
                {instructor.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-violet-300/15 bg-violet-400/[0.06] px-3.5 py-2.5 text-sm text-violet-100/85 transition hover:border-violet-300/30 hover:bg-violet-400/[0.1]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Teaching approach */}
            <section>
              <SectionHeading
                eyebrow="Learning experience"
                title="Teaching approach"
                description="What to expect when learning with this instructor."
              />
              <div className="grid gap-3 md:grid-cols-3">
                {instructor.teachingApproach.map((item, index) => (
                  <article
                    key={item}
                    className="rounded-2xl border border-white/[0.08] bg-[#0E0C14]/90 p-5"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/15 bg-violet-500/10 text-sm font-semibold text-violet-200">
                      0{index + 1}
                    </span>
                    <p className="mt-4 text-sm leading-6 text-white/60">
                      {item}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Courses */}
            <section id="instructor-courses" className="scroll-mt-24">
              <SectionHeading
                eyebrow="Learn from this instructor"
                title="Courses by this instructor"
                description="Explore the courses available on Launch Point."
              />
              {instructorCourses.length > 0 ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {instructorCourses.map((course) => (
                    <article
                      key={course.id}
                      className="group overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0E0C14] transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#12101B]"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/student/courses/${course.id}`)
                        }
                        className="block w-full cursor-pointer text-left"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={course.image}
                            alt={course.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C14] via-transparent to-black/10" />
                          <span
                            className={`absolute left-3 top-3 rounded-lg border px-2.5 py-1 text-[10px] font-semibold ${course.plan === "Premium" ? "border-amber-300/20 bg-amber-400/10 text-amber-200" : "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"}`}
                          >
                            {course.plan}
                          </span>
                          <span className="absolute bottom-3 right-3 rounded-lg border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] text-white/80 backdrop-blur-md">
                            {course.level}
                          </span>
                        </div>

                        <div className="p-5">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-300/80">
                            {course.category}
                          </p>
                          <h3 className="mt-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-violet-100">
                            {course.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/45">
                            {course.description}
                          </p>

                          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
                            <span className="inline-flex items-center gap-1.5">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span className="font-semibold text-white/80">
                                {course.rating.toFixed(1)}
                              </span>
                              <span>({course.reviews})</span>
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <PlayCircle className="h-3.5 w-3.5 text-violet-300" />
                              {course.lessons} lessons
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Clock3 className="h-3.5 w-3.5 text-violet-300" />
                              {course.duration}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {course.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill}
                                className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-white/50"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                            <span className="text-xs text-white/40">
                              {course.language}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-200 transition group-hover:gap-2.5">
                              View course <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#0E0C14] p-7 text-center">
                  <BookOpen className="mx-auto h-7 w-7 text-violet-300/70" />
                  <h3 className="mt-3 text-base font-semibold">
                    Courses coming soon
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    This instructor has not published a course yet. Check back
                    later for new learning opportunities.
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#171025] to-[#0E0C14] p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <MessageCircle className="h-4 w-4 text-violet-300" />
                Instructor at a glance
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">Experience</span>
                  <span className="text-right font-medium text-white/80">
                    {instructor.experience}
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">Learner rating</span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-white/80">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {instructor.rating.toFixed(1)} / 5
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">Student reviews</span>
                  <span className="font-medium text-white/80">
                    {instructor.reviews}
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">Courses</span>
                  <span className="font-medium text-white/80">
                    {instructorCourses.length || instructor.coursesTaught}
                  </span>
                </div>
                <div className="h-px bg-white/[0.07]" />
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-white/45">Languages</span>
                  <span className="text-right font-medium text-white/80">
                    {instructor.languages.join(", ")}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  const section = document.getElementById("instructor-courses");
                  section?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Browse courses <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#0E0C14]/90 p-5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Globe2 className="h-4 w-4 text-violet-300" />
                Learning on Launch Point
              </div>
              <p className="mt-3 text-sm leading-6 text-white/45">
                Explore structured courses, practise new skills, and learn at
                your own pace.
              </p>
              <button
                type="button"
                onClick={() => navigate("/student/courses")}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 transition hover:text-white"
              >
                Explore all courses <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>

        <footer className="mt-14 border-t border-white/[0.07] pt-6 text-center text-xs text-white/30">
          Learn Today, Lead Tomorrow
        </footer>
      </div>
    </main>
  );
};

export default InstructorPublicProfilePage;
