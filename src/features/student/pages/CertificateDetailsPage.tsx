import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  Copy,
  Download,
  GraduationCap,
  Link2,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────
   TYPES + DATA (UI-only mock — wire to your real certificate API later)
   ────────────────────────────────────────────────────────────────── */

type CertificateDetail = {
  id: string;
  serial: string;
  courseTitle: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  recipient: string;
  issuedAt: string;
  completedAt: string;
  durationHours: number;
  lessons: number;
  grade: string;
  finalScore: number;
  credentialUrl: string;
  instructor: string;
  instructorRole: string;
  instructorImage: string;
  skills: string[];
};

// Replace with the student's certificate fetched by `certificateId`.
const certificate: CertificateDetail = {
  id: "cert-001",
  serial: "LP-2026-FSWD-8842",
  courseTitle: "Full Stack Web Development",
  category: "Development",
  level: "Intermediate",
  recipient: "Theo Thiyophin",
  issuedAt: "2026-10-28T12:00:00Z",
  completedAt: "2026-10-27T12:00:00Z",
  durationHours: 32,
  lessons: 48,
  grade: "Distinction",
  finalScore: 94,
  credentialUrl: "https://launchpoint.app/verify/LP-2026-FSWD-8842",
  instructor: "Sarah Mitchell",
  instructorRole: "Senior Full Stack Developer",
  instructorImage:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
  skills: ["React", "Django", "PostgreSQL", "REST APIs", "Deployment"],
};

const formatLongDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* ──────────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────────── */

