import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  FileText,
  GraduationCap,
  Globe,
  Layers,
  Link as LinkIcon,
  Mail,
  MapPin,
  User,
  X,
  type LucideIcon,
  ChevronRight,
} from "lucide-react";

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const SERIF_FONT = '"Fraunces", ui-serif, Georgia, "Times New Roman", serif';

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

type BrandIcon = React.ComponentType<{ className?: string }>;

type PublicInstructor = {
  id: number;
  full_name: string;
  profile_image: string | null;
  professional_bio: string;
  location: string;
  education: string;
  occupation: string;
  years_of_experience: string;
  email: string;
  became_instructor_at: string | null;
  updated_at: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  categories: string[];
};

const instructors: PublicInstructor[] = [
  {
    id: 101,
    full_name: "Sarah Mitchell",
    profile_image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&crop=faces",
    professional_bio:
      "I'm a software engineer specializing in modern web applications, scalable backend systems, and helping developers build practical, industry-ready skills. Over the past eight years, I've shipped production systems and mentored developers in turning complex ideas into reliable software.",
    location: "San Francisco, CA",
    education: "B.Sc. Computer Science",
    occupation: "Senior Full Stack Developer",
    years_of_experience: "8+ years",
    email: "sarah.mitchell@example.com",
    became_instructor_at: "2018-03-15T00:00:00Z",
    updated_at: "2026-10-20T00:00:00Z",
    github_url: "https://github.com/example-instructor",
    linkedin_url: "https://www.linkedin.com/in/example-instructor/",
    portfolio_url: "https://example.com",
    categories: [
      "React",
      "TypeScript",
      "Django",
      "PostgreSQL",
      "System Design",
    ],
  },
];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "?";

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatMonthYear = (iso: string | null): string => {
  if (!iso) return "—";

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.12 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-4.125 0 2.062 2.062 0 0 1 4.125 0zM3.555 9h3.564v11.452H3.555zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C23.2.774 22.408 0 21.433 0h-20.4z" />
  </svg>
);

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) => (
  <div className="flex items-start gap-4">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300 ring-1 ring-inset ring-violet-400/20">
      <Icon className="h-5 w-5" strokeWidth={1.8} />
    </div>

    <div>
      <h2
        className="text-base font-semibold text-white"
        style={{ fontFamily: DISPLAY_FONT }}
      >
        {title}
      </h2>

      <p className="mt-1 text-sm text-white/40">{description}</p>
    </div>
  </div>
);

interface DetailFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const DetailField = ({ icon: Icon, label, value }: DetailFieldProps) => (
  <div>
    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
      {label}
    </p>

    <div className="flex min-h-[52px] items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-violet-400/20 hover:bg-violet-500/[0.03]">
      <Icon
        className="mt-0.5 h-4 w-4 shrink-0 text-violet-300/70"
        strokeWidth={1.8}
      />

      <span className="min-w-0 whitespace-normal break-words text-sm text-white/75">
        {value || "Not provided"}
      </span>
    </div>
  </div>
);

interface AvatarProps {
  src: string | null;
  initials: string;
  onClick: () => void;
}

const ProfileAvatar = ({ src, initials, onClick }: AvatarProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-label="View profile picture"
    className="group/avatar relative shrink-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0812]"
  >
    <div className="rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-400 p-[2.5px] shadow-[0_0_55px_-4px_rgba(139,92,246,0.55)] transition-transform duration-300 group-hover/avatar:scale-[1.03]">
      <div className="rounded-full bg-[#0A0812] p-[3px]">
        <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
          <div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-800 text-3xl font-semibold tracking-wide text-white"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            {initials}
          </div>

          {src && (
            <img
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          )}

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/avatar:bg-black/45 group-hover/avatar:opacity-100">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/90">
              View
            </span>
          </div>
        </div>
      </div>
    </div>
  </button>
);

