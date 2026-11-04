import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BadgeCheck,
  BookOpen,
  Clock3,
  Compass,
  Copy,
  Download,
  GraduationCap,
  LayoutGrid,
  Medal,
  Search,
  Share2,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

import {
  certificates,
  formatIssueDate,
  type Certificate,
  type CertificateGrade,
} from "../data/certificateData";

/* ──────────────────────────────────────────────────────────────────
   My Certificates — the list. Reads the shared certificate records
   from ../data/certificateData so every card deep-links into the
   detail page (/student/certificates/:id) which reads the same data.
   Card details + styling mirror Explore Courses, My Learning and Saved
   so the whole student area reads as one system.
   ────────────────────────────────────────────────────────────────── */

type CertFilter =
  | "All"
  | "Development"
  | "Design"
  | "Business"
  | "Data Science";

const filters: { label: CertFilter; icon: typeof LayoutGrid }[] = [
  { label: "All", icon: LayoutGrid },
  { label: "Development", icon: BookOpen },
  { label: "Design", icon: Sparkles },
  { label: "Business", icon: Trophy },
  { label: "Data Science", icon: GraduationCap },
];

const GRADE_META: Record<
  CertificateGrade,
  { wrap: string; tint: string; icon: typeof Medal }
> = {
  Distinction: {
    wrap: "border-amber-300/35 bg-gradient-to-r from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95",
    tint: "text-amber-200",
    icon: Trophy,
  },
  Merit: {
    wrap: "border-violet-400/30 bg-violet-500/[0.12]",
    tint: "text-violet-200",
    icon: Medal,
  },
  Pass: {
    wrap: "border-emerald-400/30 bg-[#06251D]/90",
    tint: "text-emerald-300",
    icon: BadgeCheck,
  },
};

/* Only issued certificates belong on this page. */
const earnedCertificates = certificates.filter(
  (cert) => cert.status === "earned",
);

const CertificatePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<CertFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const openCertificate = (id: number) =>
    navigate(`/student/certificates/${id}`);

  /* Overall certificate statistics. */
  const stats = useMemo(() => {
    const total = earnedCertificates.length;
    const distinctions = earnedCertificates.filter(
      (c) => c.grade === "Distinction",
    ).length;
    const hours = earnedCertificates.reduce(
      (sum, c) => sum + (Number.parseFloat(c.duration) || 0),
      0,
    );
    const avgScore =
      total === 0
        ? 0
        : Math.round(
            earnedCertificates.reduce((sum, c) => sum + (c.score ?? 0), 0) /
              total,
          );

    return { total, distinctions, hours, avgScore };
  }, []);

  /* Most recently earned certificate — the hero. */
  const latest = useMemo(() => {
    return [...earnedCertificates].sort(
      (a, b) =>
        new Date(b.issuedAt ?? 0).getTime() -
        new Date(a.issuedAt ?? 0).getTime(),
    )[0];
  }, []);

  const filteredCertificates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return [...earnedCertificates]
      .sort(
        (a, b) =>
          new Date(b.issuedAt ?? 0).getTime() -
          new Date(a.issuedAt ?? 0).getTime(),
      )
      .filter((cert) => {
        const matchesFilter =
          activeFilter === "All" || cert.category === activeFilter;

        const matchesSearch =
          !query ||
          cert.title.toLowerCase().includes(query) ||
          cert.instructor.toLowerCase().includes(query) ||
          (cert.credentialId?.toLowerCase().includes(query) ?? false) ||
          cert.skills.some((skill) => skill.toLowerCase().includes(query));

        return matchesFilter && matchesSearch;
      });
  }, [activeFilter, searchQuery]);

  const copyCredential = (cert: Certificate) => {
    if (!cert.credentialId) return;

    navigator.clipboard?.writeText(cert.credentialId).then(
      () => {
        setCopiedId(cert.id);
        window.setTimeout(() => setCopiedId(null), 1600);
      },
      () => {
        /* Clipboard unavailable — fail quietly in the UI mock. */
      },
    );
  };

  const statCards = [
    {
      label: "Certificates",
      value: stats.total,
      icon: Award,
      tint: "text-violet-300",
      wrap: "border-violet-400/20 bg-violet-500/10",
    },
    {
      label: "Distinctions",
      value: stats.distinctions,
      icon: Trophy,
      tint: "text-amber-300",
      wrap: "border-amber-400/20 bg-amber-500/10",
    },
    {
      label: "Hours learned",
      value: stats.hours,
      icon: Clock3,
      tint: "text-cyan-300",
      wrap: "border-cyan-400/20 bg-cyan-500/10",
    },
    {
      label: "Avg. score",
      value: `${stats.avgScore}%`,
      icon: Star,
      tint: "text-emerald-300",
      wrap: "border-emerald-400/20 bg-emerald-500/10",
    },
  ];

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Glassy card sheen — plays only on hover (shared across the app) */}
      <style>{`
        @keyframes lp-card-sheen {
          0% { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateX(260%) skewX(-12deg); }
        }
        .lp-card-sheen { opacity: 0; transform: translateX(-150%) skewX(-12deg); }
        .group:hover .lp-card-sheen { animation: lp-card-sheen 1.1s ease-out; }
        @keyframes lp-seal-pulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.1); opacity: 0.9; }
        }
        .lp-seal-pulse { animation: lp-seal-pulse 3.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .lp-card-sheen, .lp-seal-pulse { animation: none !important; }
        }
      `}</style>

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div className="cursor-default">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
            Proof of your progress
          </p>

          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
            My{" "}
            <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
              Certificates
            </span>
          </h1>

          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            Every course you finish earns a verifiable certificate. Download,
            share, and celebrate how far you've come.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/student/courses")}
          className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 self-start rounded-xl border border-violet-400/25 bg-gradient-to-r from-violet-500/[0.12] to-purple-500/[0.08] px-5 py-3 text-sm font-semibold text-violet-200 shadow-sm shadow-violet-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-400/45 hover:bg-violet-500/[0.16] sm:self-center"
        >
          <Compass className="h-[17px] w-[17px] text-violet-300 transition-transform duration-300 group-hover:rotate-[-8deg]" />
          Earn more
        </button>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0D0C12] p-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-violet-400/25"
          >
            <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${stat.wrap}`}
            >
              <stat.icon className={`h-5 w-5 ${stat.tint}`} />
            </span>
            <div className="min-w-0">
              <p className="text-2xl font-semibold leading-none tabular-nums text-white">
                {stat.value}
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-wider text-white/40">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Latest certificate hero */}
      {latest && (
        <section className="group relative isolate overflow-hidden rounded-3xl border border-violet-400/20 bg-[#100C20]">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#17102D] via-[#100C20] to-[#11152B]" />
          <div className="absolute -right-16 -top-24 -z-10 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[100px]" />

          <div className="grid min-h-[300px] items-center md:grid-cols-[1.1fr_0.9fr]">
            {/* Left side - text + credential */}
            <div className="relative z-10 px-6 py-8 sm:px-9 lg:px-11 lg:py-11">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-violet-200 sm:text-xs">
                <Sparkles className="h-3.5 w-3.5" />
                LATEST ACHIEVEMENT
              </div>

              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/40">
                {latest.category} · {latest.level}
              </p>

              <h2 className="mt-2 max-w-xl text-2xl font-medium leading-[1.2] tracking-[-0.03em] sm:text-3xl">
                {latest.title}
              </h2>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {latest.grade &&
                  (() => {
                    const meta = GRADE_META[latest.grade];
                    const GradeIcon = meta.icon;
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${meta.wrap} ${meta.tint}`}
                      >
                        <GradeIcon className="h-3.5 w-3.5" />
                        {latest.grade}
                      </span>
                    );
                  })()}
                {latest.score !== null && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/65">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {latest.score}% score
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/65">
                  <BadgeCheck className="h-3.5 w-3.5 text-violet-300" />
                  Issued {formatIssueDate(latest.issuedAt)}
                </span>
              </div>

              {latest.credentialId && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0B0B0F] px-3.5 py-2.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/35">
                    Credential ID
                  </span>
                  <span className="font-mono text-xs font-semibold tracking-tight text-white/85">
                    {latest.credentialId}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCredential(latest)}
                    aria-label="Copy credential ID"
                    className="ml-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] text-white/55 transition hover:border-violet-400/35 hover:bg-violet-500/[0.08] hover:text-violet-200"
                  >
                    {copiedId === latest.id ? (
                      <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              )}

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => openCertificate(latest.id)}
                  className="group/button inline-flex cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                >
                  <Award className="h-4 w-4" />
                  View certificate
                </button>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/70 transition hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-white"
                >
                  <Download className="h-4 w-4 text-violet-300" />
                  Download PDF
                </button>
              </div>
            </div>

            {/* Right side - certificate visual */}
            <div className="relative hidden h-full min-h-[300px] md:block">
              <img
                src={latest.image}
                alt={latest.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#100C20] via-[#100C20]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100C20]/70 via-transparent to-[#100C20]/10" />

              {/* Floating seal */}
              <div className="absolute right-9 top-1/2 -translate-y-1/2">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <span className="lp-seal-pulse absolute inset-0 rounded-full border border-amber-300/30" />
                  <span className="lp-seal-pulse absolute inset-2 rounded-full border border-amber-300/20 [animation-delay:-1.7s]" />
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-[#3A2A0B] via-[#2B210D] to-[#17140B] shadow-[0_12px_40px_-12px_rgba(245,158,11,0.5)]">
                    <Award
                      className="h-9 w-9 text-amber-300"
                      strokeWidth={1.6}
                    />
                  </span>
                </div>
              </div>

              <div className="absolute bottom-7 left-7 right-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0B0B0D]/70 p-3.5 shadow-xl backdrop-blur-xl">
                <img
                  src={latest.instructorImage}
                  alt={latest.instructor}
                  loading="lazy"
                  className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {latest.instructor}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-white/50">
                    {latest.instructorRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certificate collection */}
      <section className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
              Your collection
            </h2>
            <p className="mt-1.5 text-sm font-normal leading-relaxed text-white/45">
              Every credential you've earned, ready to download or share.
            </p>
          </div>

          {/* Search */}
          <div className="group relative w-full min-w-0 lg:w-80">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35 transition-colors group-focus-within:text-violet-300" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by course, skill, or ID..."
              aria-label="Search certificates"
              className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0B0B0F] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 hover:border-white/15 focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map(({ label, icon: Icon }) => {
            const isActive = activeFilter === label;
            return (
              <button
                key={label}
                type="button"
                onClick={() => setActiveFilter(label)}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/[0.07] bg-[#0B0B0F] text-white/50 hover:border-white/15 hover:text-white/85"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {filteredCertificates.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredCertificates.map((cert) => {
              const grade = cert.grade ? GRADE_META[cert.grade] : null;
              const GradeIcon = grade?.icon ?? BadgeCheck;

              return (
                <article
                  key={cert.id}
                  className="group relative flex min-w-0 flex-col overflow-hidden rounded-[1.35rem] border border-white/[0.09] bg-[#0D0C12] transition-transform duration-700 ease-in-out hover:scale-[1.02]"
                >
                  {/* Glassy sheen — animates only while hovering */}
                  <span className="lp-card-sheen pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  {/* Certificate banner */}
                  <div className="relative h-44 overflow-hidden bg-[#14101D] sm:h-48">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      loading="lazy"
                      className="block h-full w-full object-cover opacity-55"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0C12] via-[#0D0C12]/45 to-transparent" />

                    {/* Grade badge */}
                    {grade && cert.grade && (
                      <div className="absolute left-3 top-3 z-20">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur-md ${grade.wrap} ${grade.tint}`}
                        >
                          <GradeIcon className="h-3.5 w-3.5" />
                          {cert.grade}
                        </span>
                      </div>
                    )}

                    {/* Verified seal */}
                    <div className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-[#3A2A0B]/95 via-[#2B210D]/95 to-[#17140B]/95 shadow-[0_4px_18px_rgba(245,158,11,0.2)] backdrop-blur-md">
                      <Award
                        className="h-5 w-5 text-amber-300"
                        strokeWidth={1.7}
                      />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                        Certificate of completion
                      </p>
                      <h3 className="mt-1 line-clamp-1 text-[15px] font-semibold leading-tight tracking-[-0.015em] text-white transition-colors duration-300 group-hover:text-violet-100">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  {/* Certificate information */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.08] px-3 py-1 text-[10px] font-medium text-violet-200">
                        {cert.category}
                      </span>
                      <span className="text-[11px] text-white/35">
                        {formatIssueDate(cert.issuedAt)}
                      </span>
                    </div>

                    {/* Score + meta */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-2 text-center">
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {cert.score ?? "—"}
                          {cert.score !== null ? "%" : ""}
                        </p>
                        <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
                          Score
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-2 text-center">
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {cert.lessons}
                        </p>
                        <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
                          Lessons
                        </p>
                      </div>
                      <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2.5 py-2 text-center">
                        <p className="text-sm font-semibold tabular-nums text-white">
                          {Number.parseFloat(cert.duration)}h
                        </p>
                        <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">
                          Hours
                        </p>
                      </div>
                    </div>

                    {/* Credential ID */}
                    {cert.credentialId && (
                      <button
                        type="button"
                        onClick={() => copyCredential(cert)}
                        aria-label={`Copy credential ID ${cert.credentialId}`}
                        className="mt-4 flex w-full cursor-pointer items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0B0B0F] px-3 py-2.5 text-left transition hover:border-violet-400/30 hover:bg-violet-500/[0.05]"
                      >
                        <span className="text-[9px] font-medium uppercase tracking-[0.14em] text-white/35">
                          ID
                        </span>
                        <span className="min-w-0 flex-1 truncate font-mono text-[11px] font-semibold text-white/80">
                          {cert.credentialId}
                        </span>
                        {copiedId === cert.id ? (
                          <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 shrink-0 text-white/40" />
                        )}
                      </button>
                    )}

                    {/* Instructor */}
                    <div className="mb-4 mt-4 flex items-center gap-3 border-t border-white/[0.07] pt-4">
                      <img
                        src={cert.instructorImage}
                        alt={cert.instructor}
                        loading="lazy"
                        className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium text-white/85">
                          {cert.instructor}
                        </p>
                        <p className="mt-1 truncate text-[10px] text-white/40">
                          {cert.instructorRole}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center gap-2 border-t border-white/[0.07] pt-4">
                      <button
                        type="button"
                        onClick={() => openCertificate(cert.id)}
                        className="group/button inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400/60"
                      >
                        <Award className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button
                        type="button"
                        aria-label={`Download ${cert.title} certificate`}
                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0B0B0F] text-white/60 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Share ${cert.title} certificate`}
                        className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-[#0B0B0F] text-white/60 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="relative overflow-hidden rounded-3xl border border-violet-400/[0.14] bg-gradient-to-br from-[#151025] via-[#100B1C] to-[#0B0813] px-6 py-14 text-center sm:px-10 sm:py-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-violet-500/[0.10] blur-[80px]" />

            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/[0.14] to-purple-500/[0.06] text-violet-200 shadow-inner shadow-violet-300/[0.04]">
              <Award className="h-[22px] w-[22px]" strokeWidth={1.6} />
            </div>

            <h2 className="relative mt-6 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {searchQuery || activeFilter !== "All"
                ? "No matching certificates"
                : "Your first certificate is waiting"}
            </h2>

            <p className="relative mx-auto mt-3 max-w-md text-sm leading-7 text-white/50">
              {searchQuery || activeFilter !== "All"
                ? "Try a different search or category to find what you're looking for."
                : "Finish a course to earn a verifiable certificate. Everything you complete will show up here, ready to download and share."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/student/courses")}
              className="group relative mt-7 inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-violet-300/20 bg-gradient-to-r from-[#7C3AED] to-[#6D4AFF] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200/30 hover:shadow-xl hover:shadow-violet-900/30"
            >
              <Compass className="h-[17px] w-[17px] transition-transform duration-300 group-hover:rotate-[-8deg]" />
              Explore courses
            </button>

            <div className="pointer-events-none absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
          </div>
        )}
      </section>
    </div>
  );
};

export default CertificatePage;
