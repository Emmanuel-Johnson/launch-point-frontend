import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CreditCard,
  Edit,
  Power,
  RefreshCw,
  X,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAdminSubscriptionPlan,
  updateAdminSubscriptionPlanStatus,
  type AdminSubscriptionPlan,
} from "../api/adminSubscriptionsApi";

const SubscriptionPlanDetailPage = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const [plan, setPlan] = useState<AdminSubscriptionPlan | null>(null);

  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (!planId) {
      return;
    }

    let isMounted = true;

    const loadPlan = async () => {
      try {
        const data = await getAdminSubscriptionPlan(Number(planId));

        if (isMounted) {
          setPlan(data);
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to load subscription plan", {
            containerId: "admin",
          });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadPlan();

    return () => {
      isMounted = false;
    };
  }, [planId]);

  const handleStatusChange = async () => {
    if (!plan) {
      return;
    }

    try {
      setUpdatingStatus(true);

      const updatedPlan = await updateAdminSubscriptionPlanStatus(
        plan.id,
        !plan.is_active,
      );

      setPlan(updatedPlan);

      toast.success(
        updatedPlan.is_active
          ? "Plan activated successfully"
          : "Plan deactivated successfully",
        {
          containerId: "admin",
        },
      );
    } catch {
      toast.error("Failed to update plan status", {
        containerId: "admin",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return <DetailPageSkeleton />;
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-[#050807] px-6 py-6 text-white">
        <button
          type="button"
          onClick={() => navigate("/admin/subscriptions")}
          className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Subscription Plans
        </button>

        <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="text-center">
            <CreditCard size={40} className="mx-auto mb-4 text-gray-600" />

            <h2 className="text-lg font-medium text-white">
              Subscription plan not found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              The plan may have been removed or the ID is invalid.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050807] px-6 py-6 text-white">
      {/* Back */}
      <button
        type="button"
        onClick={() => navigate("/admin/subscriptions")}
        className="mb-6 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
      >
        <ArrowLeft size={17} />
        Back to Subscription Plans
      </button>

      {/* Header Card */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
        {/* Green glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10">
              <CreditCard size={26} className="text-emerald-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold">{plan.name}</h1>

                <StatusBadge isActive={plan.is_active} />
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Subscription Plan #{plan.id}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                toast.info("Edit plan modal coming next", {
                  containerId: "admin",
                })
              }
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              <Edit size={17} />
              Edit
            </button>

            <button
              type="button"
              disabled={updatingStatus}
              onClick={handleStatusChange}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
                plan.is_active
                  ? "bg-red-400/10 text-red-400 hover:bg-red-400/20"
                  : "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20"
              }`}
            >
              {updatingStatus ? (
                <RefreshCw size={17} className="animate-spin" />
              ) : (
                <Power size={17} />
              )}

              {plan.is_active ? "Deactivate" : "Activate"}
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          label="Plan Type"
          value={plan.plan_type === "premium" ? "Premium" : "Free"}
          icon={<CreditCard size={18} />}
        />

        <InfoCard
          label="Price"
          value={`₹${plan.price}`}
          icon={<CreditCard size={18} />}
        />

        <InfoCard
          label="Billing"
          value={
            plan.billing_interval
              ? capitalize(plan.billing_interval)
              : "Not set"
          }
          icon={<CalendarDays size={18} />}
        />

        <InfoCard
          label="Status"
          value={plan.is_active ? "Active" : "Inactive"}
          icon={plan.is_active ? <Check size={18} /> : <X size={18} />}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Description */}
        <div className="lg:col-span-2">
          <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Description
            </h2>

            <p className="whitespace-pre-wrap text-sm leading-7 text-gray-400">
              {plan.description?.trim()
                ? plan.description
                : "No description provided for this plan."}
            </p>
          </section>
        </div>

        {/* Plan Information */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Plan Information
          </h2>

          <div className="space-y-4">
            <InfoRow label="Plan ID" value={`#${plan.id}`} />

            <InfoRow label="Plan Type" value={capitalize(plan.plan_type)} />

            <InfoRow label="Price" value={`₹${plan.price}`} />

            <InfoRow
              label="Billing"
              value={
                plan.billing_interval
                  ? capitalize(plan.billing_interval)
                  : "Not set"
              }
            />

            <InfoRow
              label="Status"
              value={plan.is_active ? "Active" : "Inactive"}
            />
          </div>
        </section>

        {/* Benefits */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:col-span-3">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Plan Benefits
          </h2>

          {plan.benefits && plan.benefits.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {plan.benefits.map((benefit, index) => (
                <div
                  key={`${benefit}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/20 p-4"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                    <Check size={14} className="text-emerald-400" />
                  </div>

                  <span className="text-sm text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No benefits have been added to this plan.
            </p>
          )}
        </section>

        {/* Dates */}
        <section className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 lg:col-span-3">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Record Information
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InfoRow label="Created At" value={formatDate(plan.created_at)} />

            <InfoRow label="Last Updated" value={formatDate(plan.updated_at)} />
          </div>
        </section>
      </div>
    </div>
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
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-emerald-400/10 text-emerald-400"
          : "bg-red-400/10 text-red-400"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

/* -------------------------------- */
/* Info Card                        */
/* -------------------------------- */

interface InfoCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const InfoCard = ({ label, value, icon }: InfoCardProps) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 text-xl font-semibold capitalize text-white">
        {value}
      </p>
    </div>
  );
};

/* -------------------------------- */
/* Info Row                         */
/* -------------------------------- */

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-right text-sm font-medium text-gray-300">
        {value}
      </span>
    </div>
  );
};

/* -------------------------------- */
/* Helpers                          */
/* -------------------------------- */

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/* -------------------------------- */
/* Loading Skeleton                 */
/* -------------------------------- */

const DetailPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#050807] px-6 py-6">
      <div className="mb-6 h-5 w-48 animate-pulse rounded bg-white/5" />

      <div className="mb-6 h-32 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="h-64 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02] lg:col-span-2" />

        <div className="h-64 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />

        <div className="h-48 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02] lg:col-span-3" />
      </div>
    </div>
  );
};

export default SubscriptionPlanDetailPage;
