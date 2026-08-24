import { journeyAvatars } from '../../../data/aboutData';

const JourneyCta = () => {
  return (
    <section className="bg-indigo-50">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <div className="flex justify-center">
          <div className="flex -space-x-2">
            {journeyAvatars.map((avatar) => (
              <img
                key={avatar}
                src={avatar}
                alt=""
                loading="lazy"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
        </div>

        <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Start Your Learning Journey Today
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#get-started"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Get Started
          </a>
          <a
            href="#courses"
            className="rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </section>
  );
};

export default JourneyCta;