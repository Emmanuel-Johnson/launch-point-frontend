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

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup/", data);

  return response.data;
};

export type VerifyEmailData = {
  email: string;
  code: string;
};

export type VerifyEmailResponse = {
  message: string;
};

export const verifyEmail = async (
  data: VerifyEmailData,
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(
    "/auth/verify-email/",
    data,
  );

  return response.data;
};

export type ResendVerificationCodeData = {
  email: string;
};

export type ResendVerificationCodeResponse = {
  message: string;
};

export const resendVerificationCode = async (
  data: ResendVerificationCodeData,
): Promise<ResendVerificationCodeResponse> => {
  const response = await api.post<ResendVerificationCodeResponse>(
    "/auth/resend-verification-code/",
    data,
  );

  return response.data;
};
