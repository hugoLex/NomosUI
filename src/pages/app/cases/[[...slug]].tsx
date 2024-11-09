import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Head } from "@app/components/ui";
import {
  CaseCounselView,
  CaseDetailsView,
  CaseHeader,
  CaseJudgeAnalyticsView,
  CasePrecedentAnalyticsView,
} from "@app/components/app";
import { AppLayout as Layout } from "@app/components/layout";
import { dummyCaseDetails } from "@app/utils";

const Page = () => {
  const router = useRouter();

  const slug = String(router.query.slug);
  const title = slug.replace(/-/g, " ");
  const tabId: string = router.query.tab ? String(router.query.tab) : "case";

  const { caseData, counselData, judgeData, precedentData } = dummyCaseDetails;

  return (
    <Fragment>
      <Head title={`Search Result - ${title}`} />
      <Layout>
        <CaseHeader />
        <section className="relative mx-auto max-w-[1100px] py-6 ">
          <div className="px-16 max-md:px-5 max-w-full">
            <div className="md:grid grid-cols-12 gap-8">
              {tabId === "case" && <CaseDetailsView data={caseData} />}
              {tabId === "judgement" && (
                <CaseJudgeAnalyticsView data={judgeData} />
              )}
              {tabId === "precedent" && (
                <CasePrecedentAnalyticsView data={precedentData} />
              )}
              {tabId === "counsel" && <CaseCounselView data={counselData} />}
            </div>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Page;
