import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import {
  CaseCounselView,
  CaseDetailsView,
  CaseHeader,
  CaseJudgeAnalyticsView,
  CasePrecedentAnalyticsView,
} from "@app/components/app/case";
import { AppLayout } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";
import { getMarkdownRemoteStream } from "@app/utils/getMarkdown";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const query = router.query;
  const slug = query.slug ? query.slug : "";
  const caseId = slug as string;
  const tabId: string = router.query.tab ? String(router.query.tab) : "case";

  const { counselData, judgeData } = dummyCaseDetails;

  return (
    <Fragment>
      <Head title={`Case - ${query.title}`} />
      <CaseHeader />
      {tabId === "case" && <CaseDetailsView id={caseId} />}
      {tabId === "judgement" && <CaseJudgeAnalyticsView data={judgeData} />}
      {tabId === "precedent" && <CasePrecedentAnalyticsView id={caseId} />}
      {tabId === "counsel" && <CaseCounselView data={counselData} />}
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
