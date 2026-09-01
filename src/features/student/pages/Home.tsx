const Home = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm text-gray-500">{today}</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Welcome back, Student
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's an overview of your learning progress.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/2 p-5">
          <p className="text-sm text-gray-500">My Courses</p>
          <p className="mt-3 text-3xl font-semibold text-white">5</p>
          <p className="mt-1 text-xs text-gray-600">
            Enrolled courses
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/2 p-5">
          <p className="text-sm text-gray-500">Assignments</p>
          <p className="mt-3 text-3xl font-semibold text-white">3</p>
          <p className="mt-1 text-xs text-gray-600">
            Pending assignments
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/2 p-5">
          <p className="text-sm text-gray-500">Attendance</p>
          <p className="mt-3 text-3xl font-semibold text-white">92%</p>
          <p className="mt-1 text-xs text-gray-600">
            Overall attendance
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/2 p-5">
          <p className="text-sm text-gray-500">Average Grade</p>
          <p className="mt-3 text-3xl font-semibold text-white">A-</p>
          <p className="mt-1 text-xs text-gray-600">
            Current performance
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* My Courses */}
        <section className="rounded-xl border border-white/10 bg-white/2 p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                My Courses
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Continue where you left off
              </p>
            </div>

            <button
              type="button"
              className="text-xs font-medium text-[#8b83ff] transition-colors hover:text-white"
            >
              View all
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-4">
              <div>
                <p className="text-sm font-medium text-gray-200">
                  React Development
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  12 lessons
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-[#8b83ff] hover:text-white"
              >
                Continue →
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-4">
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Python & Django
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  18 lessons
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-[#8b83ff] hover:text-white"
              >
                Continue →
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/2 p-4">
              <div>
                <p className="text-sm font-medium text-gray-200">
                  Database Design
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  10 lessons
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-[#8b83ff] hover:text-white"
              >
                Continue →
              </button>
            </div>
          </div>
        </section>

        {/* Upcoming */}
        <section className="rounded-xl border border-white/10 bg-white/2 p-6">
          <h2 className="text-base font-semibold text-white">
            Upcoming
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your upcoming deadlines
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Django REST API
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Due tomorrow
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                React Project
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Due September 4
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                Database Assignment
              </p>

              <p className="mt-1 text-xs text-gray-600">
                Due September 7
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
