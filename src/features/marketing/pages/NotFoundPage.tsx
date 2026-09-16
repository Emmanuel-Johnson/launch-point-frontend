import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6c63ff]/10 blur-[120px]" />

      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        {/* 404 */}
        <div className="relative">
          <h1 className="select-none text-[9rem] font-black leading-none tracking-[-0.08em] text-white sm:text-[12rem]">
            404
          </h1>

          <div className="absolute inset-x-0 bottom-4 mx-auto h-px w-32 bg-gradient-to-r from-transparent via-[#6c63ff] to-transparent" />
        </div>

        {/* Message */}
        <h2 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          Looks like you’re lost.
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-gray-400 sm:text-base">
          The page you’re looking for doesn’t exist, has been moved, or may have
          been removed.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>

        {/* Small footer text */}
        <p className="mt-10 text-xs text-gray-600">
          Error code: 404 · Page not found
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
