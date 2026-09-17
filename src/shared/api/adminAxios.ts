import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// =========================================================
// Add admin access token to every request
// =========================================================

adminApi.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("admin_access");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// =========================================================
// Handle expired admin access token
// =========================================================

let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

// =========================================================
// Process requests waiting for token refresh
// =========================================================

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

// =========================================================
// Response interceptor
// =========================================================

adminApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // -------------------------------------------------------
    // Only handle 401 responses
    // -------------------------------------------------------

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // -------------------------------------------------------
    // Don't refresh token for admin login
    // -------------------------------------------------------

    if (originalRequest.url?.includes("/auth/admin/login/")) {
      return Promise.reject(error);
    }

    // -------------------------------------------------------
    // Don't refresh token for admin logout
    // -------------------------------------------------------

    if (originalRequest.url?.includes("/auth/admin/logout/")) {
      return Promise.reject(error);
    }

    // -------------------------------------------------------
    // Don't refresh the refresh-token request itself
    // -------------------------------------------------------

    if (originalRequest.url?.includes("/auth/token/refresh/")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // -------------------------------------------------------
    // If another request is already refreshing,
    // wait for that refresh to finish
    // -------------------------------------------------------

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(adminApi(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    // -------------------------------------------------------
    // Get admin refresh token
    // -------------------------------------------------------

    const refreshToken = localStorage.getItem("admin_refresh");

    // -------------------------------------------------------
    // No refresh token → admin logout
    // -------------------------------------------------------

    if (!refreshToken) {
      isRefreshing = false;

      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");

      window.location.href = "/admin/login";

      return Promise.reject(error);
    }

    try {
      // -----------------------------------------------------
      // Refresh admin token
      //
      // Use normal axios instead of adminApi so this request
      // does not trigger the admin response interceptor.
      // -----------------------------------------------------

      const response = await axios.post(
        "http://localhost:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        },
      );

      // -----------------------------------------------------
      // Refresh-token rotation returns both tokens
      // -----------------------------------------------------

      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh;

      // -----------------------------------------------------
      // Save new admin tokens
      // -----------------------------------------------------

      localStorage.setItem("admin_access", newAccessToken);

      localStorage.setItem("admin_refresh", newRefreshToken);

      // -----------------------------------------------------
      // Resolve all requests waiting for refresh
      // -----------------------------------------------------

      processQueue(null, newAccessToken);

      // -----------------------------------------------------
      // Retry original request
      // -----------------------------------------------------

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return adminApi(originalRequest);
    } catch (refreshError) {
      // -----------------------------------------------------
      // Reject all waiting requests
      // -----------------------------------------------------

      processQueue(refreshError);

      // -----------------------------------------------------
      // Clear admin authentication
      // -----------------------------------------------------

      localStorage.removeItem("admin_access");
      localStorage.removeItem("admin_refresh");

      // -----------------------------------------------------
      // Redirect to admin login
      // -----------------------------------------------------

      window.location.href = "/admin/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default adminApi;
