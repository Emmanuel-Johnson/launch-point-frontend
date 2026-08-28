const features = [
  {
    number: "01",
    title: "Learn Practical Skills",
    description:
      "Focus on real-world skills that you can apply directly to projects, work, and your career.",
  },
  {
    number: "02",
    title: "Learn From Experts",
    description:
      "Get structured guidance from experienced instructors with practical industry knowledge.",
  },
  {
    number: "03",
    title: "Learn at Your Pace",
    description:
      "Follow your learning path at a pace that works for you, wherever and whenever you want.",
  },
  {
    number: "04",
    title: "Build Your Future",
    description:
      "Turn your knowledge into valuable skills and create opportunities for your professional growth.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="border-t border-white/10 bg-[#0F0F12] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything you need to
            <span className="text-zinc-500"> keep learning.</span>
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
            A focused learning experience built around practical skills, quality
            content, and meaningful progress.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group bg-[#0F0F12] p-8
        transition-all duration-700 ease-out
        hover:-translate-y-1
        hover:bg-white/4
        hover:backdrop-blur-md
        hover:border-white/10
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            >
              {/* Number */}
              <span className="text-sm font-medium text-zinc-600 transition-colors duration-700 ease-out group-hover:text-indigo-400">
                {feature.number}
              </span>

              {/* Title */}
              <h3 className="mt-12 text-xl font-semibold text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm leading-7 text-zinc-500">
                {feature.description}
              </p>

              {/* Accent */}
              <div className="mt-8 h-px w-8 bg-zinc-700 transition-all duration-700 ease-out group-hover:w-14 group-hover:bg-indigo-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
