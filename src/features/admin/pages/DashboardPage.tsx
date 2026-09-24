import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  GraduationCap,
  IndianRupee,
  Mail,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useAppSelector } from "../../../app/store/hooks";

/*
  GREEN & BLACK THEME — palette
  -----------------------------------------------------------------
  Page canvas   #000000   true black
  Card surface  #0A0A0A   near-black, lifted just enough to separate
  Primary       #34D399   emerald — the single accent colour
  Deep emerald  #059669   gradient end for progress bars

  One accent only. Hierarchy is created with green vs white, not a second
  hue: the two revenue metrics carry a green-tinted border and a green
  value (`highlight`), while everything else stays white on black.

  NOTE: the page is intentionally true black. If the surrounding app shell
  is ALSO pure black, this dashboard's outer edge will merge into it — give
  the shell a hairline border or a slightly different tone if that happens.

  All emerald values are inlined as static Tailwind classes (#34D399 /
  #059669) because the JIT can't see a colour held in a JS variable.
*/

interface StatCard {
  title: string;
  value: string;
  description: string;
  trend: string;
  icon: LucideIcon;
  highlight: boolean;
}

interface ActivityItem {
  title: string;
  time: string;
  icon: LucideIcon;
}

interface PendingAction {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface OverviewCard {
  title: string;
  value: string;
  status: string;
  metaLabel: string;
  percent: number;
  icon: LucideIcon;
  highlight: boolean;
}

const DashboardPage = () => {
  const admin = useAppSelector((state) => state.admin.admin);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const stats: StatCard[] = [
    {
      title: "Students",
      value: "1,248",
      description: "Registered students",
      trend: "+12.5%",
      icon: Users,
      highlight: false,
    },
    {
      title: "Instructors",
      value: "86",
      description: "Active instructors",
      trend: "+4.2%",
      icon: GraduationCap,
      highlight: false,
    },
    {
      title: "Courses",
      value: "124",
      description: "Published courses",
      trend: "+8.1%",
      icon: BookOpen,
      highlight: false,
    },
    {
      title: "Revenue",
      value: "₹1.2L",
      description: "This month",
      trend: "+18.3%",
      icon: IndianRupee,
      highlight: true,
    },
  ];

  const activities: ActivityItem[] = [
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

  const pendingActions: PendingAction[] = [
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

  const overview: OverviewCard[] = [
    {
      title: "Student Growth",
      value: "1,248",
      status: "Active",
      metaLabel: "Platform growth",
      percent: 76,
      icon: Users,
      highlight: false,
    },
    {
      title: "Course Library",
      value: "124",
      status: "Published",
      metaLabel: "Publication rate",
      percent: 68,
      icon: BookOpen,
      highlight: false,
    },
    {
      title: "Monthly Revenue",
      value: "₹1.2L",
      status: "Revenue",
      metaLabel: "Monthly target",
      percent: 82,
      icon: BarChart3,
      highlight: true,
    },
  ];

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-8">
        {/* =====================================================
            WELCOME SECTION
        ====================================================== */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "80ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#34D399]/20 bg-[#0A0A0A] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Soft emerald glow — one restrained accent, not busy motion. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#34D399]/20 blur-3xl"
            />
            {/* Hairline top highlight for a premium edge. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/50 to-transparent"
            />

            <div className="relative">
              <p className="mb-2 text-sm font-medium text-[#34D399]">{today}</p>

              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                <span className="text-white">Welcome back, </span>
                <span className="bg-gradient-to-r from-[#ECFDF5] via-[#6EE7B7] to-[#34D399] bg-clip-text text-transparent">
                  {admin?.full_name ?? "Admin"}
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">
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
                className={`animate-page-item group relative overflow-hidden rounded-2xl border bg-[#0A0A0A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#34D399]/40 hover:bg-[#0E0E0E] ${
                  stat.highlight ? "border-[#34D399]/30" : "border-white/[0.08]"
                }`}
                style={{ animationDelay: `${160 + index * 60}ms` }}
              >
                {/* Ambient green glow that reveals on hover. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#34D399]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      {stat.title}
                    </p>

                    <p
                      className={`mt-3 text-3xl font-semibold ${
                        stat.highlight ? "text-[#34D399]" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#34D399]/10 px-2 py-0.5 text-[11px] font-medium text-[#34D399]">
                        <TrendingUp className="h-3 w-3" strokeWidth={2} />
                        {stat.trend}
                      </span>
                      <span className="text-xs text-white/45">
                        {stat.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20 transition-transform duration-300 group-hover:scale-110">
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
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "420ms" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-white/50">
                  Latest activity across the platform
                </p>
              </div>

              <Activity className="h-5 w-5 text-[#34D399]" strokeWidth={1.8} />
            </div>

            <div className="space-y-5">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-white/80">{activity.title}</p>

                      <p className="mt-1 text-[11px] text-white/45">
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
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "480ms" }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                Pending Actions
              </h2>

              <p className="mt-1 text-xs text-white/50">
                Items requiring your attention
              </p>
            </div>

            <div className="space-y-3">
              {pendingActions.map((action) => {
                const Icon = action.icon;

                return (
                  <div
                    key={action.title}
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#34D399]/30 hover:bg-[#34D399]/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#34D399]/10 text-[#34D399] ring-1 ring-inset ring-[#34D399]/20">
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white/90">
                          {action.title}
                        </p>

                        <p className="mt-1 text-xs text-white/55">
                          {action.description}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#34D399]"
                      strokeWidth={1.8}
                    />
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
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "540ms" }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white">
              Platform Overview
            </h2>

            <p className="mt-1 text-xs text-white/50">
              Current platform performance
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {overview.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className={`rounded-2xl border bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#34D399]/25 ${
                    card.highlight
                      ? "border-[#34D399]/25"
                      : "border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">
                        {card.title}
                      </p>

                      <p
                        className={`mt-3 text-2xl font-semibold ${
                          card.highlight ? "text-[#34D399]" : "text-white"
                        }`}
                      >
                        {card.value}
                      </p>
                    </div>

                    <Icon
                      className="h-5 w-5 text-[#34D399]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <p className="mt-1 text-xs text-white/55">{card.status}</p>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#34D399] to-[#059669]"
                      style={{ width: `${card.percent}%` }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-[11px] text-white/45">
                      {card.metaLabel}
                    </span>

                    <span className="text-[11px] font-medium text-white/70">
                      {card.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
