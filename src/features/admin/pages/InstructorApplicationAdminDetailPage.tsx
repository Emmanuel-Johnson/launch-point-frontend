import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquareText,
  Paperclip,
  Phone,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

/*
  GREEN & BLACK THEME (matches the Admin sidebar / header / dashboard)
  -----------------------------------------------------------------
  Card surface  #0A0A0A   near-black
  Inset panel   white/[0.02]   one step down inside a card
  Primary       #34D399   emerald — the single accent colour
  Hover emerald #6EE7B7   lighter step for hover states

  Status colours (amber / emerald / red) stay semantic. The approve action
  uses the solid theme emerald; reject stays red.
*/

type ApplicationStatus = "pending" | "approved" | "rejected";

type SupportingFile = {
  id: number;
  name: string;
  url: string;
};

/* ================================================================
   FILE-TYPE META
   Uploads are restricted to PDF, PNG, and JPG. Image types are
   flagged so a real thumbnail renders instead of a file-logo icon.
================================================================ */

type FileMeta = { label: string; color: string; image?: boolean };

const FILE_TYPES: Record<string, FileMeta> = {
  pdf: { label: "PDF", color: "#EF4444" },
  png: { label: "PNG", color: "#34D399", image: true },
  jpg: { label: "JPG", color: "#34D399", image: true },
  jpeg: { label: "JPEG", color: "#34D399", image: true },
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
   FILE DOWNLOAD
   Fetches the file as a blob so it actually downloads (cross-origin
   <a download> is ignored). Falls back to opening in a new tab.
================================================================ */

const downloadFile = async (name: string, url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error("Failed to download file:", error);
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

/* ================================================================
   FILE-TYPE LOGO
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
      <path
        d="M7 1.5h18.5L34 10v34.5a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"
        fill="#F8FAFC"
        stroke="#E2E8F0"
        strokeWidth="1"
      />
      <path d="M25.5 1.5 34 10h-6.5a2 2 0 0 1-2-2Z" fill="#E2E8F0" />
      <rect x="11" y="15" width="18" height="2" rx="1" fill="#E2E8F0" />
      <rect x="11" y="20" width="18" height="2" rx="1" fill="#E2E8F0" />
      <rect x="11" y="25" width="12" height="2" rx="1" fill="#E2E8F0" />
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

/* ================================================================
   SMALL PRESENTATIONAL PIECES
================================================================ */

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
    <div className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/[0.04]">
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
          <p
            className="truncate text-sm font-medium text-white/90"
            title={name}
          >
            {name}
          </p>

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
            <span className="rounded-md border border-[#34D399]/20 bg-[#34D399]/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#34D399]">
              Primary
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-white/45">
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
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/55 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399]"
          >
            <Eye size={16} />
          </button>
        )}

        <button
          type="button"
          onClick={() => downloadFile(name, href)}
          aria-label={`Download ${name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/55 transition hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399]"
        >
          <Download size={16} />
        </button>
      </div>
    </div>
  );
};

const EmptyDocuments = ({ text }: { text: string }) => (
  <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 bg-white/[0.01] px-5 py-8 text-center">
    <Paperclip size={22} className="text-white/25" />
    <p className="text-sm text-white/45">{text}</p>
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
    resume_url:
      "https://example.com/media/instructor_applications/resumes/harshibar_resume.pdf",
    supporting_files: [
      {
        id: 1,
        name: "certificate-react.pdf",
        url: "https://example.com/media/instructor_applications/documents/certificate-react.pdf",
      },
      {
        id: 2,
        name: "reference-letter.pdf",
        url: "https://example.com/media/instructor_applications/documents/reference-letter.pdf",
      },
    ] as SupportingFile[],
  };

  // Local status so the Approve / Reject buttons are interactive in this
  // UI-only version. Swap for the real admin review call when wiring the API.
  const [status, setStatus] = useState<ApplicationStatus>("pending");

  // Document currently open in the preview lightbox (null = closed).
  const [previewFile, setPreviewFile] = useState<{
    name: string;
    url: string;
  } | null>(null);

  const statusStyles: Record<ApplicationStatus, string> = {
    pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
    approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    rejected: "border-red-500/20 bg-red-500/10 text-red-400",
  };

  const statusText: Record<ApplicationStatus, string> = {
    pending: "text-amber-400",
    approved: "text-emerald-400",
    rejected: "text-red-400",
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
    { label: "Portfolio", url: application.portfolio_url, icon: Globe },
    { label: "LinkedIn", url: application.linkedin_url, icon: ExternalLink },
    { label: "GitHub", url: application.github_url, icon: ExternalLink },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/applications")}
          className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
          style={{ animationDelay: "80ms" }}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
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
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {status}
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
              className={`mt-1 text-sm font-medium capitalize ${statusText[status]}`}
            >
              {status} review
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
                label="Occupation"
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

          {/* Resume / CV */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={FileText}
              title="Resume / CV"
              description="The applicant's primary resume document"
            />

            {application.resume_url ? (
              <DocumentCard
                name={application.resume_name}
                href={application.resume_url}
                primary
                onPreview={() =>
                  setPreviewFile({
                    name: application.resume_name,
                    url: application.resume_url,
                  })
                }
              />
            ) : (
              <EmptyDocuments text="No resume was submitted." />
            )}
          </section>

          {/* Supporting Documents */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 sm:p-6">
            <SectionHeading
              icon={FileText}
              title="Supporting Documents"
              description={
                application.supporting_files.length > 0
                  ? `${application.supporting_files.length} file${
                      application.supporting_files.length === 1 ? "" : "s"
                    } attached`
                  : "Certificates and other supporting files"
              }
            />

            {application.supporting_files.length > 0 ? (
              <div className="space-y-3">
                {application.supporting_files.map((file) => (
                  <DocumentCard
                    key={file.id}
                    name={file.name}
                    href={file.url}
                    thumbnailUrl={file.url}
                    onPreview={() =>
                      setPreviewFile({ name: file.name, url: file.url })
                    }
                  />
                ))}
              </div>
            ) : (
              <EmptyDocuments text="No supporting documents were submitted." />
            )}
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
                <span className={`capitalize ${statusText[status]}`}>
                  {status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-white/45">Experience</span>
                <span className="text-white/80">
                  {application.years_of_experience} years
                </span>
              </div>
            </div>

            {status === "pending" ? (
              <>
                <div className="my-5 border-t border-white/[0.08]" />

                <button
                  type="button"
                  onClick={() => setStatus("approved")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#34D399] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#6EE7B7]"
                >
                  <CheckCircle2 size={17} />
                  Approve Application
                </button>

                <button
                  type="button"
                  onClick={() => setStatus("rejected")}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/[0.04] px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                >
                  <XCircle size={17} />
                  Reject Application
                </button>
              </>
            ) : (
              <>
                <div className="my-5 border-t border-white/[0.08]" />

                <div
                  className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium capitalize ${statusStyles[status]}`}
                >
                  {status === "approved" ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <XCircle size={17} />
                  )}
                  Application {status}
                </div>

                <button
                  type="button"
                  onClick={() => setStatus("pending")}
                  className="mt-3 w-full rounded-xl border border-white/[0.1] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-[#34D399]/30 hover:text-white"
                >
                  Reset to pending
                </button>
              </>
            )}
          </section>
        </aside>
      </div>

      {/* File Preview Lightbox */}
      {previewFile && (
        <FilePreviewModal
          key={`${previewFile.name}-${previewFile.url}`}
          name={previewFile.name}
          url={previewFile.url}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </div>
  );
};

