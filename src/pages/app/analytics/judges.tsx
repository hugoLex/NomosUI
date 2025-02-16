import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { useQueryHandler } from "@app/hooks/";
import { AllJudgesView, JudgeDetailsView } from "@app/components/app/analytics";
import { NextPageWithLayout } from "@app/types";

const Page: NextPageWithLayout = () => {
  const { searchParams } = useQueryHandler();

  const judgeId = searchParams.get("judgeId");
  console.log(judgeId);
  return (
    <Fragment>
      {!judgeId && <AllJudgesView />}
      {judgeId && <JudgeDetailsView />}
    </Fragment>
  );
};

Page.getLayout = (page) => <AppLayout>{page}</AppLayout>;

export default Page;
