import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Trash2 } from "lucide-react";

interface LevelDeleteConfirmModalProps {
  isOpen: boolean;
  levelName: string;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LevelDeleteConfirmModal = ({
  isOpen,
  levelName,
  isLoading,
  onCancel,
  onConfirm,
}: LevelDeleteConfirmModalProps) => {
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
  }, [isOpen, onCancel, isLoading]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-level-title"
      aria-describedby="delete-level-description"
      className="ldc-overlay fixed inset-0 z-[100000] flex items-center justify-center px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <style>{`
        @keyframes ldc-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes ldc-rise {
          0% { opacity: 0; transform: translateY(16px) scale(0.97) }
          100% { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes ldc-rail {
          0%, 100% { opacity: 0.7 }
          50% { opacity: 1 }
        }
        .ldc-overlay {
          background:
            radial-gradient(130% 90% at 50% 0%, rgba(239,68,68,0.10), transparent 55%),
            rgba(2, 2, 3, 0.80);
          backdrop-filter: blur(12px) saturate(120%);
          -webkit-backdrop-filter: blur(12px) saturate(120%);
          animation: ldc-fade 0.2s ease-out both;
        }
        .ldc-panel { animation: ldc-rise 0.32s cubic-bezier(0.22,1,0.36,1) both; }
        .ldc-rail { animation: ldc-rail 2.8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ldc-overlay, .ldc-panel, .ldc-rail { animation: none; }
        }
      `}</style>

      <div className="ldc-panel relative w-full max-w-md overflow-hidden rounded-[20px] border border-white/[0.08] bg-[#09090A] shadow-[0_40px_110px_-28px_rgba(0,0,0,0.95)]">
        {/* Left accent rail */}
        <div
          aria-hidden
          className="ldc-rail absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-red-400 via-red-500 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.6)]"
        />
        {/* Soft corner glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-red-500/20 blur-3xl"
        />

        {/* Header */}
        <div className="relative flex items-center gap-4 px-7 pt-7">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-400/15 to-red-600/5 text-red-400 ring-1 ring-inset ring-red-400/25">
            <Trash2 className="h-[22px] w-[22px]" strokeWidth={1.9} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Course Level Management
            </p>
            <h3
              id="delete-level-title"
              className="mt-1 text-[19px] font-semibold tracking-tight text-white"
            >
              Delete Level
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-7 pb-7 pt-6">
          {/* Level chip */}
          <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5">
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-0.5 bg-red-500/60"
            />
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/30">
              Level to Delete
            </p>
            <p className="mt-1 truncate text-[15px] font-medium text-white">
              {levelName}
            </p>
          </div>

          {/* Warning */}
          <div className="mt-4 flex gap-3 rounded-xl border border-red-400/[0.12] bg-red-500/[0.05] px-4 py-3.5">
            <AlertTriangle
              className="mt-px h-[18px] w-[18px] shrink-0 text-red-400"
              strokeWidth={1.9}
            />
            <p
              id="delete-level-description"
              className="text-[12.5px] leading-5 text-white/50"
            >
              This course level will be soft-deleted and removed from the
              available levels. You can’t undo this action from this screen.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 cursor-pointer rounded-xl border border-white/[0.09] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-400/40 bg-gradient-to-b from-red-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_26px_-8px_rgba(239,68,68,0.6),inset_0_1px_0_rgba(255,255,255,0.18)] transition hover:from-red-400 hover:to-red-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2
                    className="h-4 w-4 transition-transform group-hover:-rotate-6"
                    strokeWidth={2}
                  />
                  Delete Level
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default LevelDeleteConfirmModal;
