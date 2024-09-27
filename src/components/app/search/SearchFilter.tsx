import React, { Fragment } from "react";
import * as Accordion from "@radix-ui/react-accordion";

import { CloseIcon, Filter2Icon, PlusIcon } from "@app/components/icons";
import { FilterOption } from "@app/types";

export const SearchFilterSidebar = ({
  data,
  handleSelection,
}: {
  data: FilterOption[];
  handleSelection: (id: string, idx: string) => void;
}) => {
  return (
    <div className="flex flex-col self-stretch rounded py-3">
      <div className="w-full flex gap-4 items-center mb-3">
        <Filter2Icon />
        <h3 className="text-base font-normal">All content</h3>
      </div>
      <Fragment>
        <Accordion.Root
          type="multiple"
          className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto scrollbar"
        >
          {data.map(({ id, label, options }) => (
            <Accordion.Item value={label ?? "Label"} key={id}>
              <Accordion.Header>
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
  selectedOptions,
  onSelectedOption,
  closeDrawer,
}: {
  isShow: boolean;
  data: FilterOption | null;
  selectedOptions: any[] | null;
  onSelectedOption: (id: string, option: any) => void;
  closeDrawer: () => void;
}) => {
  return (
    <div
      className={`min-h-full py-6 border-l px-4 transition-all duration-500  ${
        isShow ? "w-[25%]" : "w-0 invisible opacity-0 "
      }`}
    >
      <div className="sticky md:top-[68px] overflow-hidden">
        <button
          onClick={() => closeDrawer()}
          className="inline-flex gap-2 items-center justify-end w-full"
        >
          <CloseIcon width={18} height={18} role="button" stroke="#000" />
        </button>

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
  );
};