interface ImagePreviewModalProps {
  src: string | null;
  initials: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImagePreviewModal = ({
  src,
  initials,
  name,
  isOpen,
  onClose,
}: ImagePreviewModalProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imgFailed = !!src && failedSrc === src;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile picture preview"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <style>{`
        @keyframes publicPreviewFade {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        @keyframes publicPreviewPop {
          from {
            opacity: 0;
            transform: scale(.9) translateY(14px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        style={{ animation: "publicPreviewFade .25s ease-out" }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(139,92,246,0.18), transparent 55%)",
        }}
      />

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col items-center"
        style={{
          animation: "publicPreviewPop .42s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute -top-3 right-0 z-30 flex h-10 w-10 -translate-y-full cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 backdrop-blur transition-all duration-300 hover:rotate-90 hover:border-violet-400/45 hover:bg-violet-500/20 hover:text-white"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="relative w-full overflow-hidden rounded-[30px] bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-transparent p-px shadow-[0_40px_120px_-25px_rgba(0,0,0,0.95)]">
          <div className="relative overflow-hidden rounded-[29px] bg-gradient-to-b from-[#17102D] to-[#0A0812]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/25 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-fuchsia-500/[0.08] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_URL}")` }}
            />

            <div className="relative p-5 sm:p-6">
              <div className="relative rounded-[22px] bg-gradient-to-br from-violet-400/60 via-purple-500/30 to-fuchsia-400/50 p-[2px] shadow-[0_18px_50px_-15px_rgba(139,92,246,0.5)]">
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#0A0812]">
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-800 text-7xl font-semibold tracking-wide text-white sm:text-8xl"
                    style={{ fontFamily: DISPLAY_FONT }}
                  >
                    {initials}
                  </div>

                  {src && !imgFailed && (
                    <img
                      src={src}
                      alt={`${name}'s profile picture`}
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={() => setFailedSrc(src)}
                    />
                  )}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

interface SocialRowProps {
  icon: BrandIcon;
  label: string;
  url: string;
}

const SocialRow = ({ icon: Icon, label, url }: SocialRowProps) => {
  const display = url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  return (
    <a
      href={url || undefined}
      target={url ? "_blank" : undefined}
      rel={url ? "noreferrer noopener" : undefined}
      aria-label={
        url ? `Open ${label} profile in a new tab` : `${label} not linked`
      }
      className={`group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 ${
        url
          ? "hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-violet-500/[0.05]"
          : "pointer-events-none opacity-60"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-violet-400/20 group-hover:bg-violet-500/10 group-hover:text-violet-200">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
          {label}
        </p>

        <p className="mt-1 truncate text-sm text-white/60 transition-colors group-hover:text-white/80">
          {display || "Not linked"}
        </p>
      </div>

      {url && (
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-200"
          strokeWidth={2}
        />
      )}
    </a>
  );
};

const InstructorPublicProfilePage = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams<{ instructorId: string }>();

  const instructor =
    instructors.find((item) => item.id === Number(instructorId)) ??
    instructors[0];

  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const initials = getInitials(instructor.full_name);
  const imageSrc = instructor.profile_image;
  const categories = instructor.categories ?? [];

  return (
    <>
      <div className="min-h-full w-full bg-black pb-8 text-white">
        <div className="space-y-6">
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
              className="flex min-w-0 items-center gap-2 font-['Manrope'] text-[11px] italic tracking-[-0.01em] sm:text-xs"
            >
              <span className="hidden shrink-0 font-semibold tracking-[0.01em] text-white/45 transition-colors duration-200 hover:text-white/75 sm:inline">
                Courses
              </span>

              <ChevronRight
                aria-hidden="true"
                className="hidden h-3.5 w-3.5 shrink-0 text-violet-300/50 sm:block"
              />

              <span className="hidden max-w-[120px] shrink-0 truncate font-medium tracking-[-0.01em] text-white/45 sm:inline">
                Development
              </span>

              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-violet-300/50"
              />

              <span className="min-w-0 truncate bg-gradient-to-r from-violet-100 via-purple-200 to-indigo-200 bg-clip-text font-bold tracking-[-0.025em] text-transparent">
                Instructor Profile
              </span>
            </nav>
          </div>

          <div className="cursor-default">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
              <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
                Instructor Profile
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
              Explore teaching expertise, professional experience, and areas of
              specialization.
            </p>
          </div>

          {/* HERO + ABOUT */}
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(300px,0.95fr)_minmax(0,1.8fr)] xl:grid-cols-[minmax(380px,0.95fr)_minmax(0,1.8fr)]">
            {/* PROFILE CARD */}
            <section className="min-w-0">
              <div className="h-full rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
                <div className="relative h-full overflow-hidden rounded-[25px] bg-[#0A0812]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-violet-500/[0.08] blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-fuchsia-500/[0.05] blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                    style={{ backgroundImage: `url("${GRAIN_URL}")` }}
                  />

                  <div className="relative flex h-full flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/25 blur-2xl"
                      />

                      <ProfileAvatar
                        src={imageSrc}
                        initials={initials}
                        onClick={() => setIsImagePreviewOpen(true)}
                      />
                    </div>

                    <div className="mt-7 w-full min-w-0">
                      <h2
                        className="mx-auto w-full max-w-[360px] break-words text-2xl font-semibold tracking-tight text-white sm:text-[30px]"
                        style={{ fontFamily: DISPLAY_FONT }}
                        title={instructor.full_name}
                      >
                        {instructor.full_name}
                      </h2>
                    </div>

                    <div className="mt-4 inline-flex max-w-full items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/55 transition-colors duration-300 hover:border-violet-400/25 hover:text-white/75">
                      <CalendarDays
                        className="h-4 w-4 shrink-0 text-violet-300"
                        strokeWidth={1.8}
                      />

                      <span>
                        Instructor since{" "}
                        {formatMonthYear(instructor.became_instructor_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PROFESSIONAL BIO */}
            <section className="flex min-w-0 flex-col rounded-3xl border border-violet-400/[0.12] bg-[#0A0812] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={FileText}
                title="Professional Bio"
                description="A short introduction."
              />

              <div className="relative mt-6 flex min-w-0 flex-1 flex-col justify-center pl-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 left-0 select-none text-6xl leading-none text-violet-400/25"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  &ldquo;
                </span>

                <blockquote
                  className="w-full min-w-0 whitespace-pre-line break-words text-lg italic leading-relaxed text-white/70 sm:text-xl"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  {instructor.professional_bio || "No bio added yet."}
                </blockquote>
              </div>
            </section>
          </div>

          {/* PERSONAL INFORMATION + SOCIAL LINKS */}
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <section className="flex min-w-0 flex-col rounded-3xl border border-violet-400/[0.12] bg-[#0A0812] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={User}
                title="Personal Information"
                description="Professional and account details."
              />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <DetailField
                  icon={User}
                  label="Full Name"
                  value={instructor.full_name}
                />

                <DetailField
                  icon={MapPin}
                  label="Location"
                  value={instructor.location}
                />

                <DetailField
                  icon={GraduationCap}
                  label="Education"
                  value={instructor.education}
                />

                <DetailField
                  icon={Briefcase}
                  label="Occupation"
                  value={instructor.occupation}
                />

                <DetailField
                  icon={Award}
                  label="Years of Experience"
                  value={instructor.years_of_experience}
                />

                <DetailField
                  icon={Mail}
                  label="Email Address"
                  value={instructor.email}
                />
              </div>
            </section>

            <section className="flex min-w-0 flex-col rounded-3xl border border-violet-400/[0.12] bg-[#0A0812] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={LinkIcon}
                title="Social Links"
                description="Connected public profiles."
              />

              <div className="mt-7 space-y-3">
                <SocialRow
                  icon={GithubIcon}
                  label="GitHub"
                  url={instructor.github_url}
                />

                <SocialRow
                  icon={LinkedinIcon}
                  label="LinkedIn"
                  url={instructor.linkedin_url}
                />

                <SocialRow
                  icon={Globe}
                  label="Portfolio"
                  url={instructor.portfolio_url}
                />
              </div>

              <div className="flex flex-1 items-end">
                <div className="mt-6 flex w-full items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35">
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-violet-300/70"
                    strokeWidth={1.8}
                  />
                  Links open in a new tab
                </div>
              </div>
            </section>
          </div>

          {/* TEACHING CATEGORIES */}
          <section className="flex flex-col rounded-3xl border border-violet-400/[0.12] bg-[#0A0812] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
            <SectionHeader
              icon={Layers}
              title="Teaching Categories"
              description="Areas this instructor teaches."
            />

            <div className="mt-7 flex flex-wrap gap-3">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-violet-500/15 hover:text-white"
                  >
                    {category}
                  </span>
                ))
              ) : (
                <span className="text-sm text-white/40">
                  No categories added yet.
                </span>
              )}
            </div>
          </section>
        </div>
      </div>

      <ImagePreviewModal
        src={imageSrc}
        initials={initials}
        name={instructor.full_name}
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
      />
    </>
  );
};

export default InstructorPublicProfilePage;
