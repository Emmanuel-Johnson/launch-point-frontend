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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminCategory,
  updateAdminCategoryStatus,
  type AdminCategory,
} from "../api/adminCategoryApi";
import CategoryStatusConfirmModal from "../components/CategoryStatusConfirmModal";

const CategoryDetailPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();

  const [category, setCategory] = useState<AdminCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  // =========================================================
  // Fetch Category
  // =========================================================

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) {
        setError("Invalid category ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getAdminCategory(Number(categoryId));

        setCategory(data);
      } catch (error) {
        toast.error("Failed to fetch category.", {
          containerId: "admin",
        });
        console.log(error);
        setError("Category not found.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  // =========================================================
  // Helpers
  // =========================================================

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
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  // =========================================================
  // Actions
  // =========================================================

  const handleToggleStatus = () => {
    if (!category) return;

    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!category) return;

    try {
      setIsStatusUpdating(true);

      const newStatus = !category.is_active;

      const response = await updateAdminCategoryStatus(category.id, newStatus);

      setCategory((currentCategory) =>
        currentCategory
          ? {
              ...currentCategory,
              is_active: response.is_active,
            }
          : currentCategory,
      );

      setIsStatusModalOpen(false);

      toast.success(response.message, {
        containerId: "admin",
      });
    } catch (error) {
      toast.error("Failed to update category status.", {
        containerId: "admin",
      });
      console.log(error);
    } finally {
      setIsStatusUpdating(false);
    }
  };

  const handleCancelStatusChange = () => {
    if (isStatusUpdating) return;

    setIsStatusModalOpen(false);
  };

  const handleEditCategory = () => {
    if (!category) return;

    console.log("Edit category:", category.id);

    // Connect edit modal/navigation here later.
  };

  // =========================================================
  // Loading
  // =========================================================

  if (isLoading) {
    return (
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* Back Skeleton */}
          <div className="h-5 w-28 animate-pulse rounded bg-white/[0.06]" />

          {/* Header Skeleton */}
          <div className="rounded-3xl border border-white/[0.07] bg-gradient-to-br from-[#0C0C0C] to-[#050505] p-8">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 animate-pulse rounded-2xl bg-white/[0.06]" />

              <div className="space-y-3">
                <div className="h-7 w-48 animate-pulse rounded bg-white/[0.06]" />
                <div className="h-6 w-32 animate-pulse rounded bg-white/[0.04]" />
              </div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl border border-white/[0.07] bg-[#0A0A0A]"
              />
            ))}
          </div>

          {/* Information Skeleton */}
          <div className="h-80 animate-pulse rounded-2xl border border-white/[0.07] bg-[#0A0A0A]" />
        </div>
      </div>
    );
  }

  // =========================================================
  // Not Found / Error
  // =========================================================

  if (!category || error) {
    return (
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
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
              {error ??
                "The category you're looking for doesn't exist or may have been removed."}
            </p>

            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="mt-6 inline-flex h-10 cursor-pointer items-center rounded-xl border border-[#34D399]/20 bg-[#34D399]/[0.06] px-4 text-xs font-medium text-[#34D399] transition-all hover:border-[#34D399]/35 hover:bg-[#34D399]/[0.1]"
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Page
  // =========================================================

  return (
    <>
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* =====================================================
            Back
        ===================================================== */}

          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
            style={{ animationDelay: "80ms" }}
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </button>

          {/* =====================================================
            Header
        ===================================================== */}

          <section
            className="animate-page-item"
            style={{ animationDelay: "160ms" }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/[0.18] bg-gradient-to-br from-[#0C0C0C] via-[#070707] to-[#040404] p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_24px_60px_-16px_rgba(0,0,0,0.85)]">
              {/* Glow */}

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
                  {/* Initials */}

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/[0.22] via-[#34D399]/[0.08] to-transparent text-lg font-semibold tracking-tight text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(52,211,153,0.35)] ring-1 ring-inset ring-[#34D399]/30">
                    {getInitials(category.name)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-[26px] font-semibold leading-tight tracking-tight [overflow-wrap:anywhere]">
                        {category.name}
                      </h1>

                      {/* Status Badge */}

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

                    {/* Slug */}

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

                    <Pencil
                      className="relative z-10 h-4 w-4"
                      strokeWidth={1.8}
                    />

                    <span className="relative z-10">Edit Category</span>
                  </button>

                  {/* Toggle */}

                  <button
                    type="button"
                    onClick={handleToggleStatus}
                    className={`group/toggle relative inline-flex h-11 min-w-[168px] cursor-pointer w-50 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 ${
                      category.is_active
                        ? "border border-red-400/25 bg-red-400/[0.06] text-red-400 hover:bg-red-400/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(248,113,113,0.4)]"
                        : "border border-[#34D399]/25 bg-[#34D399]/[0.06] text-[#34D399] hover:bg-[#34D399]/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(52,211,153,0.4)]"
                    }`}
                  >
                    <span
                      className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 group-hover/toggle:translate-x-full ${
                        category.is_active
                          ? "via-red-400/12"
                          : "via-[#34D399]/12"
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

          {/* =====================================================
            Stats
        ===================================================== */}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {/* =====================================================
      CATEGORY ID
  ====================================================== */}
            <div
              className="animate-page-item group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_12px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.75)]"
              style={{ animationDelay: "360ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              />

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/35">
                    Category ID
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-white">
                    #{category.id}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/50 ring-1 ring-inset ring-white/[0.07] transition-transform duration-300 group-hover:scale-105">
                  <Hash className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* =====================================================
      STATUS
  ====================================================== */}
            <div
              className={`animate-page-item group relative overflow-hidden rounded-2xl border bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_12px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 ${
                category.is_active
                  ? "border-[#34D399]/20 hover:border-[#34D399]/35 hover:shadow-[0_16px_40px_-16px_rgba(52,211,153,0.18)]"
                  : "border-red-400/20 hover:border-red-400/35 hover:shadow-[0_16px_40px_-16px_rgba(248,113,113,0.18)]"
              }`}
              style={{ animationDelay: "300ms" }}
            >
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                  category.is_active ? "via-[#34D399]/50" : "via-red-400/45"
                }`}
              />

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/35">Status</p>

                  <p
                    className={`mt-2 text-2xl font-semibold tracking-tight ${
                      category.is_active ? "text-[#34D399]" : "text-red-400"
                    }`}
                  >
                    {category.is_active ? "Active" : "Inactive"}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset transition-transform duration-300 group-hover:scale-105 ${
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
            {/* =====================================================
      TOTAL COURSES
  ====================================================== */}
            <div
              className="animate-page-item group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_12px_40px_-12px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.14] hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.75)]"
              style={{ animationDelay: "240ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/30 to-transparent"
              />

              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white/35">
                    Total Courses
                  </p>

                  <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums text-white">
                    —
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20 transition-transform duration-300 group-hover:scale-105">
                  <BookOpen className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
            Category Information
        ===================================================== */}

          <section
            className="animate-page-item"
            style={{ animationDelay: "440ms" }}
          >
            {/* Section Heading */}
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
              />

              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Category Information
                </h2>

                <p className="mt-1 text-xs text-white/40">
                  Details and metadata for this category.
                </p>
              </div>
            </div>

            {/* Information Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
              />

              <div className="grid md:grid-cols-2">
                {/* Name */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Tags size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Name</p>

                      <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                        {category.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slug */}
                <div className="border-b border-white/[0.06] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Link2 size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Slug</p>

                      <p className="mt-1 text-sm font-medium font-mono text-white [overflow-wrap:anywhere]">
                        {category.slug}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Courses */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <BookOpen size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Courses</p>

                      <p className="mt-1 text-sm font-medium text-white">—</p>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="border-b border-white/[0.06] p-5">
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${
                        category.is_active
                          ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                          : "bg-red-400/10 text-red-400 ring-red-400/20"
                      }`}
                    >
                      {category.is_active ? (
                        <CheckCircle2 size={16} strokeWidth={1.8} />
                      ) : (
                        <Ban size={16} strokeWidth={1.8} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Status</p>

                      <p
                        className={`mt-1 text-sm font-medium ${
                          category.is_active ? "text-[#34D399]" : "text-red-400"
                        }`}
                      >
                        {category.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Created */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <CalendarDays size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Created</p>

                      <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                        {formatDateTime(category.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="border-b border-white/[0.06] p-5 md:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Clock size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Last Updated</p>

                      <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                        {formatDateTime(category.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-white/[0.07] p-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <Tags size={16} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs text-white/35">Description</p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/70 [overflow-wrap:anywhere]">
                  {category.description || "No description provided."}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CategoryStatusConfirmModal
        isOpen={isStatusModalOpen}
        isLoading={isStatusUpdating}
        categoryName={category.name}
        isActive={category.is_active}
        onCancel={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
      />
    </>
  );
};

// =========================================================
// Info Row
// =========================================================

// interface InfoRowProps {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
//   valueClassName?: string;
// }

// const InfoRow = ({ icon, label, value, valueClassName }: InfoRowProps) => (
//   <div className="group/row flex items-start gap-3.5 bg-[#0A0A0A] px-6 py-5 transition-colors duration-200 hover:bg-[#0E0E0E]">
//     <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-white/[0.07] to-white/[0.02] text-white/50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/[0.06] transition-colors duration-200 group-hover/row:text-white/70">
//       {icon}
//     </div>

//     <div className="min-w-0">
//       <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
//         {label}
//       </p>

//       <p
//         className={`mt-1 text-sm font-medium text-white [overflow-wrap:anywhere] ${
//           valueClassName ?? ""
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   </div>
// );

export default CategoryDetailPage;
