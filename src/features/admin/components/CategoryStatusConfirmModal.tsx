import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Tags, Tag, AlertTriangle } from "lucide-react";

type CategoryStatusConfirmModalProps = {
  isOpen: boolean;
  isLoading: boolean;
  categoryName: string;
  isActive: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const CategoryStatusConfirmModal = ({
  isOpen,
  isLoading,
  categoryName,
  isActive,
  onCancel,
  onConfirm,
}: CategoryStatusConfirmModalProps) => {
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

  const action = isActive ? "Disable" : "Enable";
  const ActionIcon = isActive ? Tag : Tags;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-status-modal-title"
      aria-describedby="category-status-modal-description"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4"
      onClick={() => {
        if (!isLoading) {
          onCancel();
        }
      }}
    >
      <style>{`
        @keyframes category-status-modal-overlay {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes category-status-modal-enter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .category-status-modal-overlay {
          animation: category-status-modal-overlay 0.2s ease-out;
        }

        .category-status-modal-panel {
          animation: category-status-modal-enter 0.25s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .category-status-modal-overlay,
          .category-status-modal-panel {
            animation: none;
          }
        }
      `}</style>

      <div
        onClick={(event) => event.stopPropagation()}
        className="category-status-modal-panel relative w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] shadow-[0_25px_70px_rgba(0,0,0,0.65)]"
      >
        {/* Top Status Bar */}
        <div
          className={`h-1 w-full ${isActive ? "bg-red-500" : "bg-[#34D399]"}`}
        />

        {/* Header */}
        <div className="flex items-start gap-4 border-b border-white/[0.06] px-6 py-5">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isActive
                ? "bg-red-500/[0.08] text-red-400"
                : "bg-[#34D399]/[0.08] text-[#34D399]"
            }`}
          >
            <ActionIcon className="h-5 w-5" strokeWidth={1.8} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/30">
              Category Status
            </p>

            <h3
              id="category-status-modal-title"
              className="mt-1 truncate text-lg font-semibold tracking-tight text-white"
            >
              {action} Category
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Category */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
              Category
            </p>

            <p className="mt-1 truncate text-sm font-medium text-white/90">
              {categoryName}
            </p>
          </div>

          {/* Warning / Information */}
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
              id="category-status-modal-description"
              className="text-xs leading-5 text-white/45"
            >
              {isActive
                ? "Disabling this category will prevent it from being available for active course categorization."
                : "Enabling this category will make it available for active course categorization."}
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
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                isActive
                  ? "bg-red-500 text-white hover:bg-red-400"
                  : "bg-[#34D399] text-black hover:bg-[#6EE7B7]"
              }`}
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
                <>
                  <ActionIcon className="h-4 w-4" strokeWidth={2} />
                  {action}
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

export default CategoryStatusConfirmModal;
