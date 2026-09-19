import { useState } from "react";
import { Outlet } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";

const StudentLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="h-screen overflow-hidden bg-[#050505] text-white">
      <StudentSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      <div
        className={`flex h-screen flex-col transition-[margin] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        <StudentHeader isSidebarCollapsed={isSidebarCollapsed} />

        <main className="student-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="px-8 pb-8 pt-28">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
