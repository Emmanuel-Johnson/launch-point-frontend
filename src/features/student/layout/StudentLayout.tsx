import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";

const StudentLayout = () => {
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
      <StudentSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

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
        <div className="h-20 shrink-0">
          <StudentHeader isSidebarCollapsed={isSidebarCollapsed} />
        </div>

        {/* =====================================================
            CONTENT
            Scrollbar starts below the header.
        ====================================================== */}
        <main className="student-scrollbar min-h-0 flex-1 overflow-y-auto bg-black">
          <div
            key={location.pathname}
            className="animate-page-enter px-8 pb-10 pt-8"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
