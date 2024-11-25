import React, { Fragment, useState } from "react";

import { PlusIcon } from "@app/components/icons";
import { TreatmentTypes } from "@app/types";

function PrecedenceTreatment() {
  const [isVisible, setVisible] = useState<TreatmentTypes>("Positive");
  type PrecedenceTreatmentData = [TreatmentTypes, string[], string][];
  const PrecedenceTreatmentdata: PrecedenceTreatmentData = [
    ["Positive", ["Followed", "Applied"], "text-[#11AB45]"],
    ["Neutral", ["Cited"], "text-[#1147AB]"],
    ["Negative", ["Overruled", "Distinguished", "Set-aside"], "text-[#AB1111]"],
    // ["Cited by counsel", ["Cited"], "text-[#1147AB] bg-[#C5D9FF]"],
  ];

  return (
    <section className="col-span-4 sticky top-[68px] self-baselane md:pb-[8rem]  overflow-x-hidden">
      {/* <h1 className="relative z-20 text-center font-poppins text-[0.98113rem] md:text-[3rem] font-medium leading-[1.17731rem] md:leading-[3.6rem] text-default dark:text-default2">
        Filter Treatments
      </h1> */}
      <div className=" mx-auto mt-[1.27rem] relative z-20">
        {PrecedenceTreatmentdata.map(([title, details, color]) => (
          <div
            key={title}
            className=""
            // className=" border-gray-200 border-solid border-b pb-2 "
          >
            <div
              onClick={() => setVisible(title)}
              className={`${color} flex whitespace-nowrap font-black border border-gray-200 border-solid  text-[14px]  capitalize my-2 px-2.5 py-2 text-start text -base rounded-md gap-2  hover:bg-neutral-200/50  `}
              // isVisible === title ? "font-black text-[#171F46]" : ` `
              // : "text-[#0B69FF]"
              // className={` flex whitespace-nowrap capitalize border border-gray-200 border-solid my-2 px-2.5 py-2 text-start text-sm rounded-md gap-2  text-black/80 hover:bg-neutral-200/50 ${
            >
              {title}
              <button className="ml-auto cursor-pointer pointer-events-none">
                <svg
                  className={`pointer-events-none cursor-pointer ${
                    isVisible === title ? "rotate-[-90deg]" : "rotate-[90deg]"
                  }  fill-current opacity-75 w-4 h-4 -mr-1`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                </svg>
              </button>
            </div>
            {isVisible === title &&
              details.map((item, _idx) => (
                <p
                  key={_idx}
                  className={`${""} pl-[8px] text-[#7E858E] pt-[8px] text-[14px] `}
                >
                  {item}
                </p>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default PrecedenceTreatment;
