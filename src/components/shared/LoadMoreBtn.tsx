import React, { useState } from "react";

interface LoadMoreBtnProps {
  loadMore: () => void; // Function to load more data
  isFetching: boolean;
  className?: string;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  className,
  loadMore,
  isFetching,
}) => {
  return (
    <button
      onClick={loadMore}
      // className="mt-5 rounded-[.25rem] font-medium text-[.875rem] px-[.75rem] py-[.625rem] text-primary bg-pale-blue2"
      className={` ${className} btn bg-lexblue text-white mt-5`}
    >
      {isFetching ? "Loading..." : "Load more"}{" "}
    </button>
  );
};

export default LoadMoreBtn;
