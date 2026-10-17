import axiosInstance from "../../../shared/api/axios";

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface ChangePasswordResponse {
  message: string;
}

export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post<ChangePasswordResponse>(
    "/auth/change-password/",
    data,
  );

  return response.data;
};
