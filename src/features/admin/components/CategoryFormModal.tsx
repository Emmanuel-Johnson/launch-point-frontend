import { X, Tags } from "lucide-react";
import { useState } from "react";
import {
  createAdminCategory,
  type AdminCategory,
} from "../api/adminCategoryApi";
import { createPortal } from "react-dom";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (category: AdminCategory) => void;
}

const CategoryFormModal = ({
  isOpen,
  onClose,
  onCreated,
}: CategoryFormModalProps) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setName("");
    setSlug("");
    setDescription("");
    setIsActive(true);
    setErrorMessage("");
  };

  const handleClose = () => {
    if (isSubmitting) return;

    resetForm();
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Category name is required.");
      return;
    }

    if (!slug.trim()) {
      setErrorMessage("Category slug is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const createdCategory = await createAdminCategory({
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        is_active: isActive,
      });

      onCreated(createdCategory);
      resetForm();
      onClose();
    } catch (error) {
      console.error("Failed to create category:", error);

      setErrorMessage("Failed to create category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/75 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        {/* Top glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
              <Tags className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Add Category</h2>

              <p className="mt-0.5 text-xs text-white/45">
                Create a new course category.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/40 transition-all duration-200 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6">
            {/* Error */}
            {errorMessage && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-sm text-red-400">
                {errorMessage}
              </div>
            )}
            {/* Name */}
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="e.g. Web Development"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {/* Slug */}
            <div>
              <label
                htmlFor="category-slug"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Slug
              </label>

              <input
                id="category-slug"
                type="text"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="e.g. web-development"
                disabled={isSubmitting}
                className="h-11 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {/* Description */}
            <div>
              <label
                htmlFor="category-description"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Description
              </label>

              <textarea
                id="category-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe what this category is about..."
                rows={4}
                disabled={isSubmitting}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {/* Active */}

            <div className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">
                  Active Category
                </p>

                <p className="mt-0.5 text-xs text-white/40">
                  Allow this category to be used immediately.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                aria-label="Toggle category active status"
                onClick={() => setIsActive((previous) => !previous)}
                disabled={isSubmitting}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#34D399] shadow-[0_0_12px_rgba(52,211,153,0.25)]"
                    : "bg-white/15"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                    isActive ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] px-6 py-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-200 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-8px_rgba(52,211,153,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CategoryFormModal;
