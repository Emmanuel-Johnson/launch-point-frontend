import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ========================================
          Welcome Section
      ======================================== */}
      <section className="animate-page-item" style={{ animationDelay: "80ms" }}>
        <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-[#0d1b2e] via-[#091522] to-[#07111f] p-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-blue-400/5 blur-3xl" />

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
                building meaningful learning experiences.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/instructor/courses/create")}
              className="group flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/20 active:translate-y-0"
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
        {/* Total Courses */}
        <div
          className="animate-page-item group rounded-2xl border border-blue-400/10 bg-[#0b1728] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0d1b2e]"
          style={{ animationDelay: "160ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Total Courses
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">12</p>

              <p className="mt-1 text-xs text-blue-400">8 published</p>
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
          className="animate-page-item group rounded-2xl border border-blue-400/10 bg-[#0b1728] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0d1b2e]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
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
                  d="M16 4.5a4 4 0 0 1 0 7.5"
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
          className="animate-page-item group rounded-2xl border border-blue-400/10 bg-[#0b1728] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0d1b2e]"
          style={{ animationDelay: "280ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
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
          className="animate-page-item group rounded-2xl border border-blue-400/10 bg-[#0b1728] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/20 hover:bg-[#0d1b2e]"
          style={{ animationDelay: "340ms" }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Average Rating
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">4.8</p>

              <p className="mt-1 text-xs text-blue-400">From 326 reviews</p>
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
          className="animate-page-item rounded-2xl border border-blue-400/10 bg-[#0b1728] p-6"
          style={{ animationDelay: "400ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Course Performance
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your top performing courses
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

          <div className="space-y-4">
            {/* Course 1 */}
            <div className="group rounded-2xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]">
              <div className="flex gap-4">
                <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-500/25 via-blue-400/10 to-[#07111f]">
                  <svg
                    className="h-8 w-8 text-blue-400 transition-transform duration-500 group-hover:scale-110"
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

                      <p className="mt-1 text-xs text-gray-500">
                        Python · Django · React
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                      Published
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-5">
                    <span className="text-[11px] text-gray-500">
                      482 students
                    </span>

                    <span className="text-[11px] text-gray-500">
                      ₹32,400 revenue
                    </span>

                    <span className="text-[11px] text-amber-400">★ 4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="group rounded-2xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]">
              <div className="flex gap-4">
                <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-[#07111f]">
                  <svg
                    className="h-8 w-8 text-blue-400 transition-transform duration-500 group-hover:scale-110"
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

                      <p className="mt-1 text-xs text-gray-500">
                        React · Redux · TypeScript
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                      Published
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-5">
                    <span className="text-[11px] text-gray-500">
                      318 students
                    </span>

                    <span className="text-[11px] text-gray-500">
                      ₹24,800 revenue
                    </span>

                    <span className="text-[11px] text-amber-400">★ 4.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className="animate-page-item rounded-2xl border border-blue-400/10 bg-[#0b1728] p-6"
          style={{ animationDelay: "460ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">Quick Actions</h2>

            <p className="mt-1 text-xs text-gray-500">
              Manage your teaching workspace
            </p>
          </div>

          <div className="space-y-3">
            {/* Create Course */}
            <button
              type="button"
              onClick={() => navigate("/instructor/courses/create")}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
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
                    d="M12 5v14M5 12h14"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">
                  Create Course
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Start building a new course
                </p>
              </div>

              <span className="text-gray-600 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Students */}
            <button
              type="button"
              onClick={() => navigate("/instructor/students")}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
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
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">
                  View Students
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Track student progress
                </p>
              </div>

              <span className="text-gray-600 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>

            {/* Analytics */}
            <button
              type="button"
              onClick={() => navigate("/instructor/analytics")}
              className="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
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
                    d="M4 19V5M4 19h16"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 15 4-4 3 2 5-6"
                  />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-200">
                  View Analytics
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Review course performance
                </p>
              </div>

              <span className="text-gray-600 transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================
          Bottom Grid
      ======================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Recent Activity */}
        <div
          className="animate-page-item rounded-2xl border border-blue-400/10 bg-[#0b1728] p-6"
          style={{ animationDelay: "520ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Latest activity across your courses
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

                <p className="mt-1 text-[11px] text-gray-600">1 hour ago</p>
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
                  Published a new lesson in{" "}
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

        {/* Pending Actions */}
        <div
          className="animate-page-item rounded-2xl border border-blue-400/10 bg-[#0b1728] p-6"
          style={{ animationDelay: "580ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Pending Actions
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Items that need your attention
            </p>
          </div>

          <div className="space-y-3">
            {/* Draft Courses */}
            <button
              type="button"
              onClick={() => navigate("/instructor/courses")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Draft Courses
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  2 courses waiting to be completed
                </p>
              </div>

              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-blue-500/10 px-2 text-xs font-medium text-blue-400">
                2
              </span>
            </button>

            {/* Assessments */}
            <button
              type="button"
              onClick={() => navigate("/instructor/assessments")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">Assessments</p>

                <p className="mt-1 text-xs text-gray-500">
                  3 assessments need updates
                </p>
              </div>

              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-blue-500/10 px-2 text-xs font-medium text-blue-400">
                3
              </span>
            </button>

            {/* Community */}
            <button
              type="button"
              onClick={() => navigate("/instructor/community")}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-blue-400/[0.08] bg-blue-400/[0.02] p-4 text-left transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-400/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-gray-200">Community</p>

                <p className="mt-1 text-xs text-gray-500">
                  5 student questions waiting
                </p>
              </div>

              <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-blue-500/10 px-2 text-xs font-medium text-blue-400">
                5
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
