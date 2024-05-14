import React from "react";
import { FilterIcon, PlusCircleIcon, Switch } from "..";

const Search = () => {
  return (
    <div className="flex flex-col px-2.5 pt-4 pb-2.5 mt-9 rounded-md border border-solid shadow-sm bg-stone-50 border-stone-300 max-md:max-w-full">
      <textarea
        placeholder="Ask anything..."
        className="pb-2 text-base leading-6 bg-stone-50 text-zinc-600 max-md:max-w-full outline-none scrollbar-hide resize-none max-h-[45vh]"
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
          <label htmlFor="" className=" h-6 relative inline-block;">
            <Switch />
            Pro
          </label>

          <div className="flex justify-center items-center px-2 py-2.5 w-8 h-8 rounded-full bg-neutral-200">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/19378461672b722218affc3e2e71bdce51fde5674d43f96eea0307549375c70f?"
              className="aspect-[1.28] w-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
