import axiosInstance from "../../../shared/api/axios";

export interface SwitchRoleResponse {
  message: string;
  user: {
    id: number;
    email: string;
    full_name: string;
    profile_image: string | null;
    role: "student" | "instructor" | "admin";
  };
}

export const switchToStudent = async (): Promise<SwitchRoleResponse> => {
  const response = await axiosInstance.post<SwitchRoleResponse>(
    "/instructors/switch-to-student/",
  );

  return response.data;
};
