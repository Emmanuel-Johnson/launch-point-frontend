import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  GraduationCap,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  XCircle,
  UserRound,
  MessageSquareText,
  Download,
} from "lucide-react";

/*
  GREEN & BLACK THEME (matches the Admin sidebar / header / dashboard)
  -----------------------------------------------------------------
  Card surface  #0A0A0A   near-black
  Inset panel   white/[0.02]   one step down inside a card
  Primary       #34D399   emerald — the single accent colour
  Hover emerald #6EE7B7   lighter step for hover states

  Status colours (amber / emerald / red) stay semantic, the same way the
  dashboard keeps red as a destructive signal. The approve action uses the
  solid theme emerald; reject stays red.
*/

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound;
  label: string;
  value: string | number;
}) => (
  <div className="flex min-w-0 items-start gap-3">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
      <Icon size={16} className="text-white/55" />
    </div>

    <div className="min-w-0">
      <p className="text-xs text-white/45">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-white/90">
        {value || "Not provided"}
      </p>
    </div>
  </div>
);

const SectionHeading = ({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound;
  title: string;
  description?: string;
}) => (
  <div className="mb-6 flex items-start gap-3">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#34D399]/20 bg-[#34D399]/10">
      <Icon size={19} className="text-[#34D399]" />
    </div>

    <div>
      <h2 className="font-semibold text-white">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-white/45">{description}</p>
      )}
    </div>
  </div>
);

