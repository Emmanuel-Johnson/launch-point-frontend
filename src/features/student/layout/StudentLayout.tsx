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
    <div className="h-screen overflow-hidden bg-[#050505] text-white">
      {/* Sidebar */}
      <StudentSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main Area */}
      <div
        className={`flex h-screen flex-col transition-[margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        {/* Header */}
        <StudentHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* Page Content */}
        <main className="student-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div
            key={location.pathname}
            className="animate-page-enter px-8 pb-8 pt-28"
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
