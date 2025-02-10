import { Container } from "@app/components/shared";
import React, { Fragment } from "react";

const JudgeView = ({ data }: { data: any[] }) => {
  return (
    <Container>
      <div className="md:grid grid-cols-12 gap-8">
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
      </div>
    </Container>
  );
};

export default JudgeView;
