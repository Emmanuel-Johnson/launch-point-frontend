import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Tags, X } from "lucide-react";
import type {
  AdminCourseSkill,
  CreateAdminCourseSkillData,
  UpdateAdminCourseSkillData,
} from "../api/adminCourseSkillApi";

type SkillFormValues = CreateAdminCourseSkillData;

interface SkillFormModalProps {
  isOpen: boolean;
  editingSkill: AdminCourseSkill | null;
  onClose: () => void;
  onSave: (
    data: CreateAdminCourseSkillData | UpdateAdminCourseSkillData,
  ) => void | Promise<void>;
  isSaving?: boolean;
}

const skillFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Skill name must contain at least 3 characters.")
    .max(50, "Skill name cannot exceed 50 characters.")
    .refine((value) => /[\p{L}\p{N}]/u.test(value), {
      message: "Skill name must contain at least one letter or number.",
    }),
  description: z
    .string()
    .trim()
    .max(300, "Description cannot exceed 300 characters.")
    .refine(
      (value) =>
        value.length === 0 ||
        (value.length >= 3 && /[\p{L}\p{N}]/u.test(value)),
      "Description must be empty or contain at least 3 characters and a letter or number.",
    ),
  is_active: z.boolean(),
});

const SkillFormModal = ({
  isOpen,
  editingSkill,
  onClose,
  onSave,
  isSaving = false,
}: SkillFormModalProps) => {
  if (!isOpen) return null;

  return (
    <SkillFormContent
      key={editingSkill ? editingSkill.id : "new-skill"}
      editingSkill={editingSkill}
      onClose={onClose}
      onSave={onSave}
      isSaving={isSaving}
    />
  );
};

const SkillFormContent = ({
  editingSkill,
  onClose,
  onSave,
  isSaving = false,
}: Omit<SkillFormModalProps, "isOpen">) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: editingSkill?.name ?? "",
      description: editingSkill?.description ?? "",
      is_active: editingSkill?.is_active ?? true,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const isActive = useWatch({ control, name: "is_active" });
  const description = useWatch({ control, name: "description" });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, isSaving]);

  const onSubmit: SubmitHandler<SkillFormValues> = async (data) => {
    try {
      if (editingSkill) {
        await onSave({
          name: data.name.trim(),
          description: data.description.trim(),
        });
      } else {
        await onSave({
          name: data.name.trim(),
          description: data.description.trim(),
          is_active: data.is_active,
        });
      }
    } catch {
      // The page handles API errors with toast notifications.
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-form-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) onClose();
      }}
    >
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] shadow-[0_25px_80px_rgba(0,0,0,0.85)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
        />

        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
              <Tags className="h-5 w-5" strokeWidth={1.8} />
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
                  : "Create a skill for courses across Launch Point."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

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
                type="text"
                placeholder="e.g. Python"
                maxLength={50}
                autoComplete="off"
                {...register("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "skill-name-error" : undefined}
                className={`h-11 w-full rounded-xl border ${errors.name ? "border-red-400/60" : "border-white/[0.08]"} bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10`}
              />
              {errors.name && (
                <p
                  id="skill-name-error"
                  role="alert"
                  className="mt-1.5 text-xs text-red-400"
                >
                  {errors.name.message}
                </p>
              )}
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
                {...register("description")}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? "skill-description-error"
                    : "skill-description-hint"
                }
                className={`w-full resize-none rounded-xl border ${errors.description ? "border-red-400/60" : "border-white/[0.08]"} bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10`}
              />
              <div className="mt-1.5 flex items-start justify-between gap-3">
                {errors.description ? (
                  <p
                    id="skill-description-error"
                    role="alert"
                    className="text-xs text-red-400"
                  >
                    {errors.description.message}
                  </p>
                ) : (
                  <span
                    id="skill-description-hint"
                    className="text-[11px] text-white/30"
                  >
                    Optional. Leave empty or enter 3–300 characters.
                  </span>
                )}
                <p className="shrink-0 text-[11px] text-white/30">
                  {description.length}/300 characters
                </p>
              </div>
            </div>

            {!editingSkill && (
              <fieldset>
                <legend className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                  Status
                </legend>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${isActive ? "border-[#34D399]/40 bg-[#34D399]/[0.08]" : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"}`}
                  >
                    <input
                      type="radio"
                      name="skill-status"
                      checked={isActive}
                      onChange={() =>
                        setValue("is_active", true, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                      className="h-4 w-4 accent-[#34D399]"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">
                        Active
                      </span>
                      <span className="mt-0.5 block text-xs text-white/40">
                        Available for course setup
                      </span>
                    </span>
                  </label>
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${!isActive ? "border-red-400/40 bg-red-500/[0.06]" : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"}`}
                  >
                    <input
                      type="radio"
                      name="skill-status"
                      checked={!isActive}
                      onChange={() =>
                        setValue("is_active", false, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                      className="h-4 w-4 accent-red-400"
                    />
                    <span>
                      <span className="block text-sm font-medium text-white">
                        Inactive
                      </span>
                      <span className="mt-0.5 block text-xs text-white/40">
                        Unavailable for new course setup
                      </span>
                    </span>
                  </label>
                </div>
              </fieldset>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="h-10 cursor-pointer rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition hover:bg-[#34D399]/15 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              {isSaving
                ? editingSkill
                  ? "Saving..."
                  : "Creating..."
                : editingSkill
                  ? "Save Changes"
                  : "Create Skill"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default SkillFormModal;
