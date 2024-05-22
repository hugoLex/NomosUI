import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FilterIcon,
  PlusCircleIcon,
  RigthArrowIcon,
  SearchIcon,
} from "../../icons";
import { Switch } from "../../ui";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";

export const SearchButtonBox = () => {
  const { setIsSearchModal } = useContext(LayoutContext);
  return (
    <div
      onClick={() => setIsSearchModal(true)}
      className="ml-[4rem] md:w-[20%] flex gap-2.5 px-4 py-2 border border-solid bg-stone-50 border-stone-300 rounded-[32px]  cursor-text"
    >
      <SearchIcon />
      <span className="my-auto text-sm text-zinc-600">Search...</span>
    </div>
  );
};

const SearchBox = () => {
  const router = useRouter();
  const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    return () => {};
  }, []);

  const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { currentTarget } = evt;

    if (isSearchModal) {
      currentTarget.reset();
      setIsSearchModal(false);
    }

    router.push({
      pathname: "/search",
      query: {
        q: searchTerm,
      },
    });
  };

  const onTextareaChange = (evt: any) => {
    const { target } = evt;

    if (target.value.length >= 3 && isDisabled) {
      setIsDisabled(false);
    }

    if (target.value.length >= 3) {
      setSearchTerm(target.value);
    }

    if (target.value.length === 0) setIsDisabled(true);
  };

  return (
    <div className="flex flex-col px-2.5 pt-4 pb-2.5 mt-9 rounded-md border border-solid shadow-sm bg-stone-50 border-stone-300 max-md:max-w-full">
      <form id="searchBox" onSubmit={onSearchSubmit}>
        <textarea
          placeholder="Ask anything..."
          onChange={onTextareaChange}
          className="pb-2 text-base leading-6 bg-stone-50 text-zinc-600 w-full max-md:max-w-full outline-none scrollbar-hide resize-none max-h-[45vh]"
        ></textarea>
        <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-3 justify-between py-2.5 text-sm font-medium leading-4 text-center whitespace-nowrap rounded-lg bg-stone-50 text-zinc-600">
            <div className="flex gap-1 justify-center">
              <span className="shrink-0 aspect-[1.28] w-[18px]">
                <FilterIcon />
              </span>
              <span>Focus</span>
            </div>
            <div className="flex gap-1 justify-center">
              <span className="shrink-0 aspect-[1.28] w-[18px]">
                <PlusCircleIcon />
              </span>
              <span>Attach</span>
            </div>
          </div>
          <div className="flex gap-3 items-center justify-between rounded-full bg-stone-50">
            {/* <label htmlFor="" className=" h-6 relative inline-block;">
              <Switch />
              Pro
            </label> */}

            <button
              type="submit"
              form="searchBox"
              className={`flex justify-center items-center px-2 py-2.5 w-8 h-8 rounded-full ${
                isDisabled ? "bg-neutral-200" : "bg-primary"
              }`}
              disabled={isDisabled}
            >
              <RigthArrowIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
