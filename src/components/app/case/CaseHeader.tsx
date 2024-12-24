import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { AppLayoutContext as LayoutContext } from "@app/components/layout";
import { Button, Header, Tabs } from "@app/components/ui";
import { TabItem } from "@app/types";
import { SearchBoxModal } from "../search";

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
    label: "Precedent analytics",
  },

  // {
  //   active: false,
  //   id: "counsel",
  //   label: "Counsel analysis",
  // },
];

const CaseHeader = () => {
  const router = useRouter();
  const { setIsSearchModal } = useContext(LayoutContext);

  const searchRef = useRef<HTMLTextAreaElement | null>(null);
  const [tabs, setTabs] = useState(tabItems);
  // const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");

  const handleGoBack = () => {
    const query = document.cookie
      .split(";")
      .filter((ctx) => ctx.includes("search_query"))[0]
      .trim()
      .split("=")[1];
    router.push(`/search?q=${query}`);
  };

  const onTabsSelect = (_id: string) => {
    const newTabs = tabs.map(({ active, id, label }, k) => {
      id === _id ? (active = true) : (active = false);
      return { active, id, label };
    });

    setTabs(newTabs);
    // setSelectedTab(tabs.filter((itx) => itx.id === _id)[0]);
    router.push({
      pathname: `/library/cases/${slug}`,
      query: {
        tab: tabs.filter((itx) => itx.id === _id)[0].id,
      },
    });
  };

  return (
    <Fragment>
      <Header>
        <div
          className="flex border-b border-solid bg-stone-50
         border-stone-300 border-opacity-50
         rounded-t-lg pt-4 justify-between px-4 md:px-8"
        >
          <div className="flex items-center w-[20%] pb-2 gap-2">
            <HiArrowUturnLeft
              className="inline-block items-center align-middle cursor-pointer text-gray-400"
              size={25}
              onClick={handleGoBack}
            />
            <Button
              label="New search"
              onClick={() => {
                setIsSearchModal(true);
              }}
              className="primary"
            />
          </div>
          <div className="flex-1 flex justify-end">
            <Tabs tabs={tabs} onClick={onTabsSelect} />
          </div>
        </div>
      </Header>
      <SearchBoxModal innerRef={searchRef} />
    </Fragment>
  );
};

export default CaseHeader;
