import adminApi from "../../../../shared/api/axios";

// =========================================================
// Admin Course Skill Types
// =========================================================

export interface AdminCourseSkill {
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

export interface CreateAdminCourseSkillData {
  name: string;
  description: string;
  is_active: boolean;
}

export interface UpdateAdminCourseSkillData {
  name?: string;
  description?: string;
}

// =========================================================
// Get All Course Skills
// GET /admins/courses/skills/
// =========================================================

export const getAdminCourseSkills = async (): Promise<
  ApiResponse<AdminCourseSkill[]>
> => {
  const response = await adminApi.get<ApiResponse<AdminCourseSkill[]>>(
    "/admins/courses/skills/",
  );

  return response.data;
};

// =========================================================
// Create Course Skill
// POST /admins/courses/skills/
// =========================================================

export const createAdminCourseSkill = async (
  data: CreateAdminCourseSkillData,
): Promise<ApiResponse<AdminCourseSkill>> => {
  const response = await adminApi.post<ApiResponse<AdminCourseSkill>>(
    "/admins/courses/skills/",
    data,
  );

  return response.data;
};

// =========================================================
// Update Course Skill
// PATCH /admins/courses/skills/{skillId}/
// =========================================================

export const updateAdminCourseSkill = async (
  skillId: number,
  data: UpdateAdminCourseSkillData,
): Promise<ApiResponse<AdminCourseSkill>> => {
  const response = await adminApi.patch<ApiResponse<AdminCourseSkill>>(
    `/admins/courses/skills/${skillId}/`,
    data,
  );

  return response.data;
};

// =========================================================
// Update Course Skill Status
// PATCH /admins/courses/skills/{skillId}/status/
// =========================================================

export const updateAdminCourseSkillStatus = async (
  skillId: number,
  isActive: boolean,
): Promise<ApiResponse<AdminCourseSkill>> => {
  const response = await adminApi.patch<ApiResponse<AdminCourseSkill>>(
    `/admins/courses/skills/${skillId}/status/`,
    {
      is_active: isActive,
    },
  );

  return response.data;
};

// =========================================================
// Soft Delete Course Skill
// DELETE /admins/courses/skills/{skillId}/delete/
// =========================================================

export const deleteAdminCourseSkill = async (
  skillId: number,
): Promise<ApiResponse<null>> => {
  const response = await adminApi.delete<ApiResponse<null>>(
    `/admins/courses/skills/${skillId}/delete/`,
  );

  return response.data;
};
