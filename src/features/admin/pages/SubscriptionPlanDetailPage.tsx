import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Crown,
  Pencil,
  Power,
  PowerOff,
  Loader2,
  Check,
  IndianRupee,
  CalendarPlus,
  CalendarClock,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminSubscriptionPlan } from "../api/adminSubscriptionsApi";
// Adjust this path if your modal lives elsewhere.
import SubscriptionStatusConfirmModal from "../components/Subscriptionstatusconfirmmodal";

/* -------------------------------- */
/* Types (local — no API for now)   */
/* -------------------------------- */

interface SubscriptionPlanDetail {
  id: number;
  name: string;
  plan_type: "free" | "premium";
  description: string;
  benefits: string[];
  price: string;
  billing_interval: "weekly" | "monthly" | "yearly" | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const SubscriptionPlanDetailPage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const [plan, setPlan] = useState<SubscriptionPlanDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) {
        setError("Plan ID is missing.");
        return;
      }

      const numericPlanId = Number(planId);

      if (Number.isNaN(numericPlanId)) {
        setError("Invalid plan ID.");
        return;
      }

      try {
        const planData = await getAdminSubscriptionPlan(numericPlanId);
        setPlan(planData);
      } catch (error) {
        console.error("Failed to fetch subscription plan:", error);
        setError("Subscription plan not found.");
      }
    };

    fetchPlan();
  }, [planId]);

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-white">
        <p className="text-red-400">{error}</p>

        <button
          type="button"
          onClick={() => navigate("/admin/subscriptions")}
          className="rounded-lg bg-[#34D399]/10 px-4 py-2 text-sm text-[#34D399] cursor-pointer"
        >
          Back to Subscription Plans
        </button>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-emerald-400" />
      </div>
    );
  }
  /*
   * Activate / Deactivate — open confirm modal
   */
  const handleStatusClick = () => {
    setIsConfirmOpen(true);
  };

  /*
   * Confirm the status change — simple local flip (no API for now)
   */
  const handleConfirmStatusChange = () => {
    setIsUpdating(true);

    window.setTimeout(() => {
      setPlan((previous) => {
        if (!previous) {
          return previous;
        }

        return {
          ...previous,
          is_active: !previous.is_active,
        };
      });

      setIsUpdating(false);
      setIsConfirmOpen(false);
    }, 500);
  };

  const handleEditPlan = () => {
    navigate(`/admin/subscriptions/${planId}/edit`);
  };

  return (
    <>
      {/* Self-contained entrance keyframes (renamed to avoid global clashes) */}
      <style>{`
        @keyframes spItemRise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-item { animation: spItemRise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sp-item { animation: none; }
        }
      `}</style>

      <div className="space-y-6 text-white">
        {/* ================= Back link ================= */}
        <button
          type="button"
          onClick={() => navigate("/admin/subscriptions")}
          className="group inline-flex cursor-pointer items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-white/80"
        >
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          Back
        </button>

        {/* ================= Hero ================= */}
        <div className="sp-item relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_60px_-40px_rgba(0,0,0,0.95)]">
          {/* ambient emerald glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#34D399]/10 blur-3xl" />
          {/* faint gold hairline */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C67A]/20 to-transparent" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Identity */}
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/25 shadow-[0_0_26px_-8px_rgba(52,211,153,0.6)]">
                <CreditCard size={28} className="text-[#34D399]" />
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight [overflow-wrap:anywhere]">
                  {plan.name}
                </h1>

                <p className="mt-1 text-sm text-white/40">Plan #{planId}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {/* Type */}
                  {plan.plan_type === "premium" ? (
                    <span className="inline-flex h-7 items-center justify-center gap-1.5 rounded-full border border-[#E8C67A]/25 bg-[#E8C67A]/10 px-3 text-xs font-medium text-[#E8C67A]">
                      <Crown size={12} />
                      Premium
                    </span>
                  ) : (
                    <span className="inline-flex h-7 items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-white/55">
                      {capitalize(plan.plan_type)}
                    </span>
                  )}

                  {/* Status */}
                  <span
                    className={`inline-flex h-7 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-medium ${
                      plan.is_active
                        ? "border border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399]"
                        : "border border-white/10 bg-white/5 text-white/50"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        plan.is_active
                          ? "animate-pulse bg-[#34D399] shadow-[0_0_6px_rgba(52,211,153,0.7)]"
                          : "bg-white/40"
                      }`}
                    />
                    {plan.is_active ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              {/* Edit */}
              <button
                type="button"
                onClick={handleEditPlan}
                className="group inline-flex h-12 w-30 cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 text-xs font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399]"
              >
                <Pencil
                  size={14}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                Edit Plan
              </button>

              {/* Activate / Deactivate */}
              <button
                type="button"
                disabled={isUpdating}
                onClick={handleStatusClick}
                className={`group/btn relative inline-flex h-12 w-50 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border text-xs font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                  plan.is_active
                    ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/[0.16]"
                    : "border-[#34D399]/20 bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/[0.16]"
                }`}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                {isUpdating ? (
                  <Loader2 size={15} className="relative z-10 animate-spin" />
                ) : plan.is_active ? (
                  <PowerOff size={15} className="relative z-10" />
                ) : (
                  <Power size={15} className="relative z-10" />
                )}

                <span className="relative z-10">
                  {isUpdating
                    ? plan.is_active
                      ? "Deactivating..."
                      : "Activating..."
                    : plan.is_active
                      ? "Deactivate"
                      : "Activate"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= Body grid ================= */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Description */}
            <section
              className="sp-item rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              style={{ animationDelay: "80ms" }}
            >
              <SectionTitle>Description</SectionTitle>

              <p className="mt-3 text-sm leading-relaxed text-white/60 [overflow-wrap:anywhere]">
                {plan.description || "No description provided."}
              </p>
            </section>

            {/* Benefits */}
            <section
              className="sp-item rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              style={{ animationDelay: "160ms" }}
            >
              <div className="flex items-center justify-between">
                <SectionTitle>Benefits</SectionTitle>

                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                  {plan.benefits.length}
                </span>
              </div>

              {plan.benefits.length > 0 ? (
                <ul className="mt-4 space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-white/70"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#34D399]/15 ring-1 ring-inset ring-[#34D399]/25">
                        <Check size={12} className="text-[#34D399]" />
                      </span>

                      <span className="min-w-0 [overflow-wrap:anywhere]">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-white/40">
                  No benefits listed for this plan.
                </p>
              )}
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Pricing */}
            <section
              className="sp-item relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              style={{ animationDelay: "120ms" }}
            >
              {/* faint gold hairline for the premium price */}
              {plan.plan_type === "premium" && (
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C67A]/25 to-transparent" />
              )}

              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-inset ${
                    plan.plan_type === "premium"
                      ? "from-[#E8C67A]/20 to-[#E8C67A]/5 ring-[#E8C67A]/25"
                      : "from-[#34D399]/20 to-[#34D399]/5 ring-[#34D399]/20"
                  }`}
                >
                  <IndianRupee
                    size={18}
                    className={
                      plan.plan_type === "premium"
                        ? "text-[#E8C67A]"
                        : "text-[#34D399]"
                    }
                  />
                </div>

                <SectionTitle>Pricing</SectionTitle>
              </div>

              <div className="mt-5">
                <p
                  className={`text-3xl font-semibold [overflow-wrap:anywhere] ${
                    plan.plan_type === "premium"
                      ? "text-[#E8C67A]"
                      : "text-white"
                  }`}
                >
                  <span className="text-white/40">₹</span>
                  {plan.price}
                </p>

                <p className="mt-1.5 text-sm text-white/45">
                  {billingLabel(plan.billing_interval)}
                </p>
              </div>
            </section>

            {/* Timeline */}
            <section
              className="sp-item rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              style={{ animationDelay: "200ms" }}
            >
              <SectionTitle>Timeline</SectionTitle>

              <div className="mt-4 space-y-4">
                <MetaRow
                  icon={CalendarPlus}
                  label="Created"
                  value={formatDate(plan.created_at)}
                />

                <MetaRow
                  icon={CalendarClock}
                  label="Last updated"
                  value={formatDate(plan.updated_at)}
                />
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ================= Status Confirm Modal ================= */}
      {isConfirmOpen && (
        <SubscriptionStatusConfirmModal
          isOpen={isConfirmOpen}
          isActive={plan.is_active}
          planName={plan.name}
          isLoading={isUpdating}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={handleConfirmStatusChange}
        />
      )}
    </>
  );
};

/* -------------------------------- */
/* Section Title                    */
/* -------------------------------- */

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/40">
      {children}
    </h2>
  );
};

/* -------------------------------- */
/* Meta Row                         */
/* -------------------------------- */

interface MetaRowProps {
  icon: typeof CreditCard;
  label: string;
  value: string;
}

const MetaRow = ({ icon: Icon, label, value }: MetaRowProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/45">
        <Icon size={16} />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-white/35">
          {label}
        </p>
        <p className="text-sm text-white/70 [overflow-wrap:anywhere]">
          {value}
        </p>
      </div>
    </div>
  );
};

/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const billingLabel = (interval: SubscriptionPlanDetail["billing_interval"]) => {
  switch (interval) {
    case "weekly":
      return "Billed per week";
    case "monthly":
      return "Billed per month";
    case "yearly":
      return "Billed per year";
    default:
      return "Free plan";
  }
};

const formatDate = (iso: string) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default SubscriptionPlanDetailPage;
