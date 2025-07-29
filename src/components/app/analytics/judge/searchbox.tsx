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
// import { RigthArrowIcon } from "../icons";

import { baseURL, escapeRegExp } from "@app/utils";
import { generateId } from "@app/utils/client";
import useDebounce from "@app/hooks/useDebounce";
import { skipToken } from "@reduxjs/toolkit/query";
import axios, { AxiosError } from "axios";
import { RigthArrowIcon } from "@app/components/icons";

export interface SearchBoxRef {
  textInputState: HTMLTextAreaElement | null;
  isFetchingCounsels: boolean;
}

interface AutocompleteSuggestion {
  value: string;
  field: "name" | "specialization" | "law_firm";
}

export const JudgeIndexSearchBox = forwardRef<SearchBoxRef | null, any>(
  function Search(
    { practitionerType = "Judge", isFetchingCounsels },
    forwardedRef
  ) {
    const router = useRouter();
    const [id] = useState("mention-" + generateId());
    const [lookupId] = useState("lookup-" + generateId());
    const [inputText, setInputText] = useState<string | undefined>(undefined);

    const [suggestionsList, setSuggestionsList] = useState<
      AutocompleteSuggestion[]
    >([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [field_value, setField_value] = useState({ value: "", field: "" });
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const suggestionRefs = useRef<(HTMLLIElement | null)[]>([]);

    useImperativeHandle(forwardedRef, () => ({
      isFetchingCounsels,
      textInputState: inputRef.current as HTMLTextAreaElement,
    }));

    const searchTerm = useDebounce(inputText, 500); // Reduced debounce time for better UX

    // Fetch autocomplete suggestions
    const fetchAutocompleteSuggestions = async (query: string) => {
      if (!inputText || !query || query.length < 2) {
        setSuggestionsList([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        // Fetch suggestions for different fields
        const [nameResults, specializationResults, lawFirmResults] =
          await Promise.all([
            axios.get(`${baseURL}/search/counsels/autocomplete`, {
              params: { query, field: "name", limit: 3 },
            }),
            axios.get(`${baseURL}/search/counsels/autocomplete`, {
              params: { query, field: "specialization", limit: 3 },
            }),
            axios.get(`${baseURL}/search/counsels/autocomplete`, {
              params: { query, field: "law_firm", limit: 3 },
            }),
          ]);
        //   console.log(
        //     "[nameResults, specializationResults, lawFirmResults] ",
        //     JSON.stringify([nameResults, specializationResults, lawFirmResults])
        //   );
        const suggestions: AutocompleteSuggestion[] = [
          ...(nameResults.data.suggestions?.map((s: { value: string }) => ({
            value: s.value,
            field: "name" as const,
          })) || []),
          ...(specializationResults.data.suggestions?.map(
            (s: { value: string }) => ({
              value: s.value,
              field: "specialization" as const,
            })
          ) || []),
          ...(lawFirmResults.data.suggestions?.map((s: { value: string }) => ({
            value: s.value,
            field: "law_firm" as const,
          })) || []),
        ];
        console.log("search result", JSON.stringify(suggestions.slice(0, 3)));
        // Remove duplicates and limit to 8 suggestions
        const uniqueSuggestions = suggestions
          .filter(
            (suggestion, index, self) =>
              self?.findIndex(
                (s) =>
                  s?.value?.toLowerCase() === suggestion?.value?.toLowerCase()
              ) === index
          )
          .slice(0, 8);

        setSuggestionsList(uniqueSuggestions);
      } catch (error) {
        console.error("Failed to fetch autocomplete suggestions:", error);
        setSuggestionsList([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    // Effect to fetch suggestions when search term changes
    //   useEffect(() => {
    //     if (searchTerm) {
    //       fetchAutocompleteSuggestions(searchTerm);
    //     } else {
    //       setSuggestionsList([]);
    //     }
    //   }, [searchTerm]);

    // Function to handle suggestion selection
    const handleSuggestionSelect = (suggestion: AutocompleteSuggestion) => {
      if (inputRef.current) {
        // Set the selected suggestion as the input value
        inputRef.current.value = suggestion.value;
        setInputText(suggestion.value);

        // Clear suggestions and reset selected index
        setSuggestionsList([]);
        setSelectedIndex(-1);

        // Focus back on the input
        inputRef.current.focus();

        // Move cursor to end of text
        setTimeout(() => {
          if (inputRef.current) {
            const length = inputRef.current.value.length;
            inputRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
    };

    const onSearchSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const { currentTarget } = evt;

      if (inputRef.current) {
        router.push({
          pathname: "/analytics/judges",
          query: {
            query: inputRef.current.value,
            // [field_value.field]: inputRef.current.value,
          },
        });
        setInputText(undefined);
        //   inputRef.current.value = "";
      }

      currentTarget.reset();
      setSuggestionsList([]);
      setSelectedIndex(-1);
    };

    const handleKeyUp = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
      const { value, selectionStart: start } = evt.currentTarget;
      const character = value.substring(start - 1, start);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < suggestionsList.length - 1 ? prev + 1 : prev
          );
          // Scroll into view if needed
          if (selectedIndex + 1 < suggestionsList.length) {
            suggestionRefs.current[selectedIndex + 1]?.scrollIntoView({
              block: "nearest",
            });
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          if (selectedIndex - 1 >= 0) {
            suggestionRefs.current[selectedIndex - 1]?.scrollIntoView({
              block: "nearest",
            });
          }
          break;

        case "Enter":
          // e.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < suggestionsList.length) {
            // Select the highlighted suggestion
            handleSuggestionSelect(suggestionsList[selectedIndex]);
            onSearchSubmit(e);
            //   setSuggestionsList([]);
          } else {
            // Submit the form
            onSearchSubmit(e);
          }
          break;

        case "Escape":
          setSuggestionsList([]);
          setSelectedIndex(-1);
          break;

        case "Tab":
          if (selectedIndex >= 0 && selectedIndex < suggestionsList.length) {
            e.preventDefault();
            handleSuggestionSelect(suggestionsList[selectedIndex]);
          }
          break;
      }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setInputText(value);
      setSelectedIndex(-1); // Reset selection when typing
    };

    // Close suggestions when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (!e.currentTarget.contains(e.target as Node)) {
        setSuggestionsList([]);
        setSelectedIndex(-1);
      }
    };

    // Get field display name
    const getFieldDisplayName = (field: string) => {
      switch (field) {
        case "name":
          return "Name";
        case "specialization":
          return "Specialization";
        case "law_firm":
          return "Law Firm";
        default:
          return field;
      }
    };
    //   console.log("the field  ", searchTerm);
    return (
      <div className="relative max-w-full w-full [700px]" id={lookupId}>
        <form
          id="searchBox"
          onSubmit={onSearchSubmit}
          onKeyDown={handleKeyDown}
          className="relative flex flex-col gap-5 p-2.5 rounded-md mt-8 text-2xl duration-300
            transition-all bg-stone-50 ring-1 ring-[#d5e1e4] focus-within:ring-2 z-20"
        >
          <ReactTextareaAutosize
            maxRows={10}
            placeholder={`Search ${practitionerType} index...`}
            onChange={handleInputChange}
            className={`px-2 font-rubik text-base placeholder:text-[17px] 
              leading-6 bg-stone-50 text-zinc-600
              outline-none scrollbar-hide resize-none max-h-[30vh]`}
            autoFocus
            ref={inputRef}
            id={id}
            onKeyUp={handleKeyUp}
          />

          <button
            type="submit"
            form="searchBox"
            className={`ml-auto flex justify-center items-center w-6 h-6 rounded-full ${
              inputText
                ? inputText.length <= 3
                  ? "bg-neutral-200"
                  : "bg-primary"
                : "bg-neutral-200"
            }`}
            disabled={inputText ? (inputText.length <= 3 ? true : false) : true}
          >
            <RigthArrowIcon />
          </button>
        </form>

        {/* Autocomplete Suggestions Dropdown */}
        {
          //   inputRef?.current?.value &&
          //     inputRef?.current?.value.length > 0 &&
          // inputText &&
          suggestionsList.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-30 max-h-60 overflow-y-auto">
              {isLoadingSuggestions && (
                <div className="px-4 py-2 text-sm text-gray-500">
                  Loading suggestions...
                </div>
              )}

              <ul className="py-1">
                {suggestionsList.map((suggestion, index) => (
                  <li
                    key={`${suggestion.field}-${suggestion.value}-${index}`}
                    ref={(el) => (suggestionRefs.current[index] = el)}
                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-gray-100 flex items-center justify-between ${
                      index === selectedIndex
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                    onClick={(e: MouseEvent) => {
                      handleSuggestionSelect(suggestion);
                      setField_value({
                        field: suggestion.field,
                        value: suggestion.value,
                      });
                      // close the suggestion view
                      //   if (!e.currentTarget.contains(e.target as Node)) {
                      //     setSuggestionsList([]);
                      //     setSelectedIndex(-1);
                      //   }
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <span className="flex-1 truncate">{suggestion.value}</span>
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      {getFieldDisplayName(suggestion.field)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    );
  }
);
