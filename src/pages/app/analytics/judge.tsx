import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { Head } from "@app/components/ui";
import { AllJudgesView, JudgeDetailsView } from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const title = "List";
  const { searchParams } = UseQueryToggler();

  const judgeId = searchParams.get("judgeId");
  console.log(judgeId);
  return (
    <Fragment>
      <Head title={`Judges - ${title}`} />

      {!judgeId && <AllJudgesView />}
      {judgeId && <JudgeDetailsView />}
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
