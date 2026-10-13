import adminApi from "../../../shared/api/adminAxios";

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
}

export const getAdminInstructors = async (): Promise<AdminInstructor[]> => {
  const response = await adminApi.get<AdminInstructor[]>(
    "/admins/instructors/",
  );

  return response.data;
};
