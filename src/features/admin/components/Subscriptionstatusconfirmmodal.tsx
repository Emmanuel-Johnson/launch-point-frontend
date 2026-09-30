import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Power, PowerOff, Loader2, AlertTriangle } from "lucide-react";

/* -------------------------------- */
/* Props                            */
/* -------------------------------- */

interface SubscriptionStatusConfirmModalProps {
  isOpen: boolean;
  /** Current status of the plan. Confirming flips it. */
  isActive: boolean;
  planName?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const SubscriptionStatusConfirmModal = ({
  isOpen,
  isActive,
  planName,
  isLoading = false,
  onCancel,
  onConfirm,
}: SubscriptionStatusConfirmModalProps) => {
  /*
   * Close on Escape (unless mid-action) + lock background scroll while open.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) {
    return null;
  }

  // Clicking the backdrop closes the modal (but not mid-action).
  const handleOverlayClick = () => {
    if (!isLoading) {
      onCancel();
    }
  };

  // Deactivating an active plan is the destructive path.
  const deactivating = isActive;

  const title = deactivating ? "Deactivate Plan" : "Activate Plan";

  const message = deactivating
    ? "Subscribers won't be able to purchase this plan while it's inactive. You can reactivate it anytime."
    : "This plan will become available to subscribers right away.";

  const confirmLabel = deactivating ? "Deactivate" : "Activate";

  return createPortal(
    <>
      {/* Scoped entrance keyframes */}
      <style>{`
        @keyframes spConfirmOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spConfirmPanel {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .spc-overlay { animation: spConfirmOverlay 0.2s ease-out both; }
        .spc-panel { animation: spConfirmPanel 0.28s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .spc-overlay, .spc-panel { animation: none; }
        }
      `}</style>

      {/* Overlay (clicking outside closes the modal) */}
      <div
        className="spc-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        {/* Panel */}
        <div
          role="alertdialog"
          aria-modal="true"
          onClick={(event) => event.stopPropagation()}
          className="spc-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 text-white shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          {/* ambient glow tinted by the action */}
          <div
            className={`pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl ${
              deactivating ? "bg-red-500/10" : "bg-[#34D399]/10"
            }`}
          />

          {/* Icon */}
          <div className="relative flex justify-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ring-1 ring-inset ${
                deactivating
                  ? "from-red-500/20 to-red-500/5 shadow-[0_0_26px_-8px_rgba(239,68,68,0.6)] ring-red-500/25"
                  : "from-[#34D399]/20 to-[#34D399]/5 shadow-[0_0_26px_-8px_rgba(52,211,153,0.6)] ring-[#34D399]/25"
              }`}
            >
              {deactivating ? (
                <PowerOff size={24} className="text-red-400" />
              ) : (
                <Power size={24} className="text-[#34D399]" />
              )}
            </div>
          </div>

          {/* Title + message */}
          <div className="relative mt-4 text-center">
            <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

            {planName && (
              <p className="mx-auto mt-1.5 max-w-[22rem] truncate text-sm font-medium text-white/80">
                {planName}
              </p>
            )}

            <p className="mx-auto mt-2 max-w-[24rem] text-sm leading-relaxed text-white/45">
              {message}
            </p>
          </div>

          {/* Caution note (only when deactivating) */}
          {deactivating && (
            <div className="relative mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/15 bg-red-500/[0.06] px-3.5 py-3">
              <AlertTriangle
                size={15}
                className="mt-0.5 shrink-0 text-red-400"
              />
              <p className="text-xs leading-relaxed text-red-300/80">
                Existing subscribers keep their access, but no new purchases can
                be made until you reactivate.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="relative mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="inline-flex h-10 flex-1 cursor-pointer items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`group relative inline-flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border text-sm font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
                deactivating
                  ? "border-red-500/30 bg-gradient-to-br from-red-500/20 to-red-500/5 text-red-400 shadow-[0_0_20px_-8px_rgba(239,68,68,0.6)] hover:border-red-500/50 hover:from-red-500/25"
                  : "border-[#34D399]/30 bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 text-[#34D399] shadow-[0_0_20px_-8px_rgba(52,211,153,0.6)] hover:border-[#34D399]/50 hover:from-[#34D399]/25"
              }`}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {isLoading ? (
                <Loader2 size={18} className="relative z-10 animate-spin" />
              ) : (
                <>
                  {deactivating ? (
                    <PowerOff size={15} className="relative z-10" />
                  ) : (
                    <Power size={15} className="relative z-10" />
                  )}
                  <span className="relative z-10">{confirmLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body,
  );
};

export default SubscriptionStatusConfirmModal;
