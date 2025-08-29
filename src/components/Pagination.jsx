import { React } from "react";

const Pagination = ({ currentPageNo, setCurrentPageNo, totalPages }) => {
  const handlePrevPage = () => {
    if (currentPageNo > 1) {
      setCurrentPageNo(currentPageNo - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPageNo < totalPages) {
      setCurrentPageNo(currentPageNo + 1);
    }
  };

  return (
    <>
      <div className="join">
        <button
          className="join-item btn"
          onClick={handlePrevPage}
          disabled={currentPageNo <= 1}
        >
          «
        </button>
        <button className="join-item btn">{currentPageNo}</button>
        <button
          className="join-item btn"
          onClick={handleNextPage}
          disabled={currentPageNo >= totalPages}
        >
          »
        </button>
      </div>
    </>
  );
};

export default Pagination;
