import {
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  Clock3,
  Edit3,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Link as LinkIcon,
  Mail,
  MapPin,
  User,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  getInstructorProfile,
  type InstructorProfile,
} from "../api/instructorProfileApi";
import EditInstructorProfileModal from "../components/EditInstructorProfileModal";
import { toast } from "react-toastify";

const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';

const SERIF_FONT = '"Fraunces", ui-serif, Georgia, "Times New Roman", serif';

const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
/* ------------------------------------------------------------------ helpers */

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/*
 * FIX:
 * became_instructor_at can be null, so this function
 * accepts string | null.
 */
const formatMonthYear = (iso: string | null): string => {
  if (!iso) {
    return "—";
  }

  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const formatFullDate = (iso: string): string => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* --------------------------------------------------------------- brand marks */

type BrandIcon = React.ComponentType<{
  className?: string;
}>;

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

/* ------------------------------------------------------------------- avatar */

interface AvatarProps {
  src: string | null;
  initials: string;
  onClick?: () => void;
}

const ProfileAvatar = ({ src, initials, onClick }: AvatarProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="View profile picture"
      className="group/avatar relative shrink-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6FA3FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]"
    >
      <div className="rounded-full bg-gradient-to-br from-[#4D8DFF] via-[#3B82F6] to-[#38BDF8] p-[2.5px] shadow-[0_0_55px_-4px_rgba(77,141,255,0.55)] transition-transform duration-300 group-hover/avatar:scale-[1.03]">
        <div className="rounded-full bg-[#0A0A0A] p-[3px]">
          <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4D8DFF] to-[#1D4ED8] text-3xl font-semibold tracking-wide text-white"
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

            {/* Hover overlay hint */}
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
};

/* ------------------------------------------------------- image preview modal */

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
  // Track the specific src that failed to load instead of a boolean flag.
  // When `src` changes, `failedSrc !== src` again, so the image re-shows
  // automatically — no effect-driven setState (avoids cascading renders).
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const imgFailed = !!src && failedSrc === src;

  // Close on Escape + lock background scroll while open.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  // Rendered through a portal into <body> so it always centers on the full
  // viewport, unaffected by any parent transforms, overflow, or stacking.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile picture preview"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Keyframes for the modal entrance + ambient motion */}
      <style>{`
        @keyframes ipPreviewFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ipPreviewPop {
          from { opacity: 0; transform: scale(0.9) translateY(14px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
        @keyframes ipPreviewAura {
          0%, 100% { opacity: 0.5;  transform: translate(-50%, -50%) scale(1) }
          50%      { opacity: 0.85; transform: translate(-50%, -50%) scale(1.1) }
        }
      `}</style>

      {/* Backdrop — deeper blur + subtle vignette for a premium feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        style={{ animation: "ipPreviewFade 0.25s ease-out" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(77,141,255,0.14), transparent 55%)",
          animation: "ipPreviewFade 0.4s ease-out",
        }}
      />

      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col items-center"
        style={{ animation: "ipPreviewPop 0.42s cubic-bezier(0.22,1,0.36,1)" }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute -top-3 right-0 z-30 flex h-10 w-10 -translate-y-full cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/70 backdrop-blur transition-all duration-300 hover:rotate-90 hover:border-[#4D8DFF]/45 hover:bg-[#4D8DFF]/20 hover:text-white"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        {/* Card — the image sits inside this framed box */}
        <div className="relative w-full overflow-hidden rounded-[30px] bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-transparent p-px shadow-[0_40px_120px_-25px_rgba(0,0,0,0.95)]">
          <div className="relative overflow-hidden rounded-[29px] bg-gradient-to-b from-[#0E1320] to-[#0A0A0A]">
            {/* Ambient glows */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4D8DFF]/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#38BDF8]/[0.08] blur-3xl"
            />
            {/* Top hairline accent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4D8DFF]/60 to-transparent"
            />
            {/* Film grain */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
              style={{ backgroundImage: `url("${GRAIN_URL}")` }}
            />

            <div className="relative p-5 sm:p-6">
              {/* Pulsing aura behind the image box */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[90%] w-[90%] rounded-[24px] bg-[#4D8DFF]/20 blur-2xl"
                style={{ animation: "ipPreviewAura 5s ease-in-out infinite" }}
              />

              {/* Gradient-bordered image box (square) */}
              <div className="relative rounded-[22px] bg-gradient-to-br from-[#4D8DFF]/60 via-[#3B82F6]/30 to-[#38BDF8]/50 p-[2px] shadow-[0_18px_50px_-15px_rgba(77,141,255,0.5)]">
                <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#0A0A0A]">
                  {/* Initials fallback */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#4D8DFF] to-[#1D4ED8] text-7xl font-semibold tracking-wide text-white sm:text-8xl"
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

                  {/* Soft inner highlight for depth */}
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

/* ---------------------------------------------------------- section header */

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#4D8DFF]/10 text-[#4D8DFF] ring-1 ring-inset ring-[#4D8DFF]/20">
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
};

/* ------------------------------------------------------------- detail field */

interface DetailFieldProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const DetailField = ({ icon: Icon, label, value }: DetailFieldProps) => {
  return (
    <div>
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.15em] text-white/35">
        {label}
      </p>

      <div className="flex min-h-[52px] items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]">
        <Icon className="h-4 w-4 shrink-0 text-white/30" strokeWidth={1.8} />

        <span className="min-w-0 whitespace-normal break-words text-sm text-white/75">
          {value || "Not provided"}
        </span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------- social row */

interface SocialRowProps {
  icon: BrandIcon;
  label: string;
  url: string;
}

const SocialRow = ({ icon: Icon, label, url }: SocialRowProps) => {
  /*
   * Correct URL regex:
   * Remove http:// or https:// and a trailing slash.
   */
  const display = url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  return (
    <a
      href={url || undefined}
      target="_blank"
      rel="noreferrer noopener"
      className={`group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 ${
        url
          ? "hover:-translate-y-0.5 hover:border-[#4D8DFF]/25 hover:bg-[#4D8DFF]/[0.05]"
          : "pointer-events-none opacity-60"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-[#4D8DFF]/20 group-hover:bg-[#4D8DFF]/10 group-hover:text-[#6FA3FF]">
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
          className="h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#6FA3FF]"
          strokeWidth={2}
        />
      )}
    </a>
  );
};

/* ----------------------------------------------------------- skeleton bits */

/* A tiny shimmering block used as the skeleton primitive. */
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-md bg-white/[0.06] ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[ipSkeletonShimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </div>
);

/* Loading placeholder — mirrors the instructor profile layout. */
const InstructorProfileSkeleton = () => {
  return (
    <div className="min-h-full w-full bg-black text-white">
      <style>{`
        @keyframes ipSkeletonShimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="space-y-6">
        {/* HEADER */}
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Shimmer className="h-4 w-20" />
            <Shimmer className="mt-3 h-9 w-48" />
          </div>

          <Shimmer className="h-12 w-36 rounded-xl" />
        </section>

        {/* HERO + ABOUT */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_3fr]">
          {/* HERO */}
          <section>
            <div className="h-full rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px">
              <div className="relative h-full overflow-hidden rounded-[25px] bg-[#0A0A0A]">
                <div className="relative flex h-full flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
                  <Shimmer className="h-32 w-32 rounded-full sm:h-36 sm:w-36" />
                  <Shimmer className="mt-7 h-7 w-44" />
                  <Shimmer className="mt-4 h-9 w-48 rounded-full" />
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT */}
          <section className="flex min-w-0 flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shimmer className="h-11 w-11 rounded-xl" />
              <div>
                <Shimmer className="h-5 w-36" />
                <Shimmer className="mt-2 h-4 w-40" />
              </div>
            </div>

            <div className="mt-8 flex flex-1 flex-col justify-center gap-3 pl-10">
              <Shimmer className="h-5 w-full max-w-[90%]" />
              <Shimmer className="h-5 w-full max-w-[80%]" />
              <Shimmer className="h-5 w-full max-w-[60%]" />
            </div>
          </section>
        </div>

        {/* DETAILS + SOCIAL */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* PERSONAL INFORMATION */}
          <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shimmer className="h-11 w-11 rounded-xl" />
              <div>
                <Shimmer className="h-5 w-40" />
                <Shimmer className="mt-2 h-4 w-32" />
              </div>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i}>
                  <Shimmer className="mb-2 h-3 w-24" />
                  <Shimmer className="h-[52px] w-full rounded-xl" />
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <Shimmer className="h-3 w-40" />
            </div>
          </section>

          {/* SOCIAL LINKS */}
          <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Shimmer className="h-11 w-11 rounded-xl" />
              <div>
                <Shimmer className="h-5 w-28" />
                <Shimmer className="mt-2 h-4 w-32" />
              </div>
            </div>

            <div className="mt-7 space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Shimmer key={i} className="h-[68px] w-full rounded-xl" />
              ))}
            </div>

            <div className="flex flex-1 items-end">
              <div className="mt-6 w-full border-t border-white/[0.06] pt-5">
                <Shimmer className="h-3 w-36" />
              </div>
            </div>
          </section>
        </div>

        {/* TEACHING CATEGORIES */}
        <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Shimmer className="h-11 w-11 rounded-xl" />
            <div>
              <Shimmer className="h-5 w-44" />
              <Shimmer className="mt-2 h-4 w-52 max-w-full" />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Shimmer className="h-9 w-24 rounded-full" />
            <Shimmer className="h-9 w-32 rounded-full" />
            <Shimmer className="h-9 w-20 rounded-full" />
            <Shimmer className="h-9 w-28 rounded-full" />
            <Shimmer className="h-9 w-20 rounded-full" />
          </div>
        </section>
      </div>
    </div>
  );
};

/* ============================================================ MAIN COMPONENT */

const InstructorProfilePage = () => {
  const [profile, setProfile] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getInstructorProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch instructor profile:", err);
        setError("Unable to load your instructor profile.");
      } finally {
        setLoading(false);
      }
    };

    void fetchProfile();
  }, []);

  if (loading) {
    return <InstructorProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 bg-black text-white">
        <p className="text-sm text-red-400">
          {error ?? "Instructor profile not found."}
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/5"
        >
          Try Again
        </button>
      </div>
    );
  }

  const initials = getInitials(profile.full_name);

  const imageSrc = profile.profile_image
    ? profile.profile_image.startsWith("http")
      ? profile.profile_image
      : `http://localhost:8000${profile.profile_image}`
    : null;

  const categories = profile.categories ?? [];

  return (
    <>
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* PAGE HEADER */}

          <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="cursor-default">
              <p className="mb-2 text-sm font-medium text-[#4D8DFF]">Account</p>

              <h1
                className="cursor-default bg-gradient-to-r from-white via-white to-[#8FBAFF] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                My Profile
              </h1>
            </div>

            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="group inline-flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#4D8DFF]/25 bg-[#4D8DFF]/10 px-5 py-3 text-sm font-medium text-[#6FA3FF] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4D8DFF]/50 hover:bg-[#4D8DFF]/15 hover:text-white hover:shadow-[0_10px_30px_rgba(77,141,255,0.18)]"
            >
              <Edit3
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
                strokeWidth={1.8}
              />
              Edit Profile
            </button>
          </section>

          {/* HERO + ABOUT */}

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_3fr]">
            {/* HERO */}

            <section>
              <div className="h-full rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
                <div className="relative h-full overflow-hidden rounded-[25px] bg-[#0A0A0A]">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4D8DFF]/20 blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-[#4D8DFF]/[0.08] blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-[#38BDF8]/[0.05] blur-3xl"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4D8DFF]/50 to-transparent"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                    style={{
                      backgroundImage: `url("${GRAIN_URL}")`,
                    }}
                  />

                  <div className="relative flex h-full flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
                    {/* AVATAR */}

                    <div className="relative">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4D8DFF]/25 blur-2xl"
                      />

                      <ProfileAvatar
                        src={imageSrc}
                        initials={initials}
                        onClick={() => setIsImagePreviewOpen(true)}
                      />
                    </div>

                    {/* NAME */}

                    <div className="mt-7 w-full overflow-hidden">
                      <h2
                        className="w-[260px] truncate text-2xl font-semibold tracking-tight text-white sm:w-[320px] sm:text-[30px]"
                        style={{ fontFamily: DISPLAY_FONT }}
                        title={profile.full_name}
                      >
                        {profile.full_name.length > 20
                          ? `${profile.full_name.slice(0, 20)}...`
                          : profile.full_name}
                      </h2>
                    </div>

                    {/* JOINED */}

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/55 transition-colors duration-300 hover:border-[#4D8DFF]/25 hover:text-white/75">
                      <CalendarDays
                        className="h-4 w-4 text-[#6FA3FF]"
                        strokeWidth={1.8}
                      />

                      <span>
                        Instructor since{" "}
                        {formatMonthYear(profile.became_instructor_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ABOUT */}

            <section className="flex min-w-0 flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={FileText}
                title="Professional Bio"
                description="A short introduction."
              />

              <div className="relative mt-6 flex min-w-0 flex-1 flex-col justify-center pl-10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 left-0 select-none text-6xl leading-none text-[#38BDF8]/25"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  &ldquo;
                </span>

                <blockquote
                  className="w-full min-w-0 whitespace-normal break-words text-lg italic leading-relaxed text-white/70 sm:text-xl"
                  style={{ fontFamily: SERIF_FONT }}
                >
                  {profile.professional_bio || "No bio added yet."}
                </blockquote>
              </div>
            </section>
          </div>

          {/* DETAILS + SOCIAL */}

          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            {/* PERSONAL INFORMATION */}

            <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={User}
                title="Personal Information"
                description="Your account details."
              />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <DetailField
                  icon={User}
                  label="Full Name"
                  value={profile.full_name}
                />

                <DetailField
                  icon={MapPin}
                  label="Location"
                  value={profile.location}
                />

                <DetailField
                  icon={GraduationCap}
                  label="Education"
                  value={profile.education}
                />

                <DetailField
                  icon={Briefcase}
                  label="Occupation"
                  value={profile.occupation}
                />

                <DetailField
                  icon={Award}
                  label="Years of Experience"
                  value={profile.years_of_experience}
                />

                <DetailField
                  icon={Mail}
                  label="Email Address"
                  value={profile.email}
                />
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35">
                <Clock3 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
                Last updated {formatFullDate(profile.updated_at)}
              </div>
            </section>

            {/* SOCIAL LINKS */}

            <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
              <SectionHeader
                icon={LinkIcon}
                title="Social Links"
                description="Connected profiles."
              />

              <div className="mt-7 space-y-3">
                <SocialRow
                  icon={GithubIcon}
                  label="GitHub"
                  url={profile.github_url}
                />

                <SocialRow
                  icon={LinkedinIcon}
                  label="LinkedIn"
                  url={profile.linkedin_url}
                />

                <SocialRow
                  icon={Globe}
                  label="Portfolio"
                  url={profile.portfolio_url}
                />
              </div>

              <div className="flex flex-1 items-end">
                <div className="mt-6 flex w-full items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35">
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Links open in a new tab
                </div>
              </div>
            </section>
          </div>

          {/* TEACHING CATEGORIES */}

          <section className="flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8">
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
                    className="rounded-full border border-[#4D8DFF]/20 bg-[#4D8DFF]/10 px-4 py-2 text-sm text-[#8FBAFF] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4D8DFF]/40 hover:bg-[#4D8DFF]/15 hover:text-white"
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

      {/* Image preview modal */}
      <ImagePreviewModal
        src={imageSrc}
        initials={initials}
        name={profile.full_name}
        isOpen={isImagePreviewOpen}
        onClose={() => setIsImagePreviewOpen(false)}
      />

      {isEditModalOpen && profile && (
        <EditInstructorProfileModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSaved={(updatedProfile) => {
            setProfile(updatedProfile);
            setIsEditModalOpen(false);
            toast.success("Instructor profile updated successfully!", {
              containerId: "instructor",
            });
          }}
        />
      )}
    </>
  );
};

export default InstructorProfilePage;
