import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Header, Tabs } from "@app/components/ui";
import { TabItem } from "@app/types";
import { SearchBoxButton } from "../search";
import { CollapseIcon } from "@app/components/icons";

const tabItems: TabItem[] = [
  {
    active: true,
    id: "case",
    label: "Case details",
  },
  {
    active: false,
    id: "judgement",
    label: "Judgement analysis",
  },
  {
    active: false,
    id: "precedent",
    label: "Precedent analysis",
  },

  {
    active: false,
    id: "counsel",
    label: "Counsel analysis",
  },
];

const CaseHeader = () => {
  const router = useRouter();

  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  const [tabs, setTabs] = useState(tabItems);
  // const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");

  const onTabsSelect = (_id: string) => {
    const newTabs = tabs.map(({ active, id, label }, k) => {
      id === _id ? (active = true) : (active = false);
      return { active, id, label };
    });

    setTabs(newTabs);
    // setSelectedTab(tabs.filter((itx) => itx.id === _id)[0]);
    router.push({
      pathname: `/cases/${slug}`,
      query: {
        tab: tabs.filter((itx) => itx.id === _id)[0].id,
      },
    });
  };

  return (
    <Header>
      <div className="flex border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 rounded-t-lg pt-4 justify-between px-8">
        <div className="flex items-center w-[20%] pb-2 gap-2">
          <CollapseIcon
            width={36}
            height={38}
            className="inline-block items-center align-middle"
          />
          <SearchBoxButton searchTextRef={searchRef} />
        </div>
        <div className="flex-1 flex justify-end">
          <Tabs tabs={tabs} onClick={onTabsSelect} />
        </div>
      </div>
    </Header>
  );
};

export default CaseHeader;
