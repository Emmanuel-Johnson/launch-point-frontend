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
