import { Link } from "react-router-dom";
import Reveal from "../../../shared/components/Reveal";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#0F0F12] py-24">
      {/* Background Glow */}
      <div className="cta-glow absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal>
          <div className="cta-card overflow-hidden rounded-3xl border border-white/10 bg-white/3 px-6 py-16 text-center shadow-2xl sm:px-12 lg:px-20 lg:py-20">
            {/* Small Label */}
            <Reveal delay={100}>
              <div className="mb-6 inline-flex items-center rounded-full border border-indigo-400/20 bg-indigo-400/5 px-4 py-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Start Your Journey
                </span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={250}>
              <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Your next skill could
                <span className="block bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  change your future.
                </span>
              </h2>
            </Reveal>

            {/* Description */}
            <Reveal delay={400}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                Stop waiting for the right opportunity. Start learning, build
                valuable skills, and take the next step toward your goals.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={550}>
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/courses"
                  className="w-full rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black
                    transition-all duration-700 ease-out
                    hover:scale-[1.04]
                    hover:bg-zinc-200
                    sm:w-auto"
                >
                  Explore Courses
                </Link>

                <Link
                  to="/signup"
                  className="w-full rounded-lg border border-white/10 bg-white/4 px-7 py-3.5 text-sm font-semibold text-white
                    transition-all duration-700 ease-out
                    hover:scale-[1.04]
                    hover:border-white/20
                    hover:bg-white/8
                    sm:w-auto"
                >
                  Create Free Account
                </Link>
              </div>
            </Reveal>

            {/* Trust Text */}
            <Reveal delay={700}>
              <p className="mt-7 text-xs text-zinc-600">
                Start learning today. No complicated setup.
              </p>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCTA;
