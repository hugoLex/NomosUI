import { MoreIcon } from "@app/components/icons";
import React, { Fragment } from "react";
import PrecedenceTreatment from "./PrecedenceTreatment";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
const PrecedentView = ({ data }: { data: any[] }) => {
  return (
    <Fragment>
      <div className="col-span-8">
        <h1
          id="searchQuery"
          className="text-xx font-normal text-[#245b91] mb-6"
        >
          Precedent Analytics
        </h1>
        {data.map(({ case_title, reason }, idx) => (
          <Fragment key={idx}>
            <div className="relative">
              <span className="text-gray-500 absolute -left-5 top-0">
                {idx + 1}.
              </span>
              {/* make the text to be first letter capital letter and others small */}
              <h5 className="text-base capitalize">{case_title}</h5>
              <span className="text-[0.875rem] gray-200">{"Positive"}</span>
              <p className="text-[0.875rem] gray-200 ">{reason}</p>
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
        <div className="sticky top-[68px] bg-gray-100 p-[2rem]">
          {/* <div className="flex gap-2 items-center"> */}

          <h5 className="relative pl-[8px] text-base text-[#171F46] font-midium font-rubik">
            <HiAdjustmentsHorizontal className="absolute left-[-20px] top-[4px]" />
            Filter Treatments
          </h5>
          {/* </div> */}
          {/* <div>
            <p>Positive</p>
            <p>Neutral</p>
            <p>Negative</p>
            <p>Cited by counsel</p>
          </div> */}
          <PrecedenceTreatment />
        </div>
      </div>
    </Fragment>
  );
};

export default PrecedentView;
