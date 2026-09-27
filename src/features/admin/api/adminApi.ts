import adminApi from "../../../shared/api/adminAxios";

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
  tokens: {
    access: string;
    refresh: string;
  };
}

export const adminLogin = async (
  credentials: AdminLoginCredentials,
): Promise<AdminLoginResponse> => {
  const response = await adminApi.post<AdminLoginResponse>(
    "/auth/admin/login/",
    credentials,
  );

  return response.data;
};

// =========================================================
// Admin Logout
// =========================================================

export interface AdminLogoutResponse {
  message: string;
}

export const logoutAdmin = async (
  refreshToken: string,
): Promise<AdminLogoutResponse> => {
  const response = await adminApi.post<AdminLogoutResponse>(
    "/auth/admin/logout/",
    {
      admin_refresh: refreshToken,
    },
  );

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
  const response = await adminApi.get<AdminStudent[]>("/admins/students/");

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
  const response = await adminApi.get<AdminStudentDetail>(
    `/admins/students/${studentId}`,
  );

  return response.data;
};
