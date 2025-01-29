import React, {
  Fragment,
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type {
  Ref,
  FormEvent,
  RefObject,
  MouseEvent,
  KeyboardEvent,
} from "react";

import { useRouter } from "next/router";
import ReactTextareaAutosize from "react-textarea-autosize";
import {
  ClipPaperIcon,
  FilterIcon,
  RigthArrowIcon,
  SearchIcon,
} from "../icons";
import { Modal } from "@app/components/ui";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import { escapeRegExp, mentionsList } from "@app/utils";
import { generateId } from "@app/utils/client";

export const SearchBox = forwardRef<HTMLTextAreaElement | null, any>(
  function Search(props, forwardedRef) {
    const symbol = "@";
    const router = useRouter();
    const ref = useRef<HTMLTextAreaElement | null>(null);
    const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);
    useImperativeHandle(forwardedRef, () => ref.current as HTMLTextAreaElement);

    const [id] = useState("mention-" + generateId());
    const [lookupId] = useState("lookup-" + generateId());
    const [mentions, setMentions] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);

    const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const { currentTarget } = evt;

      currentTarget.reset();

      if (isSearchModal) {
        setIsSearchModal(false);
      }

      document.cookie = `search_query=${inputText}`;

      if (mentions) {
        const removeType = RegExp(escapeRegExp(`${mentions}`), "gi");
        const removeSymbol = RegExp(escapeRegExp("@"), "gi");
        const query = inputText.replace(removeType, "").trim();
        console.log(query);
        const documentType = mentions.replace(removeSymbol, "");

        router.push({
          pathname: "/search",
          query: {
            q: query,
            type: documentType,
          },
        });
      }

      router.push({
        pathname: "/search",
        query: {
          q: inputText,
        },
      });
    };

    const insertNameIntoInput = (
      e: MouseEvent<HTMLLIElement>,
      dataField: string | any[]
    ) => {
      if (ref.current) {
        const textArea = ref.current;
        const mention = `${symbol}${dataField as string}`;
        textArea.value = mention;
        textArea.focus();
        setMentions(mention);
        setIsSearchFocus(false);
      }
    };

    const handleKeyUp = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
      const { value, selectionStart: start } = evt.currentTarget;

      const character = value.substring(start - 1, start);

      if (character === symbol) {
        setIsSearchFocus(true);
        return;
      }

      if (character === " " || value.trim() === "") {
        setIsSearchFocus(false);
        return;
      }
    };

    return (
      <div className="relative" id={lookupId}>
        <form
          id="searchBox"
          onSubmit={onSearchSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSearchSubmit(e);
            }
          }}
          className="relative flex flex-col gap-5 p-2.5 rounded-md mt-8 text-2xl duration-300
            transition-all bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2"
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
            id={id}
            wrap="off"
            onKeyUp={handleKeyUp}
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
                  inputText.length <= 3 ? "bg-neutral-200" : "bg-primary"
                }`}
                disabled={inputText.length <= 3}
              >
                <RigthArrowIcon />
              </button>
            </div>
          </div>
        </form>

        <ul
          className={`relative w-full space-y-1 rounded-b-md transition-all
         bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2 p-2.5
        ${
          isSearchFocus
            ? "z-10 h-auto bottom-[5px] opacity-100 visible"
            : "z-0 h-0 bottom-0 opacity-0 invisible"
        }`}
        >
          {mentionsList.map((mention, i) => {
            return (
              <li
                key={i}
                role="button"
                className={`flex justify-between items-center text-base hover:bg-neutral-200/30`}
                onClick={(e: MouseEvent<HTMLLIElement>) =>
                  insertNameIntoInput(e, mention["name"])
                }
                data-mention={mention["name"]}
              >
                <p>
                  <span>{symbol}</span>
                  <span>{mention["name"]}</span>
                </p>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.28125 0.625C0.917578 0.625 0.625 0.917578 0.625 1.28125V7.84375C0.625 8.20742 0.917578 8.5 1.28125 8.5C1.64492 8.5 1.9375 8.20742 1.9375 7.84375V2.86445L8.25391 9.18359C8.51094 9.44062 8.92656 9.44062 9.18086 9.18359C9.43516 8.92656 9.43789 8.51094 9.18086 8.25664L2.86445 1.94023H7.84375C8.20742 1.94023 8.5 1.64766 8.5 1.28398C8.5 0.920312 8.20742 0.627734 7.84375 0.627734H1.28125V0.625Z"
                    fill="#64645F"
                  />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
);

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
