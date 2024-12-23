import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { Head } from "@app/components/ui";
import { AllJudgesView, JudgeDetailsView } from "@app/components/app/bench/";

const Page = () => {
  const title = "List";
  const { searchParams } = UseQueryToggler();

  const judgeId = searchParams.get("judgeId");
  console.log(judgeId);
  return (
    <Fragment>
      <Head title={`Judges - ${title}`} />
      <AppLayout>
        {!judgeId && <AllJudgesView />}
        {judgeId && <JudgeDetailsView />}
      </AppLayout>
    </Fragment>
  );
};

export default Page;
