import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ========================================
          Welcome Section
      ======================================== */}
      <section className="animate-page-item" style={{ animationDelay: "80ms" }}>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#11111a] via-[#0b0b10] to-[#080808] p-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6c63ff]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#8b5cf6]/5 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-[#8b83ff]">
                Welcome back 👋
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Emmanuel Johnson
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                Keep learning, keep growing. Continue your journey and make
                progress toward your goals.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/student/learning")}
              className="group flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-[#6c63ff] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#6c63ff]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#776fff] hover:shadow-xl hover:shadow-[#6c63ff]/20 active:translate-y-0"
            >
              Continue Learning
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
                  d="M5 12h14m-6-6 6 6-6 6"
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
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#6c63ff]/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Enrolled Courses
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">8</p>

              <p className="mt-1 text-xs text-gray-500">3 in progress</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6c63ff]/10 text-[#8b83ff] transition-transform duration-300 group-hover:scale-110">
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

        {/* Progress */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Learning Hours
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">42</p>

              <p className="mt-1 text-xs text-emerald-400">+12% this month</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 7v5l3 2"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Certificates */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "280ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Certificates
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">5</p>

              <p className="mt-1 text-xs text-gray-500">2 completed recently</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 transition-transform duration-300 group-hover:scale-110">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="5" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.5 8 21l4-2 4 2-1-8.5"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div
          className="animate-page-item group rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/20 hover:bg-[#0d0d11]"
          style={{ animationDelay: "340ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Learning Streak
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">12</p>

              <p className="mt-1 text-xs text-orange-400">days in a row 🔥</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 text-orange-400 transition-transform duration-300 group-hover:scale-110">
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
                  d="M12 3c1.5 3 5 4.5 5 8.5A5 5 0 1 1 7 11c0-2.5 1.5-4.5 3-6"
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
        {/* Continue Learning */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "400ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Continue Learning
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Pick up where you left off
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/student/learning")}
              className="cursor-pointer text-xs font-medium text-[#8b83ff] transition-colors hover:text-[#aaa4ff]"
            >
              View all
            </button>
          </div>

          <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#6c63ff]/20 hover:bg-white/[0.035]">
            <div className="flex gap-4">
              {/* Course Image */}
              <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#6c63ff]/30 via-[#8b5cf6]/20 to-[#11111a]">
                <svg
                  className="h-10 w-10 text-[#8b83ff] transition-transform duration-500 group-hover:scale-110"
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

                  <span className="shrink-0 rounded-full bg-[#6c63ff]/10 px-2.5 py-1 text-[10px] font-medium text-[#8b83ff]">
                    In Progress
                  </span>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] text-gray-600">Progress</span>

                    <span className="text-[11px] font-medium text-gray-400">
                      68%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#6c63ff] to-[#8b5cf6]" />
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
              Stay consistent with your learning
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
                  strokeDashoffset="79"
                  className="text-[#6c63ff]"
                />
              </svg>

              <div className="absolute text-center">
                <p className="text-xl font-semibold text-white">70%</p>
                <p className="text-[9px] uppercase tracking-wider text-gray-600">
                  Complete
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-white">
                42 minutes learned
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                Your daily target is 60 minutes. Keep going!
              </p>

              <button
                type="button"
                onClick={() => navigate("/student/learning")}
                className="mt-4 cursor-pointer text-xs font-medium text-[#8b83ff] transition-colors hover:text-[#aaa4ff]"
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
              Your latest learning activity
            </p>
          </div>

          <div className="space-y-5">
            {/* Activity 1 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
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
                  Completed a lesson in{" "}
                  <span className="font-medium text-white">
                    Django REST Framework
                  </span>
                </p>

                <p className="mt-1 text-[11px] text-gray-600">2 hours ago</p>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#6c63ff]/10 text-[#8b83ff]">
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
                  Started{" "}
                  <span className="font-medium text-white">Advanced React</span>
                </p>

                <p className="mt-1 text-[11px] text-gray-600">Yesterday</p>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.5 8 21l4-2 4 2-1-8.5"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Earned a{" "}
                  <span className="font-medium text-white">
                    Python Fundamentals
                  </span>{" "}
                  certificate
                </p>

                <p className="mt-1 text-[11px] text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming */}
        <div
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0b0b0d] p-6"
          style={{ animationDelay: "580ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Up Next</h2>

            <p className="mt-1 text-xs text-gray-600">
              Continue your learning journey
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    React State Management
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Lesson 12 · 18 min
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff]/10 text-[#8b83ff]">
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
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    Django Authentication
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Lesson 8 · 24 min
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff]/10 text-[#8b83ff]">
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
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-200">
                    PostgreSQL Queries
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    Lesson 15 · 20 min
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6c63ff]/10 text-[#8b83ff]">
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
