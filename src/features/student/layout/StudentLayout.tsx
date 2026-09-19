import { Outlet } from "react-router-dom";
import StudentHeader from "../components/StudentHeader";
import StudentSidebar from "../components/StudentSidebar";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <StudentSidebar />

      <div className="ml-64 min-h-screen">
        <StudentHeader />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
