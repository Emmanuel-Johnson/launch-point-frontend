import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  Award,
  Search,
  Download,
  Eye,
  CalendarDays,
  BookOpen,
  ShieldCheck,
  GraduationCap,
  LockKeyhole,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { certificates } from "./certificateData";
import type { Certificate } from "./certificateData";

type FilterType = "all" | "earned" | "in-progress";

export default function CertificatePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const earnedCount = certificates.filter(
    (certificate) => certificate.status === "earned",
  ).length;

  const inProgressCount = certificates.filter(
    (certificate) => certificate.status === "in-progress",
  ).length;

  const filteredCertificates = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return certificates.filter((certificate) => {
      const matchesSearch =
        certificate.title.toLowerCase().includes(normalizedSearch) ||
        certificate.category.toLowerCase().includes(normalizedSearch) ||
        certificate.instructor.toLowerCase().includes(normalizedSearch);

      const matchesFilter = filter === "all" || certificate.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const handleDownload = (certificate: Certificate) => {
    if (certificate.status !== "earned") return;

    // TODO: Replace with your certificate download API.
    console.info(`Download certificate: ${certificate.certificateNumber}`);
  };

  const clearFilters = () => {
    setSearch("");
    setFilter("all");
  };

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-violet-400">
              <GraduationCap size={18} />
              <span>Student Portal</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Certificates
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Celebrate your achievements and track the certificates you earn
              throughout your learning journey.
            </p>
          </div>

          <div className="flex w-fit items-center gap-3 rounded-xl border border-violet-500/20 bg-violet-500/10 px-4 py-3">
            <ShieldCheck className="text-violet-400" size={22} />
            <div>
              <p className="text-xs text-gray-400">Certificates earned</p>
              <p className="text-lg font-semibold">{earnedCount}</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={<Award size={21} />}
            label="Earned certificates"
            value={earnedCount}
            description="Successfully completed courses"
            iconClass="bg-violet-500/10 text-violet-400"
          />

          <StatCard
            icon={<BookOpen size={21} />}
            label="In progress"
            value={inProgressCount}
            description="Courses you are working toward"
            iconClass="bg-blue-500/10 text-blue-400"
          />

          <StatCard
            icon={<ShieldCheck size={21} />}
            label="Total achievements"
            value={earnedCount}
            description="Certificates ready to collect"
            iconClass="bg-emerald-500/10 text-emerald-400"
          />
        </div>

        {/* Search and filters */}
        <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#101016] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search certificates..."
              aria-label="Search certificates"
              className="w-full rounded-xl border border-white/10 bg-[#0A0A10] py-3 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(
              [
                { label: "All", value: "all" },
                { label: "Earned", value: "earned" },
                { label: "In progress", value: "in-progress" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFilter(option.value)}
                aria-pressed={filter === option.value}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  filter === option.value
                    ? "bg-violet-600 text-white"
                    : "border border-white/10 bg-white/[0.03] text-gray-400 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate list */}
        <section>
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Your achievements</h2>
            <span className="text-sm text-gray-500">
              {filteredCertificates.length} results
            </span>
          </div>

          {filteredCertificates.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onView={() =>
                    navigate(`/student/certificates/${certificate.id}`)
                  }
                  onDownload={() => handleDownload(certificate)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#101016] px-6 py-16 text-center">
              <Award size={38} className="mx-auto mb-4 text-gray-600" />

              <h3 className="font-semibold text-gray-200">
                No certificates found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try another search or choose a different filter.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  description: string;
  iconClass: string;
}

function StatCard({
  icon,
  label,
  value,
  description,
  iconClass,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101016] p-5 transition hover:border-violet-500/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>
      </div>

      <p className="mt-4 text-xs text-gray-500">{description}</p>
    </div>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
  onView: () => void;
  onDownload: () => void;
}

function CertificateCard({
  certificate,
  onView,
  onDownload,
}: CertificateCardProps) {
  const isEarned = certificate.status === "earned";

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101016] transition hover:border-violet-500/30">
      {/* Certificate illustration */}
      <div className="relative overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-violet-950/70 via-[#171326] to-[#0C0C12] p-6 sm:p-8">
        <div className="absolute -right-10 -top-10 size-40 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/20" />

        <div className="relative flex min-h-36 items-center gap-5 sm:min-h-40">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/10 sm:size-20">
            {isEarned ? (
              <Award size={38} className="text-violet-300 sm:size-11" />
            ) : (
              <LockKeyhole size={34} className="text-gray-500 sm:size-10" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300 sm:text-xs">
              Launch Point LMS
            </p>

            <p className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">
              {isEarned ? "Certificate of Completion" : "Keep Learning"}
            </p>

            <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-400">
              {certificate.title}
            </p>
          </div>
        </div>

        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
              isEarned
                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
            }`}
          >
            {isEarned ? "Earned" : "In progress"}
          </span>
        </div>
      </div>

      {/* Certificate information */}
      <div className="p-5">
        <h3 className="font-semibold leading-6 text-white">
          {certificate.title}
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Instructor: {certificate.instructor}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
          <span className="rounded-lg border border-white/[0.07] px-2.5 py-1.5">
            {certificate.category}
          </span>

          {isEarned && certificate.issuedAt && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {new Date(`${certificate.issuedAt}T00:00:00`).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </span>
          )}
        </div>

        {!isEarned && (
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-gray-400">Course progress</span>
              <span className="font-medium text-violet-300">
                {certificate.progress}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-violet-500 transition-all"
                style={{ width: `${certificate.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onView}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-white"
          >
            <Eye size={16} />
            View details
          </button>

          {isEarned && (
            <button
              type="button"
              onClick={onDownload}
              aria-label={`Download ${certificate.title}`}
              title="Download certificate"
              className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-white transition hover:bg-violet-500"
            >
              <Download size={17} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
