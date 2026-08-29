import { Link } from "react-router-dom";
import Reveal from "../../../shared/components/Reveal";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#09090B]">
      {/* Background Glow */}
      <div className="hero-fade-in absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div
        className="hero-fade-in absolute -right-40 top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl"
        style={{ animationDelay: "200ms" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Reveal delay={100}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />

              <span className="text-sm font-medium text-zinc-300">
                Learn. Build. Grow.
              </span>
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={250}>
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Learn Skills.
              <span className="block bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Build Your Future.
              </span>
            </h1>
          </Reveal>

          {/* Description */}
          <Reveal delay={400}>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              Master practical skills through structured courses, expert
              guidance, and hands-on learning designed to help you achieve your
              goals.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={550}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/courses"
                className="w-full rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black
                transition-all duration-700 ease-out
                hover:scale-[1.04] hover:bg-zinc-200
                sm:w-auto"
              >
                Explore Courses
              </Link>

              <Link
                to="/signup"
                className="w-full rounded-lg border border-white/15 bg-white/4 px-7 py-3.5 text-sm font-semibold text-white
                transition-all duration-700 ease-out
                hover:scale-[1.04] hover:bg-white/8 hover:border-white/25
                sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </Reveal>

          {/* Trust / Stats */}
          <Reveal delay={700}>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-7">
              <div className="px-4">
                <p className="text-2xl font-bold text-white">10K+</p>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Learners
                </p>
              </div>

              <div className="px-4">
                <p className="text-2xl font-bold text-white">200+</p>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">Courses</p>
              </div>

              <div className="px-4">
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                  Instructors
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
