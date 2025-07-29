import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { useQueryHandler } from "@app/hooks/";
import { AllJudgesView, JudgeDetailsView } from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";
import { Head } from "@app/components/ui";

const Page: NextPageWithLayout = () => {
  const { searchParams } = useQueryHandler();

  const judgeId = searchParams.get("judgeId");
  // console.log(judgeId);
  return (
    <Fragment>
      {!judgeId && <AllJudgesView />}
      {judgeId && <JudgeDetailsView />}
    </Fragment>
  );
};

Page.getLayout = (page) => (
  <Fragment>
    <Head title={`Judges - List`} />
    <AppLayout>{page}</AppLayout>
  </Fragment>
);

export default Page;
