import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/store/hooks";

export default function PublicRoute() {
  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (isAuthenticated && user) {
    const dashboardRoutes = {
      student: "/student/dashboard",
      instructor: "/instructor/dashboard",
      admin: "/admin/dashboard",
    } as const;

    return (
      <Navigate
        to={dashboardRoutes[user.role]}
        replace
      />
    );
  }

  return <Outlet />;
}
