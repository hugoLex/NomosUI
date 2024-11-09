import { MoreIcon } from "@app/components/icons";
import React, { Fragment } from "react";

const PrecedentView = ({ data }: { data: any[] }) => {
  return (
    <Fragment>
      <div className="col-span-8">
        <h1 id="searchQuery" className="text-xx font-normal mb-6">
          Precedent Analytics
        </h1>
        {data.map(({ case_title, reason }, idx) => (
          <Fragment key={idx}>
            <div>
              <h5>{case_title}</h5>
              <p>{reason}</p>
            </div>
            <div className="flex justify-end mb-2">
              <span role="button">
                <MoreIcon />
              </span>
            </div>
            <hr className="my-3" />
          </Fragment>
        ))}
      </div>
      <div className="col-span-4 self-baselane">
        <div className="sticky top-[68px]">
          <h5 className="font-medium">Filter Treatments</h5>
          <div>
            <p>Positive</p>
            <p>Neutral</p>
            <p>Negative</p>
            <p>Cited by counsel</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PrecedentView;
