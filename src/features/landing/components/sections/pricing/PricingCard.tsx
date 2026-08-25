import { IndianRupee, CheckCircle2 } from "lucide-react";
import type { PricingPlan } from "../../../types/landing";

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard = ({ plan }: PricingCardProps) => {
  const {
    name,
    tagline,
    price,
    period,
    features,
    ctaLabel,
    highlighted,
    badge,
  } = plan;

  return (
    <div
      className={`relative rounded-2xl bg-white p-8 ${
        highlighted
          ? "border-2 border-indigo-500 shadow-xl shadow-indigo-100"
          : "border border-slate-200 shadow-sm"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white shadow-sm">
          {badge}
        </span>
      )}

      <h3 className="text-lg font-bold text-slate-900">{name}</h3>
      <p className="mt-1 text-sm font-medium text-indigo-600">{tagline}</p>

      <div className="mt-6 flex items-end gap-1">
        <IndianRupee
          className="mb-1 h-5 w-5 text-indigo-600"
          aria-hidden="true"
        />
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          {price}
        </span>
        <span className="mb-1 text-sm text-slate-500">/{period}</span>
      </div>

      <ul className="mt-8 space-y-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500"
              aria-hidden="true"
            />
            <span className="text-sm text-slate-600">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`mt-8 w-full rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
          highlighted
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "border border-slate-200 text-slate-800 hover:bg-slate-50"
        }`}
      >
        {ctaLabel}
      </button>
    </div>
  );
};

export default PricingCard;
