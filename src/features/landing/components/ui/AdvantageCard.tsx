import type { Advantage } from "../../types/landing";

interface AdvantageCardProps {
  advantage: Advantage;
}

const AdvantageCard = ({ advantage }: AdvantageCardProps) => {
  const { icon: Icon, title, description } = advantage;

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
        <Icon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </article>
  );
};

export default AdvantageCard;
