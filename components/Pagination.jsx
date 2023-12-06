import React from "react";

const Pagination = ({ handleNext, handlePrevious, currentPage,postCount }) => {

  return (
    <div className="my-10 flex items-center justify-between gap-10">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="bg-primary-600 hover:bg-primary-500 rounded-md cursor-pointer text-white py-2 px-2 w-[150px]">Previous</button>
      <button
        disabled={currentPage === postCount.length/2}
        onClick={handleNext}
        className="bg-primary-600 hover:bg-primary-500 rounded-md cursor-pointer text-white py-2 px-2 w-[150px]">Next</button>
    </div>
  );
};

export default Pagination;
