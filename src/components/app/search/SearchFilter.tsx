import React, { Fragment } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import { CloseIcon, Filter2Icon, PlusIcon } from "@app/components/icons";
import { FilterOption } from "@app/types";

export const SearchFilterSidebar = ({
  data,
  handleSelection,
  handleSelectedSearchType,
}: {
  data: FilterOption[];
  handleSelection: (id: string, idx: string) => void;
  handleSelectedSearchType: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col self-stretch rounded py-3">
      <div className="w-full flex gap-4 items-center mb-3">
        <Filter2Icon />
        <h3 className="text-base font-normal">All content</h3>
      </div>
      <Fragment>
        <Accordion.Root
          type="single"
          defaultValue={"cases"}
          className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto scrollbar"
        >
          {data.map(({ id, label, options }, idx) => (
            <Accordion.Item value={id ?? idx} key={id}>
              <Accordion.Header onClick={() => handleSelectedSearchType(id)}>
                <Accordion.Trigger
                  className="text-base font-normal w-full 
           flex justify-between border hover:bg-neutral-200/30 py-2 px-5 rounded-[10px]"
                >
                  <p className="text-sm">{label}</p>
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
  console.log(selectedOptions, data);
  return (
    <Fragment>
      <div
        onClick={() => closeDrawer()}
        style={{
          // backgroundColor: 'rgba(#ccdcf9, 0.5)',
          backdropFilter:
            "blur(2px) brightness(100%) saturate(50%) contrast(100%)",
        }}
        className={`absolute min-h-full min-w-full bg-[#ccdcf9]/50 transition-all duration-300 ${
          isShow ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      ></div>
      <div
        className={`absolute bg-white right-0 min-h-full py-6 border-l transition-all duration-500  
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
