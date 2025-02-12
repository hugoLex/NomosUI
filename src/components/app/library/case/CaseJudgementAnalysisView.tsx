import { Container, Markdown } from "@app/components/shared";
import React, { Fragment } from "react";

const CaseJudgementAnalysisView = ({ data }: { data: any }) => {
  return (
    <Container>
      <div className={`py-8  w-full md:min-w-[980px]`}>
        <Markdown
          content={data}
          className="wrapper text-wrap overflow-x-hidden"
        />
      </div>
      {/* <div className="md:grid grid-cols-12 gap-8">
        <div className="col-span-8">
          {data.map((itx, idx) => (
            <div key={idx}>{itx.title}</div>
          ))}
        </div>
        <div className="col-span-4 self-baselane">
          <div className="sticky top-[68px]">
            <Fragment />
          </div>
        </div>
      </div> */}
    </Container>
  );
};

export default CaseJudgementAnalysisView;
