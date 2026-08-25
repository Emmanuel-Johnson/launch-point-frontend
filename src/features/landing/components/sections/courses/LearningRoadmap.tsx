import { roadmapSteps } from "../../../data/landingData";

const LearningRoadmap = () => {
  const lastIndex = roadmapSteps.length - 1;

  return (
    <section
      id="roadmap"
      className="bg-linear-to-b from-indigo-50/60 to-purple-50/60"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Your Roadmap to Success
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Follow these simple steps to master any new skill
          </p>
        </div>

        <div className="relative mt-14">
          {/* Connector line (desktop only) */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-indigo-200 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
            {roadmapSteps.map((step, index) => {
              const { id, icon: Icon, title, description } = step;
              const isLast = index === lastIndex;
              return (
                <li key={id} className="flex flex-col items-center text-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-xl shadow-sm ${
                      isLast
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-indigo-600 ring-1 ring-slate-100"
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3
                    className={`mt-4 text-sm font-semibold ${
                      isLast ? "text-indigo-600" : "text-slate-900"
                    }`}
                  >
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmap;
