import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add access token to every request
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Handle expired access token
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (
  error: unknown,
  token: string | null = null,
) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    // Only handle 401 responses
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Don't refresh token for authentication endpoints
    if (
      originalRequest.url?.includes("/auth/login/") ||
      originalRequest.url?.includes("/auth/signup/") ||
      originalRequest.url?.includes("/auth/google/")
    ) {
      return Promise.reject(error);
    }

    // Don't refresh the refresh-token request itself
    if (originalRequest.url?.includes("/token/refresh/")) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // If another request is already refreshing,
    // wait for that refresh to finish
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

    // No refresh token → logout
    if (!refreshToken) {
      isRefreshing = false;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {
      // Use normal axios here, NOT api.
      // This prevents the refresh request from
      // triggering this response interceptor.
      const response = await axios.post(
        "http://localhost:8000/api/auth/token/refresh/",
        {
          refresh: refreshToken,
        },
      );

      // Refresh-token rotation returns both tokens
      const newAccessToken = response.data.access;
      const newRefreshToken = response.data.refresh;

      // Save both new tokens
      localStorage.setItem("access", newAccessToken);
      localStorage.setItem("refresh", newRefreshToken);

      // Resolve all requests waiting for the refresh
      processQueue(null, newAccessToken);

      // Retry the original request
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      // Reject all waiting requests
      processQueue(refreshError);

      // Clear authentication
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      // Send user to login
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;