/* ================================================================
   FILE PREVIEW MODAL
   - Images render full-size straight from the URL.
   - PDFs are fetched into a same-origin blob: URL and shown in an
     iframe (sidesteps Content-Disposition / X-Frame-Options issues).
     If the fetch fails (e.g. CORS), a fallback with "open in new tab"
     is shown. Closes on backdrop click or Escape.
================================================================ */

type FilePreviewModalProps = {
  name: string;
  url: string;
  onClose: () => void;
};

const FilePreviewModal = ({ name, url, onClose }: FilePreviewModalProps) => {
  const meta = getFileMeta(name);
  const isPdf = name.toLowerCase().endsWith(".pdf");

  const [pdfSrc, setPdfSrc] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(isPdf);
  const [pdfError, setPdfError] = useState(false);

  // Lock scroll + close on Escape.
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

  // Fetch the PDF as a blob URL (images render fine from the direct URL).
  useEffect(() => {
    if (!isPdf) return;

    let objectUrl: string | null = null;
    let cancelled = false;

    const loadPdf = async () => {
      setIsPdfLoading(true);
      setPdfError(false);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const blob = await response.blob();
        const pdfBlob =
          blob.type === "application/pdf"
            ? blob
            : new Blob([blob], { type: "application/pdf" });

        objectUrl = window.URL.createObjectURL(pdfBlob);
        if (!cancelled) setPdfSrc(objectUrl);
      } catch (error) {
        console.error("Failed to load PDF preview:", error);
        if (!cancelled) setPdfError(true);
      } finally {
        if (!cancelled) setIsPdfLoading(false);
      }
    };

    loadPdf();

    return () => {
      cancelled = true;
      if (objectUrl) window.URL.revokeObjectURL(objectUrl);
    };
  }, [isPdf, url]);

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
        className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-[#34D399]/10"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent" />

        {/* Header */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-b from-[#34D399]/[0.06] to-transparent px-5 py-4">
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
              <p className="mt-0.5 text-xs text-white/45">
                {meta.image ? "Image" : `${meta.label} document`}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => downloadFile(name, url)}
              aria-label="Download"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:border-[#34D399]/40 hover:bg-[#34D399]/10 hover:text-[#34D399]"
            >
              <Download size={16} />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:border-[#34D399]/40 hover:bg-[#34D399]/10 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {/* Body */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[#060606] p-4">
          {meta.image ? (
            <img
              src={url}
              alt={name}
              className="mx-auto max-h-[70vh] w-auto max-w-full rounded-lg object-contain shadow-2xl shadow-black/50"
            />
          ) : isPdf ? (
            isPdfLoading ? (
              <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-[#34D399]" />
                <p className="text-sm text-white/45">Loading preview…</p>
              </div>
            ) : pdfError ? (
              <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <FileTypeIcon
                  meta={meta}
                  className="h-16 w-12 drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]"
                />
                <p className="text-sm font-medium text-white">
                  Couldn&apos;t load the preview
                </p>
                <p className="max-w-sm text-xs text-white/45">
                  The file host may be blocking inline previews. You can still
                  open it in a new tab.
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-2 rounded-lg border border-[#34D399]/30 bg-[#34D399]/10 px-4 py-2 text-sm font-medium text-[#34D399] transition hover:border-[#34D399]/50 hover:bg-[#34D399]/20"
                >
                  <ExternalLink size={16} />
                  Open in new tab
                </a>
              </div>
            ) : pdfSrc ? (
              <iframe
                src={pdfSrc}
                title={name}
                className="h-[70vh] w-full rounded-lg border border-white/10 bg-white"
              />
            ) : null
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

export default InstructorApplicationAdminDetailPage;
