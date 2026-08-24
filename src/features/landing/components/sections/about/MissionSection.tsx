import { missionImageUrl } from '../../../data/aboutData';

const MissionSection = () => {
  return (
    <section className="bg-indigo-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="overflow-hidden rounded-3xl bg-indigo-600 px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Our Mission
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Bridging the gap between education and career success.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-indigo-100 sm:text-base">
                At Launch Point, we make quality education accessible and
                career-focused. We believe that learning shouldn&apos;t just be
                about theory&mdash;it should be a direct pathway to your
                professional future through high-quality, accessible content.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={missionImageUrl}
                alt="Learner studying on a laptop"
                loading="lazy"
                className="aspect-4/3 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;