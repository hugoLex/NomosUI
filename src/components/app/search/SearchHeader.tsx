import React, { RefObject } from "react";
import { Header } from "@app/components/ui";
import { SearchBoxButton } from "./SearchBox";
import { MoreIcon, Share1Icon } from "@app/components/icons";

type SearchHeaderProps = {
  query: string;
  isH1Visible: boolean;
  searchBtnRef: RefObject<HTMLTextAreaElement>;
};

const SearchHeader = ({
  query,
  isH1Visible,
  searchBtnRef,
}: SearchHeaderProps) => {
  return (
    <Header>
      <div className="border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 rounded-t-lg">
        <div className="flex gap-5 justify-between  items-center px-4 py-2.5 w-full relative">
          <div className="w-[20%] inline-flex gap-4 justify-start items-center self-stretch pl-2 my-auto text-sm font-medium leading-4 text-center text-white whitespace-nowrap">
            {/* <span
              role="button"
              className=" px-2 py-2.5 whitespace-nowrap bg-primary rounded"
            > */}{" "}
            {/* <span>New Search</span> */}
            {/* </span> */}
            <SearchBoxButton searchTextRef={searchBtnRef} />
          </div>

          <div
            className={`flex-1 transition-all duration-300 ${
              !isH1Visible ? "opacity-1 visible" : "opacity-0 invisible"
            }`}
          >
            <p
              className={`font-medium text-center mx-auto max-w-[50%] text-primary ${
                query.length > 32 ? "truncate" : ""
              }`}
            >
              {query}
            </p>
          </div>

          <div className="w-[20%] inline-flex gap-4 justify-end items-center self-stretch pl-2 my-auto text-sm font-medium leading-4 text-center text-white whitespace-nowrap">
            <span role="button">
              <MoreIcon />
            </span>

            <span
              role="button"
              className="flex gap-1 justify-center px-3 py-2.5 bg-primary rounded"
            >
              <Share1Icon />
              <span>Share</span>
            </span>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default SearchHeader;
