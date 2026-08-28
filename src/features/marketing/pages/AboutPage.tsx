const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#09090B] text-zinc-100">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              About Launch Point
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              A better starting point
              <span className="block text-zinc-500">for your future.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
              Launch Point is a learning platform built to help people develop
              practical skills, learn with purpose, and take confident steps
              toward their goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-white/10 bg-[#0F0F12]">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Our Mission
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Learning should lead somewhere.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-zinc-400">
              We believe learning is more valuable when it creates real
              progress. Launch Point focuses on structured learning, practical
              knowledge, and skills that can be applied beyond the classroom.
            </p>

            <p className="mt-6 text-base leading-8 text-zinc-400">
              Whether you are starting from scratch, improving your existing
              skills, or preparing for your next career opportunity, our goal is
              to give you a clear path forward.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-white/10 bg-[#09090B]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
              What We Believe
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built around meaningful progress.
            </h2>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            <div className="group bg-[#09090B] p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-[#111113] hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)]">
              <span className="text-sm font-medium text-indigo-400 transition-colors duration-500 group-hover:text-indigo-300">
                01
              </span>

              <h3 className="mt-10 text-xl font-semibold text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
                Practical
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500 transition-colors duration-700 group-hover:text-zinc-400">
                Focus on knowledge and skills that can be applied to real
                problems and real opportunities.
              </p>
            </div>

            <div className="group bg-[#09090B] p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-[#111113] hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)]">
              <span className="text-sm font-medium text-indigo-400 transition-colors duration-500 group-hover:text-indigo-300">
                02
              </span>

              <h3 className="mt-10 text-xl font-semibold text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
                Focused
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500 transition-colors duration-700 group-hover:text-zinc-400">
                Clear learning paths that help you spend less time searching and
                more time actually learning.
              </p>
            </div>

            <div className="group bg-[#09090B] p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-[#111113] hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)]">
              <span className="text-sm font-medium text-indigo-400 transition-colors duration-500 group-hover:text-indigo-300">
                03
              </span>

              <h3 className="mt-10 text-xl font-semibold text-white transition-transform duration-700 ease-out group-hover:translate-x-1">
                Growth
              </h3>

              <p className="mt-4 text-sm leading-7 text-zinc-500 transition-colors duration-700 group-hover:text-zinc-400">
                Keep improving your skills and build the confidence to take the
                next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-[#0F0F12]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Your Journey Starts Here
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Study hard. Work hard.
            <span className="block text-zinc-500">Build what comes next.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-zinc-400">
            Start building the skills that can move you closer to your goals.
          </p>

          <a
            href="/signup"
            className="mt-8 inline-flex rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 ease-out hover:scale-105 hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            {" "}
            Get Started{" "}
          </a>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
