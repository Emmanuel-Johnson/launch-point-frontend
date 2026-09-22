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
    <div className="h-screen overflow-hidden bg-[#07100a] text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <AdminSidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />

      {/* =====================================================
          MAIN APPLICATION AREA
      ====================================================== */}
      <div
        className={`flex h-screen flex-col transition-[margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        {/* =====================================================
            HEADER
        ====================================================== */}
        <AdminHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* =====================================================
            CONTENT
        ====================================================== */}
        <main
          className="
            admin-scrollbar
            min-h-0
            flex-1
            overflow-y-auto
            bg-[#07100a]
          "
        >
          <div
            key={location.pathname}
            className="
              animate-page-enter
              min-h-full
              bg-[#07100a]
              px-8
              pb-10
              pt-28
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
