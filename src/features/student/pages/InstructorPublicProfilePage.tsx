import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  ExternalLink,
  
  GraduationCap,
  
  MapPin,
  Star,
  Users,
  Globe,
  Sparkles,
} from "lucide-react";

type Instructor = {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
  location: string;
  education: string;
  students: string;
  rating: number;
  reviewCount: string;
  courseCount: number;
  skills: string[];
  courses: {
    id: number;
    title: string;
    category: string;
    level: string;
    duration: string;
    students: string;
    rating: number;
    image: string;
    plan: "Free" | "Premium";
  }[];
  github: string;
  linkedin: string;
  portfolio: string;
};

const instructors: Instructor[] = [
  {
    id: "sarah-mitchell",
    name: "Sarah Mitchell",
    role: "Senior Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&crop=faces",
    bio: "I'm a software engineer passionate about building modern web applications and helping developers develop practical, industry-ready skills. My teaching focuses on real-world projects, clean architecture, and the technologies used to build scalable applications.",
    experience: "8+ years",
    location: "Kerala, India",
    education: "B.Tech in Computer Science",
    students: "8.4k",
    rating: 4.9,
    reviewCount: "1.2k",
    courseCount: 1,
    skills: [
      "React",
      "TypeScript",
      "Python",
      "Django",
      "PostgreSQL",
      "REST APIs",
    ],
    courses: [
      {
        id: 1,
        title: "Full Stack Web Development",
        category: "Development",
        level: "Intermediate",
        duration: "32 hours",
        students: "8.4k",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
        plan: "Premium",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  {
    id: "alex-carter",
    name: "Alex Carter",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop&crop=faces",
    bio: "I work at the intersection of product strategy, interaction design, and accessible digital experiences. I help aspiring designers turn ideas into intuitive products through practical exercises and thoughtful design processes.",
    experience: "6+ years",
    location: "Bengaluru, India",
    education: "Degree in Design",
    students: "5.2k",
    rating: 4.8,
    reviewCount: "856",
    courseCount: 1,
    skills: [
      "Figma",
      "UI Design",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
    ],
    courses: [
      {
        id: 2,
        title: "UI/UX Design Masterclass",
        category: "Design",
        level: "Beginner",
        duration: "18 hours",
        students: "5.2k",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=500&fit=crop",
        plan: "Premium",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  {
    id: "james-wilson",
    name: "James Wilson",
    role: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop&crop=faces",
    bio: "I enjoy making programming approachable through clear explanations, practical exercises, and hands-on projects. My goal is to help learners build a strong foundation in programming and develop the confidence to create their own applications.",
    experience: "7+ years",
    location: "Chennai, India",
    education: "B.Sc. in Computer Science",
    students: "12.6k",
    rating: 4.8,
    reviewCount: "2.1k",
    courseCount: 1,
    skills: [
      "Python",
      "Object-Oriented Programming",
      "Data Structures",
      "Algorithms",
      "Problem Solving",
    ],
    courses: [
      {
        id: 3,
        title: "Python Programming",
        category: "Development",
        level: "Beginner",
        duration: "24 hours",
        students: "12.6k",
        rating: 4.8,
        image:
          "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop",
        plan: "Free",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop&crop=faces",
    bio: "I specialize in SQL, analytical reporting, and transforming complex datasets into meaningful insights. I enjoy teaching practical analytical techniques that learners can apply to real business problems.",
    experience: "5+ years",
    location: "Hyderabad, India",
    education: "M.Sc. in Data Analytics",
    students: "6.1k",
    rating: 4.9,
    reviewCount: "980",
    courseCount: 1,
    skills: [
      "SQL",
      "PostgreSQL",
      "Data Analysis",
      "Reporting",
      "Database Design",
    ],
    courses: [
      {
        id: 4,
        title: "Data Analytics with SQL",
        category: "Data Science",
        level: "Intermediate",
        duration: "21 hours",
        students: "6.1k",
        rating: 4.9,
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
        plan: "Premium",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  {
    id: "daniel-brooks",
    name: "Daniel Brooks",
    role: "Frontend Engineer",
    image:
      "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=500&h=500&fit=crop&crop=faces",
    bio: "I'm a frontend engineer focused on modern JavaScript, interactive web experiences, and maintainable application code. I enjoy breaking down complex programming concepts into clear, practical lessons.",
    experience: "6+ years",
    location: "Pune, India",
    education: "B.Tech in Information Technology",
    students: "7.3k",
    rating: 4.7,
    reviewCount: "743",
    courseCount: 1,
    skills: [
      "JavaScript",
      "ES Modules",
      "Async/Await",
      "DOM Manipulation",
      "Frontend Development",
    ],
    courses: [
      {
        id: 5,
        title: "Modern JavaScript Essentials",
        category: "Development",
        level: "Beginner",
        duration: "16 hours",
        students: "7.3k",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=500&fit=crop",
        plan: "Free",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
  {
    id: "olivia-bennett",
    name: "Olivia Bennett",
    role: "Product Strategist",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop&crop=faces",
    bio: "I help teams connect customer research, product decisions, and business objectives. My teaching combines practical market research with strategic thinking to help learners understand how successful digital products are developed.",
    experience: "7+ years",
    location: "Mumbai, India",
    education: "MBA in Business Strategy",
    students: "3.8k",
    rating: 4.7,
    reviewCount: "512",
    courseCount: 1,
    skills: [
      "Product Strategy",
      "Market Research",
      "Product Planning",
      "Roadmapping",
      "Business Analysis",
    ],
    courses: [
      {
        id: 6,
        title: "Product & Business Strategy",
        category: "Business",
        level: "Beginner",
        duration: "14 hours",
        students: "3.8k",
        rating: 4.7,
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
        plan: "Premium",
      },
    ],
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    portfolio: "https://example.com/",
  },
];

const CARD =
  "relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

const InstructorPublicProfilePage = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams<{ instructorId: string }>();

  const instructor = instructors.find((item) => item.id === instructorId);

  if (!instructor) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center text-white">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10">
          <GraduationCap className="h-8 w-8 text-violet-300" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold">Instructor not found</h1>

        <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
          This instructor profile may be unavailable or the profile link may be
          incorrect.
        </p>

        <button
          type="button"
          onClick={() => navigate("/student/courses")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <ArrowLeft className="h-4 w-4" />
          Explore courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-8 pb-10 text-white">
      {/* Back navigation */}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition duration-300 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div>
          <p className="text-xs text-white/40">Student / Instructors</p>
          <h1 className="mt-1 text-sm font-semibold text-white/90">
            Instructor Profile
          </h1>
        </div>
      </div>

      {/* Profile hero */}

      <section className="relative isolate overflow-hidden rounded-[28px] border border-violet-400/15 bg-[#0B0817]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.20),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.08),transparent_45%)]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:36px_36px]"
        />

        <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:p-12">
          {/* Instructor image */}

          <div className="relative mx-auto w-fit lg:mx-0">
            <div className="absolute -inset-2 rounded-[30px] bg-gradient-to-br from-violet-500/30 to-sky-500/10 blur-xl" />

            <div className="relative h-36 w-36 overflow-hidden rounded-[26px] border border-violet-300/30 bg-[#171026] sm:h-44 sm:w-44">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-300/25 bg-[#171026] text-violet-200 shadow-xl">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>

          {/* Instructor details */}

          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                Course Instructor
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/[0.08] px-3 py-1.5 text-[11px] font-medium text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Instructor
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[42px]">
              <span className="bg-gradient-to-r from-white via-violet-100 to-violet-300 bg-clip-text text-transparent">
                {instructor.name}
              </span>
            </h1>

            <p className="mt-3 text-sm font-medium text-white/65 sm:text-base">
              {instructor.role}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs text-white/50 lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-violet-300" />
                {instructor.experience} experience
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-300" />
                {instructor.location}
              </span>

              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-white">
                  {instructor.rating.toFixed(1)}
                </span>
                <span>({instructor.reviewCount} reviews)</span>
              </span>
            </div>

            {/* Social links */}

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a
                href={instructor.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/65 transition duration-300 hover:border-violet-400/35 hover:bg-violet-500/10 hover:text-white"
              >
               
              </a>

              <a
                href={instructor.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/65 transition duration-300 hover:border-violet-400/35 hover:bg-violet-500/10 hover:text-white"
              >
              
              </a>

              <a
                href={instructor.portfolio}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-white/75 transition duration-300 hover:border-violet-400/35 hover:bg-violet-500/10 hover:text-white"
              >
                <Globe className="h-4 w-4" />
                Portfolio
                <ExternalLink className="h-3 w-3 text-white/40" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          {
            label: "Total learners",
            value: instructor.students,
            icon: Users,
            color: "text-violet-300",
            bg: "bg-violet-500/10",
          },
          {
            label: "Courses",
            value: String(instructor.courseCount),
            icon: BookOpen,
            color: "text-sky-300",
            bg: "bg-sky-500/10",
          },
          {
            label: "Experience",
            value: instructor.experience,
            icon: BriefcaseBusiness,
            color: "text-emerald-300",
            bg: "bg-emerald-500/10",
          },
          {
            label: "Instructor rating",
            value: `${instructor.rating.toFixed(1)} / 5`,
            icon: Star,
            color: "text-amber-300",
            bg: "bg-amber-500/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className={`${CARD} p-4 transition duration-300 hover:border-violet-400/30 sm:p-5`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <p className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {stat.value}
              </p>

              <p className="mt-1 text-[11px] text-white/45 sm:text-xs">
                {stat.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* Main content */}

      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-8">
          {/* About */}

          <section className={`${CARD} p-6 sm:p-7`}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  About the instructor
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Background, experience and teaching approach
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-white/60">
              {instructor.bio}
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />

              <div>
                <p className="text-xs font-semibold text-white/80">Education</p>
                <p className="mt-1 text-sm text-white/50">
                  {instructor.education}
                </p>
              </div>
            </div>
          </section>

          {/* Expertise */}

          <section className={`${CARD} p-6 sm:p-7`}>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-500/10 text-sky-300">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Areas of expertise
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Skills and technologies
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {instructor.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-violet-400/15 bg-violet-500/[0.07] px-3.5 py-2 text-xs font-medium text-violet-100/80 transition duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.13]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Courses */}

          <section id="instructor-courses" className="scroll-mt-24">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  Courses by {instructor.name.split(" ")[0]}
                </h2>
                <p className="mt-1 text-sm text-white/45">
                  Learn directly from this instructor
                </p>
              </div>

              <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-white/50">
                {instructor.courses.length}{" "}
                {instructor.courses.length === 1 ? "course" : "courses"}
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {instructor.courses.map((course) => (
                <article
                  key={course.id}
                  className={`${CARD} group transition duration-300 hover:-translate-y-1 hover:border-violet-400/30`}
                >
                  <div className="relative h-48 overflow-hidden bg-[#100B1E]">
                    <img
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0814] via-transparent to-black/10" />

                    <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-[#0B0814]/80 px-3 py-1.5 text-[10px] font-semibold text-violet-100 backdrop-blur-md">
                      {course.category}
                    </span>

                    <span
                      className={`absolute right-4 top-4 rounded-lg border px-3 py-1.5 text-[10px] font-semibold backdrop-blur-md ${
                        course.plan === "Premium"
                          ? "border-amber-300/25 bg-[#2B210D]/90 text-amber-200"
                          : "border-emerald-400/25 bg-[#06251D]/90 text-emerald-300"
                      }`}
                    >
                      {course.plan}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-semibold leading-6 text-white transition-colors group-hover:text-violet-200">
                      {course.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-white/80">
                          {course.rating.toFixed(1)}
                        </span>
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {course.students} learners
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                      <span className="text-xs text-white/45">
                        {course.level}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/student/courses/${course.id}`)
                        }
                        className="inline-flex items-center gap-2 text-xs font-semibold text-violet-300 transition hover:text-violet-200"
                      >
                        View course
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}

        <aside className="space-y-5 xl:sticky xl:top-6">
          <section className={`${CARD} p-6`}>
            <h2 className="text-base font-semibold text-white">
              Instructor information
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                <div>
                  <p className="text-xs text-white/40">
                    Professional experience
                  </p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    {instructor.experience}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                <div>
                  <p className="text-xs text-white/40">Location</p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    {instructor.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                <div>
                  <p className="text-xs text-white/40">Education</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-white/80">
                    {instructor.education}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />

                <div>
                  <p className="text-xs text-white/40">Courses published</p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    {instructor.courseCount}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-[#241443] via-[#160E2B] to-[#0B0814] p-6">
            <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
                <BookOpen className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-base font-semibold text-white">
                Learn from experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Explore the courses taught by {instructor.name} and build
                practical skills at your own pace.
              </p>

              <button
                type="button"
                onClick={() =>
                  document
                    .getElementById("instructor-courses")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                }
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:brightness-110"
              >
                Explore courses
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default InstructorPublicProfilePage;
