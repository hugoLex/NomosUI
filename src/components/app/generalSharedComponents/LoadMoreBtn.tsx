import React, { useState } from "react";

interface LoadMoreBtnProps {
  loadMore: () => void; // Function to load more data
  isFetching: boolean;
}

export const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({
  loadMore,
  isFetching,
}) => {
  return (
    <button
      onClick={loadMore}
      className="mt-5 rounded-[.25rem] font-medium text-[.875rem] px-[.75rem] py-[.625rem] text-primary bg-pale-blue2"
    >
      {isFetching ? "Loading..." : "Load more"}{" "}
    </button>
  );
};
