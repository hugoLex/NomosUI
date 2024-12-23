import React, { Fragment, RefObject, useContext } from "react";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import { Button, Header } from "@app/components/ui";
import { SearchBoxModal } from "./SearchBox";
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
  const { setIsSearchModal } = useContext(LayoutContext);

  return (
    <Fragment>
      <Header>
        <div className="border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 rounded-t-lg">
          <div className="flex gap-5 justify-between  items-center px-4 py-2.5 w-full relative">
            <div className="w-[20%] inline-flex gap-4 justify-start items-center self-stretch pl-2 my-auto text-sm font-medium leading-4 text-center text-white whitespace-nowrap">
              <Button
                label="New search"
                onClick={() => {
                  setIsSearchModal(true);
                }}
                className="primary"
              />
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

              <Button label="share" className="primary" icon={<Share1Icon />} />
            </div>
          </div>
        </div>
      </Header>
      <SearchBoxModal innerRef={searchBtnRef} />
    </Fragment>
  );
};

export default SearchHeader;
