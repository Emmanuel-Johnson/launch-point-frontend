import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";

/*
  ============================================================================
  STUDENT · SUBSCRIPTION PLANS
  ============================================================================
  VIOLET & BLACK THEME (matches the Student header + sidebar chrome)
  ----------------------------------------------------------------------------
  Page canvas   #000000  true black
  Chrome tone   #0A0A0A   near-black — same surface as header/sidebar rail
  Premium card  #0C0A16   violet-tinted near-black
  Primary       #7C5CFF   Launch Point electric indigo-violet
  Deep violet   #4D32C8   gradient end
  Hover violet  #9D82FF   lighter step for hover/focus states (from header)
  Light violet  #A78BFA   accents
  ============================================================================*/

interface SubscriptionPlan {
  id: number;
  name: string;
  plan_type: "free" | "premium";
  description: string;
  benefits: string[];
  price: string;
  billing_interval: "weekly" | "monthly" | "yearly" | null;
}

/* --------------------------------------------------------------- UI-only */
/*  Swap for API value when wiring:
    - CURRENT_PLAN_ID → the student's active subscription plan id            */
const CURRENT_PLAN_ID = 1;

const plans: SubscriptionPlan[] = [
  {
    id: 1,
    name: "Free Plan",
    plan_type: "free",
    description:
      "Get started with essential learning features and explore the platform.",
    benefits: [
      "Access free courses",
      "Basic learning materials",
      "Community access",
    ],
    price: "0.00",
    billing_interval: null,
  },
  {
    id: 3,
    name: "Pro Plan",
    plan_type: "premium",
    description:
      "Take your learning further with advanced courses, certificates, and premium resources.",
    benefits: [
      "Access all premium courses",
      "Premium learning materials",
      "Course completion certificates",
      "Priority support",
    ],
    price: "199.00",
    billing_interval: "monthly",
  },
];

/* ---------------------------------------------------------------- helpers */

