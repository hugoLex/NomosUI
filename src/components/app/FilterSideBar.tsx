import React from "react";
import { SearchResultFilter } from "@app/types";
import { Filter2Icon } from "../icons";
import FilterAccordion from "../FilterAccordion";

export const FilterSideBar = ({
  data,
  filters,
  setFilters,
}: {
  data?: SearchResultFilter;
  filters: { header: string; options: string[] }[];
  setFilters: (state: { header: string; options: string[] }[]) => void;
}) => {
  const filter_elements = data;

  return (
    <div className="flex flex-col self-stretch rounded py-3 px-5 ">
      <div className="w-full flex gap-4 items-center mb-3">
        <Filter2Icon />

        <h3 className="text-base font-normal">Refine search</h3>
      </div>
      <FilterAccordion
        filters={filters}
        onOptionClick={(header, b) => {
          const previousOptions =
            filters.find((x) => x.header === header)?.options || [];
          const hasOption = previousOptions?.includes(b);

          setFilters([
            ...filters.filter((x) => x.header !== header),
            {
              header,
              options: hasOption
                ? previousOptions.filter((x) => x !== b)
                : [...previousOptions, b],
            },
          ]);
        }}
        data={[
          { header: "Court", list: filter_elements?.court || [] },
          { header: "Year", list: filter_elements?.year || [] },
          { header: "Area of Law", list: filter_elements?.area_of_law || [] },
        ]}
      />
    </div>
  );
};

export const FilterContentDetails = () => (
  <div className="flex flex-col ">
    <div className="w-full text-base font-medium leading-6 text-cyan-700 max-md:max-w-full">
      how center a div
    </div>
    <div className="w-full text-base leading-6 text-zinc-600 max-md:max-w-full">
      To center a div in CSS, there are several methods you can use based on
      your specific
      <br />
      requirements: 1. Using Flexbox: Flexbox is a modern and versatile method
      for centering…
    </div>
    <div className="hidden gap-5 justify-between mt-1 w-full max-md:flex-wrap max-md:max-w-full">
      <div className="flex gap-1 px-5 my-auto text-xs font-medium leading-4 text-zinc-600">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a7dc82d80b7814a60587de6af409f4f734c9d2de6fec42bf5fac469a7c287c2?"
          className="shrink-0 my-auto aspect-square w-[11px]"
        />
        <div>8 days ago</div>
      </div>
      <div className="flex gap-1 justify-between px-2 py-2.5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/334db60c70807fdcabad8c6c9e43b29b3772ed0f10ec34d303ed900ff19be20d?"
          className="shrink-0 aspect-[1.22] w-[17px]"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/44decc762b666cc1620330ebc374c3f8bbbfe3cdd6115a29ad09c1ee7b705052?"
          className="shrink-0 aspect-[1.22] w-[17px]"
        />
      </div>
    </div>
  </div>
);
