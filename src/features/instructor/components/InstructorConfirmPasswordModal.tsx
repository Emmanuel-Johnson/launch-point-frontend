import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, LockKeyhole } from "lucide-react";

interface ConfirmPasswordModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmPasswordModal = ({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: ConfirmPasswordModalProps) => {
  // Lock background scrolling and allow Escape to close the modal.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        onCancel();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onCancel]);

  if (!isOpen) return null;

  // Render directly under document.body to escape parent stacking contexts.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-password-title"
      aria-describedby="confirm-password-description"
      className="confirm-password-modal-overlay fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/75 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isLoading) {
          onCancel();
        }
      }}
    >
      <style>{`
        @keyframes confirm-password-modal-overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes confirm-password-modal-enter {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .confirm-password-modal-overlay {
          animation: confirm-password-modal-overlay 0.2s ease-out;
        }

        .confirm-password-modal-panel {
          animation: confirm-password-modal-enter 0.25s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .confirm-password-modal-overlay,
          .confirm-password-modal-panel {
            animation: none;
          }
        }
      `}</style>

      <div className="confirm-password-modal-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_70px_rgba(0,0,0,0.65)]">
        {/* Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]" />

        {/* Header */}
        <div className="flex items-start gap-4 border-b border-white/[0.06] px-6 py-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/[0.1] text-[#93C5FD]">
            <LockKeyhole className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Account Security
            </p>

            <h3
              id="confirm-password-title"
              className="mt-1 truncate text-lg font-semibold tracking-tight text-white"
            >
              Confirm password change
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Description */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
            <p
              id="confirm-password-description"
              className="text-sm leading-6 text-white/60"
            >
              Are you sure you want to update your password? After the change,
              you will be logged out and need to sign in again using your new
              password.
            </p>
          </div>

          {/* Warning */}
          <div className="mt-4 flex gap-3 rounded-xl border border-[#E8C67A]/15 bg-[#E8C67A]/[0.05] px-4 py-3">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C67A]/80"
              strokeWidth={1.8}
            />

            <p className="text-xs leading-5 text-white/45">
              Make sure your new password is saved somewhere secure before
              continuing.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={onCancel}
              className="flex-1 cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={onConfirm}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:from-[#2563EB] hover:to-[#60A5FA] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" className="opacity-30" />
                  <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
                </svg>
              ) : (
                "Confirm update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmPasswordModal;