const inr = (amount: number) =>
  `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const formatPrice = (plan: SubscriptionPlan) => {
  if (plan.plan_type === "free") return "Free";

  const amount = Number(plan.price);

  if (Number.isNaN(amount)) return `₹${plan.price}`;

  return inr(amount);
};

const INTERVAL_WORD: Record<string, string> = {
  weekly: "week",
  monthly: "month",
  yearly: "year",
};

const monthlyEquivalent = (plan: SubscriptionPlan) => {
  const amount = Number(plan.price);

  if (plan.billing_interval !== "yearly" || Number.isNaN(amount)) {
    return null;
  }

  return `${inr(Math.round(amount / 12))} / month, billed yearly`;
};

/* ================================================================== page */

const SubscriptionPage = () => {
  return (
    <div className="min-h-full w-full bg-black text-white">
      <style>{`
        @keyframes lpFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lp-enter {
          animation: lpFadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .lp-enter {
            animation: none;
          }
        }
      `}</style>

      <div className="space-y-9">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <section
          className="lp-enter flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
          style={{ animationDelay: "60ms" }}
        >
          <div className="min-w-0">
            <p className="mb-2 text-sm font-medium text-[#7C5CFF]">Account</p>

            <h1 className="bg-gradient-to-r from-white via-white to-[#9B7CFF] bg-clip-text font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-transparent md:text-4xl">
              Subscription Plans
            </h1>
          </div>
        </section>

        {/* =========================================================
            PLANS
        ========================================================= */}
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {plans.map((plan, i) => {
            const isPremium = plan.plan_type === "premium";
            const isCurrent = plan.id === CURRENT_PLAN_ID;
            const perMonth = monthlyEquivalent(plan);
            const PlanIcon = isPremium ? Crown : Sparkles;

            return (
              <article
                key={plan.id}
                style={{ animationDelay: `${i * 85}ms` }}
                className={`lp-enter group relative flex h-full min-w-0 flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 ${
                  isPremium
                    ? "rounded-3xl border border-[#7C5CFF]/25 bg-[#0C0A16] hover:border-[#7C5CFF]/55 hover:shadow-[0_18px_50px_rgba(124,92,255,0.14)]"
                    : "rounded-3xl border border-white/10 bg-[#0A0A0A] hover:border-white/20 hover:shadow-[0_18px_50px_rgba(124,92,255,0.08)]"
                }`}
              >
                {/* Premium top hairline — subtle premium signal */}
                {isPremium && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C5CFF]/60 to-transparent"
                  />
                )}

                {/* Ambient glow */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 ${
                    isPremium
                      ? "bg-[#7C5CFF]/15 opacity-0 group-hover:opacity-100"
                      : "bg-[#7C5CFF]/10 opacity-0 group-hover:opacity-100"
                  }`}
                />

                {/* Diagonal shine sweep */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {/* Content */}
                <div className="relative flex h-full min-w-0 flex-col">
                  {/* Icon tile + name + status pill */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3.5">
                      {/* Plan icon tile — mirrors the header icon tiles */}
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${
                          isPremium
                            ? "bg-[#7C5CFF]/[0.1] text-[#7C5CFF] group-hover:bg-[#7C5CFF]/[0.16] group-hover:text-[#9D82FF] group-hover:shadow-[0_0_18px_rgba(124,92,255,0.18)]"
                            : "bg-white/[0.04] text-white/50 group-hover:bg-[#7C5CFF]/10 group-hover:text-[#7C5CFF] group-hover:shadow-[0_0_16px_rgba(124,92,255,0.1)]"
                        }`}
                      >
                        <PlanIcon
                          className="h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-110"
                          strokeWidth={1.8}
                        />
                      </div>

                      <h2 className="min-w-0 font-['Space_Grotesk'] text-xl font-semibold leading-snug text-white [overflow-wrap:anywhere]">
                        {plan.name}
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        isPremium
                          ? "bg-[#7C5CFF]/15 text-[#A78BFA] ring-1 ring-inset ring-[#7C5CFF]/20"
                          : "bg-white/10 text-white/55"
                      }`}
                    >
                      {isPremium ? "Premium" : "Free"}
                    </span>
                  </div>

                  <p className="mt-4 min-w-0 text-sm leading-6 text-white/50 [overflow-wrap:anywhere]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mt-6 min-w-0">
                    <div className="flex min-w-0 items-baseline gap-2">
                      <span className="min-w-0 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-white [overflow-wrap:anywhere]">
                        {formatPrice(plan)}
                      </span>

                      {isPremium && plan.billing_interval && (
                        <span className="shrink-0 text-sm text-white/45">
                          / {INTERVAL_WORD[plan.billing_interval]}
                        </span>
                      )}
                    </div>

                    {/* Clarifying sub-line keeps height steady across cards */}
                    <p className="mt-1.5 h-4 text-xs text-white/40">
                      {perMonth ??
                        (plan.plan_type === "free" ? "Free forever" : "")}
                    </p>
                  </div>

                  <div className="my-6 h-px w-full bg-white/[0.07]" />

                  {/* Benefits */}
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-4 text-xs font-medium uppercase tracking-wide text-white/40">
                      What's included
                    </h3>

                    <ul className="space-y-3">
                      {plan.benefits.map((benefit, index) => (
                        <li
                          key={`${plan.id}-${index}`}
                          className="flex min-w-0 items-start gap-3 text-sm text-white/70"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7C5CFF]/15 text-[#A78BFA] ring-1 ring-inset ring-[#7C5CFF]/20 transition-colors duration-300 group-hover:bg-[#7C5CFF]/20">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>

                          <span className="min-w-0 [overflow-wrap:anywhere]">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      className="cursor-pointer mt-8 flex w-full shrink-0 cursor-default items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/55"
                    >
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                      Current plan
                    </button>
                  ) : isPremium ? (
                    <button
                      type="button"
                      className="cursor-pointer group/btn mt-8 flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#4D32C8] px-4 py-3 text-sm font-medium text-white shadow-lg shadow-[#7C5CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7C5CFF]/40"
                    >
                      Choose plan
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                        strokeWidth={2}
                      />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="group/btn relative mt-8 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C5CFF]/25 hover:bg-[#7C5CFF]/10 hover:text-white hover:shadow-[0_6px_20px_rgba(124,92,255,0.1)]"
                    >
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#7C5CFF]/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
                      <span className="relative z-10">Get started</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
