import {
  Activity,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  IndianRupee,
  Mail,
  Users,
} from "lucide-react";

const DashboardPage = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const stats = [
    {
      title: "Students",
      value: "1,248",
      description: "Registered students",
      icon: Users,
    },
    {
      title: "Instructors",
      value: "86",
      description: "Active instructors",
      icon: GraduationCap,
    },
    {
      title: "Courses",
      value: "124",
      description: "Published courses",
      icon: BookOpen,
    },
    {
      title: "Revenue",
      value: "₹1.2L",
      description: "This month",
      icon: IndianRupee,
    },
  ];

  const activities = [
    {
      title: "New instructor application received",
      time: "10 minutes ago",
      icon: GraduationCap,
    },
    {
      title: "New course submitted for approval",
      time: "1 hour ago",
      icon: BookOpen,
    },
    {
      title: "New student registered",
      time: "2 hours ago",
      icon: Users,
    },
  ];

  const pendingActions = [
    {
      title: "Instructor Applications",
      description: "5 awaiting review",
      icon: GraduationCap,
    },
    {
      title: "Course Applications",
      description: "8 awaiting review",
      icon: BookOpen,
    },
    {
      title: "Contact Messages",
      description: "3 unread messages",
      icon: Mail,
    },
  ];

  return (
    /*
      IMPORTANT:
      This background belongs to the Dashboard itself.

      Do NOT use bg-black or bg-[#050505] here.
    */
    <div className="min-h-full w-full bg-[#07100a] text-white">
      <div className="space-y-8">
        {/* =====================================================
            WELCOME SECTION
        ====================================================== */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "80ms" }}
        >
          <div
            className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-[oklch(52.7%_0.154_150.069)]/15
      bg-[#0b0b0d]
      p-8
    "
          >
            <div className="relative">
              <p className="mb-2 text-sm font-medium text-[oklch(52.7%_0.154_150.069)]">
                {today}
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Welcome back, Admin
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                Here&apos;s an overview of your platform activity, performance,
                and pending actions.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATISTICS
        ====================================================== */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="
                  animate-page-item
                  group
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#0b0b0d]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[oklch(52.7%_0.154_150.069)]/25
                  hover:bg-[#0d0d0f]
                "
                style={{
                  animationDelay: `${160 + index * 60}ms`,
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-white">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-[oklch(52.7%_0.154_150.069)]/10
                      text-[oklch(52.7%_0.154_150.069)]
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Recent Activity */}
          <div
            className="
              animate-page-item
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0b0b0d]
              p-6
            "
            style={{ animationDelay: "420ms" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Latest activity across the platform
                </p>
              </div>

              <Activity
                className="h-5 w-5 text-[oklch(52.7%_0.154_150.069)]"
                strokeWidth={1.8}
              />
            </div>

            <div className="space-y-5">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[oklch(52.7%_0.154_150.069)]/10
                        text-[oklch(52.7%_0.154_150.069)]
                      "
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{activity.title}</p>

                      <p className="mt-1 text-[11px] text-gray-600">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pending Actions */}
          <div
            className="
              animate-page-item
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#0b0b0d]
              p-6
            "
            style={{ animationDelay: "480ms" }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                Pending Actions
              </h2>

              <p className="mt-1 text-xs text-gray-600">
                Items requiring your attention
              </p>
            </div>

            <div className="space-y-3">
              {pendingActions.map((action) => {
                const Icon = action.icon;

                return (
                  <div
                    key={action.title}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      rounded-xl
                      border
                      border-white/[0.06]
                      bg-white/[0.02]
                      p-4
                      transition-all
                      duration-300
                      hover:border-[oklch(52.7%_0.154_150.069)]/20
                      hover:bg-[oklch(52.7%_0.154_150.069)]/[0.03]
                    "
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          bg-[oklch(52.7%_0.154_150.069)]/10
                          text-[oklch(52.7%_0.154_150.069)]
                        "
                      >
                        <Icon className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {action.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-600">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-gray-600 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            PLATFORM OVERVIEW
        ====================================================== */}
        <section
          className="
            animate-page-item
            rounded-2xl
            border
            border-white/[0.08]
            bg-[#0b0b0d]
            p-6
          "
          style={{ animationDelay: "540ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Platform Overview
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Current platform performance
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Student Growth */}
            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    Student Growth
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-white">
                    1,248
                  </p>
                </div>

                <Users
                  className="h-5 w-5 text-[oklch(52.7%_0.154_150.069)]"
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">Active</p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="
                    h-full
                    w-[76%]
                    rounded-full
                    bg-[oklch(52.7%_0.154_150.069)]
                  "
                />
              </div>

              <div className="mt-2 flex justify-between">
                <span className="text-[11px] text-gray-600">
                  Platform growth
                </span>

                <span className="text-[11px] font-medium text-gray-400">
                  76%
                </span>
              </div>
            </div>

            {/* Course Library */}
            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    Course Library
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-white">124</p>
                </div>

                <BookOpen
                  className="h-5 w-5 text-[oklch(52.7%_0.154_150.069)]"
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">Published</p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="
                    h-full
                    w-[68%]
                    rounded-full
                    bg-[oklch(52.7%_0.154_150.069)]
                  "
                />
              </div>

              <div className="mt-2 flex justify-between">
                <span className="text-[11px] text-gray-600">
                  Publication rate
                </span>

                <span className="text-[11px] font-medium text-gray-400">
                  68%
                </span>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div
              className="
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.02]
                p-5
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-600">
                    Monthly Revenue
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-white">
                    ₹1.2L
                  </p>
                </div>

                <BarChart3
                  className="h-5 w-5 text-[oklch(52.7%_0.154_150.069)]"
                  strokeWidth={1.8}
                />
              </div>

              <p className="mt-1 text-xs text-gray-500">Revenue</p>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="
                    h-full
                    w-[82%]
                    rounded-full
                    bg-[oklch(52.7%_0.154_150.069)]
                  "
                />
              </div>

              <div className="mt-2 flex justify-between">
                <span className="text-[11px] text-gray-600">
                  Monthly target
                </span>

                <span className="text-[11px] font-medium text-gray-400">
                  82%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STATUS FOOTER
        ====================================================== */}
        <section className="flex items-center gap-3 px-1">
          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[oklch(52.7%_0.154_150.069)]/10
              text-[oklch(52.7%_0.154_150.069)]
            "
          >
            <CheckCircle2 className="h-4 w-4" />
          </div>

          <div>
            <p className="text-xs font-medium text-gray-300">
              Platform is running normally
            </p>

            <div className="mt-0.5 flex items-center gap-2">
              <Clock3 className="h-3 w-3 text-gray-600" />

              <p className="text-[11px] text-gray-600">
                All systems operational
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
