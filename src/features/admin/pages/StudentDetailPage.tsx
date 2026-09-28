import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  User,
  XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAdminStudent, updateStudentStatus } from "../api/adminApi";
import { toast } from "react-toastify";
import StudentStatusConfirmModal from "../components/StudentStatusConfirmModal";

interface Student {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_image: string | null;
  bio: string;
  location: string;
  education: string;
  occupation: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  email_verified: boolean;
  is_active: boolean;
  date_joined: string;
  updated_at: string;
  profile_created_at: string;
  profile_updated_at: string;
}

const GithubMark = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="h-5 w-5"
  >
    <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.61 8.21 11.17.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.22.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
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

const StudentDetailPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  const [student, setStudent] = useState<Student | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!studentId) {
        setError("Student ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const studentData = await getAdminStudent(Number(studentId));

        setStudent(studentData);
        setIsActive(studentData.is_active);
      } catch (error) {
        console.error("Failed to fetch student:", error);
        setError("Failed to load student details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleToggleStatus = async () => {
    if (!student) return;

    try {
      setIsUpdatingStatus(true);

      const updatedStatus = await updateStudentStatus(
        student.id,
        !student.is_active,
      );

      setStudent((currentStudent) =>
        currentStudent
          ? {
              ...currentStudent,
              is_active: updatedStatus.is_active,
            }
          : null,
      );

      setIsActive(updatedStatus.is_active);

      toast.success(updatedStatus.message, {
        containerId: "admin",
      });

      setIsStatusModalOpen(false);
    } catch (error) {
      console.error("Failed to update student status:", error);

      toast.error("Failed to update student status.", {
        containerId: "admin",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };
  if (isLoading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center bg-black text-white">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#34D399]"
          aria-label="Loading student"
        />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex min-h-full w-full flex-col items-center justify-center bg-black text-white">
        <p className="text-sm text-red-400">{error ?? "Student not found."}</p>

        <button
          type="button"
          onClick={() => navigate("/admin/students")}
          className="mt-4 rounded-lg border border-white/[0.08] px-4 py-2 text-sm text-white/60 transition-colors hover:border-[#34D399]/30 hover:text-[#34D399]"
        >
          Back to Students
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-full w-full bg-black text-white">
        <div className="space-y-6">
          {/* =====================================================
            TOP BAR
        ====================================================== */}
          <div
            className="animate-page-item flex items-center justify-between gap-3"
            style={{ animationDelay: "80ms" }}
          >
            {/* Back */}
            <button
              type="button"
              onClick={() => navigate("/admin/students")}
              className="animate-page-item group inline-flex cursor-pointer items-center gap-2 text-xs text-white/50 transition-colors hover:text-white"
              style={{ animationDelay: "80ms" }}
            >
              <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Back
            </button>

            <div className="flex shrink-0 items-center gap-5 cursor-default">
              {/* Status */}
              <span
                className={`inline-flex h-9 w-24 items-center justify-center gap-2 rounded-full text-xs font-medium ring-1 ring-inset ${
                  isActive
                    ? "bg-[#34D399]/10 text-[#34D399] ring-[#34D399]/20"
                    : "bg-red-400/10 text-red-400 ring-red-400/20"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive ? "bg-[#34D399]" : "bg-red-400"
                  }`}
                />

                {isActive ? "Active" : "Inactive"}
              </span>

              {/* Action */}
              <button
                type="button"
                onClick={() => setIsStatusModalOpen(true)}
                className={`inline-flex h-10 w-40 cursor-pointer items-center justify-center rounded-xl text-sm font-medium transition-all duration-500 ease-out hover:scale-105 ${
                  isActive
                    ? "border border-red-400/20 bg-red-400/5 text-red-400 hover:bg-red-400/10"
                    : "border border-[#34D399]/20 bg-[#34D399]/5 text-[#34D399] hover:bg-[#34D399]/10"
                }`}
              >
                {isActive ? "Deactivate Account" : "Activate Account"}
              </button>
            </div>
          </div>

          {/* =====================================================
            PROFILE HERO
        ====================================================== */}
          <section
            className="animate-page-item relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-gradient-to-br from-[#0B0B0B] via-[#080808] to-[#050505] p-7 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]"
            style={{ animationDelay: "160ms" }}
          >
            {/* Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#34D399]/[0.06] blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent"
            />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
              {/* Profile Image */}
              <div className="shrink-0">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-[#34D399]/25 bg-[#34D399]/10 text-2xl font-semibold text-[#34D399] shadow-[0_0_45px_rgba(52,211,153,0.12)] ring-1 ring-inset ring-white/[0.06]">
                  {student.profile_image &&
                  student.profile_image !==
                    "/media/profile_images/default_profile.png" ? (
                    <img
                      src={`http://127.0.0.1:8000${student.profile_image}`}
                      alt={student.full_name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(student.full_name)
                  )}
                </div>
              </div>

              {/* Student Info */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="min-w-0 text-2xl font-semibold tracking-tight [overflow-wrap:anywhere] md:text-3xl">
                    {student.full_name}
                  </h1>

                  <span className="shrink-0 rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#34D399]">
                    Student
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex max-w-full items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white/55">
                    <Mail size={15} className="mt-0.5 shrink-0 text-white/35" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {student.email}
                    </span>
                  </span>

                  <span className="inline-flex max-w-full items-start gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-sm text-white/55">
                    <MapPin
                      size={15}
                      className="mt-0.5 shrink-0 text-white/35"
                    />
                    <span className="min-w-0 [overflow-wrap:anywhere]">
                      {student.location || "Not added"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
            ABOUT
        ====================================================== */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "220ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
              />
              <div>
                <h2 className="text-lg font-semibold tracking-tight">About</h2>
                <p className="mt-1 text-xs text-white/40">
                  A short introduction written by the student.
                </p>
              </div>
            </div>

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
                    Bio
                  </p>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-white/70 [overflow-wrap:anywhere]">
                    {student.bio || "Not added"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
            BASIC INFORMATION
        ====================================================== */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "280ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
              />
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Basic Information
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Personal and professional information about the student.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Email */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <Mail size={18} strokeWidth={1.8} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                  {student.email}
                </p>
              </div>

              {/* Location */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <MapPin size={18} strokeWidth={1.8} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                  Location
                </p>

                <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                  {student.location || "Not added"}
                </p>
              </div>

              {/* Education */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <GraduationCap size={18} strokeWidth={1.8} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                  Education
                </p>

                <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                  {student.education || "Not added"}
                </p>
              </div>

              {/* Occupation */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 transition-colors duration-300 hover:border-white/[0.14]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                  <BriefcaseBusiness size={18} strokeWidth={1.8} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                  Occupation
                </p>

                <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                  {student.occupation || "Not added"}
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
            SOCIAL LINKS
        ====================================================== */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "340ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
              />
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Social &amp; Portfolio
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Public links associated with this student profile.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Github */}
              <a
                href={student.github_url || undefined}
                target={student.github_url ? "_blank" : undefined}
                rel={student.github_url ? "noreferrer" : undefined}
                aria-disabled={!student.github_url}
                onClick={(e) => {
                  if (!student.github_url) {
                    e.preventDefault();
                  }
                }}
                className={`group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 ${
                  student.github_url
                    ? "cursor-pointer transition-all duration-300 hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.03] motion-safe:hover:-translate-y-0.5"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/70 ring-1 ring-inset ring-white/[0.06] transition-colors group-hover:text-[#6EE7B7]">
                  <GithubMark />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">GitHub</p>
                  <p className="mt-1 text-xs text-white/35 [overflow-wrap:anywhere]">
                    {student.github_url || "Not added"}
                  </p>
                </div>

                <ExternalLink
                  size={15}
                  className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
                />
              </a>

              {/* LinkedIn */}
              <a
                href={student.linkedin_url || undefined}
                target={student.linkedin_url ? "_blank" : undefined}
                rel={student.linkedin_url ? "noreferrer" : undefined}
                aria-disabled={!student.linkedin_url}
                onClick={(e) => {
                  if (!student.linkedin_url) {
                    e.preventDefault();
                  }
                }}
                className={`group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 ${
                  student.linkedin_url
                    ? "cursor-pointer transition-all duration-300 hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.03] motion-safe:hover:-translate-y-0.5"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/70 ring-1 ring-inset ring-white/[0.06] transition-colors group-hover:text-[#6EE7B7]">
                  <LinkedinMark />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">LinkedIn</p>
                  <p className="mt-1 text-xs text-white/35 [overflow-wrap:anywhere]">
                    {student.linkedin_url || "Not added"}
                  </p>
                </div>

                <ExternalLink
                  size={15}
                  className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
                />
              </a>

              {/* Portfolio */}
              <a
                href={student.portfolio_url || undefined}
                target={student.portfolio_url ? "_blank" : undefined}
                rel={student.portfolio_url ? "noreferrer" : undefined}
                aria-disabled={!student.portfolio_url}
                onClick={(e) => {
                  if (!student.portfolio_url) {
                    e.preventDefault();
                  }
                }}
                className={`group flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] p-5 ${
                  student.portfolio_url
                    ? "cursor-pointer transition-all duration-300 hover:border-[#34D399]/25 hover:bg-[#34D399]/[0.03] motion-safe:hover:-translate-y-0.5"
                    : "cursor-not-allowed opacity-50"
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/70 ring-1 ring-inset ring-white/[0.06] transition-colors group-hover:text-[#6EE7B7]">
                  <Globe size={20} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">Portfolio</p>
                  <p className="mt-1 text-xs text-white/35 [overflow-wrap:anywhere]">
                    {student.portfolio_url || "Not added"}
                  </p>
                </div>

                <ExternalLink
                  size={15}
                  className="mt-0.5 shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
                />
              </a>
            </div>
          </section>

          {/* =====================================================
            ACCOUNT INFORMATION
        ====================================================== */}
          <section
            className="animate-page-item"
            style={{ animationDelay: "400ms" }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-5 w-1 rounded-full bg-gradient-to-b from-[#34D399] to-[#34D399]/20"
              />
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Account Information
                </h2>
                <p className="mt-1 text-xs text-white/40">
                  Identity details and profile timestamps.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0B0B0B] to-[#080808] shadow-[0_12px_40px_-8px_rgba(0,0,0,0.6)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent"
              />

              <div className="grid md:grid-cols-2">
                {/* Student ID */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <User size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Student ID</p>
                      <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                        #{student.id}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="border-b border-white/[0.06] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <User size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Role</p>
                      <p className="mt-1 text-sm font-medium capitalize text-white [overflow-wrap:anywhere]">
                        {student.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Mail size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Email</p>
                      <p className="mt-1 text-sm font-medium text-white [overflow-wrap:anywhere]">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Status */}
                <div className="border-b border-white/[0.06] p-5">
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
                        <XCircle size={16} strokeWidth={1.8} />
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

                {/* Date Joined */}
                <div className="border-b border-white/[0.06] p-5 md:border-r">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <CalendarDays size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Date Joined</p>
                      <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                        {formatDate(student.date_joined)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Created */}
                {/* <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <CalendarDays size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Profile Created</p>
                    <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                      {formatDate(student.profile_created_at)}
                    </p>
                  </div>
                </div>
              </div> */}

                {/* Account Updated */}
                <div className="border-b border-white/[0.06] p-5 md:border-r md:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <CalendarDays size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-white/35">Account Updated</p>
                      <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                        {formatDate(student.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Updated */}
                {/* <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                    <CalendarDays size={16} strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-white/35">Profile Updated</p>
                    <p className="mt-1 text-sm font-medium tabular-nums text-white [overflow-wrap:anywhere]">
                      {formatDate(student.profile_updated_at)}
                    </p>
                  </div>
                </div>
              </div> */}
              </div>
            </div>
          </section>

          {/* =====================================================
            FOOTER
        ====================================================== */}
          <footer
            className="animate-page-item mt-2 flex flex-col items-center gap-3 border-t border-white/[0.06] pb-4 pt-6 sm:flex-row sm:justify-between"
            style={{ animationDelay: "460ms" }}
          >
            <div className="flex items-center gap-2.5 text-xs text-white/40">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                <GraduationCap size={14} strokeWidth={1.8} />
              </span>
              <span className="font-medium text-white/55">Launch Point</span>
              <span className="text-white/20">·</span>
              <span>Admin Panel</span>
            </div>

            <p className="text-xs tabular-nums text-white/30">
              Student #{student.id} • Joined{" "}
              {formatDateOnly(student.date_joined)}
            </p>
          </footer>
        </div>
      </div>
      <StudentStatusConfirmModal
        isOpen={isStatusModalOpen}
        isLoading={isUpdatingStatus}
        studentName={student.full_name}
        isActive={isActive}
        onCancel={() => {
          if (!isUpdatingStatus) {
            setIsStatusModalOpen(false);
          }
        }}
        onConfirm={handleToggleStatus}
      />
    </>
  );
};

export default StudentDetailPage;
