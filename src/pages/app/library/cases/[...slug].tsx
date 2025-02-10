import React, { Fragment, useContext, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Head, Tabs } from "@app/components/ui";
import {
  CaseCounselView,
  CaseDetailsView,
  CaseJudgeAnalyticsView,
  CasePrecedentAnalyticsView,
} from "@app/components/app/library/case";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";
import { getMarkdownRemoteStream } from "@app/utils/getMarkdown";
import { NextPageWithLayout, TabItem } from "@app/types";
import { Navbar } from "@app/components/shared";
import { useVisibility } from "@app/hooks";

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

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { referrer } = useContext(AppLayoutContext);
  const { slug, title, tab } = router.query;
  const caseId = slug as string;
  const caseTitle = String(title);
  const tabId: string = tab ? String(tab) : "case";

  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });

  const { counselData, judgeData } = dummyCaseDetails;

  const [tabs, setTabs] = useState(tabItems);

  // const handleGoBack = () => {
  //   const query = document.cookie
  //     .split(";")
  //     .filter((ctx) => ctx.includes("search_query"))[0]
  //     .trim()
  //     .split("=")[1];
  //   router.push(`/search?q=${query}`);
  // };

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
      <Head title={`Case - ${caseTitle}`} />

      <Navbar query={caseTitle} isTitle={isH1Visible} referrer={referrer}>
        <div className="flex-1 flex justify-end">
          <Tabs tabs={tabs} onClick={onTabsSelect} />
        </div>
      </Navbar>

      {tabId === "case" && <CaseDetailsView id={caseId} innerRef={h1Ref} />}
      {tabId === "counsel" && <CaseCounselView data={counselData} />}
      {tabId === "judgement" && <CaseJudgeAnalyticsView data={judgeData} />}
      {tabId === "precedent" && <CasePrecedentAnalyticsView id={caseId} />}
    </Fragment>
  );
};

// export const getServerSideProps = async () => {
//   // Fetch data from external API
//   const data = getMarkdownRemoteStream('');

//   // Pass data to the page via props
//   return { props: { data } };
// };

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
