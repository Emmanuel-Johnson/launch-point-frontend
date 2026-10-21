import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const NonAdminRoute = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default NonAdminRoute;
