import api from "../../../shared/api/adminAxios";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface InstructorApplication {
  id: number;
  full_name: string;
  email: string;
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
