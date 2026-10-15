import axiosInstance from "../../../shared/api/axios";

export interface SwitchToInstructorResponse {
  message: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    profile_image: string | null;
    role: "student" | "instructor" | "admin";
  };
}

export const switchToInstructor =
  async (): Promise<SwitchToInstructorResponse> => {
    const response = await axiosInstance.post<SwitchToInstructorResponse>(
      "/students/switch-to-instructor/",
    );

    return response.data;
  };
