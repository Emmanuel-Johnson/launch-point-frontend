import { X, Tags } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";

import {
  createAdminCategory,
  updateAdminCategory,
  type AdminCategory,
} from "../api/adminCategoryApi";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (category: AdminCategory) => void;
  editingCategory?: AdminCategory | null;
  onUpdated: (category: AdminCategory) => void;
}

/* --------------------------------------------------
   Validation Schema
-------------------------------------------------- */

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name cannot exceed 100 characters")
    .regex(
      /^[\p{L}\p{N}]+(?:[ '&-][\p{L}\p{N}]+)*$/u,
      "Category name contains invalid characters",
    )
    .refine(
      (value) => !/(.)\1{3,}/u.test(value.toLowerCase()),
      "Category name contains too many repeated characters",
    )
    .refine((value) => {
      const normalized = value.replace(/[\s-]/g, "").toLowerCase();

      for (let size = 2; size <= 6; size++) {
        const pattern = new RegExp(`^(.{${size}})\\1{2,}$`, "u");

        if (pattern.test(normalized)) {
          return false;
        }
      }

      return true;
    }, "Category name contains a repeated pattern"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .min(2, "Slug must be at least 2 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain only lowercase letters, numbers, and hyphens",
    )
    .refine(
      (value) => !/(.)\1{3,}/.test(value),
      "Slug contains too many repeated characters",
    )
    .refine((value) => {
      const normalized = value.replace(/-/g, "");

      for (let size = 2; size <= 6; size++) {
        const pattern = new RegExp(`^(.{${size}})\\1{2,}$`);

        if (pattern.test(normalized)) {
          return false;
        }
      }

      return true;
    }, "Slug contains a repeated pattern"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters")
    .refine(
      (value) => !/[^A-Za-z0-9\s]{4,}/.test(value),
      "Description cannot contain more than 3 consecutive special characters",
    )
    .refine(
      (value) => !/(.)\1{3,}/u.test(value.toLowerCase()),
      "Description contains too many repeated characters",
    )
    .refine((value) => {
      const normalized = value.replace(/\s/g, "").toLowerCase();

      for (let size = 2; size <= 6; size++) {
        const pattern = new RegExp(`^(.{${size}})\\1{2,}$`, "u");

        if (pattern.test(normalized)) {
          return false;
        }
      }

      return true;
    }, "Description contains a repeated pattern"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

/* --------------------------------------------------
   Component
-------------------------------------------------- */

const CategoryFormModal = ({
  isOpen,
  onClose,
  onCreated,
  editingCategory,
  onUpdated,
}: CategoryFormModalProps) => {
  const [isActive, setIsActive] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  /* --------------------------------------------------
     Load Edit Data / Reset Create Form

     IMPORTANT:
     Do not call setState() synchronously here.
  -------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return;

    if (editingCategory) {
      reset({
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description,
      });
    } else {
      reset({
        name: "",
        slug: "",
        description: "",
      });
    }
  }, [isOpen, editingCategory, reset]);

  /* --------------------------------------------------
     Reset Form
  -------------------------------------------------- */

  const resetForm = () => {
    reset({
      name: "",
      slug: "",
      description: "",
    });

    setIsActive(false);
  };

  /* --------------------------------------------------
     Close Modal
  -------------------------------------------------- */

  const handleClose = () => {
    if (isSubmitting) return;

    resetForm();

    onClose();
  };

  /* --------------------------------------------------
     Submit
  -------------------------------------------------- */

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      /* -----------------------------------------------
         EDIT CATEGORY
      ------------------------------------------------ */

      if (editingCategory) {
        const updatedCategory = await updateAdminCategory(editingCategory.id, {
          name: data.name.trim(),
          slug: data.slug.trim(),
          description: data.description.trim(),
        });

        onUpdated(updatedCategory);

        toast.success("Category updated successfully.", {
          containerId: "admin",
        });
      } else {
        /* ---------------------------------------------
           CREATE CATEGORY
        ---------------------------------------------- */

        const createdCategory = await createAdminCategory({
          name: data.name.trim(),
          slug: data.slug.trim(),
          description: data.description.trim(),
          is_active: isActive,
        });

        onCreated(createdCategory);

        toast.success("Category created successfully.", {
          containerId: "admin",
        });
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error(
        editingCategory
          ? "Failed to update category:"
          : "Failed to create category:",
        error,
      );

      let message = editingCategory
        ? "Failed to update category. Please try again."
        : "Failed to create category. Please try again.";

      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        const nameError = responseData?.name?.[0];
        const slugError = responseData?.slug?.[0];
        const descriptionError = responseData?.description?.[0];
        const detailError = responseData?.detail;
        const messageError = responseData?.message;

        message =
          nameError ||
          slugError ||
          descriptionError ||
          detailError ||
          messageError ||
          message;
      }

      toast.error(message, {
        containerId: "admin",
      });
    }
  };

  /* --------------------------------------------------
     Don't Render
  -------------------------------------------------- */

  if (!isOpen) {
    return null;
  }

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
              <h2 className="text-lg font-semibold text-white">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>

              <p className="mt-0.5 text-xs text-white/45">
                {editingCategory
                  ? "Update the category information."
                  : "Create a new course category."}
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5 px-6 py-6">
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
                placeholder="e.g. Web Development"
                disabled={isSubmitting}
                {...register("name")}
                className={`h-11 w-full rounded-xl border ${
                  errors.name ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
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
                placeholder="e.g. web-development"
                disabled={isSubmitting}
                {...register("slug")}
                className={`h-11 w-full rounded-xl border ${
                  errors.slug ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              {errors.slug && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.slug.message}
                </p>
              )}

              {!errors.slug && (
                <p className="mt-1.5 text-[11px] text-white/30">
                  Use lowercase letters, numbers, and hyphens.
                </p>
              )}
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
                placeholder="Describe what this category is about..."
                rows={4}
                disabled={isSubmitting}
                {...register("description")}
                className={`w-full resize-none rounded-xl border ${
                  errors.description
                    ? "border-red-400/60"
                    : "border-white/[0.08]"
                } bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              <div className="mt-1.5 flex items-center justify-between">
                {errors.description ? (
                  <p className="text-xs text-red-400">
                    {errors.description.message}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-[11px] text-white/30">
                  Maximum 500 characters
                </p>
              </div>
            </div>

            {/* Active Category - Only show when creating */}
            {!editingCategory && (
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
                    className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      isActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-white/[0.08] px-6 py-4">
            <button
              type="submit"
              disabled={isSubmitting || (Boolean(editingCategory) && !isDirty)}
              className="relative h-10 w-50 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition-all duration-200 hover:bg-[#34D399]/15 hover:shadow-[0_8px_24px_-8px_rgba(52,211,153,0.35)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#34D399]/30 border-t-[#34D399]" />
                </span>
              ) : editingCategory ? (
                "Save Changes"
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default CategoryFormModal;
