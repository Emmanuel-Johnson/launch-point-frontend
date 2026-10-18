import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, GraduationCap, X } from "lucide-react";
import type { AdminCourseLevel } from "../api/adminCourseLevelApi";

type CourseLevel = AdminCourseLevel & { courses: number };

// =========================================================
// Zod Validation Schema
// =========================================================

const containsLetterOrNumber = /[\p{L}\p{N}]/u;

const levelFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter a level name.")
    .max(50, "Level name cannot exceed 50 characters.")
    .refine(
      (value) => containsLetterOrNumber.test(value),
      "Level name must contain at least one letter or number.",
    ),

  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters.")
    .refine(
      (value) => value.length === 0 || containsLetterOrNumber.test(value),
      "Description must contain at least one letter or number.",
    ),
});

type LevelFormValues = z.infer<typeof levelFormSchema>;

// =========================================================
// Component Props
// =========================================================

interface LevelFormModalProps {
  isOpen: boolean;
  editingLevel: CourseLevel | null;
  onClose: () => void;
  onSave: (data: Pick<CourseLevel, "name" | "description">) => Promise<void>;
}

// =========================================================
// Main Modal
// =========================================================

const LevelFormModal = ({
  isOpen,
  editingLevel,
  onClose,
  onSave,
}: LevelFormModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <LevelFormContent
      key={editingLevel ? editingLevel.id : "new-level"}
      editingLevel={editingLevel}
      onClose={onClose}
      onSave={onSave}
    />,
    document.body,
  );
};

// =========================================================
// Form Content
// =========================================================

interface LevelFormContentProps {
  editingLevel: CourseLevel | null;
  onClose: () => void;
  onSave: (data: Pick<CourseLevel, "name" | "description">) => Promise<void>;
}

const LevelFormContent = ({
  editingLevel,
  onClose,
  onSave,
}: LevelFormContentProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LevelFormValues>({
    resolver: zodResolver(levelFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: editingLevel?.name ?? "",
      description: editingLevel?.description ?? "",
    },
  });

  const descriptionValue = watch("description") ?? "";

  // =======================================================
  // Body Scroll Lock and Escape Key
  // =======================================================

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  // =======================================================
  // Form Submission
  // =======================================================

  const onSubmit: SubmitHandler<LevelFormValues> = async (values) => {
    clearErrors("root");

    try {
      await onSave({
        name: values.name,
        description: values.description,
      });

      onClose();
    } catch {
      // Avoid exposing raw Django/DRF error responses.
      setError("root.server", {
        type: "server",
        message: "Unable to save the course level. Please try again.",
      });
    }
  };

  const nameError = errors.name?.message;
  const descriptionError = errors.description?.message;
  const serverError = errors.root?.server?.message;

  // =======================================================
  // Render
  // =======================================================

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-form-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
              <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="level-form-title"
                className="text-lg font-semibold text-white"
              >
                {editingLevel ? "Edit Level" : "Add Level"}
              </h2>

              <p className="mt-0.5 text-xs text-white/45">
                {editingLevel
                  ? "Update the learning level information."
                  : "Create a new learning level for your courses."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5 px-6 py-6">
            {/* Level Name */}
            <div>
              <label
                htmlFor="level-name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Level Name <span className="text-red-400">*</span>
              </label>

              <input
                id="level-name"
                autoFocus
                type="text"
                placeholder="e.g. Beginner"
                maxLength={50}
                disabled={isSubmitting}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "level-name-error" : undefined}
                {...register("name")}
                className={`h-11 w-full rounded-xl border ${
                  nameError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              {nameError && (
                <p
                  id="level-name-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-400"
                >
                  {nameError}
                </p>
              )}
            </div>

            {/* Optional Description */}
            <div>
              <label
                htmlFor="level-description"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Description (Optional)
              </label>

              <textarea
                id="level-description"
                placeholder="Describe who this learning level is for..."
                rows={4}
                maxLength={300}
                disabled={isSubmitting}
                aria-invalid={Boolean(descriptionError)}
                aria-describedby={
                  descriptionError ? "level-description-error" : undefined
                }
                {...register("description")}
                className={`w-full resize-none rounded-xl border ${
                  descriptionError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10 disabled:cursor-not-allowed disabled:opacity-50`}
              />

              <div className="mt-1.5 flex items-start justify-between gap-3">
                {descriptionError ? (
                  <p
                    id="level-description-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {descriptionError}
                  </p>
                ) : (
                  <span className="text-[11px] text-white/30">
                    You can leave this field empty.
                  </span>
                )}

                <p className="shrink-0 text-[11px] text-white/30">
                  {descriptionValue.length}/300 characters
                </p>
              </div>
            </div>

            {/* Generic Save Error */}
            {serverError && (
              <p
                role="alert"
                className="rounded-xl border border-red-400/15 bg-red-500/[0.05] px-4 py-3 text-xs text-red-400"
              >
                {serverError}
              </p>
            )}
          </div>

          {/* Modal Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-10 cursor-pointer rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                (Boolean(editingLevel) &&
                  descriptionValue.trim() ===
                    (editingLevel?.description ?? "").trim() &&
                  watch("name").trim() === editingLevel?.name)
              }
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition hover:bg-[#34D399]/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#34D399]/30 border-t-[#34D399]" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}

              {isSubmitting
                ? "Saving..."
                : editingLevel
                  ? "Save Changes"
                  : "Create Level"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LevelFormModal;
