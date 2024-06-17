import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  ClipPaperIcon,
  FilterIcon,
  PlusCircleIcon,
  RigthArrowIcon,
  SearchIcon,
} from "../../icons";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import ReactTextareaAutosize from "react-textarea-autosize";

export const SearchButtonBox = () => {
  const { setIsSearchModal } = useContext(LayoutContext);
  return (
    <div
      onClick={() => setIsSearchModal(true)}
      className="ml-[4rem] md:w-[20%] flex gap-2.5 px-4 py-2 border border-solid
       bg-stone-50 border-stone-300 rounded-[32px]  cursor-text"
    >
      <SearchIcon />
      <span className="my-auto text-sm text-zinc-600">Search...</span>
    </div>
  );
};

const SearchBox = () => {
  const router = useRouter();
  const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);
  const [inputText, setInputText] = useState<string>("");

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
        q: inputText,
      },
    });
  };

  return (
    <form
      id="searchBox"
      onSubmit={onSearchSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onSearchSubmit(e);
        }
      }}
      className="flex flex-col gap-5 p-2.5 rounded-md mt-8 text-2xl transition-all
        shadow-sm bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2"
    >
      <ReactTextareaAutosize
        maxRows={10}
        placeholder="Ask anything..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="p-2 text-base placeholder:text-[17px] leading-6 bg-stone-50 text-zinc-600
         outline-none scrollbar-hide resize-none max-h-[40vh]"
      />
      <div className="flex gap-5 w-full items-center justify-between text-sm font-medium text-zinc-600">
        <div className="flex items-center">
          <button
            type="button"
            className="flex gap-1 justify-center items-center
           hover:bg-neutral-200/50 transition-all px-3 py-1.5 rounded-xl"
          >
            <span className="size-[18px]">
              <FilterIcon />
            </span>
            <span>Precise</span>
          </button>
          <button
            type="button"
            className="flex gap-1 justify-center items-center
           hover:bg-neutral-200/50 transition-all px-3 py-1.5 rounded-xl"
          >
            <span className="size-[18px]">
              <ClipPaperIcon />
            </span>
            <span>Attach</span>
          </button>
        </div>

        <div className="flex gap-3 items-center justify-between">
          {/* <label htmlFor="" className=" h-6 relative inline-block;">
              <Switch />
              Pro
            </label> */}

          <button
            type="submit"
            form="searchBox"
            className={`flex justify-center items-center px-2 py-2.5 w-8 h-8 rounded-full ${
              inputText.length < 1 ? "bg-neutral-200" : "bg-primary"
            }`}
            disabled={inputText.length < 1}
          >
            <RigthArrowIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBox;
