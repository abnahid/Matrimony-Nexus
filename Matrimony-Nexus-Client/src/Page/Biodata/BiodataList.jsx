import useBiodatas from "./../../hooks/useBiodatas";
import BiodataCard from "./BiodataCard";
import { PaginationBar } from "./Filter/PaginationBar";

const BiodataList = ({ filters, currentPage, setCurrentPage }) => {
  const itemsPerPage = 20;

  const { biodatas, total, loading } = useBiodatas(
    currentPage,
    itemsPerPage,
    filters
  );

  const totalPages = Math.ceil(total / itemsPerPage);

  if (loading) {
    return <div>Loading biodatas...</div>;
  }

  if (!biodatas || biodatas.length === 0) {
    return <div>No biodatas found.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {biodatas.map((biodata) => (
          <BiodataCard key={biodata._id} biodata={biodata} />
        ))}
      </div>
      <PaginationBar
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default BiodataList;
