import React, { Fragment } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import { AppLayout } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";
import {
  CaseCounselView,
  CaseDetailsView,
  CaseHeader,
  CaseJudgeAnalyticsView,
  CasePrecedentAnalyticsView,
} from "@app/components/app/case";
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
      <Fragment>
        {tabId === "case" && <CaseDetailsView id={caseId} />}
        {tabId === "judgement" && <CaseJudgeAnalyticsView data={judgeData} />}
        {tabId === "precedent" && <CasePrecedentAnalyticsView id={caseId} />}
        {tabId === "counsel" && <CaseCounselView data={counselData} />}
      </Fragment>
    </Fragment>
  );
};

Page.getLayout = (page) => {
  return (
    <Fragment>
      <Head title={"Search"} />
      <AppLayout>{page}</AppLayout>
    </Fragment>
  );
};
export default Page;
