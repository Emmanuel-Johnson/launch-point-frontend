import { useState } from "react";
import { Outlet } from "react-router-dom";

import InstructorHeader from "../components/InstructorHeader";
import InstructorSidebar from "../components/InstructorSidebar";

const InstructorLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen overflow-hidden bg-black text-white">
      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <InstructorSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

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
        <InstructorHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* =====================================================
            CONTENT
            Scrollbar starts below the 80px header.
        ====================================================== */}
        <main className="instructor-page-scrollbar absolute inset-x-0 bottom-0 top-20 overflow-y-auto bg-black px-6 pb-10 pt-8 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
