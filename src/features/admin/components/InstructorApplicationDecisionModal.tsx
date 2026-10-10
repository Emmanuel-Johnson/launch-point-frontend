import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, X, XCircle } from "lucide-react";

export type ApplicationDecision = "approved" | "rejected";

interface InstructorApplicationDecisionModalProps {
  decision: ApplicationDecision;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (message: string) => void;
}

const DEFAULT_APPROVAL_MESSAGE =
  "Congratulations! Your application has been approved. Welcome to our team of instructors. We look forward to having you share your knowledge and help learners grow.";

const InstructorApplicationDecisionModal = ({
  decision,
  isSubmitting,
  onClose,
  onConfirm,
}: InstructorApplicationDecisionModalProps) => {
  const isApproval = decision === "approved";

  const [message, setMessage] = useState(
    isApproval ? DEFAULT_APPROVAL_MESSAGE : "",
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSubmitting, onClose]);

  const trimmedMessage = message.trim();
  const DecisionIcon = isApproval ? CheckCircle2 : XCircle;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="application-decision-title"
      aria-describedby="application-decision-description"
      className="instructor-decision-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 py-6"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <style>{`
        @keyframes instructor-decision-overlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes instructor-decision-enter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .instructor-decision-modal-overlay {
          animation: instructor-decision-overlay 0.2s ease-out;
        }

        .instructor-decision-modal-panel {
          animation: instructor-decision-enter 0.25s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .instructor-decision-modal-overlay,
          .instructor-decision-modal-panel {
            animation: none;
          }
        }
      `}</style>

      <section className="instructor-decision-modal-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_70px_rgba(0,0,0,0.65)]">
        {/* Top Status Bar */}
        <div
          className={`h-1 w-full ${isApproval ? "bg-[#34D399]" : "bg-red-500"}`}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
          <div className="flex min-w-0 items-start gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                isApproval
                  ? "bg-[#34D399]/[0.08] text-[#34D399]"
                  : "bg-red-500/[0.08] text-red-400"
              }`}
            >
              <DecisionIcon className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
                Instructor Application
              </p>

              <h2
                id="application-decision-title"
                className="mt-1 text-lg font-semibold tracking-tight text-white"
              >
                {isApproval ? "Approve Application" : "Reject Application"}
              </h2>

              <p
                id="application-decision-description"
                className="mt-1 text-xs leading-5 text-white/45"
              >
                {isApproval
                  ? "Confirm approval and add the message the applicant will see."
                  : "Confirm rejection and explain the reason to the applicant."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close modal"
            className="shrink-0 rounded-lg p-2 text-white/35 transition-all duration-200 hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Decision Information */}
          <div
            className={`rounded-xl border px-4 py-3 ${
              isApproval
                ? "border-[#34D399]/10 bg-[#34D399]/[0.04]"
                : "border-red-400/10 bg-red-500/[0.04]"
            }`}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
              Decision
            </p>

            <p
              className={`mt-1 text-sm font-medium ${
                isApproval ? "text-[#34D399]" : "text-red-400"
              }`}
            >
              {isApproval
                ? "Application will be approved"
                : "Application will be rejected"}
            </p>
          </div>

          {/* Approval Message / Rejection Reason */}
          <div className="mt-5">
            <label
              htmlFor="application-admin-message"
              className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em] text-white/45"
            >
              {isApproval ? "Approval Message" : "Rejection Reason"}
            </label>

            <textarea
              id="application-admin-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              maxLength={2000}
              required
              disabled={isSubmitting}
              placeholder={
                isApproval
                  ? "Write an approval message for the applicant..."
                  : "Explain why this application is being rejected..."
              }
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-sm leading-6 text-white outline-none transition-all duration-200 placeholder:text-white/25 hover:border-white/[0.12] focus:border-[#34D399]/40 focus:ring-2 focus:ring-[#34D399]/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-white/35">
                {trimmedMessage
                  ? "Message will be saved with the decision."
                  : "A message is required."}
              </p>

              <span className="shrink-0 text-xs tabular-nums text-white/30">
                {message.length}/2000
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={onClose}
              className="flex-1 cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-sm font-medium text-white/55 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!trimmedMessage || isSubmitting}
              onClick={() => onConfirm(trimmedMessage)}
              aria-label={
                isSubmitting
                  ? isApproval
                    ? "Approving application"
                    : "Rejecting application"
                  : isApproval
                    ? "Approve application"
                    : "Reject application"
              }
              className={`flex h-[42px] flex-1 cursor-pointer items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                isApproval
                  ? "bg-[#34D399] text-black hover:bg-[#6EE7B7]"
                  : "bg-red-500 text-white hover:bg-red-400"
              }`}
            >
              {isSubmitting ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" className="opacity-30" />
                  <path d="M21 12a9 9 0 0 0-9-9" strokeLinecap="round" />
                </svg>
              ) : (
                <>
                  <DecisionIcon className="mr-2 h-4 w-4" strokeWidth={2} />
                  {isApproval ? "Approve" : "Reject"}
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default InstructorApplicationDecisionModal;
