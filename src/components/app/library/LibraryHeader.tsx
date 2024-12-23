import React, { Fragment, RefObject, useContext } from "react";
import { Button, Header, Tabs } from "@app/components/ui";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import { SearchBoxModal } from "../search";
import { ActionButtons } from "@app/components/shared";

type HeaderProps = {
  searchBtnRef: RefObject<HTMLTextAreaElement>;
};

const LibraryHeader = ({ searchBtnRef }: HeaderProps) => {
  const { setIsSearchModal } = useContext(LayoutContext);

  return (
    <Fragment>
      <Header>
        <div
          className="flex border-b border-solid bg-stone-50
         border-stone-300 border-opacity-50 rounded-t-lg py-2.5
          justify-between px-4 md:px-8 "
        >
          <div className="flex items-center w-[20%] gap-2">
            <Button
              label="New search"
              onClick={() => {
                setIsSearchModal(true);
              }}
              className="primary"
            />
          </div>
          <ActionButtons />
        </div>
      </Header>
      <SearchBoxModal innerRef={searchBtnRef} />
    </Fragment>
  );
};

export default LibraryHeader;
