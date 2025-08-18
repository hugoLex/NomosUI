import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { useQueryHandler } from "@app/hooks/";
import { NextPageWithLayout } from "@app/types";
import { Head } from "@app/components/ui";
import CourtAnalyticsDashboard from "@app/components/app/analytics/court/AllCourt";

const Page: NextPageWithLayout = () => {
  const { searchParams } = useQueryHandler();

  // const judgeId = searchParams.get("judgeId");
  // console.log(judgeId);
  return <Fragment>{<CourtAnalyticsDashboard />}</Fragment>;
};

Page.getLayout = (page) => (
  <Fragment>
    <Head title={`Courts - List`} />
    <AppLayout>{page}</AppLayout>
  </Fragment>
);

export default Page;
