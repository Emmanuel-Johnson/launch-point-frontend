import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  UserRound,
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

  short_bio: string;
  motivation: string;

  portfolio_url: string;
  linkedin_url: string;
  github_url: string;

  submitted_at: string;

  resume_url?: string | null;
  supporting_files?: {
    id: number;
    name: string;
    url: string;
  }[];

  admin_message?: string | null;
}

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
    to="/instructor/applications"
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

  short_bio:
    "Full stack developer passionate about teaching web development and helping students build real-world projects.",

  motivation:
    "I want to help aspiring developers learn practical development skills and build confidence through project-based learning.",

  portfolio_url: "https://example.com",
  linkedin_url: "https://linkedin.com/in/example",
  github_url: "https://github.com/example",

  submitted_at: "October 7, 2026",

  resume_url: "#",

  supporting_files: [
    {
      id: 1,
      name: "Project Certificate.pdf",
      url: "#",
    },
    {
      id: 2,
      name: "Previous Work.pdf",
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
        badgeClass: "border-emerald-400/25 bg-emerald-500/10 text-emerald-300",
        glow: "bg-emerald-500/10",
        accent: "from-emerald-400 to-emerald-500",
      };

    case "rejected":
      return {
        label: "Rejected",
        description:
          "Your application has been reviewed and was not approved at this time.",
        icon: XCircle,
        iconClass: "text-red-300",
        badgeClass: "border-red-400/25 bg-red-500/10 text-red-300",
        glow: "bg-red-500/10",
        accent: "from-red-400 to-red-500",
      };

    default:
      return {
        label: "Pending Review",
        description:
          "Your application has been successfully submitted and is currently under review. You’ll receive an update once the review process is complete.",
        icon: Clock3,
        iconClass: "text-amber-300",
        badgeClass: "border-amber-400/25 bg-amber-500/10 text-amber-300",
        glow: "bg-amber-500/10",
        accent: "from-amber-400 to-amber-500",
      };
  }
};

const getFileType = (name: string) =>
  name.split(".").pop()?.toUpperCase() || "FILE";

