import HighlightCard from '../../ui/HighlightCard';
import { whyChoose } from '../../../data/aboutData';

const WhyChooseSection = () => {
  return (
    <section className="bg-indigo-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Why Choose Launch Point
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We provide the structure and support you need to go from beginner to
            professional.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {whyChoose.map((highlight) => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;