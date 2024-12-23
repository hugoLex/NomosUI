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
import { AppLayout as Layout } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";

const Page = () => {
  const router = useRouter();
  const query = router.query;
  const slug = query.slug ? query.slug : "";
  const caseId = slug as string;
  const tabId: string = router.query.tab ? String(router.query.tab) : "case";

  const { counselData, judgeData } = dummyCaseDetails;

  return (
    <Fragment>
      <Head title={`Case - ${query.title}`} />
      <Layout>
        <CaseHeader />
        <Fragment>
          {tabId === "case" && <CaseDetailsView id={caseId} />}
          {tabId === "judgement" && <CaseJudgeAnalyticsView data={judgeData} />}
          {tabId === "precedent" && <CasePrecedentAnalyticsView id={caseId} />}
          {tabId === "counsel" && <CaseCounselView data={counselData} />}
        </Fragment>
      </Layout>
    </Fragment>
  );
};

export default Page;
