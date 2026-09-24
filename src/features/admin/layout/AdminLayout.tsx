import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      {/* =====================================================
          MAIN APPLICATION AREA
      ====================================================== */}
      <div
        className={`relative h-screen transition-[margin-left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <AdminHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* =====================================================
            CONTENT
            Scrollbar starts below the 80px header.
        ====================================================== */}
        <main className="admin-scrollbar absolute inset-x-0 bottom-0 top-20 overflow-y-auto bg-black">
          <div
            key={location.pathname}
            className="animate-page-enter min-h-full bg-black px-8 pb-10 pt-8"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
