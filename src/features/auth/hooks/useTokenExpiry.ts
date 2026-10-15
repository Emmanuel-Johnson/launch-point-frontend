import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { persistor, store } from "../../../app/store/store";
import { clearCredentials } from "../slices/authSlice";

interface JwtPayload {
  exp: number;
}

export function useTokenExpiry(isAuthenticated: boolean) {
  useEffect(() => {
    if (!isAuthenticated) return;

    let timer: number | undefined;
    let isLoggingOut = false;

    const logout = async () => {
      if (isLoggingOut) return;
      isLoggingOut = true;

      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      store.dispatch(clearCredentials());
      await persistor.purge();

      window.location.replace("/login");
    };

    const scheduleLogout = () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        void logout();
        return;
      }

      try {
        const { exp } = jwtDecode<JwtPayload>(refreshToken);

        if (typeof exp !== "number") {
          void logout();
          return;
        }

        const remainingMs = exp * 1000 - Date.now();

        console.log(
          "Refresh token expires at:",
          new Date(exp * 1000).toLocaleString(),
        );

        console.log(
          "Time remaining (seconds):",
          Math.max(0, Math.ceil(remainingMs / 1000)),
        );

        if (remainingMs <= 0) {
          void logout();
          return;
        }

        timer = window.setTimeout(() => {
          // Recheck the actual expiry instead of assuming
          // the browser timer fired at the exact time.
          scheduleLogout();
        }, remainingMs);
      } catch {
        void logout();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleLogout();
      }
    };

    scheduleLogout();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isAuthenticated]);
}
