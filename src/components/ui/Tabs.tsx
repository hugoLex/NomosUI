import React, { FC } from "react";
import { TabItem } from "@app/types";

type TabsProps = {
  tabs: TabItem[];
  onClick: (id: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs, onClick }) => {
  return (
    <div className="relative flex gap-x-4 items-center ">
      {tabs.map(({ active, id, label }, idx) => (
        <span
          key={`tabitem-${idx}`}
          role="button"
          className={`relative ${
            active
              ? "after:absolute after:w-full after:-bottom-3 after:left-0 after:border-b-4 after:border-[#245b91] text-black/80"
              : "text-black/50"
          }`}
          onClick={() => onClick(id)}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default Tabs;
