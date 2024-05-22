import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Header, Tabs } from "@app/components/ui";
import { TabItem } from "@app/types";

const tabItems: TabItem[] = [
  {
    active: true,
    id: "case",
    label: "Case details",
  },
  {
    active: false,
    id: "judgement",
    label: "Judgement Analysis",
  },
  {
    active: false,
    id: "precedent",
    label: "Precedent Analytics",
  },

  {
    active: false,
    id: "counsel",
    label: "Counsel Analysis",
  },
];

const CaseHeader = () => {
  const router = useRouter();

  const [tabs, setTabs] = useState(tabItems);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");

  useEffect(() => {
    router.push({
      pathname: `/cases/${slug}`,
      query: {
        tab: selectedTab.id,
      },
    });
    return () => {};
  }, [selectedTab]);

  const onTabsSelect = (_id: string) => {
    const newTabs = tabs.map(({ active, id, label }, k) => {
      id === _id ? (active = true) : (active = false);
      return { active, id, label };
    });

    setTabs(newTabs);
    setSelectedTab(tabs.filter((itx) => itx.id === _id)[0]);
  };

  return (
    <Header>
      <div className="flex  self-stretch border-b border-solid bg-stone-50 border-stone-300 border-opacity-50 pt-4 ">
        <div className="px-16 max-md:px-5 max-w-full mx-auto max-w:[1100px]">
          <div className="md:grid grid-cols-12 gap-8">
            <div className="col-span-full">
              <Tabs tabs={tabs} onClick={onTabsSelect} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default CaseHeader;
