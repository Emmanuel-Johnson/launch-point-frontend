import AdvantageCard from "./AdvantageCard";
import { offerings } from "../../../data/aboutData";

const WhatWeOffer = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            What We Offer
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Comprehensive tools designed for modern learning.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((offering) => (
            <AdvantageCard key={offering.id} advantage={offering} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
