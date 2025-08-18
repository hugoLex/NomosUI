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
import Image from "next/image";

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
    const [selectedSearch, setSearchSelected] = useState("sematic_s");
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
              query_type: selectedSearch,
              type: documentType,
            },
          });
        }

        router.push({
          pathname: "/search",
          query: {
            q: inputRef.current.value,
            query_type: selectedSearch,
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
        // this is trigger the state change and also makes the input text available in inputText state @chibs
        setInputText(dataField as string);
        (async () => {
          try {
            await axios.post(
              `${baseURL}/query-assist/record-usage/${id}?query=${dataField}`,
              {}
            );
          } catch (error) {
            console.log(error);
          }
        })();

        setIsSearchSuggestions(false);
      }
    };
    const handleSuggestionSelect = (
      // e: MouseEvent<HTMLLIElement>,
      dataField: Suggestion
      // id: string
    ) => {
      if (inputRef.current) {
        const textArea = inputRef.current;
        textArea.value = dataField?.text;
        textArea.focus();
        // this is trigger the state change and also makes the input text available in inputText state @chibs
        setInputText(dataField?.text);
        (async () => {
          try {
            // await axios.post(
            //   `${baseURL}/query-assist/record-usage/${dataField?.id}?query=${dataField?.text}`,
            //   {}
            // );
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
          if (selectedIndex >= 0 && selectedIndex < suggestionsList.length) {
            handleSuggestionSelect(
              suggestionsList[selectedIndex]
              // selectedIndex.toString()
            );
          }
          onSearchSubmit(e);
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
    function SearchTypePicker() {
      const options = [
        {
          value: "sematic_s",
          label: "Search",
          icon: "/images/search-01-stroke-rounded.svg",
          // <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          //   <path d="M11 2.125a8.378 8.378 0 0 1 8.375 8.375c0 .767-.1 1.508-.304 2.22l-.029.085a.875.875 0 0 1-1.653-.566l.054-.206c.12-.486.182-.996.182-1.533A6.628 6.628 0 0 0 11 3.875 6.628 6.628 0 0 0 4.375 10.5a6.628 6.628 0 0 0 10.402 5.445c.943-.654 2.242-.664 3.153.109l.176.165.001.002 4.066 4.184a.875.875 0 0 1-1.256 1.22l-4.064-4.185-.104-.088c-.263-.183-.646-.197-.975.03l-.001.003A8.378 8.378 0 0 1 2.625 10.5 8.378 8.378 0 0 1 11 2.125Zm0 7.09a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" />
          // </svg>
        },
        {
          value: "llm_s",
          label: "Analysis",
          icon: "/images/document-validation-stroke-rounded.svg",
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   width="16"
          //   height="16"
          //   viewBox="0 0 24 24"
          //   color="currentColor"
          //   className="transition-colors duration-300  "
          //   fill="currentColor"
          //   fill-rule="evenodd"
          // >
          //   <path d="M8.175 13.976a.876.876 0 0 1 1.172-.04l.065.061.582.59c.196.194.395.388.596.576l.39.358c1.942 1.753 3.844 2.937 5.357 3.477.81.29 1.444.369 1.884.31.404-.055.61-.216.731-.446.135-.256.209-.678.116-1.31-.08-.546-.275-1.191-.59-1.91l-.141-.313-.034-.083a.875.875 0 0 1 1.575-.741l.042.079.161.353c.36.823.61 1.623.719 2.362.122.836.071 1.675-.3 2.38-.431.818-1.186 1.247-2.044 1.363-.823.111-1.756-.056-2.707-.396-1.912-.681-4.17-2.154-6.357-4.207a30.378 30.378 0 0 1-.63-.61l-.608-.615-.058-.068a.875.875 0 0 1 .079-1.17Zm.624-5.822a.876.876 0 0 1 1.216 1.258c-.396.383-.788.775-1.165 1.178-1.95 2.077-3.26 4.133-3.835 5.747-.29.81-.37 1.444-.31 1.884.055.404.215.61.444.731l.104.048c.261.103.654.149 1.207.068.623-.09 1.378-.333 2.224-.731a.875.875 0 0 1 .745 1.583c-.948.446-1.871.756-2.716.88-.784.114-1.57.078-2.246-.234l-.134-.066c-.817-.431-1.246-1.186-1.362-2.044-.112-.823.056-1.756.395-2.707.64-1.792 1.973-3.889 3.83-5.945l.377-.411c.402-.43.816-.843 1.226-1.239Zm8.5-4.954c.832-.122 1.67-.073 2.372.302h-.001c.814.432 1.243 1.185 1.36 2.042.11.823-.057 1.756-.396 2.707-.682 1.911-2.154 4.17-4.207 6.356h-.001c-.403.429-.818.846-1.236 1.236l-.068.057a.875.875 0 0 1-1.127-1.336l.582-.562c.193-.193.385-.39.573-.592l.359-.39c1.752-1.942 2.937-3.844 3.476-5.357.29-.811.37-1.444.31-1.884-.055-.404-.216-.61-.446-.731l-.003-.002c-.248-.132-.663-.207-1.293-.114-.62.09-1.37.332-2.208.73l-.083.034a.876.876 0 0 1-.667-1.615l.351-.161c.819-.36 1.616-.612 2.353-.72Zm-5.292 7.507a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM5.544 2.971c.823-.112 1.756.056 2.707.395 1.911.682 4.17 2.154 6.356 4.207.214.201.426.406.632.612l.604.625.057.068a.875.875 0 0 1-1.271 1.19l-.065-.063-.562-.582c-.193-.193-.39-.385-.592-.573-2.077-1.95-4.133-3.26-5.747-3.835-.811-.29-1.444-.37-1.884-.31-.404.055-.61.215-.731.444l-.002.004c-.132.248-.207.664-.114 1.294.08.543.275 1.184.588 1.898l.142.31.034.083a.875.875 0 0 1-1.572.746l-.043-.079-.161-.352c-.36-.819-.612-1.615-.72-2.352-.122-.832-.073-1.67.302-2.372.431-.814 1.185-1.242 2.042-1.358Z"></path>
          // </svg>
        },
      ];

      return (
        <div className="flex ">
          <div role="radiogroup" className="flex bg-[#e4edec] rounded-[.20rem]">
            {options.map((option) => (
              <button
                key={option.value}
                role="radio"
                aria-checked={selectedSearch === option.value}
                onClick={(e) => {
                  e.preventDefault();
                  setSearchSelected(option.value);
                }}
                className={`flex ${
                  selectedSearch === option.value
                    ? "bg-[#fcfcfc] text-primary border-primary border rounded-[.20rem]"
                    : " text-black/70"
                } items-center px-3 py-2 relative font-cabin font-medium`}
              >
                <span className=" w-[16px] h-[16px] relative mr-2">
                  {<Image fill src={option.icon} alt={option.value} />}
                </span>
                <span className="text-sm leading-[1.125rem]">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      );
    }
    console.log("search box picked index", selectedIndex);
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
            // wrap="off"
            onKeyUp={handleKeyUp}
          />

          <div className="flex gap-5 w-full items-center justify-between text-sm font-medium text-zinc-600">
            {/* <div className="flex items-center">
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
            </div> */}
            <SearchTypePicker />
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
                      className={`flex justify-between ${
                        selectedIndex === sdx
                          ? "bg-primary/80 text-white"
                          : null
                      } items-center text-sm hover:bg-slate-200/50 hover:rounded-sm p-1`}
                    >
                      <span>{text}</span>
                      {sId.startsWith("case") && (
                        // old logic not from mannie411
                        // {type === "case_title" && (
                        <Link
                          href={`/library/cases/${sId.substring(
                            5
                          )}?title=${text}&tab=case`}
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
