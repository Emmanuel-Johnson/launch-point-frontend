import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Code2, X } from "lucide-react";
import { toast } from "react-toastify";

import type {
  AdminCourseSkill,
  CreateAdminCourseSkillData,
} from "../api/adminCourseSkillApi";

const containsLetterOrNumber = /[\p{L}\p{N}]/u;

const skillFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Skill name must be at least 3 characters.")
    .max(50, "Skill name cannot exceed 50 characters.")
    .refine(
      (value) => containsLetterOrNumber.test(value),
      "Skill name must contain at least one letter or number.",
    ),

  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters.")
    .refine(
      (value) =>
        value.length === 0 ||
        (value.length >= 3 && containsLetterOrNumber.test(value)),
      "Description must be empty or contain at least 3 characters, including a letter or number.",
    ),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillFormModalProps {
  isOpen: boolean;
  editingSkill: AdminCourseSkill | null;
  onClose: () => void;
  onSave: (data: CreateAdminCourseSkillData) => Promise<void>;
}

const SkillFormModal = ({
  isOpen,
  editingSkill,
  onClose,
  onSave,
}: SkillFormModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <SkillFormContent
      key={editingSkill ? editingSkill.id : "new-skill"}
      editingSkill={editingSkill}
      onClose={onClose}
      onSave={onSave}
    />,
    document.body,
  );
};

interface SkillFormContentProps {
  editingSkill: AdminCourseSkill | null;
  onClose: () => void;
  onSave: (data: CreateAdminCourseSkillData) => Promise<void>;
}

const SkillFormContent = ({
  editingSkill,
  onClose,
  onSave,
}: SkillFormContentProps) => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: editingSkill?.name ?? "",
      description: editingSkill?.description ?? "",
    },
  });

  const nameValue = useWatch({ control, name: "name" }) ?? "";

  const descriptionValue = useWatch({ control, name: "description" }) ?? "";

  const handleClose = useCallback(() => {
    if (isSubmitting) return;

    clearErrors();
    reset({
      name: editingSkill?.name ?? "",
      description: editingSkill?.description ?? "",
    });
    onClose();
  }, [clearErrors, reset, editingSkill, onClose, isSubmitting]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, handleClose]);

  const onSubmit: SubmitHandler<SkillFormValues> = async (values) => {
    clearErrors("root");

    try {
      await onSave({
        name: values.name.trim(),
        description: values.description.trim(),
      });
    } catch (error: unknown) {
      const apiError = error as {
        response?: {
          data?: {
            name?: unknown;
            detail?: unknown;
            message?: unknown;
          };
        };
      };

      const responseData = apiError.response?.data;
      const nameError = responseData?.name;

      const nameMessage =
        Array.isArray(nameError) && typeof nameError[0] === "string"
          ? nameError[0]
          : typeof nameError === "string"
            ? nameError
            : null;

      if (nameMessage) {
        setError("name", {
          type: "server",
          message: nameMessage,
        });
        return;
      }

      const serverMessage =
        typeof responseData?.detail === "string"
          ? responseData.detail
          : typeof responseData?.message === "string"
            ? responseData.message
            : "Unable to save the skill. Please try again.";

      toast.error(serverMessage, { containerId: "admin" });
    }
  };

  const nameError = errors.name?.message;
  const descriptionError = errors.description?.message;

  const hasChanges =
    nameValue.trim() !== (editingSkill?.name ?? "") ||
    descriptionValue.trim() !== (editingSkill?.description ?? "");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-form-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          handleClose();
        }
      }}
    >
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
        />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
              <Code2 className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div>
              <h2
                id="skill-form-title"
                className="text-lg font-semibold text-white"
              >
                {editingSkill ? "Edit Skill" : "Add Skill"}
              </h2>

              <p className="mt-0.5 text-xs text-white/45">
                {editingSkill
                  ? "Update the skill information."
                  : "Create a new skill for your courses."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5 px-6 py-6">
            <div>
              <label
                htmlFor="skill-name"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Skill Name <span className="text-red-400">*</span>
              </label>

              <input
                id="skill-name"
                autoFocus
                type="text"
                placeholder="e.g. Python"
                maxLength={50}
                disabled={isSubmitting}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "skill-name-error" : undefined}
                {...register("name")}
                className={`h-11 w-full rounded-xl border ${
                  nameError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/10 disabled:opacity-50`}
              />

              {nameError && (
                <p
                  id="skill-name-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-400"
                >
                  {nameError}
                </p>
              )}

              <p className="mt-1.5 text-right text-[11px] text-white/30">
                {nameValue.length}/50 characters
              </p>
            </div>

            <div>
              <label
                htmlFor="skill-description"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45"
              >
                Description (Optional)
              </label>

              <textarea
                id="skill-description"
                placeholder="Describe this skill..."
                rows={4}
                maxLength={300}
                disabled={isSubmitting}
                aria-invalid={Boolean(descriptionError)}
                aria-describedby={
                  descriptionError ? "skill-description-error" : undefined
                }
                {...register("description")}
                className={`w-full resize-none rounded-xl border ${
                  descriptionError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/10 disabled:opacity-50`}
              />

              <div className="mt-1.5 flex items-start justify-between gap-3">
                {descriptionError ? (
                  <p
                    id="skill-description-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {descriptionError}
                  </p>
                ) : (
                  <span className="text-[11px] text-white/30">
                    Optional. Leave empty or enter 3–300 characters.
                  </span>
                )}

                <p className="shrink-0 text-[11px] text-white/30">
                  {descriptionValue.length}/300 characters
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 cursor-pointer rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || (Boolean(editingSkill) && !hasChanges)}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition hover:bg-[#34D399]/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#34D399]/30 border-t-[#34D399]" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}

              {isSubmitting
                ? "Saving..."
                : editingSkill
                  ? "Save Changes"
                  : "Create Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SkillFormModal;
