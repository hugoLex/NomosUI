import React, { useContext, useState } from "react";
import { Header } from "@app/components/ui";
import { SearchButtonBox } from "./SearchBox";

const SearchHeader = () => {
  return (
    <Header>
      <div className="border-b border-solid bg-stone-50 border-stone-300 border-opacity-50">
        <div className="flex gap-5 justify-between items-center px-4 py-2.5 w-full max-md:flex-wrap max-md:max-w-full">
          <SearchButtonBox />

          <div className="flex gap-2 justify-between self-stretch pl-2 my-auto text-sm font-medium leading-4 text-center text-white whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f67444ce54a1576e591d0a869ae9147a19fc6c0017d54e5d449ededa2f225dd0?"
              className="shrink-0 my-auto aspect-[1.22] w-[17px]"
            />
            <div className="flex flex-col justify-center px-2 py-2.5 bg-primary rounded">
              <button className="flex gap-1 justify-center">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/41aebb8e2c1ce20cd2ca80b55fdc112e2d23c6639a27a30a0502faa90a0db159?"
                  className="shrink-0 aspect-[1.22] w-[17px]"
                />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default SearchHeader;
