import React, {
  Fragment,
  forwardRef,
  useContext,
  useEffect,
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
import { GoArrowUpRight, GoArrowUpLeft } from "react-icons/go";
import {
  ClipPaperIcon,
  FilterIcon,
  RigthArrowIcon,
  SearchIcon,
} from "../icons";
import { Modal } from "@app/components/ui";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import { baseURL, escapeRegExp, mentionsList } from "@app/utils";
import { generateId } from "@app/utils/client";
import useDebounce from "@app/hooks/useDebounce";
import { useSearchAssitQuery } from "@app/store/services/searchSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { Suggestion } from "@app/types";
import axios, { AxiosError } from "axios";
import { DetectOutsideClick } from "@app/hoc";

export const SearchBox = forwardRef<HTMLTextAreaElement | null, any>(
  function Search(props, forwardedRef) {
    const symbol = "@";
    const router = useRouter();
    const { isSearchModal, setIsSearchModal } = useContext(LayoutContext);

    const [id] = useState("mention-" + generateId());
    const [lookupId] = useState("lookup-" + generateId());
    const [mentions, setMentions] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string | undefined>(undefined);
    const [isSearchTags, setIsSearchTags] = useState<boolean>(false);
    const [isSearchSuggetions, setIsSearchSuggestions] =
      useState<boolean>(false);
    const [suggestionsList, setSuggestionsList] = useState<Suggestion[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    useImperativeHandle(
      forwardedRef,
      () => inputRef.current as HTMLTextAreaElement
    );

    const searchTerm = useDebounce(inputText, 1500);

    const { data, isError } = useSearchAssitQuery(searchTerm || skipToken);

    useEffect(() => {
      if (data) {
        const { suggestions } = data;
        setSuggestionsList(suggestions);
        setIsSearchSuggestions(true);
      }

      if (inputText?.length === 0) {
        setIsSearchSuggestions(false);
        setIsSearchTags(false);
        setSuggestionsList([]);
      }

      return () => {};
    }, [data, inputText]);

    const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const { currentTarget } = evt;

      if (isSearchModal) {
        setIsSearchModal(false);
      }

      if (inputRef.current) {
        document.cookie = `search_query=${inputRef.current.value}`;

        if (mentions) {
          const removeType = RegExp(escapeRegExp(`${mentions}`), "gi");
          const removeSymbol = RegExp(escapeRegExp("@"), "gi");
          const query = inputRef.current.value.replace(removeType, "").trim();
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
            q: inputRef.current.value,
          },
        });
      }

      currentTarget.reset();
    };

    const insertNameIntoInput = (
      e: MouseEvent<HTMLLIElement>,
      dataField: string | any[]
    ) => {
      if (inputRef.current) {
        const textArea = inputRef.current;
        const mention = `${symbol}${dataField as string}`;
        textArea.value = mention;
        textArea.focus();
        setMentions(mention);
        setIsSearchTags(false);
      }
    };

    const insertSuggestionIntiInput = (
      e: MouseEvent<HTMLLIElement>,
      dataField: string | any[],
      id: string
    ) => {
      if (inputRef.current) {
        const textArea = inputRef.current;
        textArea.value = dataField as string;
        textArea.focus();

        (async () => {
          try {
            await axios.post(`${baseURL}/query-assist/record-usage/${id}`, {
              query: dataField,
            });
          } catch (error) {
            console.log(error);
          }
        })();

        setIsSearchSuggestions(false);
      }
    };

    const handleKeyUp = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
      const { value, selectionStart: start } = evt.currentTarget;

      const character = value.substring(start - 1, start);

      if (character === symbol) {
        setIsSearchTags(true);
        return;
      }

      if (character === " " || value.trim() === "") {
        setIsSearchTags(false);
        return;
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestionsList.length - 1 ? prev + 1 : prev
          );
          // Scroll into view if needed
          suggestionRefs.current[selectedIndex + 1]?.scrollIntoView({
            block: "nearest",
          });
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          suggestionRefs.current[selectedIndex - 1]?.scrollIntoView({
            block: "nearest",
          });
          break;

        case "Enter":
          e.preventDefault();
          onSearchSubmit(e);
          if (selectedIndex >= 0 && selectedIndex < suggestionsList.length) {
            // handleSuggestionSelect(suggestions[selectedIndex]);
          }
          break;

        case "Escape":
          setSuggestionsList([]);
          setSelectedIndex(-1);
          break;
      }
    };

    const dismissSearchBoxDropdown = () => {
      setIsSearchSuggestions(false);
      setIsSearchTags(false);
    };

    return (
      <div className="relative" id={lookupId}>
        <form
          id="searchBox"
          onSubmit={onSearchSubmit}
          onKeyDown={handleKeyDown}
          className="relative flex flex-col gap-5 p-2.5 rounded-md mt-8 text-2xl duration-300
            transition-all bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2 z-20"
        >
          <ReactTextareaAutosize
            maxRows={10}
            placeholder="Search legal documents..."
            onChange={(e) => setInputText(e.target.value)}
            className={`p-2 font-rubik text-base placeholder:text-[17px] 
              leading-6 bg-stone-50 text-zinc-600
              outline-none scrollbar-hide resize-none max-h-[40vh]`}
            autoFocus
            ref={inputRef}
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
                  inputText
                    ? inputText.length <= 3
                      ? "bg-neutral-200"
                      : "bg-primary"
                    : "bg-neutral-200"
                }`}
                disabled={
                  inputText ? (inputText.length <= 3 ? true : false) : true
                }
              >
                <RigthArrowIcon />
              </button>
            </div>
          </div>
        </form>

        <DetectOutsideClick onClickOutside={dismissSearchBoxDropdown}>
          <div className={`relative clippPath`}>
            <div
              className={`absolute w-full space-y-1 rounded-b-md transition-all 
         bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2 p-3 duration-200
            ${
              isSearchTags || isSearchSuggetions
                ? "z-10 h-auto bottom-1 translate-y-full opacity-100 visible"
                : "z-0 h-0 -bottom-10  translate-x-0 opacity-0 invisible"
            }
         `}
            >
              {isSearchTags && (
                <ul className={` flex gap-3 w-full transition-all my-3  `}>
                  {mentionsList.map((mention, i) => {
                    return (
                      <li
                        key={i}
                        role="button"
                        className={`flex gap-3 justify-between items-center text-base bg-[#EBF2FF] text-primary rounded  px-1 `}
                        onClick={(e: MouseEvent<HTMLLIElement>) =>
                          insertNameIntoInput(e, mention["name"])
                        }
                        data-mention={mention["name"]}
                      >
                        <p className="font-rubik text-inherit">
                          <span>{symbol}</span>
                          <span>{mention["name"]}</span>
                        </p>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" text-primary"
                        >
                          <path
                            d="M1.28125 0.625C0.917578 0.625 0.625 0.917578 0.625 1.28125V7.84375C0.625 8.20742 0.917578 8.5 1.28125 8.5C1.64492 8.5 1.9375 8.20742 1.9375 7.84375V2.86445L8.25391 9.18359C8.51094 9.44062 8.92656 9.44062 9.18086 9.18359C9.43516 8.92656 9.43789 8.51094 9.18086 8.25664L2.86445 1.94023H7.84375C8.20742 1.94023 8.5 1.64766 8.5 1.28398C8.5 0.920312 8.20742 0.627734 7.84375 0.627734H1.28125V0.625Z"
                            fill="currentColor"
                          />
                        </svg>
                      </li>
                    );
                  })}
                </ul>
              )}

              {data && (
                <ul className="list-none">
                  {suggestionsList.map(({ id: sId, type, text }, sdx) => (
                    <li
                      key={sdx}
                      role="button"
                      ref={(el) => (suggestionRefs.current[sdx] = el)}
                      onClick={(evt) =>
                        insertSuggestionIntiInput(evt, text, sId)
                      }
                      className="flex justify-between items-center text-sm hover:bg-slate-200/50 hover:rounded-sm p-1"
                    >
                      <span>{text}</span>
                      {type === "case_title" && (
                        <Link
                          href={`/library/cases/${sId}?title=${text}&tab=case`}
                          className="px-1 py-0.5 inline-flex items-center bg-[#EBF2FF] text-primary rounded-sm "
                        >
                          view
                          <GoArrowUpRight />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </DetectOutsideClick>
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
