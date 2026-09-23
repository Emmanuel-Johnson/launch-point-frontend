import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Flame,
  PlayCircle,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/store/hooks";

/*
  VIOLET & BLACK THEME — palette (matches the Admin dashboard treatment)
  -----------------------------------------------------------------
  Page canvas   #000000   true black
  Card surface  #0A0A0A   near-black, lifted just enough to separate
  Primary       #7C5CFF   Launch Point electric indigo-violet
  Deep violet   #5B3FE0   gradient end for progress bars

  One accent only. The scattered emerald / amber / orange stat colours from
  the original have been collapsed to a single violet system so the screen
  reads as a deliberate violet-on-black combo rather than a rainbow.

  NOTE: the page is intentionally true black. If the surrounding app shell
  is ALSO pure black, this dashboard's outer edge will merge into it — give
  the shell a hairline border or a slightly different tone if that happens.

  Violet values are inlined as static Tailwind classes (#7C5CFF / #5B3FE0)
  because the JIT can't see a colour held in a JS variable.
*/

interface StatCard {
  title: string;
  value: string;
  description: string;
  trend?: string;
  icon: LucideIcon;
}

interface ActivityItem {
  lead: string;
  highlight: string;
  trail?: string;
  time: string;
  icon: LucideIcon;
}

interface UpNextItem {
  title: string;
  meta: string;
}

