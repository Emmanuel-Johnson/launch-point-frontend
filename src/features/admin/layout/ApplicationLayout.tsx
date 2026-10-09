import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

/*
  ADMIN SHELL — green & black, premium/restrained
  -----------------------------------------------------------------
  - scrollbar-gutter: stable  → gutter is always reserved, so switching
    between a tall page and a short one never shifts content sideways.
  - max-w-[1600px] + mx-auto   → content sits in an intentional centered
    column on wide screens instead of stretching to the edges.
  - sticky top fade            → content dissolves softly under the header
    on scroll (occupies no layout space, so nothing moves).
*/

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const location = useLocation();

  const isApplicationsRoute = location.pathname.startsWith(
    "/admin/applications",
  );

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const mainElement = document.querySelector(".admin-scrollbar");

    if (mainElement) {
      mainElement.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  }, [location.pathname]);

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* SIDEBAR */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      {/* MAIN APPLICATION AREA */}
      <div
        className={`relative h-screen transition-[margin-left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        {/* HEADER */}
        <AdminHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* CONTENT */}
        <main className="admin-scrollbar absolute inset-x-0 bottom-0 top-20 overflow-y-auto bg-black [scrollbar-gutter:stable]">
          {/* Soft fade so content slips under the header on scroll.
              -mb-6 cancels the 6px it adds, so it takes no layout space. */}
          <div
            aria-hidden="true"
            className="pointer-events-none sticky top-0 z-10 -mb-6 h-6 bg-gradient-to-b from-black via-black/70 to-transparent"
          />

          <div
            key={location.pathname}
            className={`mx-auto min-h-full w-full max-w-[1600px] bg-black px-8 pb-10 pt-8 ${
              isApplicationsRoute ? "" : "animate-page-enter"
            }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
