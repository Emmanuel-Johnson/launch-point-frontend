import {
  Ban,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Plus,
  Search,
  Tags,
} from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoryStatusConfirmModal from "../components/CategoryStatusConfirmModal";
import CategoryFormModal from "../components/CategoryFormModal";
import {
  getAdminCategories,
  updateAdminCategoryStatus,
  type AdminCategory,
} from "../api/adminCategoryApi";
import { toast } from "react-toastify";

type Category = AdminCategory;

const CATEGORIES_PER_PAGE = 5;

const CategoryListPage = () => {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const categoriesListRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);

        const data = await getAdminCategories();

        setCategoryList(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return categoryList.filter((category) => {
      const matchesSearch =
        !query ||
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category.is_active) ||
        (statusFilter === "inactive" && !category.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, categoryList]);

  const totalPages = Math.ceil(filteredCategories.length / CATEGORIES_PER_PAGE);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * CATEGORIES_PER_PAGE;
    const endIndex = startIndex + CATEGORIES_PER_PAGE;

    return filteredCategories.slice(startIndex, endIndex);
  }, [filteredCategories, currentPage]);

  // Reserve the height of a full page so the layout below (pagination,
  // page edges) never shifts when the last page has fewer rows. Only kicks
  // in while pagination is active, so single-page searches stay natural.
  const placeholderCount =
    totalPages > 1
      ? Math.max(CATEGORIES_PER_PAGE - paginatedCategories.length, 0)
      : 0;

  const truncateText = (text: string, maxLength = 60) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength - 3)}...`;
  };

  const handleToggleStatus = (id: number) => {
    const category = categoryList.find((item) => item.id === id);

    if (!category) return;

    setSelectedCategory(category);
    setIsStatusModalOpen(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!selectedCategory) return;

    try {
      setIsStatusUpdating(true);

      const newStatus = !selectedCategory.is_active;

      const response = await updateAdminCategoryStatus(
        selectedCategory.id,
        newStatus,
      );

      setCategoryList((currentCategories) =>
        currentCategories.map((item) =>
          item.id === selectedCategory.id
            ? {
                ...item,
                is_active: response.is_active,
              }
            : item,
        ),
      );

      setIsStatusModalOpen(false);
      setSelectedCategory(null);

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
    setSelectedCategory(null);
  };

  const handleEditCategory = (id: number) => {
    const category = categoryList.find((item) => item.id === id);

    if (!category) return;

    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const scrollToCategoriesList = () => {
    categoriesListRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.max(page - 1, 1);

      if (nextPage !== page) {
        setTimeout(scrollToCategoriesList, 0);
      }

      return nextPage;
    });
  };

  const handleNextPage = () => {
    setCurrentPage((page) => {
      const nextPage = Math.min(page + 1, totalPages);

      if (nextPage !== page) {
        setTimeout(scrollToCategoriesList, 0);
      }

      return nextPage;
    });
  };

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;

    setCurrentPage(page);
    setTimeout(scrollToCategoriesList, 0);
  };

  const getPageNumbers = () => {
    const pages: number[] = [];

    for (let page = 1; page <= totalPages; page++) {
      pages.push(page);
    }

    return pages;
  };

  const startItem =
    filteredCategories.length === 0
      ? 0
      : (currentPage - 1) * CATEGORIES_PER_PAGE + 1;

  const endItem = Math.min(
    currentPage * CATEGORIES_PER_PAGE,
    filteredCategories.length,
  );

  const totalCount = categoryList.length;
  const activeCount = categoryList.filter((c) => c.is_active).length;
  const inactiveCount = categoryList.filter((c) => !c.is_active).length;

  return (
    <>
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* Header */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "80ms" }}
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

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4 cursor-default">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/[0.04] text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-[#34D399]/25">
                    <Tags className="h-5 w-5" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                      Categories
                    </h1>

                    <p className="mt-1 text-sm text-white/50">
                      Manage and organize course categories.
                    </p>
                  </div>
                </div>

                {/* Add Category */}
                <button
                  type="button"
                  onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryModalOpen(true);
                  }}
                  className="group relative inline-flex h-11 shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-6px_rgba(52,211,153,0.35)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#34D399]/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <Plus
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                    strokeWidth={2}
                  />

                  <span className="relative z-10">Add Category</span>
                </button>
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Total Categories */}
            <div
              className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
              style={{ animationDelay: "160ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                    Total Categories
                  </p>

                  <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                    {totalCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <Tags className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Active Categories */}
            <div
              className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-[#34D399]/25 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-[#34D399]/40"
              style={{ animationDelay: "220ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#34D399]/[0.08] blur-3xl"
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                    Active
                  </p>

                  <p className="mt-3 text-3xl font-semibold tabular-nums text-[#34D399]">
                    {activeCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Inactive Categories */}
            <div
              className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-red-400/20 bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-red-400/35"
              style={{ animationDelay: "280ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-400/[0.06] blur-3xl"
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                    Inactive
                  </p>

                  <p className="mt-3 text-3xl font-semibold tabular-nums text-red-400">
                    {inactiveCount}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20">
                  <Ban className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            {/* Showing */}
            <div
              className="animate-page-item group relative cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]"
              style={{ animationDelay: "340ms" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
              />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/45">
                    Showing
                  </p>

                  <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
                    {filteredCategories.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] text-white/60">
                  <Search className="h-5 w-5" strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </section>

          {/* Category Table */}
          <section
            ref={categoriesListRef}
            className="animate-page-item overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]"
            style={{ animationDelay: "420ms" }}
          >
            {/* Table Header */}
            <div className="flex flex-col gap-4 border-b border-white/[0.08] p-5 md:flex-row md:items-center md:justify-between">
              <div className="cursor-default">
                <h2 className="text-lg font-semibold tracking-tight">
                  All Categories
                </h2>

                <p className="mt-1 text-xs text-white/45">
                  View and manage course categories.
                </p>
              </div>

              <div className="flex w-full min-w-0 flex-col gap-3 md:ml-6 md:flex-1 md:flex-row">
                {/* Status Filter */}
                <div className="flex h-10 items-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
                  {(["all", "active", "inactive"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => {
                        setStatusFilter(filter);
                        setCurrentPage(1);
                      }}
                      className={`h-8 w-20 rounded-lg text-xs font-medium capitalize transition-all ${
                        statusFilter === filter
                          ? filter === "active"
                            ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                            : filter === "inactive"
                              ? "bg-red-400/10 text-red-400 ring-1 ring-inset ring-red-400/20"
                              : "bg-white/[0.08] text-white"
                          : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative min-w-0 flex-1">
                  <Search
                    className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-white/35"
                    strokeWidth={1.8}
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => handleSearchChange(event.target.value)}
                    placeholder="Search categories..."
                    className="h-10 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] pl-10 pr-4 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/15"
                  />
                </div>
              </div>
            </div>

            {/* Category Content */}
            {isLoading ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#34D399]" />

                <p className="mt-4 text-sm font-medium text-white/60">
                  Loading categories...
                </p>

                <p className="mt-1 text-xs text-white/30">
                  Please wait while we fetch the categories.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden overflow-x-auto md:block">
                  {/* table-fixed + explicit column widths keep every column in the
                exact same position across pages, regardless of cell content. */}
                  <table className="w-full table-fixed">
                    <thead className="cursor-default">
                      <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left">
                        <th className="w-[24%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                          Category
                        </th>

                        <th className="w-[32%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                          Description
                        </th>

                        <th className="w-[12%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                          Courses
                        </th>

                        <th className="w-[14%] px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/35">
                          Status
                        </th>

                        {/* "Action" label aligned to the right, above the action
                      controls (Edit + toggle) that sit below it. */}
                        <th className="w-[18%] px-6 py-4">
                          <div className="flex justify-end">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-white/35">
                              Action
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedCategories.map((category, index) => (
                        <tr
                          key={`${category.id}-${index}`}
                          onClick={() =>
                            navigate(`/admin/categories/${category.id}`)
                          }
                          className="group cursor-pointer border-b border-white/[0.06] transition-colors duration-200 hover:bg-[#34D399]/[0.04]"
                        >
                          {/* Category */}
                          <td className="relative px-6 py-4">
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-[#34D399] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            />

                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                                <Tags className="h-5 w-5" strokeWidth={1.8} />
                              </div>

                              <div className="min-w-0">
                                <p
                                  className="truncate text-sm font-medium text-white"
                                  title={category.name}
                                >
                                  {category.name}
                                </p>

                                <p className="mt-0.5 text-xs tabular-nums text-white/35">
                                  ID #{category.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Description */}
                          <td className="px-6 py-4">
                            <p
                              className="truncate text-sm text-white/60"
                              title={category.description}
                            >
                              {truncateText(category.description)}
                            </p>
                          </td>

                          {/* Courses */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm tabular-nums text-white/55">
                              <BookOpen className="h-4 w-4 shrink-0 text-white/30" />

                              <span className="truncate">_</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex h-7 w-20 items-center justify-center gap-1.5 rounded-full text-[11px] font-medium ring-1 ring-inset ${
                                category.is_active
                                  ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                                  : "bg-red-400/10 text-red-400 ring-red-400/20"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  category.is_active
                                    ? "bg-[#34D399]"
                                    : "bg-red-400"
                                }`}
                              />

                              {category.is_active ? "Active" : "Inactive"}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              {/* Edit */}
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleEditCategory(category.id);
                                }}
                                aria-label={`Edit ${category.name}`}
                                title="Edit category"
                                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:scale-[1.03] hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399]"
                              >
                                <Pencil className="h-4 w-4" strokeWidth={1.8} />
                              </button>

                              {/* Enable / Disable */}
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleToggleStatus(category.id);
                                }}
                                className={`inline-flex h-9 w-28 cursor-pointer items-center justify-center rounded-lg text-xs font-medium transition-all duration-700 ease-out hover:scale-[1.03] ${
                                  category.is_active
                                    ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                                    : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                                }`}
                              >
                                {category.is_active ? "Disable" : "Enable"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Height-reserving placeholder rows keep the page structure
                    fixed when the last page is partially filled. */}
                      {Array.from({ length: placeholderCount }).map(
                        (_, index) => (
                          <tr
                            key={`placeholder-${index}`}
                            aria-hidden="true"
                            className="border-b border-white/[0.03]"
                          >
                            <td className="px-6 py-4">
                              <div className="h-11" />
                            </td>
                            <td className="px-6 py-4" />
                            <td className="px-6 py-4" />
                            <td className="px-6 py-4" />
                            <td className="px-6 py-4" />
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredCategories.length > 0 && totalPages > 1 && (
                  <div className="flex cursor-default flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Showing range */}
                    <p className="text-xs text-white/40">
                      Showing{" "}
                      <span className="font-medium tabular-nums text-white/70">
                        {startItem}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium tabular-nums text-white/70">
                        {endItem}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium tabular-nums text-white/70">
                        {filteredCategories.length}
                      </span>{" "}
                      categories
                    </p>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-center gap-1">
                      {/* Previous */}
                      <button
                        type="button"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                        aria-label="Previous page"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>

                      {/* Page Numbers */}
                      {getPageNumbers().map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-all ${
                            currentPage === page
                              ? "bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20"
                              : "text-white/45 hover:bg-white/[0.04] hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Next */}
                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all hover:border-[#34D399]/30 hover:bg-[#34D399]/5 hover:text-[#34D399] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.02] disabled:hover:text-white/50"
                        aria-label="Next page"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Empty State */}
                {filteredCategories.length === 0 && (
                  <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.04] text-white/30">
                      <Tags className="h-6 w-6" />
                    </div>

                    <h3 className="mt-4 text-sm font-medium text-white">
                      No categories found
                    </h3>

                    <p className="mt-1 text-xs text-white/40">
                      {statusFilter === "active"
                        ? "There are currently no active categories."
                        : statusFilter === "inactive"
                          ? "There are currently no inactive categories."
                          : searchQuery
                            ? "No categories match your search. Try a different name."
                            : "No categories are available yet."}
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
      <CategoryStatusConfirmModal
        isOpen={isStatusModalOpen}
        isLoading={isStatusUpdating}
        categoryName={selectedCategory?.name ?? ""}
        isActive={selectedCategory?.is_active ?? false}
        onCancel={handleCancelStatusChange}
        onConfirm={handleConfirmStatusChange}
      />
      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        editingCategory={editingCategory}
        onCreated={(createdCategory) => {
          setCategoryList((currentCategories) => [
            createdCategory,
            ...currentCategories,
          ]);
        }}
        onUpdated={(updatedCategory) => {
          setCategoryList((currentCategories) =>
            currentCategories.map((category) =>
              category.id === updatedCategory.id ? updatedCategory : category,
            ),
          );
        }}
      />
    </>
  );
};

export default CategoryListPage;
