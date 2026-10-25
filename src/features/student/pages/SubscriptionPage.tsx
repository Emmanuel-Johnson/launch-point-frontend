import { useEffect, useState } from "react";
import { ArrowRight, Check, Crown } from "lucide-react";

import { getStudentSubscriptionPlans } from "../api/studentSubscriptionApi";
import type { SubscriptionPlan } from "../api/studentSubscriptionApi";

/*
  ============================================================================
  STUDENT · SUBSCRIPTION PLANS
  ============================================================================
  VIOLET & BLACK THEME
  ----------------------------------------------------------------------------
  Page canvas   #000000
  Card surface  #0A0A0A
  Premium card  #0C0A16
  Primary       #7C5CFF
  Deep violet   #4D32C8
  Hover violet  #9D82FF
  Light violet  #A78BFA
  ============================================================================*/

/* --------------------------------------------------------------- UI-only */
/* Swap for API value when wiring:
   CURRENT_PLAN_ID → the student's active subscription plan id */
const CURRENT_PLAN_ID = 1;

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

/* ================================================================== page */

const SubscriptionPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getStudentSubscriptionPlans();
        setPlans(data);
      } catch (error) {
        console.error("Failed to fetch subscription plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="min-h-full w-full bg-black text-white">
      <style>{`
        @keyframes lpFadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
          <div className="min-w-0 cursor-default">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
              Account
            </p>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.035em]">
              <span className="bg-gradient-to-r from-white via-[#E9E2FF] to-[#A78BFA] bg-clip-text text-transparent">
                Subscription Plans
              </span>
            </h1>

            <p className="mt-2 max-w-xl text-[13px] italic leading-6 tracking-[0.01em] text-white/50 sm:text-sm">
              Explore your subscription benefits and manage your learning
              experience.
            </p>
          </div>
        </section>

        {/* =========================================================
            PLANS
        ========================================================= */}

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#7C5CFF]" />
          </div>
        ) : plans.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center text-sm text-white/50">
            No subscription plans are currently available.
          </div>
        ) : (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {plans.map((plan, i) => {
              const isPremium = plan.plan_type === "premium";
              const isCurrent = plan.id === CURRENT_PLAN_ID;

              return (
                <article
                  key={plan.id}
                  style={{ animationDelay: `${i * 100}ms` }}
                  className={`lp-enter group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.02] sm:p-8 ${
                    isPremium
                      ? "border-[#7C5CFF]/60 bg-[#0C0A16] shadow-[0_12px_40px_rgba(124,92,255,0.12)] hover:-translate-y-1 hover:border-[#9D82FF] hover:shadow-[0_20px_55px_rgba(124,92,255,0.22)]"
                      : "border-white/10 bg-[#0A0A0A]/90 backdrop-blur-sm hover:-translate-y-1 hover:border-[#7C5CFF]/35 hover:shadow-[0_18px_45px_rgba(124,92,255,0.10)]"
                  }`}
                >
                  {/* Subtle premium top border */}

                  {isPremium && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent"
                    />
                  )}

                  {/* Ambient violet glow */}

                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 ${
                      isPremium
                        ? "bg-[#7C5CFF]/20 opacity-40 group-hover:opacity-100"
                        : "bg-[#7C5CFF]/10 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Glass shine effect */}

                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full -translate-y-full rounded-2xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"
                  />

                  {/* Premium badge with crown symbol */}

                  {isPremium && (
                    <div className="absolute -top-0 left-1/2 z-10 -translate-x-1/2">
                      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap rounded-b-xl bg-gradient-to-r from-[#7C5CFF] to-[#4D32C8] px-4 py-2 text-[10px] font-semibold tracking-wide text-white shadow-lg shadow-[#7C5CFF]/20 sm:text-xs">
                        <Crown
                          aria-hidden="true"
                          className="h-3.5 w-3.5 shrink-0"
                          strokeWidth={2.2}
                        />
                        <span>Premium</span>
                      </div>
                    </div>
                  )}

                  {/* Card content */}

                  <div
                    className={`relative flex h-full min-w-0 flex-col ${
                      isPremium ? "pt-5" : ""
                    }`}
                  >
                    {/* Plan heading */}

                    <div className="mb-6 text-center sm:mb-8">
                      {/* Plan name */}

                      <h2 className="mb-2 break-words font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-white">
                        {plan.name}
                      </h2>

                      {/* Plan description */}

                      <p className="mx-auto min-h-[40px] max-w-xs text-xs leading-5 text-white/45 sm:text-sm sm:leading-6">
                        {plan.description}
                      </p>

                      {/* Price */}

                      <div className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
                        <span className="break-words bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C5CFF] bg-clip-text font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
                          {formatPrice(plan)}
                        </span>

                        {isPremium && plan.billing_interval && (
                          <span className="text-sm text-white/45">
                            / {INTERVAL_WORD[plan.billing_interval]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Divider */}

                    <div
                      className={`mb-6 h-px w-full ${
                        isPremium
                          ? "bg-gradient-to-r from-transparent via-[#7C5CFF]/30 to-transparent"
                          : "bg-white/[0.08]"
                      }`}
                    />

                    {/* Benefits */}

                    <div className="mb-7 min-w-0 flex-1 sm:mb-8">
                      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-white/45">
                        What's included
                      </h3>

                      <ul className="space-y-4">
                        {plan.benefits.map((benefit, index) => (
                          <li
                            key={`${plan.id}-${index}`}
                            className="flex min-w-0 items-start gap-3"
                          >
                            <span
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                                isPremium
                                  ? "bg-[#7C5CFF]/20 text-[#B9A7FF] group-hover:bg-[#7C5CFF]/30"
                                  : "bg-[#7C5CFF]/10 text-[#A78BFA] group-hover:bg-[#7C5CFF]/20"
                              }`}
                            >
                              <Check className="h-3 w-3" strokeWidth={2.8} />
                            </span>

                            <span className="min-w-0 break-words text-sm leading-5 text-white/70 transition-colors duration-300 group-hover:text-white/90">
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
                        className="mt-auto flex w-full shrink-0 cursor-default items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/50"
                      >
                        <Check className="h-4 w-4" strokeWidth={2.4} />
                        Current plan
                      </button>
                    ) : isPremium ? (
                      <button
                        type="button"
                        className="group/btn mt-auto flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C5CFF] to-[#4D32C8] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C5CFF]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#7C5CFF]/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
                        className="group/btn relative mt-auto w-full shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#7C5CFF]/35 hover:bg-[#7C5CFF]/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#7C5CFF]/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
                        />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                          Get started
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                            strokeWidth={2}
                          />
                        </span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPage;
