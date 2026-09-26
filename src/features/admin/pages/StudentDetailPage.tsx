import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  BriefcaseBusiness,
  User,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const student = {
  id: 85,
  full_name: "Cristiano Ronaldossd cc",
  email: "emmanuel.johnson.pro@gmail.com",
  role: "student",
  profile_image: "/media/profile_images/Yuta_.jpeg",
  bio: "Siuuuuuuuuuuuuuuu",
  location: "Portugal",
  education: "7th standard",
  occupation: "Footballer",
  github_url: "https://github.com/Emmanuel-Johnson",
  linkedin_url: "https://www.linkedin.com/in/emmanuel-johnson-dev/",
  portfolio_url: "https://emmanuel-johnson.vercel.app/",
  email_verified: true,
  is_active: true,
  date_joined: "2026-09-26T17:45:18.920094+05:30",
  updated_at: "2026-09-26T18:09:10.806467+05:30",
  profile_created_at: "2026-09-26T17:45:43.818178+05:30",
  profile_updated_at: "2026-09-26T18:09:10.805551+05:30",
};

const StudentDetailPage = () => {
  const navigate = useNavigate();

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

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-6">
        {/* =====================================================
            TOP BAR
        ====================================================== */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/students")}
            className="group flex cursor-pointer items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0A0A0A] px-4 py-2.5 text-sm text-white/60 transition-all duration-300 hover:border-[#34D399]/30 hover:bg-[#34D399]/[0.05] hover:text-[#6EE7B7]"
          >
            <ArrowLeft
              size={17}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Students
          </button>

          <div className="flex items-center gap-2">
            {student.is_active ? (
              <span className="flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-3 py-1.5 text-xs font-medium text-[#34D399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-400">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                Inactive
              </span>
            )}
          </div>
        </div>

        {/* =====================================================
            PROFILE HERO
        ====================================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/15 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent"
          />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
            {/* Profile Image */}
            <div className="relative shrink-0">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#34D399]/10 text-2xl font-semibold text-[#34D399] shadow-[0_0_35px_rgba(52,211,153,0.08)]">
                {student.profile_image ? (
                  <img
                    src={student.profile_image}
                    alt={student.full_name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(student.full_name)
                )}
              </div>

              {/* Online indicator */}
              {student.is_active && (
                <span className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#0A0A0A] bg-[#34D399]">
                  <CheckCircle2
                    size={13}
                    className="text-black"
                    strokeWidth={2.5}
                  />
                </span>
              )}
            </div>

            {/* Student Info */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {student.full_name}
                </h1>

                <span className="rounded-full border border-[#34D399]/20 bg-[#34D399]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#34D399]">
                  Student
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/45">
                <div className="flex items-center gap-2">
                  <Mail size={15} />
                  {student.email}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  {student.location}
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/55">
                {student.bio}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            BASIC INFORMATION
        ====================================================== */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <p className="mt-1 text-xs text-white/40">
              Personal and professional information about the student.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Location */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399]">
                <MapPin size={18} strokeWidth={1.8} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                Location
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {student.location}
              </p>
            </div>

            {/* Education */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399]">
                <GraduationCap size={18} strokeWidth={1.8} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                Education
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {student.education}
              </p>
            </div>

            {/* Occupation */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399]">
                <BriefcaseBusiness size={18} strokeWidth={1.8} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                Occupation
              </p>

              <p className="mt-1 text-sm font-medium text-white">
                {student.occupation}
              </p>
            </div>

            {/* Email Verification */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399]">
                <Mail size={18} strokeWidth={1.8} />
              </div>

              <p className="mt-4 text-xs uppercase tracking-wider text-white/35">
                Email Verification
              </p>

              <div className="mt-1 flex items-center gap-2">
                {student.email_verified ? (
                  <>
                    <CheckCircle2 size={15} className="text-[#34D399]" />
                    <span className="text-sm font-medium text-[#34D399]">
                      Verified
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={15} className="text-red-400" />
                    <span className="text-sm font-medium text-red-400">
                      Not Verified
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SOCIAL LINKS
        ====================================================== */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Social & Portfolio</h2>
            <p className="mt-1 text-xs text-white/40">
              Public links associated with this student profile.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Github */}
            <a
              href={student.github_url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.03]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/60 transition-colors group-hover:text-[#34D399]">
                <ExternalLink size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">GitHub</p>
                <p className="mt-1 truncate text-xs text-white/35">
                  {student.github_url}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
              />
            </a>

            {/* LinkedIn */}
            <a
              href={student.linkedin_url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.03]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/60 transition-colors group-hover:text-[#34D399]">
                <ExternalLink size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">LinkedIn</p>
                <p className="mt-1 truncate text-xs text-white/35">
                  {student.linkedin_url}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
              />
            </a>

            {/* Portfolio */}
            <a
              href={student.portfolio_url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/20 hover:bg-[#34D399]/[0.03]"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/60 transition-colors group-hover:text-[#34D399]">
                <ExternalLink size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">Portfolio</p>
                <p className="mt-1 truncate text-xs text-white/35">
                  {student.portfolio_url}
                </p>
              </div>

              <ExternalLink
                size={15}
                className="shrink-0 text-white/30 transition-colors group-hover:text-[#34D399]"
              />
            </a>
          </div>
        </section>

        {/* =====================================================
            ACCOUNT INFORMATION
        ====================================================== */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <p className="mt-1 text-xs text-white/40">
              Account status and profile timestamps.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]">
            <div className="grid md:grid-cols-2">
              {/* Student ID */}
              <div className="border-b border-white/[0.06] p-5 md:border-r">
                <div className="flex items-center gap-3">
                  <User size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Student ID</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      #{student.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <User size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Role</p>
                    <p className="mt-1 text-sm font-medium capitalize text-white">
                      {student.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date Joined */}
              <div className="border-b border-white/[0.06] p-5 md:border-r">
                <div className="flex items-center gap-3">
                  <CalendarDays size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Date Joined</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(student.date_joined)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Created */}
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Profile Created</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(student.profile_created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Updated */}
              <div className="border-b border-white/[0.06] p-5 md:border-r">
                <div className="flex items-center gap-3">
                  <CalendarDays size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Account Updated</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(student.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Updated */}
              <div className="border-b border-white/[0.06] p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays size={17} className="text-[#34D399]" />
                  <div>
                    <p className="text-xs text-white/35">Profile Updated</p>
                    <p className="mt-1 text-sm font-medium text-white">
                      {formatDate(student.profile_updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="p-5 md:border-r">
                <div className="flex items-center gap-3">
                  {student.is_active ? (
                    <CheckCircle2 size={17} className="text-[#34D399]" />
                  ) : (
                    <XCircle size={17} className="text-red-400" />
                  )}

                  <div>
                    <p className="text-xs text-white/35">Account Status</p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        student.is_active ? "text-[#34D399]" : "text-red-400"
                      }`}
                    >
                      {student.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Status */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  {student.email_verified ? (
                    <CheckCircle2 size={17} className="text-[#34D399]" />
                  ) : (
                    <XCircle size={17} className="text-red-400" />
                  )}

                  <div>
                    <p className="text-xs text-white/35">Email Status</p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        student.email_verified
                          ? "text-[#34D399]"
                          : "text-red-400"
                      }`}
                    >
                      {student.email_verified ? "Verified" : "Not Verified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pb-4 text-center text-xs text-white/25">
          Student #{student.id} • {formatDateOnly(student.date_joined)}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