const InstructorApplicationDetailsPage = () => {
  const navigate = useNavigate();

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
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-zinc-100">
      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(120%_100%_at_50%_-20%,rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* ============================================================
          HEADER
      ============================================================ */}
      <header className="relative z-10 border-b border-white/[0.08] bg-[#0A0E1A]">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 sm:gap-8">
            <button
              type="button"
              onClick={() => navigate("/instructor/applications")}
              aria-label="Back to applications"
              className="group flex shrink-0 cursor-pointer items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </button>

            <BrandLogo />
          </div>
        </div>
      </header>

      {/* ============================================================
          MAIN
      ============================================================ */}
      <section className="relative px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => navigate("/instructor/applications")}
              className="text-zinc-500 transition-colors hover:text-zinc-200"
            >
              Applications
            </button>

            <span className="text-zinc-700">/</span>

            <span className="text-zinc-300">
              Application #{String(application.id).padStart(2, "0")}
            </span>
          </nav>

          {/* ========================================================
              HERO — identity + status (shown once)
          ======================================================== */}
          <section className="relative mt-5 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-blue-500/[0.09] via-white/[0.025] to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]">
            {/* Accent + glow */}
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${status.accent}`}
            />
            <div
              className={`pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full ${status.glow} blur-3xl`}
            />

            <div className="relative flex flex-col gap-7 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Applicant identity */}
              <div className="flex items-center gap-4">
                {application.profile_image ? (
                  <img
                    src={application.profile_image}
                    alt={application.full_name}
                    className="h-16 w-16 shrink-0 rounded-2xl border border-blue-400/25 object-cover shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-400/25 bg-gradient-to-br from-blue-500/25 to-blue-600/5 text-lg font-semibold text-blue-100 shadow-[0_0_30px_-10px_rgba(59,130,246,0.7)]">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-300/70">
                    Instructor Application
                  </p>

                  <h1 className="mt-1.5 truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {application.full_name}
                  </h1>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500">
                    <CalendarDays className="h-3.5 w-3.5 text-blue-300/60" />
                    Submitted {application.submitted_at}
                  </p>
                </div>
              </div>

              {/* Status block */}
              <div
                className={`flex items-start gap-3 rounded-2xl border p-4 sm:max-w-xs ${status.badgeClass}`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/20">
                  <StatusIcon className={`h-4.5 w-4.5 ${status.iconClass}`} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">{status.label}</p>
                  <p className="mt-1 text-xs leading-5 opacity-70">
                    {status.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              CONTENT GRID — each field appears once
          ======================================================== */}
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {/* CONTACT */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6">
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
            </section>

            {/* BACKGROUND */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6">
              <SectionHeader
                icon={<BriefcaseBusiness className="h-4 w-4" />}
                title="Background"
                description="Professional and academic background."
              />

              <div className="mt-6 space-y-5">
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
            </section>

            {/* TEACHING EXPERTISE */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6 lg:col-span-2">
              <SectionHeader
                icon={<GraduationCap className="h-4 w-4" />}
                title="Teaching Expertise"
                description="Areas the applicant wants to teach."
              />

              <div className="mt-6 flex flex-wrap gap-2.5">
                {application.categories_to_teach.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] px-3.5 py-2 text-sm font-medium text-blue-100"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_7px_1px_rgba(59,130,246,0.7)]" />
                    {category}
                  </span>
                ))}
              </div>
            </section>

            {/* ABOUT */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6 lg:col-span-2">
              <SectionHeader
                icon={<UserRound className="h-4 w-4" />}
                title="About"
                description="Introduction and motivation for teaching."
              />

              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <TextBlock
                  label="Short professional bio"
                  value={application.short_bio}
                />
                <TextBlock
                  label="Why do you want to become an instructor?"
                  value={application.motivation}
                />
              </div>
            </section>

            {/* PROFESSIONAL LINKS */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6 lg:col-span-2">
              <SectionHeader
                icon={<Globe className="h-4 w-4" />}
                title="Professional Links"
                description="Profiles and work submitted with the application."
              />

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
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
            </section>

            {/* RESUME / CV */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6 lg:col-span-2">
              <SectionHeader
                icon={<FileText className="h-4 w-4" />}
                title="Resume / CV"
                description="Latest resume or CV submitted with the application."
              />

              <div className="mt-6 space-y-3">
                {application.resume_url ? (
                  <DocumentCard
                    name="Resume / CV"
                    type="PDF, DOC, or DOCX"
                    href={application.resume_url}
                   
                  />
                ) : (
                  <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-5 py-8 text-center">
                    <FileText className="mx-auto h-6 w-6 text-zinc-600" />
                    <p className="mt-2 text-sm text-zinc-500">
                      No resume was submitted.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* SUPPORTING FILES */}
            <section className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] sm:p-6 lg:col-span-2">
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
                      type={getFileType(file.name)}
                      href={file.url}
                    />
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-white/10 bg-black/10 px-5 py-8 text-center">
                    <FileText className="mx-auto h-6 w-6 text-zinc-600" />
                    <p className="mt-2 text-sm text-zinc-500">
                      No supporting files were submitted.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* ADMIN MESSAGE */}
            {application.admin_message && (
              <section
                className={`rounded-2xl border p-5 sm:p-6 lg:col-span-2 ${
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

          {/* ========================================================
              BOTTOM ACTIONS
          ======================================================== */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {application.status === "approved" && (
              <button
                type="button"
                onClick={() => navigate("/instructor/dashboard")}
                className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-400/30 bg-gradient-to-b from-blue-500/90 to-blue-600 px-5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 ring-1 ring-inset ring-white/10 transition-all duration-200 hover:from-blue-400 hover:to-blue-500 hover:shadow-[0_8px_30px_-10px_rgba(59,130,246,0.8)] active:scale-[0.98]"
              >
                Go to Instructor Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

/* ================================================================
   REUSABLE COMPONENTS
================================================================ */

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
      <h2 className="text-sm font-semibold text-white">{title}</h2>
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
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.025] text-blue-300/70">
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
  <div className="rounded-xl border border-white/[0.06] bg-[#0D0F15]/60 p-5">
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
    className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0D0F15]/60 p-4 transition-all duration-200 hover:border-blue-400/30 hover:bg-blue-500/[0.06]"
  >
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/[0.08] text-blue-300">
      {icon}
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className="mt-1 truncate text-sm font-medium text-blue-300 transition-colors group-hover:text-blue-200">
        {description}
      </p>
    </div>

    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-600 transition-colors group-hover:text-blue-300" />
  </a>
);

type DocumentCardProps = {
  name: string;
  type: string;
  href: string;
  primary?: boolean;
};

const DocumentCard = ({
  name,
  type,
  href,
  primary = false,
}: DocumentCardProps) => (
  <div className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0D0F15]/60 p-4 transition-all duration-200 hover:border-blue-400/25 hover:bg-blue-500/[0.04]">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/15 bg-blue-500/[0.08] text-blue-300">
      <FileText className="h-4 w-4" />
    </div>

    <div className="min-w-0 flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <p className="truncate text-sm font-medium text-zinc-200">{name}</p>
        {primary && (
          <span className="rounded-md border border-blue-400/20 bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-blue-300">
            Primary
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-zinc-600">{type}</p>
    </div>

    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition-all hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
      aria-label={`Download ${name}`}
    >
      <Download className="h-4 w-4" />
    </a>
  </div>
);

export default InstructorApplicationDetailsPage;
