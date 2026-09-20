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
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
      onClick={() => {
        if (!isLoading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d0d] p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Icon */}
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
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
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-white">Log out?</h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Are you sure you want to log out of your student account?
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          {/* Logout Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="group relative flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-700 ease-out hover:scale-[1.04] hover:bg-red-500/20 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {/* Glass Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-300/[0.12] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

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
              <span className="relative z-10">Logout</span>
            )}
          </button>

          {/* Cancel Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={onCancel}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition-all duration-700 ease-out hover:scale-[1.04] hover:bg-white/[0.04] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {/* Glass Shine */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            {/* Label */}
            <span className="relative z-10">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
