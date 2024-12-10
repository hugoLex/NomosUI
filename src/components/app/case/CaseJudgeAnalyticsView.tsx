import React, { Fragment } from "react";

const JudgeView = ({ data }: { data: any[] }) => {
  return (
    <Fragment>
      <section className="relative mx-auto max-w-[1100px] py-6 ">
        <div className="px-16 max-md:px-5 max-w-full">
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
        </div>
      </section>
    </Fragment>
  );
};

export default JudgeView;
