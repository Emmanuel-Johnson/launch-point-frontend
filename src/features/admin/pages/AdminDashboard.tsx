import {
  Users,
  UserCheck,
  UserPlus,
  ShieldCheck,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12.5%",
      description: "from last month",
      icon: Users,
      iconStyle: "bg-indigo-500/10 text-indigo-400",
    },
    {
      title: "Active Users",
      value: "1,102",
      change: "+8.2%",
      description: "from last month",
      icon: UserCheck,
      iconStyle: "bg-emerald-500/10 text-emerald-400",
    },
    {
      title: "New Users",
      value: "86",
      change: "+18.4%",
      description: "this month",
      icon: UserPlus,
      iconStyle: "bg-blue-500/10 text-blue-400",
    },
    {
      title: "Administrators",
      value: "8",
      change: "",
      description: "System administrators",
      icon: ShieldCheck,
      iconStyle: "bg-purple-500/10 text-purple-400",
    },
  ];

  const recentUsers = [
    {
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joined: "Today",
    },
    {
      name: "Sarah Smith",
      email: "sarah@example.com",
      status: "Active",
      joined: "Yesterday",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      status: "Pending",
      joined: "2 days ago",
    },
    {
      name: "Emily Wilson",
      email: "emily@example.com",
      status: "Active",
      joined: "3 days ago",
    },
  ];

  const chartData = [42, 58, 47, 70, 55, 76, 65, 84, 61, 73, 89, 81];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, Admin
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          Here's what's happening with your application today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-[#111118] border border-white/6 rounded-2xl p-6 hover:border-white/10 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-bold text-white mt-2">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconStyle}`}
                >
                  <Icon size={21} />
                </div>
              </div>

              <div className="flex items-center gap-1 mt-5">
                {stat.change && (
                  <>
                    <ArrowUpRight
                      size={15}
                      className="text-emerald-400"
                    />

                    <span className="text-xs font-medium text-emerald-400">
                      {stat.change}
                    </span>
                  </>
                )}

                <span className="text-xs text-zinc-600">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="xl:col-span-2 bg-[#111118] border border-white/6 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">
                User Activity
              </h3>

              <p className="text-xs text-zinc-500 mt-1">
                User activity over the last 12 months
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Activity size={15} />
              Activity
            </div>
          </div>

          <div className="p-6">
            <div className="h-64 flex items-end gap-3 sm:gap-5">
              {chartData.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >
                  <div
                    className="w-full max-w-10 bg-indigo-600/80 hover:bg-indigo-500 rounded-t-lg transition"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="text-[10px] text-zinc-600">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111118] border border-white/6 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/6">
            <h3 className="text-base font-semibold text-white">
              Quick Actions
            </h3>

            <p className="text-xs text-zinc-500 mt-1">
              Common administration tasks
            </p>
          </div>

          <div className="p-5 space-y-3">
            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/6 hover:bg-white/5 hover:border-indigo-500/30 transition text-left">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Users size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Manage Users
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  View and manage users
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/6 hover:bg-white/5 hover:border-purple-500/30 transition text-left">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Administrators
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  Manage admin accounts
                </p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/2 border border-white/6 hover:bg-white/5 hover:border-emerald-500/30 transition text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <UserPlus size={19} />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Add User
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  Create a new user
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-[#111118] border border-white/6 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/6 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">
              Recent Users
            </h3>

            <p className="text-xs text-zinc-500 mt-1">
              Recently registered users
            </p>
          </div>

          <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/6">
                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-600">
                  User
                </th>

                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-600">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-600">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-wider font-semibold text-zinc-600">
                  Joined
                </th>
              </tr>
            </thead>

            <tbody>
              {recentUsers.map((user) => (
                <tr
                  key={user.email}
                  className="border-b border-white/4 last:border-0 hover:bg-white/2 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-xs font-semibold text-indigo-400">
                        {user.name.charAt(0)}
                      </div>

                      <span className="text-sm font-medium text-zinc-200">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-600">
                    {user.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;