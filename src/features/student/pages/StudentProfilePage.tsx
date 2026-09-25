import {
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Clock3,
  Edit3,
  FileText,
  Globe,
  GraduationCap,
  Link as LinkIcon,
  Mail,
  MapPin,
  User,
  type LucideIcon,
} from "lucide-react";

/*
  ============================================================================
  STUDENT · VIEW PROFILE  (read-only)  ·  premium pass
  ============================================================================
  VIOLET & BLACK THEME — matches the Student Dashboard / Sidebar / Header.
  --------------------------------------------------------------------------
  Page canvas   #000000   true black (sits inside StudentLayout's <main>)
  Card surface  #0A0A0A   near-black, lifted one step off the canvas
  Primary       #7C5CFF   Launch Point electric indigo-violet
  Deep violet   #4D32C8   avatar gradient end
  Gold          #E8C67A   champagne — PREMIUM SIGNAL ONLY, used in exactly two
                          places on this surface (avatar ring, About quote mark;
                          plus a single near-invisible ambient wash on the hero)
  --------------------------------------------------------------------------
  Type roles (Launch Point design system):
    Space Grotesk — display / name        Fraunces (italic) — editorial bio
    Inter — everything else (inherited from the app's base stack)

  This page renders INSIDE StudentLayout, which already applies the outer
  padding (px-8 pt-8 pb-10) and the page-enter animation. So the root here is
  a plain `min-h-full w-full bg-black` — no max-width, no top offset.

  Layout note: the hero identity card and the About section share a two-column
  row at `lg` and up — profile on the left (1fr), About on the right (3fr).
  Below `lg` they stack. Grid items stretch to equal height, so the About box
  fills down to match the profile card; its content is vertically centered.

  The Details + Social row also stretches both cards to equal height: Social
  Links is `flex flex-col` with a bottom-anchored footer so it fills down to
  match the taller Personal Information card rather than floating short.

  Only the fields returned by GET /student/profile/ are shown. Swap
  SAMPLE_PROFILE for your fetched data (prop, Redux, or loader) — the shape
  is the StudentProfile interface below.
  ==========================================================================*/

interface StudentProfile {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  bio: string;
  location: string;
  education: string;
  occupation: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  created_at: string;
  updated_at: string;
}

/* If media isn't served on the same origin (e.g. Django on :8000 without a
   Vite proxy), set this to that origin, e.g. "http://localhost:8000". */
const MEDIA_BASE_URL = "";

/* Font stacks — degrade gracefully if the webfonts aren't loaded yet. */
const DISPLAY_FONT = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const SERIF_FONT = '"Fraunces", ui-serif, Georgia, "Times New Roman", serif';

/* Ultra-fine film grain — a tactile premium texture, kept near-invisible. */
const GRAIN_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const SAMPLE_PROFILE: StudentProfile = {
  id: 2,
  full_name: "Alex Morgan",
  email: "alex.morgan@example.com",
  profile_image: "/media/student_profiles/Yuta_.jpeg",
  bio: "Passionate software developer focused on building modern and user-friendly web applications. I enjoy working with Python, Django, React, and REST APIs while continuously improving my development skills.",
  location: "Bangalore, Karnataka",
  education: "MCA in Computer Applications",
  occupation: "Software Engineer",
  github_url: "https://github.com/alexmorgan",
  linkedin_url: "https://www.linkedin.com/in/alexmorgan",
  portfolio_url: "https://alexmorgan.dev",
  created_at: "2026-09-25T01:44:24.860307+05:30",
  updated_at: "2026-09-25T14:39:31.634892+05:30",
};

