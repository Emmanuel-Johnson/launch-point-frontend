import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  Mail,
  MapPin,
  Phone,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type ApplicationStatus = "pending" | "approved" | "rejected";

interface Application {
  id: number;
  status: ApplicationStatus;

  full_name: string;
  email: string;
  phone_number: string;
  location: string;
  profile_image?: string | null;

  occupation: string;
  education: string;
  years_of_experience: string;

  categories_to_teach: string[];

  professional_bio: string;
  motivation: string;

  portfolio_url: string;
  linkedin_url: string;
  github_url: string;

  submitted_at: string;

  resume_url?: string | null;
  resume_name?: string | null;
  supporting_files?: {
    id: number;
    name: string;
    url: string;
  }[];

  admin_message?: string | null;
}

/* ================================================================
   DEMO PREVIEW SOURCES
   The sample data uses placeholder ("#") URLs, so the preview shows
   dummy content: every PDF shows this bundled PDF and every image
   shows this dummy image. Drop test_1.pdf into your /public folder
   (so it resolves at /test_1.pdf). For real previews, swap these for
   the file's actual URL in <FilePreviewModal />.
================================================================ */
const DUMMY_PDF_URL = "/test_1.pdf";
const DUMMY_IMAGE_URL =
  "https://picsum.photos/seed/launchpoint-preview/900/1200";

/* ================================================================
   BRAND ICONS
   lucide-react dropped brand-icon exports, so these are inline.
================================================================ */

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const BrandLogo = () => (
  <Link
    to="/instructor"
    className="group flex items-center gap-3 transition-all duration-300"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-lg">
      <img
        src="/instructor_logo.png"
        alt="Launch Point Logo"
        className="h-full w-full rounded-lg object-contain"
      />
    </div>

    <div>
      <span className="block text-sm font-semibold tracking-[3px] text-white transition-colors duration-300 group-hover:text-blue-300">
        LAUNCH POINT
      </span>

      <p className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-500 sm:block">
        Study hard. Work hard.
      </p>
    </div>
  </Link>
);

/*
 * Sample data — replace with API data later.
 */
const application: Application = {
  id: 1,
  status: "pending",

  full_name: "Emmanuel Johnson",
  email: "emmanuel@example.com",
  phone_number: "+91 9876543210",
  location: "Kerala, India",
  profile_image: null,

  occupation: "Full Stack Developer",
  education: "B.Sc. Computer Science",
  years_of_experience: "3–5 years",

  categories_to_teach: ["Python", "Django", "Web Development"],

  professional_bio:
    "Full stack developer passionate about teaching web development and helping students build real-world projects.",

  motivation:
    "I want to help aspiring developers learn practical development skills and build confidence through project-based learning.",

  portfolio_url: "https://example.com",
  linkedin_url: "https://linkedin.com/in/example",
  github_url: "https://github.com/example",

  submitted_at: "October 7, 2026",

  resume_url: "#",
  resume_name: "Emmanuel_Johnson_Resume.pdf",

  supporting_files: [
    {
      id: 1,
      name: "Project Certificate.pdf",
      url: "#",
    },
    {
      id: 2,
      name: "Experience Letter.pdf",
      url: "#",
    },
    {
      id: 3,
      name: "Skills Summary.pdf",
      url: "#",
    },
    {
      id: 4,
      name: "Intro Notes.pdf",
      url: "#",
    },
    {
      id: 5,
      name: "Portfolio Screenshot.png",
      url: "https://picsum.photos/seed/launchpoint/200",
    },
    {
      id: 6,
      name: "Project Photo.jpg",
      url: "https://picsum.photos/seed/launchpoint2/200",
    },
    {
      id: 7,
      name: "Reference Letter.pdf",
      url: "#",
    },
  ],

  admin_message: null,
};