const CertificateDetailsPage = () => {
  const navigate = useNavigate();
  const { certificateId } = useParams<{ certificateId: string }>();

  const [copied, setCopied] = useState(false);
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep the page usable in isolation — fall back to the mock when the URL
  // has no id. Wire this to a lookup by `certificateId` when the API lands.
  const data = useMemo(
    () => ({ ...certificate, id: certificateId ?? certificate.id }),
    [certificateId],
  );

  const copyCredential = () => {
    const done = () => {
      setCopied(true);
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
      copyTimeout.current = setTimeout(() => setCopied(false), 1800);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(data.credentialUrl).then(done).catch(done);
    } else {
      done();
    }
  };

  const stats = [
    { icon: Clock3, label: "Duration", value: `${data.durationHours} hours` },
    { icon: GraduationCap, label: "Lessons", value: `${data.lessons} lessons` },
    { icon: Star, label: "Final score", value: `${data.finalScore}%` },
    { icon: Award, label: "Result", value: data.grade },
  ];

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Shared hover sheen + certificate shimmer */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }
        @keyframes lp-cert-shine {
          0% { transform: translateX(-130%) skewX(-18deg); }
          100% { transform: translateX(320%) skewX(-18deg); }
        }
        .lp-cert-shine { animation: lp-cert-shine 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen, .lp-cert-shine { animation: none !important; }
        }
        @media print {
          .lp-no-print { display: none !important; }
        }
      `}</style>

      {/* Top bar — back + breadcrumb */}
      <div className="lp-no-print flex min-w-0 flex-wrap items-center gap-3.5">
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
          className="flex min-w-0 items-center gap-2 text-[11px] italic tracking-[-0.01em] sm:text-xs"
        >
          <button
            type="button"
            onClick={() => navigate("/student/certificates")}
            className="hidden shrink-0 cursor-pointer font-semibold text-white/45 transition-colors duration-200 hover:text-white/75 sm:inline"
          >
            Certificates
          </button>
          <span className="hidden h-3.5 w-px shrink-0 bg-violet-300/30 sm:block" />
          <span className="min-w-0 truncate bg-gradient-to-r from-violet-100 via-purple-200 to-indigo-200 bg-clip-text font-bold tracking-[-0.025em] text-transparent">
            {data.courseTitle}
          </span>
        </nav>
      </div>

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="cursor-default">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
            Verified Credential
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
            Certificate of{" "}
            <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
              Completion
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            A record of the skills you&apos;ve earned — ready to download,
            share, or verify.
          </p>
        </div>

        <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-2.5 text-xs font-semibold text-emerald-300 sm:self-auto">
          <ShieldCheck className="h-4 w-4" />
          Authenticity verified
        </span>
      </section>

      {/* Two-column layout: certificate on the left, details on the right */}
      <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        {/* ── LEFT: the certificate artwork ──────────────────────────── */}
        <div className="min-w-0 space-y-8">
          <section className="group relative isolate overflow-hidden rounded-[28px] border border-violet-400/20 bg-gradient-to-br from-[#17102D] via-[#120C22] to-[#0B0814] p-6 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] sm:p-8">
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-indigo-500/10 blur-[100px]" />
            {/* Moving shine */}
            <span className="lp-cert-shine pointer-events-none absolute inset-y-0 left-0 z-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

            {/* Inner framed certificate */}
            <div className="relative z-10 rounded-[22px] border border-violet-300/15 bg-[#0B0814]/60 p-6 ring-1 ring-white/[0.04] sm:p-9">
              {/* Corner flourishes */}
              <span className="pointer-events-none absolute left-4 top-4 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-violet-400/40" />
              <span className="pointer-events-none absolute right-4 top-4 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-violet-400/40" />
              <span className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 rounded-bl-xl border-b-2 border-l-2 border-violet-400/40" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 rounded-br-xl border-b-2 border-r-2 border-violet-400/40" />

              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/25 to-violet-500/0 text-violet-200 shadow-inner shadow-violet-300/10">
                  <Award className="h-8 w-8" />
                </span>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.34em] text-violet-300/80">
                  Launch Point
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/40">
                  Certificate of Completion
                </p>

                <p className="mt-7 text-sm text-white/50">
                  This certifies that
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {data.recipient}
                </h2>

                <div className="mx-auto mt-5 h-px w-40 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

                <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                  has successfully completed the{" "}
                  <span className="font-semibold text-white/85">
                    {data.level}
                  </span>{" "}
                  course
                </p>
                <h3 className="mt-2 max-w-lg bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-xl font-semibold leading-snug tracking-[-0.015em] text-transparent sm:text-2xl">
                  {data.courseTitle}
                </h3>

                {/* Skills */}
                <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-white/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: signature + seal + dates */}
              <div className="mt-9 grid grid-cols-1 items-end gap-6 border-t border-white/[0.07] pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3 text-left">
                  <img
                    src={data.instructorImage}
                    alt={data.instructor}
                    loading="lazy"
                    className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-white/85">
                      {data.instructor}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/40">
                      {data.instructorRole}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/30 bg-gradient-to-br from-[#3A2A0B] to-[#17140B] text-amber-300 shadow-[0_4px_18px_rgba(245,158,11,0.18)]">
                    <BadgeCheck className="h-6 w-6" />
                  </span>
                  <p className="mt-1.5 text-[9px] uppercase tracking-[0.18em] text-white/35">
                    Official Seal
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                    Issued on
                  </p>
                  <p className="mt-1 text-xs font-medium text-white/80">
                    {formatLongDate(data.issuedAt)}
                  </p>
                  <p className="mt-2 text-[10px] text-white/35">
                    Serial&nbsp;·&nbsp;
                    <span className="font-medium tracking-wide text-violet-300/80">
                      {data.serial}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Actions */}
          <section className="lp-no-print grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="group/button inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
            >
              <Download className="h-4 w-4 transition-transform group-hover/button:translate-y-0.5" />
              Download PDF
            </button>

            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0E0A1A] px-5 py-3.5 text-sm font-medium text-white/65 transition-colors duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-violet-100"
            >
              {/* <Linkedin className="h-4 w-4" /> */}
              Add to LinkedIn
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-[#0E0A1A] px-5 py-3.5 text-sm font-medium text-white/65 transition-colors duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-violet-100"
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </section>
        </div>

        {/* ── RIGHT: meta + verification ─────────────────────────────── */}
        <aside className="space-y-6 xl:sticky xl:top-6">
          {/* Completion summary */}
          <section className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-br from-[#7C3AED] to-[#6D4AFF] p-6 shadow-[0_24px_60px_-28px_rgba(124,58,237,0.7)]">
            <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Course Completed
            </p>
            <div className="relative mt-3 flex items-end gap-2.5">
              <span className="text-4xl font-bold leading-none tracking-tight text-white">
                {data.finalScore}%
              </span>
              <span className="pb-0.5 text-xs leading-snug text-white/75">
                Final score
                <br />
                {data.grade}
              </span>
            </div>
            <div className="relative mt-5 flex items-center gap-2 text-xs text-white/85">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Completed {formatLongDate(data.completedAt)}
            </div>
          </section>

          {/* Credential details */}
          <section className="relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814] p-5">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
            <h2 className="mb-4 flex items-center gap-2 px-1 text-sm font-semibold tracking-tight text-white">
              <Sparkles className="h-4 w-4 text-violet-300" />
              Credential Details
            </h2>

            <dl className="space-y-0.5">
              {[
                { label: "Category", value: data.category },
                { label: "Level", value: data.level },
                { label: "Recipient", value: data.recipient },
                { label: "Instructor", value: data.instructor },
                { label: "Serial number", value: data.serial },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.025]"
                >
                  <dt className="shrink-0 text-xs text-white/45">
                    {row.label}
                  </dt>
                  <dd className="min-w-0 truncate text-right text-xs font-medium text-white/85">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Course quick stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5"
                  >
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40">
                      <Icon className="h-3.5 w-3.5 text-violet-300" />
                      {stat.label}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white/90">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Verification */}
          <section className="relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-gradient-to-b from-[#0B1A14] to-[#070D0B] p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/25 bg-emerald-500/10 text-emerald-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  Verifiable credential
                </p>
                <p className="mt-1 text-[11px] leading-5 text-white/45">
                  Anyone with the link below can confirm this certificate is
                  authentic.
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B0B0F] px-3 py-2.5">
              <Link2 className="h-4 w-4 shrink-0 text-emerald-300/80" />
              <span className="min-w-0 flex-1 truncate text-[11px] text-white/60">
                {data.credentialUrl}
              </span>
              <button
                type="button"
                onClick={copyCredential}
                aria-label="Copy verification link"
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
                  copied
                    ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                    : "border-white/[0.1] bg-white/[0.03] text-white/65 hover:border-emerald-400/35 hover:text-emerald-200"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              className="mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/[0.08] px-4 py-2.5 text-xs font-semibold text-emerald-200 transition hover:border-emerald-400/45 hover:bg-emerald-500/[0.14] focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share certificate
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CertificateDetailsPage;
