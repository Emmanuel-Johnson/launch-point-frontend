import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const PublicRoute = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    switch (user.role) {
      case "student":
        return <Navigate to="/student/dashboard" replace />;

      case "instructor":
        return <Navigate to="/instructor/dashboard" replace />;

      case "admin":
        return <Navigate to="/admin/dashboard" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
