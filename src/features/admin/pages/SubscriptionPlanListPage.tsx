import { useMemo, useState } from "react";
import {
  CreditCard,
  Search,
  Power,
  PowerOff,
  Loader2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Layers,
  BadgeCheck,
  Ban,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Adjust these paths if your modals live elsewhere.
import SubscriptionPlanFormModal, {
  type PlanFormValues,
} from "../components/Subscriptionplanformmodal";
import SubscriptionStatusConfirmModal from "../components/Subscriptionstatusconfirmmodal";

const ITEMS_PER_PAGE = 6;

const STATUS_FILTERS = ["all", "active", "inactive"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

/* -------------------------------- */
/* Types (local — no API for now)   */
/* -------------------------------- */

interface SubscriptionPlanListItem {
  id: number;
  name: string;
  plan_type: "free" | "premium";
  price: string;
  billing_interval: "weekly" | "monthly" | "yearly" | null;
  is_active: boolean;
}

/* -------------------------------- */
/* Dummy data                       */
/* -------------------------------- */

const DUMMY_PLANS: SubscriptionPlanListItem[] = [
  {
    id: 1,
    name: "Free PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree PlanFree Plan",
    plan_type: "free",
    price:
      "0.00333333333333333333333333333333333333333333333333333333333333333333333333333333",
    billing_interval: null,
    is_active: true,
  },
  {
    id: 2,
    name: "Premium Weekly",
    plan_type: "premium",
    price: "299.00",
    billing_interval: "weekly",
    is_active: true,
  },
  {
    id: 3,
    name: "Premium Monthly",
    plan_type: "premium",
    price: "1099.00",
    billing_interval: "monthly",
    is_active: true,
  },
  {
    id: 4,
    name: "Premium Yearly",
    plan_type: "premium",
    price: "9999.00",
    billing_interval: "yearly",
    is_active: true,
  },
  {
    id: 5,
    name: "Student Monthly",
    plan_type: "premium",
    price: "799.00",
    billing_interval: "monthly",
    is_active: false,
  },
  {
    id: 6,
    name: "Basic Weekly",
    plan_type: "free",
    price: "0.00",
    billing_interval: "weekly",
    is_active: false,
  },
  {
    id: 7,
    name: "Pro Monthly",
    plan_type: "premium",
    price: "1499.00",
    billing_interval: "monthly",
    is_active: true,
  },
  {
    id: 8,
    name: "Pro Yearly",
    plan_type: "premium",
    price: "12999.00",
    billing_interval: "yearly",
    is_active: true,
  },
];

const SubscriptionPlanListPage = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState<SubscriptionPlanListItem[]>(DUMMY_PLANS);

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [updatingPlanId, setUpdatingPlanId] = useState<number | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Plan currently awaiting status-change confirmation (null = modal closed).
  const [confirmPlan, setConfirmPlan] =
    useState<SubscriptionPlanListItem | null>(null);

  /*
   * Filter plans
   */
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch = plan.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && plan.is_active) ||
        (statusFilter === "inactive" && !plan.is_active);

      return matchesSearch && matchesStatus;
    });
  }, [plans, searchQuery, statusFilter]);

  /*
   * Pagination
   */
  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const pageList = buildPageList(totalPages, currentPage);

  /*
   * Stats
   */
  const totalPlans = plans.length;

  const activePlans = plans.filter((plan) => plan.is_active).length;

  const inactivePlans = plans.filter((plan) => !plan.is_active).length;

  const premiumPlans = plans.filter(
    (plan) => plan.plan_type === "premium",
  ).length;

  /*
   * Activate / Deactivate — open confirm modal
   */
  const handleStatusClick = (plan: SubscriptionPlanListItem) => {
    setConfirmPlan(plan);
  };

  /*
   * Confirm the status change — simple local flip (no API for now)
   */
  const handleConfirmStatusChange = () => {
    if (!confirmPlan) {
      return;
    }

    const planId = confirmPlan.id;

    setUpdatingPlanId(planId);

    // Fake a tiny delay so the spinner + button state are visible in the UI.
    window.setTimeout(() => {
      setPlans((previousPlans) =>
        previousPlans.map((plan) =>
          plan.id === planId ? { ...plan, is_active: !plan.is_active } : plan,
        ),
      );

      setUpdatingPlanId(null);
      setConfirmPlan(null);
    }, 500);
  };

  /*
   * Create plan — open modal
   */
  const handleCreatePlan = () => {
    setIsCreateOpen(true);
  };

  /*
   * Create plan — add to list locally (no API for now)
   */
  const handleCreateSubmit = (values: PlanFormValues) => {
    setPlans((previousPlans) => {
      const nextId =
        previousPlans.reduce((max, plan) => Math.max(max, plan.id), 0) + 1;

      const newPlan: SubscriptionPlanListItem = {
        id: nextId,
        name: values.name,
        plan_type: values.plan_type,
        price: values.price,
        billing_interval: values.billing_interval || null,
        is_active: values.is_active,
      };

      return [newPlan, ...previousPlans];
    });

    setCurrentPage(1);
  };

  const placeholderCount =
    paginatedPlans.length > 0 ? ITEMS_PER_PAGE - paginatedPlans.length : 0;

  const activeFilterIndex = STATUS_FILTERS.indexOf(statusFilter);

  return (
    <>
      {/*
        Fonts + entrance keyframes (scoped).
        Space Grotesk = display (headings, figures), Inter = body.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .sp-font-body {
          font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
        }
        .sp-font-display {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif;
          letter-spacing: -0.01em;
        }

        @keyframes spItemRise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sp-item { animation: spItemRise 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .sp-item { animation: none; }
        }
      `}</style>

      <div className="sp-font-body space-y-6 text-white">
        {/* ================= Hero ================= */}
        <div className="sp-item relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_60px_-40px_rgba(0,0,0,0.95)]">
          {/* ambient emerald glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#34D399]/10 blur-3xl" />
          {/* faint gold hairline */}
          <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#E8C67A]/20 to-transparent" />

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/25 shadow-[0_0_22px_-8px_rgba(52,211,153,0.6)]">
                <CreditCard size={22} className="text-[#34D399]" />
              </div>

              <div>
                <h1 className="sp-font-display text-2xl font-semibold tracking-tight">
                  Subscription Plans
                </h1>

                <p className="mt-1 text-sm text-white/45">
                  Manage subscription plans and their availability.
                </p>
              </div>
            </div>

            {/* Create Plan */}
            <button
              type="button"
              onClick={handleCreatePlan}
              className="group relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 self-start overflow-hidden rounded-xl border border-[#34D399]/30 bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 px-4 py-2.5 text-sm font-medium text-[#34D399] shadow-[0_0_20px_-8px_rgba(52,211,153,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/50 hover:from-[#34D399]/25 hover:shadow-[0_12px_30px_-12px_rgba(52,211,153,0.7)] sm:self-auto"
            >
              {/* shine sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <Plus
                size={17}
                className="relative z-10 transition-transform duration-300 group-hover:rotate-90"
              />

              <span className="relative z-10">Create Subscription Plan</span>
            </button>
          </div>
        </div>

        {/* ================= Stats ================= */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total Plans"
            value={totalPlans}
            icon={Layers}
            accent="emerald"
            delay={80}
          />

          <StatCard
            label="Active Plans"
            value={activePlans}
            icon={BadgeCheck}
            accent="emerald"
            delay={160}
          />

          <StatCard
            label="Inactive Plans"
            value={inactivePlans}
            icon={Ban}
            accent="slate"
            delay={240}
          />

          <StatCard
            label="Premium Plans"
            value={premiumPlans}
            icon={Crown}
            accent="gold"
            delay={320}
          />
        </div>

        {/* ================= Filters ================= */}
        <div className="sp-item flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="group relative w-full md:max-w-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-white/40 transition-colors duration-300 group-focus-within:text-[#34D399]"
            />

            <input
              type="text"
              value={searchQuery}
              placeholder="Search subscription plans..."
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-white/[0.08] bg-black/30 py-2.5 pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/30 hover:border-white/[0.14] focus:border-[#34D399]/40 focus:bg-black/40 focus:shadow-[0_0_0_3px_rgba(52,211,153,0.08)]"
            />
          </div>

          {/* Segmented Status Filter (sliding indicator) */}
          <div className="relative flex self-start rounded-xl border border-white/[0.08] bg-black/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:self-auto">
            {/* Sliding highlight */}
            <span
              aria-hidden="true"
              className="absolute bottom-1 left-1 top-1 w-[92px] rounded-lg bg-gradient-to-br from-[#34D399]/25 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/30 shadow-[0_0_18px_-6px_rgba(52,211,153,0.7)] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ transform: `translateX(${activeFilterIndex * 100}%)` }}
            />

            {STATUS_FILTERS.map((key) => {
              const isActive = statusFilter === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setStatusFilter(key);
                    setCurrentPage(1);
                  }}
                  className={`relative z-10 w-[92px] cursor-pointer rounded-lg py-1.5 text-xs font-medium capitalize transition-colors duration-300 ${
                    isActive
                      ? "text-[#34D399]"
                      : "text-white/50 hover:text-white/85"
                  }`}
                >
                  {key === "all" ? "All" : key}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= Table ================= */}
        <div className="sp-item overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_24px_60px_-44px_rgba(0,0,0,0.95)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1080px] table-fixed">
              <colgroup>
                <col className="w-[29%]" />
                <col className="w-[14%]" />
                <col className="w-[12%]" />
                <col className="w-[14%]" />
                <col className="w-[14%]" />
                <col className="w-[17%]" />
              </colgroup>

              {/* Table Header */}
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.015] text-left text-[11px] uppercase tracking-[0.14em] text-white/40">
                  <th className="px-6 py-4 font-medium">Plan</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 text-center font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Billing</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 text-right font-medium">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {paginatedPlans.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-20 text-center text-sm text-white/40"
                    >
                      No subscription plans found.
                    </td>
                  </tr>
                ) : (
                  <>
                    {paginatedPlans.map((plan) => (
                      <tr
                        key={plan.id}
                        className="border-b border-white/[0.04] transition-colors duration-300 hover:bg-white/[0.025]"
                      >
                        {/* Plan */}
                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/admin/subscriptions/${plan.id}`)
                            }
                            className="group flex w-full min-w-0 cursor-pointer items-center gap-3 text-left"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#34D399]/20 to-[#34D399]/5 ring-1 ring-inset ring-[#34D399]/20 transition-transform duration-300 group-hover:scale-105">
                              <CreditCard
                                size={18}
                                className="text-[#34D399]"
                              />
                            </div>

                            <div className="min-w-0">
                              <p
                                title={plan.name}
                                className="truncate font-medium text-white transition-colors duration-300 group-hover:text-[#34D399]"
                              >
                                {plan.name}
                              </p>

                              <p className="text-xs text-white/40">
                                Plan #{plan.id}
                              </p>
                            </div>
                          </button>
                        </td>

                        {/* Type — fixed size badge */}
                        <td className="px-6 py-5">
                          {plan.plan_type === "premium" ? (
                            <span className="inline-flex h-7 w-24 items-center justify-center gap-1.5 rounded-full border border-[#E8C67A]/25 bg-[#E8C67A]/10 text-xs font-medium text-[#E8C67A]">
                              <Crown size={12} />
                              Premium
                            </span>
                          ) : (
                            <span className="inline-flex h-7 w-24 items-center justify-center rounded-full border border-slate-400/20 bg-slate-400/10 text-xs font-medium text-slate-300">
                              {capitalize(plan.plan_type)}
                            </span>
                          )}
                        </td>

                        {/* Price — centered + truncated */}
                        <td className="px-6 py-5 text-center">
                          <span
                            title={plan.price}
                            className="sp-font-display block truncate font-semibold text-white"
                          >
                            <span className="text-white/45">₹</span>
                            {plan.price}
                          </span>
                        </td>

                        {/* Billing — fixed size chip (color-coded by interval) */}
                        <td className="px-6 py-5">
                          {plan.billing_interval ? (
                            <span
                              className={`inline-flex h-7 w-24 items-center justify-center rounded-md border text-xs font-medium capitalize ${billingChipClass(
                                plan.billing_interval,
                              )}`}
                            >
                              {plan.billing_interval}
                            </span>
                          ) : (
                            <span className="inline-flex h-7 w-24 items-center justify-center text-sm text-white/30">
                              —
                            </span>
                          )}
                        </td>

                        {/* Status — fixed size badge */}
                        <td className="px-6 py-5">
                          <StatusBadge isActive={plan.is_active} />
                        </td>

                        {/* Action — fixed size button */}
                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            disabled={updatingPlanId === plan.id}
                            onClick={() => handleStatusClick(plan)}
                            className={`group/btn relative inline-flex h-9 w-32 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border text-xs font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                              plan.is_active
                                ? "border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/[0.16]"
                                : "border-[#34D399]/20 bg-[#34D399]/10 text-[#34D399] hover:bg-[#34D399]/[0.16]"
                            }`}
                          >
                            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />

                            {updatingPlanId === plan.id ? (
                              <Loader2
                                size={15}
                                className="relative z-10 animate-spin"
                              />
                            ) : plan.is_active ? (
                              <PowerOff size={15} className="relative z-10" />
                            ) : (
                              <Power size={15} className="relative z-10" />
                            )}

                            <span className="relative z-10">
                              {updatingPlanId === plan.id
                                ? plan.is_active
                                  ? "Deactivating..."
                                  : "Activating..."
                                : plan.is_active
                                  ? "Deactivate"
                                  : "Activate"}
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}

                    {/* Placeholder rows keep the table height stable across pages */}
                    {Array.from({ length: placeholderCount }).map(
                      (_, index) => (
                        <tr
                          key={`placeholder-${index}`}
                          aria-hidden="true"
                          className="border-b border-white/[0.03]"
                        >
                          <td colSpan={6} className="px-6 py-5">
                            <div className="h-10" />
                          </td>
                        </tr>
                      ),
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredPlans.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-white/[0.06] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/40">
                Showing{" "}
                <span className="text-white/70">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                </span>{" "}
                to{" "}
                <span className="text-white/70">
                  {Math.min(currentPage * ITEMS_PER_PAGE, filteredPlans.length)}
                </span>{" "}
                of <span className="text-white/70">{filteredPlans.length}</span>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399] hover:shadow-[0_8px_18px_-8px_rgba(52,211,153,0.6)] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft size={17} />
                </button>

                {pageList.map((entry, index) =>
                  entry === "…" ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex h-9 w-9 items-center justify-center text-sm text-white/30"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={entry}
                      type="button"
                      onClick={() => setCurrentPage(entry)}
                      className={`sp-font-display flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-sm transition-all duration-300 ${
                        entry === currentPage
                          ? "bg-gradient-to-br from-[#34D399]/25 to-[#34D399]/5 font-semibold text-[#34D399] ring-1 ring-inset ring-[#34D399]/30 shadow-[0_0_18px_-6px_rgba(52,211,153,0.7)]"
                          : "border border-white/[0.08] bg-white/[0.02] font-medium text-white/55 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399] hover:shadow-[0_8px_18px_-8px_rgba(52,211,153,0.6)]"
                      }`}
                    >
                      {entry}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  disabled={currentPage >= totalPages || totalPages === 0}
                  onClick={() =>
                    setCurrentPage((page) => Math.min(totalPages, page + 1))
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#34D399]/30 hover:bg-[#34D399]/10 hover:text-[#34D399] hover:shadow-[0_8px_18px_-8px_rgba(52,211,153,0.6)] disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= Create Modal ================= */}
      {isCreateOpen && (
        <SubscriptionPlanFormModal
          isOpen={isCreateOpen}
          mode="create"
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateSubmit}
        />
      )}

      {/* ================= Status Confirm Modal ================= */}
      {confirmPlan && (
        <SubscriptionStatusConfirmModal
          isOpen={confirmPlan !== null}
          isActive={confirmPlan.is_active}
          planName={confirmPlan.name}
          isLoading={updatingPlanId === confirmPlan.id}
          onCancel={() => setConfirmPlan(null)}
          onConfirm={handleConfirmStatusChange}
        />
      )}
    </>
  );
};

/* -------------------------------- */
/* Status Badge                     */
/* -------------------------------- */

interface StatusBadgeProps {
  isActive: boolean;
}

const StatusBadge = ({ isActive }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex h-7 w-24 items-center justify-center gap-1.5 rounded-full text-xs font-medium ${
        isActive
          ? "border border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399]"
          : "border border-white/10 bg-white/5 text-white/50"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive
            ? "animate-pulse bg-[#34D399] shadow-[0_0_6px_rgba(52,211,153,0.7)]"
            : "bg-white/40"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

/* -------------------------------- */
/* Stat Card                        */
/* -------------------------------- */

type StatAccent = "emerald" | "gold" | "slate";

interface StatCardProps {
  label: string;
  value: number;
  icon: typeof CreditCard;
  accent: StatAccent;
  delay: number;
}

const STAT_ACCENTS: Record<
  StatAccent,
  { tile: string; icon: string; glow: string; border: string; value: string }
> = {
  emerald: {
    tile: "from-[#34D399]/20 to-[#34D399]/5 ring-[#34D399]/20",
    icon: "text-[#34D399]",
    glow: "bg-[#34D399]/10",
    border: "hover:border-[#34D399]/25",
    value: "text-white",
  },
  gold: {
    tile: "from-[#E8C67A]/20 to-[#E8C67A]/5 ring-[#E8C67A]/25",
    icon: "text-[#E8C67A]",
    glow: "bg-[#E8C67A]/10",
    border: "hover:border-[#E8C67A]/30",
    value: "text-[#E8C67A]",
  },
  slate: {
    tile: "from-white/10 to-white/[0.02] ring-white/10",
    icon: "text-white/55",
    glow: "bg-white/10",
    border: "hover:border-white/15",
    value: "text-white",
  },
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  accent,
  delay,
}: StatCardProps) => {
  const styles = STAT_ACCENTS[accent];

  return (
    <div
      className={`sp-item group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-[#0B0B0B] to-[#080808] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.95)] ${styles.border}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* ambient glow */}
      <div
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${styles.glow}`}
      />

      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ring-1 ring-inset transition-transform duration-500 group-hover:scale-110 ${styles.tile}`}
      >
        <Icon size={18} className={styles.icon} />
      </div>

      <p className="text-sm text-white/45">{label}</p>

      <p
        className={`sp-font-display mt-1 text-2xl font-semibold ${styles.value}`}
      >
        {value}
      </p>
    </div>
  );
};

/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

/*
 * Billing interval chip colours — subtle, on-brand tints.
 * weekly → sky · monthly → emerald (shell accent) · yearly → champagne gold.
 */
const billingChipClass = (
  interval: Exclude<SubscriptionPlanListItem["billing_interval"], null>,
) => {
  switch (interval) {
    case "weekly":
      return "border-sky-400/20 bg-sky-400/10 text-sky-300";
    case "monthly":
      return "border-[#34D399]/25 bg-[#34D399]/10 text-[#34D399]";
    case "yearly":
      return "border-[#E8C67A]/25 bg-[#E8C67A]/10 text-[#E8C67A]";
    default:
      return "border-white/[0.07] bg-white/[0.03] text-white/55";
  }
};

/*
 * Windowed page list: collapses long ranges with ellipses while always
 * keeping the first and last page reachable.
 */
const buildPageList = (total: number, current: number): (number | "…")[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages: (number | "…")[] = [1];

  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) {
    pages.push("…");
  }

  for (let page = left; page <= right; page += 1) {
    pages.push(page);
  }

  if (right < total - 1) {
    pages.push("…");
  }

  pages.push(total);

  return pages;
};

export default SubscriptionPlanListPage;