/* ------------------------------------------------------------------ helpers */

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const resolveImage = (path: string | null): string | null => {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${MEDIA_BASE_URL}${path}`;
};

const formatMonthYear = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

const formatFullDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/* --------------------------------------------------------------- brand marks
   lucide-react dropped its brand glyphs (Github / Linkedin) in newer versions,
   so we ship the marks inline. They're fill-based (currentColor), which is why
   SocialRow types its icon as a plain className component rather than a
   LucideIcon. (Portfolio has no brand mark, so it uses lucide's stroke-based
   Globe — the shared BrandIcon type accepts both.) */

type BrandIcon = React.ComponentType<{ className?: string }>;

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ------------------------------------------------------------------- avatar
   Premium triple-ring: violet→gold gradient ring, a dark separation gap, then
   the image (or initials gradient underneath as a graceful fallback).
   Sized up a touch here — it's the centerpiece of the identity card. */

interface AvatarProps {
  src: string | null;
  initials: string;
}

const ProfileAvatar = ({ src, initials }: AvatarProps) => {
  return (
    <div className="relative shrink-0">
      {/* Gradient ring — the first of two gold touches on this surface */}
      <div className="rounded-full bg-gradient-to-br from-[#7C5CFF] via-[#8E72FF] to-[#E8C67A] p-[2.5px] shadow-[0_0_55px_-4px_rgba(124,92,255,0.55)]">
        {/* Dark separation gap */}
        <div className="rounded-full bg-[#0A0A0A] p-[3px]">
          {/* Image / initials */}
          <div className="relative h-28 w-28 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7C5CFF] to-[#4D32C8] text-3xl font-semibold tracking-wide text-white"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              {initials}
            </div>

            {src && (
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#7C5CFF] ring-1 ring-inset ring-[#7C5CFF]/20">
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
  const display = url.replace(/^https?:\/\//i, "").replace(/\/$/, "");

  return (
    <a
      href={url || undefined}
      target="_blank"
      rel="noreferrer noopener"
      className={`group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 transition-all duration-300 ${
        url
          ? "hover:-translate-y-0.5 hover:border-[#7C5CFF]/25 hover:bg-[#7C5CFF]/[0.05]"
          : "pointer-events-none opacity-60"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-white/50 transition-all duration-300 group-hover:border-[#7C5CFF]/20 group-hover:bg-[#7C5CFF]/10 group-hover:text-[#9D82FF]">
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
          className="h-4 w-4 shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#9D82FF]"
          strokeWidth={2}
        />
      )}
    </a>
  );
};

/* ============================================================ MAIN COMPONENT */

interface ViewProfileProps {
  /* Pass the fetched profile here; defaults to sample data so the page
     renders standalone while you wire up the request. */
  profile?: StudentProfile;
  /* Optional: hook the "Edit Profile" button to your edit route/modal. */
  onEdit?: () => void;
}

