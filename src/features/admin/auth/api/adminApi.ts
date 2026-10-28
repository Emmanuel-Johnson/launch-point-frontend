import api from "../../../../shared/api/axios";

// =========================================================
// Admin Login
// =========================================================

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  message: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: "admin";
  };
  access: string; // top-level; refresh is set as an HttpOnly cookie
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

// =========================================================
// Admin Logout  (refresh token is the HttpOnly cookie — no body needed)
// =========================================================

export interface AdminLogoutResponse {
  message: string;
}

export const logoutAdmin = async (): Promise<AdminLogoutResponse> => {
  const response = await api.post<AdminLogoutResponse>("/auth/admin/logout/");

  return response.data;
};

// =========================================================
// Admin Student List
// =========================================================

export interface AdminStudent {
  id: number;
  full_name: string;
  email: string;
  profile_image: string | null;
  date_joined: string;
  is_active: boolean;
}

export const getAdminStudents = async (): Promise<AdminStudent[]> => {
  const response = await api.get<AdminStudent[]>("/admins/students/");

  return response.data;
};

export interface AdminStudentDetail {
  id: number;
  full_name: string;
  email: string;
  role: string;
  profile_image: string | null;
  bio: string;
  location: string;
  education: string;
  occupation: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  email_verified: boolean;
  is_active: boolean;
  date_joined: string;
  updated_at: string;
  profile_created_at: string;
  profile_updated_at: string;
}

export const getAdminStudent = async (
  studentId: number,
): Promise<AdminStudentDetail> => {
  const response = await api.get<AdminStudentDetail>(
    `/admins/students/${studentId}`,
  );

  return response.data;
};

export interface UpdateStudentStatusResponse {
  is_active: boolean;
  message: string;
}

export const updateStudentStatus = async (
  studentId: number,
  isActive: boolean,
): Promise<UpdateStudentStatusResponse> => {
  const response = await api.patch<UpdateStudentStatusResponse>(
    `/admins/students/${studentId}/status/`,
    {
      is_active: isActive,
    },
  );

  return response.data;
};
