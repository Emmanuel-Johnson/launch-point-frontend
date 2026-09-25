import api from "../../../shared/api/axios";

import type { StudentProfile } from "../types/studentProfile";

export const getStudentProfile = async (): Promise<StudentProfile> => {
  const response = await api.get<StudentProfile>("/students/profile/");

  return response.data;
};

interface UpdateStudentProfileData {
  full_name?: string;
  bio?: string;
  location?: string;
  education?: string;
  occupation?: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  profile_image?: File | null;
  remove_profile_image?: boolean;
}

export const updateStudentProfile = async (
  data: UpdateStudentProfileData,
): Promise<StudentProfile> => {
  const formData = new FormData();

  if (data.full_name !== undefined) {
    formData.append("full_name", data.full_name);
  }

  if (data.bio !== undefined) {
    formData.append("bio", data.bio);
  }

  if (data.location !== undefined) {
    formData.append("location", data.location);
  }

  if (data.education !== undefined) {
    formData.append("education", data.education);
  }

  if (data.occupation !== undefined) {
    formData.append("occupation", data.occupation);
  }

  if (data.github_url !== undefined) {
    formData.append("github_url", data.github_url);
  }

  if (data.linkedin_url !== undefined) {
    formData.append("linkedin_url", data.linkedin_url);
  }

  if (data.portfolio_url !== undefined) {
    formData.append("portfolio_url", data.portfolio_url);
  }

  if (data.profile_image) {
    formData.append("profile_image", data.profile_image);
  }

  if (data.remove_profile_image !== undefined) {
    formData.append("remove_profile_image", String(data.remove_profile_image));
  }

  const response = await api.patch<StudentProfile>(
    "/students/profile/",
    formData,
  );

  return response.data;
};
