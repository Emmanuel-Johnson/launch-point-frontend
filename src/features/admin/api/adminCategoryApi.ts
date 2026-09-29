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
  const response = await adminApi.get<AdminCategory[]>("/admins/categories/");

  return response.data;
};

// =========================================================
// Get Category Detail
// =========================================================

export const getAdminCategory = async (
  categoryId: number,
): Promise<AdminCategory> => {
  const response = await adminApi.get<AdminCategory>(
    `/admins/categories/${categoryId}/`,
  );

  return response.data;
};

// =========================================================
// Update Category Status
// =========================================================

export interface UpdateAdminCategoryStatusResponse {
  is_active: boolean;
  message: string;
}

export const updateAdminCategoryStatus = async (
  categoryId: number,
  isActive: boolean,
): Promise<UpdateAdminCategoryStatusResponse> => {
  const response = await adminApi.patch<UpdateAdminCategoryStatusResponse>(
    `/admins/categories/${categoryId}/status/`,
    {
      is_active: isActive,
    },
  );

  return response.data;
};

// =========================================================
// Create Category
// =========================================================

export interface CreateAdminCategoryData {
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
}

export const createAdminCategory = async (
  data: CreateAdminCategoryData,
): Promise<AdminCategory> => {
  const response = await adminApi.post<AdminCategory>(
    "/admins/categories/",
    data,
  );

  return response.data;
};

// =========================================================
// Update Category
// =========================================================

export interface UpdateAdminCategoryData {
  name: string;
  slug: string;
  description: string;
}

export const updateAdminCategory = async (
  categoryId: number,
  data: UpdateAdminCategoryData,
): Promise<AdminCategory> => {
  const response = await adminApi.patch<AdminCategory>(
    `/admins/categories/${categoryId}/update/`,
    data,
  );

  return response.data;
};
