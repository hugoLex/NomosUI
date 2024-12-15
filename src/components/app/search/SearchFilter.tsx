import React, { Fragment } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import { CloseIcon, Filter2Icon, PlusIcon } from "@app/components/icons";
import { FilterOption, SearchType } from "@app/types";

export const SearchFilterSidebar = ({
  data,
  defaultValue,
  handleSelection,
  handleSelectedSearchType,
}: {
  data: FilterOption[];
  defaultValue: SearchType;
  handleSelection: (id: string, idx: string) => void;
  handleSelectedSearchType: (id: SearchType) => void;
}) => {
  return (
    <div className="flex flex-col self-stretch rounded py-3">
      <div className="w-full flex gap-4 items-center mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          color="#000000"
          fill="none"
        >
          <path
            d="M3 7H6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 17H9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 17L21 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 7L21 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        <h3 className="text-base font-normal">All content</h3>
      </div>
      <Fragment>
        <Accordion.Root
          type="single"
          defaultValue={defaultValue}
          className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto scrollbar accordion"
        >
          {data.map(({ id, label, options }, idx) => (
            <Accordion.Item value={id ?? idx} key={id}>
              <Accordion.Header
                onClick={() => handleSelectedSearchType(id as SearchType)}
              >
                <Accordion.Trigger className={`accordion-header`}>
                  <span className="text-sm">{label}</span>
                  <PlusIcon />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="px-5">
                {options.map(
                  ({ id: idx, label }: { id: string; label: string }) => (
                    <button
                      key={idx}
                      className="flex items-center my-2 px-1.5 py-1 text-start text-sm rounded-md gap-2  text-black/80 hover:bg-neutral-200/50"
                      onClick={() => handleSelection(id, idx)}
                    >
                      {label}
                    </button>
                  )
                )}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Fragment>
    </div>
  );
};

export const SearchFilterDrawer = ({
  isShow,
  data,
  label,
  selectedOptions,
  onSelectedOption,
  closeDrawer,
}: {
  isShow: boolean;
  data: FilterOption | null;
  label: string;
  selectedOptions: any[] | null;
  onSelectedOption: (id: string, option: any) => void;
  closeDrawer: () => void;
}) => {
  return (
    <Fragment>
      <div
        onClick={() => closeDrawer()}
        style={{
          // backgroundColor: 'rgba(#ccdcf9, 0.5)',
          backdropFilter:
            "blur(2px) brightness(100%) saturate(50%) contrast(100%)",
        }}
        className={`absolute min-h-full minW-full bg-[#ccdcf9]/50 transition-all duration-300 ${
          isShow ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>
      <div
        className={`absolute bgWhite right-0 min-h-full py-6 borderL transition-all duration-500  
          ${isShow ? "w-[30%] visible" : "w-0 invisible opacity-0 "}
        `}
      >
        <div className="sticky md:top-[68px] overflow-hidden">
          <div className="inline-flex justify-between w-full px-4 mb-2">
            <p className="flex-1 flex flex-col">
              <span className="capitalize">{label}</span>
              <span className="text-xs">Filter by {data?.label}</span>
            </p>
            <button onClick={() => closeDrawer()} className="inline-flex">
              <CloseIcon width={18} height={18} role="button" stroke="#000" />
            </button>
          </div>
          <hr />
          <div className="p-4 overflow-y-auto">
            {data &&
              data.options.map((option, idx) => (
                <button
                  key={idx}
                  className=" text-black/80 
          text-start text-sm py-1  rounded-md gap-2 flex items-center text-[#2C699B]"
                  onClick={() => onSelectedOption(data.id, option)}
                >
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={
                      selectedOptions !== null &&
                      selectedOptions.some(
                        (x) => x.id === data.id && x.options.includes(option)
                      )
                    }
                    onChange={(e) => onSelectedOption(data.id, option)}
                  />
                  <span>{option}</span>
                </button>
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
