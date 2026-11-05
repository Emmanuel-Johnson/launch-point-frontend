import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Award,
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
  director: string;
  directorRole: string;
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
  instructorRole: "Course Instructor",
  instructorImage:
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
  director: "Daniel Pereira",
  directorRole: "Program Director",
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
      {/* Fonts + shared keyframes + print rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Pinyon+Script&family=EB+Garamond:wght@400;500;600&display=swap');

        .lp-serif { font-family: 'Cormorant Garamond', 'EB Garamond', Georgia, 'Times New Roman', serif; }
        .lp-body  { font-family: 'EB Garamond', Georgia, 'Times New Roman', serif; }
        .lp-script { font-family: 'Pinyon Script', 'Brush Script MT', cursive; }

        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }

        @keyframes lp-seal-spin { to { transform: rotate(360deg); } }
        .lp-seal-ring { animation: lp-seal-spin 26s linear infinite; transform-origin: center; }

        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen, .lp-seal-ring { animation: none !important; }
        }
        @media print {
          .lp-no-print { display: none !important; }
          .lp-cert-paper { box-shadow: none !important; }
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
        {/* ── LEFT: the printed certificate ──────────────────────────── */}
        <div className="min-w-0 space-y-8">
          <section className="group relative isolate overflow-hidden rounded-[22px] bg-gradient-to-br from-[#17102D] via-[#120C22] to-[#0B0814] p-4 shadow-[0_30px_90px_-40px_rgba(0,0,0,0.9)] sm:p-6">
            {/* Hover sheen over the frame */}
            <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

            {/* ── The paper ──────────────────────────────────────────── */}
            <article
              className="lp-cert-paper lp-body relative mx-auto aspect-[1.414/1] w-full overflow-hidden rounded-[6px] text-[#2c2416] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.65)]"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 0%, #fffdf6 0%, #faf5e6 45%, #f3ead3 100%)",
              }}
              aria-label={`Certificate of completion for ${data.recipient}`}
            >
              {/* Guilloché / engraved background texture */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern
                    id="lp-guilloche"
                    width="28"
                    height="28"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <circle
                      cx="14"
                      cy="14"
                      r="11"
                      fill="none"
                      stroke="#b9972f"
                      strokeWidth="0.4"
                    />
                  </pattern>
                  <radialGradient id="lp-vignette" cx="50%" cy="42%" r="75%">
                    <stop offset="60%" stopColor="#000000" stopOpacity="0" />
                    <stop
                      offset="100%"
                      stopColor="#7a5a10"
                      stopOpacity="0.10"
                    />
                  </radialGradient>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#lp-guilloche)"
                  opacity="0.06"
                />
                <rect width="100%" height="100%" fill="url(#lp-vignette)" />
              </svg>

              {/* Large faint watermark monogram */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Award
                  className="h-[46%] w-[46%] text-[#c9a227]"
                  style={{ opacity: 0.06 }}
                  strokeWidth={1}
                />
              </div>

              {/* Ornamental gold double border */}
              <div className="pointer-events-none absolute inset-[3%] rounded-[4px] border-[3px] border-[#c9a227]" />
              <div className="pointer-events-none absolute inset-[3%] rounded-[4px] border border-[#8a6d1a]/60" />
              <div className="pointer-events-none absolute inset-[5.2%] rounded-[2px] border border-[#c9a227]/50" />

              {/* Corner flourishes */}
              {(
                [
                  "left-[3%] top-[3%]",
                  "right-[3%] top-[3%] -scale-x-100",
                  "left-[3%] bottom-[3%] -scale-y-100",
                  "right-[3%] bottom-[3%] -scale-x-100 -scale-y-100",
                ] as const
              ).map((pos) => (
                <svg
                  key={pos}
                  className={`pointer-events-none absolute ${pos} h-[12%] w-[12%] text-[#b9972f]`}
                  viewBox="0 0 60 60"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6 L30 6 M6 6 L6 30 M6 6 Q26 10 22 26 Q12 22 6 22 M14 14 Q24 16 22 24"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <circle cx="6" cy="6" r="2.4" fill="currentColor" />
                </svg>
              ))}

              {/* ── Certificate content ──────────────────────────────── */}
              <div className="relative z-10 flex h-full flex-col items-center justify-between px-[9%] py-[6.5%] text-center">
                {/* Header */}
                <div className="flex flex-col items-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#c9a227] bg-[#fdf6e3] text-[#9a7b16] shadow-sm sm:h-14 sm:w-14">
                    <Award className="h-5 w-5 sm:h-7 sm:w-7" />
                  </span>
                  <p className="lp-serif mt-2.5 text-[11px] font-semibold uppercase tracking-[0.38em] text-[#9a7b16] sm:text-sm">
                    Launch Point
                  </p>
                  <h2 className="lp-serif mt-1 text-xl font-bold uppercase tracking-[0.18em] text-[#2c2416] sm:text-3xl">
                    Certificate of Completion
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-px w-8 bg-[#c9a227] sm:w-12" />
                    <span className="h-1.5 w-1.5 rotate-45 bg-[#c9a227]" />
                    <span className="h-px w-8 bg-[#c9a227] sm:w-12" />
                  </div>
                </div>

                {/* Recipient */}
                <div className="flex flex-col items-center">
                  <p className="lp-serif text-[11px] italic tracking-wide text-[#5c5240] sm:text-sm">
                    This certificate is proudly presented to
                  </p>
                  <p className="lp-script mt-1 text-4xl leading-tight text-[#1f1a0f] sm:mt-2 sm:text-6xl">
                    {data.recipient}
                  </p>
                  <div className="mt-1 h-px w-48 bg-gradient-to-r from-transparent via-[#9a7b16]/60 to-transparent sm:w-72" />
                </div>

                {/* Body */}
                <div className="flex flex-col items-center">
                  <p className="lp-body max-w-md text-[11px] leading-relaxed text-[#4a4332] sm:text-[15px]">
                    for successfully completing the{" "}
                    <span className="font-semibold text-[#2c2416]">
                      {data.level.toLowerCase()}
                    </span>{" "}
                    course
                  </p>
                  <h3 className="lp-serif mt-1 max-w-lg text-lg font-bold leading-snug text-[#7c3a0e] sm:text-2xl">
                    {data.courseTitle}
                  </h3>
                  <p className="lp-body mt-1 text-[10px] text-[#5c5240] sm:text-xs">
                    Completed {formatLongDate(data.completedAt)} · Final score{" "}
                    {data.finalScore}% · {data.grade}
                  </p>

                  {/* Skills */}
                  <div className="mt-2 hidden flex-wrap justify-center gap-1.5 sm:flex">
                    {data.skills.map((skill) => (
                      <span
                        key={skill}
                        className="lp-body rounded-full border border-[#c9a227]/50 bg-[#fdf6e3] px-2.5 py-0.5 text-[10px] text-[#6b5a1e]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: signatures + seal */}
                <div className="grid w-full grid-cols-3 items-end gap-2">
                  {/* Instructor signature */}
                  <div className="flex flex-col items-center">
                    <span className="lp-script text-xl leading-none text-[#1f1a0f] sm:text-3xl">
                      {data.instructor}
                    </span>
                    <span className="mt-1 h-px w-full max-w-[9rem] bg-[#2c2416]/70" />
                    <span className="lp-serif mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#4a4332] sm:text-[10px]">
                      {data.instructor}
                    </span>
                    <span className="lp-body text-[7px] text-[#7a6f58] sm:text-[9px]">
                      {data.instructorRole}
                    </span>
                  </div>

                  {/* Gold seal */}
                  <div className="flex flex-col items-center">
                    <div className="relative flex h-14 w-14 items-center justify-center sm:h-20 sm:w-20">
                      {/* ribbon tails */}
                      <span className="absolute -bottom-3 left-1/2 h-6 w-2.5 -translate-x-[140%] rotate-[14deg] bg-gradient-to-b from-[#c9a227] to-[#9a7b16] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] sm:h-9 sm:w-3.5" />
                      <span className="absolute -bottom-3 left-1/2 h-6 w-2.5 -translate-x-[-40%] -rotate-[14deg] bg-gradient-to-b from-[#c9a227] to-[#9a7b16] [clip-path:polygon(0_0,100%_0,100%_100%,50%_78%,0_100%)] sm:h-9 sm:w-3.5" />
                      {/* medallion */}
                      <svg
                        viewBox="0 0 100 100"
                        className="relative h-full w-full drop-shadow-[0_2px_4px_rgba(122,90,16,0.4)]"
                        aria-hidden="true"
                      >
                        <circle cx="50" cy="50" r="46" fill="#d9b63a" />
                        <circle
                          cx="50"
                          cy="50"
                          r="46"
                          fill="none"
                          stroke="#9a7b16"
                          strokeWidth="2"
                        />
                        <g className="lp-seal-ring">
                          {Array.from({ length: 40 }).map((_, i) => {
                            const a = (i / 40) * Math.PI * 2;
                            return (
                              <circle
                                key={i}
                                cx={50 + 41 * Math.cos(a)}
                                cy={50 + 41 * Math.sin(a)}
                                r="1.5"
                                fill="#9a7b16"
                              />
                            );
                          })}
                        </g>
                        <circle
                          cx="50"
                          cy="50"
                          r="33"
                          fill="none"
                          stroke="#9a7b16"
                          strokeWidth="1.4"
                        />
                        <circle cx="50" cy="50" r="30" fill="#e7c84f" />
                      </svg>
                      <Award className="absolute h-5 w-5 text-[#7a5a10] sm:h-8 sm:w-8" />
                    </div>
                    <span className="lp-serif mt-3 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#9a7b16] sm:text-[9px]">
                      Official Seal
                    </span>
                  </div>

                  {/* Director signature */}
                  <div className="flex flex-col items-center">
                    <span className="lp-script text-xl leading-none text-[#1f1a0f] sm:text-3xl">
                      {data.director}
                    </span>
                    <span className="mt-1 h-px w-full max-w-[9rem] bg-[#2c2416]/70" />
                    <span className="lp-serif mt-1 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#4a4332] sm:text-[10px]">
                      {data.director}
                    </span>
                    <span className="lp-body text-[7px] text-[#7a6f58] sm:text-[9px]">
                      {data.directorRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* Serial strip */}
              <div className="lp-body absolute inset-x-0 bottom-[3.4%] z-10 text-center text-[7px] tracking-[0.14em] text-[#9a7b16] sm:text-[9px]">
                Serial&nbsp;·&nbsp;{data.serial}&nbsp;&nbsp;|&nbsp;&nbsp;Issued{" "}
                {formatLongDate(data.issuedAt)}&nbsp;&nbsp;|&nbsp;&nbsp;Verify
                at launchpoint.app/verify
              </div>
            </article>
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
