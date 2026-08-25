import PricingCard from "./PricingCard";
import { pricingPlans } from "../../../data/landingData";

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Flexible Learning Plans
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Choose the path that fits your goals and budget. All sales are
            final.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
