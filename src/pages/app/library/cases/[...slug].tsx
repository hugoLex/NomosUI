import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { Head, Loader, Tabs } from "@app/components/ui";
import {
  CaseCounselView,
  CaseDetailsView,
  CaseJudgementAnalysisView,
  CasePrecedentAnalyticsView,
} from "@app/components/app/library/case";
import { AppLayout, AppLayoutContext } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";
import { getMarkdownRemoteStream } from "@app/utils/getMarkdown";
import { NextPageWithLayout, TabItem, TCaseDocument } from "@app/types";
import { ErrorView, Navbar } from "@app/components/shared";
import { useVisibility } from "@app/hooks";
import { useCaseQuery } from "@app/store/services/caseSlice";
import axios from "axios";
import matter from "gray-matter";
import { isError } from "util";

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
  const { counselData, judgeData } = dummyCaseDetails;

  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const isH1Visible = useVisibility({
    ref: h1Ref,
    options: {
      root: null,
      threshold: 0.8,
    },
  });
  const [tabs, setTabs] = useState(tabItems);

  const { isError, isLoading, data } = useCaseQuery(caseId);
  const [caseDocument, setCaseDocument] = useState<TCaseDocument | null>(null);
  const [analysisDocument, setAnalysisDocument] = useState<any>(undefined);

  useEffect(() => {
    if (data) {
      const { case_data } = data;
      const { main_judgement_url: judgementUrl, analysis_url: analysisUrl } =
        case_data;

      (async () => {
        try {
          let judgementData: any = undefined;
          let analysisData: any = undefined;

          const [judgementRes, analysisRes] = await Promise.all([
            judgementUrl
              ? axios.get(judgementUrl)
              : Promise.resolve({ data: null }),
            analysisUrl
              ? axios.get(analysisUrl)
              : Promise.resolve({ data: null }),
          ]);
          // const res = await axios.get(judgementUrl);

          console.log(judgementRes, analysisRes);

          if (judgementRes) {
            const { content } = matter(judgementRes.data);
            judgementData = content;
          }

          if (analysisRes.data) {
            const { content } = matter(analysisRes.data);
            analysisData = content;
          }

          setCaseDocument({ ...case_data, judgement: judgementData });
          setAnalysisDocument(analysisData);
        } catch (error) {
          console.log(error);

          setCaseDocument({ ...case_data });
        }
      })();
    }

    return () => {};
  }, [data]);

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

  if (isLoading)
    return (
      <div className=" flex-1 flex flex-col justify-center items-center self-stretch py-6 min-h-screen">
        <Loader variant="classic" size={80} />
      </div>
    );

  if (!data && isError) return <ErrorView />;

  return (
    <Fragment>
      <Head title={`Case - ${caseTitle}`} />

      <Navbar query={caseTitle} isTitle={isH1Visible} referrer={referrer}>
        <div className="flex-1 flex justify-end">
          <Tabs tabs={tabs} onClick={onTabsSelect} />
        </div>
      </Navbar>

      {tabId === "case" && (
        <Fragment>
          {caseDocument && (
            <CaseDetailsView caseDocument={caseDocument} innerRef={h1Ref} />
          )}
          {caseDocument === null && isError && <ErrorView />}
        </Fragment>
      )}
      {tabId === "counsel" && <CaseCounselView data={counselData} />}
      {tabId === "judgement" && (
        <CaseJudgementAnalysisView data={analysisDocument} />
      )}
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
