import { useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Copy,
  Download,
  GraduationCap,
  ShieldCheck,
  Clock3,
  LockKeyhole,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { certificates } from "../data/certificateData";

function formatDate(date: string | null): string {
  if (!date) return "Not issued";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CertificateDetailsPage() {
  const navigate = useNavigate();
  const { certificateId } = useParams<{ certificateId: string }>();
  const [copied, setCopied] = useState(false);

  const certificate = certificates.find(
    (item) => item.id === Number(certificateId),
  );

  const isEarned = certificate?.status === "earned";

  const handleCopy = async () => {
    if (!certificate?.certificateNumber) return;

    try {
      await navigator.clipboard.writeText(certificate.certificateNumber);
      setCopied(true);

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!certificate || !isEarned) return;

    // TODO: Replace with your authenticated certificate download API.
    console.info(`Download certificate: ${certificate.certificateNumber}`);
  };

  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#08080D] px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-lg rounded-2xl border border-white/[0.08] bg-[#101016] p-8 text-center">
          <Award className="mx-auto mb-4 text-gray-500" size={42} />

          <h1 className="text-xl font-bold">Certificate not found</h1>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            This certificate does not exist or is no longer available.
          </p>

          <button
            type="button"
            onClick={() => navigate("/student/certificates")}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
          >
            <ArrowLeft size={17} />
            Back to certificates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Back navigation */}
        <button
          type="button"
          onClick={() => navigate("/student/certificates")}
          className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to My Certificates
        </button>

        {/* Page heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-sm text-violet-400">
              <GraduationCap size={18} />
              <span>Student Portal</span>
              <span className="text-gray-600">/</span>
              <span className="text-gray-400">Certificate Details</span>
            </div>

            <h1 className="max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
              {certificate.title}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
              View your certificate information, completion status, and
              certificate identification details.
            </p>
          </div>

          {isEarned && (
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold transition hover:bg-violet-500"
            >
              <Download size={18} />
              Download certificate
            </button>
          )}
        </div>

        {/* Status banner */}
        {isEarned ? (
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.07] p-4 sm:p-5">
            <CheckCircle2
              size={22}
              className="mt-0.5 shrink-0 text-emerald-400"
            />

            <div>
              <h2 className="font-semibold text-emerald-300">
                Certificate earned
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                Congratulations! You have completed this course and earned your
                certificate.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/[0.07] p-4 sm:p-5">
            <LockKeyhole size={22} className="mt-0.5 shrink-0 text-amber-400" />

            <div>
              <h2 className="font-semibold text-amber-300">
                Certificate not available yet
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-400">
                Complete the remaining course content to become eligible for
                your certificate.
              </p>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">
          {/* Certificate preview */}
          <div className="space-y-5 lg:col-span-3">
            <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101016]">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <h2 className="font-semibold">Certificate preview</h2>

                <span className="text-xs text-gray-500">Launch Point LMS</span>
              </div>

              <div className="bg-gradient-to-br from-violet-950/40 via-[#101016] to-[#0C0C12] p-4 sm:p-8">
                {isEarned ? (
                  <div className="relative border-2 border-violet-400/40 bg-[#11101B] p-5 text-center sm:p-10">
                    <div className="absolute inset-2 border border-violet-400/15" />

                    <div className="relative">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/10">
                        <Award size={34} className="text-violet-300" />
                      </div>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">
                        Launch Point LMS
                      </p>

                      <h3 className="mt-5 font-serif text-2xl font-bold sm:text-3xl">
                        Certificate
                      </h3>

                      <p className="mt-2 text-sm text-gray-300">
                        of Completion
                      </p>

                      <div className="mx-auto my-5 h-px max-w-xs bg-violet-400/30" />

                      <p className="text-xs text-gray-400">
                        This certifies successful completion of
                      </p>

                      <p className="mt-3 text-lg font-semibold leading-snug text-white sm:text-xl">
                        {certificate.title}
                      </p>

                      <p className="mt-5 text-xs text-gray-400">
                        Course instructor
                      </p>

                      <p className="mt-1 font-medium text-violet-200">
                        {certificate.instructor}
                      </p>

                      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-5 text-left sm:flex-row sm:items-end">
                        <div>
                          <p className="text-xs text-gray-500">Date of issue</p>

                          <p className="mt-1 text-sm text-gray-200">
                            {formatDate(certificate.issuedAt)}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-xs text-gray-500">
                            Certificate ID
                          </p>

                          <p className="mt-1 break-all font-mono text-xs text-violet-300">
                            {certificate.certificateNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/10 px-6 py-10 text-center">
                    <div className="flex size-16 items-center justify-center rounded-2xl bg-white/[0.04]">
                      <LockKeyhole size={32} className="text-gray-500" />
                    </div>

                    <h3 className="mt-5 text-lg font-semibold">
                      Keep learning!
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
                      Your certificate preview will become available once you
                      complete the course.
                    </p>

                    <div className="mt-6 w-full max-w-sm">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-gray-400">Course progress</span>

                        <span className="font-semibold text-violet-300">
                          {certificate.progress}%
                        </span>
                      </div>

                      <div
                        className="h-2 overflow-hidden rounded-full bg-white/10"
                        role="progressbar"
                        aria-label="Course progress"
                        aria-valuenow={certificate.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="h-full rounded-full bg-violet-500 transition-all"
                          style={{
                            width: `${certificate.progress}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Certificate identification */}
            {isEarned && (
              <section className="rounded-2xl border border-white/[0.08] bg-[#101016] p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                    <ShieldCheck size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold">
                      Certificate identification
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Use this unique ID to identify this certificate.
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Certificate number</p>

                    <p className="mt-2 break-all font-mono text-sm text-violet-300">
                      {certificate.certificateNumber}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}

                    {copied ? "Copied" : "Copy ID"}
                  </button>
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  This sample page displays a certificate ID only. Connect a
                  backend verification endpoint to confirm certificate
                  authenticity.
                </p>
              </section>
            )}
          </div>

          {/* Details sidebar */}
          <aside className="space-y-5 lg:col-span-2">
            <section className="rounded-2xl border border-white/[0.08] bg-[#101016] p-5 sm:p-6">
              <h2 className="font-semibold">Certificate information</h2>

              <div className="mt-5 space-y-5">
                <InfoRow
                  icon={<BookOpen size={18} />}
                  label="Course"
                  value={certificate.title}
                />

                <InfoRow
                  icon={<GraduationCap size={18} />}
                  label="Instructor"
                  value={certificate.instructor}
                />

                <InfoRow
                  icon={<Award size={18} />}
                  label="Category"
                  value={certificate.category}
                />

                <InfoRow
                  icon={<CalendarDays size={18} />}
                  label="Date issued"
                  value={formatDate(certificate.issuedAt)}
                />

                <InfoRow
                  icon={<Clock3 size={18} />}
                  label="Completion progress"
                  value={`${certificate.progress}%`}
                />

                <div className="border-t border-white/[0.07] pt-5">
                  <p className="text-xs text-gray-500">Status</p>

                  <span
                    className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                      isEarned
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                        : "border border-amber-500/20 bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {isEarned ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <LockKeyhole size={14} />
                    )}

                    {isEarned ? "Earned" : "In progress"}
                  </span>
                </div>
              </div>
            </section>

            {/* Helpful information */}
            <section className="rounded-2xl border border-violet-500/15 bg-violet-500/[0.05] p-5">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-violet-500/10 p-2 text-violet-300">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">About your certificate</h2>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    Your certificate records your achievement after successfully
                    completing a course on Launch Point LMS.
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-gray-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-violet-400"
                      />
                      <span>Keep your certificate ID for reference.</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-violet-400"
                      />
                      <span>
                        Download your certificate when it is available.
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-violet-400"
                      />
                      <span>
                        Share your achievement with your professional network.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button
              type="button"
              onClick={() => navigate("/student/certificates")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition hover:border-violet-500/30 hover:bg-white/[0.03] hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to My Certificates
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 text-gray-500">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500">{label}</p>

        <p className="mt-1 break-words text-sm font-medium leading-6 text-gray-200">
          {value}
        </p>
      </div>
    </div>
  );
}
