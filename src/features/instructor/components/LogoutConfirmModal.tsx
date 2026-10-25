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
      className="lpc-backdrop fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black/70 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-black/60"
      onClick={() => {
        if (!isLoading) {
          onCancel();
        }
      }}
    >
      {/* Ambient red aurora glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 -rotate-[14deg] rounded-[42%] blur-[150px]"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, rgba(239,68,68,0.20), rgba(244,63,94,0.10), rgba(220,38,38,0.18), rgba(244,63,94,0.10), rgba(239,68,68,0.20))",
        }}
      />

      {/* Directional light beam */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-44 -translate-x-1/2 -translate-y-1/2 rotate-[38deg] rounded-full bg-gradient-to-b from-transparent via-rose-500/20 to-transparent blur-[100px]" />

      {/* Warm accent glow */}
      <div className="pointer-events-none absolute left-[40%] top-[34%] h-40 w-72 -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] rounded-[45%] bg-red-600/15 blur-[110px]" />

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
            transform: translateY(16px) scale(0.96);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes lpc-sheen {
          0% {
            opacity: 0;
            transform: translateX(-120%) skewX(-12deg);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateX(120%) skewX(-12deg);
          }
        }

        .lpc-backdrop {
          animation: lpc-fade 0.4s ease-out;
        }

        .lpc-card {
          animation: lpc-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .lpc-card-sheen {
          animation: lpc-sheen 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both;
        }

        @media (prefers-reduced-motion: reduce) {
          .lpc-backdrop,
          .lpc-card,
          .lpc-card-sheen {
            animation: none;
          }
        }
      `}</style>

      {/* Modal Card */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="lpc-card relative w-full max-w-md"
      >
        {/* Gradient hairline border */}
        <div className="relative overflow-hidden rounded-[1.25rem] bg-gradient-to-b from-white/[0.16] via-white/[0.05] to-white/[0.015] p-px shadow-[0_40px_120px_-24px_rgba(0,0,0,0.95)]">
          {/* Inner surface */}
          <div className="relative overflow-hidden rounded-[calc(1.25rem-1px)] bg-gradient-to-b from-[#0d0d0d] to-[#050505] p-7">
            {/* Fine grain texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Sweeping sheen on mount */}
            <div className="lpc-card-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

            {/* Soft spotlight */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-white/[0.07] blur-3xl" />

            {/* Top hairline highlight */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            {/* Logout Icon */}
            <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-red-500/20 to-red-500/5 text-red-300 ring-1 ring-inset ring-red-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_24px_-8px_rgba(239,68,68,0.5)]">
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-red-500/20 blur-md" />

              <svg
                className="relative h-6 w-6"
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
            <div className="relative mt-5 cursor-default text-center">
              <h3
                id="instructor-logout-modal-title"
                className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text font-['Space_Grotesk'] text-2xl font-light tracking-tight text-transparent"
              >
                Log out?
              </h3>

              <p
                id="instructor-logout-modal-description"
                className="mx-auto mt-3 max-w-[22rem] text-[0.9375rem] font-light leading-relaxed tracking-wide text-white/50"
              >
                You'll be signed out of your instructor account and returned to
                the sign-in page.
              </p>
            </div>

            {/* Actions */}
            <div className="relative mt-7 flex flex-col gap-3">
              {/* Logout Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={onConfirm}
                className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-b from-red-500/25 to-red-600/15 px-4 py-2.5 text-sm font-medium text-red-100 ring-1 ring-inset ring-red-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-300 ease-out hover:from-red-500/35 hover:to-red-600/25 hover:text-white hover:ring-red-400/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_8px_24px_-10px_rgba(239,68,68,0.65)] motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
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
                className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:text-white motion-safe:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
              >
                {/* Glass Shine */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.1] to-transparent transition-transform duration-1000 group-hover:translate-x-full motion-reduce:hidden" />

                <span className="relative z-10">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
