import Sidebar from "@/Page/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="relative min-h-screen max-w-screen bg-gradient-to-b from-gray-100 via-white to-gray-50 lg:flex">
      {/* Sidebar - static on desktop, toggle on mobile */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <div className="p-5 lg:ml-64">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;