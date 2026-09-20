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
    <div className="min-h-screen bg-[#07111f] text-white">
      {/* Instructor Sidebar */}
      <InstructorSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main Application Area */}
      <div
        className={`min-h-screen transition-[margin-left] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isSidebarCollapsed ? "ml-20" : "ml-[280px]"
        }`}
      >
        {/* Instructor Header */}
        <InstructorHeader isSidebarCollapsed={isSidebarCollapsed} />

        {/* Page Content */}
        <main className="min-h-screen bg-[#07111f] px-6 pb-10 pt-28 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InstructorLayout;
