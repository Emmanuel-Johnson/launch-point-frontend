import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";

type Review = {
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
};

// UI-only mock data — replace with an API lookup by courseId.
const reviews: Review[] = [
  {
    name: "Michael R.",
    initials: "MR",
    rating: 5,
    date: "2 weeks ago",
    text: "The lessons are structured well and the practical examples make the concepts easier to understand.",
  },
  {
    name: "Ananya K.",
    initials: "AK",
    rating: 5,
    date: "1 month ago",
    text: "A great learning experience. I particularly liked the clear explanations and step-by-step approach.",
  },
  {
    name: "David T.",
    initials: "DT",
    rating: 4,
    date: "1 month ago",
    text: "Useful content with a good progression from fundamentals to more practical topics.",
  },
  {
    name: "Jessica M.",
    initials: "JM",
    rating: 5,
    date: "2 months ago",
    text: "The explanations are clear, and the course helped me feel more confident applying what I learned.",
  },
  {
    name: "Rahul P.",
    initials: "RP",
    rating: 5,
    date: "2 months ago",
    text: "A well-organized course with practical topics and a useful learning path.",
  },
  {
    name: "Emily W.",
    initials: "EW",
    rating: 4,
    date: "3 months ago",
    text: "Good course structure and examples. I would recommend it to anyone looking to build their skills.",
  },
];

const CARD_BASE =
  "relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

const PILL =
  "border border-white/[0.08] bg-[#0E0A1A] text-white/65 transition-colors duration-300 hover:border-violet-400/35 hover:bg-violet-500/[0.07] hover:text-violet-100";

const percentages: Record<number, number> = { 5: 78, 4: 16, 3: 4, 2: 1, 1: 1 };

const CourseReviewsPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const [filter, setFilter] = useState<number | "all">("all");

  const averageRating = useMemo(
    () => reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
    [],
  );

  const visibleReviews = useMemo(
    () =>
      filter === "all" ? reviews : reviews.filter((r) => r.rating === filter),
    [filter],
  );

  return (
    <div className="min-h-full space-y-8 pb-8 text-white">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(`/student/courses/${courseId}`)}
        aria-label="Back to course"
        className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </button>

      <div className="flex items-start gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 to-violet-500/0 text-violet-200">
          <MessageCircle className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em]">
            Student reviews
          </h1>
          <p className="mt-1 text-xs text-white/40">
            {reviews.length} reviews from learners
          </p>
        </div>
      </div>

      {/* Summary + breakdown */}
      <div className="grid gap-4 sm:grid-cols-[210px_minmax(0,1fr)]">
        <div
          className={`${CARD_BASE} flex flex-col items-center justify-center p-6`}
        >
          <div className="pointer-events-none absolute -top-8 h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
          <p className="relative text-5xl font-semibold tracking-tight">
            {averageRating.toFixed(1)}
          </p>
          <div className="relative mt-2.5 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 ${
                  star <= Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-white/15"
                }`}
              />
            ))}
          </div>
          <p className="relative mt-2.5 text-xs text-white/45">
            Based on {reviews.length} reviews
          </p>
        </div>

        <div
          className={`${CARD_BASE} flex flex-col justify-center space-y-3 p-6`}
        >
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFilter(filter === star ? "all" : star)}
              className="relative flex items-center gap-3 rounded-lg px-1 py-0.5 text-xs transition hover:bg-white/[0.03]"
            >
              <span className="inline-flex w-12 shrink-0 items-center gap-1 text-white/45">
                {star}
                <Star className="h-3 w-3 fill-amber-400/70 text-amber-400/70" />
              </span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300"
                  style={{ width: `${percentages[star]}%` }}
                />
              </div>
              <span className="w-9 text-right tabular-nums text-white/40">
                {percentages[star]}%
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", 5, 4, 3, 2, 1] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={`rounded-full px-4 py-2 text-xs font-medium transition ${
              filter === option
                ? "border border-violet-400/40 bg-violet-500/15 text-violet-100"
                : PILL
            }`}
          >
            {option === "all" ? "All reviews" : `${option} stars`}
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="grid gap-4 sm:grid-cols-2">
        {visibleReviews.map((review) => (
          <article key={review.name} className={`${CARD_BASE} p-5`}>
            <div className="relative flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-400/20 bg-gradient-to-br from-violet-500/20 to-violet-500/5 text-xs font-semibold text-violet-100">
                {review.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-white/85">
                    {review.name}
                  </p>
                  <span className="text-[11px] text-white/35">
                    {review.date}
                  </span>
                </div>
                <div className="mt-1.5 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/15"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  {review.text}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleReviews.length === 0 && (
        <p className="py-8 text-center text-sm text-white/40">
          No reviews with this rating yet.
        </p>
      )}
    </div>
  );
};

export default CourseReviewsPage;
