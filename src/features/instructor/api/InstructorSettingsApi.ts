import axiosInstance from "../../../shared/api/axios";

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

interface ChangePasswordResponse {
  message: string;
}

/**
 * Changes the authenticated user's password.
 *
 * Students and instructors share the same user account, so this calls the
 * existing backend endpoint rather than creating a separate instructor endpoint.
 */
export const changePassword = async (
  data: ChangePasswordRequest,
): Promise<ChangePasswordResponse> => {
  const response = await axiosInstance.post<ChangePasswordResponse>(
    "/auth/change-password/",
    data,
  );

  return response.data;
};
