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
  const color: {
    Concurred: string;
    Dissented: string;
  } = {
    Concurred: "text-green-700",
    Dissented: "text-red-700",
  };

  return (
    <>
      <div className="relative pb-[15px]">
        {/* make the text to be first letter capital letter and others small */}
        {/* <h5 className={`  text-base capitalize text-lex-blue`}>{treatment}</h5> */}
        <h5
          className={` ${
            color[treatment as keyof typeof color]
          } text-base capitalize`}
        >
          {treatment}
        </h5>
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