const StudentDashboard = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const nameParts = user?.full_name.trim().split(" ") ?? [];
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ");

  const stats: StatCard[] = [
    {
      title: "Enrolled Courses",
      value: "8",
      description: "3 in progress",
      icon: BookOpen,
    },
    {
      title: "Learning Hours",
      value: "42",
      description: "this month",
      trend: "+12%",
      icon: Clock,
    },
    {
      title: "Certificates",
      value: "5",
      description: "2 completed recently",
      icon: Award,
    },
    {
      title: "Learning Streak",
      value: "12",
      description: "days in a row",
      icon: Flame,
    },
  ];

  const activities: ActivityItem[] = [
    {
      lead: "Completed a lesson in",
      highlight: "Django REST Framework",
      time: "2 hours ago",
      icon: CheckCircle2,
    },
    {
      lead: "Started",
      highlight: "Advanced React",
      time: "Yesterday",
      icon: PlayCircle,
    },
    {
      lead: "Earned a",
      highlight: "Python Fundamentals",
      trail: "certificate",
      time: "2 days ago",
      icon: Award,
    },
  ];

  const upNext: UpNextItem[] = [
    { title: "React State Management", meta: "Lesson 12 · 18 min" },
    { title: "Django Authentication", meta: "Lesson 8 · 24 min" },
    { title: "PostgreSQL Queries", meta: "Lesson 15 · 20 min" },
  ];

  return (
    <div className="min-h-full w-full bg-black text-white">
      <div className="space-y-8">
        {/* ========================================
            Welcome Section
        ======================================== */}
        <section
          className="animate-page-item"
          style={{ animationDelay: "80ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#7C5CFF]/20 bg-[#0A0A0A] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
            {/* Background glows — restrained, violet only. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#7C5CFF]/15 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#7C5CFF]/[0.07] blur-3xl"
            />
            {/* Hairline top highlight for a premium edge. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/50 to-transparent"
            />

            <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="mb-2 text-sm font-medium text-[#7C5CFF]">
                  Welcome back
                </p>

                <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  <span className="text-white">{firstName} </span>

                  <span className="bg-gradient-to-r from-[#EDE9FE] via-[#A78BFA] to-[#7C5CFF] bg-clip-text text-transparent">
                    {lastName}
                  </span>
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                  Keep learning, keep growing. Continue your journey and make
                  progress toward your goals.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/student/learning")}
                className="group flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-[#7C5CFF] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#7C5CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#8E72FF] hover:shadow-xl hover:shadow-[#7C5CFF]/30 active:translate-y-0"
              >
                Continue Learning
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================
            Stats
        ======================================== */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="animate-page-item group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7C5CFF]/40 hover:bg-[#0E0E0E]"
                style={{ animationDelay: `${160 + index * 60}ms` }}
              >
                {/* Ambient violet glow that reveals on hover. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#7C5CFF]/25 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                      {stat.title}
                    </p>

                    <p className="mt-3 text-3xl font-semibold text-white">
                      {stat.value}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      {stat.trend && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#7C5CFF]/10 px-2 py-0.5 text-[11px] font-medium text-[#7C5CFF]">
                          <TrendingUp className="h-3 w-3" strokeWidth={2} />
                          {stat.trend}
                        </span>
                      )}
                      <span className="text-xs text-white/50">
                        {stat.description}
                      </span>
                    </div>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#7C5CFF] ring-1 ring-inset ring-[#7C5CFF]/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
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
          {/* Continue Learning */}
          <div
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "400ms" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Continue Learning
                </h2>

                <p className="mt-1 text-xs text-white/50">
                  Pick up where you left off
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/student/learning")}
                className="cursor-pointer text-xs font-medium text-[#7C5CFF] transition-colors hover:text-[#9D82FF]"
              >
                View all
              </button>
            </div>

            <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#7C5CFF]/25 hover:bg-white/[0.035]">
              <div className="flex gap-4">
                {/* Course Image */}
                <div className="flex h-24 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#7C5CFF]/30 via-[#7C5CFF]/15 to-[#0A0A0A]">
                  <BookOpen
                    className="h-10 w-10 text-[#7C5CFF] transition-transform duration-500 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-white">
                        Full Stack Web Development
                      </p>

                      <p className="mt-1 text-xs text-white/50">
                        Python · Django · React
                      </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-[#7C5CFF]/10 px-2.5 py-1 text-[10px] font-medium text-[#7C5CFF]">
                      In Progress
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[11px] text-white/50">
                        Progress
                      </span>

                      <span className="text-[11px] font-medium text-white/70">
                        68%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#7C5CFF] to-[#5B3FE0]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Goal */}
          <div
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "460ms" }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                Today&apos;s Goal
              </h2>

              <p className="mt-1 text-xs text-white/50">
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
                    className="text-white/[0.06]"
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
                    className="text-[#7C5CFF]"
                  />
                </svg>

                <div className="absolute text-center">
                  <p className="text-xl font-semibold text-white">70%</p>
                  <p className="text-[9px] uppercase tracking-wider text-white/45">
                    Complete
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  42 minutes learned
                </p>

                <p className="mt-2 text-xs leading-5 text-white/55">
                  Your daily target is 60 minutes. Keep going!
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/student/learning")}
                  className="group mt-4 inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-[#7C5CFF] transition-colors hover:text-[#9D82FF]"
                >
                  Continue
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={2}
                  />
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
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "520ms" }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">
                Recent Activity
              </h2>

              <p className="mt-1 text-xs text-white/50">
                Your latest learning activity
              </p>
            </div>

            <div className="space-y-5">
              {activities.map((activity) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={activity.highlight}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#7C5CFF]/10 text-[#7C5CFF] ring-1 ring-inset ring-[#7C5CFF]/20">
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-white/70">
                        {activity.lead}{" "}
                        <span className="font-medium text-white">
                          {activity.highlight}
                        </span>
                        {activity.trail ? ` ${activity.trail}` : ""}
                      </p>

                      <p className="mt-1 text-[11px] text-white/45">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
          <div
            className="animate-page-item rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ animationDelay: "580ms" }}
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-white">Up Next</h2>

              <p className="mt-1 text-xs text-white/50">
                Continue your learning journey
              </p>
            </div>

            <div className="space-y-3">
              {upNext.map((item) => (
                <div
                  key={item.title}
                  className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#7C5CFF]/25 hover:bg-[#7C5CFF]/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/90">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-white/50">{item.meta}</p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7C5CFF]/10 text-[#7C5CFF] ring-1 ring-inset ring-[#7C5CFF]/20 transition-transform duration-300 group-hover:translate-x-0.5">
                      <ChevronRight className="h-4 w-4" strokeWidth={2} />
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

export default StudentDashboard;
