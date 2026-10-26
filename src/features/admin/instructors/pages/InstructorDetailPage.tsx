import {
  ArrowLeft,
  Ban,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  Globe,
  GraduationCap,
  Hash,
  Mail,
  MapPin,
  User,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAdminInstructorDetail,
  updateAdminInstructorStatus,
  type AdminInstructorDetail,
} from "../api/adminInstructorApi";
import InstructorStatusConfirmModal from "../components/InstructorStatusConfirmModal";

type Instructor = AdminInstructorDetail;

const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();

const formatDate = (date: string) => {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DetailSectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-4 flex items-center gap-3">
    <span
      aria-hidden="true"
      className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
    />
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 text-xs text-white/40">{description}</p>
    </div>
  </div>
);

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) => (
  <div className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
      {icon}
    </div>
    <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
      {label}
    </p>
    <p className="mt-1 break-words text-sm font-medium text-white">
      {value || "Not added"}
    </p>
  </div>
);

const SocialCard = ({
  name,
  url,
  icon,
}: {
  name: string;
  url: string;
  icon: ReactNode;
}) => {
  const isValidUrl = Boolean(url?.trim());

  return (
    <a
      href={isValidUrl ? url : undefined}
      target={isValidUrl ? "_blank" : undefined}
      rel={isValidUrl ? "noopener noreferrer" : undefined}
      aria-disabled={!isValidUrl}
      onClick={(event) => {
        if (!isValidUrl) event.preventDefault();
      }}
      className={`group flex min-w-0 items-start gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 ${
        isValidUrl
          ? "cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.03]"
          : "cursor-not-allowed opacity-50"
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/70 ring-1 ring-inset ring-white/[0.06] transition-colors group-hover:text-[#6EE7B7]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="mt-1 break-all text-xs text-white/35">
          {url || "Not added"}
        </p>
      </div>
      <ExternalLink
        size={15}
        className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
      />
    </a>
  );
};

const GithubMark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.17.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
  </svg>
);

const LinkedinMark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

/* ----------------------------------------------------------- skeleton bits */

/* A tiny shimmering block used as the skeleton primitive. */
const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-md bg-white/[0.06] ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[idSkeletonShimmer_1.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
  </div>
);

/* Loading placeholder — mirrors the instructor detail layout. */
const InstructorDetailSkeleton = () => {
  return (
    <div className="min-h-full w-full bg-black text-white">
      <style>{`
        @keyframes idSkeletonShimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="space-y-6">
        {/* Back */}
        <Shimmer className="h-4 w-16" />

        {/* Hero */}
        <section>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0C0C0C] via-[#070707] to-[#040404] p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                <Shimmer className="h-16 w-16 shrink-0 rounded-2xl sm:h-20 sm:w-20" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <Shimmer className="h-7 w-48" />
                    <Shimmer className="h-6 w-24 rounded-full" />
                    <Shimmer className="h-7 w-20 rounded-full" />
                  </div>
                  <Shimmer className="mt-3 h-4 w-40" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Shimmer className="h-8 w-56 max-w-full rounded-lg" />
                    <Shimmer className="h-8 w-40 rounded-lg" />
                  </div>
                </div>
              </div>

              <Shimmer className="h-11 w-full min-w-[190px] rounded-xl sm:w-52" />
            </div>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-white/10" />
            <div>
              <Shimmer className="h-5 w-24" />
              <Shimmer className="mt-2 h-3 w-72 max-w-full" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-6">
            <div className="flex items-start gap-4">
              <Shimmer className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="min-w-0 flex-1">
                <Shimmer className="h-3 w-28" />
                <Shimmer className="mt-3 h-4 w-full max-w-3xl" />
                <Shimmer className="mt-2 h-4 w-full max-w-2xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Basic Information */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-white/10" />
            <div>
              <Shimmer className="h-5 w-40" />
              <Shimmer className="mt-2 h-3 w-72 max-w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5"
              >
                <Shimmer className="h-10 w-10 rounded-xl" />
                <Shimmer className="mt-4 h-3 w-20" />
                <Shimmer className="mt-2 h-4 w-28" />
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Categories */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-white/10" />
            <div>
              <Shimmer className="h-5 w-44" />
              <Shimmer className="mt-2 h-3 w-64 max-w-full" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <Shimmer className="h-10 w-10 shrink-0 rounded-xl" />
              <div>
                <Shimmer className="h-4 w-36" />
                <Shimmer className="mt-2 h-3 w-28" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Shimmer className="h-9 w-24 rounded-lg" />
              <Shimmer className="h-9 w-32 rounded-lg" />
              <Shimmer className="h-9 w-20 rounded-lg" />
              <Shimmer className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </section>

        {/* Social & Portfolio */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-white/10" />
            <div>
              <Shimmer className="h-5 w-40" />
              <Shimmer className="mt-2 h-3 w-64 max-w-full" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5"
              >
                <Shimmer className="h-11 w-11 shrink-0 rounded-xl" />
                <div className="min-w-0 flex-1">
                  <Shimmer className="h-4 w-20" />
                  <Shimmer className="mt-2 h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account Information */}
        <section>
          <div className="mb-4 flex items-center gap-3">
            <span className="h-5 w-1 rounded-full bg-white/10" />
            <div>
              <Shimmer className="h-5 w-48" />
              <Shimmer className="mt-2 h-3 w-72 max-w-full" />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808]">
            <div className="grid md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border-b border-white/[0.06] p-5 md:odd:border-r"
                >
                  <div className="flex items-start gap-3">
                    <Shimmer className="h-9 w-9 shrink-0 rounded-lg" />
                    <div className="min-w-0 flex-1">
                      <Shimmer className="h-3 w-24" />
                      <Shimmer className="mt-2 h-4 w-36" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const InstructorDetailPage = () => {
  const navigate = useNavigate();
  const { instructorId } = useParams<{ instructorId: string }>();

  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusActionError, setStatusActionError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadInstructor = async () => {
      const parsedId = Number(instructorId);

      if (!Number.isInteger(parsedId) || parsedId <= 0) {
        setError("Invalid instructor ID.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        const data = await getAdminInstructorDetail(parsedId);

        if (isMounted) {
          setInstructor(data);
          setIsActive(data.is_active);
        }
      } catch (requestError) {
        console.error("Failed to load instructor details:", requestError);
        if (isMounted) {
          setError("Unable to load instructor details. Please try again.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadInstructor();

    return () => {
      isMounted = false;
    };
  }, [instructorId]);

  const imageUrl = instructor?.profile_image
    ? instructor.profile_image.startsWith("http")
      ? instructor.profile_image
      : `http://127.0.0.1:8000${instructor.profile_image}`
    : null;

  const handleToggleStatus = async () => {
    if (!instructor || isUpdatingStatus) return;

    const nextStatus = !isActive;

    try {
      setIsUpdatingStatus(true);
      setStatusActionError("");

      const response = await updateAdminInstructorStatus(
        instructor.id,
        nextStatus,
      );

      setIsActive(response.is_active);
      setInstructor((currentInstructor) =>
        currentInstructor
          ? { ...currentInstructor, is_active: response.is_active }
          : currentInstructor,
      );
      toast.success(
        `Instructor ${response.is_active ? "activated" : "deactivated"} successfully.`,
        { containerId: "admin" },
      );
      setIsStatusModalOpen(false);
    } catch (requestError) {
      console.error("Failed to update instructor status:", requestError);
      setStatusActionError(
        "Unable to update instructor status. Please try again.",
      );
      toast.error("Unable to update instructor status. Please try again.", {
        containerId: "admin",
      });
      setIsStatusModalOpen(false);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (isLoading) {
    return <InstructorDetailSkeleton />;
  }

  if (error || !instructor) {
    return (
      <div className="min-h-full w-full bg-black px-6 py-16 text-center">
        <p className="text-sm text-red-400" role="alert">
          {error || "Instructor details not found."}
        </p>
        <button
          type="button"
          onClick={() => navigate("/admin/instructors")}
          className="mt-4 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          Back to instructors
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* Back navigation */}
        <div
          className="animate-page-item flex items-center"
          style={{ animationDelay: "80ms" }}
        >
          <button
            type="button"
            onClick={() => navigate("/admin/instructors")}
            className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </button>
        </div>

        {/* Instructor hero */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "160ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/[0.18] bg-gradient-to-br from-[#0C0C0C] via-[#070707] to-[#040404] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_24px_60px_-16px_rgba(0,0,0,0.85)] sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/[0.18] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.05] blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/70 to-transparent"
            />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#34D399]/[0.22] via-[#34D399]/[0.08] to-transparent text-lg font-semibold tracking-tight text-[#34D399] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(52,211,153,0.35)] ring-1 ring-inset ring-[#34D399]/30 sm:h-20 sm:w-20">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={instructor.full_name}
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    getInitials(instructor.full_name)
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="break-words text-2xl font-semibold leading-tight tracking-tight sm:text-[26px]">
                      {instructor.full_name}
                    </h1>
                    <span className="shrink-0 rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#34D399]">
                      Instructor
                    </span>
                    <span
                      className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-[11px] font-medium ring-1 ring-inset ${
                        isActive
                          ? "bg-[#34D399]/[0.12] text-[#34D399] ring-[#34D399]/25"
                          : "bg-red-400/[0.12] text-red-400 ring-red-400/25"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive
                            ? "bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                            : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                        }`}
                      />
                      {isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-white/45">
                    {instructor.occupation || "Occupation not added"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex max-w-full items-start gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1 text-sm text-white/50 ring-1 ring-inset ring-white/[0.05]">
                      <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" />
                      <span className="break-all">{instructor.email}</span>
                    </span>
                    <span className="inline-flex max-w-full items-start gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1 text-sm text-white/50 ring-1 ring-inset ring-white/[0.05]">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/35" />
                      <span className="break-words">
                        {instructor.location || "Location not added"}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Activate / Deactivate action */}
              <div className="flex shrink-0 flex-col items-start gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStatusActionError("");
                    setIsStatusModalOpen(true);
                  }}
                  disabled={isUpdatingStatus}
                  className={`group/toggle relative inline-flex h-11 w-full min-w-[190px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border px-6 text-sm font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto ${
                    isActive
                      ? "border-red-400/25 bg-red-400/[0.06] text-red-400 hover:bg-red-400/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(248,113,113,0.4)]"
                      : "border-[#34D399]/25 bg-[#34D399]/[0.06] text-[#34D399] hover:bg-[#34D399]/[0.12] hover:shadow-[0_10px_28px_-10px_rgba(52,211,153,0.4)]"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent to-transparent transition-transform duration-700 group-hover/toggle:translate-x-full ${
                      isActive ? "via-red-400/12" : "via-[#34D399]/12"
                    }`}
                  />
                  {isUpdatingStatus ? (
                    <>
                      <span className="relative z-10 h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                      <span className="relative z-10">Updating...</span>
                    </>
                  ) : isActive ? (
                    <>
                      <Ban className="relative z-10 h-4 w-4 shrink-0" />
                      <span className="relative z-10">Deactivate Account</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="relative z-10 h-4 w-4 shrink-0" />
                      <span className="relative z-10">Activate Account</span>
                    </>
                  )}
                </button>
                {statusActionError && (
                  <p
                    className="max-w-[240px] text-xs text-red-400"
                    role="alert"
                  >
                    {statusActionError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "220ms" }}
        >
          <DetailSectionHeading
            title="About"
            description="Professional introduction provided by the instructor."
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
            />
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <User size={18} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-wider text-white/35">
                  Professional Bio
                </p>
                <p className="mt-2 max-w-3xl whitespace-pre-wrap break-words text-sm leading-7 text-white/70">
                  {instructor.professional_bio || "Not added"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Basic Information */}

        <section
          className="animate-page-item"
          style={{ animationDelay: "280ms" }}
        >
          <DetailSectionHeading
            title="Basic Information"
            description="Personal and professional information about the instructor."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              icon={<MapPin size={18} strokeWidth={1.8} />}
              label="Location"
              value={instructor.location || ""}
            />

            <InfoCard
              icon={<GraduationCap size={18} strokeWidth={1.8} />}
              label="Education"
              value={instructor.education || ""}
            />

            <InfoCard
              icon={<BriefcaseBusiness size={18} strokeWidth={1.8} />}
              label="Occupation"
              value={instructor.occupation || ""}
            />

            <InfoCard
              icon={<Clock3 size={18} strokeWidth={1.8} />}
              label="Experience"
              value={instructor.years_of_experience || ""}
            />
          </div>
        </section>

        {/* Teaching categories */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "320ms" }}
        >
          <DetailSectionHeading
            title="Teaching Categories"
            description="Topics and areas the instructor can teach."
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <Code2 size={18} strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Teaching categories
                </p>
                <p className="mt-1 text-xs text-white/35">
                  {instructor.categories.length} teaching categories
                </p>
              </div>
            </div>
            {instructor.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {instructor.categories.map((category, index) => (
                  <span
                    key={`${category}-${index}`}
                    className="rounded-lg border border-[#34D399]/15 bg-[#34D399]/[0.07] px-3 py-2 text-xs font-medium text-[#A7F3D0]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/40">No categories added.</p>
            )}
          </div>
        </section>

        {/* Social and portfolio links */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "360ms" }}
        >
          <DetailSectionHeading
            title="Social & Portfolio"
            description="Public links associated with this instructor profile."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <SocialCard
              name="GitHub"
              url={instructor.github_url || ""}
              icon={<GithubMark />}
            />
            <SocialCard
              name="LinkedIn"
              url={instructor.linkedin_url || ""}
              icon={<LinkedinMark />}
            />
            <SocialCard
              name="Portfolio"
              url={instructor.portfolio_url || ""}
              icon={<Globe size={20} strokeWidth={1.8} />}
            />
          </div>
        </section>

        {/* Account information */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "400ms" }}
        >
          <DetailSectionHeading
            title="Account Information"
            description="Instructor identity, role, status, and profile timestamps."
          />
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
            />
            <div className="grid md:grid-cols-2">
              <div className="border-b border-white/[0.06] p-5 md:border-r">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <Hash size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Instructor ID</p>
                    <p className="mt-1 break-words text-sm font-medium tabular-nums text-white">
                      #{instructor.id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <User size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Role</p>
                    <p className="mt-1 break-words text-sm font-medium text-white">
                      Instructor
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b border-white/[0.06] p-5 md:border-r md:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <Mail size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Email</p>
                    <p className="mt-1 break-all text-sm font-medium text-white">
                      {instructor.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-b border-white/[0.06] p-5 md:border-r md:border-b-0">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset ${
                      isActive
                        ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                        : "bg-red-400/10 text-red-400 ring-red-400/20"
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle2 size={16} strokeWidth={1.8} />
                    ) : (
                      <Ban size={16} strokeWidth={1.8} />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Account Status</p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        isActive ? "text-[#34D399]" : "text-red-400"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <CalendarDays size={16} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-white/35">
                      Became an Instructor
                    </p>

                    <p className="mt-1 break-words text-sm font-medium text-white">
                      {instructor.became_instructor_at
                        ? formatDate(instructor.became_instructor_at)
                        : "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <CalendarDays size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Last Updated</p>
                    <p className="mt-1 break-words text-sm font-medium text-white">
                      {formatDate(instructor.updated_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InstructorStatusConfirmModal
        isOpen={isStatusModalOpen}
        isLoading={isUpdatingStatus}
        instructorName={instructor.full_name}
        isActive={isActive}
        onCancel={() => setIsStatusModalOpen(false)}
        onConfirm={() => void handleToggleStatus()}
      />
    </div>
  );
};

export default InstructorDetailPage;
