import Reveal from "../../../shared/components/Reveal";

const steps = [
  {
    number: "01",
    title: "Choose Your Path",
    description:
      "Explore courses and find the right learning path based on your interests and career goals.",
  },
  {
    number: "02",
    title: "Start Learning",
    description:
      "Follow structured lessons designed to help you understand concepts clearly and build strong fundamentals.",
  },
  {
    number: "03",
    title: "Practice & Build",
    description:
      "Apply what you learn through exercises, projects, and practical challenges.",
  },
  {
    number: "04",
    title: "Grow & Achieve",
    description:
      "Track your progress, strengthen your skills, and move closer to your career goals.",
  },
];

const HowItWorks = () => {
  return (
    <section className="border-t border-white/10 bg-[#09090B] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <Reveal delay={100}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              How It Works
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              From learning to
              <span className="text-zinc-500"> doing.</span>
            </h2>

            <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
              A simple learning process designed to help you turn knowledge into
              practical skills.
            </p>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="relative mt-20">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={300 + index * 150}>
                <div className="group relative">
                  {/* Number */}
                  <div
                    className="relative flex h-16 w-16 items-center justify-center
                      rounded-full
                      border border-white/10
                      bg-white/3
                      text-sm font-semibold text-white
                      shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                      backdrop-blur-sm
                      transition-all duration-1000 ease-out
                      group-hover:scale-[1.04]
                      group-hover:border-violet-400/70
                      group-hover:bg-violet-500/10
                      group-hover:shadow-[0_0_30px_rgba(139,92,246,0.45)]"
                  >
                    {/* Inner Ring */}
                    <span
                      className="absolute inset-1.5 rounded-full
                        border border-violet-500/30
                        transition-all duration-1000 ease-out
                        group-hover:scale-105
                        group-hover:border-violet-400/80
                        group-hover:shadow-[inset_0_0_14px_rgba(139,92,246,0.25)]"
                    />

                    {/* Number */}
                    <span className="relative z-10">{step.number}</span>
                  </div>

                  {/* Content */}
                  <div className="mt-7">
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <Reveal delay={950}>
          <div className="mt-20 border-t border-white/10 pt-10 text-center">
            <p className="text-sm text-zinc-500">
              One step at a time.{" "}
              <span className="text-zinc-300">Real skills, real progress.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HowItWorks;
