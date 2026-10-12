import axiosInstance from "../../../shared/api/axios";

export interface InstructorProfile {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  occupation: string;
  professional_bio: string;
  education: string;
  location: string;
  years_of_experience: string;
  categories: string[];
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  became_instructor_at: string | null;
  created_at: string;
  updated_at: string;
}

export const getInstructorProfile = async (): Promise<InstructorProfile> => {
  const response = await axiosInstance.get<InstructorProfile>(
    "/instructors/profile/",
  );

  return response.data;
};
