import { MoreIcon } from "@app/components/icons";
import React from "react";
type CaseTreatment = {
  practitioner_type?: string;
  reason: string;
  treatment: string;
};
export const CaseTreatmentParagraph: React.FC<CaseTreatment> = ({
  practitioner_type,
  reason,
  treatment,
}) => {
  const color = {
    concoured: "text-green",
    dissented: "text-red",
  };

  return (
    <>
      <div className="relative">
        {/* make the text to be first letter capital letter and others small */}
        <h5 className={`  text-base capitalize text-lex-blue`}>{treatment}</h5>
        {/* <h5 className={` ${color[treatment]} text-base capitalize`}>{treatment}</h5> */}
        {/* <span
          className={`text-[0.875rem] mt-[10px] block ${
            treatment == "positive" ? "text-[#11AB45]" : "text-[#11AB45]"
          } gray-200`}
        >
          {"Positive"}
        </span> */}
        <p className="text-[0.875rem] gray-200 ">{reason}</p>
      </div>
    </>
  );
};
