import adminApi from "../../../shared/api/adminAxios";

export interface AdminSubscriptionPlan {
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

export interface SubscriptionPlanListItem {
  id: number;
  name: string;
  plan_type: "free" | "premium";
  price: string;
  billing_interval: "weekly" | "monthly" | "yearly" | null;
  is_active: boolean;
}

export const getAdminSubscriptionPlans = async () => {
  const response = await adminApi.get<SubscriptionPlanListItem[]>(
    "admins/subscriptions/plans/",
  );

  return response.data;
};

export const getAdminSubscriptionPlan = async (planId: number) => {
  const response = await adminApi.get<AdminSubscriptionPlan>(
    `admins/subscriptions/plans/${planId}/`,
  );

  return response.data;
};

export const createAdminSubscriptionPlan = async (
  planData: Omit<AdminSubscriptionPlan, "id" | "created_at" | "updated_at">,
) => {
  const response = await adminApi.post<AdminSubscriptionPlan>(
    "admins/subscriptions/plans/",
    planData,
  );

  return response.data;
};

export const updateAdminSubscriptionPlan = async (
  planId: number,
  planData: Partial<
    Omit<AdminSubscriptionPlan, "id" | "created_at" | "updated_at">
  >,
) => {
  const response = await adminApi.patch<AdminSubscriptionPlan>(
    `admins/subscriptions/plans/${planId}/`,
    planData,
  );

  return response.data;
};

export const updateAdminSubscriptionPlanStatus = async (
  planId: number,
  isActive: boolean,
) => {
  const response = await adminApi.patch<AdminSubscriptionPlan>(
    `admins/subscriptions/plans/${planId}/status/`,
    {
      is_active: isActive,
    },
  );

  return response.data;
};
