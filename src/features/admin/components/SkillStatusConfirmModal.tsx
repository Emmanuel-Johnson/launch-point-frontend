import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Code2, Tags, Tag } from "lucide-react";

interface SkillStatusConfirmModalProps {
  isOpen: boolean;
  isLoading: boolean;
  skillName: string;
  isActive: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SkillStatusConfirmModal = ({
  isOpen,
  isLoading,
  skillName,
  isActive,
  onCancel,
  onConfirm,
}: SkillStatusConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  const action = isActive ? "Disable" : "Enable";
  const ActionIcon = isActive ? Tag : Tags;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skill-status-title"
      aria-describedby="skill-status-description"
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
        <div
          className={`h-1 w-full ${isActive ? "bg-red-500" : "bg-[#34D399]"}`}
        />

        <div className="flex items-start gap-4 border-b border-white/[0.06] px-6 py-5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isActive
                ? "bg-red-500/[0.08] text-red-400"
                : "bg-[#34D399]/[0.08] text-[#34D399]"
            }`}
          >
            {isActive ? (
              <Tag className="h-5 w-5" strokeWidth={1.8} />
            ) : (
              <Code2 className="h-5 w-5" strokeWidth={1.8} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Course Skill Status
            </p>

            <h3
              id="skill-status-title"
              className="mt-1 text-lg font-semibold tracking-tight text-white"
            >
              {action} Skill
            </h3>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
              Skill
            </p>

            <p className="mt-1 truncate text-sm font-medium text-white/90">
              {skillName}
            </p>
          </div>

          <div
            className={`mt-4 flex gap-3 rounded-xl border px-4 py-3 ${
              isActive
                ? "border-red-400/10 bg-red-500/[0.04]"
                : "border-[#34D399]/10 bg-[#34D399]/[0.04]"
            }`}
          >
            <AlertTriangle
              className={`mt-0.5 h-4 w-4 shrink-0 ${
                isActive ? "text-red-400/80" : "text-[#34D399]/80"
              }`}
              strokeWidth={1.8}
            />

            <p
              id="skill-status-description"
              className="text-xs leading-5 text-white/45"
            >
              {isActive
                ? "Disabling this skill may prevent it from being selected for new courses."
                : "Enabling this skill will make it available for course setup."}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={onCancel}
              className="flex-1 cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-white/55 transition hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                isActive
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-[#34D399] text-black hover:bg-[#6EE7B7]"
              }`}
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
              ) : (
                <ActionIcon className="h-4 w-4" strokeWidth={2} />
              )}

              {isLoading ? "Updating..." : action}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SkillStatusConfirmModal;
