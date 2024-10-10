import React, {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Ref, FormEvent, RefObject } from "react";
import { useRouter } from "next/router";
import ReactTextareaAutosize from "react-textarea-autosize";
import {
  ClipPaperIcon,
  FilterIcon,
  PlusCircleIcon,
  RigthArrowIcon,
  SearchIcon,
} from "../../icons";
import { Modal } from "@app/components/ui";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";

export const SearchBoxButton = ({
  className,
  searchTextRef,
}: {
  className?: string;
  searchTextRef: RefObject<HTMLTextAreaElement>;
}) => {
  const { setIsSearchModal } = useContext(LayoutContext);

  // if (searchBtnRef && searchBtnRef?.current) {
  //   searchBtnRef?.current.focus();
  // }

  return (
    <Fragment>
      <div
        role="button"
        onClick={() => {
          setIsSearchModal(true);
          searchTextRef;
        }}
        className={`w-full flex gap-2.5 px-4 py-2 border border-solid
        bg-stone-50 border-stone-300 rounded-[32px]  cursor-text ${className}`}
      >
        <SearchIcon />
        <span className="my-auto text-sm text-zinc-600">New search..</span>
      </div>
      <SearchBoxModal innerRef={searchTextRef} />
    </Fragment>
  );
};

export const SearchBoxModal = ({
  innerRef,
}: {
  innerRef: Ref<HTMLTextAreaElement | null>;
}) => {
  const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);
  return (
    <Modal show={isSearchModal} toogleModal={() => setIsSearchModal(false)}>
      <div className="flex flex-col justify-center max-w-full w-[700px] mx-auto ">
        <SearchBox ref={innerRef} />
      </div>
    </Modal>
  );
};

export const SearchBox = forwardRef<HTMLTextAreaElement | null, any>(
  function Search(props, ref) {
    const router = useRouter();
    const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);
    const [inputText, setInputText] = useState<string>("");

    const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const { currentTarget } = evt;

      currentTarget.reset();

      if (isSearchModal) {
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
          placeholder="Search legal documents..."
          // value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="p-2 text-base placeholder:text-[17px] leading-6 bg-stone-50 text-zinc-600
         outline-none scrollbar-hide resize-none max-h-[40vh]"
          autoFocus
          ref={ref}
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
  }
);
