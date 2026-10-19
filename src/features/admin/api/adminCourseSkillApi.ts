import adminApi from "../../../shared/api/axios";

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

interface CourseSkillApiResponse {
  success: boolean;
  message: string;
  data: AdminCourseSkill;
}

interface CourseSkillsApiResponse {
  success: boolean;
  message: string;
  data: AdminCourseSkill[];
}

export interface CreateAdminCourseSkillData {
  name: string;
  description: string;
}

export interface UpdateAdminCourseSkillData {
  name?: string;
  description?: string;
}

export interface UpdateAdminCourseSkillStatusResponse {
  success: boolean;
  message: string;
  data: AdminCourseSkill;
}

// =========================================================
// Get All Course Skills
// GET /admins/courses/skills/
// =========================================================

export const getAdminCourseSkills = async (): Promise<AdminCourseSkill[]> => {
  const response = await adminApi.get<CourseSkillsApiResponse>(
    "/admins/courses/skills/",
  );

  return response.data.data;
};

// =========================================================
// Get Course Skill Detail
// Note: Your current backend does not define a GET detail endpoint.
// =========================================================

// =========================================================
// Create Course Skill
// POST /admins/courses/skills/
// =========================================================

export const createAdminCourseSkill = async (
  data: CreateAdminCourseSkillData,
): Promise<AdminCourseSkill> => {
  const response = await adminApi.post<CourseSkillApiResponse>(
    "/admins/courses/skills/",
    data,
  );

  return response.data.data;
};

// =========================================================
// Update Course Skill
// PATCH /admins/courses/skills/{skillId}/
// =========================================================

export const updateAdminCourseSkill = async (
  skillId: number,
  data: UpdateAdminCourseSkillData,
): Promise<AdminCourseSkill> => {
  const response = await adminApi.patch<CourseSkillApiResponse>(
    `/admins/courses/skills/${skillId}/`,
    data,
  );

  return response.data.data;
};

// =========================================================
// Update Course Skill Status
// PATCH /admins/courses/skills/{skillId}/status/
// =========================================================

export const updateAdminCourseSkillStatus = async (
  skillId: number,
  isActive: boolean,
): Promise<UpdateAdminCourseSkillStatusResponse> => {
  const response = await adminApi.patch<CourseSkillApiResponse>(
    `/admins/courses/skills/${skillId}/status/`,
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
