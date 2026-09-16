import api from "../../../shared/api/axios";

// ====================
// Google Authentication
// ====================

export type GoogleLoginData = {
  id_token: string;
};

export type GoogleLoginResponse = {
  message: string;
  user: {
    id: number;
    full_name: string;
    email: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
};

export const googleLogin = async (
  data: GoogleLoginData,
): Promise<GoogleLoginResponse> => {
  const response = await api.post<GoogleLoginResponse>(
    "/auth/google/",
    data,
  );

  return response.data;
};

// ====================
// Signup
// ====================

export type SignupData = {
  full_name: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  message: string;
  user: {
    id: number;
    full_name: string;
    email: string;
  };
};

export const signup = async (
  data: SignupData,
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(
    "/auth/signup/",
    data,
  );

  return response.data;
};