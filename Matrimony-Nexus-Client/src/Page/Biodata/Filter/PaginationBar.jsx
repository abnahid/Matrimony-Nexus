import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ThemeContext from "@/context/ThemeContext";
import { useContext } from "react";

export function PaginationBar({ currentPage, totalPages, onPageChange }) {
  const { isDarkMode } = useContext(ThemeContext);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`${isDarkMode
                ? "text-gray-300 disabled:text-gray-600"
                : "text-gray-700 disabled:text-gray-400"
              }`}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => handlePageClick(page)}
                className={`${isDarkMode
                    ? page === currentPage
                      ? "text-blue-400 bg-gray-800"
                      : "text-gray-300 hover:text-blue-400"
                    : page === currentPage
                      ? "text-blue-500 bg-gray-200"
                      : "text-gray-700 hover:text-blue-500"
                  } px-3 py-1 rounded`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationEllipsis
            className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`${isDarkMode
                ? "text-gray-300 disabled:text-gray-600"
                : "text-gray-700 disabled:text-gray-400"
              }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}