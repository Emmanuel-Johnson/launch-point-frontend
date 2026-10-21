import adminApi from "../../../shared/api/axios";

// =========================================================
// Admin Course Level Types
// =========================================================

export interface AdminCourseLevel {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string[]> | null;
  meta: Record<string, unknown> | null;
}

export interface CreateAdminCourseLevelData {
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateAdminCourseLevelData {
  name?: string;
  description?: string;
}

// =========================================================
// Get All Course Levels
// GET /admins/courses/levels/
// =========================================================

export const getAdminCourseLevels = async (): Promise<
  ApiResponse<AdminCourseLevel[]>
> => {
  const response = await adminApi.get<ApiResponse<AdminCourseLevel[]>>(
    "/admins/courses/levels/",
  );

  return response.data;
};

// =========================================================
// Create Course Level
// POST /admins/courses/levels/
// =========================================================

export const createAdminCourseLevel = async (
  data: CreateAdminCourseLevelData,
): Promise<ApiResponse<AdminCourseLevel>> => {
  const response = await adminApi.post<ApiResponse<AdminCourseLevel>>(
    "/admins/courses/levels/",
    data,
  );

  return response.data;
};

// =========================================================
// Update Course Level
// PATCH /admins/courses/levels/{levelId}/
// =========================================================

export const updateAdminCourseLevel = async (
  levelId: number,
  data: UpdateAdminCourseLevelData,
): Promise<ApiResponse<AdminCourseLevel>> => {
  const response = await adminApi.patch<ApiResponse<AdminCourseLevel>>(
    `/admins/courses/levels/${levelId}/`,
    data,
  );

  return response.data;
};

// =========================================================
// Update Course Level Status
// PATCH /admins/courses/levels/{levelId}/status/
// =========================================================

export const updateAdminCourseLevelStatus = async (
  levelId: number,
  isActive: boolean,
): Promise<ApiResponse<AdminCourseLevel>> => {
  const response = await adminApi.patch<ApiResponse<AdminCourseLevel>>(
    `/admins/courses/levels/${levelId}/status/`,
    {
      is_active: isActive,
    },
  );

  return response.data;
};

// =========================================================
// Soft Delete Course Level
// DELETE /admins/courses/levels/{id}/delete/
// =========================================================

export const deleteAdminCourseLevel = async (
  id: number,
): Promise<ApiResponse<null>> => {
  const response = await adminApi.delete<ApiResponse<null>>(
    `/admins/courses/levels/${id}/delete/`,
  );

  return response.data;
};
