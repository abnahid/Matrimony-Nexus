import { useState } from "react";
import BiodataList from "./BiodataList";
import SidebarFilters from "./SidebarFilters";

const AppSidebar = () => {
  const [filters, setFilters] = useState({
    gender: "Male",
    ageRange: [18, 35],
    heightRange: [140, 190],
    permanentDivision: "",
    biodataId: "",
  });

  const [currentPage, setCurrentPage] = useState(1);

  // This function handles filter changes from SidebarFilters
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col lg:flex-row py-24 px-4 lg:px-12">
        {/* Sidebar */}
        <div className="w-full lg:w-[25%] p-4 bg-gray-100 border-r mb-6 lg:mb-0">
          <SidebarFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-[75%] px-4">
          <BiodataList
            filters={filters}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
