import api from "../../../shared/api/adminAxios";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface InstructorApplication {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  occupation: string;
  years_of_experience: string;
  status: ApplicationStatus;
  submitted_at: string;
  categories: string[];
}

export const getAdminInstructorApplications = async (): Promise<
  InstructorApplication[]
> => {
  const response = await api.get<InstructorApplication[]>(
    "/admins/instructor-applications/",
  );

  return response.data;
};

export interface AdminInstructorApplicationDetail {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  phone_number: string;
  location: string;
  occupation: string;
  education: string;
  years_of_experience: string;
  professional_bio: string;
  motivation: string;
  categories: string[];
  portfolio_url: string;
  linkedin_url: string;
  github_url: string;
  submitted_at: string;
  status: ApplicationStatus;
  resume_name: string | null;
  resume_url: string | null;
  supporting_files: {
    id: number;
    name: string;
    url: string;
  }[];
  admin_message: string | null;
  reviewed_at: string | null;
}

export const getAdminInstructorApplicationDetail = async (
  applicationId: number,
): Promise<AdminInstructorApplicationDetail> => {
  const response = await api.get<AdminInstructorApplicationDetail>(
    `/admins/instructor-applications/${applicationId}/`,
  );

  return response.data;
};