const getStatusConfig = (status: ApplicationStatus) => {
  switch (status) {
    case "approved":
      return {
        label: "Approved",
        description:
          "Your application has been reviewed and approved. You can now continue to the instructor dashboard.",
        icon: CheckCircle2,
        iconClass: "text-emerald-300",
        badgeClass:
          "border-emerald-400/25 bg-emerald-500/[0.08] text-emerald-200",
        dotClass: "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]",
        glow: "bg-emerald-500/15",
        accent: "from-emerald-400 via-emerald-400 to-emerald-500",
      };

    case "rejected":
      return {
        label: "Rejected",
        description:
          "Your application has been reviewed and was not approved at this time.",
        icon: XCircle,
        iconClass: "text-red-300",
        badgeClass: "border-red-400/25 bg-red-500/[0.08] text-red-200",
        dotClass: "bg-red-400 shadow-[0_0_10px_2px_rgba(248,113,113,0.7)]",
        glow: "bg-red-500/15",
        accent: "from-red-400 via-red-400 to-red-500",
      };

    default:
      return {
        label: "Pending Review",
        description:
          "Your application has been successfully submitted and is currently under review. You’ll receive an update once the review process is complete.",
        icon: Clock3,
        iconClass: "text-amber-300",
        badgeClass: "border-amber-400/25 bg-amber-500/[0.08] text-amber-200",
        dotClass: "bg-amber-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.7)]",
        glow: "bg-amber-500/15",
        accent: "from-amber-400 via-amber-400 to-amber-500",
      };
  }
};

/* ================================================================
   FILE-TYPE META
   Uploads are restricted to PDF, PNG, and JPG, so only those types
   are mapped here. Image types are flagged so we render a real
   thumbnail instead of a file-logo icon. Anything unexpected from
   the API falls back to a neutral chip (see getFileMeta).
================================================================ */

type FileMeta = { label: string; color: string; image?: boolean };

const FILE_TYPES: Record<string, FileMeta> = {
  pdf: { label: "PDF", color: "#EF4444" },
  png: { label: "PNG", color: "#A855F7", image: true },
  jpg: { label: "JPG", color: "#A855F7", image: true },
  jpeg: { label: "JPEG", color: "#A855F7", image: true },
};

const getFileMeta = (name: string): FileMeta => {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  return (
    FILE_TYPES[ext] ?? { label: ext.toUpperCase() || "FILE", color: "#64748B" }
  );
};

/** A file can be previewed inline when it's an image or a PDF. */
const isPreviewable = (name: string): boolean => {
  const meta = getFileMeta(name);
  return Boolean(meta.image) || name.toLowerCase().endsWith(".pdf");
};

/** Append an alpha channel to a 6-digit hex color, e.g. hex("#EF4444", 0.12). */
const hex = (c: string, a: number) =>
  c +
  Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");

/* ================================================================
   FILE-TYPE LOGO
   A real "file icon": white page with a folded corner, faint text
   lines, and a colored type badge across the bottom.
================================================================ */

const FileTypeIcon = ({
  meta,
  className,
}: {
  meta: FileMeta;
  className?: string;
}) => {
  const len = meta.label.length;
  const fontSize = len <= 3 ? 9 : len === 4 ? 7 : 6;

  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden="true">
      {/* page body */}
      <path
        d="M7 1.5h18.5L34 10v34.5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      {/* folded corner */}
      <path d="M25.5 1.5 34 10h-6.5a2 2 0 0 1-2-2Z" fill="#E2E8F0" />
      {/* faint text lines */}
      <rect x="11" y="15" width="18" height="2" rx="1" fill="#E2E8F0" />
      <rect x="11" y="20" width="18" height="2" rx="1" fill="#E2E8F0" />
      <rect x="11" y="25" width="12" height="2" rx="1" fill="#E2E8F0" />
      {/* colored type badge */}
      <rect x="4" y="30" width="26" height="13" rx="3" fill={meta.color} />
      <text
        x="17"
        y="39.2"
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="0.3"
        fill="#ffffff"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {meta.label}
      </text>
    </svg>
  );
};

