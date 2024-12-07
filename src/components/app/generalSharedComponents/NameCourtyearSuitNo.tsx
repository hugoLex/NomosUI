import React from "react";
import { LuDot } from "react-icons/lu";
type CaseDetailsProps = {
  caseTitle: string;
  caseDetails: [string, string, string];
};

const NameCourtyearSuitNo: React.FC<CaseDetailsProps> = ({
  caseTitle,
  caseDetails,
}) => {
  return (
    <>
      <h1 id="" className="text-xx font-normal mt-[30px] mb-2 text-[#245b91]">
        {caseTitle}
      </h1>
      <div className="flex group items-center pb-5">
        {/* <div className="relative max-md:group-[:nth-child(5)_&]:first:h-[3.143rem] md:group-[:nth-child(5)_&]:first:w-[6.88075rem] lg:group-[:nth-child(5)_&]:first:w-[8.88075rem] w-[3.57556rem] h-[3.84813rem] md:w-[4.46975rem] lg:w-[6.24756rem] md:h-[5rem] lg:h-[6.7238rem] "> */}
        {caseDetails.map((item, index) => (
          <h3
            key={item + index}
            className="relative group first:pl-[0px] font-light text-[0.875rem] text-black/80  px-2.5 py-1 text-sm"
          >
            <LuDot
              className={` 
                group-last:hidden text-[#245b91] text-[25px] absolute right-[-13px] top-[1px]`}
              //   ${
              //   index == 2 ? "hidden" : ""
              // }
            />
            {item}
          </h3>
        ))}
      </div>
    </>
  );
};

export default NameCourtyearSuitNo;
