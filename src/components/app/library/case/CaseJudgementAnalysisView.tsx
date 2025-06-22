import React, { Fragment } from "react";
import { Container, ErrorView, Markdown } from "@app/components/shared";

const CaseJudgementAnalysisView = ({ data }: { data: string | null }) => {
  if (!data) {
    return (
      <ErrorView title="No judgement analysis.">
        <p>Judgement analysis for the case not available.</p>
      </ErrorView>
    );
  }

  return (
    <Container>
      <div className={`py-8  w-full md:min-w-[980px]`}>
        <Markdown
          content={data}
          className="wrapper text-wrap overflow-x-hidden"
        />
      </div>
    </Container>
  );
};

export default CaseJudgementAnalysisView;