const InstructorApplicationDetailsPage = () => {
  const navigate = useNavigate();

  // Document currently open in the preview lightbox (null = closed).
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const status = getStatusConfig(application.status);
  const StatusIcon = status.icon;

  const initials = application.full_name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-zinc-100 antialiased">
      {/* ============================================================
          HEADER
      ============================================================ */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#0A0E1A]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Back button + Logo */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              to="/instructor/applications"
              aria-label="Back to student dashboard"
              className="group flex shrink-0 items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>

            <BrandLogo />
          </div>
        </div>
      </header>

      {/* ============================================================
          AMBIENT BLUE BACKDROP (sits below the header)
      ============================================================ */}
      <div className="pointer-events-none absolute inset-x-0 top-20 h-[520px] bg-[radial-gradient(120%_100%_at_50%_-20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-60 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* ============================================================
          MAIN
      ============================================================ */}
      <section className="relative z-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs"
          >
            <button
              type="button"
              onClick={() => navigate("/instructor/applications")}
              className="group inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-200"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-blue-300" />
              Applications
            </button>

            <ChevronRight className="h-3.5 w-3.5 text-zinc-700" />

            <span className="inline-flex items-center gap-1.5 font-medium text-blue-100">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_7px_1px_rgba(59,130,246,0.7)]" />
              Application #{String(application.id).padStart(2, "0")}
            </span>
          </nav>

          {/* ========================================================
              HERO — identity + status (shown once)
          ======================================================== */}
          <section className="relative mt-5 overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.10] via-white/[0.02] to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_30px_80px_-40px_rgba(2,6,23,0.9)]">
            {/* Accent + glow */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${status.accent}`}
            />
            <div
              className={`pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full ${status.glow} blur-3xl`}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_140%_at_0%_0%,rgba(59,130,246,0.08),transparent_55%)]" />

            <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Applicant identity */}
              <div className="flex items-center gap-5">
                {application.profile_image ? (
                  <img
                    src={application.profile_image}
                    alt={application.full_name}
                    className="h-18 w-18 shrink-0 rounded-2xl border border-blue-400/25 object-cover shadow-[0_0_40px_-12px_rgba(59,130,246,0.8)]"
                  />
                ) : (
                  <div className="relative flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/30 to-blue-700/5 text-xl font-semibold text-blue-50 shadow-[0_0_40px_-12px_rgba(59,130,246,0.8)]">
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(70%_70%_at_30%_20%,rgba(255,255,255,0.18),transparent)]" />
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-200/70">
                    <span className="h-1 w-1 rounded-full bg-blue-300/80 shadow-[0_0_6px_1px_rgba(59,130,246,0.7)]" />
                    Instructor Application
                  </p>

                  <h1 className="mt-2 truncate text-2xl font-bold tracking-tight text-white sm:text-[2rem] sm:leading-tight">
                    {application.full_name}
                  </h1>

                  <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
                    <CalendarDays className="h-3.5 w-3.5 text-blue-300/60" />
                    Submitted {application.submitted_at}
                  </p>
                </div>
              </div>

              {/* Status block */}
              <div
                className={`flex items-start gap-3 rounded-2xl border p-4 backdrop-blur-sm sm:max-w-xs ${status.badgeClass}`}
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/25">
                  <StatusIcon className={`h-5 w-5 ${status.iconClass}`} />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`}
                    />
                    <p className="text-sm font-semibold">{status.label}</p>
                  </div>
                  <p className="mt-1.5 text-xs leading-5 opacity-80">
                    {status.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              CONTENT — primary column + sticky summary rail
              (each field appears once)
          ======================================================== */}
          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            {/* ---------------- PRIMARY COLUMN ---------------- */}
            <div className="space-y-5 lg:col-span-2">
              {/* BACKGROUND */}
              <Panel>
                <SectionHeader
                  icon={<BriefcaseBusiness className="h-4 w-4" />}
                  title="Background"
                  description="Professional and academic background."
                />

                <div className="mt-6 grid gap-5 sm:grid-cols-3">
                  <InfoRow
                    icon={<BriefcaseBusiness className="h-4 w-4" />}
                    label="Occupation"
                    value={application.occupation}
                  />
                  <InfoRow
                    icon={<GraduationCap className="h-4 w-4" />}
                    label="Education"
                    value={application.education}
                  />
                  <InfoRow
                    icon={<Clock3 className="h-4 w-4" />}
                    label="Experience"
                    value={application.years_of_experience}
                  />
                </div>
              </Panel>

              {/* TEACHING EXPERTISE */}
              <Panel>
                <SectionHeader
                  icon={<GraduationCap className="h-4 w-4" />}
                  title="Teaching Expertise"
                  description="Areas the applicant wants to teach."
                />

                <div className="mt-6 flex flex-wrap gap-2.5">
                  {application.categories_to_teach.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-3.5 py-2 text-sm font-medium text-blue-100 transition-colors duration-200 hover:border-blue-400/40 hover:bg-blue-500/[0.14]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_7px_1px_rgba(59,130,246,0.7)]" />
                      {category}
                    </span>
                  ))}
                </div>
              </Panel>

              {/* ABOUT */}
              <Panel>
                <SectionHeader
                  icon={<UserRound className="h-4 w-4" />}
                  title="About"
                  description="Introduction and motivation for teaching."
                />

                <div className="mt-6 grid gap-5 lg:grid-cols-2">
                  <TextBlock
                    label="Professional Bio"
                    value={application.professional_bio}
                  />
                  <TextBlock
                    label="Why do you want to become an instructor?"
                    value={application.motivation}
                  />
                </div>
              </Panel>

              {/* RESUME / CV */}
              <Panel>
                <SectionHeader
                  icon={<FileText className="h-4 w-4" />}
                  title="Resume / CV"
                  description="Latest resume or CV submitted with the application."
                />

                <div className="mt-6 space-y-3">
                  {application.resume_url ? (
                    <DocumentCard
                      name={application.resume_name ?? "Resume.pdf"}
                      href={application.resume_url}
                      onPreview={() =>
                        setPreviewFile({
                          name: application.resume_name ?? "Resume.pdf",
                          url: application.resume_url ?? "",
                        })
                      }
                    />
                  ) : (
                    <EmptyState text="No resume was submitted." />
                  )}
                </div>
              </Panel>

              {/* SUPPORTING FILES */}
              <Panel>
                <SectionHeader
                  icon={<FileText className="h-4 w-4" />}
                  title="Supporting Files"
                  description="Certificates and other relevant documents."
                />

                <div className="mt-6 space-y-3">
                  {application.supporting_files?.length ? (
                    application.supporting_files.map((file) => (
                      <DocumentCard
                        key={file.id}
                        name={file.name}
                        href={file.url}
                        thumbnailUrl={file.url}
                        onPreview={() =>
                          setPreviewFile({ name: file.name, url: file.url })
                        }
                      />
                    ))
                  ) : (
                    <EmptyState text="No supporting files were submitted." />
                  )}
                </div>
              </Panel>

              {/* ADMIN MESSAGE */}
              {application.admin_message && (
                <section
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    application.status === "rejected"
                      ? "border-red-400/20 bg-red-500/[0.05]"
                      : "border-blue-400/20 bg-blue-500/[0.05]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        application.status === "rejected"
                          ? "bg-red-500/10 text-red-300"
                          : "bg-blue-500/10 text-blue-300"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                    </div>

                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        Message from Launch Point
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {application.admin_message}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* ---------------- SUMMARY RAIL ---------------- */}
            <aside className="lg:col-span-1">
              <div className="space-y-5 lg:sticky lg:top-28">
                {/* CONTACT */}
                <Panel>
                  <SectionHeader
                    icon={<UserRound className="h-4 w-4" />}
                    title="Contact"
                    description="How we can reach the applicant."
                  />

                  <div className="mt-6 space-y-5">
                    <InfoRow
                      icon={<Mail className="h-4 w-4" />}
                      label="Email address"
                      value={application.email}
                    />
                    <InfoRow
                      icon={<Phone className="h-4 w-4" />}
                      label="Phone number"
                      value={application.phone_number}
                    />
                    <InfoRow
                      icon={<MapPin className="h-4 w-4" />}
                      label="Location"
                      value={application.location}
                    />
                  </div>
                </Panel>

                {/* PROFESSIONAL LINKS */}
                <Panel>
                  <SectionHeader
                    icon={<Globe className="h-4 w-4" />}
                    title="Professional Links"
                    description="Profiles and work submitted with the application."
                  />

                  <div className="mt-6 space-y-3">
                    <LinkCard
                      icon={<Globe className="h-4 w-4" />}
                      label="Portfolio"
                      description="View portfolio"
                      href={application.portfolio_url}
                    />
                    <LinkCard
                      icon={<LinkedinIcon className="h-4 w-4" />}
                      label="LinkedIn"
                      description="View LinkedIn profile"
                      href={application.linkedin_url}
                    />
                    <LinkCard
                      icon={<GithubIcon className="h-4 w-4" />}
                      label="GitHub"
                      description="View GitHub profile"
                      href={application.github_url}
                    />
                  </div>
                </Panel>
              </div>
            </aside>
          </div>

          {/* ========================================================
              BOTTOM ACTIONS
          ======================================================== */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {application.status === "approved" && (
              <button
                type="button"
                onClick={() => navigate("/instructor/dashboard")}
                className="group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-gradient-to-b from-blue-500/90 to-blue-600 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 ring-1 ring-inset ring-white/10 transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-[0_8px_30px_-10px_rgba(59,130,246,0.85)] active:scale-[0.98]"
              >
                Go to Instructor Dashboard
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================
          FILE PREVIEW LIGHTBOX
      ============================================================ */}
      {previewFile && (
        <FilePreviewModal
          key={`${previewFile.name}-${previewFile.url}`}
          name={previewFile.name}
          url={previewFile.url}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </main>
  );
};

/* ================================================================
   REUSABLE COMPONENTS
================================================================ */

type PanelProps = {
  children: React.ReactNode;
};

const Panel = ({ children }: PanelProps) => (
  <section className="group rounded-2xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.07] via-white/[0.02] to-transparent p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-all duration-300 hover:border-blue-400/35 hover:shadow-[0_0_45px_-16px_rgba(59,130,246,0.7)] sm:p-6">
    {children}
  </section>
);

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const SectionHeader = ({ icon, title, description }: SectionHeaderProps) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-blue-300 shadow-[0_0_20px_-6px_rgba(59,130,246,0.6)]">
      {icon}
    </div>

    <div>
      <h2 className="text-sm font-semibold tracking-tight text-white">
        {title}
      </h2>
      <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
    </div>
  </div>
);

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-blue-300/70">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-600">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-zinc-200">
        {value}
      </p>
    </div>
  </div>
);

type TextBlockProps = {
  label: string;
  value: string;
};

const TextBlock = ({ label, value }: TextBlockProps) => (
  <div className="rounded-xl border border-white/[0.06] bg-[#0B0D14]/70 p-5 transition-colors duration-200 hover:border-blue-400/15">
    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-200/60">
      {label}
    </p>
    <p className="mt-3 text-sm leading-7 text-zinc-400">{value}</p>
  </div>
);

type LinkCardProps = {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
};

const LinkCard = ({ icon, label, description, href }: LinkCardProps) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0B0D14]/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.08] text-blue-300 transition-colors group-hover:border-blue-400/30">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-blue-300 transition-colors group-hover:text-blue-200">
        {description}
      </p>
    </div>

    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-all group-hover:translate-x-0.5 group-hover:text-blue-300" />
  </a>
);

