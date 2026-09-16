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
  const response = await api.post<GoogleLoginResponse>("/auth/google/", data);

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

export const signup = async (data: SignupData): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup/", data);

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

// ====================
// Login
// ====================

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
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

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login/", data);

  return response.data;
};

// ====================
// Forgot Password
// ====================

export type ForgotPasswordData = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
};

export const forgotPassword = async (
  data: ForgotPasswordData,
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password/",
    data,
  );

  return response.data;
};

// ====================
// Verify Password Reset OTP
// ====================

export type VerifyPasswordResetOTPData = {
  email: string;
  otp: string;
};

export type VerifyPasswordResetOTPResponse = {
  message: string;
  reset_token: string;
};

export const verifyPasswordResetOTP = async (
  data: VerifyPasswordResetOTPData,
): Promise<VerifyPasswordResetOTPResponse> => {
  const response = await api.post<VerifyPasswordResetOTPResponse>(
    "/auth/verify-password-reset-otp/",
    data,
  );

  return response.data;
};

// ====================
// Resend Password Reset OTP
// ====================

export type ResendPasswordResetOTPData = {
  email: string;
};

export type ResendPasswordResetOTPResponse = {
  message: string;
};

export const resendPasswordResetOTP = async (
  data: ResendPasswordResetOTPData,
): Promise<ResendPasswordResetOTPResponse> => {
  const response = await api.post<ResendPasswordResetOTPResponse>(
    "/auth/resend-password-reset-otp/",
    data,
  );

  return response.data;
};

// ====================
// Reset Password
// ====================

export type ResetPasswordData = {
  reset_token: string;
  new_password: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export const resetPassword = async (
  data: ResetPasswordData,
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/auth/reset-password/",
    data,
  );

  return response.data;
};
