import React, { FC } from "react";
import useQueryToggler from "@app/hooks/useQueryHandler";
import { TabItem } from "@app/types";

type TabsProps = {
  tabs: TabItem[];
  // onClick: (id: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const { UpdateUrlParams, searchParams } = useQueryToggler(); // added this hook to cause the component to rerender after determining the active tab

  const tabClicked = searchParams.get("tab");
  return (
    <div className="relative flex gap-x-4 items-center flex-grow py-2.5 ">
      {tabs.map(({ active, id, label }, idx) => (
        <span
          key={`tabitem-${idx}`}
          role="button"
          className={`relative font-medium uppercase text-sm font-poppins ${
            tabClicked == id
              ? "after:absolute after:w-full after:-bottom-2.5 after:left-0 after:border-b-2 after:border-[#245b91] text-black/80"
              : "text-gray-500 hover:text-gray-700 "
          }`}
          // `pt-2 px- 4 pb-[14px] font-medium flex items-center ${
          //                           activeTab_query_type === "sematic_s"
          //                             ? "text-primary border-b-2 border-primary "
          //                             : "text-gray-500 hover:text-gray-700 "
          //                         }`

          onClick={() => UpdateUrlParams("tab", id)}
          // I changed it to persit the state on refresh and use the new nextjs api. If another
          //  functionality was intended please revert
          // onClick={() => onClick(id)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
