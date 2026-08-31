import api from "../../../shared/axios";

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
  data: SignupData
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>(
    "/auth/signup/",
    data
  );

  return response.data;
};