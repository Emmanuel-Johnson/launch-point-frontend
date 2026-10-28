import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { persistor, store } from "../../app/store/store";
import {
  clearCredentials,
  setAccessToken,
} from "../../features/auth/slices/authSlice";

const API_BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

type RetriableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshResponse = {
  access: string;
};

type FailedQueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

// -----------------------------------------------------------------------------
// REQUEST INTERCEPTOR
// -----------------------------------------------------------------------------

api.interceptors.request.use(
  (config) => {
    // auth may be undefined in the inferred persisted Redux state.
    const accessToken = store.getState().auth?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// -----------------------------------------------------------------------------
// TOKEN REFRESH QUEUE
// -----------------------------------------------------------------------------

let isRefreshing = false;

let failedQueue: FailedQueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    } else {
      reject(new Error("Token refresh failed."));
    }
  });

  failedQueue = [];
}

// -----------------------------------------------------------------------------
// SESSION CLEANUP
// -----------------------------------------------------------------------------

async function clearSession() {
  store.dispatch(clearCredentials());
  await persistor.purge();
}

// -----------------------------------------------------------------------------
// AUTH ENDPOINT DETECTION
// -----------------------------------------------------------------------------

function isAuthEndpoint(url = ""): boolean {
  const authEndpoints = [
    "/auth/login/",
    "/auth/signup/",
    "/auth/google/",
    "/auth/verify-email/",
    "/auth/forgot-password/",
    "/auth/verify-password-reset-otp/",
    "/auth/reset-password/",
    "/auth/resend-verification-otp/",
    "/auth/resend-password-reset-otp/",
    "/auth/token/refresh/",
    "/auth/logout/",
    "/auth/admin/login/",
    "/auth/admin/logout/",
  ];

  return authEndpoints.some((endpoint) => url.includes(endpoint));
}

// -----------------------------------------------------------------------------
// RESPONSE INTERCEPTOR
// -----------------------------------------------------------------------------

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableRequest | undefined;

    // Handle forbidden instructor access.
    if (error.response?.status === 403) {
      const data = error.response.data as { code?: string } | undefined;

      if (data?.code === "instructor_access_denied") {
        await clearSession();

        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
      }

      return Promise.reject(error);
    }

    // Only attempt refresh for eligible 401 responses.
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isAuthEndpoint(originalRequest.url)
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If another request is already refreshing, wait for its result.
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      // The browser sends the HttpOnly refresh cookie automatically,
      // provided the cookie's scope and browser policies allow it.
      const response = await api.post<RefreshResponse>("/auth/token/refresh/");

      const newAccessToken = response.data.access;

      if (!newAccessToken) {
        throw new Error(
          "Token refresh response did not contain an access token.",
        );
      }

      // Save the new access token in Redux.
      store.dispatch(setAccessToken(newAccessToken));

      // Retry requests waiting in the queue.
      processQueue(null, newAccessToken);

      // Retry the original request.
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      if (axios.isAxiosError(refreshError)) {
        console.error("Token refresh failed:", {
          status: refreshError.response?.status,
          response: refreshError.response?.data,
          url: refreshError.config?.url,
        });
      } else {
        console.error("Token refresh failed:", refreshError);
      }

      await clearSession();

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
