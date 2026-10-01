import api from "../../../shared/api/axios";

export interface SubscriptionPlan {
  id: number;
  name: string;
  plan_type: "free" | "premium";
  description: string;
  benefits: string[];
  price: string;
  billing_interval: "weekly" | "monthly" | "yearly" | null;
}

export const getStudentSubscriptionPlans = async (): Promise<
  SubscriptionPlan[]
> => {
  const response = await api.get<SubscriptionPlan[]>(
    "/students/subscriptions/plans/",
  );

  return response.data;
};
