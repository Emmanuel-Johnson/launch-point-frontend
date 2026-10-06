import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const InstructorApplicationListPage = () => {
  const navigate = useNavigate();

  // Sample data — replace with API data later
  const applications = [
    {
      id: 1,
      job_title: "Full Stack Developer",
      submitted_at: "October 7, 2026",
      status: "pending",
    },
    {
      id: 2,
      job_title: "Python & Django Instructor",
      submitted_at: "September 12, 2026",
      status: "approved",
    },
    {
      id: 3,
      job_title: "React Developer",
      submitted_at: "August 20, 2026",
      status: "rejected",
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          label: "Approved",
          icon: CheckCircle2,
          className:
            "border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
        };

      case "rejected":
        return {
          label: "Rejected",
          icon: XCircle,
          className: "border-red-400/20 bg-red-500/10 text-red-400",
        };

      default:
        return {
          label: "Pending",
          icon: Clock3,
          className: "border-amber-400/20 bg-amber-500/10 text-amber-400",
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#07111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            My Applications
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            View and track your instructor applications.
          </p>
        </div>

        {/* Applications */}
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => {
              const status = getStatusConfig(application.status);
              const StatusIcon = status.icon;

              return (
                <div
                  key={application.id}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-blue-400/20 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    {/* Left */}
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                        <FileText size={22} />
                      </div>

                      <div>
                        <h2 className="font-semibold text-white">
                          Instructor Application
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                          {application.job_title}
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                          <CalendarDays size={14} />
                          Submitted {application.submitted_at}
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${status.className}`}
                      >
                        <StatusIcon size={14} />
                        {status.label}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/instructor/applications/${application.id}`,
                          )
                        }
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
                      >
                        View Details
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
              <FileText size={26} />
            </div>

            <h2 className="text-lg font-semibold">
              No applications yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              You haven't submitted an instructor application yet.
            </p>

            <button
              type="button"
              onClick={() => navigate("/instructor")}
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:from-blue-400 hover:to-blue-500"
            >
              Become an Instructor
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorApplicationListPage;
