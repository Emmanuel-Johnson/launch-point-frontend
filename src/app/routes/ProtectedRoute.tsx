import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import type { UserRole } from "../../features/auth/slices/authSlice";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    const dashboardRoutes: Record<UserRole, string> = {
      student: "/student/dashboard",
      instructor: "/instructor/dashboard",
      admin: "/admin/dashboard",
    };

    return (
      <Navigate
        to={dashboardRoutes[user.role]}
        replace
      />
    );
  }

  return <Outlet />;
}
