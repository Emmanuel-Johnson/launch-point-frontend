import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { persistor, store } from "../../app/store/store";
import { clearCredentials as clearAuthState } from "../../features/auth/slices/authSlice";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// ============================================================================
// REQUEST INTERCEPTOR
// ============================================================================

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ============================================================================
// TOKEN REFRESH
// ============================================================================

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

// ============================================================================
// PROCESS QUEUED REQUESTS
// ============================================================================

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// ============================================================================
// CLEAR AUTHENTICATION CREDENTIALS
// ============================================================================

const clearAllCredentials = async () => {
  // Remove JWT tokens
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // Clear Redux authentication state
  store.dispatch(clearAuthState());

  // Clear persisted Redux state
  await persistor.purge();
};

// ============================================================================
// RESPONSE INTERCEPTOR
// ============================================================================

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    // ------------------------------------------------------------------------
    // Only handle 401 responses
    // ------------------------------------------------------------------------

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // ------------------------------------------------------------------------
    // Don't refresh token for authentication endpoints
    // ------------------------------------------------------------------------

    if (
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/signup/") ||
      originalRequest.url?.includes("/auth/google/") ||
      originalRequest.url?.includes("/auth/forgot-password/")
    ) {
      return Promise.reject(error);
    }

    // ------------------------------------------------------------------------
    // Don't refresh the refresh-token request itself
    // ------------------------------------------------------------------------

    if (originalRequest.url?.includes("/token/refresh/")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // ------------------------------------------------------------------------
    // If another request is already refreshing,
    // wait for that refresh to finish
    // ------------------------------------------------------------------------

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalRequest));
          },

          reject,
        });
      });
    }

    isRefreshing = true;

    const refreshToken = localStorage.getItem("refresh");

    // ------------------------------------------------------------------------
    // No refresh token → logout
    // ------------------------------------------------------------------------

    if (!refreshToken) {
      isRefreshing = false;

      await clearAllCredentials();

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        },
      );

      // Get the new access token
      const newAccessToken = response.data.access;

      if (!newAccessToken) {
        throw new Error("Refresh response did not contain an access token");
      }

      // Save only the new access token
      localStorage.setItem("access", newAccessToken);

      // Keep the existing refresh token unchanged

      // Resolve all queued requests
      processQueue(null, newAccessToken);

      // Retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // Reject all waiting requests
      processQueue(refreshError);

      // Clear all authentication credentials
      await clearAllCredentials();

      // Redirect to login
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
