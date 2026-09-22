import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardList,
  Clock,
  FileText,
  IndianRupee,
  MessageSquare,
  Plus,
  Star,
  TrendingUp,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/*
  BLUE & BLACK THEME — palette (matches the Admin / Student dashboard treatment)
  -----------------------------------------------------------------
  Page canvas   #000000   true black
  Card surface  #0A0A0A   near-black, lifted just enough to separate
  Primary       #3B82F6   royal blue — the single accent colour
  Deep blue     #1D4ED8   gradient end for progress bars
  Hover blue    #60A5FA   lighter step for hover states

  One accent only. Hierarchy is created with blue vs white, not a second hue:
  the money metric (Total Earnings) and the top course carry a blue-tinted
  border and a blue value (`highlight`); everything else stays white on black.

  NOTE: the page is intentionally true black. If the surrounding app shell is
  ALSO pure black, this dashboard's outer edge will merge into it — give the
  shell a hairline border or a slightly different tone if that happens.

  Blue values are inlined as static Tailwind classes (#3B82F6 / #1D4ED8 /
  #60A5FA) because the JIT can't see a colour held in a JS variable.
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

interface CourseCard {
  title: string;
  value: string;
  status: string;
  metaLabel: string;
  percent: number;
  icon: LucideIcon;
  highlight: boolean;
}

const InstructorDashboard = () => {
  const navigate = useNavigate();

  const stats: StatCard[] = [
    {
      title: "Total Students",
      value: "3,482",
      description: "across all courses",
      trend: "+6.4%",
      icon: Users,
      highlight: false,
    },
    {
      title: "Active Courses",
      value: "12",
      description: "2 pending review",
      trend: "+8.3%",
      icon: BookOpen,
      highlight: false,
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      description: "1,204 reviews",
      trend: "+0.2",
      icon: Star,
      highlight: false,
    },
    {
      title: "Total Earnings",
      value: "₹4.6L",
      description: "this month",
      trend: "+18.3%",
      icon: IndianRupee,
      highlight: true,
    },
  ];

  const activities: ActivityItem[] = [
    {
      title: "New student enrolled in Advanced React",
      time: "5 minutes ago",
      icon: UserPlus,
    },
    {
      title: "New 5-star review on Django REST Framework",
      time: "1 hour ago",
      icon: Star,
    },
    {
      title: "You published a new lesson in Full Stack Web Dev",
      time: "3 hours ago",
      icon: FileText,
    },
  ];

  const pendingActions: PendingAction[] = [
    {
      title: "Student Questions",
      description: "7 awaiting your reply",
      icon: MessageSquare,
    },
    {
      title: "Assignments to Grade",
      description: "12 submissions",
      icon: ClipboardList,
    },
    {
      title: "Course Under Review",
      description: "2 in moderation",
      icon: Clock,
    },
  ];

  const courses: CourseCard[] = [
    {
      title: "Full Stack Web Development",
      value: "1,248",
      status: "Students enrolled",
      metaLabel: "Completion rate",
      percent: 72,
      icon: BookOpen,
      highlight: true,
    },
    {
      title: "Advanced React",
      value: "864",
      status: "Students enrolled",
      metaLabel: "Completion rate",
      percent: 65,
      icon: BookOpen,
      highlight: false,
    },
    {
      title: "Django REST Framework",
      value: "612",
      status: "Students enrolled",
      metaLabel: "Completion rate",
      percent: 58,
      icon: BookOpen,
      highlight: false,
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
          <div className="relative overflow-hidden rounded-3xl border border-[#3B82F6]/20 bg-[#0A0A0A] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Soft blue glow — one restrained accent, not busy motion. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#3B82F6]/20 blur-3xl"
            />
            {/* Hairline top highlight for a premium edge. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/50 to-transparent"
            />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="mb-2 text-sm font-medium text-[#3B82F6]">
                  Welcome back
                </p>

                <h1 className="bg-gradient-to-r from-white via-white to-[#3B82F6] bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-4xl">
                  Emmanuel Johnson
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Here&apos;s how your courses and students are doing today.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/instructor/courses/new")}
                className="group flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#3B82F6]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#5691F7] hover:shadow-xl hover:shadow-[#3B82F6]/30 active:translate-y-0"
              >
                <Plus
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90"
                  strokeWidth={2}
                />
                New Course
              </button>
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
                className={`animate-page-item group relative overflow-hidden rounded-2xl border bg-[#0A0A0A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#3B82F6]/40 hover:bg-[#0E0E0E] ${
                  stat.highlight ? "border-[#3B82F6]/30" : "border-white/[0.08]"
                }`}
                style={{ animationDelay: `${160 + index * 60}ms` }}
              >
                {/* Ambient blue glow that reveals on hover. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#3B82F6]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      {stat.title}
                    </p>

                    <p
                      className={`mt-3 text-3xl font-semibold ${
                        stat.highlight ? "text-[#3B82F6]" : "text-white"
                      }`}
                    >
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-[11px] font-medium text-[#3B82F6]">
                        <TrendingUp className="h-3 w-3" strokeWidth={2} />
                        {stat.trend}
                      </span>
                      <span className="text-xs text-white/45">
                        {stat.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] ring-1 ring-inset ring-[#3B82F6]/20 transition-transform duration-300 group-hover:scale-110">
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
                  Latest activity across your courses
                </p>
              </div>

              <Activity className="h-5 w-5 text-[#3B82F6]" strokeWidth={1.8} />
            </div>

            <div className="space-y-5">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div key={activity.title} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] ring-1 ring-inset ring-[#3B82F6]/20">
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
                    className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#3B82F6]/30 hover:bg-[#3B82F6]/[0.06]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#3B82F6]/10 text-[#3B82F6] ring-1 ring-inset ring-[#3B82F6]/20">
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
                      className="h-4 w-4 text-white/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#3B82F6]"
                      strokeWidth={1.8}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            COURSE PERFORMANCE
        ====================================================== */}
        <section
          className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "540ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Course Performance
              </h2>

              <p className="mt-1 text-xs text-white/50">
                Your top courses by enrollment
              </p>
            </div>

            <BarChart3 className="h-5 w-5 text-[#3B82F6]" strokeWidth={1.8} />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course) => {
              const Icon = course.icon;

              return (
                <div
                  key={course.title}
                  className={`rounded-2xl border bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[#3B82F6]/25 ${
                    course.highlight
                      ? "border-[#3B82F6]/25"
                      : "border-white/[0.06]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-white/50">
                        {course.title}
                      </p>

                      <p
                        className={`mt-3 text-2xl font-semibold ${
                          course.highlight ? "text-[#3B82F6]" : "text-white"
                        }`}
                      >
                        {course.value}
                      </p>
                    </div>

                    <Icon
                      className="h-5 w-5 text-[#3B82F6]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <p className="mt-1 text-xs text-white/55">{course.status}</p>

                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8]"
                      style={{ width: `${course.percent}%` }}
                    />
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="text-[11px] text-white/45">
                      {course.metaLabel}
                    </span>

                    <span className="text-[11px] font-medium text-white/70">
                      {course.percent}%
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

export default InstructorDashboard;
