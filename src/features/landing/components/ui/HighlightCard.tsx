import type { Highlight } from '../../types/landing';

interface HighlightCardProps {
  highlight: Highlight;
}

const HighlightCard = ({ highlight }: HighlightCardProps) => {
  const { icon: Icon, label } = highlight;

  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-100 bg-white px-4 py-6 text-center shadow-sm">
      <Icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
      <span className="mt-3 text-sm font-semibold text-slate-800">{label}</span>
    </div>
  );
};

export default HighlightCard;