const InstructorApplicationAdminDetailPage = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();

  // Sample data for UI only.
  const application = {
    id: applicationId ?? "16",
    full_name: "Harshibar",
    email: "harshibar@example.com",
    phone_number: "+91 9876543210",
    location: "Kochi, Kerala, India",
    occupation: "Full Stack Developer",
    education: "B.Tech Computer Science",
    years_of_experience: 3,
    status: "pending",
    professional_bio:
      "Full stack developer passionate about building scalable web applications and helping aspiring developers develop practical programming skills.",
    motivation:
      "I want to become an instructor because I enjoy sharing knowledge and helping students build confidence through hands-on projects. My goal is to make complex concepts easier to understand and prepare students for real-world development.",
    categories: [
      "Frontend Development",
      "Full Stack Development",
      "Web Development",
    ],
    portfolio_url: "https://example.com",
    linkedin_url: "https://linkedin.com",
    github_url: "https://github.com",
    submitted_at: "2026-10-08T02:00:54+05:30",
    resume_name: "harshibar_resume.pdf",
    admin_message: "",
  };

  const statusStyles: Record<string, string> = {
    pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const formattedDate = new Date(application.submitted_at).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const professionalLinks = [
    {
      label: "Portfolio",
      url: application.portfolio_url,
      icon: Globe,
    },
    {
      label: "LinkedIn",
      url: application.linkedin_url,
      icon: ExternalLink,
    },
    {
      label: "GitHub",
      url: application.github_url,
      icon: ExternalLink,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <button
            type="button"
            onClick={() => navigate("/admin/applications/instructors")}
            className="text-white/45 transition hover:text-white"
          >
            Instructor Applications
          </button>

          <span className="text-white/20">/</span>
          <span className="text-white/80">Application Details</span>
        </div>

        <button
          type="button"
          onClick={() => navigate("/admin/applications/instructors")}
          className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0A0A0A] px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-[#34D399]/30 hover:bg-white/[0.04] hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to applications
        </button>
      </div>

      {/* Applicant Header */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#34D399]/20 bg-gradient-to-br from-[#34D399]/20 to-[#059669]/10 text-xl font-semibold text-[#6EE7B7]">
              {application.full_name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-white sm:text-2xl">
                  {application.full_name}
                </h1>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[application.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {application.status}
                </span>
              </div>

              <p className="mt-2 break-all text-sm text-white/55">
                {application.email}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
                <span className="inline-flex items-center gap-1.5">
                  <FileText size={14} />
                  Application #{application.id}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  Applied {formattedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 sm:min-w-44">
            <p className="text-xs text-white/45">Application status</p>
            <p
              className={`mt-1 text-sm font-medium capitalize ${
                application.status === "pending"
                  ? "text-amber-400"
                  : application.status === "approved"
                    ? "text-emerald-400"
                    : "text-red-400"
              }`}
            >
              {application.status} review
            </p>
            <p className="mt-1 text-xs text-white/45">Submitted by applicant</p>
          </div>
        </div>
      </div>

      {/* Main Content and Review Sidebar */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-6">
          {/* Applicant Information */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={UserRound}
              title="Applicant Information"
              description="Personal and educational details"
            />

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <InfoItem
                icon={UserRound}
                label="Full name"
                value={application.full_name}
              />

              <InfoItem
                icon={Mail}
                label="Email address"
                value={application.email}
              />

              <InfoItem
                icon={Phone}
                label="Phone number"
                value={application.phone_number}
              />

              <InfoItem
                icon={MapPin}
                label="Location"
                value={application.location}
              />

              <InfoItem
                icon={BriefcaseBusiness}
                label="Current occupation"
                value={application.occupation}
              />

              <InfoItem
                icon={GraduationCap}
                label="Education"
                value={application.education}
              />

              <InfoItem
                icon={Clock3}
                label="Industry experience"
                value={`${application.years_of_experience} years`}
              />

              <InfoItem
                icon={CalendarDays}
                label="Application date"
                value={formattedDate}
              />
            </div>
          </section>

          {/* Teaching Categories */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={GraduationCap}
              title="Teaching Categories"
              description="Subjects selected by the applicant"
            />

            <div className="flex flex-wrap gap-2">
              {application.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-lg border border-[#34D399]/20 bg-[#34D399]/[0.08] px-3 py-2 text-sm text-[#6EE7B7]"
                >
                  {category}
                </span>
              ))}
            </div>
          </section>

          {/* Professional Profile */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={MessageSquareText}
              title="Professional Profile"
              description="Background, expertise and teaching motivation"
            />

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white/90">
                  Professional Bio
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/55">
                  {application.professional_bio}
                </p>
              </div>

              <div className="border-t border-white/[0.08] pt-5">
                <h3 className="text-sm font-medium text-white/90">
                  Motivation to Become an Instructor
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/55">
                  {application.motivation}
                </p>
              </div>
            </div>
          </section>

          {/* Professional Links */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={Globe}
              title="Professional Links"
              description="External profiles and portfolio"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {professionalLinks.map(({ label, url, icon: Icon }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/[0.04]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon size={18} className="shrink-0 text-[#34D399]" />
                    <span className="text-sm font-medium text-white/80">
                      {label}
                    </span>
                  </div>
                  <ExternalLink size={15} className="shrink-0 text-white/40" />
                </a>
              ))}
            </div>
          </section>

          {/* Application Documents */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={FileText}
              title="Application Documents"
              description="Resume and supporting documents"
            />

            <div className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                  <FileText size={21} className="text-red-400" />
                </div>

                <div className="min-w-0">
                  <p className="break-all text-sm font-medium text-white/90">
                    {application.resume_name}
                  </p>
                  <p className="mt-1 text-xs text-white/45">PDF document</p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/[0.12] px-3 py-2 text-sm text-white/80 transition hover:border-[#34D399]/40 hover:text-[#6EE7B7]"
              >
                <Download size={15} />
                Download resume
              </button>
            </div>
          </section>
        </div>

        {/* Review Sidebar */}
        <aside className="space-y-6 xl:sticky xl:top-6">
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <h2 className="font-semibold text-white">Application Review</h2>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Review the applicant&apos;s experience, teaching categories, and
              professional documents before making a decision.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/45">Application ID</span>
                <span className="font-medium text-white/80">
                  #{application.id}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/45">Status</span>
                <span
                  className={`capitalize ${
                    application.status === "pending"
                      ? "text-amber-400"
                      : application.status === "approved"
                        ? "text-emerald-400"
                        : "text-red-400"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/45">Experience</span>
                <span className="text-white/80">
                  {application.years_of_experience} years
                </span>
              </div>
            </div>

            {application.status === "pending" && (
              <>
                <div className="my-5 border-t border-white/[0.08]" />

                <p className="mb-3 text-xs leading-5 text-white/45">
                  Review actions are visual placeholders.
                </p>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#34D399] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#6EE7B7]"
                >
                  <CheckCircle2 size={17} />
                  Approve Application
                </button>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/[0.04] px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  <XCircle size={17} />
                  Reject Application
                </button>
              </>
            )}
          </section>

          {/* Admin Note */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
            <div className="flex items-center gap-2">
              <MessageSquareText size={17} className="text-white/55" />
              <h2 className="font-semibold text-white">Admin Note</h2>
            </div>

            <p className="mt-3 text-sm leading-6 text-white/45">
              {application.admin_message ||
                "No review note has been added yet."}
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default InstructorApplicationAdminDetailPage;
