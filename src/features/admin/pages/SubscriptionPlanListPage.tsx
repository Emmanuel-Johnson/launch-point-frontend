import { useEffect, useMemo, useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  Pencil,
  Power,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getAdminSubscriptionPlans,
  updateAdminSubscriptionPlanStatus,
  type SubscriptionPlanListItem,
} from "../api/adminSubscriptionsApi";

const ITEMS_PER_PAGE = 6;

const SubscriptionPlanListPage = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState<SubscriptionPlanListItem[] | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const loadPlans = async () => {
      try {
        const data = await getAdminSubscriptionPlans();

        if (isMounted) {
          setPlans(data);
        }
      } catch {
        if (isMounted) {
          toast.error("Failed to load subscription plans", {
            containerId: "admin",
          });

          setPlans([]);
        }
      }
    };

    void loadPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const loading = plans === null;

  const filteredPlans = useMemo(() => {
    if (!plans) {
      return [];
    }

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

  const totalPages = Math.ceil(filteredPlans.length / ITEMS_PER_PAGE);

  const paginatedPlans = filteredPlans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalPlans = plans?.length ?? 0;

  const activePlans = plans?.filter((plan) => plan.is_active).length ?? 0;

  const inactivePlans = plans?.filter((plan) => !plan.is_active).length ?? 0;

  const premiumPlans =
    plans?.filter((plan) => plan.plan_type === "premium").length ?? 0;

  const handleStatusChange = async (planId: number, currentStatus: boolean) => {
    try {
      const updatedPlan = await updateAdminSubscriptionPlanStatus(
        planId,
        !currentStatus,
      );

      setPlans((prevPlans) => {
        if (!prevPlans) {
          return prevPlans;
        }

        return prevPlans.map((plan) =>
          plan.id === planId
            ? {
                ...plan,
                is_active: updatedPlan.is_active,
              }
            : plan,
        );
      });

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
    }
  };

  return (
    <div className="min-h-screen bg-[#050807] px-6 py-6 text-white">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
              <CreditCard className="h-5 w-5 text-emerald-400" />
            </div>

            <h1 className="text-2xl font-semibold">Subscription Plans</h1>
          </div>

          <p className="text-sm text-gray-400">
            Manage pricing plans and subscription availability.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            toast.info("Create plan modal coming next", {
              containerId: "admin",
            });
          }}
          className="flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
        >
          <Plus size={18} />
          Add Plan
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Plans"
          value={totalPlans}
          icon={<CreditCard size={18} />}
        />

        <StatCard
          label="Active Plans"
          value={activePlans}
          icon={<Power size={18} />}
        />

        <StatCard
          label="Inactive Plans"
          value={inactivePlans}
          icon={<Power size={18} />}
        />

        <StatCard
          label="Premium Plans"
          value={premiumPlans}
          icon={<CreditCard size={18} />}
        />
      </div>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-sm">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search plans..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-emerald-400/40"
          />
        </div>

        {/* Status */}
        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(
              event.target.value as "all" | "active" | "inactive",
            );

            setCurrentPage(1);
          }}
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-gray-300 outline-none focus:border-emerald-400/40"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Billing</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <LoadingRows />
              ) : paginatedPlans.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-gray-500"
                  >
                    No subscription plans found.
                  </td>
                </tr>
              ) : (
                paginatedPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    onClick={() => navigate(`/admin/subscriptions/${plan.id}`)}
                    className="cursor-pointer border-b border-white/5 transition hover:bg-white/[0.025]"
                  >
                    {/* Plan */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                          <CreditCard size={18} className="text-emerald-400" />
                        </div>

                        <div>
                          <p className="font-medium text-white">{plan.name}</p>

                          <p className="text-xs text-gray-500">
                            Plan #{plan.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          plan.plan_type === "premium"
                            ? "bg-purple-400/10 text-purple-400"
                            : "bg-gray-400/10 text-gray-400"
                        }`}
                      >
                        {plan.plan_type}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5">
                      <span className="font-medium text-white">
                        ₹{plan.price}
                      </span>
                    </td>

                    {/* Billing */}
                    <td className="px-6 py-5 text-sm capitalize text-gray-400">
                      {plan.billing_interval || "—"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          plan.is_active
                            ? "bg-emerald-400/10 text-emerald-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {plan.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td
                      className="px-6 py-5"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/admin/subscriptions/${plan.id}`)
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                          title="Edit plan"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(plan.id, plan.is_active)
                          }
                          className={`rounded-lg p-2 transition ${
                            plan.is_active
                              ? "text-red-400 hover:bg-red-400/10"
                              : "text-emerald-400 hover:bg-emerald-400/10"
                          }`}
                          title={plan.is_active ? "Deactivate" : "Activate"}
                        >
                          <Power size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredPlans.length > 0 && (
          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="text-gray-300">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="text-gray-300">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredPlans.length)}
              </span>{" "}
              of <span className="text-gray-300">{filteredPlans.length}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="px-2 text-sm text-gray-400">
                {currentPage} / {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                disabled={currentPage >= totalPages || totalPages === 0}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ----------------------------- */
/* Loading Rows                  */
/* ----------------------------- */

const LoadingRows = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-white/5">
          {Array.from({ length: 6 }).map((_, cellIndex) => (
            <td key={cellIndex} className="px-6 py-5">
              <div className="h-4 animate-pulse rounded bg-white/5" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

/* ----------------------------- */
/* Stat Card                     */
/* ----------------------------- */

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const StatCard = ({ label, value, icon }: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
          {icon}
        </div>
      </div>

      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
};

export default SubscriptionPlanListPage;
