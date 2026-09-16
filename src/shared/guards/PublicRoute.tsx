import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const accessToken = localStorage.getItem("access");

  if (accessToken) {
    return <Navigate to="/student/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
