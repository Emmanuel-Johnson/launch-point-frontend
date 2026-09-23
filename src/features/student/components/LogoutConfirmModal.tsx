import { useEffect } from "react";
import { useAppSelector } from "../../../app/store/hooks";

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
  const user = useAppSelector((state) => state.auth.user);

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
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
      className="lpc-backdrop fixed inset-0 z-[9999] flex items-center justify-center bg-[#050308]/85 px-4 backdrop-blur-xl"
      onClick={() => {
        if (!isLoading) {
          onCancel();
        }
      }}
    >
      {/*
        Entrance runs once on mount.
        The modal unmounts on close, so it remounts on every open.
        Pure CSS keeps state out of the render path.
      */}
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
            transform: translateY(14px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes lpc-pulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.09);
          }
        }

        .lpc-backdrop {
          animation: lpc-fade 0.35s ease-out;
        }

        .lpc-card {
          animation: lpc-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lpc-ring {
          animation: lpc-pulse 3.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .lpc-backdrop,
          .lpc-card,
          .lpc-ring {
            animation: none;
          }
        }
      `}</style>

      <div
        onClick={(event) => event.stopPropagation()}
        className="lpc-card relative w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-[#100D1A] via-[#0B0912] to-[#08060E] p-8 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.95)]"
      >
        {/* Fine grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Red spotlight */}
        <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-red-500/[0.08] blur-3xl" />

        {/* Brand violet ambient */}
        <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#7C5CFF]/[0.05] blur-3xl" />

        {/* Top hairline highlight */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Inner glass edge */}
        <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.04]" />

        {/* Icon */}
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
          {/* Slow glow pulse */}
          <span className="lpc-ring pointer-events-none absolute inset-1 rounded-2xl bg-red-500/15 blur-md" />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-red-500/[0.18] to-red-500/[0.06] text-red-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-red-400/30">
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
        </div>

        {/* Content */}
        <div className="relative mt-5 text-center">
          <h3
            id="logout-modal-title"
            className="font-['Space_Grotesk'] text-[1.35rem] font-semibold tracking-tight text-white"
          >
            Log out,{" "}
            <span className="text-red-300">
              {user?.full_name || "your account"}
            </span>
            ?
          </h3>

          <p
            id="logout-modal-description"
            className="mx-auto mt-2.5 max-w-[15rem] text-sm leading-6 text-white/50"
          >
            You'll be signed out of your account and returned to the sign-in
            page.
          </p>
        </div>

        {/* Actions */}
        <div className="relative mt-7 flex flex-col gap-3">
          {/* Logout Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-red-500/25 to-red-500/[0.12] px-4 py-3 text-sm font-semibold text-red-100 outline-none ring-1 ring-inset ring-red-400/30 transition-all duration-300 ease-out hover:from-red-500/35 hover:to-red-500/20 hover:text-white hover:shadow-[0_10px_35px_-10px_rgba(239,68,68,0.55)] focus-visible:ring-2 focus-visible:ring-red-400/60 motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
          >
            {/* Glass Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

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
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm font-medium text-white/60 outline-none transition-all duration-300 ease-out hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/25 motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
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
