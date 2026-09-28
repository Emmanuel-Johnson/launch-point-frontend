import {
  ArrowLeft,
  Ban,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  Hash,
  Link2,
  Pencil,
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

  const handleEditCategory = () => {
    if (!category) return;

    console.log("Edit category", category.id);
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

          <div className="flex flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#0C0C0C] to-[#070707] px-6 py-20 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_20px_60px_-20px_rgba(0,0,0,0.9)]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.06] to-white/[0.02] text-white/30 ring-1 ring-inset ring-white/[0.06]">
              <Tags className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-sm font-medium text-white">
              Category not found
            </h3>

            <p className="mt-1.5 text-xs leading-relaxed text-white/40">
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
          className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
          style={{ animationDelay: "80ms" }}
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back
        </button>

        {/* Header */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "160ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/[0.18] bg-gradient-to-br from-[#0C0C0C] via-[#070707] to-[#040404] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_24px_60px_-16px_rgba(0,0,0,0.85)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/[0.18] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.05] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
            />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Identity */}
              <div className="flex min-w-0 items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/[0.22] via-[#34D399]/[0.08] to-transparent text-lg font-semibold tracking-tight text-[#34D399] shadow-[inset_0_1px_0_0_rgba(232,198,122,0.22),0_8px_24px_-8px_rgba(52,211,153,0.35)] ring-1 ring-inset ring-[#34D399]/30">
                  {getInitials(category.name)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-[26px] font-semibold leading-tight tracking-tight [overflow-wrap:anywhere]">
                      {category.name}
                    </h1>

                    <span
                      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-medium ring-1 ring-inset ${
                        category.is_active
                          ? "bg-[#34D399]/[0.12] text-[#34D399] ring-[#34D399]/25"
                          : "bg-red-400/[0.12] text-red-400 ring-red-400/25"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          category.is_active
                            ? "bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                            : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                        }`}
                      />
                      {category.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/[0.03] px-2.5 py-1 text-sm text-white/50 ring-1 ring-inset ring-white/[0.05]">
                    <Link2 className="h-3.5 w-3.5 shrink-0 text-white/35" />
                    <span className="font-mono text-[13px] [overflow-wrap:anywhere]">
                      {category.slug}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                {/* Edit */}
                <button
                  type="button"
                  onClick={handleEditCategory}
                  className="group/edit relative inline-flex h-11 min-w-[128px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 text-sm font-medium text-white/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/35 hover:bg-[#34D399]/[0.06] hover:text-[#34D399] hover:shadow-[0_10px_28px_-10px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/12 to-transparent transition-transform duration-700 group-hover/edit:translate-x-full" />

                  <Pencil className="relative z-10 h-4 w-4" strokeWidth={1.8} />

                  <span className="relative z-10">Edit Category</span>
                </button>

                {/* Toggle */}
                <button
                  type="button"
                  onClick={handleToggleStatus}
                  className={`group/toggle w-50 relative inline-flex h-11 min-w-[168px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 ${
                    category.is_active
                      ? "border border-red-400/25 bg-red-400/[0.06] text-red-400 hover:bg-red-400/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(248,113,113,0.4)]"
                      : "border border-[#34D399]/25 bg-[#34D399]/[0.06] text-[#34D399] hover:bg-[#34D399]/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(52,211,153,0.4)]"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 group-hover/toggle:translate-x-full ${
                      category.is_active ? "via-red-400/12" : "via-[#34D399]/12"
                    }`}
                  />

                  {category.is_active ? (
                    <>
                      <Ban
                        className="relative z-10 h-4 w-4 shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="relative z-10">Disable Category</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2
                        className="relative z-10 h-4 w-4 shrink-0"
                        strokeWidth={1.8}
                      />
                      <span className="relative z-10">Enable Category</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Courses */}
          <div
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0C0C0C] to-[#070707] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "240ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  Total Courses
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-white">
                  {category.courseCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#34D399]/[0.18] to-[#34D399]/[0.03] text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-[#34D399]/20 transition-transform duration-300 group-hover:scale-105">
                <BookOpen className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Status */}
          <div
            className={`animate-page-item group relative cursor-default overflow-hidden rounded-2xl border bg-gradient-to-b from-[#0C0C0C] to-[#070707] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-0.5 ${
              category.is_active
                ? "border-[#34D399]/25 hover:border-[#34D399]/40 hover:shadow-[0_16px_40px_-16px_rgba(52,211,153,0.25)]"
                : "border-red-400/20 hover:border-red-400/35 hover:shadow-[0_16px_40px_-16px_rgba(248,113,113,0.25)]"
            }`}
            style={{ animationDelay: "300ms" }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                category.is_active ? "via-[#34D399]/60" : "via-red-400/50"
              }`}
            />

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl ${
                category.is_active ? "bg-[#34D399]/[0.08]" : "bg-red-400/[0.06]"
              }`}
            />

            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  Status
                </p>

                <p
                  className={`mt-3 text-3xl font-semibold tracking-tight ${
                    category.is_active ? "text-[#34D399]" : "text-red-400"
                  }`}
                >
                  {category.is_active ? "Active" : "Inactive"}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset transition-transform duration-300 group-hover:scale-105 ${
                  category.is_active
                    ? "bg-gradient-to-br from-[#34D399]/[0.18] to-[#34D399]/[0.03] text-[#34D399] ring-[#34D399]/20"
                    : "bg-gradient-to-br from-red-400/[0.16] to-red-400/[0.03] text-red-400 ring-red-400/20"
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
            className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0C0C0C] to-[#070707] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "360ms" }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/45">
                  Category ID
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums text-white">
                  #{category.id}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/55 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-white/[0.06] transition-transform duration-300 group-hover:scale-105">
                <Hash className="h-5 w-5" strokeWidth={1.8} />
              </div>
            </div>
          </div>
        </section>

        {/* Category Information */}
        <section
          className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0C0C0C] to-[#070707] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_16px_44px_-12px_rgba(0,0,0,0.7)]"
          style={{ animationDelay: "440ms" }}
        >
          <div className="relative cursor-default border-b border-white/[0.07] p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
            />

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
          <div className="border-t border-white/[0.07] p-6">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
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
  <div className="group/row flex items-start gap-3.5 bg-[#0A0A0A] px-6 py-5 transition-colors duration-200 hover:bg-[#0E0E0E]">
    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/[0.06] transition-colors duration-200 group-hover/row:text-white/70">
      {icon}
    </div>

    <div className="min-w-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
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
