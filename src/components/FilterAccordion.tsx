import * as Accordion from "@radix-ui/react-accordion";
import { PlusIcon } from "./icons";

const FilterAccordion = ({
  data,
  onOptionClick,
  filters,
}: {
  data: { header: string; list: string[] }[];
  onOptionClick: (header: string, option: string) => void;
  filters: { header: string; options: string[] }[];
}) => (
  <Accordion.Root
    type="multiple"
    className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto scrollbar pr-4"
  >
    {data.map(({ header, list = [] }, idx) => (
      <Accordion.Item key={idx} value={header}>
        <Accordion.Header>
          <Accordion.Trigger
            className="text-base font-normal w-full min-w-[250px]
           flex justify-between border hover:bg-neutral-200/30 py-2 px-5 rounded-[10px]"
          >
            <p>{header}</p>
            <PlusIcon />
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <div className="flex flex-col flex-wrap gap-2 w-full text-start mt-2">
            {list.map((option, _idx) => (
              <button
                key={_idx}
                className=" text-black/80 
              text-start text-sm py-1 px-3 rounded-md gap-2 flex items-center text-[#2C699B]"
                onClick={() => onOptionClick(header, option)}
              >
                <input
                  type="checkbox"
                  className="size-4"
                  checked={filters.some(
                    (x) => x.header === header && x.options.includes(option)
                  )}
                  onChange={(e) => onOptionClick(header, option)}
                />
                <span>{option}</span>
              </button>
            ))}
          </div>
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

export default FilterAccordion;
