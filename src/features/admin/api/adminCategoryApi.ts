import adminApi from "../../../shared/api/adminAxios";

// =========================================================
// Admin Category
// =========================================================

export interface AdminCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const getAdminCategories = async (): Promise<AdminCategory[]> => {
  const response = await adminApi.get<AdminCategory[]>(
    "/admins/categories/",
  );

  return response.data;
};
