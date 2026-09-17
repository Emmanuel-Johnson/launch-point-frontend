import { Navigate, Outlet } from "react-router-dom";

const AdminPublicRoute = () => {
  const adminAccessToken = localStorage.getItem("admin_access");

  if (adminAccessToken) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
};

export default AdminPublicRoute;
