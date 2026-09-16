import api from "../../../shared/api/axios";

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