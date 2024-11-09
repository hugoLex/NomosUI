import React, { Fragment } from "react";

const JudgeView = ({ data }: { data: any[] }) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default JudgeView;
