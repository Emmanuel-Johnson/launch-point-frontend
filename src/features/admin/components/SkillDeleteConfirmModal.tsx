import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2 } from "lucide-react";

interface SkillDeleteConfirmModalProps {
  isOpen: boolean;
  skillName: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SkillDeleteConfirmModal = ({
  isOpen,
  skillName,
  isLoading,
  onCancel,
  onConfirm,
}: SkillDeleteConfirmModalProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) onCancel();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel, isLoading]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-skill-title"
      aria-describedby="delete-skill-description"
      className="ldc-overlay fixed inset-0 z-[100000] flex items-center justify-center px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) onCancel();
      }}
    >
      <style>{`
        @keyframes ldc-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ldc-pop { 0% { opacity: 0; transform: translateY(10px) scale(0.96) } 100% { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes ldc-ring { 0% { opacity: 0; transform: scale(0.6) } 100% { opacity: 1; transform: scale(1) } }
        .ldc-overlay { background: rgba(2, 2, 3, 0.80); backdrop-filter: blur(12px) saturate(120%); -webkit-backdrop-filter: blur(12px) saturate(120%); animation: ldc-fade 0.2s ease-out both; }
        .ldc-panel { animation: ldc-pop 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .ldc-badge { animation: ldc-ring 0.42s cubic-bezier(0.22, 1, 0.36, 1) 0.06s both; }
        .ldc-button { transition: background-color 300ms cubic-bezier(0.22, 1, 0.36, 1), border-color 300ms cubic-bezier(0.22, 1, 0.36, 1), color 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 320ms cubic-bezier(0.22, 1, 0.36, 1), transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease; }
        .ldc-button:focus-visible { outline: 2px solid rgba(248, 113, 113, 0.9); outline-offset: 3px; }
        @media (prefers-reduced-motion: reduce) { .ldc-overlay, .ldc-panel, .ldc-badge, .ldc-button { animation: none; transition: none; } }
      `}</style>

      <div className="ldc-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09090A] px-7 py-8 text-center shadow-[0_40px_110px_-28px_rgba(0,0,0,0.95)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-red-500/15 blur-3xl"
        />
        <div className="ldc-badge relative mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-400/15 to-red-600/5 text-red-400 ring-1 ring-inset ring-red-400/25">
          <Trash2 className="h-7 w-7" strokeWidth={1.8} />
        </div>
        <h3
          id="delete-skill-title"
          className="relative mt-5 text-[20px] font-semibold tracking-tight text-white"
        >
          Delete this skill?
        </h3>
        <p
          id="delete-skill-description"
          className="relative mx-auto mt-2 max-w-[19rem] text-[13px] leading-5 text-white/50"
        >
          This skill will be soft-deleted and removed from the available skills.
          You can’t undo this action from this screen.
        </p>
        <div className="relative mx-auto mt-5 inline-flex max-w-full items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2">
          <AlertTriangle
            className="h-3.5 w-3.5 shrink-0 text-red-400"
            strokeWidth={2}
          />
          <span className="truncate text-[13px] font-medium text-white">
            {skillName}
          </span>
        </div>
        <div className="relative mt-7 flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="ldc-button group flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-gradient-to-b from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_26px_-8px_rgba(239,68,68,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] hover:border-red-300/60 hover:from-red-400 hover:to-red-500 hover:shadow-[0_10px_32px_-8px_rgba(239,68,68,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" strokeWidth={2} />
                Delete Skill
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="ldc-button w-full cursor-pointer rounded-xl border border-white/[0.09] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/60 hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default SkillDeleteConfirmModal;
