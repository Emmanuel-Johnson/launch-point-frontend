import { useEffect } from "react";

type LogoutConfirmModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal = ({
  isOpen,
  isLoading,
  onCancel,
  onConfirm,
}: LogoutConfirmModalProps) => {
  // Escape to dismiss + lock background scroll while the modal is open.
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

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

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructor-logout-modal-title"
      aria-describedby="instructor-logout-modal-description"
      className="lpc-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
      onClick={() => {
        if (!isLoading) {
          onCancel();
        }
      }}
    >
      {/* Modal animations */}
      <style>{`
        @keyframes lpc-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes lpc-rise {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .lpc-backdrop {
          animation: lpc-fade 0.4s ease-out;
        }

        .lpc-card {
          animation: lpc-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .lpc-backdrop,
          .lpc-card {
            animation: none;
          }
        }
      `}</style>

      {/* Modal Card */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="lpc-card relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0C0C0C] to-[#060606] p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Soft spotlight */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl" />

        {/* Top hairline highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Icon */}
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-400/25">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12H3m0 0 4-4m-4 4 4 4"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative mt-5 text-center">
          <h3
            id="instructor-logout-modal-title"
            className="font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-white"
          >
            Log out?
          </h3>

          <p
            id="instructor-logout-modal-description"
            className="mx-auto mt-2 max-w-[15rem] text-sm leading-6 text-white/50"
          >
            You'll be signed out of your instructor account and returned to the
            sign-in page.
          </p>
        </div>

        {/* Actions */}
        <div className="relative mt-7 flex flex-col gap-3">
          {/* Logout Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-500/15 px-4 py-2.5 text-sm font-medium text-red-200 ring-1 ring-inset ring-red-400/25 transition-all duration-300 ease-out hover:bg-red-500/25 hover:text-white motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
          >
            {/* Glass Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

            {isLoading ? (
              <svg
                className="relative z-10 h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" className="opacity-25" />

                <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="relative z-10">Log out</span>
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            autoFocus
            disabled={isLoading}
            onClick={onCancel}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/60 transition-all duration-300 ease-out hover:bg-white/[0.05] hover:text-white motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
          >
            {/* Glass Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

            <span className="relative z-10">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
