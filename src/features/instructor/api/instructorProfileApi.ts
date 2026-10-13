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

export interface UpdateInstructorProfileData {
  full_name: string;
  occupation: string;
  professional_bio: string;
  education: string;
  location: string;
  years_of_experience: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  profile_image?: File | null;
  remove_profile_image?: boolean;
  categories?: number[];
}

export const getInstructorProfile = async (): Promise<InstructorProfile> => {
  const response = await axiosInstance.get<InstructorProfile>(
    "/instructors/profile/",
  );

  return response.data;
};

export const updateInstructorProfile = async (
  data: UpdateInstructorProfileData,
): Promise<InstructorProfile> => {
  const formData = new FormData();

  formData.append("full_name", data.full_name);
  formData.append("occupation", data.occupation);
  formData.append("professional_bio", data.professional_bio);
  formData.append("education", data.education);
  formData.append("location", data.location);
  formData.append("years_of_experience", data.years_of_experience);
  formData.append("linkedin_url", data.linkedin_url);
  formData.append("github_url", data.github_url);
  formData.append("portfolio_url", data.portfolio_url);

  if (data.profile_image) {
    formData.append("profile_image", data.profile_image);
  }

  if (data.remove_profile_image) {
    formData.append("remove_profile_image", "true");
  }

  data.categories?.forEach((categoryId) => {
    formData.append("categories", String(categoryId));
  });

  const response = await axiosInstance.patch<InstructorProfile>(
    "/instructors/profile/",
    formData,
  );

  return response.data;
};
