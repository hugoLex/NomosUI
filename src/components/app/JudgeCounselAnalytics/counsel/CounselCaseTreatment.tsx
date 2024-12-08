import React from "react";
import NameCourtyearSuitNo from "../../generalSharedComponents/NameCourtyearSuitNo";
import { CaseTreatmentParagraph } from "../../generalSharedComponents/caseTreatmentParagraph";
type counselCaseTreatment = {
  caseTitle: string;
  caseDetails: [string, string, string];
  casesCited: string[];
  outcome: string;
};
const CounselCaseTreatment: React.FC<counselCaseTreatment> = ({
  caseTitle,
  caseDetails,
  casesCited,
  outcome,
}) => {
  return (
    <section className="last:pb-10 ">
      <NameCourtyearSuitNo caseTitle={caseTitle} caseDetails={caseDetails} />

      <div className="relative pb-[15px]">
        {/* replace Subject matters twith Cases cited when the endpoint is corrected */}
        <h5 className={` text-base capitalize`}>Subject matters</h5>

        {/* <span
          className={`text-[0.875rem] mt-[10px] block ${
            treatment == "Followed" ? "text-[#11AB45]" : "text-[#11AB45]"
          } gray-200`}
        >
          {"Positive"}
        </span> */}
        <div className="flex gap-5 flex-wrap">
          {casesCited.map((case_, index) => (
            <p key={index} className="text-[0.875rem] gray-200 ">
              {case_}
            </p>
          ))}
        </div>
      </div>

      {/* <NameCourtyearSuitNo caseTitle={caseTitle} caseDetails={caseDetails} /> */}
      <CaseTreatmentParagraph
        // practitioner_type="counsel"
        treatment={"Cited"}
        reason={outcome}
      />
      <hr className="my-5 h-0.5 bg-gray-600" />
    </section>
  );
};

export default CounselCaseTreatment;
