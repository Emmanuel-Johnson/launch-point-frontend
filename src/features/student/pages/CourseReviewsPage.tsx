import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Star, ThumbsUp } from "lucide-react";

type Review = {
  id: number;
  name: string;
  initials: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  helpful: number;
};

type CourseSummary = {
  title: string;
  rating: number;
  reviewCount: string;
  students: string;
};

const courseSummaries: Record<string, CourseSummary> = {
  "1": {
    title: "Full Stack Web Development",
    rating: 4.9,
    reviewCount: "1.2k",
    students: "8.4k",
  },
  "2": {
    title: "UI/UX Design Masterclass",
    rating: 4.8,
    reviewCount: "856",
    students: "5.2k",
  },
  "3": {
    title: "Python Programming",
    rating: 4.8,
    reviewCount: "2.1k",
    students: "12.6k",
  },
  "4": {
    title: "Data Analytics with SQL",
    rating: 4.9,
    reviewCount: "980",
    students: "6.1k",
  },
  "5": {
    title: "Modern JavaScript Essentials",
    rating: 4.7,
    reviewCount: "743",
    students: "7.3k",
  },
  "6": {
    title: "Product & Business Strategy",
    rating: 4.7,
    reviewCount: "512",
    students: "3.8k",
  },
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Michael R.",
    initials: "MR",
    rating: 5,
    date: "2 weeks ago",
    text: "The lessons are structured exceptionally well. The practical examples helped me understand the concepts and apply them to my own projects.",
    verified: true,
    helpful: 24,
  },
  {
    id: 2,
    name: "Ananya K.",
    initials: "AK",
    rating: 5,
    date: "1 month ago",
    text: "A genuinely great learning experience. I loved the clear explanations, thoughtful progression, and how each lesson builds on the previous one.",
    verified: true,
    helpful: 18,
  },
  {
    id: 3,
    name: "David T.",
    initials: "DT",
    rating: 4,
    date: "1 month ago",
    text: "Useful content with a good progression from fundamentals to practical topics. The examples make it easier to connect theory with real-world work.",
    verified: true,
    helpful: 12,
  },
  {
    id: 4,
    name: "Jessica M.",
    initials: "JM",
    rating: 5,
    date: "2 months ago",
    text: "The explanations are clear and easy to follow. I feel much more confident applying what I learned and working through problems independently.",
    verified: true,
    helpful: 31,
  },
  {
    id: 5,
    name: "Rahul P.",
    initials: "RP",
    rating: 5,
    date: "2 months ago",
    text: "A well-organized course with practical topics and a useful learning path. The assignments were especially helpful for reinforcing the concepts.",
    verified: true,
    helpful: 16,
  },
  {
    id: 6,
    name: "Emily W.",
    initials: "EW",
    rating: 4,
    date: "3 months ago",
    text: "Good course structure and useful examples. The content is approachable, and I would recommend it to anyone looking to build their skills.",
    verified: true,
    helpful: 9,
  },
];

const CARD_BASE =
  "relative overflow-hidden rounded-3xl border border-violet-400/15 bg-gradient-to-b from-[#130E24] to-[#0B0814]";

const ratingOptions = [5, 4, 3, 2, 1] as const;

const CourseReviewsPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const [helpfulReviews, setHelpfulReviews] = useState<number[]>([]);

  const course = courseSummaries[courseId ?? "1"] ?? courseSummaries["1"];
  const averageRating = course.rating;

  const ratingCounts = useMemo(
    () =>
      ratingOptions.reduce(
        (counts, rating) => {
          counts[rating] = reviews.filter(
            (review) => review.rating === rating,
          ).length;
          return counts;
        },
        {} as Record<number, number>,
      ),
    [],
  );

  const getPercentage = (rating: number) =>
    reviews.length > 0 ? (ratingCounts[rating] / reviews.length) * 100 : 0;

  const handleHelpful = (reviewId: number) => {
    setHelpfulReviews((current) =>
      current.includes(reviewId)
        ? current.filter((id) => id !== reviewId)
        : [...current, reviewId],
    );
  };

  return (
    <div className="min-h-full space-y-6 pb-10 text-white">
      <style>{`
        @keyframes reviews-sheen {
          0% { transform: translateX(-140%) skewX(-12deg); }
          100% { transform: translateX(260%) skewX(-12deg); }
        }
        .reviews-card-sheen {
          opacity: 0;
          transform: translateX(-140%) skewX(-12deg);
        }
        .reviews-card:hover .reviews-card-sheen {
          animation: reviews-sheen 1.1s ease-out;
        }
        @media (prefers-reduced-motion: reduce) {
          .reviews-card-sheen { animation: none !important; }
        }
      `}</style>

      {/* Breadcrumb — matching the public instructor profile page */}
      <div className="flex min-w-0 flex-wrap items-center gap-3.5">
        <button
          type="button"
          onClick={() => navigate(`/student/courses/${courseId ?? "1"}`)}
          aria-label="Back to course overview"
          className="group relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-500/[0.12] hover:text-white"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_0_22px_-4px_rgba(167,139,250,0.9)] transition-opacity duration-300 group-hover:opacity-100"
          />
          <ArrowLeft className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-2 font-['Manrope'] text-[11px] italic tracking-[-0.01em] sm:text-xs"
        >
          <button
            type="button"
            onClick={() => navigate("/student/courses")}
            className="shrink-0 cursor-pointer font-semibold tracking-[0.01em] text-white/45 transition-colors duration-200 hover:text-white/75"
          >
            Explore Courses
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-violet-300/50" />
          <button
            type="button"
            onClick={() => navigate(`/student/courses/${courseId ?? "1"}`)}
            className="max-w-[180px] truncate font-medium tracking-[-0.01em] text-white/45 transition-colors duration-200 hover:text-white/75 sm:max-w-[280px]"
          >
            {course.title}
          </button>
          <ChevronRight className="h-3.5 w-3.5 shrink-0 text-violet-300/50" />
          <span className="min-w-0 truncate bg-gradient-to-r from-violet-100 via-purple-200 to-indigo-200 bg-clip-text font-bold tracking-[-0.025em] text-transparent">
            Reviews
          </span>
        </nav>
      </div>

      {/* Page title — same position and typography; no right-side button */}
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
            <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
              Reviews & Ratings
            </span>
          </h1>
          <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
            Explore learner feedback and discover what makes this course worth
            learning.
          </p>
        </div>
      </section>

      {/* Left: course rating summary. Right: review listing. No search or filter controls. */}

      <section
        aria-label="Course reviews"
        className="grid items-start gap-5 lg:grid-cols-[minmax(270px,0.72fr)_minmax(0,1.5fr)]"
      >
        <aside className="lg:sticky lg:top-6">
          <div className={`${CARD_BASE} rounded-3xl p-6 sm:p-7`}>
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-violet-600/15 blur-[65px]" />

            <div className="relative">
              <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Course rating
              </p>

              <div className="mt-4 text-center">
                <p className="text-6xl font-semibold tracking-[-0.06em] text-white">
                  {averageRating.toFixed(1)}
                </p>

                <div
                  className="mt-3 flex justify-center gap-1"
                  aria-label={`${averageRating} out of 5 stars`}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-white/15"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-2 text-xs text-white/45">
                  Based on {course.reviewCount} reviews
                </p>
              </div>

              <div className="mt-7 space-y-3.5">
                {ratingOptions.map((rating) => {
                  const percentage = getPercentage(rating);

                  return (
                    <div
                      key={rating}
                      className="flex items-center gap-3 text-xs"
                    >
                      <span className="w-3 shrink-0 font-medium text-white/65">
                        {rating}
                      </span>

                      <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" />

                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-[width] duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>

                      <span className="w-8 shrink-0 text-right tabular-nums text-white/45">
                        {Math.round(percentage)}%
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/[0.08] pt-4">
                <p className="text-xs font-medium text-white/65">
                  {course.title}
                </p>

                <p className="mt-1 text-[11px] text-white/35">
                  {course.students} learners · {course.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          <div className="space-y-5">
            {reviews.map((review) => {
              const isHelpful = helpfulReviews.includes(review.id);

              return (
                <article
                  key={review.id}
                  className={`${CARD_BASE} reviews-card group rounded-3xl p-5 transition-[border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-violet-400/30 sm:p-6`}
                >
                  <span className="reviews-card-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent" />

                  <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-violet-600/[0.07] blur-[65px] transition-opacity duration-500 group-hover:bg-violet-500/[0.12]" />

                  <div className="relative">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-violet-400/25 bg-gradient-to-br from-violet-500/30 via-violet-500/10 to-indigo-500/[0.08] text-sm font-semibold tracking-wide text-violet-100">
                        {review.initials}
                      </div>

                      <div className="min-w-0 flex-1 pt-0.5">
                        <h3 className="text-sm font-semibold text-white/90 sm:text-base">
                          {review.name}
                        </h3>

                        <p className="mt-1 text-xs text-white/40">
                          {review.verified ? "Verified learner" : "Learner"}
                        </p>
                      </div>

                      <div
                        className="flex shrink-0 items-center gap-0.5 pt-1"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-white/15"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-5 text-[13px] leading-7 text-white/65 sm:text-sm">
                      {review.text}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <span className="text-[11px] font-medium tracking-wide text-white/35">
                        {review.date}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleHelpful(review.id)}
                        aria-pressed={isHelpful}
                        aria-label={
                          isHelpful
                            ? "Remove helpful vote"
                            : "Mark review as helpful"
                        }
                        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-2 text-[11px] font-medium transition-all duration-300 ${
                          isHelpful
                            ? "border-violet-400/30 bg-violet-500/[0.12] text-violet-200"
                            : "border-white/[0.07] bg-white/[0.02] text-white/45 hover:border-violet-400/25 hover:bg-violet-500/[0.07] hover:text-violet-200"
                        }`}
                      >
                        <ThumbsUp
                          className={`h-3.5 w-3.5 ${
                            isHelpful ? "fill-current" : ""
                          }`}
                        />
                        Helpful
                        <span className="tabular-nums">
                          {review.helpful + (isHelpful ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseReviewsPage;
