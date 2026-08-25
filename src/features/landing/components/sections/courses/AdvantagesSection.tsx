import AdvantageCard from "../about/AdvantageCard";
import { advantages } from "../../../data/landingData";

const AdvantagesSection = () => {
  return (
    <section
      id="advantages"
      className="bg-linear-to-b from-white via-purple-50/40 to-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            The Launch Point Advantage
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We provide more than just videos. We provide a complete learning
            ecosystem.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((advantage) => (
            <AdvantageCard key={advantage.id} advantage={advantage} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
