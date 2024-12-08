import { AppLayout } from "@app/components/layout";
import React, { Fragment } from "react";
import { UseQueryToggler } from "@app/hooks/queryHandler";
import { Head } from "@app/components/ui";
import AllJudgesView from "@app/components/app/JudgeCounselAnalytics/judge/AllJudgesView";
import JudgeDetailsView from "@app/components/app/JudgeCounselAnalytics/judge/JudgeDetailsView";

function JudgeAnalytics() {
  const { searchParams } = UseQueryToggler();

  const judgeId = searchParams.get("judgeId");

  return (
    <Fragment>
      <Head title={`Search Result - ${"Judge"}`} />
      <AppLayout>
        {!judgeId && <AllJudgesView />}
        {judgeId && <JudgeDetailsView />}
      </AppLayout>
    </Fragment>
  );
}

export default JudgeAnalytics;

{
  /* <div className="flex justify-end mb-2">
        <span role="button">
          <MoreIcon />
        </span>
      </div>
      <hr className="mt-3 mb-6" /> */
}
