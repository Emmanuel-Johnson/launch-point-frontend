import { Users, GraduationCap, BookOpen, IndianRupee } from "lucide-react";

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

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <p className="text-sm text-gray-500">{today}</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Welcome back, Admin
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's an overview of what's happening with Launch Point.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-white/10 bg-white/2 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>

                  <p className="mt-3 text-3xl font-semibold text-white">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6c63ff]/10 text-[#8b83ff]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <section className="rounded-xl border border-white/10 bg-white/2 p-6 lg:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-white">
              Recent Activity
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Latest activity across the platform
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="rounded-lg border border-white/5 bg-white/2 p-4">
              <p className="text-sm font-medium text-gray-300">
                New instructor application received
              </p>

              <p className="mt-1 text-xs text-gray-600">10 minutes ago</p>
            </div>

            <div className="rounded-lg border border-white/5 bg-white/2 p-4">
              <p className="text-sm font-medium text-gray-300">
                New course submitted for approval
              </p>

              <p className="mt-1 text-xs text-gray-600">1 hour ago</p>
            </div>

            <div className="rounded-lg border border-white/5 bg-white/2 p-4">
              <p className="text-sm font-medium text-gray-300">
                New student registered
              </p>

              <p className="mt-1 text-xs text-gray-600">2 hours ago</p>
            </div>
          </div>
        </section>

        {/* Pending Actions */}
        <section className="rounded-xl border border-white/10 bg-white/2 p-6">
          <h2 className="text-base font-semibold text-white">
            Pending Actions
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Items requiring your attention
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Instructor Applications
              </p>

              <p className="mt-1 text-xs text-gray-600">5 awaiting review</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                Course Applications
              </p>

              <p className="mt-1 text-xs text-gray-600">8 awaiting review</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                Contact Messages
              </p>

              <p className="mt-1 text-xs text-gray-600">3 unread messages</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
