import React, { FC } from "react";
import { TabItem } from "@app/types";

type TabsProps = {
  tabs: TabItem[];
  onClick: (id: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs, onClick }) => {
  return (
    <div className=" flex gap-x-4 ">
      {tabs.map(({ active, id, label }, idx) => (
        <span
          key={`tabitem-${idx}`}
          role="button"
          className={`pb-2 ${
            active
              ? "border-b-4 border-black/80 text-black/80"
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
