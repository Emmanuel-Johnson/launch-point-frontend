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

interface CourseLevelApiResponse {
  success: boolean;
  message: string;
  data: AdminCourseLevel;
}

interface CourseLevelsApiResponse {
  success: boolean;
  message: string;
  data: AdminCourseLevel[];
}

export interface CreateAdminCourseLevelData {
  name: string;
  description: string;
}

export interface UpdateAdminCourseLevelData {
  name?: string;
  description?: string;
}

export interface UpdateAdminCourseLevelStatusResponse {
  success: boolean;
  message: string;
  data: AdminCourseLevel;
}

// =========================================================
// Get All Course Levels
// GET /admins/courses/levels/
// =========================================================

export const getAdminCourseLevels = async (): Promise<AdminCourseLevel[]> => {
  const response = await adminApi.get<CourseLevelsApiResponse>(
    "/admins/courses/levels/",
  );

  return response.data.data;
};

// =========================================================
// Get Course Level Detail
// GET /admins/courses/levels/{levelId}/
// =========================================================

export const getAdminCourseLevel = async (
  levelId: number,
): Promise<AdminCourseLevel> => {
  const response = await adminApi.get<CourseLevelApiResponse>(
    `/admins/courses/levels/${levelId}/`,
  );

  return response.data.data;
};

// =========================================================
// Create Course Level
// POST /admins/courses/levels/
// =========================================================

export const createAdminCourseLevel = async (
  data: CreateAdminCourseLevelData,
): Promise<AdminCourseLevel> => {
  const response = await adminApi.post<CourseLevelApiResponse>(
    "/admins/courses/levels/",
    data,
  );

  return response.data.data;
};

// =========================================================
// Update Course Level
// PATCH /admins/courses/levels/{levelId}/
// =========================================================

export const updateAdminCourseLevel = async (
  levelId: number,
  data: UpdateAdminCourseLevelData,
): Promise<AdminCourseLevel> => {
  const response = await adminApi.patch<CourseLevelApiResponse>(
    `/admins/courses/levels/${levelId}/`,
    data,
  );

  return response.data.data;
};

// =========================================================
// Update Course Level Status
// PATCH /admins/courses/levels/{levelId}/status/
// =========================================================

export const updateAdminCourseLevelStatus = async (
  levelId: number,
  isActive: boolean,
): Promise<UpdateAdminCourseLevelStatusResponse> => {
  const response = await adminApi.patch<CourseLevelApiResponse>(
    `/admins/courses/levels/${levelId}/status/`,
    {
      is_active: isActive,
    },
  );

  return {
    success: response.data.success,
    message: response.data.message,
    data: response.data.data,
  };
};
