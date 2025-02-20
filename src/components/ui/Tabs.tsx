import React, { FC } from "react";
import { TabItem } from "@app/types";

import { useSearchParams } from "next/navigation";
import useQueryToggler from "@app/hooks/useQueryHandler";

type TabsProps = {
  tabs: TabItem[];
  // onClick: (id: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs }) => {
  // const Tabs: FC<TabsProps> = ({ tabs, onClick }) => {
  const { UpdateUrlParams, searchParams } = useQueryToggler();
  // added this hook to cause the component to rerender after determining the active tab

  const tabClicked = searchParams.get("tab");
  return (
    <div className="relative flex gap-x-4 items-center flex-grow ">
      {tabs.map(({ active, id, label }, idx) => (
        <span
          key={`tabitem-${idx}`}
          role="button"
          className={`relative ${
            tabClicked == id
              ? "after:absolute after:w-full after:-bottom-3 after:left-0 after:border-b-4 after:border-[#245b91] text-black/80"
              : "text-black/50"
          }`}
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
