import { useEffect, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, GraduationCap, X } from "lucide-react";

type CourseLevel = {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  courses: number;
  created_at: string;
  updated_at: string;
};

interface LevelFormModalProps {
  isOpen: boolean;
  editingLevel: CourseLevel | null;
  onClose: () => void;
  onSave: (
    data: Pick<CourseLevel, "name" | "description" | "is_active">,
  ) => void;
}

const LevelFormModal = ({
  isOpen,
  editingLevel,
  onClose,
  onSave,
}: LevelFormModalProps) => {
  if (!isOpen) return null;

  return (
    <LevelFormContent
      key={editingLevel ? editingLevel.id : "new-level"}
      editingLevel={editingLevel}
      onClose={onClose}
      onSave={onSave}
    />
  );
};

interface LevelFormContentProps {
  editingLevel: CourseLevel | null;
  onClose: () => void;
  onSave: (
    data: Pick<CourseLevel, "name" | "description" | "is_active">,
  ) => void;
}

const LevelFormContent = ({
  editingLevel,
  onClose,
  onSave,
}: LevelFormContentProps) => {
  const [name, setName] = useState(editingLevel?.name ?? "");
  const [description, setDescription] = useState(
    editingLevel?.description ?? "",
  );
  const [isActive, setIsActive] = useState(editingLevel?.is_active ?? true);
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const validate = () => {
    const cleanName = name.trim();
    const cleanDescription = description.trim();
    let valid = true;

    if (
      cleanName.length < 3 ||
      cleanName.length > 50 ||
      !/[\p{L}\p{N}]/u.test(cleanName)
    ) {
      setNameError("Enter a level name between 3 and 50 characters.");
      valid = false;
    } else {
      setNameError("");
    }

    if (
      cleanDescription.length > 300 ||
      (cleanDescription.length > 0 &&
        (cleanDescription.length < 3 ||
          !/[\p{L}\p{N}]/u.test(cleanDescription)))
    ) {
      setDescriptionError(
        "Description must be empty or contain 3–300 characters.",
      );
      valid = false;
    } else {
      setDescriptionError("");
    }

    return valid;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      is_active: isActive,
    });
    onClose();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="level-form-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
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
            aria-label="Close modal"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/40 transition hover:bg-white/[0.06] hover:text-white"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5 px-6 py-6">
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
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={Boolean(nameError)}
                aria-describedby={nameError ? "level-name-error" : undefined}
                className={`h-11 w-full rounded-xl border ${
                  nameError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10`}
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
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                aria-invalid={Boolean(descriptionError)}
                aria-describedby={
                  descriptionError ? "level-description-error" : undefined
                }
                className={`w-full resize-none rounded-xl border ${
                  descriptionError ? "border-red-400/60" : "border-white/[0.08]"
                } bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/25 focus:border-[#34D399]/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-[#34D399]/10`}
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
                    Optional. Leave empty or enter 3–300 characters.
                  </span>
                )}
                <p className="shrink-0 text-[11px] text-white/30">
                  {description.length}/300 characters
                </p>
              </div>
            </div>

            <fieldset>
              <legend className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
                Status
              </legend>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    isActive
                      ? "border-[#34D399]/40 bg-[#34D399]/[0.08]"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <input
                    type="radio"
                    name="level-status"
                    value="active"
                    checked={isActive}
                    onChange={() => setIsActive(true)}
                    className="h-4 w-4 accent-[#34D399]"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">
                      Active
                    </span>
                    <span className="mt-0.5 block text-xs text-white/40">
                      Available for course setup
                    </span>
                  </span>
                </label>

                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition ${
                    !isActive
                      ? "border-red-400/40 bg-red-500/[0.06]"
                      : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  <input
                    type="radio"
                    name="level-status"
                    value="inactive"
                    checked={!isActive}
                    onChange={() => setIsActive(false)}
                    className="h-4 w-4 accent-red-400"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-white">
                      Inactive
                    </span>
                    <span className="mt-0.5 block text-xs text-white/40">
                      Not available for new courses
                    </span>
                  </span>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-10 cursor-pointer rounded-xl border border-white/[0.08] px-5 text-sm font-medium text-white/60 transition hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#34D399]/25 bg-[#34D399]/10 px-5 text-sm font-medium text-[#34D399] transition hover:bg-[#34D399]/15"
            >
              <CheckCircle2 className="h-4 w-4" />
              {editingLevel ? "Save Changes" : "Create Level"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default LevelFormModal;
