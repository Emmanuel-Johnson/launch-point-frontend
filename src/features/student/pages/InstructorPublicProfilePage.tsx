import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Globe,
  
  Star,
  
  Users,
} from "lucide-react";

type Instructor = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
  students: string;
  courses: number;
  rating: number;
  expertise: string[];
  socials: { label: string; icon: typeof Globe; href: string }[];
};

// UI-only mock data — replace with an API lookup by instructorId.
const instructors: Instructor[] = [
  {
    id: 101,
    name: "Sarah Mitchell",
    role: "Senior Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&h=240&fit=crop&crop=faces",
    bio: "Sarah is a software engineer who specializes in modern web applications, scalable backend systems, and helping developers build practical industry-ready skills. Over the past eight years she has shipped production systems and mentored hundreds of engineers.",
    experience: "8+ years experience",
    students: "8.4k",
    courses: 4,
    rating: 4.9,
    expertise: ["React", "TypeScript", "Django", "PostgreSQL", "System Design"],
    socials: [
      { label: "Website", icon: Globe, href: "#" },
      // { label: "LinkedIn", icon: Linkedin, href: "#" },
      // { label: "Twitter", icon: Twitter, href: "#" },
    ],
  },
];

const CARD_BASE =
  "relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

const InstructorPublicProfilePage = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams<{ instructorId: string }>();

  const instructor =
    instructors.find((item) => item.id === Number(instructorId)) ??
    instructors[0];

  const stats = [
    { icon: Users, value: instructor.students, label: "Learners" },
    { icon: BookOpen, value: instructor.courses, label: "Courses" },
    { icon: Star, value: instructor.rating.toFixed(1), label: "Avg. rating" },
  ];

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      {/* Hero */}
      <section className={`${CARD_BASE} p-6 sm:p-8`}>
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500/40 to-indigo-500/15 blur-sm" />
            <img
              src={instructor.image}
              alt={instructor.name}
              className="relative h-28 w-28 rounded-full border border-white/15 object-cover shadow-lg"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">
              {instructor.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-violet-300/80">
              {instructor.role}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-violet-300" />
                {instructor.experience}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              {instructor.socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-violet-400/30 hover:text-violet-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stat tiles */}
        <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4 text-center"
            >
              <Icon className="h-5 w-5 text-violet-300" />
              <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              <p className="text-[11px] text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className={`${CARD_BASE} p-6 sm:p-7`}>
        <h2 className="text-xl font-semibold tracking-[-0.015em]">About</h2>
        <p className="mt-4 text-[15px] leading-7 text-white/60">
          {instructor.bio}
        </p>
      </section>

      {/* Expertise */}
      <section className={`${CARD_BASE} p-6 sm:p-7`}>
        <h2 className="text-xl font-semibold tracking-[-0.015em]">Expertise</h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {instructor.expertise.map((skill) => (
            <span
              key={skill}
              className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/75"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InstructorPublicProfilePage;
