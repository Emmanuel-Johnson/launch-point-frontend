import { useNavigate } from "react-router-dom";

const InstructorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ========================================
          Welcome Section
      ======================================== */}
      <section className="animate-page-item" style={{ animationDelay: "80ms" }}>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#111318] via-[#0b0c10] to-[#080808] p-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-600/5 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-blue-400">
                Welcome back 👋
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Emmanuel Johnson
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                Manage your courses, support your students, and continue
                creating meaningful learning experiences.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/instructor/courses/create")}
              className="group flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-600/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20 active:translate-y-0"
            >
              Create Course
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v14m-7-7h14"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================
          Stats
      ======================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Courses */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Total Courses
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">12</p>

              <p className="mt-1 text-xs text-gray-500">8 published</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 5.5A2.5 2.5 0 0 0 6.5 8H20"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Students */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Total Students
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">1,248</p>

              <p className="mt-1 text-xs text-emerald-400">+18% this month</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="9" cy="8" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 5a4 4 0 0 1 0 6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 15c1.8.9 3 2.8 3 5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "280ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Total Revenue
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">₹84,250</p>

              <p className="mt-1 text-xs text-emerald-400">+14% this month</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 7.5C17 5.6 14.8 4 12 4S7 5.6 7 7.5 9.2 11 12 11s5 1.6 5 3.5S14.8 18 12 18s-5-1.6-5-3.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "340ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Average Rating
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">4.8</p>

              <p className="mt-1 text-xs text-gray-500">326 reviews</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          Main Grid
      ======================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Course Performance */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "400ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Course Performance
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Pick up where you left off
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/instructor/courses")}
              className="cursor-pointer text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              View all
            </button>
          </div>

          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.035]">
            <div className="flex gap-4">
              <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/30 via-blue-600/15 to-[#111318]">
                <svg
                  className="h-10 w-10 text-blue-400 transition-transform duration-500 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 5.5A2.5 2.5 0 0 0 6.5 8H20"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Full Stack Web Development
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      Python · Django · React
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                    Published
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">Students</span>

                    <span className="text-[11px] font-medium text-gray-400">
                      482
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.035]">
            <div className="flex gap-4">
              <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/25 via-blue-400/10 to-[#111318]">
                <svg
                  className="h-10 w-10 text-blue-400 transition-transform duration-500 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <path strokeLinecap="round" d="M8 9h8M8 13h5M8 17h8" />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Advanced React Development
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      React · Redux · TypeScript
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                    Published
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">Students</span>

                    <span className="text-[11px] font-medium text-gray-400">
                      318
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Goal */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "460ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Today&apos;s Goal
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Keep your instructor workspace moving
            </p>
          </div>

          <div className="flex items-center gap-6">
            {/* Circular Progress */}
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center">
              <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  className="text-white/[0.05]"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="264"
                  strokeDashoffset="66"
                  className="text-blue-500"
                />
              </svg>

              <div className="absolute text-center">
                <p className="text-xl font-semibold text-white">75%</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-600">
                  Complete
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                6 tasks completed
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                Your goal is 8 instructor tasks today. Keep going!
              </p>

              <button
                type="button"
                onClick={() => navigate("/instructor/courses")}
                className="mt-4 cursor-pointer text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Continue →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          Bottom Grid
      ======================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Recent Activity */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "520ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Your latest instructor activity
            </p>
          </div>

          <div className="space-y-5">
            {/* Activity 1 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  New student enrolled in{" "}
                  <span className="font-medium text-white">
                    Full Stack Web Development
                  </span>
                </p>

                <p className="mt-1 text-[11px] text-gray-600">2 hours ago</p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Published a lesson in{" "}
                  <span className="font-medium text-white">
                    Advanced React Development
                  </span>
                </p>

                <p className="mt-1 text-[11px] text-gray-600">Yesterday</p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Received a{" "}
                  <span className="font-medium text-white">5-star review</span>{" "}
                  on your course
                </p>

                <p className="mt-1 text-[11px] text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Up Next */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "580ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Up Next</h2>

            <p className="mt-1 text-xs text-gray-600">
              Continue managing your courses
            </p>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => navigate("/instructor/courses")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Manage Courses
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  Review your 12 courses
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:translate-x-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                  />
                </svg>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/instructor/assessments")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">Assessments</p>

                <p className="mt-1 text-xs text-gray-600">
                  Review your assessments
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:translate-x-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                  />
                </svg>
              </div>
            </button>

            <button
              type="button"
              onClick={() => navigate("/instructor/students")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-500/20 hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">My Students</p>

                <p className="mt-1 text-xs text-gray-600">
                  Track student activity
                </p>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-transform group-hover:translate-x-1">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 18 6-6-6-6"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorDashboard;
