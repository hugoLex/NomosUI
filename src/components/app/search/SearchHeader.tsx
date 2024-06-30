import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Header } from "@app/components/ui";
import { SearchButtonBox } from "./SearchBox";
import { MoreIcon, Share1Icon } from "@app/components/icons";

type SearchHeaderProps = {
  query: string;
  isHeaderVisible: boolean;
};

const SearchHeader = ({ query, isHeaderVisible }: SearchHeaderProps) => {
  return (
    <Header>
      <div className="border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 rounded-t-lg">
        <div className="flex gap-5 justify-between  items-center px-4 py-2.5 w-full relative">
          <SearchButtonBox className="" />

          <div
            className={`transition-all duration-300 ${
              isHeaderVisible ? "opacity-1 visible" : "opacity-0 invisible"
            }`}
          >
            <p className="font-medium">{query}</p>
          </div>

          <div className="inline-flex gap-4 justify-between items-center self-stretch pl-2 my-auto text-sm font-medium leading-4 text-center text-white whitespace-nowrap">
            <span role="button">
              <MoreIcon />
            </span>

            <span
              role="button"
              className="flex gap-1 justify-center px-2 py-2.5 bg-primary rounded"
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
