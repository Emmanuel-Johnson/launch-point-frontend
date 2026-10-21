import adminApi from "../../../../../shared/api/axios";

/** Instructor record returned by GET /api/admins/instructors/. */
export interface AdminInstructor {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  occupation: string | null;
  location: string | null;
  years_of_experience: string | null;
  categories: string[];
  became_instructor_at?: string | null;
  is_active: boolean;
}

/** Fetch all instructors for the admin instructor list page. */
export const getAdminInstructors = async (): Promise<AdminInstructor[]> => {
  const response = await adminApi.get<AdminInstructor[]>(
    "/admins/instructors/",
  );
  return response.data;
};

/** Full instructor profile returned by GET /api/admins/instructors/:id/. */
export interface AdminInstructorDetail extends AdminInstructor {
  professional_bio: string | null;
  education: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  created_at: string;
  updated_at: string;
}

/** Fetch one instructor's full profile for the admin detail page. */
export const getAdminInstructorDetail = async (
  instructorId: number,
): Promise<AdminInstructorDetail> => {
  const response = await adminApi.get<AdminInstructorDetail>(
    `/admins/instructors/${instructorId}/`,
  );
  return response.data;
};

/** Response returned by the instructor status update endpoint. */
export interface AdminInstructorStatusResponse {
  id: number;
  is_active: boolean;
  message?: string;
}

/** Activate or deactivate an instructor. */
export const updateAdminInstructorStatus = async (
  instructorId: number,
  isActive: boolean,
): Promise<AdminInstructorStatusResponse> => {
  const response = await adminApi.patch<AdminInstructorStatusResponse>(
    `/admins/instructors/${instructorId}/status/`,
    { is_active: isActive },
  );
  return response.data;
};
