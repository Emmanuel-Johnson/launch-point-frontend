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
      accent: "#78917e",
      bg: "bg-[#78917e]/10",
      text: "text-[#78917e]",
      hover: "hover:border-[#78917e]/20",
    },
    {
      title: "Instructors",
      value: "86",
      description: "Active instructors",
      icon: GraduationCap,
      accent: "#6f8f79",
      bg: "bg-[#6f8f79]/10",
      text: "text-[#6f8f79]",
      hover: "hover:border-[#6f8f79]/20",
    },
    {
      title: "Courses",
      value: "124",
      description: "Published courses",
      icon: BookOpen,
      accent: "#52785d",
      bg: "bg-[#52785d]/10",
      text: "text-[#52785d]",
      hover: "hover:border-[#52785d]/20",
    },
    {
      title: "Revenue",
      value: "₹1.2L",
      description: "This month",
      icon: IndianRupee,
      accent: "#8ca893",
      bg: "bg-[#8ca893]/10",
      text: "text-[#8ca893]",
      hover: "hover:border-[#8ca893]/20",
    },
  ];

  const activities = [
    {
      title: "New instructor application received",
      time: "10 minutes ago",
      icon: GraduationCap,
      iconClass: "bg-[#78917e]/10 text-[#78917e]",
    },
    {
      title: "New course submitted for approval",
      time: "1 hour ago",
      icon: BookOpen,
      iconClass: "bg-[#52785d]/10 text-[#52785d]",
    },
    {
      title: "New student registered",
      time: "2 hours ago",
      icon: Users,
      iconClass: "bg-[#6f8f79]/10 text-[#6f8f79]",
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
    <div className="space-y-8">
      {/* ========================================
          Welcome Section
      ======================================== */}
      <section className="animate-page-item" style={{ animationDelay: "80ms" }}>
        <div className="relative overflow-hidden rounded-3xl border border-[#17251b] bg-gradient-to-br from-[#101812] via-[#090d0a] to-[#060806] p-8">
          {/* Background Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#52785d]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#78917e]/5 blur-3xl" />

          <div className="relative">
            <p className="mb-2 text-sm font-medium text-[#78917e]">{today}</p>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Welcome back, Admin
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
              Here&apos;s an overview of what&apos;s happening with Launch
              Point.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          Statistics
      ======================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className={`animate-page-item group rounded-2xl border border-[#17251b] bg-[#090d0a] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0c120e] ${stat.hover}`}
              style={{ animationDelay: `${160 + index * 60}ms` }}
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
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.text} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ========================================
          Main Grid
      ======================================== */}
      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Recent Activity */}
        <div
          className="animate-page-item rounded-2xl border border-[#17251b] bg-[#090d0a] p-6"
          style={{ animationDelay: "420ms" }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#78917e]/10 text-[#78917e]">
                <Activity size={17} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Latest activity across the platform
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => {
              const Icon = activity.icon;

              return (
                <div
                  key={activity.title}
                  className="group flex items-start gap-4 rounded-xl border border-[#17251b]/70 bg-[#0c110d] p-4 transition-all duration-300 hover:border-[#294d35] hover:bg-[#0e150f]"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.iconClass} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon size={17} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-300">
                      {activity.title}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <Clock3
                        size={11}
                        strokeWidth={1.8}
                        className="text-gray-700"
                      />

                      <p className="text-[11px] text-gray-600">
                        {activity.time}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#52785d]" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Actions */}
        <div
          className="animate-page-item rounded-2xl border border-[#17251b] bg-[#090d0a] p-6"
          style={{ animationDelay: "480ms" }}
        >
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#52785d]/10 text-[#78917e]">
                <CheckCircle2 size={17} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Pending Actions
                </h2>

                <p className="mt-1 text-xs text-gray-600">
                  Items requiring your attention
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {pendingActions.map((action) => {
              const Icon = action.icon;

              return (
                <div
                  key={action.title}
                  className="group rounded-xl border border-[#17251b]/70 bg-[#0c110d] p-4 transition-all duration-300 hover:border-[#294d35] hover:bg-[#0e150f]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#52785d]/10 text-[#78917e] transition-transform duration-300 group-hover:scale-105">
                      <Icon size={16} strokeWidth={1.8} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-300">
                        {action.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-600">
                        {action.description}
                      </p>
                    </div>

                    <div className="flex h-7 min-w-7 items-center justify-center rounded-full bg-[#52785d]/10 px-2 text-[10px] font-medium text-[#78917e]">
                      !
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================
          Platform Overview
      ======================================== */}
      <section
        className="animate-page-item rounded-2xl border border-[#17251b] bg-[#090d0a] p-6"
        style={{ animationDelay: "540ms" }}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#52785d]/10 text-[#78917e]">
            <BarChart3 size={17} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Platform Overview
            </h2>

            <p className="mt-1 text-xs text-gray-600">
              Current platform statistics
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {/* Students */}
          <div className="rounded-xl border border-[#17251b]/70 bg-[#0c110d] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Student Growth
              </p>

              <Users size={16} strokeWidth={1.8} className="text-[#78917e]" />
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold text-white">1,248</p>
                <p className="mt-1 text-xs text-gray-600">
                  Registered students
                </p>
              </div>

              <span className="text-xs font-medium text-[#78917e]">Active</span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-[#315f3d] to-[#78917e]" />
            </div>
          </div>

          {/* Courses */}
          <div className="rounded-xl border border-[#17251b]/70 bg-[#0c110d] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Course Library
              </p>

              <BookOpen
                size={16}
                strokeWidth={1.8}
                className="text-[#6f8f79]"
              />
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold text-white">124</p>
                <p className="mt-1 text-xs text-gray-600">Published courses</p>
              </div>

              <span className="text-xs font-medium text-[#6f8f79]">
                Published
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#315f3d] to-[#6f8f79]" />
            </div>
          </div>

          {/* Revenue */}
          <div className="rounded-xl border border-[#17251b]/70 bg-[#0c110d] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                Monthly Revenue
              </p>

              <IndianRupee
                size={16}
                strokeWidth={1.8}
                className="text-[#8ca893]"
              />
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-2xl font-semibold text-white">₹1.2L</p>
                <p className="mt-1 text-xs text-gray-600">Current month</p>
              </div>

              <span className="text-xs font-medium text-[#8ca893]">
                Revenue
              </span>
            </div>

            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#52785d] to-[#8ca893]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
