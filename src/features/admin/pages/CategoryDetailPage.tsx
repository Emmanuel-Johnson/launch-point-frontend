import {
  ArrowLeft,
  Ban,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Hash,
  Link2,
  Tags,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  courseCount: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Web Development",
    slug: "web-development",
    description:
      "Courses related to frontend, backend, and full-stack development.",
    courseCount: 12,
    is_active: true,
    created_at: "2024-11-02T09:24:00Z",
    updated_at: "2025-06-18T14:10:00Z",
  },
  {
    id: 2,
    name: "Python",
    slug: "python",
    description: "Learn Python programming from beginner to advanced level.",
    courseCount: 8,
    is_active: true,
    created_at: "2024-12-15T11:05:00Z",
    updated_at: "2025-05-30T08:42:00Z",
  },
  {
    id: 3,
    name: "Data Science",
    slug: "data-science",
    description: "Data analysis, machine learning, and data science courses.",
    courseCount: 6,
    is_active: false,
    created_at: "2025-01-20T16:30:00Z",
    updated_at: "2025-04-11T10:15:00Z",
  },
  {
    id: 4,
    name: "UI/UX Design",
    slug: "ui-ux-design",
    description: "User interface and user experience design courses.",
    courseCount: 5,
    is_active: true,
    created_at: "2025-02-08T13:48:00Z",
    updated_at: "2025-07-01T09:00:00Z",
  },
];

const CategoryDetailPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const matchedCategory = useMemo(
    () => categories.find((category) => String(category.id) === categoryId),
    [categoryId],
  );

  const [category, setCategory] = useState<Category | undefined>(
    matchedCategory,
  );

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getInitials = (name: string) =>
    name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const handleToggleStatus = () => {
    setCategory((current) =>
      current ? { ...current, is_active: !current.is_active } : current,
    );
  };

  // =========================================================
  // Not Found
  // =========================================================
  if (!category) {
    return (
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            Back to Categories
          </button>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] px-6 py-20 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
              <Tags className="h-6 w-6" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-white">
              Category not found
            </h3>

            <p className="mt-1 text-xs text-white/40">
              The category you're looking for doesn't exist or may have been
              removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/admin/categories")}
          className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          style={{ animationDelay: "80ms" }}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Header */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "160ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] p-7 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.06] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Identity */}
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-lg font-semibold text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#34D399]/25">
                  {getInitials(category.name)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold tracking-tight [overflow-wrap:anywhere]">
                      {category.name}
                    </h1>

                    <span
                      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-medium ring-1 ring-inset ${
                        category.is_active
                          ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                          : "bg-red-400/10 text-red-400 ring-red-400/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          category.is_active ? "bg-[#34D399]" : "bg-red-400"
                        }`}
                      />
                      {category.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/45">
                    <Link2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="[overflow-wrap:anywhere]">
                      {category.slug}
                    </span>
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <button
                type="button"
                onClick={handleToggleStatus}
                className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-all duration-700 ease-out hover:scale-[1.03] ${
                  category.is_active
                    ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                    : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                }`}
              >
                {category.is_active ? (
                  <>
                    <Ban className="h-4 w-4" strokeWidth={1.8} />
                    Disable Category
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
                    Enable Category
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Courses */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
            style={{ animationDelay: "240ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Total Courses
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  {category.courseCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Status */}
          <div
            className={`animate-page-item group relative cursor-default overflow-hidden rounded-2xl border bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 ${
              category.is_active
                ? "border-[#34D399]/25 hover:border-[#34D399]/40"
                : "border-red-400/20 hover:border-red-400/35"
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                category.is_active ? "via-[#34D399]/50" : "via-red-400/40"
              }`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Status
                </p>

                <p
                  className={`mt-3 text-3xl font-semibold ${
                    category.is_active ? "text-[#34D399]" : "text-red-400"
                  }`}
                >
                  {category.is_active ? "Active" : "Inactive"}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-inset ${
                  category.is_active
                    ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                    : "bg-red-400/10 text-red-400 ring-red-400/20"
                }`}
              >
                {category.is_active ? (
                  <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                ) : (
                  <Ban className="h-5 w-5" strokeWidth={1.8} />
                )}
              </div>
            </div>
          </div>

          {/* Category ID */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
            style={{ animationDelay: "360ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                  Category ID
                </p>

                <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                  #{category.id}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                <Hash className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Category Information */}
        <section
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          style={{ animationDelay: "440ms" }}
        >
          <div className="border-b border-white/[0.08] p-5 cursor-default">
            <h2 className="text-lg font-semibold tracking-tight">
              Category Information
            </h2>

            <p className="mt-1 text-xs text-white/45">
              Full details for this category.
            </p>
          </div>

          <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2">
            {/* Name */}
            <InfoRow
              icon={<Tags className="h-4 w-4" strokeWidth={1.8} />}
              label="Name"
              value={category.name}
            />

            {/* Slug */}
            <InfoRow
              icon={<Link2 className="h-4 w-4" strokeWidth={1.8} />}
              label="Slug"
              value={category.slug}
            />

            {/* Courses */}
            <InfoRow
              icon={<BookOpen className="h-4 w-4" strokeWidth={1.8} />}
              label="Courses"
              value={`${category.courseCount} courses`}
            />

            {/* Status */}
            <InfoRow
              icon={
                category.is_active ? (
                  <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
                ) : (
                  <Ban className="h-4 w-4" strokeWidth={1.8} />
                )
              }
              label="Status"
              value={category.is_active ? "Active" : "Inactive"}
              valueClassName={
                category.is_active ? "text-[#34D399]" : "text-red-400"
              }
            />

            {/* Created */}
            <InfoRow
              icon={<CalendarDays className="h-4 w-4" strokeWidth={1.8} />}
              label="Created"
              value={formatDateTime(category.created_at)}
            />

            {/* Updated */}
            <InfoRow
              icon={<Clock className="h-4 w-4" strokeWidth={1.8} />}
              label="Last Updated"
              value={formatDateTime(category.updated_at)}
            />
          </div>

          {/* Description */}
          <div className="border-t border-white/[0.06] p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/45">
              <Tags className="h-4 w-4" strokeWidth={1.8} />
              Description
            </div>

            <p className="mt-3 text-sm leading-relaxed text-white/70 [overflow-wrap:anywhere]">
              {category.description || "No description provided."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

// =========================================================
// Info Row
// =========================================================
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
}

const InfoRow = ({ icon, label, value, valueClassName }: InfoRowProps) => (
  <div className="flex items-start gap-3 bg-[#0A0A0A] px-6 py-5">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/50">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-medium text-white [overflow-wrap:anywhere] ${
          valueClassName ?? ""
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

export default CategoryDetailPage;
