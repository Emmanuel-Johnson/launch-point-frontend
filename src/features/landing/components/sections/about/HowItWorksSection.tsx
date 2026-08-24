import { howItWorksSteps } from '../../../data/aboutData';

const HowItWorksSection = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            How It Works
          </h2>
        </div>

        <div className="relative mt-14">
          {/* Connector line (desktop only) */}
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-indigo-200 lg:block"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {howItWorksSteps.map((step) => (
              <li
                key={step.id}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-200 bg-white text-lg font-bold text-indigo-600">
                  {step.step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-52 text-sm text-slate-500">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;