const ViewProfile = ({
  profile = SAMPLE_PROFILE,
  onEdit,
}: ViewProfileProps) => {
  const initials = getInitials(profile.full_name);
  const imageSrc = resolveImage(profile.profile_image);

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* =========================================================
            PAGE HEADER
        ========================================================= */}
        <section
          className="animate-page-item flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
          style={{ animationDelay: "80ms" }}
        >
          <div className="cursor-default">
            <p className="mb-2 text-sm font-medium text-[#7C5CFF]">Account</p>

            <h1
              className="cursor-default bg-gradient-to-r from-white via-white to-[#9B7CFF] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              My Profile
            </h1>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#7C5CFF]/25 bg-[#7C5CFF]/10 px-5 py-3 text-sm font-medium text-[#9D82FF] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C5CFF]/50 hover:bg-[#7C5CFF]/15 hover:text-white hover:shadow-[0_10px_30px_rgba(124,92,255,0.18)] cursor-pointer"
          >
            <Edit3
              className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6"
              strokeWidth={1.8}
            />
            Edit Profile
          </button>
        </section>

        {/* =========================================================
            HERO (left, 1fr) + ABOUT (right, 3fr) — 1:3 at lg and up,
            stacked below. Grid items stretch to equal height, so the
            About box fills down to match the profile card.
        ========================================================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_3fr]">
          {/* -----------------------------------------------------
              HERO IDENTITY CARD — centered, vertical, the one bold moment
              avatar (with spotlight) → name → Joined
              gradient-hairline border + grain + triple-ring avatar
          ----------------------------------------------------- */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "150ms" }}
          >
            <div className="rounded-[26px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent p-px shadow-[0_24px_70px_-20px_rgba(0,0,0,0.85)]">
              <div className="relative overflow-hidden rounded-[25px] bg-[#0A0A0A]">
                {/* Ambient glows — violet crown top-center, faint violet base,
                    and a single near-invisible gold wash (premium signal) */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#7C5CFF]/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-28 -left-16 h-60 w-60 rounded-full bg-[#7C5CFF]/[0.08] blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -right-16 h-52 w-52 rounded-full bg-[#E8C67A]/[0.05] blur-3xl"
                />
                {/* Top hairline highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/50 to-transparent"
                />
                {/* Film grain */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
                  style={{ backgroundImage: `url("${GRAIN_URL}")` }}
                />

                <div className="relative flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14">
                  {/* Avatar + soft spotlight halo behind it */}
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7C5CFF]/25 blur-2xl"
                    />
                    <ProfileAvatar src={imageSrc} initials={initials} />
                  </div>

                  {/* Name */}
                  <div className="mt-7 w-full max-w-full overflow-hidden">
                    {profile.full_name.length > 16 ? (
                      <div className="relative h-[38px] overflow-hidden sm:h-[42px]">
                        <div
                          className="absolute left-0 w-full animate-name-scroll text-2xl font-semibold tracking-tight text-white sm:text-[30px]"
                          style={{ fontFamily: DISPLAY_FONT }}
                        >
                          {profile.full_name}
                        </div>
                      </div>
                    ) : (
                      <h2
                        className="text-2xl font-semibold tracking-tight text-white sm:text-[30px]"
                        style={{ fontFamily: DISPLAY_FONT }}
                      >
                        {profile.full_name}
                      </h2>
                    )}
                  </div>

                  {/* Joined — single centered pill */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-white/55 transition-colors duration-300 hover:border-[#7C5CFF]/25 hover:text-white/75">
                    <CalendarDays
                      className="h-4 w-4 text-[#9D82FF]"
                      strokeWidth={1.8}
                    />
                    <span>Joined {formatMonthYear(profile.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------
              ABOUT — Fraunces editorial pull-quote
          ----------------------------------------------------- */}
          <section
            className="animate-page-item flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8"
            style={{ animationDelay: "230ms" }}
          >
            <SectionHeader
              icon={FileText}
              title="About"
              description="A short introduction."
            />

            <div className="relative mt-6 flex flex-1 flex-col justify-center pl-10">
              {/* Oversized quote mark — the second, final gold touch */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 left-0 select-none text-6xl leading-none text-[#E8C67A]/25"
                style={{ fontFamily: SERIF_FONT }}
              >
                &ldquo;
              </span>

              <blockquote
                className="max-w-2xl text-lg italic leading-relaxed text-white/70 sm:text-xl"
                style={{ fontFamily: SERIF_FONT }}
              >
                {profile.bio || "No bio added yet."}
              </blockquote>
            </div>
          </section>
        </div>

        {/* =========================================================
            DETAILS + SOCIAL
            Both cards stretch to equal height (grid default). Social Links
            is flex-col with a bottom-anchored footer so it fills down to
            match the taller Personal Information card.
        ========================================================= */}
        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Personal information */}
          <section
            className="animate-page-item flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8"
            style={{ animationDelay: "310ms" }}
          >
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

              <div className="sm:col-span-2">
                <DetailField
                  icon={Mail}
                  label="Email Address"
                  value={profile.email}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35">
              <Clock3 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} />
              Last updated {formatFullDate(profile.updated_at)}
            </div>
          </section>

          {/* Social links — flex-col so it stretches to the row height; the
              footer is pushed to the bottom by the flex-1 spacer, giving the
              card a filled, structured feel that lines up with the card above. */}
          <section
            className="animate-page-item flex flex-col rounded-3xl border border-white/[0.06] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:p-8"
            style={{ animationDelay: "390ms" }}
          >
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

            {/* Spacer fills the remaining height and anchors the footer,
                mirroring the "Last updated" footer on the card to the left. */}
            <div className="flex flex-1 items-end">
              <div className="mt-6 flex w-full items-center gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} />
                Links open in a new tab
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