type DocumentCardProps = {
  name: string;
  href: string;
  /** Pass the file URL for image types to render a real thumbnail. */
  thumbnailUrl?: string | null;
  primary?: boolean;
  /** Called when the preview (eye) button is clicked. */
  onPreview?: () => void;
};

const DocumentCard = ({
  name,
  href,
  thumbnailUrl,
  primary = false,
  onPreview,
}: DocumentCardProps) => {
  const meta = getFileMeta(name);
  const previewable = isPreviewable(name);

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0B0D14]/70 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-400/25 hover:bg-blue-500/[0.04]">
      {/* File logo: clean thumbnail for images, white file-type icon otherwise */}
      {meta.image && thumbnailUrl ? (
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
          <img
            src={thumbnailUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <FileTypeIcon
          meta={meta}
          className="h-12 w-10 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
        />
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-medium text-zinc-200">{name}</p>

          {/* type chip */}
          <span
            className="rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
            style={{
              color: meta.color,
              background: hex(meta.color, 0.12),
              border: `1px solid ${hex(meta.color, 0.25)}`,
            }}
          >
            {meta.label}
          </span>

          {primary && (
            <span className="rounded-md border border-blue-400/20 bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-300">
              Primary
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-zinc-600">
          {meta.image ? "Image" : `${meta.label} document`}
        </p>
      </div>

      {/* Actions — preview (eye) before download */}
      <div className="flex shrink-0 items-center gap-1.5">
        {onPreview && previewable && (
          <button
            type="button"
            onClick={onPreview}
            aria-label={`Preview ${name}`}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}

        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
          aria-label={`Download ${name}`}
        >
          <Download className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

type EmptyStateProps = {
  text: string;
};

const EmptyState = ({ text }: EmptyStateProps) => (
  <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-5 py-8 text-center">
    <FileText className="mx-auto h-6 w-6 text-zinc-600" />
    <p className="mt-2 text-sm text-zinc-500">{text}</p>
  </div>
);

/* ================================================================
   FILE PREVIEW MODAL
   Lightbox for previewing a document.
   - DEMO: because the sample data uses "#" URLs, every PDF shows the
     bundled dummy PDF and every image shows a dummy image. For real
     previews, use `url` as the source instead of the DUMMY_* values.
   - PDFs render in an iframe, images render full-size.
   Closes on backdrop click or Escape.
================================================================ */

type FilePreviewModalProps = {
  name: string;
  url: string;
  onClose: () => void;
};

const FilePreviewModal = ({ name, url, onClose }: FilePreviewModalProps) => {
  const meta = getFileMeta(name);
  const isPdf = name.toLowerCase().endsWith(".pdf");

  // Demo preview source: dummy PDF for PDFs, dummy image for images.
  // Swap these for `url` to preview the real file.
  const previewSrc = meta.image ? DUMMY_IMAGE_URL : isPdf ? DUMMY_PDF_URL : url;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-8"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Preview of ${name}`}
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E1A] shadow-2xl shadow-blue-950/40 ring-1 ring-blue-500/10"
      >
        {/* Top gradient accent line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />

        {/* Header */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-b from-blue-500/[0.06] to-transparent px-5 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <FileTypeIcon
              meta={meta}
              className="h-9 w-7 shrink-0 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
            />

            <div className="min-w-0">
              <p
                className="truncate text-sm font-medium text-white"
                title={name}
              >
                {name}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {meta.image ? "Image" : `${meta.label} document`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#07080C] p-4">
          {meta.image ? (
            <img
              src={previewSrc}
              alt={name}
              className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl shadow-black/50"
            />
          ) : isPdf ? (
            <iframe
              src={previewSrc}
              title={name}
              className="h-[70vh] w-full rounded-lg border border-white/10 bg-white"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <FileTypeIcon
                meta={meta}
                className="h-16 w-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
              />

              <p className="text-sm font-medium text-white">
                Preview isn&apos;t available for this file type
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorApplicationDetailsPage;
