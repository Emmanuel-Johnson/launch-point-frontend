import api from "../../../shared/api/axios";

export interface InstructorApplicationCategory {
  id: number;
  name: string;
}

export interface InstructorApplicationUser {
  full_name: string;
  email: string;
  profile_image: string | null;
  location: string | null;
  education: string | null;
  occupation: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  portfolio_url: string | null;
}

export interface InstructorApplicationFormData {
  user: InstructorApplicationUser;
  categories: InstructorApplicationCategory[];
}

export const getInstructorApplicationFormData =
  async (): Promise<InstructorApplicationFormData> => {
    const response = await api.get<InstructorApplicationFormData>(
      "/instructors/application/",
    );

    return response.data;
  };

export interface InstructorApplicationResponse {
  message: string;
  id: number;
  status: string;
  submitted_at: string;
}

export const createInstructorApplication = async (
  formData: FormData,
): Promise<InstructorApplicationResponse> => {
  const response = await api.post<InstructorApplicationResponse>(
    "/instructors/application/",
    formData,
  );

  return response.data;
};

export interface InstructorApplication {
  id: number;
  categories: string[];
  submitted_at: string;
  status: "pending" | "approved" | "rejected";
}

export const getInstructorApplications = async (): Promise<
  InstructorApplication[]
> => {
  const response = await api.get<InstructorApplication[]>(
    "/instructors/applications/",
  );

  return response.data;
};

export interface InstructorApplicationDetail {
  id: number;
  status: "pending" | "approved" | "rejected";
  full_name: string;
  email: string;
  phone_number: string;
  location: string;
  profile_image: string | null;
  occupation: string;
  education: string;
  years_of_experience: string;
  categories_to_teach: string[];
  professional_bio: string;
  motivation: string;
  portfolio_url: string;
  linkedin_url: string;
  github_url: string;
  submitted_at: string;
  resume_url: string | null;
  resume_name: string | null;
  supporting_files: {
    id: number;
    name: string;
    url: string;
  }[];
  admin_message: string | null;
}

export const getInstructorApplication = async (
  applicationId: number,
): Promise<InstructorApplicationDetail> => {
  const response = await api.get<InstructorApplicationDetail>(
    `/instructors/applications/${applicationId}/`,
  );

  return response.data;
};
