import ThemeContext from "@/context/ThemeContext";
import { useContext, useState } from "react";
import BiodataList from "./BiodataList";
import SidebarFilters from "./SidebarFilters";

const AppSidebar = () => {
  const [filters, setFilters] = useState({
    gender: "Male",
    ageRange: [18, 35],
    heightRange: [0, 190],
    permanentDivision: "",
    biodataId: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const { isDarkMode } = useContext(ThemeContext);

  // This function handles filter changes from SidebarFilters
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-800 text-gray-200" : "bg-gray-50 text-gray-900"
        }`}
    >
      <div className="flex flex-col lg:flex-row py-24 px-4 lg:px-12">
        <div className="w-full lg:w-[25%] px-4 border-r mb-6 lg:mb-0">
          {/* Sidebar */}
          <div
            className={`p-6 rounded-lg border shadow ${isDarkMode
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-100 border-gray-300"
              }`}
          >
            <SidebarFilters onFiltersChange={handleFiltersChange} />
          </div>
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