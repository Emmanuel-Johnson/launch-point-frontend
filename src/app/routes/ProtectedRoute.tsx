import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  allowedRoles: ("student" | "instructor" | "admin")[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAppSelector((state) => state.auth);

  // User is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User does not have the required role
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    if (user.role === "instructor") {
      return <Navigate to="/instructor/dashboard" replace />;
    }

    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // User is authenticated and has permission
  return <Outlet />;
};

export default ProtectedRoute;
