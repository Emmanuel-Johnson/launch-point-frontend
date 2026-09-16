import api from "../../../shared/api/axios";

// ====================
// Admin Login
// ====================

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export const adminLogin = async (
  credentials: AdminLoginCredentials,
): Promise<AdminLoginResponse> => {
  const response = await api.post<AdminLoginResponse>(
    "/auth/admin/login/",
    credentials,
  );

  return response.data;
};
