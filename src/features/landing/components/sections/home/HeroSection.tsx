import { Sparkles, ArrowRight } from "lucide-react";
import { heroImageUrl } from "../../../data/landingData";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="bg-linear-to-br from-indigo-50 via-purple-50 to-indigo-50"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-600 shadow-sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Empowering 10k+ Learners Globally
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Learn Without Limits.
            <br />
            <span className="text-indigo-600">Build Your Future.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
            Access world-class education from industry leaders. Master the
            skills that matter most with manual subscriptions.
          </p>

          <div className="mt-8">
            <a
              href="#courses"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
            >
              Explore Courses
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Illustration */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white p-2 shadow-2xl shadow-indigo-200/50">
            <img
              src={heroImageUrl}
              alt="Interactive learning dashboard preview"
              loading="eager"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
