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

// ====================
// Verify Email
// ====================

export type VerifyEmailData = {
  email: string;
  otp: string;
};

export type VerifyEmailResponse = {
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

export const verifyEmail = async (
  data: VerifyEmailData,
): Promise<VerifyEmailResponse> => {
  const response = await api.post<VerifyEmailResponse>(
    "/auth/verify-email/",
    data,
  );

  return response.data;
};

// ====================
// Resend Verification OTP
// ====================

export type ResendVerificationOTPData = {
  email: string;
};

export type ResendVerificationOTPResponse = {
  message: string;
};

export const resendVerificationOTP = async (
  data: ResendVerificationOTPData,
): Promise<ResendVerificationOTPResponse> => {
  const response = await api.post<ResendVerificationOTPResponse>(
    "/auth/resend-verification-otp/",
    data,
  );

  return response.data;
};